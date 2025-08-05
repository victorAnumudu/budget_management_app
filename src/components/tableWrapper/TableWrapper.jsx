import { useEffect, useState } from "react";
import MainBtn from "../MainBtn";
import Icons from "../Icons";


export default function TableWrapper({
  data = [],
  itemsPerPage = 5,
  filterItem,
  children,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [currentPage, setCurrentPage] = useState(0);
  const [newData, setNewData] = useState([]);

  const numberOfSelection = itemsPerPage;

  const handlePrev = () => {
    if (currentPage !== 0) {
      setCurrentPage((prev) => prev - numberOfSelection);
    }
  };
  const handleNext = () => {
    if (currentPage < data.length) {
      setCurrentPage((prev) => prev + numberOfSelection);
    }
  };

  const handleSearch = ({ target: { value } }, name) => {
    setSearchTerm(value);
    let newFilteredData = data.filter((item) =>
      item[name].toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredData(newFilteredData);
    setCurrentPage(0);
  };

  useEffect(() => {
    setIsLoading(true)
    setTimeout(()=>{
      setNewData(
        filteredData?.slice(currentPage, numberOfSelection + currentPage)
      );
      setIsLoading(false)
    },1000)
  }, [currentPage, filteredData, numberOfSelection]);

  useEffect(()=>{
    setCurrentPage(0)
  },[itemsPerPage])

  return (
    <div className="relative w-full">
      {data.length > 0 && filterItem && (
        <div className="mb-10 flex justify-end items-center gap-2">
          {filterItem.map((item, index) => (
            <label
              key={index}
              className="flex flex-col sm:flex-row items-center gap-2 text-slate-600 dark:text-slate-100 transition-all duration-500"
            >
              Search by {item[0].toUpperCase() + item.slice(1)}
              <input
                name={item}
                type="text"
                className="py-1 px-2 text-sm min-w-[100px] text-black dark:text-white bg-white dark:bg-slate-800 rounded-full border-0 outline-none ring-1 ring-slate-300 dark:ring-white transition-all duration-500"
                value={searchTerm}
                onChange={(e) => {
                  handleSearch(e, item);
                }}
              />
            </label>
          ))}
        </div>
      )}
    
      <div className="flex flex-col">
        <div className="w-full overflow-x-auto">
          {children({ data: newData })}
        </div>
        
        {/* PAGINATION BUTTON */}
        {newData.length > 0 &&
          <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-3 md:gap-6'>
            <div className="text-sm text-center lg:text-left font-normal text-gray-500 dark:text-gray-400 block w-full">Showing <span className="font-semibold text-gray-900 dark:text-white">
              {isLoading ? '----' : `${currentPage + 1}-${currentPage + numberOfSelection >= data.length ? data.length : (currentPage + numberOfSelection)}`}</span> of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span>
            </div>
            {(newData.length >= 0) &&
              <div className='flex items-center gap-3 md:gap-6'>
                  <MainBtn 
                      onClick={handlePrev}
                      // text='Prev' 
                      className={`${currentPage === 0 ? 'bg-primary dark:bg-primary-dark/50 pointer-events-none' : 'bg-primary dark:bg-primary-dark'} text-white-light text-center flex justify-center gap-2 items-center`} 
                      disabled={isLoading}
                  >
                  <Icons name='prev' />
                  </MainBtn>
                  <MainBtn 
                      onClick={handleNext}
                      // text='Next' 
                      className={`${currentPage + numberOfSelection >= data.length ? 'bg-primary dark:bg-primary-dark/50 pointer-events-none' : 'bg-primary dark:bg-primary-dark'} text-white-light text-center flex justify-center gap-2 items-center`} 
                      disabled={isLoading}
                  > 
                  <Icons name='next' />
                  </MainBtn>
              </div>
            }
          </div>
        }
      </div>
      
    {isLoading && <TableIsLoading />}
    </div>
  );
}

const TableIsLoading = () => {
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[991] inset-0 flex justify-center items-center">
      <p className="rounded-md shadow-md p-4 bg-white/90 dark:bg-gray-900 text-brown dark:text-white">Loading...</p>
    </div>
  )
}
