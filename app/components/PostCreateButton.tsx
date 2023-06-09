'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { cn } from '@/app/libs/utils';
import { Post } from '@prisma/client';

import { Icons } from '@/app/components/Icons';
import { buttonVariants } from '@/app/components/ui/Button';

interface PostCreateButtonProps
   extends React.HTMLAttributes<HTMLButtonElement> {
   // post: Post;
}

export function PostCreateButton({
   className,
   // post,
   ...props
}: PostCreateButtonProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState<boolean>(false);

   /* const handleClick = useCallback(
      (post) => {
         setIsLoading(true);

         axios
            .post('/api/conversations', {
               title: 'Статья без названия'
            })
            .then((post) => {
               router.push(`/editor/${post.id}`);
            })
            .finally(() => setIsLoading(false));
      },
      [post, router]
   ); */

   async function onClick() {
      setIsLoading(true);

      const response = await fetch('/api/posts', {
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json'
         },
         body: JSON.stringify({
            title: 'Статья без названия'
         })
      });

      setIsLoading(false);

      if (!response?.ok) {
         if (response.status === 402) {
            return toast.error('Достигнуто ограничение в 3 статьи');
         }
         
         console.log('response:', response);
         
         console.log('Ошибка');
         return toast.error('Что-то пошло не так');
      }

      const post = await response.json();

      // This forces a cache invalidation.
      router.refresh();
      router.push(`/editor/${post.id}`);
   }

   return (
      <div className='flex items-center'>
         <button
            onClick={onClick}
            className={cn(
               buttonVariants(),
               {
                  'cursor-not-allowed opacity-60': isLoading
               },
               className
            )}
            disabled={isLoading}
            {...props}
         >
            {isLoading ? (
               <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
               <Icons.add className='mr-2 h-4 w-4' />
            )}
            Создать
         </button>
      </div>
   );
}
