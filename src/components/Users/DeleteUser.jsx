import { memo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUserByAdmin } from '../../services/siteServices'
import MainBtn from "../btn/MainBtn"
import Icons from "../Icons"
import ModalWrapper from "../modals/ModalWrapper"
import StatusModal from "../modals/StatusModal"
import queryKeys from "../../services/queryKeys"

const DeleteUser = memo(({cLoseModal, data, text='Are You Sure?'}) => {
    const queryClient = useQueryClient()
    
    const removeUser = useMutation({
        mutationFn: (fields) => {
            return deleteUserByAdmin(fields)
        },
        onError: (error) => {
            // console.log(error)
            setTimeout(()=>{removeUser.reset()}, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
        onSuccess: (res) => {
            if(res?.data?.status != 1){
                throw new Error(res?.data?.message)
            }
            queryClient.refetchQueries({
                queryKey: [...queryKeys.getAllUsers],
                // type: 'active',
                // exact: true,
            })
            setTimeout(()=>{
                // registerUser.reset()
                cLoseModal()
            }, import.meta.env.VITE_APP_SETTIMEOUT_TIME)
        },
    })

        //FUNCTION TO HANDLE DELETE USER
        const handleSubmit = () => {
            const reqData = {delete_uid: data?.id}
            removeUser.mutate(reqData)
        };
      return (
        <>
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
                        <p className="text-base leading-relaxed text-black-aside dark:text-slate-high font-bold">{data.email}</p>
                    </div>
                    {(removeUser.isSuccess || removeUser.isError) &&
                    <div className="px-6 flex flex-col gap-6 justify-center items-center">
                        <p className={`${!removeUser.isSuccess ? 'text-red-500' : 'text-emerald-800'} text-base leading-relaxed text-black-aside dark:text-slate-high`}>
                            {removeUser.isSuccess ? 'User removed successfully' : removeUser.error.message}
                        </p>
                    </div>
                    }
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center gap-6 p-6">
                        <MainBtn 
                            onClick={handleSubmit} 
                            text={removeUser.isPending ? 'Deleting' : 'Proceed'}
                            className="bg-primary dark:bg-primary-dark text-white font-semibold" 
                            loading={removeUser.isPending}
                            disabled={removeUser.isPending || removeUser.isSuccess} 
                        />
                        <MainBtn onClick={cLoseModal} text='Cancel' className="bg-red-500 text-white font-semibold" />
                    </div>
                </div>
            </ModalWrapper>
            {/* { (removeUser.isSuccess || removeUser.isError) &&
                <StatusModal 
                    text={removeUser.isSuccess ? 'User removed successfully' : removeUser.error.message}
                    isSuccess={removeUser.isSuccess}
                    cLoseModal={()=>{removeUser.reset()}}
                />
            } */}
        </>
      )
    }
)

export default DeleteUser
