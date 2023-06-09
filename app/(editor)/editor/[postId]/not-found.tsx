import Link from 'next/link';

import { EmptyPlaceholder } from '@/app/components/EmptyPlaceholder';

export default function NotFound() {
   return (
      <EmptyPlaceholder className='mx-auto max-w-[800px]'>
         <EmptyPlaceholder.Icon name='warning' />
         <EmptyPlaceholder.Title>О-о-о! не найдено</EmptyPlaceholder.Title>
         <EmptyPlaceholder.Description>
            Эту статью не удалось найти. Пожалуйста, попробуйте снова
         </EmptyPlaceholder.Description>
         <Link
            href='/dashboard'
            className='text-brand-900 relative inline-flex h-9 items-center rounded-md border border-slate-200 bg-white px-4  py-2 text-sm font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
         >
            На главную
         </Link>
      </EmptyPlaceholder>
   );
}
