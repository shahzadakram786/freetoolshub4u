"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card } from "@/components/ui";
import { Clock, Tag, ChevronRight, BookOpen } from "lucide-react";
import { useGetBlogPosts } from "@workspace/api-client-react";

const CATEGORIES = ["All", "Image Tools", "Currency", "AI Tools", "Writing Tools", "Health Tools", "YouTube Tools"];

export function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetBlogPosts(
    {
      page,
      limit: 9,
      ...(activeCategory !== "All" ? { category: activeCategory } : {}),
    },
    { query: { placeholderData: (prev: any) => prev } as any }
  );

  return (
    <Layout>
      <SeoHead
        title="Blog - Tips, Guides & How-Tos | ToolsHub"
        description="Read our expert guides, tutorials, and tips on using free online tools for image editing, currency conversion, AI detection, and more."
        keywords="online tools guide, how to remove background, currency converter tips, AI detector guide"
      />

      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">ToolsHub Blog</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Guides, tutorials, and tips to get the most out of our free online tools.
          </p>
        </div>

        <div className="ad-banner mb-8 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80 border-border text-muted-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.posts.map((post: import("@workspace/api-client-react").BlogPostSummary) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full cursor-pointer group">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime} min read
                          </span>
                          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {[...Array(data.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
