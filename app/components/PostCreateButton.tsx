'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
// import { toast } from '@/hooks/use-toast';
import { toast } from 'react-hot-toast';

import { cn } from '@/app/libs/utils';

import { Icons } from '@/app/components/Icons';
import { buttonVariants } from '@/app/components/ui/button';

interface PostCreateButtonProps
   extends React.HTMLAttributes<HTMLButtonElement> {}

export function PostCreateButton({
   className,
   ...props
}: PostCreateButtonProps) {
   const router = useRouter();
   const [isLoading, setIsLoading] = React.useState<boolean>(false);

   async function onClick() {
      setIsLoading(true);

      const response = await fetch('/api/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            title: 'Статья без названия'
         })
      });

      setIsLoading(false);

      if (!response?.ok) {
         if (response.status === 402) {
            /* return toast({
               title: 'Достигнуто ограничение в 3 статьи',
               description: 'Пожалуйста, перейдите на тарифный план PRO',
               variant: 'destructive'
            }); */
            toast.error('Достигнуто ограничение в 3 статьи');
         }

         /* return toast({
            title: 'Что-то пошло не так',
            description: 'Ваш статья не была создана. Пожалуйста, попробуйте снова',
            variant: 'destructive'
         }); */
         toast.error('Что-то пошло не так');
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
