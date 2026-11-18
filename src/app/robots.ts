import type { MetadataRoute } from "next";

// This is a concept, so no crawler should index any of it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
