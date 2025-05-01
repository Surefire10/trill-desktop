export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const frets = searchParams.get("frets");
  const fingers = searchParams.get("fingers");
  console.log(frets);
  console.log(fingers);
  try {
    const result = await fetch(
      process.env.CHORD_SERVICE_URL +
        `/chord/find?frets=${frets}&fingers=${fingers}`
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
