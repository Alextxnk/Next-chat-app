import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/libs/prismadb';

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: 'jwt'
   },
   pages: {
      signIn: '/'
   },
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' }
         },
         async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
               throw new Error('Неверные учетные данные');
            }

            const user = await prisma.user.findUnique({
               where: {
                  email: credentials.email
               }
            });

            if (!user || !user?.hashedPassword) {
               throw new Error('Неверные учетные данные');
            }

            const isCorrectPassword = await bcrypt.compare(
               credentials.password,
               user.hashedPassword
            );

            if (!isCorrectPassword) {
               throw new Error('Введен неверный пароль');
            }

            return user;
         }
      })
   ],
   debug: process.env.NODE_ENV === 'development',
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async session({ token, session }) {
         if (token) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.picture;
         }

         return session;
      },
      async jwt({ token, user }) {
         const dbUser = await prisma.user.findFirst({
            where: {
               email: token.email
            }
         });

         if (!dbUser) {
            if (user) {
               token.id = user?.id;
            }
            return token;
         }

         return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image
         };
      }
   }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
