import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";

export default async function (
  buildPage: BuildPage,
  { watchFile, watchDir, addStaticToBundle, context }: SsgoBag
) {
  const photosDir = context.projectRoot + "/static/photographs";

  watchDir(photosDir);

  const photosFiles: any[] = (Array.from(walkSync(photosDir)) as any[]).filter(
    (e) => e.isFile
  );
  const photos: any[] = [];

  for (const photo of photosFiles) {
    const splittedNamed = photo.name.split(".");

    photos.push({
      path: `/photographs/${photo.name}`,
      name: photo.name,
      index: splittedNamed.length === 3 ? Number(splittedNamed[1]) : Infinity,
    });
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
