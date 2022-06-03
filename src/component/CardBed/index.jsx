import React, { useState } from "react"
import { BiBed } from "react-icons/bi";

const CardBed =({index}) =>{

    const [state,setState] = useState(false)


    const handModal =() =>{
        setState(true)
    }

    const handClose =() =>{
        setState(false)
    }

    return(
        <div className='cuadro'  >
            <BiBed color="#172b4d" fontSize={20}  />
                <span className='num' >{index}</span>
        </div>
       
    )
}
export default CardBed