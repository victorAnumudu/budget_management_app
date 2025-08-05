import { useState } from "react";
import { useLocation } from "react-router-dom"
import { FaCaretDown } from "react-icons/fa";
import Icons from "../../Icons";
import { generalLayoutContext } from "../../../context/GeneralLayoutContext";


export default function AsideLinkWithSubLinks({name, icon, to, children, isOpen}) {

    const {shrinkAside} = generalLayoutContext()

  const {pathname} = useLocation()

  const isMatchedPath = pathname.split('/').includes('')
  // isMatchedPath.splice(0,1)

  const [hideSubMenu, setHideSubMenu] = useState(isOpen)

  return (
    <div 
        className={`w-full px-4 py-1 my-1 text-[13px] sm:text-sm font-semibold rounded overflow-hidden`} 
    >   
        <button onClick={()=>setHideSubMenu(prev => !prev)} name={name} className="py-2 w-full flex items-center justify-between gap-2 cursor-pointer text-slate-higher dark:text-slate-high">
            <span className="flex gap-2 items-center">{icon && <Icons name={icon} />}{shrinkAside ? '' : name}</span>
            <FaCaretDown className={`text-base ${(hideSubMenu) ? 'rotate-180' : 'rotate-0'}`} />
        </button>
        <div className={`w-full ${(hideSubMenu) ? 'opacity-100 h-full' : 'opacity-0 h-0'} transition-all duration-500`}>
            {children}
        </div>
    </div>
  )
}
