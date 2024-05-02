import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";
import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";
import sharp from "npm:sharp";

export default async function (
  buildPage: BuildPage,
  { watchFile, watchDir, addStaticToBundle, context }: SsgoBag
) {
  const metaFile = context.projectRoot + "/assets/photographs.json";
  const photosDir = context.projectRoot + "/static/photographs";

  watchDir(photosDir);

  const photosFiles: any[] = (Array.from(walkSync(photosDir)) as any[]).filter(
    (e) => e.isFile && !e.name.endsWith(".thumb.webp")
  );
  const { default: globalMetadata } = await import(metaFile, {
    with: { type: "json" },
  });
  const photos: any[] = [];

  let i = 0;
  for (const photo of photosFiles) {
    console.debug(
      `Processing ${photo.name}... (${i + 1}/${photosFiles.length})`
    );

    const splittedNamed = photo.name.split(".");
    const thumbPath = `${photosDir}/${splittedNamed[0]}.thumb.webp`;

    const image = sharp(await Deno.readFile(photo.path));

    if (!existsSync(thumbPath)) {
      image.resize(916).toFile(thumbPath);
    }

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
        metadata: globalMetadata[photo.name] || {},
      })
    );

    i++;
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
