# shared-config-factory

## Description

A config library for all microservices. This way we'll keep naming conventions consistent.

### Generator

This library was generated with [Nx](https://nx.dev).

# TODO

- [ ] This needs a concerted tidy
- [ ] AND reflect the new outer name, inwardly

### Use

Then in your app.module.ts, in your Module decorator use the forRootAsync wherever you need config values:

```typescript
import { configFactory } from '@curioushuman/shared-config-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    TiersModule,
  ],
  controllers: [],
  providers: [],
})
```

## Building

Run `nx build shared-config-factory` to build the library.

## Running unit tests

Run `nx test shared-config-factory` to execute the unit tests via [Jest](https://jestjs.io).
