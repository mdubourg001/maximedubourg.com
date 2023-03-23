import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import markdownit from "https://cdn.skypack.dev/@gerhobbelt/markdown-it";
import parseMarkdown from "https://cdn.skypack.dev/parse-md";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";

export default async function (
  buildPage: BuildPage,
  { watchFile, watchDir, context }: SsgoBag
) {
  const projectsFile = context.projectRoot + "/assets/projects.json";
  const postsDir = context.projectRoot + "/assets/posts";

  watchFile(projectsFile);
  watchDir(postsDir);

  const projectsRaw = await Deno.readTextFile(projectsFile);
  const projects = JSON.parse(projectsRaw);

  const mdParser = markdownit("commonmark", {});
  const postsFiles: any[] = (Array.from(walkSync(postsDir)) as any[]).filter(
    (e) => e.isFile
  );
  const posts: any[] = [];

  for (const post of postsFiles) {
    const file = await Deno.readTextFile(post.path);
    const postHtmlFile = post.name.replace(".md", ".html");
    const { metadata, content } = parseMarkdown(file);

    let rendered = mdParser.render(content);

    if (metadata.date) {
      const date = new Date(metadata.date).toLocaleDateString("fr-FR");
      rendered = rendered.replace(
        "</h1>",
        `</h1>\n<blockquote></p>${date}</p></blockquote>`
      );
    }

    const data = {
      link: `/posts/${postHtmlFile}`,
      content: rendered,
      metadata: {
        ...metadata,
        description: metadata.description.replace(/"/g, '\\"'),
      },
    };

    buildPage(
      "post.html",
      {
        post: data,
        mode: context.mode,
      },
      {
        filename: postHtmlFile,
        dir: "posts",
      }
    );

    if (metadata.status !== "draft" || context.mode === "development") {
      posts.push(data);
    }
  }

  buildPage(
    "index.html",
    {
      projects,
      // sorting posts by release date
      posts: posts.sort((a, b) =>
        new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1
      ),
      mode: context.mode,
    },
    {
      filename: "index.html",
      dir: "",
    }
  );
}
