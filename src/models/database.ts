import { Client } from "pg";

const query = async (
  queryTextOrConfig: Parameters<Client["query"]>[0],
  values?: Parameters<Client["query"]>[1],
) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  const result = await client.query(queryTextOrConfig, values);

  await client.end();

  return result;
};

export const databaseModel = {
  query,
};
