'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/app/libs/utils';

import { userNameSchema } from '@/app/libs/validations/user';
import { Icons } from '@/app/components/Icons';
import { buttonVariants } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
// import { Input } from '@/app/components/ui/Input';
// import { Label } from '@/app/components/ui/Label';

import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import Label from '@/app/components/inputs/Label';

/* import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue
} from '@/app/components/ui/Select'; */

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
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

type FormData = z.infer<typeof userNameSchema>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors }
   } = useForm<FieldValues>({
      resolver: zodResolver(userNameSchema),
      defaultValues: {
         name: user?.name || '',
         surname: user?.surname || '',
         patronymic: user?.patronymic || '',
         faculty: user?.faculty || '',
         education_stage: user?.education_stage || '',
         course: user?.course || '',
         department: user?.department || '',
         group: user?.group || '',
         academic_duty: user?.academic_duty || ''
      }
   });

   const faculty = watch('faculty');
   const education_stage = watch('education_stage');
   const course = watch('course');
   const academic_duty = watch('academic_duty');

   const [isSaving, setIsSaving] = React.useState<boolean>(false);

   async function onSubmit(data: FormData) {
      console.log('Отправка формы');

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
         toast.error('Что-то пошло не так');
      }

      toast.success('Ваше имя было обновлено');

      router.refresh();
   }
   /* 
   <Label className='sr-only' htmlFor='name'>
      Имя
   </Label>
   <Label className='ml-1' htmlFor='faculty'>
      Факультет
   </Label>
   */

   return (
      <form
         className={cn(className)}
         onSubmit={handleSubmit(onSubmit)}
         {...props}
      >
         <Card className='mb-6'>
            <Card.Header>
               <Card.Title>Ваше персональные данные</Card.Title>
               <Card.Description>
                  Пожалуйста, заполните информацию о себе
               </Card.Description>
            </Card.Header>
            <Card.Content>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='name' label='Имя' />
                  <Input
                     id='name'
                     type='name'
                     placeholder='Введите имя'
                     register={register}
                     errors={errors}
                     required
                     disabled={isSaving}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='surname' label='Фамилия' />
                  <Input
                     id='surname'
                     type='surname'
                     placeholder='Введите фамилию'
                     register={register}
                     errors={errors}
                     required
                     disabled={isSaving}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='patronymic' label='Отчество' />
                  <Input
                     id='patronymic'
                     type='patronymic'
                     placeholder='Введите отчество'
                     register={register}
                     errors={errors}
                     required
                     disabled={isSaving}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='faculty' label='Факультет' />
                  <Select
                     disabled={isSaving}
                     isMulti={false}
                     placeholder='Выберите факультет'
                     options={[
                        'АМиУ',
                        'АП',
                        'ИиВТ',
                        'ИБиМ',
                        'МКиМТ',
                        'ППД',
                        'ПГС',
                        'СГ',
                        'СТ',
                        'ТМ'
                     ].map((faculty) => ({
                        value: faculty,
                        label: faculty
                     }))}
                     onChange={(value) =>
                        setValue('faculty', value, {
                           shouldValidate: true
                        })
                     }
                     value={faculty}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='education_stage' label='Ступень образования' />
                  <Select
                     disabled={isSaving}
                     isMulti={false}
                     placeholder='Выберите ступень'
                     options={[
                        'Бакалавр',
                        'Специалитет',
                        'Магистриатура',
                        'Аспирантура'
                     ].map((education_stage) => ({
                        value: education_stage,
                        label: education_stage
                     }))}
                     onChange={(value) =>
                        setValue('education_stage', value, {
                           shouldValidate: true
                        })
                     }
                     value={education_stage}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='course' label='Курс' />
                  <Select
                     disabled={isSaving}
                     isMulti={false}
                     placeholder='Выберите номер курса'
                     options={['1', '2', '3', '4', '5', '6'].map((course) => ({
                        value: course,
                        label: course
                     }))}
                     onChange={(value) =>
                        setValue('course', value, {
                           shouldValidate: true
                        })
                     }
                     value={course}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='department' label='Кафедра' />
                  <Input
                     id='department'
                     type='department'
                     placeholder='Введите кафедру'
                     register={register}
                     errors={errors}
                     required
                     disabled={isSaving}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='group' label='Группа' />
                  <Input
                     id='group'
                     type='group'
                     placeholder='Введите группу'
                     register={register}
                     errors={errors}
                     required
                     disabled={isSaving}
                  />
               </div>
               <div className='grid gap-1 mb-2 w-[300px]'>
                  <Label id='academic_duty' label='Академическая должность' />
                  <Select
                     disabled={isSaving}
                     isMulti={false}
                     placeholder='Выберите должность'
                     options={['Студент', 'Преподаватель'].map((academic_duty) => ({
                        value: academic_duty,
                        label: academic_duty
                     }))}
                     onChange={(value) =>
                        setValue('academic_duty', value, {
                           shouldValidate: true
                        })
                     }
                     value={academic_duty}
                  />
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
