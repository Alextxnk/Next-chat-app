'use client';

interface LabelProps {
   label: string;
   id: string;
}

const Label: React.FC<LabelProps> = ({
   label,
   id
}) => {
   return ( 
      <div className='ml-1 mb-1'>
            <label
               htmlFor={id}
               /* className='block text-sm font-medium leading-6 text-gray-900' */
               className='ml-1 mb-1 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
               {label}
            </label>
         </div>
   );
}

export default Label;