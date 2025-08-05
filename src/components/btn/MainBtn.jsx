import { memo } from "react"
import Icons from "../Icons"

const MainBtn = memo(({
    type='button',
    text,
    className='',
    icon='',
    loading,
    disabled,
    shrinkAside = false,
    onClick,
  }) => {
    return (
      <button 
          type={type}
          disabled={disabled}
          className={`${loading && 'dots-loading'} ${(disabled || loading) && 'opacity-60 pointer-events-none'} w-full h-10 p-2 flex justify-center items-center gap-2 rounded-md ${className}`}
          onClick={onClick}
      >
          {icon && <Icons name={icon} className='' />}
          {shrinkAside ? '' : text}
      </button>
    )
  })

export default MainBtn