import type { BuildPage, SsgoBag } from "https://deno.land/x/ssgo/mod.ts";
import markdownit from "https://cdn.skypack.dev/@gerhobbelt/markdown-it";
import markdowitLinkAttributes from "https://cdn.skypack.dev/markdown-it-link-attributes";
import parseMarkdown from "https://cdn.skypack.dev/parse-md";
import _ from "https://cdn.skypack.dev/lodash";
import { walkSync } from "https://deno.land/std@0.118.0/fs/mod.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { slug } from "https://deno.land/x/slug/mod.ts";

export default async function (
  buildPage: BuildPage,
  { watchFile, watchDir, addStaticToBundle, context }: SsgoBag
) {
  const projectsFile = context.projectRoot + "/assets/projects.json";
  const postsDir = context.projectRoot + "/assets/posts";

  watchFile(projectsFile);
  watchDir(postsDir);

  const projectsRaw = await Deno.readTextFile(projectsFile);
  const projects = JSON.parse(projectsRaw);

  const mdParser = markdownit("commonmark", {});
  mdParser.use(markdowitLinkAttributes, {
    matcher: (href) => {
      return href.startsWith("https:");
    },
    attrs: {
      target: "_blank",
      rel: "noopener",
      "data-blank-arrow": true,
    },
  });

  const postsFiles: any[] = (Array.from(walkSync(postsDir)) as any[]).filter(
    (e) => e.isFile
  );
  const posts: any[] = [];

  for (const post of postsFiles) {
    const file = await Deno.readTextFile(post.path);
    const postHtmlFile = post.name.replace(".md", ".html");
    const { metadata, content } = parseMarkdown(file);
    let rendered: string = mdParser.render(content);

    const toc: { title: string; id: string }[] = [];
    const domParser = new DOMParser();
    for (const match of rendered.matchAll(/<h2>(.+)<\/h2>/gm)) {
      const [line, rawTitle] = match;
      const parsedTitle = domParser.parseFromString(
        rawTitle,
        "text/html"
      ).textContent;
      const slugifiedTitle = slug(parsedTitle);

      rendered = rendered.replace(
        line,
        `<h2 id="${slugifiedTitle}">${rawTitle}</h2>`
      );
      toc.push({ title: parsedTitle, id: slugifiedTitle });
    }

    if (metadata.date) {
      const date = new Date(metadata.date).toLocaleDateString("fr-FR");

      if (metadata.living === true) {
        rendered = rendered.replace(
          "</h1>",
          `</h1>\n<blockquote></p>Living document, last updated on ${date}</p></blockquote>`
        );
      } else {
        rendered = rendered.replace(
          "</h1>",
          `</h1>\n<blockquote></p>${date}</p></blockquote>`
        );
      }
    }

    const data = {
      link: `/posts/${postHtmlFile}`,
      content: rendered,
      metadata: {
        ...metadata,
        description: metadata.description?.replace(/"/g, '\\"'),
      },
    };

    buildPage(
      "post.html",
      {
        post: data,
        mode: context.mode,
        tableOfContents: toc,
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

  const sortedPosts = posts.sort((a, b) =>
    new Date(a.metadata.date) > new Date(b.metadata.date) ? -1 : 1
  );

  buildPage(
    "index.html",
    {
      projects,
      // sorting posts by release date
      posts: sortedPosts,
      mode: context.mode,
    },
    {
      filename: "index.html",
      dir: "",
    }
  );

  const feed = getRSSFeedContent(
    sortedPosts.map((post) => ({
      title: post.metadata.title,
      description: post.metadata.description,
      link: post.link,
      date: post.metadata.date,
    }))
  );
  const tempDir = await Deno.makeTempDir();
  await Deno.writeTextFile(`${tempDir}/rss.xml`, feed);

  addStaticToBundle(`${tempDir}/rss.xml`, "..");
  addStaticToBundle(`${context.projectRoot}/static/robots.txt`, "..");
}

function getRSSFeedContent(
  postsMetadatas: {
    title: string;
    description: string;
    link: string;
    date: string;
  }[]
): string {
  const items: string[] = [];

  for (const post of postsMetadatas) {
    items.push(`
      <item>
        <title>${post.title}</title>
        <description>${post.description}</description>
        <link>https://maximedubourg.com${post.link}</link>
        <guid>https://maximedubourg.com${post.link}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>
    `);
  }

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>maximedubourg.com</title>
      <link>https://maximedubourg.com</link>
      <description>Maxime Dubourg's Blog</description>
      <language>en-us</language>
      <pubDate>${new Date(2023, 6, 18).toUTCString()}</pubDate>
      <lastBuildDate>${new Date(
        postsMetadatas[0].date
      ).toUTCString()}</lastBuildDate>
      <image>
        <title>maximedubourg.com</title>
        <url>https://avatars.githubusercontent.com/u/15685173?v=4</url>
        <link>https://maximedubourg.com</link>
      </image>
      <atom:link href="https://maximedubourg.com/rss.xml" rel="self" type="application/rss+xml"/>
      ${items.join("\n")}
    </channel>
  </rss>`;

  return feed;
}
