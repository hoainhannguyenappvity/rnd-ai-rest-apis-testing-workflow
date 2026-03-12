import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly configService = inject(ConfigService);
  private readonly http = inject(HttpClient);
  private readonly webhookUrl = 'http://localhost:5678/webhook/kmi-rest-apis-testing';

  constructor() {}

  executeWorkflow() {
    return this.configService
      .getConfig()
      .pipe(switchMap((config) => this.http.post<{ message?: string }>(this.webhookUrl, config)));
  }
}
