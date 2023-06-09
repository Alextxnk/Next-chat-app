import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import getCurrentUser  from '@/app/actions/getCurrentUser';
import { DashboardHeader } from '@/app/components/DashboardHeader';
import { DashboardShell } from '@/app/components/DashboardShell';
import { UserNameForm } from '@/app/components/UserNameForm';

export const metadata = {
   title: 'Настройки',
   description: 'Управление настройками учетной записи и веб-сайта'
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
            text='Управление настройками учетной записи и веб-сайта'
         />
         <div className='grid gap-10'>
            {user?.name ? (
               <UserNameForm user={{ id: user.id, name: user.name }} />
            ) : null}
         </div>
      </DashboardShell>
   );
}