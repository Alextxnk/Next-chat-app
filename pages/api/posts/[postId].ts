import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

import { withMethods } from '@/app/libs/api-middlewares/with-methods';
import { withPost } from '@/app/libs/api-middlewares/with-post';
import prisma from '@/app/libs/prismadb';
import { postPatchSchema } from '@/app/libs/validations/post';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'DELETE') {
      try {
         await prisma.post.delete({
            where: {
               id: req.query.postId as string
            }
         });

         return res.status(204).end();
      } catch (error) {
         return res.status(500).end();
      }
   }

   if (req.method === 'PATCH') {
      try {
         const postId = req.query.postId as string;
         const post = await prisma.post.findUnique({
            where: {
               id: postId
            }
         });

         if (!post) {
            throw new Error('Статья не найдена');
         }

         const body = postPatchSchema.parse(req.body);

         // TODO: Implement sanitization for content.
         await prisma.post.update({
            where: {
               id: post.id
            },
            data: {
               title: body.title || post.title,
               content: body.content
            }
         });

         return res.end();
      } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues);
         }

         return res.status(422).end();
      }
   }
}

export default withMethods(['DELETE', 'PATCH'], withPost(handler));
