import { useNavigate } from "react-router-dom"
import MainBtn from "../btn/MainBtn"
import ModalWrapper from "../modals/ModalWrapper"
import RouteLinks from "../../RouteLinks"
import { updateUserDetails } from "../../store/UserDetails"
import { useDispatch } from "react-redux"


export default function LogoutModal({close}) {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(updateUserDetails({}))
        localStorage.clear()
        navigate(RouteLinks.loginPage, {replace:true})
        close()
        // location.reload()
    }
  return (
    <ModalWrapper
    >
        <div className="relative bg-white-body rounded-lg shadow-round_black dark:border-[1px] dark:border-[#1E2027] dark:bg-black-box dark:text-white">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    LOGOUT
                </h3>
                <button onClick={close} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to logout?</h3>
                <div className="flex justify-center items-center gap-6">
                    <MainBtn onClick={handleLogout} text='Logout' className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" />
                    <MainBtn onClick={close} text='Cancel' className="border text-black dark:text-white border-gray-300 dark:border-gray-600" />
                </div>
                </div>
            {/* <!-- Modal footer --> */}
        </div>
    </ModalWrapper>
  )
}