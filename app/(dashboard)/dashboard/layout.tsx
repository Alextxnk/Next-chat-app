import { notFound } from 'next/navigation';

import { dashboardConfig } from '@/app/config/dashboard';
import getCurrentUser  from '@/app/actions/getCurrentUser';
import { MainNav } from '@/app/components/MainNav';
import { DashboardNav } from '@/app/components/Nav';
import UserAccountNav from '@/app/components/UserAccountNav';

interface DashboardLayoutProps {
   children?: React.ReactNode;
}

export default async function DashboardLayout({
   children
}: DashboardLayoutProps) {
   const user = await getCurrentUser();

   if (!user) {
      return notFound();
   }

   return (
      <div className='mx-auto flex flex-col space-y-6'>
         <header className='container sticky top-0 z-40 bg-white dark:bg-slate-900 dark:text-slate-50'>
            <div className='flex h-16 items-center justify-between border-b border-b-slate-200 py-4'>
               <MainNav href='/dashboard' items={dashboardConfig.mainNav} />
               <UserAccountNav
                  user={{
                     name: user.name,
                     image: user.image,
                     email: user.email
                  }}
               />
            </div>
         </header>
         <div className='container flex gap-12 md:grid-cols-[200px_1fr]'>
            <main className='flex w-full flex-1 flex-col overflow-hidden'>
               {children}
            </main>
         </div>
      </div>
   );
}
