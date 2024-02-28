import React from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { StyledContextBack, StyledMenuItemLoading } from "../../stylecomponent/StyleMenu"
import { BsArrowLeftSquare } from "react-icons/bs";

const ButtonBack =() =>{

    const history = useHistory()

    const hanclickBack =() => {
        history.goBack()
    }
  
    return (
        <StyledContextBack className="fade-in" top={332} left={39} onClick={hanclickBack} >
            <StyledMenuItemLoading>
                <BsArrowLeftSquare fontSize={30} />
            </StyledMenuItemLoading>
         </StyledContextBack>
    )

}

export default ButtonBack