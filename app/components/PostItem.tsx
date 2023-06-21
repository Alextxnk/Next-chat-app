import Link from 'next/link';
import { Post, User } from '@prisma/client';

import { formatDate } from '@/app/libs/utils';
import { PostOperations } from '@/app/components/PostOperations';
import { Skeleton } from '@/app/components/ui/Skeleton';

import getCurrentUser from '@/app/actions/getCurrentUser';

interface PostItemProps {
   post: Pick<Post, 'id' | 'title' | 'published' | 'createdAt'>;
   user: Pick<
      User,
      | 'id'
      | 'name'
      | 'surname'
      | 'patronymic'
      | 'faculty'
      | 'education_stage'
      | 'course'
      | 'department'
      | 'group'
      | 'academic_duty'
   >;
}

export function PostItem({ post, user }: PostItemProps) {
   // const user = getCurrentUser();
   const surname = user.surname;
   const name = user.name;
   const group = user.group;
   const author = 'Автор статьи: ' + surname + ' ' + name + ' ' + group;

   return (
      <div className='flex items-center justify-between p-4'>
         <div className='grid gap-1'>
            <Link
               href={`/editor/${post.id}`}
               className='font-semibold hover:underline'
            >
               {post.title}
            </Link>
            <p>{author}</p>
            <p className='text-sm text-slate-600'>
               Статус: {post.published ? 'Опубликована' : 'В разработке'}
            </p>
            <p className='text-sm text-slate-600'>
               Проверена преподавателем: {post.published ? 'Да' : 'Нет'}
            </p>
            <div>
               <p className='text-sm text-slate-600'>
                  Последнее изменение:{' '}
                  {formatDate(post.createdAt?.toDateString())}
               </p>
            </div>
         </div>
         <PostOperations
            post={{ id: post.id, title: post.title }}
            /* user={{ academic_duty: user.academic_duty }} */
         />
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
