import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface WorkflowConfig {
  base_url: string;
  env: {
    apiUrl: string;
    username: string;
    password: string;
  };
  apiSpecPathTask: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly storageKey = 'workflow-dashboard-config';
  private config: WorkflowConfig = {
    base_url: 'https://selidasitetestapi.360awareqa.com',
    env: {
      apiUrl: 'https://selidasitetestapi.360awareqa.com/idsrv/connect/token',
      username: 'thuytrangle2205@gmail.com',
      password: 'P@ssword220595'
    },
    apiSpecPathTask: ''
  };

  constructor() {
    this.restoreFromStorage();
  }

  getConfig(): Observable<WorkflowConfig> {
    return of({ ...this.config, env: { ...this.config.env } });
  }

  saveConfig(payload: {
    base_url: string;
    apiUrl: string;
    username: string;
    password: string;
    apiSpecPathTask: string;
  }): Observable<{ message: string }> {
    this.config = {
      base_url: payload.base_url,
      env: {
        apiUrl: payload.apiUrl,
        username: payload.username,
        password: payload.password
      },
      apiSpecPathTask: payload.apiSpecPathTask
    };

    this.persistToStorage();
    return of({ message: 'Configuration saved in browser storage (UI-only mode).' });
  }

  uploadTask(file: File): Observable<{ message: string; apiSpecPathTask: string }> {
    if (!file.name.toLowerCase().endsWith('.md')) {
      return throwError(() => new Error('Only .md file is allowed.'));
    }

    const apiSpecPathTask = `./${file.name}`;
    return of({
      message: 'Task file selected successfully (UI-only mode).',
      apiSpecPathTask
    });
  }

  private restoreFromStorage(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as WorkflowConfig;
      if (parsed?.base_url && parsed?.env?.apiUrl && parsed?.env?.username && parsed?.env?.password) {
        this.config = parsed;
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }

  private persistToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.config));
  }
}
