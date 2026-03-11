import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  isSaving = false;
  isUploading = false;
  isExecuting = false;

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

    this.message = '';
    this.isSaving = true;
    this.configService
      .saveConfig(this.configForm.getRawValue())
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

    if (!file || this.isUploading) {
      return;
    }

    this.message = '';
    this.isUploading = true;
    this.configService
      .uploadTask(file)
      .pipe(finalize(() => (this.isUploading = false)))
      .subscribe({
        next: (response) => {
          this.selectedFileName = file.name;
          this.message = `Uploaded ${file.name}. Updated apiSpecPathTask to ${response.apiSpecPathTask}.`;
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

  private loadConfig(): void {
    this.configService.getConfig().subscribe({
      next: (config) => {
        this.configForm.setValue({
          base_url: config.base_url,
          apiUrl: config.env.apiUrl,
          username: config.env.username,
          password: config.env.password
        });
      },
      error: (error) => {
        this.message = error?.error?.message ?? 'Failed to load config.';
      }
    });
  }
}
