/**
 * @param {import('next').NextConfig} nextConfig
 */
const exportOutput = process.env.EXPORT_MODE == '1';
const sitemapPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    rewrites: !exportOutput ? (async () => {
      return [
        ...await nextConfig.rewrites(),
        // sitemap route
        {
          source: '/sitemap:id([\\w-]{0,}).xml',
          destination: '/api/sitemap'
        },
      ];
    }) : undefined,
  });
};

module.exports = sitemapPlugin;
