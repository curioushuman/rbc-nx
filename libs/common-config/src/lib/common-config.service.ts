import { ConfigFactory, ConfigObject } from '@nestjs/config';

import { appConfig, CommonConfig } from './types';
import { NatsClientConfig } from './microservices';
import { mongoDbConfig } from './databases';

// TODO
// * Testing

/**
 * Returns a config object to be injected into microservice based on common standards
 */
class CommonConfigService {
  static getConfig(): ConfigFactory {
    const config: CommonConfig = {
      app: appConfig(),
      database: {
        mongodb: mongoDbConfig(),
      },
      nats: new NatsClientConfig().get(),
    };

    return this.getConfigFactory(config);
  }

  static getConfigFactory(config: CommonConfig): ConfigFactory {
    let configObject: ConfigObject = {};
    configObject = Object.assign(configObject, config);
    return () => configObject;
  }
}

const configFactory = CommonConfigService.getConfig();
export { configFactory };
