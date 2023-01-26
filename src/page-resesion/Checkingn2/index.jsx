import React from "react";
import Checkingn2Organism from "../../organisms/Checkingn2";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";
import { useParams } from "react-router-dom";


const Checkingn2 =() =>{
    const {id} = useParams()
    const {progress}  = useProgress({id})

    const fillContent =() =>{
        if(progress < 100){
            return <LineProgress progress={progress} />
        }

        return  <Checkingn2Organism id={id} />
    
    }


    return (
           <>{fillContent()}</>
    )

}

export default Checkingn2