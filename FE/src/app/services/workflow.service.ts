import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  constructor(private readonly configService: ConfigService) {}

  executeWorkflow() {
    return this.configService.getConfig().pipe(
      tap((config) => {
        console.log('Workflow config:', config);
        console.log('apiSpecPathTask:', config.apiSpecPathTask);
      })
    );
  }
}
