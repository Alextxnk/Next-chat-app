import Image from 'next/image';
import AuthForm from './components/AuthForm';
import { Icons } from '../components/Icons';

export default function Home() {
   return (
      <div className='container flex h-screen w-screen flex-col items-center justify-center'>
         <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <AuthForm />
         </div>
      </div>
   );
}
