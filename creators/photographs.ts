import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";
import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";
import sharp from "npm:sharp";

async function processAlbum(albumPath: string, context: SsgoBag["context"]) {
  console.debug(`Processing ALBUM ${albumPath}...`);

  const photosFiles: any[] = Array.from(
    walkSync(albumPath, {
      maxDepth: 1,
      includeDirs: false,
      includeSymlinks: false,
      exts: ["jpeg"],
      skip: [/\.thumb\./],
    })
  ) as any[];
  const subAlbums = (
    Array.from(
      walkSync(albumPath, {
        maxDepth: 1,
        includeFiles: false,
        includeSymlinks: false,
      })
    ) as any[]
  ).filter((e) => e.path !== albumPath);

  const photos: any[] = [];

  let i = 0;
  for (const photo of photosFiles) {
    const splittedName: string[] = photo.name.split(".");
    const thumbPath = `${albumPath}/${splittedName[0]}.thumb.jpeg`;
    const isAlbum = subAlbums.some((e) => e.name === splittedName[0]);
    const basePath =
      "photographs/" + (albumPath.split("/photographs/")[1] ?? "");
    const albumPhotos = isAlbum
      ? await processAlbum(`${albumPath}/${splittedName[0]}`, context)
      : undefined;

    console.debug(
      `Processing ${photo.name}${isAlbum ? " (is subalbum)" : ""}... (${
        i + 1
      }/${photosFiles.length})`
    );

    const image = sharp(await Deno.readFile(photo.path));

    if (!existsSync(thumbPath)) {
      image
        .resize(916, undefined, { withoutEnlargement: true })
        .toFile(thumbPath);
    }

    image.metadata().then((metadata) => {
      photos.push({
        path: `${basePath}/${photo.name}`,
        thumb: `${basePath}/${splittedName[0]}.thumb.jpeg`.replace("//", "/"),
        name: photo.name,
        metadata: {
          alt: splittedName[0].replace(/-/g, ' '),
        },
        index: splittedName.length === 3 ? Number(splittedName[1]) : Infinity,
        thumbWidth: 916,
        thumbHeight: Math.floor((metadata.height * 916) / metadata.width),
        originalWidth: metadata.width,
        originalHeight: metadata.height,
        isAlbum,
        albumPhotos: albumPhotos?.sort((a, b) => a.index - b.index),
        albumPath: isAlbum ? `photographs/${splittedName[0]}.html` : undefined,
      });
    });

    i++;
  }

  // small hack because sharp stucks if we await the metadata or resize function itself
  // so we have to wait for the last photo manually
  if (context.mode === "production") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return photos.sort((a, b) => a.index - b.index);
}

export default async function (
  buildPage: BuildPage,
  { watchDir, context }: SsgoBag
) {
  // const metaFile = context.projectRoot + "/assets/photographs.json";
  const photosDir = context.projectRoot + "/static/photographs";

  watchDir(photosDir);

  // const { default: globalMetadata } = await import(metaFile, {
  //   with: { type: "json" },
  // });

  const photos = await processAlbum(photosDir, context);

  buildPage(
    "photographs.html",
    { photos, mode: context.mode },
    {
      filename: "photographs.html",
      dir: "",
    }
  );

  for (const subAlbum of photos.filter((e) => e.isAlbum)) {
    buildPage(
      "photographs.html",
      { photos: subAlbum.albumPhotos, mode: context.mode },
      {
        filename: `${subAlbum.name.split(".")[0]}.html`,
        dir: "photographs",
      }
    );
  }
}
