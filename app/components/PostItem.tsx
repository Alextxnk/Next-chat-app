import Link from 'next/link';
import { Post, User } from '@prisma/client';

import { formatDate } from '@/app/libs/utils';
import { PostOperations } from '@/app/components/PostOperations';
import { Skeleton } from '@/app/components/ui/Skeleton';

interface PostItemProps {
   post: Pick<Post, 'id' | 'title' | 'published' | 'createdAt'>;
   // user: Pick<User, 'id' | 'name' | 'surname' | 'group'>;
}

export function PostItem({ post }: PostItemProps) {
   // const author = `Автор статьи:${user.surname ? user.surname : 'Фамилия'}`;

   return (
      <div className='flex items-center justify-between p-4'>
         <div className='grid gap-1'>
            <Link
               href={`/editor/${post.id}`}
               className='font-semibold hover:underline'
            >
               {post.title}
            </Link>
            <p>
               Автор статьи: Соловьев Алексей группа ВПР41
            </p>
            <p className='text-sm text-slate-600'>
               Статус: {post.published ? 'Опубликована' : 'В разработке'}
            </p>
            <div>
               <p className='text-sm text-slate-600'>
                  Последнее изменение:{' '}
                  {formatDate(post.createdAt?.toDateString())}
               </p>
            </div>
         </div>
         <PostOperations post={{ id: post.id, title: post.title }} />
         {/* <PostDeleteButton post={{ id: post.id, title: post.title }} /> */}
      </div>
   );
}

PostItem.Skeleton = function PostItemSkeleton() {
   return (
      <div className='p-4'>
         <div className='space-y-3'>
            <Skeleton className='h-5 w-2/5' />
            <Skeleton className='h-4 w-4/5' />
         </div>
      </div>
   );
};
