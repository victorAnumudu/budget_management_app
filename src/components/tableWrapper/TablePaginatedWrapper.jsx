import { useState } from "react";
import MainBtn from "../btn/MainBtn";
import Icons from "../Icons";


export default function TablePaginatedWrapper({
  data = [],
  isFetching,
  pagination,
  setPage,
  children,
}) {

  const handlePrev = () => {
    setPage(prev => prev - 1)
  };
  const handleNext = () => {
    setPage(prev => prev + 1)
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <div className="w-full overflow-x-auto">
          {children({ data })}
        </div>

        <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-3 md:gap-6'>
            <div className="text-sm text-center lg:text-left font-normal text-gray-500 dark:text-gray-400 block w-full">Showing <span className="font-semibold text-gray-900 dark:text-white">
              {isFetching ? '----' : `page ${pagination?.current_page}`}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pagination?.total_pages}</span>
            </div>
              <div className='flex items-center gap-3 md:gap-6'>
                  <MainBtn 
                      onClick={handlePrev}
                      // text='Prev' 
                      className={`${!pagination?.has_prev ? 'bg-primary dark:bg-primary-dark/50 pointer-events-none' : 'bg-primary dark:bg-primary-dark'} text-white min-w-10 max-h-8`} 
                      disabled={isFetching || !pagination?.has_prev}
                      icon='prev'
                  />
                  <MainBtn 
                      onClick={handleNext}
                      // text='Next' 
                      className={`${!pagination?.has_next ? 'bg-primary dark:bg-primary-dark/50 pointer-events-none' : 'bg-primary dark:bg-primary-dark'} text-white min-w-10 max-h-8`} 
                      disabled={isFetching || !pagination?.has_next}
                      icon='next'
                  /> 
              </div>
          </div>
      </div>
      
    {isFetching && <TableIsLoading />}
    </div>
  );
}

export const TableIsLoading = () => {
  return (
    <div className="w-full fixed z-[991] inset-0 flex justify-center items-center bg-black/10">
      <p className="rounded-md shadow-md p-4 bg-white/90 dark:bg-gray-900 text-brown dark:text-white">Loading...</p>
    </div>
  )
}
