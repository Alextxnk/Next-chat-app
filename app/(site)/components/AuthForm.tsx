'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/app/components/inputs/Input';
import AuthSocialButton from './AuthSocialButton';
import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
   const session = useSession();
   const router = useRouter();
   const [variant, setVariant] = useState<Variant>('LOGIN');
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (session?.status === 'authenticated') {
         // редирект, если авторизован
         router.push('/conversations');
         // router.push('/users');
      }
   }, [session?.status, router]);

   const toggleVariant = useCallback(() => {
      if (variant === 'LOGIN') {
         setVariant('REGISTER');
      } else {
         setVariant('LOGIN');
      }
   }, [variant]);

   const {
      // экспортируются из useForm<FieldValues>
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         email: '',
         password: ''
      }
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      if (variant === 'REGISTER') {
         // Axios Register
         axios
            .post('/api/register', data)
            .then(() =>
               signIn('credentials', {
                  ...data,
                  redirect: false
               })
            )
            .then((callback) => {
               if (callback?.error) {
                  toast.error('Неверные учетные данные!');
               }

               if (callback?.ok && !callback?.error) {
                  toast.success('Успешная регистрация');
                  router.push('/conversations');
                  // router.push('/users');
               }
            })
            .catch(() => toast.error('Что-то пошло не так!'))
            .finally(() => setIsLoading(false));
      }

      if (variant === 'LOGIN') {
         // NextAuth SignIn
         signIn('credentials', {
            ...data,
            redirect: false
         })
            .then((callback) => {
               if (callback?.error) {
                  toast.error('Неверные учетные данные!');
               }

               if (callback?.ok && !callback?.error) {
                  toast.success('Успешный вход');
                  router.push('/conversations');
                  // router.push('/users');
               }
            })
            .finally(() => setIsLoading(false));
      }
   };

   const socialAction = (action: string) => {
      setIsLoading(true);
      // NextAuth Social SignIn
      signIn(action, { redirect: false })
         .then((callback) => {
            if (callback?.error) {
               toast.error('Неверные учетные данные!');
            }

            if (callback?.ok && !callback?.error) {
               toast.success('Успешный вход');
               router.push('/conversations');
               // router.push('/users');
            }
         })
         .finally(() => setIsLoading(false));
   };

   return (
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
         <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
               {variant === 'REGISTER' && (
                  <Input
                     disabled={isLoading}
                     register={register}
                     errors={errors}
                     required
                     id='name'
                     label='Имя'
                     type='text'
                  />
               )}

               <Input
                  id='email'
                  label='Электронная почта'
                  type='email'
                  register={register}
                  errors={errors}
                  required
                  disabled={isLoading}
               />
               <Input
                  id='password'
                  label='Пароль'
                  type='password'
                  register={register}
                  errors={errors}
                  required
                  disabled={isLoading}
               />
               <div>
                  <Button disabled={isLoading} fullWidth type='submit'>
                     {variant === 'LOGIN' ? 'Войти' : 'Зарегистрироваться'}
                  </Button>
               </div>
            </form>

            <div className='mt-6'>
               <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                     <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                     <span className='bg-white px-2 text-gray-500'>
                        Или продолжить с
                     </span>
                  </div>
               </div>

               <div className='mt-6 flex gap-2'>
                  <AuthSocialButton
                     icon={BsGithub}
                     onClick={() => socialAction('github')}
                  />
                  <AuthSocialButton
                     icon={BsGoogle}
                     onClick={() => socialAction('google')}
                  />
               </div>
            </div>
            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
               <div>
                  {variant === 'LOGIN'
                     ? 'Нет учетной записи?'
                     : 'Уже есть аккаунт?'}
               </div>
               <div
                  onClick={toggleVariant}
                  className='underline cursor-pointer'
               >
                  {variant === 'LOGIN' ? 'Зарегистрироваться' : 'Войти'}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthForm;
