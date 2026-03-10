import { WorkflowStep } from '../models/workflow.model';

export const workflowConfig = {
  webhookUrl: 'http://localhost:5678/webhook/eProduct-rest-apis-testing',
  importFileWebhookUrl: 'http://localhost:5678/webhook/eProduct-rest-apis-testing-import-file',
  reportUrl: 'http://localhost:8000/reports/summary.html', // Start server: python -m http.server 8000
} as const;

export const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: 'trigger', label: 'webhook triggered' },
  { id: 'routing', label: 'routing by service' },
  { id: 'compile', label: 'compile/convert' },
  { id: 'test', label: 'run test' },
  { id: 'report', label: 'report generated' },
];
