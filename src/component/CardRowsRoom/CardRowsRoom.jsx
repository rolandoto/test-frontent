import Swal from "sweetalert2"
import { BiBed } from "react-icons/bi";
import { GiBroom } from "react-icons/gi";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { VscSymbolEvent } from "react-icons/vsc";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";

const CardRowsRoom =({title,id,ID_estado_habitacion,postDetailRoom,hanchangeEstado}) =>{
    
    let color 
    let letra

    console.log({"sdasds":id,ID_estado_habitacion})
    
    const handChangeTypeRoomOne =(e) =>{
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
            <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne}  >
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
            <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne} >
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
            <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne} >
                <div>
                        <li>  <IoBanOutline fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
        )
    } 

    return (

        <>
               <li class="flex-item"   style={{backgroundColor:"white" }}  onClick={handChangeTypeRoomOne} >
                    <div>
                            <li>  <IoBedOutline fontSize={30} style={{"margin":"auto"}} color="black"  /></li>
                            <li><h4 className="let-letra" >  {title}   </h4></li>
                    </div>
               </li>
        </>

    )
}



export default  CardRowsRoom