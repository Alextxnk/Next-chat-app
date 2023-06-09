import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   experimental: {
      appDir: true,
      swcPlugins: [['next-superjson-plugin', {}]],
      serverComponentsExternalPackages: ['@prisma/client']
   },
   images: {
      domains: [
         'res.cloudinary.com',
         'avatars.githubusercontent.com',
         'lh3.googleusercontent.com'
      ]
   }
};

export default withContentlayer(nextConfig);
