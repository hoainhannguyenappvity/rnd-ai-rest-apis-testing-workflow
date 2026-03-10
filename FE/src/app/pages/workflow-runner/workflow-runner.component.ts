import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { WorkflowLogEntry, WorkflowServiceName } from '../../models/workflow.models';
import { WorkflowExecutionService } from '../../services/workflow-execution.service';

@Component({
	selector: 'app-workflow-runner',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './workflow-runner.component.html',
})
export class WorkflowRunnerComponent implements OnDestroy {
	private readonly workflowService = inject(WorkflowExecutionService);
	private executionSub?: Subscription;
	private progressSub?: Subscription;

	readonly selectedService = signal<WorkflowServiceName>('ups');
	readonly logs = signal<WorkflowLogEntry[]>([]);
	readonly executionError = signal<string>('');
	readonly progressPercent = signal(0);
	readonly selectedFile = signal<File | null>(null);

	readonly status = this.workflowService.status;
	readonly report = this.workflowService.report;
	readonly steps = this.workflowService.steps;

	readonly completedStepCount = computed(() => this.logs().filter((log) => log.level === 'info').length);

	readonly canExecute = computed(() => this.status() !== 'running');

	readonly canViewReport = computed(() => this.status() === 'completed' && this.progressPercent() === 100);

	onServiceChange(event: Event): void {
		const target = event.target as HTMLSelectElement;
		this.selectedService.set(target.value as WorkflowServiceName);
	}

	onFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0] ?? null;

		if (!file) {
			this.selectedFile.set(null);
			return;
		}

		const isExcelFile = file.name.toLowerCase().endsWith('.xlsx');
		if (!isExcelFile) {
			this.selectedFile.set(null);
			this.executionError.set('Only .xlsx file is supported for import.');
			target.value = '';
			return;
		}

		this.executionError.set('');
		this.selectedFile.set(file);
	}

	clearSelectedFile(fileInput: HTMLInputElement): void {
		fileInput.value = '';
		this.selectedFile.set(null);
	}

	executeWorkflow(): void {
		if (!this.canExecute()) {
			return;
		}

		this.executionSub?.unsubscribe();
		this.progressSub?.unsubscribe();
		this.logs.set([]);
		this.executionError.set('');
		this.progressPercent.set(0);
		const startedAt = Date.now();
		this.startProgressTimer(startedAt);

		this.executionSub = this.workflowService.executeWorkflow(this.selectedService(), this.selectedFile()).subscribe({
			next: (entry) => {
				console.log('entry..........::', entry);
				this.logs.update((prev) => [...prev, entry]);
			},
			error: (error: Error) => {
				console.log('error..........::', error);
				this.progressSub?.unsubscribe();
				this.executionError.set(error.message);
			},
			complete: () => {
				console.log('complete..........::');
				this.progressSub?.unsubscribe();
				this.progressPercent.set(100);
			},
		});
	}

	openReport(): void {
		if (!this.canViewReport()) {
		  return;
		}
		const reportUrl = 'http://localhost:8000/reports/summary.html'; // Start server: python -m http.server 8000
		window.open(reportUrl, '_blank', 'noopener,noreferrer');
	}

	reset(fileInput?: HTMLInputElement): void {
		this.executionSub?.unsubscribe();
		this.progressSub?.unsubscribe();
		this.workflowService.reset();
		this.logs.set([]);
		this.executionError.set('');
		this.progressPercent.set(0);
		this.selectedFile.set(null);
		if (fileInput) {
			fileInput.value = '';
		}
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
		this.progressSub?.unsubscribe();
	}

	private startProgressTimer(startedAt: number): void {
		// Increase smoothly with elapsed time, but only reach 100% when workflow completes.
		this.progressSub = interval(120).subscribe(() => {
			const elapsedMs = Date.now() - startedAt;
			const maxInRunningState = 95;
			const rampDurationMs = 15000;
			const nextPercent = Math.min(maxInRunningState, (elapsedMs / rampDurationMs) * maxInRunningState);
			this.progressPercent.set(Math.round(nextPercent));
		});
	}
}
