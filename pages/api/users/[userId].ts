import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import * as z from 'zod';

import { withCurrentUser } from '@/app/libs/api-middlewares/with-current-user';
import { withMethods } from '@/app/libs/api-middlewares/with-methods';
// import { authOptions } from '@/lib/auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/prismadb';
import { userNameSchema } from '@/app/libs/validations/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'PATCH') {
      try {
         const session = await getServerSession(req, res, authOptions);
         const user = session?.user;

         if (!user) {
            throw new Error('User not found.');
         }

         const body = req.body;

         if (body?.name) {
            const payload = userNameSchema.parse(body);

            await prisma.user.update({
               where: {
                  id: user.id
               },
               data: {
                  name: payload.name
               }
            });
         }

         return res.end();
      } catch (error) {
         if (error instanceof z.ZodError) {
            return res.status(422).json(error.issues);
         }

         return res.status(422).end();
      }
   }
}

export default withMethods(['PATCH'], withCurrentUser(handler));
