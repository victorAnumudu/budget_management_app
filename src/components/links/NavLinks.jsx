import { Link, useLocation } from "react-router-dom"
import { layoutDefaultContext } from "../../context/DefaultLayoutContext"

export default function NavLinks({
    linkName,
    href,
}) {

  const {pathname} = useLocation()

  const {subLinkIsActive, setSubLinkIsActive} = layoutDefaultContext() // CONTEXT TO GET WHEN A SUBLINK IS CLICKED

  return (
    <Link
        to={href}
        className={`${pathname == href && 'text-brown/50'} block uppercase relative p-1 font-semibold text-sm lg:text-sm text-brown before:absolute before:left-0 before:top-full before:w-0 before:content-[''] before:h-[2px] before:bg-brown hover:before:w-full hover:text-brown/50`}
        onClick={()=>{
          if(subLinkIsActive){
            setSubLinkIsActive((prev)=>{
                // e.stopPropagation()
                // console.log('bubble')
                if(prev == linkName){
                    return null
                }else{
                    return linkName
                }
            })
          }
        }}
    >
        {linkName}
    </Link>
  )
}
