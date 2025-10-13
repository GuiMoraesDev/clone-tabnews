import { databaseModel } from "@models/database";

export async function GET() {
  const result = await databaseModel.query("SELECT 1 + 1;");

  return Response.json({ status: result });
}
