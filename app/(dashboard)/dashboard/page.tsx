import { cache } from 'react';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';

// import { authOptions } from '@/lib/auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { cn } from '@/app/libs/utils';

import { EmptyPlaceholder } from '@/app/components/EmptyPlaceholder';
import { DashboardHeader } from '@/app/components/DashboardHeader';
import { PostCreateButton } from '@/app/components/PostCreateButton';
import { PostItem } from '@/app/components/PostItem';
import { DashboardShell } from '@/app/components/DashboardShell';
import { buttonVariants } from '@/app/components/ui/Button';

export const metadata = {
   title: 'Главная'
};

const getPostsForUser = cache(async (userId: User['id']) => {
   return await prisma.post.findMany({
      where: {
         authorId: userId
      },
      select: {
         id: true,
         title: true,
         published: true,
         createdAt: true
      },
      orderBy: {
         updatedAt: 'desc'
      }
   });
});

export default async function DashboardPage() {
   const user = await getCurrentUser();

   if (!user) {
      redirect(authOptions?.pages?.signIn || '/');
   }

   const posts = await getPostsForUser(user.id);

   return (
      <DashboardShell>
         <DashboardHeader
            heading='Статьи'
            text='Создавайте публикации и управляйте ими'
         >
            <PostCreateButton />
         </DashboardHeader>
         <div>
            {posts?.length ? (
               <div className='divide-y divide-neutral-200 rounded-md border border-slate-200'>
                  {posts.map((post) => (
                     <PostItem key={post.id} post={post} />
                  ))}
               </div>
            ) : (
               <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon name='post' />
                  <EmptyPlaceholder.Title>
                     Нет созданных статей
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                     У вас еще нет статей. Начните создавать контент
                  </EmptyPlaceholder.Description>
                  <PostCreateButton
                     className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'text-slate-900'
                     )}
                  />
               </EmptyPlaceholder>
            )}
         </div>
      </DashboardShell>
   );
}
