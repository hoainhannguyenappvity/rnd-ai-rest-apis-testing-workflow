import { Component, DestroyRef, ElementRef, HostListener, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { retry, startWith, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { WorkflowService } from '../../services/workflow.service';

type RoleConfig = { username: string; password: string };
type ProductConfig = {
	base_url: string;
	access_token_api: string;
	roles: Record<string, RoleConfig>;
};
type TaskFileOption = { name: string; path: string };

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [ReactiveFormsModule, FormsModule, MatDividerModule],
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
	private readonly fb = inject(FormBuilder);
	private readonly configService = inject(ConfigService);
	private readonly workflowService = inject(WorkflowService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly elementRef = inject(ElementRef<HTMLElement>);

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
	taskFileOptions = signal<TaskFileOption[]>([]);
	searchTerm = signal('');
	isTaskFileDropdownOpen = signal(false);
	selectedTaskFilePath = signal('');
	executeElapsedMs = signal(0);
	executeProgressPercent = signal(0);
	disabledReport = signal(true);
	private readonly isConfigFormValid = signal(false);
	readonly productConfigMap = signal<Record<string, ProductConfig>>({});
	readonly productOptions = computed(() =>
		Object.keys(this.productConfigMap()).map((key) => ({
			key,
			label: this.toProductLabel(key)
		}))
	);
	readonly selectedProductKey = signal('');
	readonly selectedRoleKey = signal('');
	readonly roleOptions = computed(() => {
		const selectedProduct = this.productConfigMap()[this.selectedProductKey()];
		if (!selectedProduct?.roles) {
			return [];
		}

		return Object.keys(selectedProduct.roles).map((key) => ({
			key,
			label: this.toRoleLabel(key)
		}));
	});
	readonly executeElapsedLabel = computed(() => {
		const totalSeconds = Math.floor(this.executeElapsedMs() / 1000);
		const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
		const seconds = (totalSeconds % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	});
	readonly isTaskFileFromListSelected = computed(() => !!this.selectedTaskFilePath());
	filteredTaskFileOptions = computed(() => {
		const keyword = this.searchTerm().trim().toLowerCase();
		if (!keyword) {
			return this.taskFileOptions();
		}
		return this.taskFileOptions().filter((file) => file.name.toLowerCase().includes(keyword));
	});
	readonly selectedTaskFileLabel = computed(() => {
		const selected = this.taskFileOptions().find((file) => file.path === this.selectedTaskFilePath());
		return selected?.name ?? '-- No selection (use import form below) --';
	});
	readonly canImportTaskFile = computed(
		() => !this.isTaskFileFromListSelected() && this.apiReady() && !this.isUploading() && !this.isExecuting()
	);
	readonly canSave = computed(
		() =>
			this.apiReady() &&
			this.isConfigFormValid() &&
			!!this.uploadedApiSpecPathTask() &&
			!this.isSaving() &&
			!this.isExecuting()
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
		this.loadTaskFiles();
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
				apiSpecPathTask: this.uploadedApiSpecPathTask(),
				productKey: this.selectedProductKey() || undefined,
				roleKey: this.selectedRoleKey() || undefined
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
					this.selectedTaskFilePath.set('');
					this.selectedFileName.set(file.name);
					this.uploadedApiSpecPathTask.set(response.apiSpecPathTask);
					this.message.set(`Uploaded ${file.name} successfully. Click SAVE to update config.`);
				},
				error: (error) => {
					this.message.set(error?.error?.message ?? 'Failed to upload file.');
				}
			});
	}

	onTaskFileFromListChange(taskFilePath: string, fileInput?: HTMLInputElement): void {
		this.selectedTaskFilePath.set(taskFilePath);
		this.isTaskFileDropdownOpen.set(false);
		if (!taskFilePath) {
			this.selectedFileName.set('');
			this.uploadedApiSpecPathTask.set('');
			return;
		}

		const selected = this.taskFileOptions().find((file) => file.path === taskFilePath);
		this.selectedFileName.set(selected?.name ?? '');
		this.uploadedApiSpecPathTask.set(taskFilePath);
		if (fileInput) {
			fileInput.value = '';
		}
		this.message.set('');
	}

	toggleTaskFileDropdown(event?: Event): void {
		event?.stopPropagation();
		if (this.isExecuting() || this.isUploading()) {
			return;
		}
		this.isTaskFileDropdownOpen.update((value) => !value);
	}

	closeTaskFileDropdown(): void {
		this.isTaskFileDropdownOpen.set(false);
		this.searchTerm.set('');
	}

	onSearchTermChange(value: string): void {
		this.searchTerm.set(value ?? '');
	}

	selectTaskFileFromDropdown(taskFilePath: string, fileInput?: HTMLInputElement): void {
		this.onTaskFileFromListChange(taskFilePath, fileInput);
	}

	clearTaskFileSelection(fileInput?: HTMLInputElement): void {
		this.onTaskFileFromListChange('', fileInput);
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent): void {
		if (!this.isTaskFileDropdownOpen()) {
			return;
		}

		const targetNode = event.target as Node | null;
		if (targetNode && !this.elementRef.nativeElement.contains(targetNode)) {
			this.closeTaskFileDropdown();
		}
	}

	executeWorkflow(): void {
		if (this.isExecuting()) {
			return;
		}

		this.message.set('');
		this.isExecuting.set(true);
		this.disabledReport.set(true);
		this.startExecuteTimer();

		this.workflowService.executeWorkflow().pipe(
			finalize(() => {
				this.isExecuting.set(false);
				this.executeProgressPercent.set(100);
				this.disabledReport.set(false);
				this.stopExecuteTimer();
			})
		).subscribe({
			next: (response) => {
				this.message.set(response?.message ?? 'Workflow executed successfully.');
				this.isExecuting.set(true);
			},
			error: (error) => {
				this.message.set(error?.error?.message ?? 'Failed to execute workflow.');
				this.isExecuting.set(true);
			}
		});
	}

	goToReports(): void {
		window.open('http://localhost:3001/reports/summary.html', '_blank', 'noopener,noreferrer');
	}

	togglePasswordVisibility(): void {
		this.showPassword.update((value) => !value);
	}

	onProductChange(productKey: string): void {
		this.selectedProductKey.set(productKey);
		const product = this.productConfigMap()[productKey];
		if (!product) {
			this.selectedRoleKey.set('');
			return;
		}

		const firstRoleKey = Object.keys(product.roles ?? {})[0] ?? '';
		this.configForm.patchValue({
			base_url: product.base_url,
			apiUrl: product.access_token_api
		});
		this.applyRoleSelection(productKey, firstRoleKey);
	}

	onRoleChange(roleKey: string): void {
		this.applyRoleSelection(this.selectedProductKey(), roleKey);
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
				this.productConfigMap.set(config.kmi_product ?? {});

				this.configForm.setValue({
					base_url: config.base_url,
					apiUrl: config.env.apiUrl,
					username: config.env.username,
					password: config.env.password
				});

				const preferredProduct =
					(config.selectedProductKey && this.productConfigMap()[config.selectedProductKey] ? config.selectedProductKey : '') ||
					this.findProductByBaseUrl(config.base_url) ||
					Object.keys(this.productConfigMap())[0] ||
					'';
				this.selectedProductKey.set(preferredProduct);

				const preferredRole =
					(config.selectedRoleKey && this.productConfigMap()[preferredProduct]?.roles?.[config.selectedRoleKey]
						? config.selectedRoleKey
						: '') ||
					this.findRoleByCredentials(preferredProduct, config.env.username, config.env.password) ||
					Object.keys(this.productConfigMap()[preferredProduct]?.roles ?? {})[0] ||
					'';
				this.selectedRoleKey.set(preferredRole);
				this.uploadedApiSpecPathTask.set(config.apiSpecPathTask ?? '');
				this.selectedFileName.set(this.extractFileName(config.apiSpecPathTask ?? ''));
				this.syncTaskSelectionWithUploadedPath();
			},
			error: () => {
				this.apiReady.set(false);
				this.message.set('API is starting. Retrying config load...');
				timer(1200).subscribe(() => this.loadConfig());
			}
		});
	}

	private loadTaskFiles(): void {
		this.configService.getTaskFiles().subscribe({
			next: (response) => {
				this.taskFileOptions.set(response.files ?? []);
				this.syncTaskSelectionWithUploadedPath();
			},
			error: () => {
				this.taskFileOptions.set([]);
			}
		});
	}

	private applyRoleSelection(productKey: string, roleKey: string): void {
		const role = this.productConfigMap()[productKey]?.roles?.[roleKey];
		this.selectedRoleKey.set(roleKey);
		if (!role) {
			return;
		}

		this.configForm.patchValue({
			username: role.username,
			password: role.password
		});
	}

	private findProductByBaseUrl(baseUrl: string): string {
		for (const [key, product] of Object.entries(this.productConfigMap())) {
			if (product.base_url === baseUrl) {
				return key;
			}
		}
		return '';
	}

	private findRoleByCredentials(productKey: string, username: string, password: string): string {
		const roles = this.productConfigMap()[productKey]?.roles ?? {};
		for (const [key, role] of Object.entries(roles)) {
			if (role.username === username && role.password === password) {
				return key;
			}
		}
		return '';
	}

	private toProductLabel(productKey: string): string {
		const map: Record<string, string> = {
			'360aware': '360 Plus',
			'360portal': '360 Portal',
			'360logistics': '360 Logistics'
		};
		return map[productKey] ?? productKey;
	}

	private toRoleLabel(roleKey: string): string {
		return roleKey.split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
	}

	private syncTaskSelectionWithUploadedPath(): void {
		const uploadedPath = this.uploadedApiSpecPathTask();
		if (!uploadedPath) {
			this.selectedTaskFilePath.set('');
			return;
		}

		const matched = this.taskFileOptions().find((file) => file.path === uploadedPath);
		this.selectedTaskFilePath.set(matched ? uploadedPath : '');
	}

	private extractFileName(filePath: string): string {
		if (!filePath) {
			return '';
		}

		const parts = filePath.split('/');
		return parts[parts.length - 1] ?? '';
	}
}
