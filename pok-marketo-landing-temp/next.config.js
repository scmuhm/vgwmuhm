/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    webpack: (config) => {
        // camel-case style names from css modules
        config.module.rules
            .find(({ oneOf }) => !!oneOf)
            .oneOf.filter(({ use }) => JSON.stringify(use)?.includes("css-loader"))
            .reduce((acc, { use }) => acc.concat(use), [])
            .forEach(({ options }) => {
                if (options.modules) {
                    options.modules.exportLocalsConvention = "camelCase";
                }
            });

        // fix "Module not found: Can't resolve 'fs'"
        config.resolve.fallback = { fs: false };

        return config;
    },}

module.exports = nextConfig
