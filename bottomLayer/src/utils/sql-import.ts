import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const POSTGRES_URL = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?options=project%3D${process.env.ENDPOINT_ID}`;

export const sql = postgres(POSTGRES_URL, { ssl: 'require' });
