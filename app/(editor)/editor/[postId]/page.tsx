import { notFound, redirect } from 'next/navigation';
import { Post, User } from '@prisma/client';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Editor } from '@/app/components/Editor';

async function getPostForUser(postId: Post['id'], userId: User['id']) {
   return await prisma.post.findFirst({
      where: {
         id: postId,
         authorId: userId
      }
   });
}

interface EditorPageProps {
   params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
   const user = await getCurrentUser();

   if (!user) {
      redirect(authOptions?.pages?.signIn || '/');
   }

   const post = await getPostForUser(params.postId, user.id);

   if (!post) {
      notFound();
   }

   return (
      <Editor
         post={{
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published
         }}
      />
   );
}
