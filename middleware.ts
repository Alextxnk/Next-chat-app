import { withAuth } from 'next-auth/middleware';

export default withAuth({
   pages: {
      signIn: '/'
   }
});

export const config = {
   matcher: [
      '/blog/:path*',
      '/conversations/:path*',
      '/users/:path*',
      '/homework/:path*'
   ]
};
