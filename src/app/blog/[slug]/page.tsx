import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const fs = (await import("fs")).default;
  const path = (await import("path")).default;
  const BLOG_DIR = path.join(process.cwd(), "markdown/blog");
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const fs = (await import("fs")).default;
  const path = (await import("path")).default;
  const BLOG_DIR = path.join(process.cwd(), "markdown/blog");
  const { slug } = await params;
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return notFound();
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <div className="bg-black text-white min-h-screen">
      <main className="max-w-2xl mx-auto py-16 px-4 bg-black text-white">
        <h1 className="text-3xl mb-4">{data.title}</h1>
        <div className="text-gray-400 text-[1rem]  mb-8 font-light">
          {data.date}
        </div>
        <article className="prose prose-invert font-light text-white/80">
          <MDXRemote source={content} />
        </article>
      </main>
    </div>
  );
}
