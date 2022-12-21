import React from "react"
import "./style.css"

const ButtonState =({handClikCleanline}) =>{

    return (
        <ul className="container-button-dasboard" >
            <li>
                <button className="button-state"  onClick={handClikCleanline} >
                    Aseo
                </button>
            </li> 
        </ul>   
    )

}

export default ButtonState