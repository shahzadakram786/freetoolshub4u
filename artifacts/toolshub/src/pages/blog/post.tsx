import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card } from "@/components/ui";
import { Clock, Tag, ArrowLeft, User, Calendar, ChevronRight } from "lucide-react";
import { useGetBlogPost, useGetBlogPosts } from "@workspace/api-client-react";

interface BlogPostPageProps {
  slug: string;
}

export function BlogPost({ slug }: BlogPostPageProps) {
  const { data: post, isLoading, error } = useGetBlogPost(slug);
  const { data: relatedPosts } = useGetBlogPosts({ limit: 3 });

  if (isLoading) {
    return (
      <Layout>
        <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-4" />
          <div className="h-64 bg-muted rounded-xl mb-8" />
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => <div key={i} className="h-4 bg-muted rounded" style={{ width: `${70 + Math.random() * 30}%` }} />)}
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  const related = relatedPosts?.posts.filter((p: import("@workspace/api-client-react").BlogPostSummary) => p.slug !== slug).slice(0, 3) || [];

  return (
    <Layout>
      <SeoHead
        title={`${post.title} | ToolsHub Blog`}
        description={post.excerpt}
        keywords={post.tags.join(", ")}
      />

      <article className="w-full max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{post.excerpt}</p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </header>

        <div className="mb-8 rounded-2xl overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
        </div>

        <div className="ad-banner mb-8 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder ]
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8
            prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground prose-a:text-primary
            prose-strong:text-foreground prose-table:w-full
            prose-th:bg-muted prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex flex-wrap gap-2 pt-6 border-t border-border mb-12">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>

        <div className="ad-banner mb-12 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder ]
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
                    <img src={p.coverImage} alt={p.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-4">
                      <span className="text-xs text-primary font-medium">{p.category}</span>
                      <h3 className="font-bold mt-1 line-clamp-2 group-hover:text-primary transition-colors text-sm">{p.title}</h3>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {p.readTime} min read
                        <ChevronRight className="w-3 h-3 ml-auto" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
