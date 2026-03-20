import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

const hostname = "https://www.kesharwanimart.com"; // 👈 apna domain daal

const sitemap = new SitemapStream({ hostname });

const urls = [
  { url: "/", priority: 1.0 },
  { url: "/about-us", priority: 0.8 },
  { url: "/contact-us", priority: 0.8 },
  { url: "/products", priority: 0.9 },
  { url: "/product-list", priority: 0.9 },
];

async function generate() {
  urls.forEach((item) =>
    sitemap.write({
      url: item.url,
      changefreq: "daily",
      priority: item.priority,
    })
  );

  sitemap.end();

  const data = await streamToPromise(sitemap);
  fs.writeFileSync("./public/sitemap.xml", data.toString());

  console.log("✅ sitemap.xml generated successfully!");
}

generate();