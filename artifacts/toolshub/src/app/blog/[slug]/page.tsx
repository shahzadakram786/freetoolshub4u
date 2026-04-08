import { BlogPost } from "@/views/blog/post";
import { use } from "react";
export default function Page({ params }: { params: Promise<{slug: string}> }) {
  const resolvedParams = use(params);
  return <BlogPost slug={resolvedParams.slug} />;
}
export async function generateMetadata({ params }: { params: Promise<{slug: string}> }) {
  const resolved = await params;
  const title = (resolved.slug.charAt(0).toUpperCase() + resolved.slug.slice(1).replace(/-/g, ' ')) + ' | ToolsHub Blog';
  return {
    title,
    description: 'Read our latest insights on ' + title,
  };
}
