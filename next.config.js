const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.NEXT_PUBLIC_DOMAIN
      ? [new URL(process.env.NEXT_PUBLIC_DOMAIN).hostname]
      : ['localhost'],
  },
};

module.exports = nextConfig;
