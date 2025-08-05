// import { useLocation } from "react-router-dom"
import NavLinks from "./NavLinks"
import { layoutDefaultContext } from "../../context/DefaultLayoutContext"


export default function NavLinksWithSubLinks({
    linkName,
    subLink=[],
    asLink=true,
}) {

//   const {pathname} = useLocation()
  const {subLinkIsActive, setSubLinkIsActive} = layoutDefaultContext() // CONTEXT TO GET WHEN A SUBLINK IS CLICKED

  return (
    // <Link
    //     to={''}
    //     className="z-[999] relative p-1 font-semibold text-sm lg:text-lg text-brown"
    // >
    //     <span className="flex gap-1 items-center">
    //         {linkName}
    //         <i className="fa-solid fa-caret-up rotate-180"></i>
    //     </span>
    //     {/* sub links section */}
    //     <div className="py-3 absolute top-[60px] w-48 rounded-md bg-white-light">
    //         {subLink.map(item => (
    //             <div className="w-full px-2 py-1">
    //                 <NavLinks
    //                     linkName={item.linkName}
    //                     href={item.link}
    //                 />
    //             </div>
    //         ))}
    //     </div>
    // </Link>

    <>
        {asLink ? 
        <button
            className={`${(subLinkIsActive && subLinkIsActive == linkName) && 'text-brown/50'} z-[999] uppercase relative text-left p-1 font-semibold text-sm lg:text-sm text-brown hover:text-brown/50`}
            onClick={()=>setSubLinkIsActive((prev)=>{
                // e.stopPropagation()
                // console.log('bubble')
                if(prev == linkName){
                    return null
                }else{
                    return linkName
                }
            })}
        >
            <span className="flex gap-1 items-center">
                {linkName}
                <i className={`fa-solid fa-caret-up ${(subLinkIsActive && subLinkIsActive == linkName) ? 'rotate-0' : 'rotate-180'}`}></i>
            </span>
            {/* sub links section */}
            <div 
                className={`p-0 overflow-hidden absolute top-[55px] w-48 rounded-md bg-white shadow-md ${(subLinkIsActive && subLinkIsActive == linkName) && 'p-3'}`}
                onClick={()=>setSubLinkIsActive((prev)=>{
                    // e.stopPropagation()
                    // console.log('bubble')
                    if(prev == linkName){
                        return null
                    }else{
                        return linkName
                    }
                })}
            >
                {subLink.map(item => (
                    <div key={item.linkName} className={`w-full h-0 overflow-hidden px-2 ${(subLinkIsActive && subLinkIsActive == linkName) && 'h-10'}`}>
                        <NavLinks
                            linkName={item.linkName}
                            href={item.link}
                        />
                    </div>
                ))}
            </div>
        </button>
        :
        <button
        className={`${(subLinkIsActive && subLinkIsActive == linkName) && 'text-brown/50'} z-[999] uppercase relative text-left p-1 font-semibold text-sm lg:text-sm text-brown hover:text-brown/50`}
        onClick={()=>setSubLinkIsActive((prev)=>{
            if(prev == linkName){
                return null
            }else{
                return linkName
            }
        })}
    >
        <span className="flex gap-1 items-center">
            {linkName}
            <i className={`fa-solid fa-caret-up ${(subLinkIsActive && subLinkIsActive == linkName) ? 'rotate-0' : 'rotate-180'}`}></i>
        </span>
        {/* sub links section */}
        <div className={`p-0 overflow-hidden absolute top-[55px] w-48 rounded-md bg-white-light shadow-md ${(subLinkIsActive && subLinkIsActive == linkName) && 'p-3'}`}>
            {subLink.map(item => (
                <div key={item.linkName} className={`w-full h-0 overflow-hidden px-2 ${(subLinkIsActive && subLinkIsActive == linkName) && 'h-10'}`}>
                    {/* <NavLinks
                        linkName={item.linkName}
                        href={item.link}
                    /> */}
                    coming soon
                </div>
            ))}
        </div>
        </button>
        }
    </>
  )
}
