import Swal from "sweetalert2"
import { BiBed } from "react-icons/bi";
import { GiBroom } from "react-icons/gi";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import { VscSymbolEvent } from "react-icons/vsc";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import HttpClient from "../../HttpClient";
import { useState } from "react";
import { AiOutlineAlignLeft ,AiOutlineCloseCircle} from "react-icons/ai";

const CardRowsRoom =(props) =>{

    const [modalOpenThree, setModalOpenThree] = useState(false);
    const [fechaOne,setFechaOne] =useState()
    const [fechaTwo,setFechaTwo] =useState()
    const [username,setUsername] =useState("")
    const {title,id,ID_estado_habitacion,postDetailRoom,hanchangeEstado,ID_Tipo_habitaciones} = props

    let color 
    let letra

    const dataAvaible ={
        desde:`${fechaOne} 15:00:00`,
        hasta:`${fechaTwo} 13:00:00`,
    }   

   
    const handSubmitRoomDetailBloquear =() =>{
        HttpClient.PostReservationClean({desde:dataAvaible.desde,hasta:dataAvaible.hasta,disponibilidad:id,habitaciones:ID_Tipo_habitaciones,Noches:2,username:username}).then(index =>{
            console.log(index)
            if(ID_estado_habitacion ==3  ){
                toast.error("Habitacion ocupada")
            }else if  (ID_estado_habitacion == 7){
                toast.error("Habitacion ocupada ocasional")
            } else {
                postDetailRoom({id,ID_estado_habitacion:2}).then(index=>{
                   
                })
            }

            toast.success("exitoso")
        }).catch(e =>{
            console.error("error")
            toast.error("error")
        })
       
    }
    
    const handChangeTypeRoomOne =(e) =>{
		confirmAlert({
		  title: '',
		  message: 'Desea cambiar el estado de la habitacion a:',
		  
          customUI: ({ onClose }) => {

            const handSubmitRoomDetailAsear =() =>{
                if(ID_estado_habitacion ==3){
                    toast.error("Habitacion ocupada")
                }else if  (ID_estado_habitacion == 7){
                    toast.error("Habitacion ocupada ocasional")
                }else {
                    postDetailRoom({id,ID_estado_habitacion:5}).then(index=>{
                        onClose()
                    })
                }
                
            }
        
            const handClick =() =>{
                setModalOpenThree(!modalOpenThree)
                onClose()
            }
        
            const handSubmitRoomDetailDisponible =() =>{
                if(ID_estado_habitacion ==3 ){
                    toast.error("Habitacion ocupada")
                }else if  (ID_estado_habitacion == 7){
                    toast.error("Habitacion ocupada ocasional")
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
                    <button  className="react-confirm-alert-button-group" onClick={ handClick} >Bloquear</button>
                    <button  className="react-confirm-alert-button-group"  onClick={ handSubmitRoomDetailDisponible}  >Disponible</button>
              </div>         
            );
          }
		})
    }
    /**
     * 
     * 
     * 
    */
    
    if(ID_estado_habitacion == 3){
        color = "#17c964"
        letra ="white"
        return (
            <>       
            <div>
                  {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Facturas <span className="close" onClick={(e) => setModalOpenThree(false)}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <input 
                                type="date"
                                id="priceInput"
                                onChange={(e)  => setFechaOne(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e) => setFechaTwo(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="text"
                                id="priceInput"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value)}
                                placeholder="Causa del bloqueo"
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                                    
                        <button   className={`pay-button-all`} onClick={handSubmitRoomDetailBloquear}   >
                        Continuar
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>     
            <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne}  >
                <div>
                    <li><VscSymbolEvent fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                    <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
            </>

        )
    } 

    if(ID_estado_habitacion == 5){
        color = "#f3d924cc"
        letra ="black"
        return (
            <>  

<div>
                  {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Facturas <span className="close" onClick={(e) => setModalOpenThree(false)}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <input 
                                type="date"
                                id="priceInput"
                                onChange={(e)  => setFechaOne(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e) => setFechaTwo(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="text"
                                id="priceInput"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value)}
                                placeholder="Causa del bloqueo"
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                                       
                        <button   className={`pay-button-all`}  onClick={handSubmitRoomDetailBloquear}   >
                        Continuar
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>   
                      <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne} >
                <div>
                        <li>  <GiBroom fontSize={30} style={{"margin":"auto","fontWeight":1}} color="black" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
            </>

        )
    } 

    if(ID_estado_habitacion == 2){
        color = "#747171"
        letra ="white"
        return (
            <>
            <div>
                  {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Facturas <span className="close" onClick={(e) => setModalOpenThree(false)}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <input 
                                type="date"
                                id="priceInput"
                                onChange={(e)  => setFechaOne(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e) => setFechaTwo(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="text"
                                id="priceInput"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value)}
                                placeholder="Causa del bloqueo"
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                                              
                        <button   className={`pay-button-all`}  onClick={handSubmitRoomDetailBloquear}   >
                        Continuar
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>   
             <li class="flex-item" style={{backgroundColor:color }} onClick={handChangeTypeRoomOne}  >
                <div>
                        <li>  <IoBanOutline fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
            </>
           
        )
    }
    if(ID_estado_habitacion == 7){
        color = "#f31260"
        letra ="white"
        return (
            <>
            <div>
                  {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Facturas <span className="close" onClick={(e) => setModalOpenThree(false)} >
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <input 
                                type="date"
                                id="priceInput"
                                onChange={(e)  => setFechaOne(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e) => setFechaTwo(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="text"
                                id="priceInput"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value)}
                                placeholder="Causa del bloqueo"
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                                              
                        <button   className={`pay-button-all`}  onClick={handSubmitRoomDetailBloquear}   >
                        Continuar
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>   
            <li className={`flex-item`} style={{backgroundColor:color }}    onClick={handChangeTypeRoomOne} >
                <div>
                        <li>  <AiFillHeart fontSize={30} style={{"margin":"auto","fontWeight":1}} color="white" /></li>
                        <li><h4 className="let-letra" style={{color:letra}}   >  {title}   </h4></li>
                </div>
            </li>
            </>
        )
    } 

    return (

        <>
        <div>
            {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Bloquear <span className="close" onClick={(e) => setModalOpenThree(false)}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e)  => setFechaOne(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="date"
                                id="priceInput"
                                onChange={(e) => setFechaTwo(e.target.value)}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                        <input 
                                type="text"
                                id="priceInput"
                                value={username}
                                onChange={(e) =>setUsername(e.target.value)}
                                placeholder="Causa del bloqueo"
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        
                        </input>
                
                        <button   className={`pay-button-all`} onClick={handSubmitRoomDetailBloquear}    >
                           Continuar
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>   
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