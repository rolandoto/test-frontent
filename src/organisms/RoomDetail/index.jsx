import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { BiBed } from "react-icons/bi";
import "./style.css"



const CardRowsRoom =({title,id,postDetailRoom}) =>{

    const handSubmitRoomDetailAsear =() =>{
        postDetailRoom({id,ID_estado_habitacion:5})
    }

    const handSubmitRoomDetailLimpiar =() =>{
        postDetailRoom({id,ID_estado_habitacion:2})
    }

    const handSubmitRoomDetailDisponible =() =>{
        postDetailRoom({id,ID_estado_habitacion:0})
    }

    return (
        <div className="card-one" > 
        <div className="display-flex-card" >
        <div  >   
                <div className="flex-card-One" >
                    <span><BiBed fontSize={30} color="black" /> </span>
                </div>
             <div className="container-card-room-detail" >
                     <div className="">
                                 <h4 className="let-letra-movimiento" >{title}   </h4>
                         </div>
                         <div className="flex-container-imbox" > 
                             <div className="caja-room-detail"  onClick={handSubmitRoomDetailAsear} >
                                         <span>Asear habitacion</span>
                             </div>

                             <div className="caja-room-detail-asear" onClick={handSubmitRoomDetailLimpiar}  >
                                         <span> Habitacion bloqueada</span>
                             </div>

                             <div className="caja-room-detail-disponible" onClick={handSubmitRoomDetailDisponible}  >
                                         <span> Habitacion Disponible</span>
                             </div>

                         </div>
                 
             </div>
                 
                 </div>
            <div>
             
            </div>
            
        </div>

    </div>
    )
}



const RoomDetailOrganism =({room,postDetailRoom}) =>{    

    console.log(room)

    return (
        <ContainerGlobal>            
                {room.map(index => (
                    <CardRowsRoom  {...index}
                    key={index.id}
                    postDetailRoom={postDetailRoom}  />
                ))}
       
        </ContainerGlobal>

    )
}

export default RoomDetailOrganism