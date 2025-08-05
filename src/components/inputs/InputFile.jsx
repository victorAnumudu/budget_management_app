export default function InputFile({
  id,
  type,
  accept,
  disabled=false,
  // value,
  onChange,
}) {
  return (
    <div className='w-full h-10 relative overflow-hidden'>
      <input
        id={id}
        name={id}
        type={type}
        accept={accept}
        // disabled={disabled}
        //  value={value}
        onChange={onChange}
        className='h-full w-full file:p-2 file:px-4 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:text-white file:font-semibold file:cursor-pointer cursor-pointer transition-all duration-300' 
        // className='h-full w-full file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500'
      />
    </div>
  )
}