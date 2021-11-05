import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

void (async () => {
  dotenv.config({ path: `${__dirname}/../.env.test` });
  const connection = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['src/**/*.entity{.ts,.js}'],
  });

  await connection.synchronize(true);
  console.info('Schema re-created');
})();
