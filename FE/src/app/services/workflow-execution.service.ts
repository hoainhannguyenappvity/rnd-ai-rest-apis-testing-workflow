import { Injectable, signal } from '@angular/core';
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

  private readonly statusSignal = signal<WorkflowStatus>('ready');
  private readonly reportSignal = signal<WorkflowReport | null>(null);

  readonly status = this.statusSignal.asReadonly();
  readonly report = this.reportSignal.asReadonly();

  executeWorkflow(serviceName: WorkflowServiceName, file: File): Observable<WorkflowLogEntry> {
    this.statusSignal.set('running');
    this.reportSignal.set(null);

    const startedAt = Date.now();
    const shouldFail = file.name.toLowerCase().includes('fail');

    return new Observable<WorkflowLogEntry>((observer) => {
      let currentIndex = 0;
      let timeoutRef: ReturnType<typeof setTimeout> | undefined;

      const runStep = (): void => {
        if (currentIndex >= this.steps.length) {
          const report = this.generateReport(serviceName, file.name, startedAt);
          this.reportSignal.set(report);
          this.statusSignal.set('completed');
          observer.complete();
          return;
        }

        const step = this.steps[currentIndex++];

        timeoutRef = setTimeout(() => {
          if (shouldFail && step.id === 'test') {
            this.statusSignal.set('failed');
            observer.next(this.buildLog(step.label, 'Workflow failed while running tests', 'error'));
            observer.error(new Error('Mock workflow execution failed'));
            return;
          }

          observer.next(this.buildLog(step.label, `Step finished: ${step.label}`, 'info'));
          runStep();
        }, this.getStepDelay(step.id));
      };

      runStep();

      return () => {
        if (timeoutRef) {
          clearTimeout(timeoutRef);
        }
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

  private generateReport(
    serviceName: WorkflowServiceName,
    fileName: string,
    startedAt: number,
  ): WorkflowReport {
    const totalTests = serviceName === 'ups' ? 58 : 42;
    const failed = serviceName === 'ups' ? 2 : 1;

    return {
      serviceName,
      fileName,
      totalTests,
      failed,
      passed: totalTests - failed,
      executionTimeMs: Date.now() - startedAt,
      completedAt: new Date().toISOString(),
    };
  }

  private getStepDelay(stepId: string): number {
    const delayMap: Record<string, number> = {
      trigger: 600,
      routing: 800,
      compile: 900,
      test: 1300,
      report: 700,
    };

    return delayMap[stepId] ?? 700;
  }
}
