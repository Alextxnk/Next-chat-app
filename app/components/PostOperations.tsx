'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { toast } from '@/hooks/use-toast';
import { toast } from 'react-hot-toast';
import { Post } from '@prisma/client';

import { Icons } from '@/app/components/Icons';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle
} from '@/app/components/ui/AlertDialog';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu';

async function deletePost(postId: string) {
   const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE'
   });

   if (!response?.ok) {
      /* toast({
         title: 'Something went wrong.',
         description: 'Your post was not deleted. Please try again.',
         variant: 'destructive'
      }); */
      toast.error('Что-то пошло не так');
   }

   return true;
}

interface PostOperationsProps {
   post: Pick<Post, 'id' | 'title'>;
}

export function PostOperations({ post }: PostOperationsProps) {
   const router = useRouter();
   const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
   const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50'>
               <Icons.ellipsis className='h-4 w-4' />
               <span className='sr-only'>Открыть</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
               <DropdownMenuItem>
                  <Link href={`/editor/${post.id}`} className='flex w-full'>
                     Редактировать
                  </Link>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Отправить на рецензию</DropdownMenuItem>
               <DropdownMenuSeparator />
               {/* <DropdownMenuItem>Опубликовать</DropdownMenuItem>
               <DropdownMenuSeparator /> */}
               <DropdownMenuItem
                  className='flex cursor-pointer items-center text-red-600 focus:bg-red-50'
                  onSelect={() => setShowDeleteAlert(true)}
               >
                  Удалить
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogTitle>
                     Вы уверены, что хотите удалить эту статью?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                     Это действие не может быть отменено
                  </AlertDialogDescription>
               </AlertDialogHeader>
               <AlertDialogFooter>
                  <AlertDialogCancel>Отменить</AlertDialogCancel>
                  <AlertDialogAction
                     onClick={async (event) => {
                        event.preventDefault();
                        setIsDeleteLoading(true);

                        const deleted = await deletePost(post.id);

                        if (deleted) {
                           setIsDeleteLoading(false);
                           setShowDeleteAlert(false);
                           router.refresh();
                        }
                     }}
                     className='bg-red-600 focus:ring-red-600'
                  >
                     {isDeleteLoading ? (
                        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                     ) : (
                        <Icons.trash className='mr-2 h-4 w-4' />
                     )}
                     <span>Удалить</span>
                  </AlertDialogAction>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      </>
   );
}
