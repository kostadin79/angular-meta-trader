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

  const userSocketAddress = JSON.stringify(process.env['WS_SOCKET_URL']);
  const defaultSocketAddress = JSON.stringify('127.0.0.1:8888');

  const newConfig = config?.plugins
    ? {
        ...config,
        plugins: [
          ...config.plugins,
          new DefinePlugin({
            WS_SOCKET: userSocketAddress ?? defaultSocketAddress,
            SSL_SOCKET: !!userSocketAddress,
            PRODUCTION_MODE: production,
            SSR: targetOptions.target === 'server',
            NGRX_RUNTIME_CHECKS: ngrxRuntimeChecks,
          }),
        ],
      }
    : {};

  return config?.plugins ? newConfig : config;
};
