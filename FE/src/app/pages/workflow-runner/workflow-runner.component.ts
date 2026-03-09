import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportModalComponent } from '../../components/report-modal/report-modal.component';
import { WorkflowLogEntry, WorkflowServiceName } from '../../models/workflow.models';
import { WorkflowExecutionService } from '../../services/workflow-execution.service';

@Component({
  selector: 'app-workflow-runner',
  standalone: true,
  imports: [CommonModule, ReportModalComponent],
  templateUrl: './workflow-runner.component.html',
})
export class WorkflowRunnerComponent implements OnDestroy {
  private readonly workflowService = inject(WorkflowExecutionService);
  private executionSub?: Subscription;

  readonly selectedService = signal<WorkflowServiceName>('ups');
  readonly logs = signal<WorkflowLogEntry[]>([]);
  readonly executionError = signal<string>('');
  readonly isReportOpen = signal(false);

  readonly status = this.workflowService.status;
  readonly report = this.workflowService.report;
  readonly steps = this.workflowService.steps;

  readonly completedStepCount = computed(() => this.logs().filter((log) => log.level === 'info').length);
  readonly progressPercent = computed(() =>
    Math.round((this.completedStepCount() / this.steps.length) * 100),
  );

  readonly canExecute = computed(() => this.status() !== 'running');

  readonly canViewReport = computed(() => this.status() === 'completed' && !!this.report());

  onServiceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedService.set(target.value as WorkflowServiceName);
  }

  executeWorkflow(): void {
    if (!this.canExecute()) {
      return;
    }

    this.executionSub?.unsubscribe();
    this.logs.set([]);
    this.executionError.set('');
    this.isReportOpen.set(false);

    this.executionSub = this.workflowService.executeWorkflow(this.selectedService()).subscribe({
      next: (entry) => {
        this.logs.update((prev) => [...prev, entry]);
      },
      error: (error: Error) => {
        this.executionError.set(error.message);
      },
    });
  }

  openReport(): void {
    if (this.canViewReport()) {
      this.isReportOpen.set(true);
    }
  }

  closeReport(): void {
    this.isReportOpen.set(false);
  }

  reset(): void {
    this.executionSub?.unsubscribe();
    this.workflowService.reset();
    this.logs.set([]);
    this.executionError.set('');
    this.isReportOpen.set(false);
  }

  statusBadgeClass(): string {
    const status = this.status();

    if (status === 'running') {
      return 'bg-amber-400/15 text-amber-200 ring-1 ring-amber-400/30';
    }

    if (status === 'completed') {
      return 'bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/30';
    }

    if (status === 'failed') {
      return 'bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/40';
    }

    return 'bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/30';
  }

  ngOnDestroy(): void {
    this.executionSub?.unsubscribe();
  }
}
