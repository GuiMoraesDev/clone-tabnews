import { databaseModel } from "@models/database";

export async function GET() {
  const updatedAt = new Date().toISOString();

  const pgStatusQuery = `
    SELECT 
      split_part(version(), ' ', 2) AS version,
      MAX(setting::int) AS max_connections,
      COUNT(*)::int AS opened_connections
    FROM pg_stat_activity, pg_settings
    WHERE pg_settings.name = 'max_connections';
  `;

  const databaseSettings = await databaseModel.query(pgStatusQuery);
  const { version, max_connections, opened_connections } =
    databaseSettings.rows[0];

  return Response.json({
    status: "healthy",
    updated_at: updatedAt,
    dependencies: {
      database: {
        version,
        max_connections,
        opened_connections,
      },
    },
  });
}
