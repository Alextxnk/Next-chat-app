'use client';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import Input from '@/app/components/inputs/Input';
import AuthSocialButton from './AuthSocialButton';
// import Button from '@/app/components/Button';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { Icons } from '@/app/components/Icons';
import Label from '@/app/components/inputs/Label';
import { buttonVariants } from '@/app/components/ui/Button';
import { cn } from '@/app/libs/utils';
import Select from '@/app/components/inputs/Select';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
   const session = useSession();
   const router = useRouter();
   const [variant, setVariant] = useState<Variant>('LOGIN');
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (session?.status === 'authenticated') {
         // редирект, если авторизован
         router.push('/dashboard');
         // router.push('/conversations');
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
      setValue,
      watch,
      formState: { errors }
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         email: '',
         academic_duty: '',
         password: ''
      }
   });

   const academic_duty = watch('academic_duty');

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      if (variant === 'REGISTER') {
         // Axios Register
         //console.log(data);

         axios
            .post('/api/register', {
               name: data.name,
               email: data.email,
               academic_duty: data.academic_duty.value,
               password: data.password
            })
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
                  router.push('/dashboard');
                  // router.push('/conversations');
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
                  router.push('/dashboard');
                  // router.push('/conversations');
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
               router.push('/dashboard');
               // router.push('/conversations');
               // router.push('/users');
            }
         })
         .finally(() => setIsLoading(false));
   };

   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
   const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

   const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
   };

   return (
      <>
         <div className='flex flex-col space-y-2 text-center'>
            <Icons.student className='mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>
               Student&apos;s Dashboard
            </h1>
            {variant === 'LOGIN' && (
               <>
                  {/* <h1 className='text-xl font-semibold tracking-tight'>
                     С возвращением
                  </h1> */}
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                     Введите свой адрес электронной почты и пароль, чтобы войти
                     в учетную запись
                  </p>
               </>
            )}
            {variant === 'REGISTER' && (
               <>
                  {/* <h1 className='text-xl font-semibold tracking-tight'>
                     Создать учетную запись
                  </h1> */}
                  <p className='text-sm text-slate-500 dark:text-slate-400'>
                     Введите имя, адрес электронной почты, пароль и выберите
                     должность ниже, чтобы создать учетную запись
                  </p>
               </>
            )}
         </div>
         <div className={clsx('grid gap-5')}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='grid gap-2'>
                  <div className='grid gap-1'>
                     {variant === 'REGISTER' && (
                        <>
                           <Label id='name' label='Имя' />
                           <Input
                              id='name'
                              type='text'
                              placeholder='Введите ваше имя'
                              register={register}
                              errors={errors}
                              required
                              disabled={
                                 isLoading || isGitHubLoading || isGoogleLoading
                              }
                           />
                        </>
                     )}
                  </div>
                  <div className='grid gap-1'>
                     <Label id='email' label='Электронная почта' />
                     <Input
                        id='email'
                        type='email'
                        placeholder='name@example.com'
                        register={register}
                        errors={errors}
                        required
                        disabled={
                           isLoading || isGitHubLoading || isGoogleLoading
                        }
                     />
                  </div>
                  <div className='grid gap-1'>
                     {variant === 'REGISTER' && (
                        <>
                           <Label
                              id='academic_duty'
                              label='Академическая должность'
                           />
                           <Select
                              disabled={
                                 isLoading || isGitHubLoading || isGoogleLoading
                              }
                              isMulti={false}
                              placeholder='Выберите должность'
                              options={['Студент', 'Преподаватель'].map(
                                 (academic_duty) => ({
                                    value: academic_duty,
                                    label: academic_duty
                                 })
                              )}
                              onChange={(value) =>
                                 setValue('academic_duty', value, {
                                    shouldValidate: true
                                 })
                              }
                              value={academic_duty}
                           />
                        </>
                     )}
                  </div>
                  <div className='grid gap-1'>
                     <Label id='password' label='Пароль' />
                     <div className='relative'>
                        <Input
                           id='password'
                           type={showPassword ? 'text' : 'password'}
                           register={register}
                           errors={errors}
                           required
                           disabled={
                              isLoading || isGitHubLoading || isGoogleLoading
                           }
                        />
                        <button
                           className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                           type='button'
                           onClick={toggleShowPassword}
                        >
                           {showPassword ? <Icons.eyeOff /> : <Icons.eye />}
                        </button>
                     </div>
                  </div>
                  <button
                     type='submit'
                     className={cn(buttonVariants())}
                     disabled={isLoading}
                  >
                     {isLoading && !isGitHubLoading && !isGoogleLoading && (
                        <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                     )}
                     {variant === 'LOGIN' ? 'Войти' : 'Зарегистрироваться'}
                  </button>
               </div>
            </form>
            <div className='relative'>
               <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t border-slate-300' />
               </div>
               <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-white px-2 text-slate-600'>
                     Или продолжить с
                  </span>
               </div>
            </div>
            <div className='mt-3 flex gap-2'>
               <button
                  type='button'
                  className={cn(buttonVariants({ variant: 'outlineAuth' }))}
                  onClick={() => {
                     setIsGitHubLoading(true);
                     socialAction('github');
                  }}
                  disabled={isLoading || isGitHubLoading || isGoogleLoading}
               >
                  {isGitHubLoading ? (
                     <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                     <>
                        {/* <Icons.gitHub className='mr-2 h-4 w-4' /> */}
                        <BsGithub className='mr-2 h-4 w-4' />
                     </>
                  )}{' '}
                  Github
               </button>
               <button
                  type='button'
                  className={cn(buttonVariants({ variant: 'outlineAuth' }))}
                  onClick={() => {
                     setIsGoogleLoading(true);
                     socialAction('google');
                  }}
                  disabled={isLoading || isGitHubLoading || isGoogleLoading}
               >
                  {isGoogleLoading ? (
                     <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                     <>
                        {/* <Icons.gitHub className='mr-2 h-4 w-4' /> */}
                        <BsGoogle className='mr-2 h-4 w-4' />
                     </>
                  )}{' '}
                  Google
               </button>
            </div>
            <div className='flex gap-2 justify-center text-sm px-2 text-gray-500'>
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
      </>
   );
};

export default AuthForm;
