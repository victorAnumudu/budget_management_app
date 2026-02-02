import { Link, useLocation } from "react-router-dom"
import Icons from "../../Icons"
import { generalLayoutContext } from "../../../context/GeneralLayoutContext"

export default function AsideLink({name, to, icon}) {

    const {shrinkAside, setShowAsideDrawer} = generalLayoutContext()

  const {pathname} = useLocation()

  return (
    <Link 
        className={`w-full flex items-center gap-2 px-4 py-1 my-1 text-[13px] sm:text-sm font-semibold rounded-md hover:bg-white dark:hover:bg-black text-slate-higher dark:text-slate-high ${pathname == to ? 'bg-white-body dark:bg-black' : ''}`} 
        to={to}
        onClick={()=>setShowAsideDrawer(false)}
    >   
        {icon && <Icons name={icon} />}
        {shrinkAside ? '' : name}
    </Link>
  )
}
