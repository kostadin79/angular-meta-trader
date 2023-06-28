import {
  mergeApplicationConfig,
  ApplicationConfig
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { defaultConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
  ],
};

export const config = mergeApplicationConfig(defaultConfig, serverConfig);
