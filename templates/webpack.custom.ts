import {
  CustomWebpackBrowserSchema,
  TargetOptions,
} from '@angular-builders/custom-webpack';

import { Configuration, DefinePlugin } from 'webpack';

export default (
  config: Configuration,
  angularJsonConfig: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  const configurations = targetOptions?.configuration?.split(',');
  const production = !!( configurations?.includes('production') || angularJsonConfig.buildOptimizer);
  const ngrxRuntimeChecks = !production;

  const newConfig = config?.plugins
    ? {
        ...config,
        plugins: [
          ...config.plugins,
          new DefinePlugin({
            WS_SOCKET: process.env['WS_SOCKET_URL'],
            PRODUCTION_MODE: production,
            SSR: targetOptions.target === 'server',
            NGRX_RUNTIME_CHECKS: ngrxRuntimeChecks
          }),
        ],
      }
    : {};



  return config?.plugins ? newConfig : config;
};
