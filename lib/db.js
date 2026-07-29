import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres.moewvaqumnoqoklsrhlr:VJqRvd4L8sBi6q62@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres';

let pool;

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
}

pool = global._pgPool;

export default pool;
