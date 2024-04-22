export async function fetchImages({
  count = 10,
  batchSize = 3,
  seed = "FooBar",
}) {
  const images: unknown[] = [];
  const foo = [...Array(10)].map((_, i) => i + 1);
  for (let start = 0; start < count; start += batchSize) {
    const batch = foo.slice(start, start + batchSize);
    const ims = Promise.allSettled(
      batch.map(async (i) => {
        const res = await fetch(`https://picsum.photos/seed/${seed}${i}/info`);
        const data = await res.json();
        return data;
      }),
    );
    images.push(...(await ims));
  }
  return images.map(({ value: image }, i) => {
    return {
      id: image.id,
      userName: image.author,
      userEmail: `dummy-email-${i}@dont-mail-me.com`,
      fileName: `Image by ${image.author}`,
      thumbSrc: `https://picsum.photos/id/${image.id}/200/200`,
      downloadUrl: image.download_url,
      temperature: `${(Math.random() * 10 + 10).toFixed(0)}℃`,
      fileSize: `${(Math.random() * 5).toFixed(2)}MB`,
      width: image.width,
      height: image.height,
      extension: ".jpg",
    };
  });
}
