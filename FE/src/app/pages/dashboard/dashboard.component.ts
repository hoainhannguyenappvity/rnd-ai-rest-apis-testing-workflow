import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { retry, timer, startWith } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { WorkflowService } from '../../services/workflow.service';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
	private readonly fb = inject(FormBuilder);
	private readonly configService = inject(ConfigService);
	private readonly workflowService = inject(WorkflowService);
	private readonly destroyRef = inject(DestroyRef);

	private readonly executeStartedAt = signal(0);
	private executeTimerId: ReturnType<typeof setInterval> | null = null;

	message = signal('');
	selectedFileName = signal('');
	uploadedApiSpecPathTask = signal('');
	isSaving = signal(false);
	isUploading = signal(false);
	isExecuting = signal(false);
	showPassword = signal(false);
	apiReady = signal(false);
	executeElapsedMs = signal(0);
	executeProgressPercent = signal(0);
	private readonly isConfigFormValid = signal(false);
	readonly executeElapsedLabel = computed(() => {
		const totalSeconds = Math.floor(this.executeElapsedMs() / 1000);
		const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
		const seconds = (totalSeconds % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	});
	readonly canSave = computed(
		() => this.apiReady() && this.isConfigFormValid() && !!this.uploadedApiSpecPathTask() && !this.isSaving()
	);

	readonly configForm = this.fb.nonNullable.group({
		base_url: ['', Validators.required],
		apiUrl: ['', Validators.required],
		username: ['', Validators.required],
		password: ['', Validators.required]
	});

	constructor() { }

	ngOnInit(): void {
		this.configForm.statusChanges
			.pipe(startWith(this.configForm.status), takeUntilDestroyed(this.destroyRef))
			.subscribe(() => this.isConfigFormValid.set(this.configForm.valid));
		this.loadConfig();
	}

	ngOnDestroy(): void {
		this.stopExecuteTimer();
	}

	saveConfig(): void {
		if (this.configForm.invalid || this.isSaving()) {
			this.configForm.markAllAsTouched();
			return;
		}
		if (!this.uploadedApiSpecPathTask()) {
			this.message.set('Please import TASK file successfully before saving.');
			return;
		}

		this.message.set('');
		this.isSaving.set(true);
		this.configService
			.saveConfig({
				...this.configForm.getRawValue(),
				apiSpecPathTask: this.uploadedApiSpecPathTask()
			})
			.pipe(finalize(() => this.isSaving.set(false)))
			.subscribe({
				next: () => {
					this.message.set('Saved config successfully.');
				},
				error: (error) => {
					this.message.set(error?.error?.message ?? 'Failed to save config.');
				}
			});
	}

	onTaskFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file || this.isUploading()) {
			return;
		}

		this.message.set('');
		this.isUploading.set(true);
		this.configService
			.uploadTask(file)
			.pipe(
				retry({ count: 1, delay: 800 }),
				// Retry once after a short delay to avoid "first upload fails, second succeeds".
				finalize(() => (this.isUploading.set(false)))
			)
			.subscribe({
				next: (response) => {
					this.isUploading.set(false);
					this.selectedFileName.set(file.name);
					this.uploadedApiSpecPathTask.set(response.apiSpecPathTask);
					this.message.set(`Uploaded ${file.name} successfully. Click SAVE to update config.`);
				},
				error: (error) => {
					this.message.set(error?.error?.message ?? 'Failed to upload file.');
				}
			});
	}

	executeWorkflow(): void {
		if (this.isExecuting()) {
			return;
		}

		this.message.set('');
		this.isExecuting.set(true);
		this.startExecuteTimer();

		this.workflowService
			.executeWorkflow()
			.pipe(
				finalize(() => {
					this.isExecuting.set(false);
					this.executeProgressPercent.set(100);
					this.stopExecuteTimer();
				})
			)
			.subscribe({
				next: (response) => {
					this.message.set(response?.message ?? 'Workflow executed successfully.');
				},
				error: (error) => {
					this.message.set(error?.error?.message ?? 'Failed to execute workflow.');
				}
			});
	}

	goToReports(): void {
		window.open('http://localhost:3001/reports/summary.html', '_blank', 'noopener,noreferrer');
	}

	togglePasswordVisibility(): void {
		this.showPassword.update((value) => !value);
	}

	private startExecuteTimer(): void {
		this.stopExecuteTimer();
		this.executeStartedAt.set(Date.now());
		this.executeElapsedMs.set(0);
		this.executeProgressPercent.set(5);

		this.executeTimerId = setInterval(() => {
			const elapsedMs = Date.now() - this.executeStartedAt();
			this.executeElapsedMs.set(elapsedMs);
			const predicted = 5 + (elapsedMs / 1000) * 3;
			this.executeProgressPercent.set(Math.min(95, Math.floor(predicted)));
		}, 250);
	}

	private stopExecuteTimer(): void {
		if (this.executeTimerId) {
			clearInterval(this.executeTimerId);
			this.executeTimerId = null;
		}
	}

	private loadConfig(): void {
		this.configService.getConfig().subscribe({
			next: (config) => {
				this.apiReady.set(true);
				this.configForm.setValue({
					base_url: config.base_url,
					apiUrl: config.env.apiUrl,
					username: config.env.username,
					password: config.env.password
				});
				this.uploadedApiSpecPathTask.set('');
			},
			error: () => {
				this.apiReady.set(false);
				this.message.set('API is starting. Retrying config load...');
				timer(1200).subscribe(() => this.loadConfig());
			}
		});
	}
}
