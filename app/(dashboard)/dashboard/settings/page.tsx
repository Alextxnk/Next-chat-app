import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { DashboardHeader } from '@/app/components/DashboardHeader';
import { DashboardShell } from '@/app/components/DashboardShell';
import { UserNameForm } from '@/app/components/UserNameForm';

export const metadata = {
   title: 'Настройки профиля',
   description: 'Заполните недостающую информацию о себе'
};

export default async function SettingsPage() {
   const user = await getCurrentUser();

   if (!user) {
      redirect(authOptions?.pages?.signIn || '/login');
   }

   return (
      <DashboardShell>
         <DashboardHeader
            heading='Настройки'
            text='Управление настройками учетной записи'
         />
         <div className='grid gap-10'>
            {user?.name ? (
               <UserNameForm
                  user={{
                     id: user.id,
                     name: user.name,
                     surname: user.surname,
                     patronymic: user.patronymic,
                     faculty: user.faculty,
                     education_stage: user.education_stage,
                     course: user.course,
                     department: user.department,
                     group: user.group,
                     academic_duty: user.academic_duty
                  }}
               />
            ) : null}
         </div>
      </DashboardShell>
   );
}
