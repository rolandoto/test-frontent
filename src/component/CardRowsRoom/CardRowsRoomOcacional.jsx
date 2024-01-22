import Swal from "sweetalert2"
import { BiBed } from "react-icons/bi";
import { GiBroom, GiConsoleController } from "react-icons/gi";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { VscSymbolEvent } from "react-icons/vsc";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const CardRowsRoomOcacional =({title,id,ID_estado_habitacion,postDetailRoom,hanchangeEstado,handleContextMenu,textAreaRef,
    setOcacion,setContextMenuVisible,Time_ingreso,Time_salida,Fecha,postDetailRoomById,ValidRoom,Fecha_today}) =>{

    const [currentTime, setCurrentTime] = useState(
        moment().format("MMMM Do YYYY, h:mm:ss a")
      );
      const [diferenciaHoras, setDiferenciaHoras] = useState(0);
      const [diferenciaMinutos, setDiferenciaMinutos] = useState(0);
      const [diferenciaSegundos, setDiferenciaSegundos] = useState(0);
    
      const Time_ingresonow = Time_ingreso;
      const Time_salidanow = Time_salida;
      const fecha_today = Fecha;


       const now = moment().format("YYYY-MM-DDTHH:mm:ss");

      const COUNTDOWN_TARGETO = moment(Time_ingreso, "YYYY-MM-DDTHH:mm:ss");
      console.log({"sdasdsa":Fecha_today})
      
      const COUNTDOWN_TARGET = new Date(`${Fecha_today}`);

    const getTimeLeft = () => {
        const totalTimeLeft = COUNTDOWN_TARGET - new Date();
        const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((totalTimeLeft / 1000) % 60);
        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => {
            const { days, hours, minutes, seconds } = timeLeft;
            console.log({"kshallkdashkdlashkjlidh":minutes});

            if (days < 0 && hours< 0 && minutes< 0) {
              
            }else{
                setTimeLeft(getTimeLeft());
            }
            
        }, 1000);
    
        return () => {
            clearInterval(timer);
        };
    }, []);
    


    let color 
    let letra

    console.log(diferenciaSegundos)
    

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
                        <li><h4 className="let-letra" style={{color:letra}}   > {Object.entries(timeLeft).map((el) =>{
                                const label = el[0];
                                
                                const value = el[1];
                                console.log(value)
                               
                                return (
                                <span> {value} {":"} </span>
                                )
                            } )} </h4></li>
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
                            <li><h4 className="let-letra" >   </h4></li>
                    </div>
               </li>
        </>

    )
}



export default  CardRowsRoomOcacional