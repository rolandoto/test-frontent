import React, { useContext, useEffect, useState } from "react";
import "./SideNavBar.css";
import { AiOutlineSafetyCertificate ,AiOutlineShoppingCart} from "react-icons/ai";
import { VscSymbolProperty } from "react-icons/vsc";
import { BsFileEarmarkCheck,BsHandbag,BsPerson,BsBell,BsPersonCircle ,BsChatDots,BsArrowRepeat} from "react-icons/bs";
import { BiTaxi } from "react-icons/bi";
import {Link, useHistory} from "react-router-dom"
import { RiHome2Line } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import  AutoProvider  from "../privateRoute/AutoProvider";
import { CiStopSign1 } from "react-icons/ci";
import ReactTooltip from "react-tooltip";
import { Avatar, Grid } from "@nextui-org/react";
import { CiBellOn } from "react-icons/ci";
import ServiceInfomeMovimientoPost from "../service/ServiceInformeMovimientoPost";
import moment from "moment";
import { CiUser } from "react-icons/ci";
import io from 'socket.io-client';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { SocketRoute } from "../config";

const socket = io.connect(`${SocketRoute.serverRoute}`);

const SideNavBar = () => {

    const {pathname} = useLocation()
    console.log(pathname)

    const {jwt,update,setUpadte} =useContext(AutoProvider)
	const [isExpanded, setExpendState] = useState(false);
    const {setJwt} = useContext(AutoProvider)
    const history = useHistory()
    const [user,setUser] = useState(false)
    const [state,setState] =useState()
    const  now = moment().format("YYYY-MM-DD");
    const message="exit"

    const handOpenModal =() =>{
        setUser(true)
    }
    
    const val = jwt ?jwt.result.id_departamento : 2



    useEffect(() =>{
        ServiceInfomeMovimientoPost({id:jwt?.result?.id_hotel,fecha:now}).then(index => {
            setState(index.query)
        }).catch(e =>{
           console.log(e)
        })
    },[jwt])

    const primerosNumeros = state?.slice(0, 3);

    const hanChange =() =>{
        setUpadte(!update)
    }

    const handClose =() =>{
        localStorage.removeItem('jwt')
        localStorage.removeItem('tokenDian')
        setJwt(null)
        history.push("/")
        socket.emit("ExitPms",message);
    }

    if(!jwt) return null

	return (
		<div
			className={"side-nav-container side-nav-container-NX"}>
			<div className="nav-upper">
				<div className="nav-heading">
					
					<button
						
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">

                <ReactTooltip id="IconTip" place="right" effect="solid">
                    <div className="row-flex" >
                        <div>
                            <li> <div className="row-card" >  <img  className="row-to"  width={40} src={jwt.result.logo} alt="" /></div>  </li>
                        </div>
                        
                        <div>
                            
                            <span className="row-block" >{jwt.result.name}</span>
                            <span className="row-block" >{jwt.result.hotel}</span>
                        </div>
                    </div>
                </ReactTooltip>
                
                <Link to={`/home`} className={isExpanded ? "menu-item" : "menu-item-NX Hover-icon   "}  data-tip data-for="IconTip"    >
             
                        <Grid.Container>
                            <Grid >
                            <Avatar
                                    size="lg"
                                   
                                    color="success"
                                    bordered
                                    width={8}
                                    />
                        </Grid>
                        </Grid.Container>
               
                </Link>

            <div>
                
            </div>

                <ReactTooltip id="inicioTip" place="right" effect="solid">
                    Inicio
              </ReactTooltip>
           
                <Link to={`/home`} 	className={ `${pathname == "/home" ? "active-pathname" : "menu-item menu-item-NX" }`}   data-tip data-for="inicioTip" >					
                    
							 <RiHome2Line color="black" fontSize={20}/>
							{isExpanded && <p>{null}</p>}
						
                </Link>

                <ReactTooltip id="BictacorasTip" place="right" effect="solid">
                Bictacoras
              </ReactTooltip>
                
                <Link to={`/Bictacoras`} 	className={ `${pathname == "/Bictacoras" ? "active-pathname" : "menu-item menu-item-NX" }`} data-tip data-for="BictacorasTip"  >
                        
							   <AiOutlineSafetyCertificate color="black"  fontSize={20}  />
							{isExpanded && <p>{null}</p>}
						
                </Link>
                
                <ReactTooltip id="TiendaTip" place="right" effect="solid">
                        Tienda
              </ReactTooltip>
                

                <Link to={`/DetailStorerecepcion/${jwt.result.id_hotel}`}  data-tip data-for="TiendaTip"	className={ `${pathname == `/DetailStorerecepcion/${jwt.result.id_hotel}` ? "active-pathname" : "menu-item menu-item-NX" }`} >
                    <AiOutlineShoppingCart color="black"  fontSize= {20}  /> 
                                {isExpanded && <p>{null}</p>}		
                </Link>

                  
                <ReactTooltip id="ReservasTip" place="right" effect="solid">
                    Reservas
                </ReactTooltip>
                

                <Link to={`/search`}  data-tip data-for="ReservasTip" 	className={ `${pathname == "/search" ? "active-pathname" : "menu-item menu-item-NX" }`} >
                    <BsBell fontSize={20}  color="black" />
                        {isExpanded && <p>{null}</p>}
                 </Link>


                  <ReactTooltip id="MantenimientoTip" place="right" effect="solid">
                    Mantenimiento
                </ReactTooltip>

                <Link to={`/mantenimiento`}  data-tip data-for="MantenimientoTip" 	className={ `${pathname == "/mantenimiento" ? "active-pathname" : "menu-item menu-item-NX" }`} >     
                    <VscSymbolProperty  color="black" fontSize={20}/> 
                            {isExpanded && <p>{null}</p>}      
                </Link>

                
                <ReactTooltip id="FormatosTip" place="right" effect="solid">
                    Formatos
                </ReactTooltip>


                    <Link to={`/Formatos`}   data-tip data-for="FormatosTip"  	className={ `${pathname == "/Formatos" ? "active-pathname" : "menu-item menu-item-NX" }`} >
                                    
                    <BsFileEarmarkCheck color="black" fontSize={20}/>
                                {isExpanded && <p>{null}</p>}
                            
                    </Link>

                    <ReactTooltip id="OlvidosTip" place="right" effect="solid">
                    Olvidos
                </ReactTooltip>


                <Link to={`/Forgetfulnes`}  data-tip data-for="OlvidosTip"  	className={ `${pathname == "/Forgetfulnes" ? "active-pathname" : "menu-item menu-item-NX" }`} >
                    <BsHandbag  color="black" fontSize={20}  />
                                {isExpanded && <p>{null}</p>} 
                </Link>

                <ReactTooltip id="ContactosTip" place="right" effect="solid">
                Contactos
                </ReactTooltip>

         <Link to={`/Contact`}   data-tip data-for="ContactosTip"  	 	className={ `${pathname == "/Contact" ? "active-pathname" : "menu-item menu-item-NX" }`}  >
                        
         <BsPerson color="black" fontSize={25}/>
                     {isExpanded && <p>{null}</p>}
                 
         </Link>
         <ReactTooltip id="CajaTip" place="right" effect="solid">
                Caja menor
        </ReactTooltip>

        <Link to={`/imbox`}   data-tip data-for="CajaTip" 	className={ `${pathname == "/imbox" ? "active-pathname" : "menu-item menu-item-NX" }`} >
        <CiStopSign1 color="black" fontSize={20}/>
                    {isExpanded && <p>{null}</p>} 
        </Link>

        <ReactTooltip id="informacionTip" place="right" effect="solid">
                {primerosNumeros?.map(index => {
                const fecha =  moment(index.Fecha).utc().format('YYYY-MM-DD HH:mm:ss ')

                return (
                    <div key={index.ID}  > 
                        <div className="display-flex-card" >
                        <div>   
                                <div className="flex-card-One" >
                                    <span><CiUser fontSize={30} color="white" /></span>
                                    <span className="color-globito" >{index.Nombre_recepcion}</span>
                                </div>
                                <h4 className="color-globito  let-letra-movimiento" >{index.Movimiento}</h4>
                            </div>
                                
                            <div>
                                <span className="color-globito" >{fecha}</span>
                            </div>
                    </div>
                </div>
                 )
            })}
        </ReactTooltip>
        <a  className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}   data-tip data-for="informacionTip" >
                        
                        <BsChatDots fontSize={20} color="black"   />
                                    {isExpanded && <p>{null}</p>}
                                
        </a>

        <ReactTooltip id="TaxiTip" place="right" effect="solid">
                Taxi
        </ReactTooltip>


        <a  href={`https://taxi.webcoopebombas.com:8087/Account/LogIn?ReturnUrl=%2F`}   data-tip data-for="TaxiTip" 	  className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} target="_blank">
                                <BiTaxi color="black" fontSize={20}/>
                                {isExpanded && <p>{null}</p>}
        </a>

        <ReactTooltip id="updateTipe" place="right" effect="solid">
                salir
        </ReactTooltip>

        <a  className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}   data-tip data-for="updateTipe" onClick={handClose}   >
                        
                        <RiLogoutBoxLine fontSize={20} color="black"   />
                                    {isExpanded && <p>{null}</p>}
                                
        </a>


        <a  className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}   data-tip data-for="updateTip" onClick={hanChange}   >
                        
                        <RiLogoutBoxLine fill="currentColor" fontSize={20}/>
                                    {isExpanded && <p>{null}</p>}
                                
        </a>

				</div>
			</div>
			<div className="nav-footer">
				
			</div>
		</div>
	);
};

export default SideNavBar;
