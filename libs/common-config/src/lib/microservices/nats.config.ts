import { Transport, NatsOptions } from '@nestjs/microservices';

export type NatsClientOptions = { name: string } & NatsOptions;

export class NatsClientConfig {
  protected options: NatsClientOptions;

  constructor() {
    // const productionTmp = false;

    this.options = {
      name: 'nats',
      transport: Transport.NATS,
      options: {
        servers: this.servers(),
      },
    };
  }

  public get(): NatsClientOptions {
    return this.options;
  }

  private servers(): string[] {
    return [this.buildServerUri()];
  }

  private buildServerUri(): string {
    // we use umbrella release name if we're within the umbrella
    // otherwise the local release name
    const releaseName =
      process.env.RBC_UMBRELLA_RELEASE_NAME || process.env.RBC_RELEASE_NAME;
    const releaseNamespace = process.env.RBC_RELEASE_NAMESPACE;
    const natsPort = process.env.RBC_NATS_PORT || 4222;
    if (process.env.RBC_DEBUG) {
      console.log('NatsConfig:releaseNamespace', releaseNamespace);
      console.log('NatsConfig:natsPort', natsPort);
      console.log(
        'NatsUri',
        `nats://${releaseName}-nats.${releaseNamespace}.svc.cluster.local:${natsPort}`,
      );
    }
    return `nats://${releaseName}-nats.${releaseNamespace}.svc.cluster.local:${natsPort}`;
  }
}
