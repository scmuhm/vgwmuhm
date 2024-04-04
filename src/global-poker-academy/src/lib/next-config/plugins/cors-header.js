const config = require('../../../temp/config');

/**
 * @param {import('next').NextConfig} nextConfig
 */
const exportOutput = process.env.EXPORT_MODE == '1';
const corsHeaderPlugin = (nextConfig = {}) => {
  if (!config.sitecoreApiHost) {
    return nextConfig;
  }
  return Object.assign({}, nextConfig, {
    headers: !exportOutput ? (async () => {
      return [
        {
          source: '/_next/:path*',
          headers: [{ key: 'Access-Control-Allow-Origin', value: config.sitecoreApiHost }],
        },
        {
          source: '/fonts/:path*',
          headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }], //TODO: Check with Sitecore 
        },
      ];
    }) : undefined,
  });
};

module.exports = corsHeaderPlugin;
