'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
   placeholder?: string;
   id: string;
   type?: string;
   required?: boolean;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
   disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
   placeholder,
   id,
   type,
   required,
   register,
   className,
   errors,
   disabled
}) => {
   return (
      <input
         id={id}
         type={type}
         placeholder={placeholder}
         autoComplete={id}
         disabled={disabled}
         {...register(id, { required })}
         className={clsx(
            /* 'flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
            errors[id] && 'focus:ring-rose-500',     py-1.5 sm:text-sm sm:leading-6 */
            'form-input block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 text-base',
            className,
            disabled && 'opacity-50 cursor-default'
         )}
      />
   );
};

export default Input;
