import { Conversation, Message, User } from '@prisma/client';
import type { Icon } from 'lucide-react';
import { Icons } from '@/app/components/Icons';

export type FullMessageType = Message & {
   sender: User;
   seen: User[];
};

export type FullConversationType = Conversation & {
   users: User[];
   messages: FullMessageType[];
};

export type NavItem = {
   title: string;
   href: string;
   disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
   title: string;
   disabled?: boolean;
   external?: boolean;
   icon?: keyof typeof Icons;
} & (
   | {
      href: string;
      items?: never;
   }
   | {
      href?: string;
      items: NavLink[];
   }
);

export type SiteConfig = {
   name: string;
   description: string;
   url: string;
   ogImage: string;
   links: {
      telegram: string;
      github: string;
   };
};

export type DocsConfig = {
   mainNav: MainNavItem[];
   sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
   mainNav: MainNavItem[];
};

export type DashboardConfig = {
   mainNav: MainNavItem[];
   sidebarNav: SidebarNavItem[];
};
