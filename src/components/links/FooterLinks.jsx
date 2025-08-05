import { Link, useLocation } from "react-router-dom"
import { layoutDefaultContext } from "../../context/DefaultLayoutContext"


export default function FooterLinks({
    linkName,
    href,
}) {

  const {pathname} = useLocation()

  const {subLinkIsActive, setSubLinkIsActive} = layoutDefaultContext() // CONTEXT TO GET WHEN A SUBLINK IS CLICKED

  return (
    <Link
        to={href}
        className={`${pathname == href && 'text-white-light/50'} block relative p-1 font-semibold text-sm lg:text-sm text-white-light before:absolute before:left-0 before:top-full before:w-0 before:content-[''] before:h-[2px] before:bg-white-light hover:before:w-full hover:text-white-light/50`}
        onClick={()=>{
          if(subLinkIsActive){
            setSubLinkIsActive((prev)=>{
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
