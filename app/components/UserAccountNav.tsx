'use client';

import Link from 'next/link';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

import { siteConfig } from '@/app/config/site';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/app/components/ui/DropdownMenu';
import Avatar from '@/app/components/Avatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
   user: Pick<User, 'name' | 'image' | 'email'>;
   // avatarUser: User;
}
const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Avatar
               /* user={user} */
               user={{
                  name: user.name || null,
                  image: user.image || null,
                  email: user.email || null
               }}
               /* className='h-8 w-8' */
            />
         </DropdownMenuTrigger>
         <DropdownMenuContent align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
               <div className='flex flex-col space-y-1 leading-none'>
                  {user.name && <p className='font-medium'>{user.name}</p>}
                  {user.email && (
                     <p className='w-[200px] truncate text-sm text-slate-600'>
                        {user.email}
                     </p>
                  )}
               </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='cursor-pointer'>
               <Link href='/dashboard'>Главная</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
               <Link href='/dashboard/profile'>Профиль</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className='cursor-pointer'>
               <Link href='/dashboard/settings'>Настройки профиля</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
               className='cursor-pointer'
               onSelect={(event) => {
                  event.preventDefault();
                  signOut({
                     callbackUrl: `${window.location.origin}/`
                  });
               }}
            >
               Выйти
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default UserAccountNav;
