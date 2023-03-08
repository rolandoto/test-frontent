import React from "react"
import "./style.css"

const ButtonStateOne=({handBlock}) =>{

        return (
            <ul className="container-button-dasboard" >
                <li>
                    <button className="button-state-one" onClick={handBlock} >
                        Bloquear
                    </button>
                </li> 
        </ul>  
    )
}   

export default ButtonStateOne