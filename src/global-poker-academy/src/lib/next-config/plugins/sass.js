const path = require('path');
const SassAlias = require('sass-alias');

/**
 * @param {import('next').NextConfig} nextConfig
 */
 const sassPlugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
      sassOptions: {
        importer: new SassAlias({
          '@vgw': path.join(__dirname, '../../../..', 'vgw'),
          '@current-site': path.join(__dirname, '../../../../vgw', process.env.SITE_NAME),
          '@sass': path.join(__dirname, '../../../assets', 'sass'),
          '@fontawesome': path.join(__dirname, '../../../../node_modules', 'font-awesome'),
        }).getImporter(),
      },
    });
};

module.exports = sassPlugin;
