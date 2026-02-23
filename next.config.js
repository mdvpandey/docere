/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { ...config.resolve.fallback, fs: false, net: false, tls: false };
        return config;
    },
};

module.exports = nextConfig;
