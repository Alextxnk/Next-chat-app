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
// import Select from '@/app/components/inputs/Select';

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue
} from '@/app/components/ui/Select';

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
   user: Pick<User, 'id' | 'name' | 'surname' | 'patronymic' | 'faculty' | 'academic_duty'>;
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
         name: user?.name || '',
         surname: user?.surname || '',
         patronymic: user?.patronymic || '',
         faculty: user?.faculty || '',

         academic_duty: user?.academic_duty || ''
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
            name: data.name,
            surname: data.surname,
            patronymic: data.patronymic,
            faculty: data.faculty,
            academic_duty: data.academic_duty
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
   /*
   <Label className='sr-only' htmlFor='name'>
      Имя
   </Label>
   */

   return (
      <form
         className={cn(className)}
         onSubmit={handleSubmit(onSubmit)}
         {...props}
      >
         <Card>
            <Card.Header>
               <Card.Title>Ваше персональные данные</Card.Title>
               <Card.Description>
                  Пожалуйста, заполните информацию о себе
               </Card.Description>
            </Card.Header>
            <Card.Content>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='name'>
                     Имя
                  </Label>
                  <Input
                     id='name'
                     placeholder='Имя'
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
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='surname'>
                     Фамилия
                  </Label>
                  <Input
                     id='surname'
                     placeholder='Фамилия'
                     className='w-[400px]'
                     size={32}
                     {...register('surname')}
                  />
                  {errors?.surname && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.surname.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='patronymic'>
                     Отчетсво
                  </Label>
                  <Input
                     id='patronymic'
                     placeholder='Отчетсво'
                     className='w-[400px]'
                     size={32}
                     {...register('patronymic')}
                  />
                  {errors?.patronymic && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.patronymic.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Факультет
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите факультет' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Факультеты</SelectLabel>
                           <SelectItem value='ИиВТ'>ИиВТ</SelectItem>
                           <SelectItem value='МКиМТ'>МКиМТ</SelectItem>
                           <SelectItem value='АМиУ'>АМиУ</SelectItem>
                           <SelectItem value='ПГС'>ПГС</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Ступень образования
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите ступень образования' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Ступень</SelectLabel>
                           <SelectItem value='Бакалавр'>Бакалавр</SelectItem>
                           <SelectItem value='Специалитет'>Специалитет</SelectItem>
                           <SelectItem value='Магистриатура'>Магистриатура</SelectItem>
                           <SelectItem value='Аспирантура'>Аспирантура</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Курс
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите номер курса' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Курс</SelectLabel>
                           <SelectItem value='1'>1</SelectItem>
                           <SelectItem value='2'>2</SelectItem>
                           <SelectItem value='3'>3</SelectItem>
                           <SelectItem value='4'>4</SelectItem>
                           <SelectItem value='5'>5</SelectItem>
                           <SelectItem value='6'>6</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Кафедра
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите кафедру' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Кафедра</SelectLabel>
                           <SelectItem value='1'>1</SelectItem>
                           <SelectItem value='2'>2</SelectItem>
                           <SelectItem value='3'>3</SelectItem>
                           <SelectItem value='4'>4</SelectItem>
                           <SelectItem value='5'>5</SelectItem>
                           <SelectItem value='6'>6</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Направление
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите направление' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Направление</SelectLabel>
                           <SelectItem value='1'>1</SelectItem>
                           <SelectItem value='2'>2</SelectItem>
                           <SelectItem value='3'>3</SelectItem>
                           <SelectItem value='4'>4</SelectItem>
                           <SelectItem value='5'>5</SelectItem>
                           <SelectItem value='6'>6</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='faculty'>
                     Группа
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите группу' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Группа</SelectLabel>
                           <SelectItem value='1'>1</SelectItem>
                           <SelectItem value='2'>2</SelectItem>
                           <SelectItem value='3'>3</SelectItem>
                           <SelectItem value='4'>4</SelectItem>
                           <SelectItem value='5'>5</SelectItem>
                           <SelectItem value='6'>6</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.faculty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.faculty.message}
                     </p>
                  )}
               </div>
               <div className='grid gap-1 mb-2'>
                  <Label className='ml-1' htmlFor='academic_duty'>
                     Академическая должность
                  </Label>
                  <Select>
                     <SelectTrigger className='w-[400px]'>
                        <SelectValue placeholder='Выберите академическую должность' />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           <SelectLabel>Академическая должность</SelectLabel>
                           <SelectItem value='Студент'>Студент</SelectItem>
                           <SelectItem value='Преподаватель'>Преподаватель</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {errors?.academic_duty && (
                     <p className='px-1 text-xs text-red-600'>
                        {errors.academic_duty.message}
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
