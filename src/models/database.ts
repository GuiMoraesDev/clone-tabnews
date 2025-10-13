import { Client } from "pg";

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
  });

  await client.connect();

  try {
    const result = await client.query(queryTextOrConfig, values);
    return result;
  } catch (error) {
    client.on("error", async (err) => {
      console.error("something bad has happened!", err.stack);
    });
  } finally {
    await client.end();
  }
};

export const databaseModel = {
  query,
};
