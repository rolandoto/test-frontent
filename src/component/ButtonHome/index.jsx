import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { StyledContextBack, StyledMenuItemLoading } from "../../stylecomponent/StyleMenu"
import { CiHome } from "react-icons/ci";

const ButtonHome =() =>{

    const history = useHistory()

    const hanclickHome =() => {
        history.push("/Home")
    }
  
    return (
        <StyledContextBack className="fade-in" top={385} left={39} onClick={hanclickHome} >
            <StyledMenuItemLoading>
                <CiHome fontSize={40} />
            </StyledMenuItemLoading>
         </StyledContextBack>
    )

}

export default ButtonHome