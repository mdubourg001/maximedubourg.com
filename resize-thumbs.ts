import sharp from "npm:sharp";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";

const photosFiles: any[] = (
  Array.from(walkSync("./static/photographs")) as any[]
).filter((e) => e.isFile);

console.log("Resizing thumbs for", photosFiles.length, "photos...");

for (const photo of photosFiles) {
  if (photo.name.endsWith(".thumb.jpeg")) {
    continue;
  }

  const splittedNamed = photo.name.split(".");

  const buffer = await Deno.readFile(photo.path);
  sharp(buffer)
    .resize(916)
    .toFile(`static/photographs/${splittedNamed[0]}.thumb.jpeg`);
}

console.log("Done resizing thumbs.");
