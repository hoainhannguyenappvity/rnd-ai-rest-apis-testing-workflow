import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';

import { MatDividerModule } from '@angular/material/divider';
import { workflowConfig } from '../../../core/config/workflow.config';
import { WorkflowLogEntry, WorkflowServiceName } from '../../../core/models/workflow.model';
import { WorkflowExecutionService } from '../../../core/services/workflow-execution.service';

@Component({
	selector: 'app-workflow-runner',
	standalone: true,
	imports: [MatDividerModule],
	templateUrl: './workflow-runner-page.component.html',
})
export class WorkflowRunnerPageComponent implements OnDestroy {
	private readonly workflowService = inject(WorkflowExecutionService);
	private executionSub?: Subscription;
	private progressSub?: Subscription;
	private timerSub?: Subscription;

	readonly serviceOptions = signal<{ value: WorkflowServiceName; label: string }[]>([
		{ value: 'ups', label: 'UPS' },
		{ value: 'numbering', label: 'Numbering' },
	]);
	readonly selectedService = signal<WorkflowServiceName>('ups');
	readonly logs = signal<WorkflowLogEntry[]>([]);
	readonly executionError = signal<string>('');
	readonly progressPercent = signal(0);
	readonly elapsedSeconds = signal(0);
	readonly selectedFile = signal<File | null>(null);
	readonly isDragOverFile = signal(false);

	readonly status = this.workflowService.status;
	readonly report = this.workflowService.report;
	readonly steps = this.workflowService.steps;

	readonly completedStepCount = computed(() => this.logs().filter((log) => log.level === 'info').length);
	readonly selectedFileName = computed(() => this.selectedFile()?.name ?? '');

	readonly canExecute = computed(() => this.status() !== 'running');
	readonly isServiceSelectionDisabled = computed(() => this.status() === 'running');
	readonly isFileSelectionDisabled = computed(() => this.status() === 'running');

	readonly canViewReport = computed(() => this.status() === 'completed' && this.progressPercent() === 100);
	readonly formattedElapsedTime = computed(() => {
		const totalSeconds = this.elapsedSeconds();
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
	});

	onServiceChange(event: Event): void {
		if (this.isServiceSelectionDisabled()) {
			return;
		}

		const target = event.target as HTMLSelectElement;
		this.selectedService.set(target.value as WorkflowServiceName);
	}

	onFileChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0] ?? null;
		this.handleFileSelection(file, target);
	}

	onFileDragOver(event: DragEvent): void {
		event.preventDefault();
		if (this.isFileSelectionDisabled()) {
			return;
		}
		this.isDragOverFile.set(true);
	}

	onFileDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.isDragOverFile.set(false);
	}

	onFileDrop(event: DragEvent, fileInput: HTMLInputElement): void {
		event.preventDefault();
		if (this.isFileSelectionDisabled()) {
			return;
		}
		this.isDragOverFile.set(false);
		const file = event.dataTransfer?.files?.[0] ?? null;
		this.handleFileSelection(file, fileInput);
	}

	onFilePickerClick(fileInput: HTMLInputElement): void {
		if (this.isFileSelectionDisabled()) {
			return;
		}
		fileInput.click();
	}

	clearSelectedFile(fileInput: HTMLInputElement): void {
		fileInput.value = '';
		this.selectedFile.set(null);
		this.executionError.set('');
	}

	executeWorkflow(): void {
		if (!this.canExecute()) {
			return;
		}

		this.executionSub?.unsubscribe();
		this.progressSub?.unsubscribe();
		this.timerSub?.unsubscribe();
		this.logs.set([]);
		this.executionError.set('');
		this.progressPercent.set(0);
		this.elapsedSeconds.set(0);
		const startedAt = Date.now();
		this.startProgressTimer(startedAt);
		this.startExecutionTimer(startedAt);

		this.executionSub = this.workflowService.executeWorkflow(this.selectedService(), this.selectedFile()).subscribe({
			next: (entry) => {
				this.logs.update((prev) => [...prev, entry]);
			},
			error: (error: Error) => {
				this.elapsedSeconds.set(Math.floor((Date.now() - startedAt) / 1000));
				this.progressSub?.unsubscribe();
				this.timerSub?.unsubscribe();
				this.executionError.set(error.message);
			},
			complete: () => {
				this.elapsedSeconds.set(Math.floor((Date.now() - startedAt) / 1000));
				this.progressSub?.unsubscribe();
				this.timerSub?.unsubscribe();
				this.progressPercent.set(100);
			},
		});
	}

	openReport(): void {
		if (!this.canViewReport()) {
			return;
		}
		window.open(workflowConfig.reportUrl, '_blank', 'noopener,noreferrer');
	}

	reset(fileInput?: HTMLInputElement): void {
		this.executionSub?.unsubscribe();
		this.progressSub?.unsubscribe();
		this.timerSub?.unsubscribe();
		this.workflowService.reset();
		this.logs.set([]);
		this.executionError.set('');
		this.progressPercent.set(0);
		this.elapsedSeconds.set(0);
		this.selectedFile.set(null);
		if (fileInput) {
			fileInput.value = '';
		}
	}

	statusBadgeClass(): string {
		const status = this.status();

		if (status === 'running') {
			return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
		}

		if (status === 'completed') {
			return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
		}

		if (status === 'failed') {
			return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
		}

		return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
	}

	ngOnDestroy(): void {
		this.executionSub?.unsubscribe();
		this.progressSub?.unsubscribe();
		this.timerSub?.unsubscribe();
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

	private startExecutionTimer(startedAt: number): void {
		this.timerSub = interval(1000).subscribe(() => {
			const elapsedMs = Date.now() - startedAt;
			this.elapsedSeconds.set(Math.floor(elapsedMs / 1000));
		});
	}

	private handleFileSelection(file: File | null, fileInput: HTMLInputElement): void {
		if (!file) {
			this.selectedFile.set(null);
			return;
		}

		const isExcelFile = file.name.toLowerCase().endsWith('.xlsx');
		if (!isExcelFile) {
			this.selectedFile.set(null);
			this.executionError.set('Only .xlsx file is supported for import.');
			fileInput.value = '';
			return;
		}

		this.executionError.set('');
		this.selectedFile.set(file);
	}
}

