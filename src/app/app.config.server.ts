import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import {
  provideServerRendering,
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { defaultConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      ServerModule,
      ServerTransferStateModule
    )
  ],
};

export const config = mergeApplicationConfig(defaultConfig, serverConfig);
