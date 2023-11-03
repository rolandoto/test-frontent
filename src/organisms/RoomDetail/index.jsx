import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { BiBed } from "react-icons/bi";
import { GiBroom } from "react-icons/gi";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { VscSymbolEvent } from "react-icons/vsc";
import "./style.css"
import { confirmAlert } from "react-confirm-alert";
import Swal from 'sweetalert2'
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import CardRowsRoom from "../../component/CardRowsRoom/CardRowsRoom";
import CardColorReservation from "../../page-resesion/Dashboard/CardColorsReservation";



const RoomDetailOrganism =({room,postDetailRoom,hanchangeEstado}) =>{ 
    

    return (
        <ContainerGlobal>    
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