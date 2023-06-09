import { DashboardConfig } from '@/app/types';

export const dashboardConfig: DashboardConfig = {
   mainNav: [
      {
         title: 'Блог',
         href: '/dashboard/blog',
      },
      {
         title: 'Сообщения',
         href: '/dashboard/conversations'
      },
      {
         title: 'Пользователи',
         href: '/dashboard/users'
      },
      {
         title: 'ДЗ',
         href: '/dashboard/homework'
      }
      /* {
      title: "Support",
      href: "/support",
      disabled: true,
    }, */
   ],
   sidebarNav: [
      {
         title: 'Статьи',
         href: '/dashboard',
         icon: 'post'
      },
      {
         title: 'Профиль',
         href: '/dashboard/profile',
         icon: 'billing'
      },
      {
         title: 'Настройки',
         href: '/dashboard/settings',
         icon: 'settings'
      }
   ]
};
