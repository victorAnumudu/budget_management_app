
export default function HandBurger({showAside, barColor}) {
  return (
    <div
    className="relative lg:hidden w-5 h-5 flex flex-col items-center justify-between"
    >
    {/* <div
        className={`absolute left-0 w-5 h-1 rounded-md ${barColor ? barColor :'bg-primary dark:bg-primary-dark'} dark:bg-dark-light${
        showAside ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
    ></div> */}
      <div
        className={`absolute left-0 w-5 h-1 rounded-md ${barColor ? barColor :'bg-black-box'} dark:bg-slate-high ${
        showAside =='aside'
            ? "bottom-1/2 translate-y-1/2 rotate-45"
            : ""
        }`}
    ></div>
    <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-1 rounded-md ${barColor ? barColor :'bg-black-box/50'} dark:bg-slate-high transition-all duration-300 ${
        showAside =='aside'
            ? "rotate-[2000deg] opacity-0"
            : ""
        }`}
    ></div>
    <div
        className={`absolute left-0 w-5 h-1 rounded-md ${barColor ? barColor :'bg-black-box/50'} dark:bg-slate-high ${
        showAside =='aside'
            ? "top-1/2 -translate-y-1/2 -rotate-45"
            : "bottom-0"
        }`}
    ></div>
    </div>
  )
}
