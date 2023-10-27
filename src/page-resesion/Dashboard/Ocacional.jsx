import React, { useContext, useRef, useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { useSelector } from "react-redux"
import CardRowsRoom from "../../component/CardRowsRoom/CardRowsRoom"
import ContextMenu from "../../component/contextMenu/ConextMenu"
import CardRowsRoomOcacional from "../../component/CardRowsRoom/CardRowsRoomOcacional"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import { confirmAlert } from "react-confirm-alert"
import useRoomOcasional from "../../action/useRoomOcasional"
import moment from "moment"
import ServiceStatus from "../../service/ServiceStatus"
import useDetailRoomAction from "../../action/useDetailRoomAction"
import { toast } from "react-hot-toast";
import { AiOutlineFieldTime ,AiOutlineDelete,AiOutlineDeliveredProcedure,AiOutlineDownload,AiOutlineHeart,AiOutlineIssuesClose} from "react-icons/ai";
const Ocacionales =() =>{
    const {postRoomOcasionalByID} = useRoomOcasional()
    const  {postDetailRoom} =  useDetailRoomAction()
    const {setOcacion,ocacion,jwt, finish,setFinish} = useContext(AutoProvider)
    const {loading,error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

    const idUser = jwt.result.id_user
    const idHotel = jwt.result.id_hotel

    const currentTime = moment();
    const futureTime = moment().add(3, 'hours');
    
    const horaactual =currentTime.format('HH:mm:ss')
    const horaFuture =  futureTime.format('HH:mm:ss')

    const currentTimeOne =   moment();
    const futureTimeOne =  moment().add(6, 'hours');

    const horaactualOne =currentTimeOne.format('HH:mm:ss')
    const horaFutureOne=  futureTimeOne.format('HH:mm:ss')

    const fecha = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD');

    const [estado, setEstado] = useState(false);

	const hanchangeEstado =() =>{
		setEstado(!estado)
	}

    const tiempoActual = moment();

    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);
    const textAreaRef = useRef(null);

    const handleContextMenu = (e,id,time_fin) => {

        setOcacion(id)
        setFinish(time_fin)
        e.preventDefault();
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);
    };

    const handleCloseContextMenu = (id) => {
        setContextMenuVisible(false);
        console.log("hola mundo")
    };

    const contextMenuOptions = [
        { label: 'Asignar tiempo', action: 'asignar',icon:<AiOutlineFieldTime fontSize={20} style={{marginRight:"8px"}}  /> },
        { label: 'Eliminar', action: 'delete' ,icon:<AiOutlineDelete fontSize={20} style={{marginRight:"8px"}} />},
        { label: 'Facturar', action: 'delete' ,icon:<AiOutlineDeliveredProcedure fontSize={20} style={{marginRight:"8px"}} /> },
        { label: 'Editar', action: 'delete' ,icon:<AiOutlineDownload fontSize={20}  style={{marginRight:"8px"}}/> },
        { label: 'Copiar', action: 'delete'  ,icon:<AiOutlineHeart fontSize={20} style={{marginRight:"8px"}} />},
        { label: 'Actualizar', action: 'delete' ,icon:<AiOutlineIssuesClose fontSize={20} style={{marginRight:"8px"}} /> },

    ];

    const handChangeTypeRoomOne =(idByRoom,finish) =>{
        const momentoSalida = moment(finish, "HH:mm:ss");
       
        const diferencia = momentoSalida.diff(tiempoActual);
       
        const horas = Math.floor(diferencia / (60 * 60 * 1000));
        const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
        const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);
    
        
        setContextMenuVisible(false);
		confirmAlert({
		  title: '',
		  message: 'Desea cambiar el estado de la habitacion a:',
		  
          customUI: ({ onClose }) => {

            const handSubmitRoomOcasionalOne =async() =>{
                if(horas  <=0 && minutos  <=0 && segundos  <=0){
                    postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                    postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                    onClose()
                }else{
                    if(!Boolean(horas)){
                        postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                        postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                        onClose()
                    }else{
                        toast.error("NO puedes agregar mas horas hasta que termine")
                    }
                    
                }
           
            }

            const handSubmitRoomOcasionalTwo =async() =>{
                if(horas  <=0 && minutos  <=0 && segundos  <=0){
                    postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                    postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                    onClose()
                }else{
                    if(!Boolean(horas)){
                        postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                        postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                        onClose()
                    }else{
                        toast.error("NO puedes agregar mas horas hasta que termine")
                    }
                }
            }
              
    

            return (
                <div className="popup-overlay"  >
                    <h4 className="let-letra" >Desea cambiar el estado de bebe:</h4>
                    <button  className="react-confirm-alert-button-group" onClick={handSubmitRoomOcasionalOne}  >3 horas</button>
                    <button  className="react-confirm-alert-button-group"  onClick={handSubmitRoomOcasionalTwo} >6 horas</button>
                    <button  className="react-confirm-alert-button-group"    >Disponible</button>
              </div>         
            );
          }
		})
    }
    
    const prdouctExistValid = (ByID) =>{
        return ocacion == ByID
    }

    return (
            <ContainerGlobal>
                <div className="card-two" >   
                <ul className="flex-container wrap-reverse row-top-roomsOcasioanles"  >

                    <div className="state-type" >
                        <li  className="imbox-color-one"> </li>
                        <span className="margin-let-rig" >Reserva</span>
                    </div>

                    <div className="state-type" >
                        <li  className="imbox-color-one-pagada"> </li>
                        <span className="margin-let-rig" >Reserva Pagada</span>
                    </div>

                    <div className="state-type" >
                        <li  className="imbox-color"> </li>
                        <span className="margin-let-rig"  >Check out</span>
                    </div>
                    <div className="state-type" >
                        <li  className="imbox-color-three"> </li>
                        <span className="margin-let-rig" >Check in</span>
                    </div>

                    <div className="state-type" >
                        <li  className="imbox-color-four	"> </li>
                        <span className="margin-let-rig" >Asear</span>
                    </div>

                    <div className="state-type" >
                        <li  className="imbox-color-three-adeudada-list"> </li>
                        <span className="margin-let-rig" >Lista</span>
                    </div>

                    <div className="state-type" >
                        <li  className="imbox-color-five"> </li>
                        <span className="margin-let-rig" >Bloqueada</span>
                    </div>

                    </ul>
              
                    <ul class="flex-container wrap-reverse">
                        {Room?.map(index => {

                            const ValidRoom = prdouctExistValid(index.id)

                            return (
                            
                            <CardRowsRoomOcacional  {...index}
                            ID_estado_habitacion={index.ID_estado_habiatcion}
                            key={index.id}
                            textAreaRef={textAreaRef}
                            setOcacion={setOcacion}
                            ocacion={ocacion}
                            ValidRoom={ValidRoom}
                            setContextMenuVisible={setContextMenuVisible}
                            handleContextMenu={handleContextMenu}
                            hanchangeEstado={hanchangeEstado}
                            postDetailRoomById={postDetailRoom}  />
                            )
                        })}
                        </ul>
                </div> 

                {isContextMenuVisible && (
                    <ContextMenu
                    top={contextMenuPosition.top}
                    left={contextMenuPosition.left}
                    options={contextMenuOptions}
                    ocacion={ocacion}
                    finish={finish}
                    onClose={handleCloseContextMenu}
                    handChangeTypeRoomOne={handChangeTypeRoomOne}
                    />
  )}
            </ContainerGlobal>
    )
}

export default Ocacionales