import type {
  CommonConfigGroup,
  CommonConfigKeyValue,
} from '../types/common-config';

/**
 * TODO
 * [ ] replace the functions with class definitions
 * [*] use DNS for the database host; see NATS for example
 */

export enum Databases {
  MongoDb = 'mongodb',
  Rdbms = 'rdbms',
}

export enum MongoDb {
  Uri = 'uri',
  UriTest = 'uriTest',
}

// TBC when I get to this point
export enum Rdbms {
  Uri = 'uri',
}

export type DatabaseConfigGroup = CommonConfigGroup<Databases, MongoDb | Rdbms>;

function mongoUri(): string {
  const appName = process.env.RBC_APP_NAME;
  const dbName = process.env.RBC_DATABASE_NAME || appName;
  const releaseName = process.env.RBC_RELEASE_NAME;
  const releaseNamespace = process.env.RBC_RELEASE_NAMESPACE;
  const dbSvcName = process.env.RBC_DATABASE_SVC_NAME;
  const mongoDbPort = process.env.RBC_DATABASE_PORT || 27107;
  if (process.env.RBC_DEBUG) {
    console.log('MongoDbUri:dbSvcName', dbSvcName);
    console.log('MongoDbUri:mongoDbPort', mongoDbPort);
    console.log(
      'NatsUri',
      `mongodb://${releaseName}-mongodb.${releaseNamespace}.svc.cluster.local:${mongoDbPort}/${dbName}`,
    );
  }
  return `mongodb://${releaseName}-mongodb.${releaseNamespace}.svc.cluster.local:${mongoDbPort}/${dbName}`;
}

// function mongoIpUri() {
//   const appName = process.env.RBC_APP_NAME;
//   const dbSvcName = process.env.RBC_DATABASE_SVC_NAME.replace(
//     /-/gi,
//     '_',
//   ).toUpperCase();
//   const dbName = process.env.RBC_DATABASE_NAME || appName;
//   const dbPort = process.env.RBC_DATABASE_PORT || 27107;
//   const hostEnv = `${dbSvcName}_SERVICE_HOST`;
//   const dbHost = process.env[hostEnv];
//   if (process.env.RBC_DEBUG) {
//     console.log('MongoIpUri:hostEnv', hostEnv);
//     console.log('MongoIpUri:dbSvcName', dbSvcName);
//     console.log(
//       'MongoIpUri:mongoUri()',
//       `mongodb://${dbHost}:${dbPort}/${dbName}`,
//     );
//   }
//   return `mongodb://${dbHost}:${dbPort}/${dbName}`;
// }

export function mongoDbConfig(): CommonConfigKeyValue<MongoDb> {
  const uri = mongoUri();
  return {
    uri,
    uriTest: `${uri}-test`,
  };
}
