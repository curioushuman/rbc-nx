import type { AppConfigGroup } from '.';
import type { DatabaseConfigGroup } from '../databases';
import type { NatsClientOptions } from '../microservices';

// TODO
// - currently ALL values are optional; I need to be able to mark some as required
// there is probably a simpler way to do this

export type CommonConfigKeyValue<T extends string> = {
  [config in T]?: string | number;
};

export type CommonConfigGroup<T extends string, U extends string> = {
  [config in T]?: CommonConfigKeyValue<U>;
};

export type CommonConfig = {
  app: AppConfigGroup;
  database: DatabaseConfigGroup;
  nats: NatsClientOptions;
};
