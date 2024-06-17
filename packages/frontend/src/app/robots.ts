import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/private/", "/admin/", "/home/profile/"],
    },
    sitemap: "https://shoqan-edu.kz/sitemap.xml",
  };
}
