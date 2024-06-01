import React, { useRef ,useState,useEffect,useContext, useCallback, useMemo} from "react";
import moment from "moment";
import "moment/locale/es";
import Timeline,{
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CursorMarker,
} from "react-calendar-timeline";
import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'
import 'react-calendar-timeline/lib/Timeline.css'
import "./BookingsTimeline.css";
import AutoProvider  from "../../privateRoute/AutoProvider";
import "./index.css"
import { useHistory } from "react-router-dom";
import { VscSymbolEvent } from "react-icons/vsc";
import {BsBell} from "react-icons/bs";
import UseListMotels from "../../hooks/UseListMotels";
import { CiBadgeDollar } from "react-icons/ci";

import Footer from "../../component/Footer/Footer";
import io from "socket.io-client";
import { toast } from "react-hot-toast";
import ItemRenderer from "./ItemRender";
import renderGroup from "./RenderGroup";
import intervalRendererday from "./IntervalRenderDay";
import intervalRendererdayNum from "./IntervalRendererdayNum";
import { useDispatch, useSelector } from "react-redux";
import useReservationActions from "../../action/useReservationActions";
import useUpdateDetailPointerActions from "../../action/useUpdateDetailPointerActions";
import { confirmAlert } from "react-confirm-alert";
import useUpdateDetailPounterRangeSliceActions from "../../action/useUpdateDetailPounterRangeSliceActions";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import { HiArrowLeft,HiArrowSmallRight,HiArrowUturnLeft   } from "react-icons/hi2";
import {contextMenuOptionsHeader, contextMenuOptionsInform, contextMenuOptionsReservation } from "../../stylecomponent/Icons";
import { StyleSpan, StyleSpanIcons, StyleTitle, StyleTitleHotel, StyledContextMenu, StyledContextMenuSearch, StyledContextMenuTypeRoom, StyledContextTyeHotel, StyledContextTyeHotelConfiguration, StyledContextbyFacturacion, StyledMenuItem, StyledMenuItemSelectedRoom, StyledMenuItemUser } from "../../stylecomponent/StyleMenu";
import { CiSearch } from "react-icons/ci";
import { BsMenuButtonWide } from "react-icons/bs";
import { SocketRoute } from "../../config";
import { RxDropdownMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsArrowDown } from "react-icons/bs";
import UseUsers from "../../hooks/UseUser";
import confetti from "canvas-confetti";
import Preloading from "../../component/Preloading";
import { IoIosSwitch } from "react-icons/io";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { PiUserSwitchThin } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import useUserUpdateRolesActions from "../../action/useUserUpdateRolesActions";
import useSocket from "../../hooks/UseSocket";
import IconAviableBill from "../../component/IconAviableBill";

//https://railway.grupo-hoteles.com
//const socket = io.connect(`${SocketRoute.serverRoute}`);

