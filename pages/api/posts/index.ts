import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { withMethods } from '@/app/libs/api-middlewares/with-methods';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/prismadb';

const postCreateSchema = z.object({
   title: z.string(),
   content: z.string().optional()
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const session = await getServerSession(req, res, authOptions);

   if (!session) {
      return res.status(403).end();
   }

   const { user } = session;

   if (req.method === 'GET') {
      try {
         const posts = await prisma.post.findMany({
            select: {
               id: true,
               title: true,
               published: true,
               createdAt: true
            },
            where: {
               authorId: user.id
            }
         });

         return res.json(posts);
      } catch (error) {
         console.log('Ошибка тут');
         return res.status(500).end();
      }
   }

   if (req.method === 'POST') {
      try {
         const body = postCreateSchema.parse(req.body);

         const post = await prisma.post.create({
            data: {
               title: body.title,
               content: body.content,
               authorId: session.user.id
            },
            select: {
               id: true
            }
         });

         return res.json(post);
      } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues);
         }

         return res.status(500).end();
      }
   }
}

export default withMethods(['GET', 'POST'], handler);
