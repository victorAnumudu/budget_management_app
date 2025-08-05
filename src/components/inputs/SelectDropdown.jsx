import React, { memo } from 'react'
import Icons from '../Icons'

const SelectDropdown = memo(({
      name='',
      value='',
      className='',
      children,
      onChange,
      disabled=false
  }) => {
    return (
      <div className='w-full h-10 relative overflow-hidden'>
          <select 
              name={name}
              value={value} 
              className={`appearance-none w-full h-full p-2 text-black dark:text-slate-high outline-0 ring-0 border border-slate-higher focus:dark:border-slate-high focus:border-primary rounded-md transition-all duration-300 ${!value && 'opacity-30'}`} 
              onChange={onChange}
              disabled={disabled}
          >
              {children}
          </select>
          <Icons name='arrow-down' className='text-12 absolute top-1/2 -translate-y-1/2 right-1' />
      </div>
    )
  }
)


export default SelectDropdown