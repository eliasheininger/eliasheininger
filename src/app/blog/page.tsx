import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const BLOG_DIR = path.join(process.cwd(), "markdown/blog");

function getBlogPosts() {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { data } = matter(source);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: data.title || file,
        date: data.date || "",
        description: data.description || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <div className="bg-black text-white min-h-screen">
      <main className="max-w-2xl w-full text-start mx-auto py-16 px-4 text-white bg-black">
        <h1 className="text-3xl mb-8">Blog</h1>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xl hover:underline cursor-pointer transition-all duration-300"
              >
                {post.title}
              </Link>
              <div className="text-gray-400 text-[1rem] mb-1 font-light">
                {post.date}
              </div>
              <div className="text-white text-[1rem] font-light">
                {post.description}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
