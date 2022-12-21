import React from "react"
import { IoMdCloseCircle } from "react-icons/io";
import Input from "../../Ui/Input";
import Selected from "../../Ui/Select";

const Checking =({loading,toggleCloseDashboardChecking}) =>{
        
    return (
        <>
           {loading && <div className="border-ri modalNewBooking" >
                            <div className="content-Modal-dasboard" >
                                <div className="contain" >
                                    <div className="handclose" >
                                    
                                    <IoMdCloseCircle fontSize={30} color="black" onClick={toggleCloseDashboardChecking} />
                                    </div>
                                </div>

                                <ul className="flex-bedrooms-checking-modal">   
                                        <li className="contain-searching" >
                                            <label className="title-stores">Busqueda de Reserva</label>
                                            <input className="input-searching" name="Buscar" type="text" />
                                        </li>            
                                </ul>

                                <ul className="inbox-searching" >
                                    <li  className="imbox-personality" > 
                                        <span>8 Noches</span>
                                    </li>
                                    <li className="imbox-personality-1" > 
                                        <span>cop 720000</span>
                                    </li>
                                    <li className="imbox-personality-1"> 
                                        <span>pago destino</span>
                                    </li>
                                    <li className="imbox-personality-2" > 
                                        <span>Abono 3000</span>
                                    </li>
                                    <li className="imbox-personality-3" > 
                                        <span>pendiente</span>
                                    </li>
                                </ul>

                                <ul className="inbox-searching">
                                               <li>
                                                <label class="title-stores">Fecha desde</label>
                                                <input class="input-selecto-dasboard-checking" name="desde" type="date" />

                                                </li>
                                                <li>
                                                <label class="title-stores">Fecha desde</label>
                                                <input class="input-selecto-dasboard-checking" name="desde" type="date" />

                                                </li>
                                               
                                                <li><label class="title-stores">Tipo de habitacion</label>
                                                    <select name="habitaciones" className="select-hotel-type-checking">
                                                    <option>Seleccionar Tipo de habitacion</option>
                                                    </select>
                                                </li>
                                </ul>


                                <ul className="inbox-searching">
                                                <li>
                                                    <label className="title-stores" >Asignar Habitacion</label>
                                                    <select
                                                            name="disponibilidad"
                                                            className='select-hotel-type-rooms-checking'>
                                                        <option></option>
                                                        
                                                    </select>
                                                </li>
                                            <li>
                                                <label className="title-stores">Adultos</label>
                                                <input className="input-stores-personality-checking " name="adultos" type="number"  />
                                            </li>

                                            <li>
                                                <label className="title-stores">Niños</label>
                                                <input className="input-stores-personality-checking" name="niños" type="number"  />
                                            </li>

                                            <li>
                                                <label className="title-stores">Infantes</label>
                                                <input className="input-stores-personality-checking" name="infantes" type="number"  />
                                            </li>
                                                <li>
                                                    <label className="title-stores" >Mascota</label>
                                                    <select 
                                                            name={"talla_perro"}
                                                            className='select-hotel-type-personality'
                                                    >
                                                         <option >{null}</option>
                                                    </select>
                                                </li>

                                                <li>
                                                    <label className="title-stores" >Canal de Reserva</label>
                                                    <select 
                                                            name={"canal_reserva"}
                                                            className='select-hotel-type-personality-unica-checking'>
                                                        <option >{null}</option> 
                                                    </select>
                                                </li>
                                            </ul>
                                        
                                    <ul className="inbox-searching">
                                            
                                            <li>
                                                <label className="title-stores">Nombre</label>
                                                <input className="input-selecto-dasboard-n1-name-checking"  name="Nombre" type={"text"}  />
                                            </li>
                                        <li>
                                            <label className="title-stores">Apellido</label>
                                            <input className="input-selecto-dasboard-n1-name-checking"  name="Apellido" type={"text"} />
                                        </li>

                                            <li>
                                                    <label className="title-stores" >Tipo de Doc</label>
                                                    <select  
                                                            name={"Tipo_documento"}
                                                         
                                                            className='select-hotel-type-personality-identificacion-checking    '>
                                                        <option >{null}</option>
                                                   
                                                    </select>
                                            </li>
                                                
                                                <li>
                                                    <label className="title-stores">No Documento</label>
                                                    <input className="input-stores-personality-one" name="Num_documento" type="text" />
                                                </li>   
                                        </ul>

                                        <ul className="inbox-searching">
                                           
                                                    <li>
                                                            <label className="title-stores">Fecha nacimiento</label>
                                                            <input className="input-selecto-dasboard-n1-name-checking" name="Fecha_nacimiento"  type="date"  />
                                                    </li>   
                                                    
                                                    <li>
                                                        <label className="title-stores">Ciudad</label>
                                                        <input className="input-selecto-dasboard-n1-name-checking"  name="Ciudad"    type="text"  />
                                                    </li>   
                                                            <li>
                                                                <label className="title-stores">Correo electronico</label>
                                                                <input className="select-hotel-type-personality-identificacion-checking" name="Correo" type="text" />
                                                            </li>
                                                        <li>
                                                            <label className="title-stores">Celular</label>
                                                            <input className="input-stores-personality-one"  name="Celular"     type="number"    />
                                                        </li>   
                                            </ul>
                                            <ul className="inbox-searching" >
                                                <li>
                                                    <button className="button-dasboard-one-checking"  >
                                                        Continuar Checking
                                                    </button>
                                                </li> 
                                            </ul> 

                                 </div>
                        </div>
            }
        </>
    )

}

export default Checking