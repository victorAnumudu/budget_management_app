// import { generalLayoutContext } from "../context/GeneralLayoutContext";
import localImgLoader from "../helpers/localImageLoader";

export default function DummyLogo() {
  return (
    <div className="w-20 rounded cursor-pointer text-white p-2 flex flex-col justify-center items-center gap-0">
        {/* <h1 className="text-sm font-bold">Abia</h1>
        <p className="text-12">logo here</p> */}
        <img src={localImgLoader('logos/Abia_logo.png')} className='w-full h-auto dark:grayscale-50' alt='ABIA LOGO' />
    </div>
  )
}
