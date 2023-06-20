import { DashboardHeader } from '@/app/components/DashboardHeader';
import { DashboardShell } from '@/app/components/DashboardShell';
import { Card } from '@/app/components/ui/Card';

export default function DashboardSettingsLoading() {
   return (
      <DashboardShell>
         <DashboardHeader
            heading='Профиль'
            text='Просмотр личной информации пользователя'
         />
         <div className='grid gap-10'>
            <Card.Skeleton />
            <Card.Skeleton />
         </div>
      </DashboardShell>
   );
}
