import Image from 'next/image';
import AuthForm from './components/AuthForm';
import { Icons } from '../components/Icons';

export default function Home() {
   return (
      <>
         {/* <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
         <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <Image alt='Logo' height='48' width='48' className='mx-auto w-auto' src='/images/logo.png' />
            <h2 className='mt-6 text-center text-xl font-bold tracking-tight text-gray-900'>
               Введите свой адрес электронной почты и пароль, чтобы войти в учетную запись
            </h2>
         </div>
         <AuthForm />
      </div> */}
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
         <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
               <Icons.student className='mx-auto h-6 w-6' />
               <h1 className='text-2xl font-semibold tracking-tight'>
                  {/* С возвращением */}
                  Student&apos;s Dashboard
               </h1>
               <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Введите свой адрес электронной почты и пароль, чтобы войти в учетную запись
               </p>
            </div>
            <AuthForm />
            {/* <p className='px-6 text-center text-sm text-slate-500 dark:text-slate-400'>
               <Link
                  href='/register'
                  className='hover:text-brand underline underline-offset-4'
               >
                  Нет учетной записи? Зарегистрироваться
               </Link>
            </p> */}
         </div>
      </div>
      </>
   );
}
