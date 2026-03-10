export type WorkflowServiceName = 'ups' | 'numbering';

export type WorkflowStatus = 'ready' | 'running' | 'completed' | 'failed';

export interface WorkflowLogEntry {
  step: string;
  message: string;
  timestamp: string;
  level: 'info' | 'error';
}

export interface WorkflowReport {
  serviceName: WorkflowServiceName;
  fileName: string;
  totalTests: number;
  passed: number;
  failed: number;
  executionTimeMs: number;
  completedAt: string;
}

export interface WorkflowStep {
  id: string;
  label: string;
}
