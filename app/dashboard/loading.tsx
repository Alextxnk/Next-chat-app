import { DashboardHeader } from '@/app/components/DashboardHeader';
import { PostCreateButton } from '@/app/components/PostCreateButton';
import { PostItem } from '@/app/components/PostItem';
import { DashboardShell } from '@/app/components/DashboardShell';

export default function DashboardLoading() {
   return (
      <DashboardShell>
         <DashboardHeader
            heading='Статьи'
            text='Создавайте публикации и управляйте ими'
         >
            <PostCreateButton />
         </DashboardHeader>
         <div className='divide-y divide-neutral-200 rounded-md border border-slate-200'>
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
            <PostItem.Skeleton />
         </div>
      </DashboardShell>
   );
}
