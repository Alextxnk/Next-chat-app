'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { MainNavItem } from '@/app/types';
import { siteConfig } from '@/app/config/site';
import { cn } from '@/app/libs/utils';

import { Icons } from '@/app/components/Icons';
import { MobileNav } from '@/app/components/MobileNav';
// import { ThemeToggle } from '@/components/theme-toggle';
import { useSession } from 'next-auth/react';

interface MainNavProps {
   href: string;
   items?: MainNavItem[];
   children?: React.ReactNode;
}

export function MainNav({ href, items, children }: MainNavProps) {
   const segment = useSelectedLayoutSegment();
   const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

   // const { data: session } = useSession();
   // console.log(session);

   return (
      <div className='flex gap-6 md:gap-10'>
         <Link  href={href} className='hidden items-center space-x-2 md:flex'>
            <Icons.student />
            <span className='hidden font-bold sm:inline-block'>
               {siteConfig.name}
            </span>
         </Link>
         {items?.length ? (
            <nav className='hidden gap-6 md:flex'>
               {items?.map((item, index) => (
                  <Link
                     key={index}
                     href={item.disabled ? '#' : item.href}
                     className={cn(
                        'flex items-center text-lg font-semibold text-slate-600 sm:text-sm',
                        item.href.startsWith(`/${segment}`) && 'text-slate-900',
                        item.disabled && 'cursor-not-allowed opacity-80'
                     )}
                  >
                     {item.title}
                  </Link>
               ))}
               {/* <ThemeToggle isMobile={false} /> */}
            </nav>
         ) : null}
         <button
            className='flex items-center space-x-2 md:hidden'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
         >
            {showMobileMenu ? <Icons.close /> : <Icons.menu />}
            <span className='font-bold'>Меню</span>
         </button>
         {showMobileMenu && items && (
            <MobileNav items={items}>{children}</MobileNav>
         )}
      </div>
   );
}
