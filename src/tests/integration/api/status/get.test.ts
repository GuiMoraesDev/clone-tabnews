test("GET to /api/status should returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/status");

  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.status).toBe("healthy");

  const parsedUpdatedAt = new Date(body.updated_at).toISOString();
  expect(body.updated_at).toEqual(parsedUpdatedAt);
});
