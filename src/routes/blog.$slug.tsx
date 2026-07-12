import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TableOfContents } from "@/components/toc";
import { getBlogPost, blogPosts } from "@/lib/data";
import { ChevronRight, Calendar, User, ArrowLeft, Twitter, Facebook, Linkedin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = getBlogPost(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getBlogPost(loaderData.slug) : undefined;
    return { meta: [
      { title: p ? `${p.title} — EtiSkin Journal` : "Article — EtiSkin" },
      { name: "description", content: p?.excerpt ?? "" },
      { property: "og:title", content: p?.title ?? "" },
      { property: "og:type", content: "article" },
    ]};
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useLoaderData();
  const post = getBlogPost(slug)!;
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" />
        <Link to="/blog" className="hover:text-primary">Journal</Link><ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1">{post.title}</span>
      </nav>

      <div className="eyebrow mb-3">{post.category}</div>
      <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">{post.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
        <span>{post.readTime}</span>
      </div>

      <div className="aspect-[16/9] rounded-2xl overflow-hidden my-10 shadow-soft bg-muted/40">
        <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
      </div>


      <div className="grid lg:grid-cols-[1fr_240px] gap-12">
      <article>
        <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed">
          <p className="text-xl font-serif italic text-primary/90">{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">Share this post</span>
            <div className="flex gap-1">
              <ShareBtn platform="twitter" url={url} text={post.title} />
              <ShareBtn platform="facebook" url={url} />
              <ShareBtn platform="linkedin" url={url} />
            </div>
          </div>
        </div>

        <Link to="/blog" className="inline-flex items-center gap-2 mt-10 text-sm text-primary font-semibold">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Link>
      </article>

      <aside>
        <TableOfContents />
      </aside>
    </div>

      <section className="mt-16 pt-10 border-t border-border">
        <h2 className="text-2xl font-serif font-semibold mb-6">Keep Reading</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-muted/40">
                <img src={p.imageUrl} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-xs uppercase tracking-wider text-gold font-semibold">{p.category}</div>
              <h3 className="mt-1 font-serif text-lg font-semibold group-hover:text-primary transition line-clamp-2">{p.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ShareBtn({ platform, url, text }: { platform: "twitter" | "facebook" | "linkedin"; url: string; text?: string }) {
  const links = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || "")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  };
  const icons = {
    twitter: <Twitter className="h-4 w-4" />,
    facebook: <Facebook className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
  };

  return (
    <a href={links[platform]} target="_blank" rel="noopener noreferrer"
      onClick={() => toast.success("Link copied to clipboard!")}
      className="p-2.5 rounded-md border border-border hover:bg-muted transition">
      {icons[platform]}
    </a>
  );
}