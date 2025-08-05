import { memo } from "react"

const TextareaCom = memo(({id, name, type='text', placeholder, disabled, value, handleChange}) => {
    return (
      <div className='w-full h-20 relative overflow-hidden'>
          <textarea 
            id={id} 
            name={name} 
            type={type} 
            value={value} 
            placeholder={placeholder} 
            disabled={disabled} 
            onChange={handleChange} 
            className='p-2 w-full h-full resize-none text-black dark:text-slate-high outline-0 ring-0 border border-slate-higher focus:dark:border-slate-high focus:border-primary rounded-md transition-all duration-300' 
          />
      </div>
    )
  }
)

export default TextareaCom
