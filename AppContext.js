import {createContext, useState} from 'react'

const AppContext = createContext();
const AppProvider = ({children}) => {

    const [numberRange, setNumberRange] = useState(1)

    return(<AppContext.Provider value={{
        numberRange,
        setNumberRange
    }}>{children}</AppContext.Provider>)
}
export { AppContext, AppProvider}