import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private readonly apiBase = '/api/config';

  constructor(private readonly http: HttpClient) {}

  getConfig(): Observable<WorkflowConfig> {
    return this.http.get<WorkflowConfig>(this.apiBase);
  }

  saveConfig(payload: {
    base_url: string;
    apiUrl: string;
    username: string;
    password: string;
    apiSpecPathTask: string;
  }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiBase}/update`, payload);
  }

  uploadTask(file: File): Observable<{ message: string; apiSpecPathTask: string }> {
    const formData = new FormData();
    formData.append('taskFile', file);

    return this.http.post<{ message: string; apiSpecPathTask: string }>(`${this.apiBase}/upload-task`, formData);
  }
}