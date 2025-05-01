export async function GET(request: Request) {
  console.log(request);

  try {
    const result = await fetch(process.env.CHORD_SERVICE_URL + "/chord/key");
    const response = await result.json();
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data.message },
      { status: error.response?.status }
    );
  }
}
