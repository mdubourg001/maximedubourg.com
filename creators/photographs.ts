import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";
import sharp from "npm:sharp";

export default async function (
  buildPage: BuildPage,
  { watchFile, watchDir, addStaticToBundle, context }: SsgoBag
) {
  const photosDir = context.projectRoot + "/static/photographs";

  watchDir(photosDir);

  const photosFiles: any[] = (Array.from(walkSync(photosDir)) as any[]).filter(
    (e) => e.isFile && !e.name.endsWith(".thumb.webp")
  );
  const photos: any[] = [];

  for (const photo of photosFiles) {
    const splittedNamed = photo.name.split(".");
    const image = sharp(await Deno.readFile(photo.path));

    image
      .resize(916)
      .toFile(`${photosDir}/${splittedNamed[0]}.thumb.webp`)
      .then(() => console.log("Resized thumb for", photo.name));

    image.metadata().then((metadata) =>
      photos.push({
        path: `/photographs/${photo.name}`,
        thumb: `photographs/${splittedNamed[0]}.thumb.webp`,
        name: photo.name,
        index: splittedNamed.length === 3 ? Number(splittedNamed[1]) : Infinity,
        thumbWidth: 916,
        thumbHeight: Math.floor((metadata.height * 916) / metadata.width),
        originalWidth: metadata.width,
        originalHeight: metadata.height,
      })
    );
  }

  photos.sort((a, b) => a.index - b.index);

  buildPage(
    "photographs.html",
    { photos, mode: context.mode },
    {
      filename: "photographs.html",
      dir: "",
    }
  );
}
