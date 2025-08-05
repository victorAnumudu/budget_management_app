import { memo } from "react"

const InputText = memo(({id, name, type='text', placeholder, disabled, value, handleChange}) => {
    return (
      <div className='w-full h-10 relative overflow-hidden'>
          <input 
            id={id} 
            name={name} 
            type={type} 
            value={value} 
            placeholder={placeholder} 
            disabled={disabled} 
            onChange={handleChange} 
            className='p-2 w-full h-full text-black dark:text-slate-high placeholder:italic placeholder:text-sm outline-0 ring-0 border border-slate-higher focus:dark:border-slate-high focus:border-primary rounded-md transition-all duration-300' 
          />
      </div>
    )
  }
)

export default InputText
