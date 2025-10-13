import { databaseModel } from "@models/database";

export async function GET() {
  const updatedAt = new Date().toISOString();

  const databaseSettings = await databaseModel.query(`
    SELECT name, setting, unit, short_desc
    FROM pg_settings
    WHERE name IN ('max_connections', 'server_version');
  `);

  const databaseActivities = await databaseModel.query(`
    SELECT *
    FROM pg_stat_activity;
  `);

  const version = databaseSettings.rows.find(
    (row) => row.name === "server_version",
  )?.setting;
  const maxConnections = databaseSettings.rows.find(
    (row) => row.name === "max_connections",
  )?.setting;

  return Response.json({
    status: "healthy",
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections: Number(maxConnections),
        opened_connections: databaseActivities.rowCount,
      },
    },
  });
}
