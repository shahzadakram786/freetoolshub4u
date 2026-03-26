import { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
}

export function SeoHead({ title, description, keywords }: SeoHeadProps) {
  useEffect(() => {
    const suffix = title.includes("ToolsHub") ? "" : " | ToolsHub";
    document.title = `${title}${suffix}`;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
  }, [title, description, keywords]);

  return null;
}
