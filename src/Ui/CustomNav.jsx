import React, { useContext, useState } from "react";
import "./SideNavBar.css";
import { AiOutlineSafetyCertificate ,AiOutlineShoppingCart} from "react-icons/ai";
import { VscSymbolProperty } from "react-icons/vsc";
import { BsFileEarmarkCheck,BsHandbag,BsPerson,BsBell,BsPersonCircle } from "react-icons/bs";
import { BiTaxi } from "react-icons/bi";
import {Link, useHistory} from "react-router-dom"
import { RiHome2Line } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import  AutoProvider  from "../privateRoute/AutoProvider";
import { CiStopSign1 } from "react-icons/ci";
import ReactTooltip from "react-tooltip";
import { Avatar, Grid } from "@nextui-org/react";

const SideNavBar = () => {

    const {jwt} =useContext(AutoProvider)
	const [isExpanded, setExpendState] = useState(false);
    const {setJwt} = useContext(AutoProvider)
    const history = useHistory()
    const [user,setUser] = useState(false)

    const handOpenModal =() =>{
        setUser(true)
    }
    
    const val = jwt ?jwt.result.id_departamento : 2

    const handClose =() =>{
        localStorage.removeItem('jwt')
        setJwt(null)
        history.push("/")
    }

    if(!jwt) return null

	return (
		<div
			className={"side-nav-container side-nav-container-NX"
			}
		>
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
                            <li> <div className="row-card" >  <img className="row-to"  width={40} src={jwt.result.logo} alt="" /></div>  </li>
                        </div>
                        
                        <div>
                            <span className="row-block" >{jwt.result.name}</span>
                            <span className="row-block" >{jwt.result.hotel}</span>
                        </div>
                    </div>
                </ReactTooltip>

                <Link to={`/Home`} className={isExpanded ? "menu-item" : "menu-item-NX Hover-icon   "}  data-tip data-for="IconTip"    >
             
                        <Grid.Container>
                            <Grid >
                            <Avatar
                                    size="lg"
                                    src={jwt.result.photo}
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
           
                <Link to={`/Home`} 	className={isExpanded ? "menu-item" : "  menu-item menu-item-NX  "}   data-tip data-for="inicioTip" >					
                    
							 <RiHome2Line color="black" fontSize={18}/>
							{isExpanded && <p>{null}</p>}
						
                </Link>

                <ReactTooltip id="BictacorasTip" place="right" effect="solid">
                Bictacoras
              </ReactTooltip>
                
                <Link to={`/Bictacoras`} 	className={isExpanded ? "menu-item" : "  menu-item menu-item-NX"} data-tip data-for="BictacorasTip"  >
                        
							   <AiOutlineSafetyCertificate color="black"  fontSize={18}  />
							{isExpanded && <p>{null}</p>}
						
                </Link>
                
                <ReactTooltip id="TiendaTip" place="right" effect="solid">
                        Tienda
              </ReactTooltip>
                

                <Link to={`/DetailStorerecepcion/${jwt.result.id_hotel}`}  data-tip data-for="TiendaTip"	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                    <AiOutlineShoppingCart color="black"  fontSize= {18}  /> 
                                {isExpanded && <p>{null}</p>}		
                </Link>

                  
                <ReactTooltip id="ReservasTip" place="right" effect="solid">
                    Reservas
                </ReactTooltip>
                

                <Link to={`/search`}  data-tip data-for="ReservasTip" 	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                    <BsBell fontSize={18}  color="black" />
                        {isExpanded && <p>{null}</p>}
                 </Link>


                  <ReactTooltip id="MantenimientoTip" place="right" effect="solid">
                    Mantenimiento
                </ReactTooltip>

                <Link to={`/mantenimiento`}  data-tip data-for="MantenimientoTip" 	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >     
                    <VscSymbolProperty  color="black" fontSize={18}/> 
                            {isExpanded && <p>{null}</p>}      
                </Link>

                
                <ReactTooltip id="FormatosTip" place="right" effect="solid">
                    Formatos
                </ReactTooltip>


                    <Link to={`/Formatos`}   data-tip data-for="FormatosTip"  	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                                    
                    <BsFileEarmarkCheck color="black" fontSize={18}/>
                                {isExpanded && <p>{null}</p>}
                            
                    </Link>

                    <ReactTooltip id="OlvidosTip" place="right" effect="solid">
                    Olvidos
                </ReactTooltip>


                <Link to={`/Forgetfulnes`}  data-tip data-for="OlvidosTip"  	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                    <BsHandbag  color="black" fontSize={18}  />
                                {isExpanded && <p>{null}</p>} 
                </Link>

                <ReactTooltip id="ContactosTip" place="right" effect="solid">
                Contactos
                </ReactTooltip>

         <Link to={`/Contact`}   data-tip data-for="ContactosTip"  	 	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                        
         <BsPerson color="black" fontSize={18}/>
                     {isExpanded && <p>{null}</p>}
                 
         </Link>


         <ReactTooltip id="CajaTip" place="right" effect="solid">
                Caja menor
        </ReactTooltip>

        <Link to={`/imbox`}   data-tip data-for="CajaTip" 	className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
        <CiStopSign1 color="black" fontSize={18}/>
                    {isExpanded && <p>{null}</p>} 
        </Link>

        <ReactTooltip id="TaxiTip" place="right" effect="solid">
                Taxi
        </ReactTooltip>


        <a  href={`https://taxi.webcoopebombas.com:8087/Account/LogIn?ReturnUrl=%2F`}   data-tip data-for="TaxiTip" 	  className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} target="_blank">
                                <BiTaxi color="black" fontSize={18}/>
                                {isExpanded && <p>{null}</p>}
        </a>

        <ReactTooltip id="SalirTip" place="right" effect="solid">
                Salir
        </ReactTooltip>

         <Link to={`/Home`}    data-tip data-for="SalirTip" 		className={isExpanded ? "menu-item" : "menu-item menu-item-NX"} >
                        
         <RiLogoutBoxLine fontSize={18} color="black"  onClick={handClose}  />
                     {isExpanded && <p>{null}</p>}
                 
         </Link>
				
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt=""
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">M Showkat</p>
							<p className="nav-footer-user-position">store admin</p>
						</div>
					</div>
				)}
				<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
			</div>
		</div>
	);
};

export default SideNavBar;