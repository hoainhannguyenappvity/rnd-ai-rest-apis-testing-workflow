import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { retry, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigService } from '../../services/config.service';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly configService = inject(ConfigService);
  private readonly workflowService = inject(WorkflowService);

  message = '';
  selectedFileName = '';
  uploadedApiSpecPathTask = '';
  isSaving = false;
  isUploading = signal(false);
  isExecuting = false;
  showPassword = false;
  apiReady = false;

  readonly configForm = this.fb.nonNullable.group({
    base_url: ['', Validators.required],
    apiUrl: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor() { }

  ngOnInit(): void {
    this.loadConfig();
  }

  saveConfig(): void {
    if (this.configForm.invalid || this.isSaving) {
      this.configForm.markAllAsTouched();
      return;
    }
    if (!this.uploadedApiSpecPathTask) {
      this.message = 'Please import TASK file successfully before saving.';
      return;
    }

    this.message = '';
    this.isSaving = true;
    this.configService
      .saveConfig({
        ...this.configForm.getRawValue(),
        apiSpecPathTask: this.uploadedApiSpecPathTask
      })
      .pipe(finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => {
          this.message = 'Saved config successfully.';
        },
        error: (error) => {
          this.message = error?.error?.message ?? 'Failed to save config.';
        }
      });
  }

  onTaskFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || this.isUploading()) {
      return;
    }

    this.message = '';
    this.isUploading.set(true);
    this.configService
      .uploadTask(file)
      .pipe(
        retry({ count: 1, delay: 800 }),
        // API may not be ready immediately when `npm start` launches FE and API together.
        // Retry once after a short delay to avoid "first upload fails, second succeeds".
        finalize(() => (this.isUploading.set(false)))
      )
      .subscribe({
        next: (response) => {
          this.isUploading.set(false);
          this.selectedFileName = file.name;
          this.uploadedApiSpecPathTask = response.apiSpecPathTask;
          this.message = `Uploaded ${file.name} successfully. Click SAVE to update config.`;
        },
        error: (error) => {
          this.message = error?.error?.message ?? 'Failed to upload file.';
        }
      });
  }

  executeWorkflow(): void {
    if (this.isExecuting) {
      return;
    }

    this.message = '';
    this.isExecuting = true;
    this.workflowService
      .executeWorkflow()
      .pipe(finalize(() => (this.isExecuting = false)))
      .subscribe({
        next: () => {
          this.message = 'Workflow executed. Check browser console logs.';
        },
        error: (error) => {
          this.message = error?.error?.message ?? 'Failed to execute workflow.';
        }
      });
  }

  goToReports(): void {
    void this.router.navigate(['/reports']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private loadConfig(): void {
    this.configService.getConfig().subscribe({
      next: (config) => {
        this.apiReady = true;
        this.configForm.setValue({
          base_url: config.base_url,
          apiUrl: config.env.apiUrl,
          username: config.env.username,
          password: config.env.password
        });
        this.uploadedApiSpecPathTask = '';
      },
      error: (error) => {
        this.apiReady = false;
        this.message = 'API is starting. Retrying config load...';
        timer(1200).subscribe(() => this.loadConfig());
      }
    });
  }

  canSave(): boolean {
    return this.apiReady && this.configForm.valid && !!this.uploadedApiSpecPathTask && !this.isSaving;
  }
}
