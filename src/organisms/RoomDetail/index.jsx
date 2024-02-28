import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import "./style.css"
import CardRowsRoom from "../../component/CardRowsRoom/CardRowsRoom";
import CardColorReservation from "../../page-resesion/Dashboard/CardColorsReservation";
import { StyledContextBack, StyledMenuItemLoading } from "../../stylecomponent/StyleMenu";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ButtonBack from "../../component/ButtonBack";


const RoomDetailOrganism =({room,postDetailRoom,hanchangeEstado}) =>{ 
    
   

    return (
        <ContainerGlobal>    
           <ButtonBack/>
            <CardColorReservation />
             <div className="card-two" >   
                <ul class="flex-container wrap-reverse">
                    {room?.map(index => (
                        <CardRowsRoom  {...index}
                        ID_estado_habitacion={index.ID_estado_habiatcion}
                        key={index.id}
                        postDetailRoom={postDetailRoom}
                        hanchangeEstado={hanchangeEstado}  />
                    ))}
                    </ul>
            </div> 
        </ContainerGlobal>

    )
}

export default RoomDetailOrganism