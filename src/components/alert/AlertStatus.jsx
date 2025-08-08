import { useEffect } from "react"
import Icons from "../Icons"

export default function AlertStatus({isSuccess=false, cLoseAlert, text='Done Successful'}) {

    useEffect(()=>{
        const effect = setTimeout(()=>{cLoseAlert()},import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        return ()=>clearTimeout(effect)
    },[])

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
        {/* <Icons name={isSuccess ? 'good' : 'bad'} className={`${isSuccess ? 'text-emerald-800' : 'text-red-500'} text-[60px]`} /> */}
        <p className={`${isSuccess ? 'text-emerald-800 bg-emerald-100' : 'text-red-500 bg-red-100'} w-full p-2 rounded-md text-center text-base leading-relaxed text-black-aside dark:text-slate-high`}>{text}</p>
    </div>
  )
}
