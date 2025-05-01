export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const suffix = searchParams.get("suffix");

  try {
    const result = await fetch(
      process.env.CHORD_SERVICE_URL +
        `/chord/find-by?key=${key}&suffix=${suffix}`
    );
    const response = await result.json();
    return Response.json(response);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data.message },
      { status: error.response?.status }
    );
  }
}
