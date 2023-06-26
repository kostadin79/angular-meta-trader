import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  mergeApplicationConfig,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { SocketService } from "app-core/services/socket.service";

import { providersForStore } from "app-core/store/store-providers";

const browserConfig: ApplicationConfig = {
  providers: [
    SocketService,
    importProvidersFrom(
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode,
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
  ],
};
export const defaultConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ...providersForStore
  ],
};

export const config = mergeApplicationConfig(defaultConfig, browserConfig);
