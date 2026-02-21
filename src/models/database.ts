import { Client } from "pg";

const getSSLValues = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production";
};

const query = async (
  queryTextOrConfig: string,
  values?: string[] | number[] | boolean[],
) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  try {
    await client.connect();
    const result = await client.query(queryTextOrConfig, values);
    return result;
  } catch (error) {
    console.error("something bad has happened!", error);
    throw error;
  } finally {
    await client.end();
  }
};

export const databaseModel = {
  query,
};
