import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as csv from 'csvtojson';
import { CellParser } from 'csvtojson/v2/Parameters';
import * as path from 'path';
import { Connection, getConnection } from 'typeorm';

export const importFixtures = async (
  connection: Connection,
  fixtures: any[],
  colParser?: Record<string, CellParser>,
): Promise<void> => {
  const fixturesData = await Promise.all(
    fixtures.map(([ fileName ]) =>
      csv({
        flatKeys: true,
        ...(colParser ? { colParser } : null),
      }).fromFile(path.join(__dirname, './fixtures/', `${fileName}.csv`)),
    ),
  );
  const instances = fixturesData
    .map((data, index) => {
      const [, entity] = fixtures[index];
      return connection.manager.create(entity, data);
    })
    .reduce((a, b) => [...a, ...b], []);

  await connection.manager.save(instances, { chunk: 10000 });
};

export const reinitialize = async (): Promise<void> => {
  const connection = await getConnection();
  return connection.synchronize(true);
};

export const clearAll = async (): Promise<void> => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
  }
};

export const configModules = ({
  configModuleOptions,
  typeOrmModuleOptions,
  gqlModuleOptions,
}: {
  configModuleOptions?: ConfigModuleOptions;
  typeOrmModuleOptions?: TypeOrmModuleAsyncOptions;
  gqlModuleOptions?: GqlModuleOptions;
} = {}): [DynamicModule, DynamicModule, DynamicModule, DynamicModule] => [
    ConfigModule.forRoot({
      load: [applicationConfig],
      validationSchema,
      envFilePath: path.resolve(__dirname, '../.env.test'),
      isGlobal: true,
      ...(configModuleOptions && configModuleOptions),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (appConfig) => ({
        type: 'postgres',
        url: appConfig.databaseUrl,
        autoLoadEntities: true,
        logging: false,
        keepConnectionAlive: true,
        extra: { queryLimit: appConfig.queryLimit, defaultLanguage: appConfig.defaultLanguage },
        ...(typeOrmModuleOptions && typeOrmModuleOptions),
      }),
      inject: [applicationConfig.KEY],
    }),

    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: true,
      fieldResolverEnhancers: ['guards'],
      ...(gqlModuleOptions && gqlModuleOptions),
    }),
    ScheduleModule.forRoot(),
  ];
