'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@prisma/client';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as z from 'zod';

import { cn } from '@/app/libs/utils';

import { postPatchSchema } from '@/app/libs/validations/post';
import { Icons } from '@/app/components/Icons';
import { buttonVariants } from '@/app/components/ui/Button';

interface EditorProps {
   post: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
}

type FormData = z.infer<typeof postPatchSchema>;

export function Editor({ post }: EditorProps) {
   const { register, handleSubmit } = useForm<FormData>({
      resolver: zodResolver(postPatchSchema)
   });
   const ref = React.useRef<EditorJS>();
   const router = useRouter();
   const [isSaving, setIsSaving] = React.useState<boolean>(false);
   const [isMounted, setIsMounted] = React.useState<boolean>(false);

   const initializeEditor = React.useCallback(async () => {
      const EditorJS = (await import('@editorjs/editorjs')).default;
      const Header = (await import('@editorjs/header')).default;
      const Embed = (await import('@editorjs/embed')).default;
      const Table = (await import('@editorjs/table')).default;
      const List = (await import('@editorjs/list')).default;
      const Code = (await import('@editorjs/code')).default;
      const LinkTool = (await import('@editorjs/link')).default;
      const InlineCode = (await import('@editorjs/inline-code')).default;

      const body = postPatchSchema.parse(post);

      if (!ref.current) {
         const editor = new EditorJS({
            holder: 'editor',
            onReady() {
               ref.current = editor;
            },
            placeholder: 'Введите здесь текст, чтобы написать статью...',
            inlineToolbar: true,
            data: body.content,
            tools: {
               header: Header,
               linkTool: LinkTool,
               list: List,
               code: Code,
               inlineCode: InlineCode,
               table: Table,
               embed: Embed
            }
         });
      }
   }, [post]);

   React.useEffect(() => {
      if (typeof window !== 'undefined') {
         setIsMounted(true);
      }
   }, []);

   React.useEffect(() => {
      if (isMounted) {
         initializeEditor();

         return () => {
            ref.current?.destroy();
            ref.current = undefined;
         };
      }
   }, [isMounted, initializeEditor]);

   async function onSubmit(data: FormData) {
      setIsSaving(true);

      const blocks = await ref.current?.save();

      const response = await fetch(`/api/posts/${post.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            title: data.title,
            content: blocks
         })
      });

      setIsSaving(false);

      if (!response?.ok) {
         /* return toast({
            title: 'Что-то пошло не так',
            description:
               'Ваша статья не была сохранена. Пожалуйста, попробуйте снова',
            variant: 'destructive'
         }); */
         toast.error('Что-то пошло не так');
      }

      router.refresh();

      /* return toast({
         description: 'Ваша статья была сохранена'
      }); */
      toast.success('Ваша статья была сохранена');
   }

   if (!isMounted) {
      return null;
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='grid w-full gap-10'>
            <div className='flex w-full items-center justify-between'>
               <div className='flex items-center space-x-10'>
                  <Link
                     href='/dashboard'
                     className={cn(buttonVariants({ variant: 'ghost' }))}
                  >
                     <>
                        <Icons.chevronLeft className='mr-2 h-4 w-4' />
                        Назад
                     </>
                  </Link>
                  <p className='text-sm text-slate-600'>
                     {post.published ? 'Опубликована' : 'В разработке'}
                  </p>
               </div>
               <button type='submit' className={cn(buttonVariants())}>
                  {isSaving && (
                     <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  <span>Сохранить</span>
               </button>
            </div>
            <div className='prose prose-stone mx-auto w-[800px]'>
               <TextareaAutosize
                  autoFocus
                  id='title'
                  defaultValue={post.title}
                  placeholder='Post title'
                  className='w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none'
                  {...register('title')}
               />
               <div id='editor' className='min-h-[500px]' />
               <p className='text-sm text-gray-500'>
                  Используйте{' '}
                  <kbd className='rounded-md border bg-slate-50 px-1 text-xs uppercase'>
                     Tab
                  </kbd>{' '}
                  чтобы открыть командное меню
               </p>
            </div>
         </div>
      </form>
   );
}
