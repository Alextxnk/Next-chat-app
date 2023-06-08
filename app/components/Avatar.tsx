'use client';

import { User } from '@prisma/client';

import useActiveList from '../hooks/useActiveList';
import Image from 'next/image';
import { Icons } from '@/app/components/Icons';

interface AvatarProps {
   // user: User;
   user: Pick<User, 'image' | 'name' | 'email'>;
}

const Avatar: React.FC<AvatarProps> = ({ user, ...props }) => {
   const { members } = useActiveList();
   const isActive = members.indexOf(user?.email!) !== -1;

   return (
      <div className='relative'>
         <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-10 md:w-10'>
            <Image
               fill
               src={user?.image || '/images/placeholder.jpg'}
               /* src={user.image} */
               alt='Avatar'
            />
            {/* {user.image ? (
               <Image
                  fill
                  src={user?.image || '/images/placeholder.jpg'}
                  src={user.image}
                  alt='Avatar'
               />
            ) : (
               <>
                  <span className='sr-only'>{user.name}</span>
                  <div className='bg-gray-300'>
                     <Icons.user className='h-8 w-8' />
                  </div>
               </>
            )} */}
         </div>
         {isActive ? (
            <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3' />
         ) : null}
      </div>
   );
};

export default Avatar;
