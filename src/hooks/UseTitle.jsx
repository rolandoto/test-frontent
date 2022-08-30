import { useEffect, useRef } from "react"

const UseTitle =({title}) =>{

    const preveTitle = useRef(document.title)

    useEffect(() =>{
        const prevusTitle = preveTitle.current

        document.title = `${title} | PMS`

        return () => document.title = prevusTitle
        
    },[title])

}

export default UseTitle