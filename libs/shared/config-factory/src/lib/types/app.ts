import type { CommonConfigKeyValue } from './common-config';

/**
 * TODO
 * [ ] replace the functions with class definitions
 */

export type AppConfigGroup = CommonConfigKeyValue<App>;

export enum App {
  Port = 'port',
  Env = 'env',
  Release = 'release',
  Name = 'name',
  Namespace = 'namespace',
  Debug = 'debug',
}

export function appConfig(): AppConfigGroup {
  const config = {
    port: process.env.RBC_SVC_PORT,
    name: process.env.RBC_APP_NAME,
    release: process.env.RBC_RELEASE_NAME || process.env.RBC_APP_NAME,
    namespace: process.env.RBC_RELEASE_NAMESPACE || 'default',
    debug: process.env.RBC_DEBUG,
    env: process.env.NODE_ENV || 'development',
  };
  if (process.env.RBC_DEBUG) {
    console.log('appConfig()', config);
  }
  return config;
}
