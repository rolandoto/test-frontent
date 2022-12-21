import React  from "react"
import useProgress from "../../hooks/useProgress"
import TemplateCreateReservaction from "../../templates/CreateReservaction"
import LineProgress from "../../Ui/LineProgress"

const CreateReservaction =() =>{

    const id = 12
    const {progress} = useProgress({id})
    
    const fillConten =() =>{
        if(progress <100){
            return <LineProgress progress={progress} />
        }
       return <TemplateCreateReservaction />
    }
    
    return (
            <>
            {fillConten()}
            </>
    )

}

export default CreateReservaction