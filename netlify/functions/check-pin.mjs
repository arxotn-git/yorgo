
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store"
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return Response.json({ ok: false }, { status: 405, headers });
  }

  try {
    const { pin } = await request.json();
    const expected = process.env.AUTH_PIN;

    return Response.json({
      ok: Boolean(expected) && pin === expected
    }, { headers });
  } catch {
    return Response.json({ ok: false }, { status: 400, headers });
  }
};
