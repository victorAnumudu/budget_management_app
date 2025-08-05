import MainBtn from "../btn/MainBtn"
import Icons from "../Icons"
import ModalWrapper from "./ModalWrapper"

export default function VerifyModal({proceedFunc, cLoseModal, text='Are You Sure?'}) {
  return (
    <ModalWrapper>
        {/* <!-- Modal header --> */}
        <div className="relative bg-white rounded-lg shadow-round_black dark:border-[1px] dark:border-[#1E2027] dark:bg-black-box dark:text-white">
            <div className="flex items-center justify-between p-6 border-b rounded-t border-slate-higher dark:border-slate-high">
                <h3 className="text-xl font-semibold text-black-body dark:text-white">
                    Verify
                </h3>
                <button onClick={cLoseModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 flex flex-col gap-6 justify-center items-center">
                <Icons name='question' className='text-[60px]' />
                <p className="text-base leading-relaxed text-black-aside dark:text-slate-high">{text}</p>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center gap-6 p-6">
                <MainBtn onClick={proceedFunc} text='Proceed' className="bg-primary dark:bg-primary-dark text-white font-semibold" />
                <MainBtn onClick={cLoseModal} text='Cancel' className="bg-red-500 text-white font-semibold" />
            </div>
        </div>
    </ModalWrapper>
  )
}
