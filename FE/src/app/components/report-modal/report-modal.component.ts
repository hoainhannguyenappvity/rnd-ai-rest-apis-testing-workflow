import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { WorkflowReport } from '../../models/workflow.models';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './report-modal.component.html',
})
export class ReportModalComponent {
  @Input({ required: true }) isOpen = false;
  @Input() report: WorkflowReport | null = null;
  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }

  @HostListener('document:keydown.escape')
  onEscPress(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}
