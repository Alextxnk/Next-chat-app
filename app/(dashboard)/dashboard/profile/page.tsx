import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { DashboardHeader } from '@/app/components/DashboardHeader';
import { DashboardShell } from '@/app/components/DashboardShell';
import { UserNameForm } from '@/app/components/UserNameForm';
import { Card } from '@/app/components/ui/Card';
import { Label } from '@/app/components/ui/Label';

export const metadata = {
   title: 'Настройки профиля',
   description: 'Заполните недостающую информацию о себе'
};

export default async function DashboardProfile() {
   const user = await getCurrentUser();

   if (!user) {
      redirect(authOptions?.pages?.signIn || '/login');
   }

   return (
      <DashboardShell>
         <DashboardHeader
            heading='Профиль'
            text='Просмотр личной информации пользователя'
         />
         <div className='grid gap-10'>
            <Card>
               <Card.Header>
                  <Card.Title>Ваше персональные данные</Card.Title>
                  {/* <Card.Description>
                     Пожалуйста, заполните информацию о себе
                  </Card.Description> */}
               </Card.Header>
               <Card.Content>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='name'>
                        Имя
                     </Label>
                     <h1 className='text  font-bold'>Алексей</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='surname'>
                        Фамилия
                     </Label>
                     <h1 className='text  font-bold'>Соловьев</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='patronymic'>
                        Отчетсво
                     </Label>
                     <h1 className='text  font-bold'>Владимирович</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Факультет
                     </Label>
                     <h1 className='text  font-bold'>ИиВТ</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Ступень образования
                     </Label>
                     <h1 className='text  font-bold'>Бакалавр</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Курс
                     </Label>
                     <h1 className='text  font-bold'>4</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Кафедра
                     </Label>
                     <h1 className='text  font-bold'>ПОВТиАС</h1>
                  </div>
                  {/* <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Направление
                     </Label>
                     <h1 className='text  font-bold'>
                        Программное обеспечение вычислительной техники и
                        автоматизированных систем
                     </h1>
                  </div> */}
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='faculty'>
                        Группа
                     </Label>
                     <h1 className='text  font-bold'>ВПР41</h1>
                  </div>
                  <div className='grid gap-1 mb-2'>
                     <Label className='ml-1' htmlFor='academic_duty'>
                        Академическая должность
                     </Label>
                     <h1 className='text  font-bold'>Студент</h1>
                  </div>
               </Card.Content>
               {/* <Card.Footer>
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
               </Card.Footer> */}
            </Card>
         </div>
      </DashboardShell>
   );
}
