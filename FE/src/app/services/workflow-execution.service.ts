import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  WorkflowLogEntry,
  WorkflowReport,
  WorkflowServiceName,
  WorkflowStatus,
  WorkflowStep,
} from '../models/workflow.models';

@Injectable({
  providedIn: 'root',
})
export class WorkflowExecutionService {
  readonly steps: WorkflowStep[] = [
    { id: 'trigger', label: 'webhook triggered' },
    { id: 'routing', label: 'routing by service' },
    { id: 'compile', label: 'compile/convert' },
    { id: 'test', label: 'run test' },
    { id: 'report', label: 'report generated' },
  ];

  private readonly webhookUrl = 'http://localhost:5678/webhook/eProduct-rest-apis-testing';
  private readonly importFileWebhookUrl = 'http://localhost:5678/webhook/eProduct-rest-apis-testing-import-file';
  private readonly http = inject(HttpClient);

  private readonly statusSignal = signal<WorkflowStatus>('ready');
  private readonly reportSignal = signal<WorkflowReport | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly report = this.reportSignal.asReadonly();

  executeWorkflow(serviceName: WorkflowServiceName, testCaseFile?: File | null): Observable<WorkflowLogEntry> {
    this.statusSignal.set('running');
    this.reportSignal.set(null);

    const startedAt = Date.now();

    return new Observable<WorkflowLogEntry>((observer) => {
      observer.next(
        this.buildLog(
          'trigger',
          testCaseFile ? `Uploading file ${testCaseFile.name} and calling workflow webhook` : 'Calling workflow webhook',
          'info',
        ),
      );

      const request$ = testCaseFile
        ? this.executeImportWorkflowRequest(serviceName, testCaseFile)
        : this.http.post<Record<string, unknown>>(this.webhookUrl, { service_mode: serviceName });

      const subscription = request$.subscribe({
        next: () => {
          this.statusSignal.set('completed');
          this.reportSignal.set(this.generateReport(serviceName, startedAt, testCaseFile?.name));
          observer.next(this.buildLog('report', 'Workflow webhook executed successfully', 'info'));
          observer.complete();
        },
        error: (error: unknown) => {
          this.statusSignal.set('failed');
          observer.next(this.buildLog('test', 'Workflow webhook execution failed', 'error'));
          observer.error(new Error(this.getErrorMessage(error)));
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  getReport(): WorkflowReport | null {
    return this.reportSignal();
  }

  reset(): void {
    this.statusSignal.set('ready');
    this.reportSignal.set(null);
  }

  private buildLog(step: string, message: string, level: 'info' | 'error'): WorkflowLogEntry {
    return {
      step,
      message,
      level,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  private generateReport(serviceName: WorkflowServiceName, startedAt: number, fileName?: string): WorkflowReport {
    return {
      serviceName,
      fileName: fileName ?? 'N/A (webhook mode)',
      totalTests: 0,
      failed: 0,
      passed: 0,
      executionTimeMs: Date.now() - startedAt,
      completedAt: new Date().toISOString(),
    };
  }

  private executeImportWorkflowRequest(
    serviceName: WorkflowServiceName,
    testCaseFile: File,
  ): Observable<Record<string, unknown>> {
    const formData = new FormData();
    formData.append('test_case', testCaseFile);
    formData.append('service_mode', serviceName);
    return this.http.post<Record<string, unknown>>(this.importFileWebhookUrl, formData);
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Workflow webhook execution failed';
  }
}
