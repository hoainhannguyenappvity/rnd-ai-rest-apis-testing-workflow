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
	selectedProductKey?: string;
	selectedRoleKey?: string;
	kmi_product?: Record<
		string,
		{
			base_url: string;
			access_token_api: string;
			roles: Record<string, { username: string; password: string }>;
		}
	>;
	apiSpecPathTask: string;
}

export interface TaskFileItem {
	name: string;
	path: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
	private readonly apiBase = '/api/config';

	constructor(private readonly http: HttpClient) { }

	getConfig(): Observable<WorkflowConfig> {
		return this.http.get<WorkflowConfig>(this.apiBase);
	}

	saveConfig(payload: {
		base_url: string;
		apiUrl: string;
		username: string;
		password: string;
		apiSpecPathTask: string;
		productKey?: string;
		roleKey?: string;
	}): Observable<{ message: string }> {
		return this.http.put<{ message: string }>(`${this.apiBase}/update`, payload);
	}

	uploadTask(file: File): Observable<{ message: string; apiSpecPathTask: string }> {
		const formData = new FormData();
		formData.append('taskFile', file);

		return this.http.post<{ message: string; apiSpecPathTask: string }>(`${this.apiBase}/upload-task`, formData);
	}

	getTaskFiles(): Observable<{ files: TaskFileItem[] }> {
		return this.http.get<{ files: TaskFileItem[] }>(`${this.apiBase}/task-files`);
	}
}
