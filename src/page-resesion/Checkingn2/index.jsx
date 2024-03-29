import React, { useEffect } from "react";
import Checkingn2Organism from "../../organisms/Checkingn2";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";
import { useParams } from "react-router-dom";
import useDetailRoomAction from "../../action/useDetailRoomAction";
import useApiWhataapActions from "../../action/useApiWhataapActions";


const Checkingn2 =() =>{
    const {id} = useParams()
    const {progress}  = useProgress({id})
    const  {postDetailRoom} =  useDetailRoomAction()
    const {postWhataapById} = useApiWhataapActions()

    const fetchDataApiWhatsapp =async({phone,name,url}) =>{
        await postWhataapById({plantilla:"planes_turisticos",to:phone,name,url})
    }

    const fillContent =() =>{
        if(progress < 100){
            return <LineProgress progress={progress} />
        }

        return  <Checkingn2Organism 
                    id={id}
                    postWhataapById={postWhataapById}
                    postDetailRoom={postDetailRoom}
                    fetchDataApiWhatsapp={fetchDataApiWhatsapp} />
    
    }


    return (
           <>{fillContent()}</>
    )

}

export default Checkingn2