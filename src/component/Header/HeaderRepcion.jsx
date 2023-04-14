import React, { useContext, useState } from "react"
import UseUsers from "../../hooks/UseUser"
import { AiOutlineSafetyCertificate ,AiOutlineShoppingCart} from "react-icons/ai";
import { VscSymbolProperty } from "react-icons/vsc";
import { BsFileEarmarkCheck,BsHandbag,BsPerson,BsBell,BsPersonCircle } from "react-icons/bs";
import { BiTaxi } from "react-icons/bi";
import {Link} from "react-router-dom"
import { RiHome2Line } from "react-icons/ri";
import { Avatar, Grid } from "@nextui-org/react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { RiLogoutBoxLine } from "react-icons/ri";
import io from 'socket.io-client';

const HeaderRecepcion  =() =>{

    const {setJwt} = useContext(AutoProvider)
    const {jwt} = UseUsers()

    const [user,setUser] = useState(false)

    const handOpenModal =() =>{
        setUser(true)
    }
    
    const val = jwt ?jwt.result.id_departamento : 2

    const handClose =() =>{
        sessionStorage.removeItem('jwt')
        setJwt(null)
    }

    if(!jwt) return null

    return (
            <div className="navbar" >
                {user &&  <div className="border-ri-user" >
                            <div className="content-Modal-user" >
                                <div className="handclose-user" onClick={() => setUser(false)}>
                                    x
                                </div>
                                    <div className="title-user">
                                        <span className="title-icon" >Bictacoras</span>
                                        <span className="title-icon" >Solicitar Prestamo</span>
                                        <span className="title-icon">Certificado laboral </span>
                                        <span className="title-icon">Solicitar Vacaciones</span>
                                        <span className="title-icon">Horarios</span>
                                        <span className="title-icon">Comunicado Internos</span>
                                        <span className="title-icon">Realizar Revervas</span>
                                        <span className="title-icon">Mis Funciones</span>
                                        <span className="title-icon">Mis Calificacion </span>
                                    </div>
                                </div>
                            </div>}
            
                            <div >
                                <ul className="user-icon-header" >
                                    <li>
                                <Grid.Container>
                                    <Grid onClick={handOpenModal} >
                                    <Avatar
                                    size="lg"
                                    src={jwt.result.photo}
                                    color="success"
                                    bordered
                                    width={10}
                                    />
                                </Grid>
                                </Grid.Container></li>
                                    <li>
                                        <div>
                                        <h3 className="nombre-recepcion" >  Hola,{jwt.result.name} 
                                          <h5 className="name-hotel" > {jwt.result.hotel}</h5>
                                        </h3>
                                      
                                        </div>
                                      
                                        </li>
                                </ul>
                            </div>
                    <div>
                    <ul className="list-icon">
                        <Link to={`/Home`} >
                            <li className="borde-icon">
                                <RiHome2Line color="black" fontSize={25}/>
                                <span className="title-icon" >Inicio  </span>
                            </li>
                        </Link>
                        <Link to="/Bictacoras" >
                            <li className="borde-icon" >
                                <AiOutlineSafetyCertificate color="black"  fontSize={25}  />
                                <span className="title-icon" >Bictacoras</span>
                            </li>
                        </Link>

                        <Link to={`/DetailStorerecepcion/${jwt.result.id_hotel}`}  >
                            <li className="borde-icon">
                                <AiOutlineShoppingCart fontSize= {25}  /> 
                                <span className="title-icon" >Tienda</span>
                            </li>
                        </Link>

                        <Link to="/search">
                            <li className="borde-icon">
                                <BsBell fontSize={25}  />
                                <span className="title-icon" >Reservas</span>
                            </li>
                        </Link>
                        <Link to="/mantenimiento" >
                        <li className="borde-icon">
                            <VscSymbolProperty fontSize={25}/> 
                            <span className="title-icon" >Mantenimiento</span>
                        </li>
                        </Link>
                        <Link to="/Formatos">
                        <li className="borde-icon">
                            <BsFileEarmarkCheck fontSize={25}/>
                            <span className="title-icon" >Formatos</span>
                        </li>
                        </Link>

                        <Link to="/Forgetfulnes">
                        <li className="borde-icon">
                            <BsHandbag fontSize={25}  />
                            <span className="title-icon" >Olvidos</span> 
                        </li>
                        </Link>
                        <Link to="/Contact" >
                        <li className="borde-icon">
                            <BsPerson color="black" fontSize={25}/>
                            <span className="title-icon" >Contactos</span> 
                        </li>
                        </Link>
                        <Link to="/imbox" >
                        <li className="borde-icon">
                            <BsPerson color="black" fontSize={25}/>
                            <span className="title-icon" >Caja menor</span> 
                        </li>
                        </Link>
                        <li className="borde-icon-taxi">
                            <a  href={`https://taxi.webcoopebombas.com:8087/Account/LogIn?ReturnUrl=%2F`} target="_blank" className="icon-taxi">
                                <BiTaxi color="black" fontSize={25}/>
                            Taxi
                            </a>
                        </li>

                        <li className="borde-icon-logout" onClick={handClose}>
                            <a   className="icon-taxi">  
                            <RiLogoutBoxLine fontSize={25} color="white"  />
                            </a>
                    </li>
                    </ul>
                </div>
            </div>
    )
}

export default HeaderRecepcion