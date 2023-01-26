import React, { useEffect} from "react"
import UseUsers from "../../hooks/UseUser";
import UseTitle from "../../hooks/UseTitle";
import useFormatsAction from "../../action/useFormatsAction";
import { useSelector } from "react-redux";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";
import FormatsTemplate from "../../templates/Formats";

const Formats =() =>{
    UseTitle({title:"Formatos"})    
    const {jwt} = UseUsers()
    const {id_hotel}  = jwt.result
    const {progress} = useProgress({id:id_hotel})
    const {loading,error,entities
                            } = useSelector((state) => state.Formats)
    
    const  {getFormatsById} = useFormatsAction()

    const fethData = async() =>{
        await getFormatsById({id:id_hotel})
    }
  
    useEffect(() =>{
        fethData()
    },[id_hotel])


    console.log({"entities":entities})

    const fillContent =() =>{
        if(progress< 100){
            return <LineProgress progress={progress} />
        }
        if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>{error}</p>
        }
        
        return  <FormatsTemplate entities={entities}  />
    }


    return (
       <>
       {fillContent()}
       </> 
    )
}
export default Formats