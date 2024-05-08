import React, { useContext, useState } from "react";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import useRoomOcasional from "../../action/useRoomOcasional";
import LineProgress from "../../Ui/LineProgress";
import useProgress from "../../hooks/useProgress";
import PageBack from "../../component/PageBack";
import { useSelector } from "react-redux";
import moment from "moment";
import AutoProvider from "../../privateRoute/AutoProvider";
import CardImformeOcasionalMonth from "../../component/CardInformeOcasioanalMonth";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";


const InformeAuditoriaMonth =() =>{

    const {postRoomOcasionalMonth} =  useRoomOcasional()
    const [selectedDay, setSelectedDay] = useState(moment()); // Inicializar con la fecha actual
    const {progress} = useProgress({id:""})
    const {jwt} =useContext(AutoProvider)
    const {loading,error,OcasionalMonth} = useSelector((state) => state.Ocasioanal)


    console.log(OcasionalMonth)

    const handSubmitInvoinces=async() =>{
        await postRoomOcasionalMonth({fecha:selectedDay,id:jwt.result.id_hotel})  
      }

    const FillContent =() =>{
        if(progress < 100){
        return <LineProgress progress={progress} />
        }
        if(loading){
          return <p>...cargando</p>
        }if(error){
          return  <PageBack />
        }

        return <CardImformeOcasionalMonth  OcasionalMonth={OcasionalMonth} />
    }

    return (<>
            <ContainerGlobal>
                 
            <ButtonBack/>
            <ButtonHome/>
                <div style={{display:"flex",alignItems:"center"}} >
                    <input type="date" className="input-selecto-auditoria-fechas"    
                        value={selectedDay.format('YYYY-MM-DD')} onChange={(e) => setSelectedDay(moment(e.target.value))} />
                    <button className="button-informe-cosultar-auditoria" onClick={handSubmitInvoinces} >Consultar</button>
                    <button className="button-informe-imprimir-auditoria"  >Imprimir</button>
                </div>
                {FillContent()}
                  </ContainerGlobal>
             </>)

}

export default InformeAuditoriaMonth