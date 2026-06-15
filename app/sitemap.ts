import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

const baseUrl = siteConfig.url;

/** Trasy statyczne z priorytetem i częstotliwością odświeżania. */
const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/oferty", priority: 0.9, changeFrequency: "daily" },
  { path: "/komercja", priority: 0.8, changeFrequency: "weekly" },
  { path: "/wycena", priority: 0.8, changeFrequency: "monthly" },
  { path: "/o-nas", priority: 0.6, changeFrequency: "monthly" },
  { path: "/zespol", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "yearly" },
  { path: "/polityka-cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/regulamin", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
