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
   
    let color 
    let letra

    const hours =  moment().format('HH:mm:ss');

    console.log(hours)

    const Time_ingresoa = '10:00:00'; // Replace with your specific time for start
  const Time_salidaa = '14:00:00'; // Replace with your specific time for end

  const [occasions, setOccasions] = useState([
    {
      description: "Occasion 1",
      startTime: moment(hours,'HH:mm:ss'), // Start time
      endTime: moment(Time_salidaa, 'HH:mm:ss').add('hours'), // End time, 2 hours from start
    },
    // Add more occasions as needed
  ]);
    
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();

      // Check if any occasion is currently active
      const activeOccasion = occasions.find((occasion) =>
        now.isBetween(occasion.startTime, occasion.endTime)
      );

      if (activeOccasion) {
        const tiempoTranscurrido = moment.duration(now.diff(activeOccasion.startTime));
        console.log(`Tiempo transcurrido desde el inicio: ${tiempoTranscurrido.humanize()}`);
      }
    }, 60000); // Check every 60 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [occasions]);
 

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
                        <li><h4 className="let-letra" style={{color:letra}}   > 
                        <ul>
                        {occasions.map((occasion, index) => {

                        console.log({"sdklnasldas":occasion.startTime})

                        const minutes   = (occasion.endTime.diff(occasion.startTime, 'minutes')) // 44700
                        console.log(occasion.endTime.diff(occasion.startTime, 'hours')) // 44700

                            return (
                                    <li key={index}>
                                    {minutes} 
                                    </li>
                            )
                        })}
                            </ul>
                        </h4></li>
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