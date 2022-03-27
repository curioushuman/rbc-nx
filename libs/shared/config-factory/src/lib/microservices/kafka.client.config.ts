import { Transport, KafkaOptions } from '@nestjs/microservices';

export type KafkaClientOptions = { name: string } & KafkaOptions;

/**
 * TODO
 * [ ] This is untested (and probably doesn't work)
 *     I dropped this in favour of NATS, then quickly updated it to match
 *     Review more thoroughly if you ever come back this way
 */

export class KafkaClientConfig {
  protected options: KafkaClientOptions;

  constructor() {
    // const productionTmp = false;

    this.options = {
      name: 'kafka',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'kafka-client',
          brokers: this.brokers(),
          // ssl: productionTmp,
          // sasl: productionTmp ? kafka.sasl : undefined,
          // logLevel: productionTmp ? logLevel.ERROR : logLevel.INFO,
        },
      },
    };
  }

  public get(): KafkaClientOptions {
    return this.options;
  }

  private brokers(): string[] {
    return [this.buildBrokerUri()];
  }

  private buildBrokerUri(): string {
    const releaseNamespace = process.env.RBC_RELEASE_NAMESPACE;
    const kafkaPort = process.env.RBC_KAFKA_PORT || 9092;
    if (process.env.RBC_DEBUG) {
      console.log('NatsConfig:releaseNamespace', releaseNamespace);
      console.log('NatsConfig:kafkaPort', kafkaPort);
    }
    return `${releaseNamespace}-kafka.${releaseNamespace}.svc.cluster.local:${kafkaPort}`;
  }
}
