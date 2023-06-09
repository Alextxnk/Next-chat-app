'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/app/libs/utils';

import { userNameSchema } from '@/app/libs/validations/user';
import { Icons } from '@/app/components/Icons';
import { buttonVariants } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/Label';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
   user: Pick<User, 'id' | 'name'>;
}

type FormData = z.infer<typeof userNameSchema>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
   const router = useRouter();
   const {
      handleSubmit,
      register,
      formState: { errors }
   } = useForm<FormData>({
      resolver: zodResolver(userNameSchema),
      defaultValues: {
         name: user?.name || ''
      }
   });
   const [isSaving, setIsSaving] = React.useState<boolean>(false);

   async function onSubmit(data: FormData) {
      setIsSaving(true);

      const response = await fetch(`/api/users/${user.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: data.name
         })
      });

      setIsSaving(false);

      if (!response?.ok) {
         /* return toast({
            title: 'Что-то пошло не так',
            description:
               'Ваше имя не было обновлено. Пожалуйста, попробуйте снова',
            variant: 'destructive'
         }); */
         toast.error('Что-то пошло не так');
      }

      /* toast({
         description: 'Ваше имя было обновлено'
      }); */

      toast.success('Ваше имя было обновлено');

      router.refresh();
   }

   return (
      <form
         className={cn(className)}
         onSubmit={handleSubmit(onSubmit)}
         {...props}
      >
         <Card>
            <Card.Header>
               <Card.Title>Ваше Имя</Card.Title>
               <Card.Description>
                  Пожалуйста, введите свое полное имя или отображаемое имя,
                  которое вас устраивает
               </Card.Description>
            </Card.Header>
            <Card.Content>
               <div className='grid gap-1'>
                  <Label className='sr-only' htmlFor='name'>
                     Имя
                  </Label>
                  <Input
                     id='name'
                     className='w-[400px]'
                     size={32}
                     {...register('name')}
                  />
                  {errors?.name && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.name.message}
                     </p>
                  )}
               </div>
            </Card.Content>
            <Card.Footer>
               <button
                  type='submit'
                  className={cn(buttonVariants(), className)}
                  disabled={isSaving}
               >
                  {isSaving && (
                     <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  <span>Сохранить</span>
               </button>
            </Card.Footer>
         </Card>
      </form>
   );
}
