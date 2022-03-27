import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggableHttpMiddleware } from '@curioushuman/loggable';
import { configFactory } from '@curioushuman/config-factory';
import { MongoDbModule } from '@curioushuman/mongo-db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from '../members/members.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
      isGlobal: true,
    }),
    MongoDbModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggableHttpMiddleware);
  }
}
