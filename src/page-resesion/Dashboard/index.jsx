import React, { useRef ,useState,useEffect,useContext, useCallback, useMemo} from "react";
import moment from "moment";
import "moment/locale/es";
import Timeline,{
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CursorMarker,
  CustomMarker,
} from "react-calendar-timeline";
import { ServiceReservas } from "./dummy_data";
import 'react-calendar-timeline/lib/Timeline.css'
import "./BookingsTimeline.css";
import AutoProvider  from "../../privateRoute/AutoProvider";
import "./index.css"
import { useHistory } from "react-router-dom";
import { VscSymbolEvent } from "react-icons/vsc";
import ReactTooltip from "react-tooltip";
import {BsBell} from "react-icons/bs";
import UseListMotels from "../../hooks/UseListMotels";
import HttpClient from "../../HttpClient";
import { CiBadgeDollar } from "react-icons/ci";
import { Button, Modal, Spacer, User } from '@nextui-org/react';
import { CameraIcon, HeartIcon, NotificationIcon } from "./IconReservation";
import Footer from "../../component/Footer/Footer";
import { RiWhatsappFill ,RiLogoutBoxLine} from "react-icons/ri";
import { GiRoundStar } from "react-icons/gi";
import { FaPlane,FaGrinStars } from "react-icons/fa";
import { IoIosGift } from "react-icons/io"
import { HiMiniArrowUpCircle } from "react-icons/hi2";
import { config } from "../../config";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import ItemRenderer from "./ItemRender";
import IntervalRenderer from "./IntervalRender";
import renderGroup from "./RenderGroup";
import intervalRendererday from "./IntervalRenderDay";
import intervalRendererdayNum from "./IntervalRendererdayNum";
import { useDispatch, useSelector } from "react-redux";
import useReservationActions from "../../action/useReservationActions";
import UseFilterRooms from "../../hooks/useFilterRooms";
import useUpdateDetailPointerActions from "../../action/useUpdateDetailPointerActions";
import { confirmAlert } from "react-confirm-alert";
import useUpdateDetailPounterRangeSliceActions from "../../action/useUpdateDetailPounterRangeSliceActions";
import { IconName } from "react-icons/fc";
import UseGroupsRooms from "../../hooks/useGroupsRooms";
import MouseOver from "../../component/MouseOver";

const socket = io.connect("https://railway.grupo-hoteles.com");

