import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Fotot placeholder vijnë nga Unsplash. Kur të vendosni fotot reale në
    // /public/images, kjo listë mund të fshihet.
    // `search` mungon qëllimisht: URL-të e Unsplash përdorin query string (?w=…).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
    qualities: [75],
  },
  turbopack: {
    // Fiksohet rrënja e projektit (në /Users/juli ndodhet një package-lock.json tjetër).
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
