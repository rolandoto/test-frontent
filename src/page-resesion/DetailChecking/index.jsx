import React from "react";
import {useParams} from "react-router-dom"
import useProgress from "../../hooks/useProgress";  
import LineProgress from "../../Ui/LineProgress";
import DetailChekingOrganism from "../../organisms/DetailChecking";


const DetailChecking =() =>{

    const {id} = useParams()
    const {progress}  = useProgress({id})

    const fillContent =() =>{
        if(progress < 100){
            return <LineProgress progress={progress} />
        }

        return  <DetailChekingOrganism  id={id} />
    }


    return <>{fillContent()} </>

}

export default DetailChecking