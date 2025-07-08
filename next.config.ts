// @ts-check
import type { NextConfig } from "next";
// Add MDX support
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  /* config options here */
};

export default withMDX(nextConfig);
