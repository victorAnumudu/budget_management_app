import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const DefaultLayoutProvider = createContext<any>({})

export default function DefaultLayoutContext({children}) {

  const [subLinkIsActive, setSubLinkIsActive] = useState(null)


    const values = {
        subLinkIsActive,
        setSubLinkIsActive
    }
    
  return (
    <DefaultLayoutProvider.Provider value={values}>
        {children}
    </DefaultLayoutProvider.Provider>
  )
}


export const layoutDefaultContext = () => {
  return useContext(DefaultLayoutProvider)
}
