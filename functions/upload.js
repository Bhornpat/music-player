//API

export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const file = formData.get("file");
  const filename = formData.get("filename");

  if (!file || !filename) {
    return new Response("Missing file or filename", { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  await context.env.MUSIC_BUCKET.put(filename, buffer, {
    httpMetadata: { contentType: "audio/mpeg" }
  });

  const fileUrl = `https://${context.env.CF_ACCOUNT_ID}.r2.dev/uwu-music/${filename}`;

  return new Response(JSON.stringify({ url: fileUrl }), {
    headers: { "Content-Type": "application/json" }
  });
}
