import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { AppConfig, initAppConfig } from './core/app.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
    AppConfig,
  {
    provide: APP_INITIALIZER,
    useFactory: initAppConfig,
    deps: [AppConfig],
    multi: true
  },
  ],
};