const Dashboard = () => {

	const currentDate = new moment();
	const {jwt,setJwt,isOpen, setIsOpen,dateDasboard,setDatedasrboard} =useContext(AutoProvider)
	const history = useHistory()
	const [raiting,setRaiting]= useState("")
	const {iduser} = UseListMotels()
	const message  =jwt?.result?.photo
	const dispatch = useDispatch();
	const [isChecked, setIsChecked] = useState(false);
	const [OpenMenu,setOpenMenu] =useState(false)
	const [OpenMenuInforme,setOpenMenuInforme] =useState(false)
	const [OpenTypeRoom,setTypeRoom] =useState(false)
	const [OpenMenuReservation,setOpenReservation] =useState(false)
	const [numberDay,setNumberDay] =useState(15)
	const [numMineDay,setNumMineDay] =useState(-5)
	const [selectedDay, setSelectedDay] = useState(moment()); // Inicializar con la fecha actual
	const [avaibleDay,setAvaibleDay] =useState(false)
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [username,setUsername] =useState("")
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
	const [validHotel,setValidHotel] =useState(false)
	const [OpenConfiguration,setOpenConfiguration] =useState(false)
	const { login,isError,isLogin} =UseUsers() 
	const { Img} = Preloading({isLogin})
	
	const {postUserUpdateRolesById} = useUserUpdateRolesActions()
	
 	const updateLocalStorage =(state) =>{
		window.localStorage.setItem("check",JSON.stringify(state))
	}

	//const {loading} = useSelector((state) => state.updateDetailPounter)


	const initialState = JSON.parse(window.localStorage.getItem("check")) || false
	
	const handClickValid =() =>{
		setValidHotel(!validHotel)
	}

	const socket = useSocket();

	const handleItemClickHotel =async(action) =>{
		try {
			login({username:jwt.result.username,password:"sassadas",hotel:action.id_hotel})
			setValidHotel(!validHotel)
			fetchData()
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 70,
				origin: { x: 0.50, y: 0.8 }
			});
		} catch (error) {
			toast.error("error al servicio")
		} 
	}

	const HandClickUserUpdtateRoles=async(byIdpermision) =>{
		try {
			postUserUpdateRolesById({id_permissions:byIdpermision,id:jwt.result.id_user})
			login({username:jwt.result.username,password:"sassadas",hotel:jwt.result.id_hotel})
			confetti({
				zIndex: 999,
				particleCount: 100,
				spread: 70,
				origin: { x: 0.50, y: 0.8 }
			});
			setOpenConfiguration(false)
		} catch (error) {
			console.error("error en el servidor ")
		}
	}

	const handClickOpentypeRoom =() =>{
		setContextMenuPosition({top:110, left: 168})
		setTypeRoom(!OpenTypeRoom)
		setOpenMenu(false)
		setOpenMenuInforme(false)
		setOpenReservation(false)
		setOpenConfiguration(false)
	}

	const handClickConfiguration =() =>{
		setOpenConfiguration(!OpenConfiguration)
		setContextMenuPosition({top:57, left: 49})
		setOpenMenuInforme(false)
		setOpenReservation(false)
		setTypeRoom(false)
	}

	const handClickOpenMenu =() =>{
		setContextMenuPosition({top:110, left: 28})
		setOpenMenu(!OpenMenu)
		setOpenMenuInforme(false)
		setOpenReservation(false)
		setTypeRoom(false)
		setOpenConfiguration(false)
	}

	const handClickOpenMenuInforme =() =>{
		setOpenMenuInforme(!OpenMenuInforme)
		setOpenMenu(false)
		setOpenReservation(false)
		setTypeRoom(false)
		setOpenConfiguration(false)
		setContextMenuPosition({top:110, left: 130})
	}

	const handClickOpenMenuReservation =() =>{
		setOpenReservation(!OpenMenuReservation)
		setOpenMenu(false)
		setOpenMenuInforme(false)
		setTypeRoom(false)
		setOpenConfiguration(false)
		setContextMenuPosition({top:110, left: 205})
	}

	const handExit =() =>{
        localStorage.removeItem('jwt')
        localStorage.removeItem('tokenDian')
        setJwt(null)
        history.push("/")  
    }


	const handSubmitSearch =(option) =>{
		setNumberDay(15);
		setNumMineDay(-5);
		setRaiting(option?.group?.toString())
		setSelectedDay(moment(option?.start_time));
		setShowContextMenu(false)
		setOpenConfiguration(false)
	}

	const handleItemClick = (action) => {
		if(action =="Salir"){
			handExit()
			setOpenMenu(false)
		}else if(action =="Bictacoras"){
			history.push("/Bictacoras")
			setOpenMenu(false)
		}else if(action =="Tienda"){
			history.push(`/DetailStorerecepcion/${jwt.result.id_hotel}`)
			setOpenMenu(false)
		}
	  };
	
	  
	const handleItemClickInform = (action) => {
		
		if(action =="Camareria"){
			history.push("informecamareria")
			setOpenMenuInforme(false)
		}else if(action =="auditoría"){
			history.push("informeauditoria")
			setOpenMenuInforme(false)
		}else if(action =="sell"){
			history.push("informeroomtosell")
			setOpenMenuInforme(false)
		}else if(action =="tienda"){
			history.push(`/informeStore/${jwt.result.id_hotel}`)
			setOpenMenuInforme(false)
		}else if(action =="pendientes"){
			history.push(`/informeAccount`)
			setOpenMenuInforme(false)
		}else if(action =="consolidado"){
			history.push(`/informeconsolidado`)
			setOpenMenuInforme(false)
		}
		else if(action =="movimiento"){
			history.push(`/informeMovimiento`)
			setOpenMenuInforme(false)
		}
		else if(action =="contabilidadad"){
			history.push(`/InformeContabilidad`)
			setOpenMenuInforme(false)
		}else if(action =="dashboard"){
			history.push(`/dashboardstatistics`)
			setOpenMenuInforme(false)
		}else if(action =="informeAuditoriaMonth"){
			history.push(`/informeAuditoriaMonth`)
			setOpenMenuInforme(false)
		}
	  };
	
	  const handleItemClickReservation = (action) => {
		if(action =="Reservation"){
			history.push("/HomeTypehospedaje")
			setOpenReservation(false)
		}else if(action =="Room"){
			history.push("/RoomDetail")
			setOpenReservation(false)
		}else if(action =="Ocasional"){
			history.push(`/Ocacionales`)
			setOpenReservation(false)
		}
	  };

	 
	  const handleItemClickTypeRoom = (action) => {
			setRaiting(action?.toString())
			setTypeRoom(false)
	  };
	
  const handleChange = (event) => {
	updateLocalStorage(event)
    setIsChecked(event);
  };

	const {getPostByReservation,
		getRoomByReservation,
		getRoomFilterRoom,
		setUpdateFilterReservation
	} =useReservationActions()

	//const {filterRooms } =UseFilterRooms() 

	const {Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)


	const filtrarSearchingRoom = (terminoBusqueda) => {
		let resultadosBusquedaRoom = Room?.filter((elemento, index) => {
			// Filtrar por término de búsqueda
			const condicionBusqueda = elemento.id?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
										elemento.title?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
			
			return condicionBusqueda ;
		});
	
		return { resultadosBusquedaRoom };
	};

	
	const filtrarSearching = (terminoBusqueda) => {
		let resultadosBusqueda = Items?.filter((elemento, index) => {
			// Filtrar por término de búsqueda
			const condicionBusqueda = elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
										elemento.document?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
										elemento.Codigo_Reserva?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
										elemento.full_name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
			return condicionBusqueda ;
		});
	
		resultadosBusqueda = resultadosBusqueda.slice(0, 10);
		return { resultadosBusqueda };
	};


	 const fetchData =async() =>{
		try {
			await getPostByReservation({type:initialState})
			await getRoomByReservation()
			await getRoomFilterRoom()
			} catch (error) {
				console.error("Error fetching data:", error);
			} 
    }

	useEffect(() => {
		if (socket) {
			socket.on("sendNotification", async(data) => {
				fetchData()
				toast.success("Se creo una reserva")
		});	
		}
	}, [socket]);



	const FindIdHotel=(hotel) =>{
		return hotel.id_hotel == jwt.result.id_hotel
	}
	
	const hotel = iduser.find(FindIdHotel)

	useEffect(() =>{
        fetchData()
    },[isChecked,dispatch,isChecked,hotel])

	let countSeguro =0
	
	if(hotel?.segurohotelero ==0){
		 countSeguro=0
	}else{
		 countSeguro = parseInt(hotel?.valorseguro)
	}

	const onItemClick = (itemId, e, time) => {	
		if(initialState){
			return  window.open(`/DetailDashboard/${itemId}`, '');
		}else{
			history.push(`/DetailDashboard/${itemId}`, '')
		}
	 
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

	const hanclickReservation =() =>{
		history.push("/search")
	}
	
	const nowOne = new Date(2023, 4, 1, 3, 10);

	const {postUpdateDetailPointer} = useUpdateDetailPointerActions()
	const {postUpdateDetailPointerRange} = useUpdateDetailPounterRangeSliceActions()
			
	const {resultadosBusqueda} = filtrarSearching(username);
	const {resultadosBusquedaRoom} = filtrarSearchingRoom(raiting) 
	
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
						try {
							if (edge === 'left') {
								newReservation[ReservationIndex].start_time = time
								await postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro ,type:"subir"});
								setUpdateFilterReservation(newReservation)
								socket.emit("sendNotification",message);
								onClose()
							}else{
								newReservation[ReservationIndex].end_time = time
							    await postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro ,type:"bajar"})
								setUpdateFilterReservation(newReservation)
								socket.emit("sendNotification",message);
								onClose()
							}
						} catch (error) {
							toast.error("error servicio")
						}
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
		const group = resultadosBusquedaRoom[newGroupOrder];

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
							
							await postUpdateDetailPointerRange({desde,hasta,ID_Habitaciones,id:itemId,ID_estado_habiatcion})
							setUpdateFilterReservation(updatedItems)
							socket.emit("sendNotification",message);
						onClose() 
					}
		
				   const handClose =() =>{
					onClose() 
				   }
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirma cambio de habitacion?</h4>
							<button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
					  </div>         
					);
				  }
			})
		}
		handModalText()
	  }
	
	/*const handCLickWhatsapp =() =>{
		const link = document.createElement('a');
		link.href = "https://api.whatsapp.com/send/?phone=573195550001";
		link.setAttribute('target', '_blank');
		document.body.appendChild(link);
		setTimeout(() => {
		link.click();
		}, 100);
	}
*/


	const verticalLineClassNamesForTime = (timeStart, timeEnd) => {
		const today = moment().format('YYYY-MM-DD');//day today
		const fecha = moment(timeStart).format('YYYY-MM-DD');//day range of calendario
		return fecha === today ? ["today"] : ['holiday'];
	}


	const horizontalLine = (group) => {
		if (group?.ID_estado_habiatcion === 5) {
			return ["highlightCheckout"]; // Si el grupo cumple con la condición, aplica la clase "highlightCheckout"
		  } else {
			return []; // Si no cumple con la condición, no aplica ninguna clase
		  }
	};

	//const ResutlRoom = filterRooms(Room,raiting)


	const handClickAviableDay =() =>{
		setAvaibleDay(!avaibleDay)
		setOpenMenu(false)
		setOpenReservation(false)
		setOpenMenuInforme(false)
	}

	// Define las variables timeStart y timeEnd usando Moment.js
	const timeStart = moment(selectedDay).add(numMineDay, 'days').endOf('day');
	const timeEnd = moment(selectedDay).add(numberDay, 'days').endOf('day');

	const handSubmitNext =() =>{
		setNumberDay(numberDay + 1)
		setNumMineDay(numMineDay +1)
		setOpenMenu(false)
		setOpenReservation(false)
		setOpenMenuInforme(false)
	}

	const handSubmitBack =() =>{
		setNumberDay(numberDay - 1)
		setNumMineDay(numMineDay -1)
		setOpenMenu(false)
		setOpenReservation(false)
		setOpenMenuInforme(false)
	}

	const handSubmitReset =() =>{
		setSelectedDay(moment());
		setNumberDay(15);
		setNumMineDay(-5);
		setOpenMenu(false)
		setOpenReservation(false)
		setOpenMenuInforme(false)
	}

	const handleInputChange = (event) => {
		const { value } = event.target;

		setUsername(value);
		setShowContextMenu(value.trim() !== '');
		setRaiting(value.trim() !== "" ? raiting : "")
	};

	const handleCanvasClick = (groupId, time, event) => {
		const fecha1 = moment(time).format('YYYY/MM/DD');

		const handModalText =(e) =>{
			confirmAlert({
			  title: '',
			  
				  customUI: ({ onClose }) => {
					const handClick = async() =>{
						onClose()
					}
					const handClickNext =() =>{
						setDatedasrboard({group:groupId,desdeSinHora:fecha1})
						history.push("Createreservaction/00000")
						onClose()
					}
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirma Creacion de reserva ?</h4>
							<button  className="react-confirm-alert-button-group" onClick={handClickNext} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ handClick} >No</button>
					  </div>         
					);
				  }
			})
		}
		handModalText()
	};

	return (
		<>		
			<div> 
				<div className="Container-looking-for" >
					<div className="container-searching-for-reserrvation-logo">	
							{jwt.result.id_permissions ==2 ? 
							<div className="row-icon-searching" >
								<span>{jwt.result.hotel}</span>
							</div>:
							<StyledContextTyeHotel className="fade-in" valid={validHotel}  top={7} left={41.3} >
										<StyledMenuItem onClick={handClickValid}>
												<StyleSpanIcons   ></StyleSpanIcons> 
												<StyleTitleHotel> {hotel?.nombre} </StyleTitleHotel>
												<StyleSpan> <BsArrowDown   fontSize={20} /> </StyleSpan>
										</StyledMenuItem>
									{iduser?.map((option, index) => {
										return (
											<> {validHotel && 
												<StyledMenuItem
													onClick={(e) => handleItemClickHotel(option)}
													key={index}>
													<StyleSpanIcons   > <CiSearch  fontSize={20} /></StyleSpanIcons> 
													<StyleTitle> {option.nombre}   </StyleTitle>
												</StyledMenuItem>
												}
											</>
										)
									})}
							</StyledContextTyeHotel>
						}
						
						
					</div>


					<div className="container-searching-for-reserrvation" >
						
				
						<input  className="input-Searching-Reservation"  
								value={username}
								onChange={handleInputChange}
								placeholder="Buscar reservas, invitados y más" />
					</div>
				
					{showContextMenu && <StyledContextMenuSearch className="fade-in" top={67} left={41.3}>
						{resultadosBusqueda?.map((option, index) => {
							//const today = moment().format('YYYY-MM-DD');//day today
							return (
								<StyledMenuItem
								onClick={() => handSubmitSearch(option)}
									key={index}>
									<StyleSpanIcons   > <CiSearch  fontSize={20} /></StyleSpanIcons> 
									<StyleTitle> {option.name}    {option.last_name  }  </StyleTitle>
									<StyleSpan> in:  {option.Fecha_inicio},out: {option.Fecha_final}  </StyleSpan>
								</StyledMenuItem>
							)
						})}
					</StyledContextMenuSearch>}
					<div>
							<div className="container-searching-for-reserrvation-logo-notification">
										<IconAviableBill />
															<div className="row-icon-searching" >
									<IoNotificationsOutline fontSize={30} />
									</div>
									<div className="row-icon-searching" onClick={() => handleChange(!isChecked)} >
										<IoIosSwitch 
										color={`${initialState ?"#0070f0" : "black"}`}
										fontSize={30} 
										/>
									</div>
									<div className="row-icon-searching"  >
											{jwt.result.name}
									</div>	
									<div className="row-icon-searching" onClick={handClickConfiguration}  >
											<img src="https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202024-04-19%20at%2010.32.39%20PM.jpeg?raw=true" alt="" />
									</div>
								{jwt.result.id_permissions ==7 &&
									<div  className="row-icon-searching">	
										{OpenConfiguration &&  <StyledContextTyeHotelConfiguration className="fade-in" valid={validHotel} top={contextMenuPosition.top} left={contextMenuPosition.left} >
											<StyledMenuItemUser>
												<StyleSpanIcons   > <div className="row-icon-searching"><img src="https://github.com/rolandoto/image-pms/blob/main/WhatsApp%20Image%202024-04-19%20at%2010.32.39%20PM.jpeg?raw=true" alt="" /></div></StyleSpanIcons> 
												<StyleTitle>{jwt.result.name}  </StyleTitle>
											</StyledMenuItemUser>
											<StyledMenuItem onClick={() => HandClickUserUpdtateRoles(1)} > 
												<StyleSpanIcons   > <PiUserSwitchThin   fontSize={30} /></StyleSpanIcons> 
												<StyleTitle>Administrador</StyleTitle>
											</StyledMenuItem>
											<StyledMenuItem  onClick={() => HandClickUserUpdtateRoles(7)}  >
												<StyleSpanIcons   > <PiUserSwitchThin   fontSize={30} /></StyleSpanIcons> 
												<StyleTitle>Reservas</StyleTitle>
											</StyledMenuItem>
										</StyledContextTyeHotelConfiguration>}
									</div>
								}

						</div>
					</div>
				</div>
				{OpenMenu &&  <StyledContextMenu className="fade-in" top={contextMenuPosition.top} left={contextMenuPosition.left}>
					{contextMenuOptionsHeader.map((option, index) => (
						<StyledMenuItem
							onClick={() => handleItemClick(option.action)}
							key={index}>
							<StyleSpanIcons   >  {option.icon} </StyleSpanIcons> 
							<StyleSpan>{option.label} </StyleSpan>
						</StyledMenuItem>
					))}
					</StyledContextMenu>
				}
				
				{OpenMenuReservation &&  <StyledContextMenu className="fade-in" top={contextMenuPosition.top} left={contextMenuPosition.left}>
					{contextMenuOptionsReservation.map((option, index) => (
						<StyledMenuItem
							onClick={() => handleItemClickReservation(option.action)}
							key={index}>
							<StyleSpanIcons   >  {option.icon} </StyleSpanIcons> 
							<StyleSpan>{option.label} </StyleSpan>
						</StyledMenuItem>
					))}
					</StyledContextMenu>
				}

				{OpenMenuInforme &&
					<StyledContextMenu className="fade-in" top={contextMenuPosition.top} left={contextMenuPosition.left}>
						{contextMenuOptionsInform.map((option, index) => (
							<StyledMenuItem
								onClick={() => handleItemClickInform(option.action)}
								key={index}>
								<StyleSpanIcons   >  {option.icon} </StyleSpanIcons> 
								<StyleSpan>{option.label} </StyleSpan>
							</StyledMenuItem>
						))}
					</StyledContextMenu>
				}

				{OpenTypeRoom &&
					<StyledContextMenuTypeRoom className="fade-in" top={contextMenuPosition.top} left={contextMenuPosition.left} >
						<StyledMenuItemSelectedRoom  
							onClick={() => handleItemClickTypeRoom("")}
								>
									<CiSearch fontWeight={"500"}  fontSize={20} />
								<StyleSpan>Ver todas las habitaciones </StyleSpan>
							</StyledMenuItemSelectedRoom>
						{filterRoom.map((option, index) => {

							
							const result = option.nombre == raiting ? true : false

							return (
							<StyledMenuItemSelectedRoom  
							valid={result}
								onClick={() => handleItemClickTypeRoom(option.nombre)}
								key={index}>
								<StyleSpanIcons   > <CiSearch fontWeight={"500"}  fontSize={20} /></StyleSpanIcons> 
								<StyleSpan>{option.nombre} </StyleSpan>
							</StyledMenuItemSelectedRoom>
							)
						})}
					</StyledContextMenuTypeRoom>
				}
			<Timeline
				//onCanvasClick={handleCanvasClick}
				groupRenderer={renderGroup}
				groups={resultadosBusquedaRoom}
				items={Items}
				horizontalLineClassNamesForGroup={horizontalLine}
				verticalLineClassNamesForTime={verticalLineClassNamesForTime}
				onItemResize={handleItemResize}
				canMove
				defaultTimeStart={moment().startOf("day").add(-1, "day")}
				defaultTimeEnd={moment().startOf("day").add(18, "day")}
				visibleTimeEnd={timeEnd}
				visibleTimeStart={timeStart}
				onItemMove={handleItemMove}	
				resizeDetector={containerResizeDetector}								
				itemHeightRatio={0.9}                                                             
				lineHeight={28.4}
				sidebarWidth={225}
				showCursorLine={true}
				itemRenderer={  ItemRenderer}
				onItemClick={onItemClick}
				now={nowOne}
				canResize={"both"}
				itemStyle={{ background: "black" }}
				stackItems
				>
				<TimelineHeaders className="list-booking-sticky"   >	
				<SidebarHeader >
					{({ getRootProps }) => {
					return( 
					<div style={{
								
								justifyContent:"center",
								width:"222px",
							flexDirection:"column"}}  
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
					}
				})}>
					<div className="row-Container-menu">
							
					{avaibleDay ? <>   <input 	className="desde-detail-searching" 
										type="date" 
										placeholder="Buscar fecha" 
										value={selectedDay.format('YYYY-MM-DD')} onChange={(e) => setSelectedDay(moment(e.target.value))}/>
								<div className="Row-bar"  >
										<HiArrowUturnLeft fontSize={18}  onClick={handClickAviableDay} />
										</div>
								</>
					: <><div className="Row-bar"  onClick={(e) => handClickOpenMenu(e) } >
								<VscMenu  fontSize={18}  />
						</div>
						<div className="Row-bar" onClick={handClickAviableDay}>
							<IoCalendarOutline   fontSize={18}   />
						</div>
						
						<div className="Row-bar" onClick={hanclickReservation}>
							<IoSearchOutline  fontSize={18}  />
						</div>
						<div className="Row-bar" onClick={handClickOpenMenuInforme}>
									<BsMenuButtonWide  fontSize={18}  color="black"     />
						</div>
						<div className="Row-bar"  onClick={handClickOpentypeRoom}>
							<RxDropdownMenu   fontSize={18}   />
						</div>

						<div className="Row-bar-reservation" onClick={handClickOpenMenuReservation} >
							<GoPlus   fontSize={18}  color="white"   />
						</div>
						</>
					}							
					</div>
				</div>

				<div {...getRootProps({
							style:{
								borderRadius:"8px",
								textAlign:"center",
								display:"flex",
								justifyContent:"center",
								padding:'8px',
								width:"208px ",
								height: "32px",
							}
						})}>
						<div className="row-Container-menu">
							<div className="Row-bar" onClick={handSubmitBack}>
								<button >
										<HiArrowLeft fontSize={18}   />
								</button>
							</div>
							<div className="Row-bar row-width"   onClick={handSubmitReset}>
								<button><span>Hoy</span> </button>
							</div>
							<div className="Row-bar"  onClick={handSubmitNext} >
							<button  >
							<HiArrowSmallRight  fontSize={18}  />
							</button>
							</div>
						</div>
					</div>
				</div>
			)}}
			</SidebarHeader>
			<DateHeader unit="primaryHeader" />
					
					<DateHeader
						unit="day"
						labelFormat="dddd"
						
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
				<CursorMarker/>
  
						
			</TimelineMarkers>
			</Timeline>
			<Footer 	
					hotel={hotel} 
					ocupied={<VscSymbolEvent fontSize={20}/>}
					reservas={<BsBell fontSize={20} color="white" />}
					dollar={<CiBadgeDollar fontSize={20} />} />
					<div className="rightMenu-one">
					<button className=" toggleMenu   ocultar" > <AiOutlineCaretLeft fontSize={50} color="black" /></button>
						<h1>Detalle reserva</h1>
					</div> 
			</div>
		</>
	);
}
export default Dashboard;