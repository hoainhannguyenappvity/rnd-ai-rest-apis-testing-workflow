import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly configService = inject(ConfigService);
  constructor() { }

  executeWorkflow() {
    return this.configService.getConfig().pipe(
      tap((config) => {
        console.log('Workflow config:', config);
        console.log('apiSpecPathTask:', config.apiSpecPathTask);
      })
    );
  }
}
