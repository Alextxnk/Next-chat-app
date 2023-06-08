import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';
import { cn } from './libs/utils';
import Head from 'next/head';

const fontSans = FontSans({
   subsets: ['latin'],
   variable: '--font-inter'
});

interface RootLayoutProps {
   children: React.ReactNode;
}

export const metadata = {
   title: {
      default: `Student's Dashboard`,
      template: `%s | Student's Dashboard`
   },
   description:
      'Веб-приложение для удобного взаимодействия и обмена информацией между студентами и преподавателями',
   themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' }
   ],
   icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
   }
};

export default function RootLayout({ children }: RootLayoutProps) {
   return (
      <html lang='ru'>
         <Head>
            <meta
               name='viewport'
               content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            />
         </Head>
         <body
            className={cn(
               'min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50',
               fontSans.variable
            )}
         >
            <AuthContext>
               <ToasterContext />
               <ActiveStatus />
               {children}
            </AuthContext>
         </body>
      </html>
   );
}
