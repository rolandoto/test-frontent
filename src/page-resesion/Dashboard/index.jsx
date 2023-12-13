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
  TodayMarker,
} from "react-calendar-timeline";
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'
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
import { Button, Modal, Spacer, User ,Switch} from '@nextui-org/react';
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
import DebitCard from "../../component/DebitCard/DebitCard";
import { AiOutlineCaretLeft } from "react-icons/ai";
import FooterNotifacation from "../../component/FooterNotication/FooterNotification";
const socket = io.connect("https://railway.grupo-hoteles.com");

const Dashboard = () => {
	const currentDate = new moment();
	const {jwt,setJwt,isOpen, setIsOpen} =useContext(AutoProvider)
	const history = useHistory()
	const timelineRef = useRef(null);
	const [raiting,setRaiting]= useState(0)
	const {iduser} = UseListMotels()
	const [stateTop,setStateTop] =useState()
	const [statePublicidad,setPublicidad]=useState()
	const message  =jwt?.result?.photo
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);

	//const resultIdhotel =  jwt.result.id_hotel ="23"

	//localStorage.setItem('jwt', resultIdhotel);



  const handleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

	const {getPostByReservation,
		getRoomByReservation,
		getRoomFilterRoom,
		setUpdateFilterReservation
	} =useReservationActions()

	const {filterRooms } =UseFilterRooms() 

	const {loading,error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

	 const fetchData =async() =>{
		try {

			await getPostByReservation({type:isChecked})
			await getRoomByReservation()
			await getRoomFilterRoom()
			} catch (error) {
				console.error("Error fetching data:", error);
				console.log("error")
			}
        
    }

	useEffect(() =>{
        fetchData()
    },[dispatch,isChecked])

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

	const onItemClick = (itemId, e, time) => {	
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
		history.push("/HomeTypehospedaje")
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
		},
		{
			id: 11,
			name:"Informe contabilidad"
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
		if(idByHistory ==11){
			return history.push(`/InformeContabilidad`)
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
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro ,type:"subir"});
							socket.emit("sendNotification",message);
							setUpdateFilterReservation(newReservation)
						}else{
							newReservation[ReservationIndex].end_time = time
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro ,type:"bajar"});
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
	  }
	
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

	const verticalLineClassNamesForTime = (timeStart, timeEnd) => {
		const today = moment().format('YYYY-MM-DD');//day today
		const fecha = moment(timeStart).format('YYYY-MM-DD');//day range of calendario
	
		return fecha === today ? ["today"] : ['holiday'];
	}

	let isFetchingData = true;

	socket.on("sendNotification", async(data) => {
		if (isFetchingData) {
		  isFetchingData = false;
		  toast.custom((t) => (
			<>
			{ t.visible ?
			<div
			className={`${
			  t.visible ? 'animate-enter' : 'animate-leave'
			} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
		  >
			<div className="flex-1 w-0 p-4">
			  <div className="flex items-start">
				<div className="flex-shrink-0 pt-0.5">
				  <img
					className="h-10 w-10 rounded-full"
					src={data}
					alt=""
				  />
				</div>
				<div className="ml-3 flex-1">
				  <p className="text-sm font-medium text-gray-900">
					Emilia Gates
				  </p>
				  <p className="mt-1 text-sm text-gray-500">
					Sure! 8:30pm works great!
				  </p>
				</div>
			  </div>
			</div>
			<div className="flex border-l border-gray-200">
			  <button
				className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			  >
				Close
			  </button>
			</div>
		  </div>
			 : null}
			</>
		  ))
		}
	});

	const [numberSave,setNumberSave]=useState([])

	const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const handleItemSelect = (itemId, e, time) => {
	console.log(time)
    if (!selectedRange.start) {
      // Si no hay una fecha de inicio seleccionada, establece la fecha de inicio
      setSelectedRange({ start: time, end: null });
    } else {
      // Si ya hay una fecha de inicio seleccionada, establece la fecha de fin
      setSelectedRange({ start: selectedRange.start, end: time });
    }
  };

  

  const horizontalLine = (group) => {
	switch (group?.ID_estado_habiatcion) {
		case 2:
			return ["highlight"]
		case 5:
			return ["highlightCheckout"]
	default:
		break;
	}

};

	const ResutlRoom = filterRooms(Room,raiting)
	console.log(ResutlRoom)
	//const totalResult = UseGroupsRooms(ResutlRoom,numberSave)
/**
 * <Modal
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
 */

		useEffect(() => {
			const toggleIcon = document.querySelector(".toggleMenu");
			console.log(toggleIcon)
			toggleIcon.addEventListener("click", () => {
			  document.querySelector(".rightMenu-one").classList.toggle("active");
			  console.log(true)
			});
	  
			toggleIcon.addEventListener("click", () => {
			  document.querySelector(".ocultar").classList.toggle("active");
			  console.log(true)
			});
		  }, []);

		
	return (
		<>		
		
			<div ref={timelineRef} > 
			<div  className="container-button">
			<Spacer x={4} y={0} />
			<Button  
			size="sm"
					onClick={handClickReservaction}
					style={{width:"20%",padding:"0%"}}  
					color="error" 
					icon={<HeartIcon fill="currentColor" filled   />} > <span  className="text-words" >Crear reserva</span> </Button>
			<Spacer x={0.5} y={1} />
			<Button 
			size="sm"
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
			size="sm"
					onClick={hanclickReservation}
					style={{width:"20%"}}  
					icon={<NotificationIcon fill="currentColor" />} 
					color="secondary">  <span  className="text-words" > Reservas </span> </Button>
			<Spacer  x={0.5} y={1} />
			<Button 
			size="sm"
					onClick={handCLickWhatsapp} 
					style={{width:"20%"}}   
					color="success" flat 
					icon={<RiWhatsappFill fill="currentColor" fontSize={25}
						 />} > <span  className="text-words" ONCL >Soporte</span>  </Button>
				<select onChange={handRaiting}  
						value={raiting} 
						className='button-reservas-type-one button-reservas-type-space  button-reservas-type-one-two-two button-reservas-type-space-One-One' >
						<option  className="opo-room" >  Ver habitaciones</option>
						<option  className="opo-room" value={0}  >Todas las Habitaciones</option>
						
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

		<Switch
          checked={isChecked}
		  size="xl"
		  style={{ marginTop: '25px' }}
		  icon={<NotificationIcon />}
		  onChange={handleChange}
        />


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
				horizontalLineClassNamesForGroup={horizontalLine}
				verticalLineClassNamesForTime={verticalLineClassNamesForTime}
				onItemResize={handleItemResize}
				defaultTimeStart={moment().startOf("day").add(-1, "day")}
				defaultTimeEnd={moment().startOf("day").add(18, "day")}
				stackItems
				onItemMove={handleItemMove}	
				resizeDetector={containerResizeDetector}								
				itemHeightRatio={0.9}                                                             
				lineHeight={28.4}
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
				onItemSelect={handleItemSelect}
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
				
  <CursorMarker />
</TimelineMarkers>
			</Timeline>
			<Footer  
					ocupied={<VscSymbolEvent fontSize={20}/>}
					reservas={<BsBell fontSize={20} color="white" />}
					dollar={<CiBadgeDollar fontSize={20} />} />

						<div className="rightMenu-one">
						<button className=" toggleMenu   ocultar" > <AiOutlineCaretLeft fontSize={50} color="black" /></button>
							<h1>Detalle reserva</h1>
                            
                        </div> 
						{isOpen &&	<FooterNotifacation closeHandler={closeHandler} />}
			</div>
		</>

	);
}
export default Dashboard;