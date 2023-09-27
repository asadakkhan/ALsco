import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IConfig } from '../interfaces/config';

export function initAppConfig(config: AppConfig) {
  return () => { return config.load(); }
}

@Injectable()
export class AppConfig {
  private http!: HttpClient;

  public config!: IConfig;

  constructor(private injector: Injector) { }

  load(): Promise<any> {
    this.http = this.injector.get(HttpClient);
    let configName: string = environment.configFileName;
    let ret = this.http
      .get<IConfig>(`./configs/${configName}`)
      .toPromise()
      .then(data => (this.config as any) = data);
    return ret;
  }
}