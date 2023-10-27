import Swal from "sweetalert2"
import { BiBed } from "react-icons/bi";
import { GiBroom } from "react-icons/gi";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { VscSymbolEvent } from "react-icons/vsc";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const CardRowsRoomOcacional =({title,id,ID_estado_habitacion,postDetailRoom,hanchangeEstado,handleContextMenu,textAreaRef,
    setOcacion,setContextMenuVisible,Time_ingreso,Time_salida,Fecha,postDetailRoomById,ValidRoom}) =>{


    const [currentTime, setCurrentTime] = useState(
        moment().format("MMMM Do YYYY, h:mm:ss a")
      );
      const [diferenciaHoras, setDiferenciaHoras] = useState(0);
      const [diferenciaMinutos, setDiferenciaMinutos] = useState(0);
      const [diferenciaSegundos, setDiferenciaSegundos] = useState(0);
    
      const Time_ingresonow = Time_ingreso;
      const Time_salidanow = Time_salida;
      const fecha_today = Fecha;
    
      useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
          const tiempoActual = moment();
          setCurrentTime(tiempoActual.format("MMMM Do YYYY, h:mm:ss a"));
    
          const momentoIngreso = moment(Time_ingresonow, "HH:mm:ss");
          const momentoSalida = moment(Time_salidanow, "HH:mm:ss");
    
          // Check if the date is today
          const isToday = momentoIngreso.isSame(fecha_today, "day");
    
          if (!isToday) {
            clearInterval(interval);
            // Date is not today, perform necessary actions
            return;
          }
    
          const diferencia = momentoSalida.diff(tiempoActual);
    
          // Verifica si ya es hora de salida
          if (diferencia <= 0) {
            clearInterval(interval);
            // Puedes realizar otras acciones aquí si es necesario
            return;
          }
    
          const horas = Math.floor(diferencia / (60 * 60 * 1000));
          const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
          const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);
    
          setDiferenciaHoras(horas);
          setDiferenciaMinutos(minutos);
          setDiferenciaSegundos(segundos);
    
          // Check if class is finished and show alert
          if (minutos == 0 && segundos == 0) {
            setTimeout(() => {
              alert("Tu clase ha terminado.");
            }, 1000); // Delay for 1 second to ensure the interval is cleared before the alert
          }
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, [Time_ingreso, Time_salida, fecha_today]);
        
    let color 
    let letra
    
    const handChangeTypeRoomOne =(e) =>{
        setContextMenuVisible(false)
		confirmAlert({
		  title: '',
		  message: 'Desea cambiar el estado de la habitacion a:',
		  
          customUI: ({ onClose }) => {

            const handSubmitRoomDetailAsear =() =>{
                if(ID_estado_habitacion ==3){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<p>Habitacion ocupada</p>',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else {
                    postDetailRoom({id,ID_estado_habitacion:5}).then(index=>{
                        onClose()
                    })
                }
                
            }
        
            const handSubmitRoomDetailBloquear =() =>{
                if(ID_estado_habitacion ==3){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<p>Habitacion ocupada</p>',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else {
                    postDetailRoom({id,ID_estado_habitacion:2}).then(index=>{
                        onClose()
                    })
                }
               
            }
        
            const handSubmitRoomDetailDisponible =() =>{
                if(ID_estado_habitacion ==3){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: '<p>Habitacion ocupada</p>',
                        showConfirmButton: false,
                        timer: 2000
                      })
                }else{
                    postDetailRoom({id,ID_estado_habitacion:0}).then(index=>{
                        onClose()
                    })
                } 
            }

            return (
                <div className="popup-overlay"  >
                    <h4 className="let-letra" >Desea cambiar el estado de la habitacion a:</h4>
                    <button  className="react-confirm-alert-button-group" onClick={handSubmitRoomDetailAsear} >Aseo</button>
                    <button  className="react-confirm-alert-button-group" onClick={ handSubmitRoomDetailBloquear} >Bloquear</button>
                    <button  className="react-confirm-alert-button-group"  onClick={ handSubmitRoomDetailDisponible}  >Disponible</button>
              </div>         
            );
          }
		})
    }
    
    if(ID_estado_habitacion == 3){
        color = "#17c964"
        letra ="white"
        return (
            <li className={`flex-item ${ValidRoom && "flex-item-option"} `} style={{backgroundColor:color }}  ref={textAreaRef}  onContextMenu={(e) => handleContextMenu(e,id,Time_salida)} onClick={handChangeTypeRoomOne}   >
                <div>
                    <li><VscSymbolEvent fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                    <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
        )
    } 

    if(ID_estado_habitacion == 5){
        color = "#f3d924cc"
        letra ="black"
        return (
            <li className={`flex-item ${ValidRoom && "flex-item-option"} `} style={{backgroundColor:color }}   ref={textAreaRef}  onContextMenu={(e) => handleContextMenu(e,id,Time_salida)} onClick={handChangeTypeRoomOne}   >
                <div>
                        <li>  <GiBroom fontSize={30} style={{"margin":"auto","fontWeight":1}} color="black" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
        )
    } 

    if(ID_estado_habitacion == 2){
        color = "#747171"
        letra ="white"
        return (
            <li className={`flex-item ${ValidRoom && "flex-item-option"} `} style={{backgroundColor:color }}   ref={textAreaRef}  onContextMenu={(e) => handleContextMenu(e,id,Time_salida)}  onClick={handChangeTypeRoomOne}  >
                <div>
                        <li>  <IoBanOutline fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
        )
    } 

     if(ID_estado_habitacion == 7){
        color = "#f31260"
        letra ="white"
        return (
            <li className={`flex-item ${ValidRoom && "flex-item-option"} `} style={{backgroundColor:color }}   ref={textAreaRef}  onContextMenu={(e) => handleContextMenu(e,id,Time_salida)}  onClick={handChangeTypeRoomOne}  >
                <div>
                        <li>  <AiFillHeart fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                        <li><h4 className="let-letra" style={{color:letra}}   > {diferenciaHoras}:{diferenciaMinutos}:{" "} {diferenciaSegundos}  </h4></li>
                </div>
            </li>
        )
    } 

    return (

        <>
               <li className={`flex-item ${ValidRoom && "flex-item-option"} `}   style={{backgroundColor:"white" }}  ref={textAreaRef} onContextMenu={(e) => handleContextMenu(e,id,Time_salida)}   onClick={handChangeTypeRoomOne}  >
                    <div>
                            <li>  <IoBedOutline fontSize={30} style={{"margin":"auto"}} color="black"  /></li>
                            <li><h4 className="let-letra" >  {title}   </h4></li>
                            <li><h4 className="let-letra" > {diferenciaHoras}:{diferenciaMinutos}:{" "} {diferenciaSegundos}  </h4></li>
                    </div>
               </li>
        </>

    )
}



export default  CardRowsRoomOcacional