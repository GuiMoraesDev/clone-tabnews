export async function GET() {
  const updatedAt = new Date().toISOString();

  return Response.json({ status: "healthy", updated_at: updatedAt });
}
