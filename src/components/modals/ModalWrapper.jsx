
export default function ModalWrapper({children, maxWidth}) {
  return (
    <div className="bg-[rgba(0,_0,_0,_0.2)] dark:bg-[rgba(0,_0,_0,_0.4)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[999] flex flex-col justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
        <div className={`pop-modal relative p-4 w-full ${maxWidth ? maxWidth : 'max-w-2xl'} max-h-full`}>
            {/* <!-- Modal content --> */}
            <div className="">
              {children}
            </div>
        </div>
    </div>
  )
}

// id="default-modal" tabIndex={-1} aria-hidden="true"