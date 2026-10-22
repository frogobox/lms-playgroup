import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";
import { LMS_COURSES } from "@/data/lms-data";

// Static application routes for SEO indexing
const staticRoutes = [
  "", // Homepage
  "/courses", // Course Catalog
  "/dashboard", // Student Dashboard
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${seoConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const courseEntries: MetadataRoute.Sitemap = LMS_COURSES.map((course) => ({
    url: `${seoConfig.siteUrl}/courses/detail?id=${course.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...courseEntries];
}
