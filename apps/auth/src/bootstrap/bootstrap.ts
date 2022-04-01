import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { LoggableLogger } from '@curioushuman/loggable';

interface NestAppClass {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): unknown;
}

// TODO
// * replace this with a cleaner method
// - better handling of ConfigService
// - move some of the bootstrap logic to common module

export class App {
  public static async start(module: NestAppClass): Promise<INestApplication> {
    const app = await NestFactory.create(module);
    return await App.setup(app);
  }

  public static async setup(app: INestApplication): Promise<INestApplication> {
    // instantiate config
    const configService = app.get(ConfigService);

    // setup microservices
    // await this.setupMicroservices(app, configService);

    // setup swagger
    this.setupSwagger(app);

    // global settings
    app.setGlobalPrefix('api/auth');
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(new LoggableLogger());

    // start listening
    const port = configService.get<string>('app.port') || 3000;
    const release = configService.get<string>('app.release');
    const namespace = configService.get<string>('app.namespace');
    await app.listen(port);
    console.log(`${release}, listening on port ${port} within ${namespace}`);

    return app;
  }

  public static async setupMicroservices(
    app: INestApplication,
    configService: ConfigService
  ) {
    // add microservices
    const servers = configService.get<string[]>('nats.options.servers');
    if (!servers || servers.length === 0) {
      return;
    }
    app.connectMicroservice({
      transport: Transport.NATS,
      options: {
        servers: servers,
        debug: true,
      },
    });

    console.log(`Microservice connected via ${servers[0]}`);

    // start the service
    await app.startAllMicroservices();
  }

  public static setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('RbC Ecosystem : Auth & Members')
      .setDescription('Auth & members API')
      .setVersion('1.0')
      .addTag('authentication')
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
      ignoreGlobalPrefix: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs/api', app, document);
  }
}
