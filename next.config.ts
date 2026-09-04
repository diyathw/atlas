import path from "path";
import type { NextConfig } from "next";

// GitHub Pages project sites are served from /<repo-name>/, so the static
// export needs a matching basePath — set NEXT_PUBLIC_BASE_PATH when
// building for that target (src/lib/media.ts reads the same var to prefix
// public/ asset paths, which Next does not do automatically). Unset (the
// default) keeps root-relative paths for a custom-domain or root deploy.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
