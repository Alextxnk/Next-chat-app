'use client';

import ReactSelect from 'react-select';

interface SelectProps {
   placeholder?: string;
   value: Record<string, any>;
   onChange?: (value: Record<string, any>) => void;
   options: Record<string, any>[];
   disabled?: boolean;
   isMulti: boolean;
}

const Select: React.FC<SelectProps> = ({
   placeholder,
   value,
   onChange,
   options,
   disabled,
   isMulti
}) => {
   return (
      <div className='z-[100]'>
         <ReactSelect
            isDisabled={disabled}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            isMulti={isMulti}
            options={options}
            menuPortalTarget={document.body}
            styles={{
               menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
            classNames={{
               control: () => 'text-base py-px'
            }}
         />
      </div>
   );
};

export default Select;
