'use client';

import clsx from 'clsx';

import useConversation from '@/app/hooks/useConversation';
import EmptyState from '@/app/components/EmptyState';

/* export const metadata = {
   title: 'Сообщения'
}; */

const Home = () => {
   const { isOpen } = useConversation();

   return (
      <div
         className={clsx(
            // 'lg:pl-80 h-full lg:block',
            'lg:pl-80 lg:block',
            isOpen ? 'block' : 'hidden'
         )}
      >
         {/* <EmptyState /> */}
      </div>
   );
};

export default Home;
