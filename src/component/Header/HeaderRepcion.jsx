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
                                        <h1>Solicitar Prestamo</h1>
                                        <h1>Certificado laboral </h1>
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
                                    <li><h3>Hola,{jwt.result.name}</h3    ></li>
                                </ul>
                            </div>
                    <div>
                    <ul className="list-icon">
                        <Link to={`/Home`} >
                            <li className="borde-icon">
                                <RiHome2Line color="black" fontSize={25}/>
                                <span className="title-icon" >Inicio</span>
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
                    <div className="gif" target="_blank"  >
                            <iframe  className="to-giff" src="https://embed.lottiefiles.com/animation/74754"></iframe>
                    </div>
                  
                    </ul>
                </div>
            </div>
    )
}

export default HeaderRecepcion