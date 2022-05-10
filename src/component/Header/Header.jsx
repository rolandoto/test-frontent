import React, { useState } from "react"
import UseUsers from "../../hooks/UseUser"
import { AiOutlineSafetyCertificate ,AiOutlineShoppingCart} from "react-icons/ai";
import { VscSymbolProperty } from "react-icons/vsc";
import { BsFileEarmarkCheck,BsHandbag,BsPerson,BsBell,BsPersonCircle } from "react-icons/bs";
import { BiTaxi } from "react-icons/bi";
import {Link} from "react-router-dom"
import { RiHome2Line } from "react-icons/ri";


const Header  =() =>{
    const {jwt} = UseUsers()

    const [user,setUser] = useState(false)

    const handOpenModal =() =>{
        setUser(true)
    }
    //esto es para que no muestre sino esta logeado
    if(!jwt) return null

    return (
        <div className="navbar" >
            {user &&  <div className="border-ri-user" >
                        <div className="content-Modal-user" >
                            <div className="handclose-user" onClick={() => setUser(false)}>
                                x
                            </div>
                                <div className="title-user">
                                    <h1>Solicitar Prestamo</h1>
                                    <h1>Solicitar Vacaciones</h1>
                                    <h1>Horarios</h1>
                                    <h1>Comunicado Internos</h1>
                                    <h1>Realizar Revervas</h1>
                                    <h1>Mis Funciones</h1>
                                    <h1>Mis Calificacion </h1>
                                </div>
                            </div>
                        </div>}
           
                        <div >
                            <ul className="user-icon-header" >
                                <li><BsPersonCircle color="black"  fontSize={25} onClick={handOpenModal} /></li>
                                <li><h3>Hola,{jwt.result.name}</h3    ></li>
                            </ul>
                        </div>

                <div>
                  <ul className="list-icon">
                    <Link to={`/Home`} >
                        <li className="borde-icon">
                            <RiHome2Line color="black" fontSize={25}/>
                            <span className="title-icon" >Home</span>
                        </li>
                    </Link>
                    <Link to="/Bictacoras" >
                        <li className="borde-icon" >
                            <AiOutlineSafetyCertificate color="black"  fontSize={25}  />
                            <span className="title-icon" >Bictacoras</span>
                        </li>
                    </Link>
                    <li className="borde-icon">
                        <AiOutlineShoppingCart fontSize= {25}  /> 
                        <span className="title-icon" >Tienda</span>
                    </li>
                    <li className="borde-icon">
                        <BsBell fontSize={25}  />
                        <span className="title-icon" >Reservas</span>
                    </li>
                    <li className="borde-icon">
                        <VscSymbolProperty fontSize={25}/> 
                        <span className="title-icon" >Mantenimiento</span>
                    </li>
                    <li className="borde-icon">
                        <BsFileEarmarkCheck fontSize={25}/>
                        <span className="title-icon" >Formatos</span>
                    </li>
                    <li className="borde-icon">
                        <BsHandbag fontSize={25}  />
                        <span className="title-icon" >Olvidos</span> 
                    </li>
                    <li className="borde-icon">
                        <BsPerson color="black" fontSize={25}/>
                        <span className="title-icon" >Contactos</span> 
                    </li>
                    <li className="borde-icon-taxi">
                        <BiTaxi color="black" fontSize={25}/>
                        <span className="title-icon" >Taxi</span>
                    </li>
                   
                  </ul>
              </div>
        </div>
    )
}

export default Header