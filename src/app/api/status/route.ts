import { databaseModel } from "@models/database";

export async function GET() {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await databaseModel.query(`
    SHOW server_version;
  `);
  const databaseVersionValue = databaseVersionResult.rows[0]?.server_version;

  const databaseMaxConnectionsResult = await databaseModel.query(`
    SHOW max_connections;
  `);
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0]?.max_connections;

  const databaseActivities = await databaseModel.query(
    `
    SELECT COUNT(*)::int
    FROM pg_stat_activity
    WHERE datname = $1;
  `,
    [process.env.POSTGRES_DB || "postgres"],
  );
  const databaseOpenedConnectionsValue = databaseActivities.rows[0]?.count;

  return Response.json({
    status: "healthy",
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
