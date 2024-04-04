/**
 * @param {import('next').NextConfig} nextConfig
 */
const exportOutput = process.env.EXPORT_MODE == '1';
const robotsPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    rewrites: !exportOutput ? (async () => {
      return [
        ...await nextConfig.rewrites(),
        // robots route
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ];
    }) : undefined,
  });
};

module.exports = robotsPlugin;