const Dashboard = () => {
	const currentDate = new moment();
	const {jwt,setJwt,isOpen, setIsOpen} =useContext(AutoProvider)
	const history = useHistory()
	const timelineRef = useRef(null);
	const [raiting,setRaiting]= useState()
	const {iduser} = UseListMotels()
	const [stateTop,setStateTop] =useState()
	const [statePublicidad,setPublicidad]=useState()
	const message  =jwt?.result?.photo
	const dispatch = useDispatch();

	const {getPostByReservation,
		getRoomByReservation,
		getRoomFilterRoom,
		setUpdateFilterReservation
	} =useReservationActions()

	const {filterRooms } =UseFilterRooms() 

	const {loading,error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

	 const fetchData =async() =>{
        await getPostByReservation()
		await getRoomByReservation()
		await getRoomFilterRoom()
    }

	useEffect(() =>{
        fetchData()
    },[dispatch])

	const handClose =() =>{
        localStorage.removeItem('jwt')
        setJwt(null)
        history.push("/")
    }

	const FindIdHotel=(hotel) =>{
		return hotel.id_hotel == jwt.result.id_hotel
	}

	const hotel = iduser.find(FindIdHotel)

	let countSeguro =0
	
	if(hotel?.segurohotelero ==0){
		 countSeguro=0
	}else{
		 countSeguro = parseInt(hotel?.valorseguro)
	}

	const onItemClick = (itemId) => {	
	  return history.push(`/DetailDashboard/${itemId}`)
	}

	/*const filtrar=(terminoBusqueda)=>{
			let resultadosBusqueda= state?.filter((elemento,index)=>{
				if(elemento?.ID_Tipo_habitaciones?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
				|| elemento?.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
					return elemento;
				}
			});
			setSearch(resultadosBusqueda);
		}
	*/
		
	const handRaiting =(e)=>{
		setRaiting(e.target.value)
	}

	const handClickReservaction =() =>{
		history.push("/Createreservaction")
	}

	const hanclickReservation =() =>{
		history.push("/search")
	}
	
	const handRoomDetail =() =>{
		history.push("/RoomDetail")
	}

	const Informes = [
		{
			id: 1,
			name:"Informe Camareria"
		},
		{
			id: 5,
			name:"Informe auditoría"
		},
		{
			id: 6,
			name:"Informe room to sell"
		},
		{
			id: 7,
			name:"Informe tienda"
		},
		{
			id: 8,
			name:"Informe cuentas pendientes"
		},
		{
			id: 9,
			name:"Informe consolidado"
		},
		{
			id: 10,
			name:"Informe movimiento"
		}
	];

	const [stateInformes,setInformes] =useState(0)

	const handClickInformAuditoria =(e) =>{
		const idByHistory = e.target.value

		if(idByHistory ==5){
			return history.push("/informeauditoria")
		}
		if(idByHistory ==1){
			return history.push("/informecamareria")
		}
		if(idByHistory ==6){
			return history.push("/informeroomtosell")
		}
		if(idByHistory ==7){
			return history.push(`/informeStore/${jwt.result.id_hotel}`)
		}
		if(idByHistory ==8){
			return history.push(`/informeAccount`)
		}
		if(idByHistory ==9){
			return history.push(`/informeconsolidado`)
		}
		if(idByHistory ==10){
			return history.push(`/informeMovimiento`)
		}
		setInformes(e.target.value)	
	}
 
	const nowOne = new Date(2023, 4, 1, 3, 10);

	const {postUpdateDetailPointer} = useUpdateDetailPointerActions()
	const {postUpdateDetailPointerRange} = useUpdateDetailPounterRangeSliceActions()

	const handleItemResize = (itemId, time, edge) => {
		const fecha = moment(time).format('YYYY-MM-DD');
		const newReservation = structuredClone(Items)
		const ReservationIndex = Items.findIndex(item => item.id == itemId)
		const fechaFinal = moment(newReservation[ReservationIndex].end_time).format('YYYY-MM-DD'); 

		const 	fechaInit = new  Date(fechaFinal)
		const	fechafinal = new Date(fecha)

		var diasdif = fechafinal.getTime() - fechaInit.getTime();
    	var contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));

		const totalDiaPat = parseInt(newReservation[ReservationIndex].pagos_dia) * contdias +countSeguro
		let Total =0
		if(totalDiaPat > 0){
			Total=totalDiaPat
		}

		const handModalText =(e) =>{
			confirmAlert({
			  title: '',
			  
				  customUI: ({ onClose }) => {
					const handClick = async() =>{
						if (edge === 'left') {
							newReservation[ReservationIndex].start_time = time
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro });
							socket.emit("sendNotification",message);
							setUpdateFilterReservation(newReservation)
						}else{
							newReservation[ReservationIndex].end_time = time
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro });
							socket.emit("sendNotification",message);
							setUpdateFilterReservation(newReservation)
						}
						onClose()
				}
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirma extencion de estadia?</h4>
							<h4 className="let-letra" >Cobrar de inmediato <span style={{fontSize:"20px"}} >${Total.toLocaleString()}</span> SR@  {newReservation[ReservationIndex].full_name} </h4>
							<button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ onClose} >No</button>
					  </div>         
					);
				  }
			})
		}

		handModalText()

	  };

      const handleItemMove = (itemId, dragTime, newGroupOrder) => {
		let dragTimeOne =0
		let ID_Habitaciones = 0
		let ID_estado_habiatcion =0
		const group = Room[newGroupOrder];

		 Items.map(item =>{
			if(item.id  ==  itemId){
				dragTimeOne= dragTime+( item.end_time - item.start_time)
				ID_Habitaciones =group.id
				ID_estado_habiatcion=group.ID_estado_habiatcion
			}
		})

		const fecha1 = moment(dragTime).format('YYYY-MM-DD');
		const fecha2 = moment(dragTimeOne).format('YYYY-MM-DD');

		const desde =  `${fecha1} 15:00:00`
		const hasta = `${fecha2} 13:00:00`
		//const newReservation = structuredClone(pruebareservas) 

		const handModalText =(e) =>{
			confirmAlert({
			  title: '',
			  
				  customUI: ({ onClose }) => {
	
					const handClick =async () =>{
							const updatedItems = Items.map(item =>
								item.id === itemId
								  ? {
									  ...item,
									  start_time: dragTime,
									  end_time: dragTime + (item.end_time - item.start_time),
									  group: group.id,
									}
								  : item,
							  );
							
							  postUpdateDetailPointerRange({desde,hasta,ID_Habitaciones,id:itemId,ID_estado_habiatcion})
							  socket.emit("sendNotification",message);
							  setUpdateFilterReservation(updatedItems)
						onClose() 
					}
		
				   const handClose =() =>{
					onClose() 
				   }
		
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirma extencion de estadia?</h4>
							<button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
					  </div>         
					);
				  }
			})
		}

		handModalText()
	  };
     
  
	
	const handCLickWhatsapp =() =>{
		const link = document.createElement('a');
		link.href = "https://api.whatsapp.com/send/?phone=573195550001";
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		setTimeout(() => {
		link.click();
		}, 100);
	}

	const numeroDelMes = moment().month() + 1;

	const anoActual = moment().year();

	const [stateKpi,setStatekpi] =useState()

	useEffect(() =>{
		HttpClient.GetKpiUser({month:numeroDelMes,year:anoActual,idUser:jwt.result?.id_user,ID_hotel:jwt?.result?.id_hotel}).then(index =>{
			setStatekpi(index)
		}).catch(e =>{
			console.log(e)
		})
	},[])

	const filTours =  stateKpi?.query.filter((item) => item.ID_Categoria == 8)

	const tourTotal = filTours?.reduce((acum,current) =>{
		return acum + current.Cantidad_comision
	},0)
 
	const filSouvenir =  stateKpi?.query.filter((item) => item.ID_Categoria == 3)

	const sourvenirTotal = filSouvenir?.reduce((acum,current) =>{
		return acum + current.Cantidad_comision
	},0)

	const totalKpi = tourTotal +sourvenirTotal

	useEffect(() =>{
		fetch(`${config.serverRoute}/api/resecion/userKpiTop`)
		.then(resp => resp.json())
		.then(data => setStateTop(data.query))
	},[])

	useEffect(() =>{
		fetch(`${config.serverRoute}/api/resecion/getpublicidad`)
		.then(resp => resp.json())
		.then(data => setPublicidad(data?.query))
	},[])

	const findImage = statePublicidad?.find(item => item.ID == 1)

	const closeHandler = () => {
		setIsOpen(false);
		console.log("closed");
	};


	useEffect(() => {
		socket.on("sendNotification", (data) => {
			toast.custom((t) => (
				<>
				{ t.visible ?
				<footer className="footer-found">
				<div className="notification">
					<img
					src={data}
					alt="Notificación"
					className="notification-image"
					/>
					<div className="notification-content">
					<h4>notificación</h4>
					</div>
				</div>
				</footer>
				 : null}
				</>
			  ))
		});
	  }, [socket]);
	

	const [numberSave,setNumberSave]=useState([])


	const ResutlRoom = filterRooms(Room,raiting)
	//const totalResult = UseGroupsRooms(ResutlRoom,numberSave)
	


	return (
		<>		
		<div>
			<Modal
			style={{background:"#ffffff00",border:"none"}}
			width="1300px"
			closeButton
			preventClose
			open={isOpen}
			blur={true}
			onClose={closeHandler}
		>
		<img
						src={`${findImage?.Img_description}`}
						alt="Anuncio"
						className="advertisement-image"
						/>
		</Modal>

		
		</div>
			<div ref={timelineRef} > 
			<div  className="container-button">
			<Spacer x={4} y={3} />
			<Button  
					onClick={handClickReservaction}
					style={{width:"20%"}}  
					color="error" 
					icon={<HeartIcon fill="currentColor" filled   />} > <span  className="text-words" >Crear reserva</span> </Button>
			<Spacer x={0.5} y={1} />
			<Button 
					onClick={handRoomDetail}
					style={{width:"20%"}}  
					icon={<CameraIcon fill="currentColor" />}  > <span  className="text-words" > Ver habitaciones</span></Button>
			<Spacer  x={0.5} y={1} />
			<select  onChange={handClickInformAuditoria} value={stateInformes}					
							className='button-reservas-type-one button-reservas-type-space button-reservas-type-one-two-two'>
								
							<option   className="opo-room"  > Informes</option>
							{Informes?.map(category =>(
													<option 
													className="opo-room"
													value={category.id	}   
													key={category.id}>
													{category.name}
												</option>
																	))}
						</select>
			<Button 	
					onClick={hanclickReservation}
					style={{width:"20%"}}  
					icon={<NotificationIcon fill="currentColor" />} 
					color="secondary">  <span  className="text-words" > Reservas </span> </Button>
			<Spacer  x={0.5} y={1} />
			<Button 
					onClick={handCLickWhatsapp} 
					style={{width:"20%"}}   
					color="success" flat 
					icon={<RiWhatsappFill fill="currentColor" fontSize={25}
						 />} > <span  className="text-words" ONCL >Soporte</span>  </Button>
				<select onChange={handRaiting}  
						value={raiting} 
						className='button-reservas-type-one button-reservas-type-space  button-reservas-type-one-two-two button-reservas-type-space-One-One' >
						<option  className="opo-room" >  Ver habitaciones</option>
						<option  className="opo-room" >Todas las Habitaciones</option>
						
					{filterRoom?.map(category =>(
						<option 
						className="opo-room"
						value={category.id_tipoHabitacion}   
						key={category.ID}
					>
						{category.nombre}
					</option>
					)
					)}
				</select>
												<Spacer  x={0.5} y={1} />
			<Button 
				onClick={handClose} 
				style={{width:"10%",background:"#e7e4e4",color:"black"}}   
				flat 
				icon={<RiLogoutBoxLine fill="currentColor" fontSize={25}/>} > <span  className="text-words" ONCL >salir</span></Button>
		</div>
		<div className="card-two" >
            <ul className="flex-container wrap-reverse"  >

					<div className="state-type" >
						<li  className="imbox-color-one"> </li>
						<span className="margin-let-rig" >Reserva</span>
					</div>

					<div className="state-type" >
						<li  className="imbox-color-one-pagada"> </li>
						<span className="margin-let-rig" >Reserva Pagada</span>
					</div>

					<div className="state-type" >
						<li  className="imbox-color"> </li>
						<span className="margin-let-rig"  >Check out</span>
					</div>
					<div className="state-type" >
						<li  className="imbox-color-three"> </li>
						<span className="margin-let-rig" >Check in</span>
					</div>

					<div className="state-type" >
						<li  className="imbox-color-four	"> </li>
						<span className="margin-let-rig" >Asear</span>
					</div>

					<div className="state-type" >
						<li  className="imbox-color-three-adeudada-list"> </li>
						<span className="margin-let-rig" >Lista</span>
					</div>

					<div className="state-type" >
						<li  className="imbox-color-five"> </li>
						<span className="margin-let-rig" >Bloqueada</span>
					</div>
					
				</ul>
				
				<ul className="flex-container wrap-reverse" style={{position:"absolute",right:"0"}} >
							<div className="state-type" data-tip data-for="topresecionista"  >
								<li  className="" style={{marginRight:"2px",marginTop:"10px"}} > <HiMiniArrowUpCircle color="black" fontSize={34}/> </li>
								<li  className="" style={{marginRight:"10px",marginTop:"10px"}} ></li>
								<span className="margin-let-rig" style={{marginRight:"15px"}} >Top Recepcionistas</span>
								<div>
									<ReactTooltip 	
													id="topresecionista" 
													place="bottom" effect="solid"  >
										{stateTop?.map(index  =>{
											
											const totalComision = index.Total_Cantidad_comision
											
											return (
											<div key={index.ID}  > 
												<div className="display-flex-cardOne" >
														<div className="flex-card-One" >
														<User bordered
																
																color="success"
																squared
																size="sm"
																	src={index.APP}
																	zoomed
																/>
															<span className="color-globito" >{index.name}</span>

															
														</div>
														<span className="color-globito"  >${totalComision?.toLocaleString()}</span>
												</div>
											</div>
											)
											
										})}
									</ReactTooltip>
								</div>
							</div>
							<div className="state-type" >
								<li  className="" style={{marginRight:"6px",marginTop:"10px"}} > <FaGrinStars color="#ffca28" fontSize={28}/> </li>
								<li  className="" style={{marginRight:"10px",marginTop:"10px"}} ></li>
								<span className="margin-let-rig" style={{marginRight:"15px"}} >Comisiones: {jwt.result.name} </span>
							</div>
							<div className="state-type" >
								<li  className="" style={{marginRight:"10px",marginTop:"10px"}} > <GiRoundStar color="#ffca28" fontSize={28} /></li>
								<span className="margin-let-rig" style={{marginRight:"15px"}} >{totalKpi?.toLocaleString()}</span>
							</div>

							<div className="state-type" >
							<li  className=""  style={{marginRight:"10px",marginTop:"10px"}} > <FaPlane color="#0372f5" fontSize={28} /></li>
								<span className="margin-let-rig" style={{marginRight:"15px"}} >${tourTotal?.toLocaleString()}</span>
							</div>

							<div className="state-type" >
							<li  className=""  style={{marginRight:"10px",marginTop:"10px"}} > <IoIosGift color="red" fontSize={28} /></li>
								<span className="margin-let-rig" style={{marginRight:"15px"}} >${sourvenirTotal?.toLocaleString()}</span>
					</div>
				</ul>
            </div>
			<Timeline
				groupRenderer={renderGroup}
				groups={ResutlRoom}
				items={Items}
				onItemResize={handleItemResize}
				defaultTimeStart={moment().startOf("day").add(-1, "day")}
				defaultTimeEnd={moment().startOf("day").add(18, "day")}
				stackItems
				onItemMove={handleItemMove}									
				itemHeightRatio={0.9}                                                             
				lineHeight={34}
				sidebarWidth={225}
				sidebarContent={<div>Above The Left</div>}
				itemRenderer={  ItemRenderer}
				onItemClick={(itemId, e, time) =>{
					onItemClick(itemId, e, time)
				}}
				now={nowOne}
				itemStyle={{ background: "black" }}
				canMove
				canResize={"both"}
				
				>
				<TimelineHeaders className="list-booking-sticky"  >

				
				<SidebarHeader>
					{({ getRootProps }) => {
					return( 
						 <div style={{	margin:"auto",
						 				display:"flex",
										justifyContent:"center",
										width:"234px"}}  
						>
							 <div {...getRootProps({
						style:{
							borderRadius:"8px",
							margin:"auto",
							textAlign:"center",
							display:"flex",
							justifyContent:"center",
							padding:'8px',
							width:"208px ",
							height: "67px"
						}
					})}>		
					<img  src={jwt.result.logo} alt="" />
			</div>
			</div>
			)}}
			</SidebarHeader>
					<DateHeader
						unit="MONTH"
						labelFormat="MMMM"
						headerData={{ isMonth: false}}
						defaultTimeStart={moment().startOf("day")}
						defaultTimeEnd={moment().startOf("day")}
						intervalRenderer={IntervalRenderer}
					/>
					<DateHeader
						unit="day"
						labelFormat="dddd"
						defaultTimeStart={moment().startOf("day")}
						defaultTimeEnd={moment().startOf("day")}
						headerData={{ isMonth: true, currentDate, }}
						intervalRenderer={intervalRendererday}
					/>
					<DateHeader
						unit="day"
						labelFormat="D"
						headerData={{ isMonth: false, currentDate }}
						intervalRenderer={intervalRendererdayNum}
						/>
				</TimelineHeaders>
				<TimelineMarkers>
				<CustomMarker date={moment().add("day")}>
					{({ styles, date }) => {
					const customStyles = {
						...styles,
						backgroundColor: "#6ae9a175",
						width:"5.3%",
						marginLeft:"-3.1%"
					};
					return (
						<div
						style={customStyles}
						onClick={(event) => console.log("done")}
						/>
					);
					}}
				</CustomMarker>
          <CursorMarker />
        </TimelineMarkers>
			</Timeline>
			<Footer  
					ocupied={<VscSymbolEvent fontSize={20}/>}
					reservas={<BsBell fontSize={20} color="white" />}
					dollar={<CiBadgeDollar fontSize={20} />} />
			</div>
		</>

	);
}
export default Dashboard;