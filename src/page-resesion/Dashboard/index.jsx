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
import {  Spacer, Switch} from '@nextui-org/react';
import Footer from "../../component/Footer/Footer";
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
import { AiOutlineCaretLeft } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";
import { VscMenu } from "react-icons/vsc";
import { HiArrowLeft,HiArrowSmallRight,HiArrowUturnLeft   } from "react-icons/hi2";
import {contextMenuOptionsHeader, contextMenuOptionsInform, contextMenuOptionsReservation } from "../../stylecomponent/Icons";
import { StyleSpan, StyleSpanIcons, StyleTitle, StyleTitleHotel, StyledContextMenu, StyledContextMenuSearch, StyledContextMenuTypeRoom, StyledContextTyeHotel, StyledMenuItem, StyledMenuItemSelectedRoom } from "../../stylecomponent/StyleMenu";
import { CiSearch } from "react-icons/ci";
import { BsMenuButtonWide } from "react-icons/bs";
import { SocketRoute } from "../../config";
import { RxDropdownMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxSwitch } from "react-icons/rx";
import { BsArrowDown } from "react-icons/bs";
import UseUsers from "../../hooks/UseUser";
import confetti from "canvas-confetti";
import Preloading from "../../component/Preloading";



//https://railway.grupo-hoteles.com
const socket = io.connect(`${SocketRoute.serverRoute}`);


const Dashboard = () => {
	
	const currentDate = new moment();
	const {jwt,setJwt,isOpen, setIsOpen} =useContext(AutoProvider)
	console.log(jwt)
	const history = useHistory()
	const timelineRef = useRef(null);
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

	const { login,isError,isLogin} =UseUsers()
	const { Img,loading} = Preloading({isLogin})
    
 	/*const updateLocalStorage =(state) =>{
		window.localStorage.setItem("jwt",JSON.stringify(state))
	}*/



	const handClickValid =() =>{
		setValidHotel(!validHotel)
	}

	const handleItemClickHotel =(action) =>{
		login({username:jwt.result.username,password:"sassadas",hotel:action.id_hotel})
		setValidHotel(!validHotel)
		confetti({
			zIndex: 999,
			particleCount: 100,
			spread: 70,
			origin: { x: 0.50, y: 0.8 }
		});
	}



	const handClickOpentypeRoom =() =>{
		setContextMenuPosition({top:125, left: 168})
		setTypeRoom(!OpenTypeRoom)
		setOpenMenu(false)
		setOpenMenuInforme(false)
		setOpenReservation(false)
	}

	const handClickOpenMenu =() =>{
		setContextMenuPosition({top:125, left: 28})
		setOpenMenu(!OpenMenu)
		setOpenMenuInforme(false)
		setOpenReservation(false)
		setTypeRoom(false)
	}

	const handClickOpenMenuInforme =() =>{
		setOpenMenuInforme(!OpenMenuInforme)
		setOpenMenu(false)
		setOpenReservation(false)
		setTypeRoom(false)
		setContextMenuPosition({top:125, left: 130})
	}

	const handClickOpenMenuReservation =() =>{
		setOpenReservation(!OpenMenuReservation)
		setOpenMenu(false)
		setOpenMenuInforme(false)
		setTypeRoom(false)
		setContextMenuPosition({top:125, left: 205})
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
			await getPostByReservation({type:isChecked})
			await getRoomByReservation()
			await getRoomFilterRoom()
			} catch (error) {
				console.error("Error fetching data:", error);
				console.log("error")
			}
        
    }

	const FindIdHotel=(hotel) =>{
		return hotel.id_hotel == jwt.result.id_hotel
	}
	

	const hotel = iduser.find(FindIdHotel)

	useEffect(() =>{
        fetchData()
    },[dispatch,isChecked,hotel])

	

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
		const group = resultadosBusquedaRoom[newGroupOrder];
		console.log(group)
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

	let isFetchingData = true;

	socket.on("sendNotification", async(data) => {
		if (isFetchingData) {
		  isFetchingData = false;
		  toast.custom((t) => (
			<>
				<footer class="nav-notifiacation">
							<div className="row-notification">
								<h5>Nuevas Reservas</h5>
							</div>
				</footer>
			</>
		  ))
		}
	});

	const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  	const handleItemSelect = (itemId, e, time) => {

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
		console.log({"lksadkasd":value})
		setUsername(value);
		setShowContextMenu(value.trim() !== '');
		setRaiting(value.trim() !== "" ? raiting : "")
	  };
	

	return (
		<>		
			<div> 
			
				<div className="container-button">
				</div>
				<div className="Container-looking-for" >
					<div className="container-searching-for-reserrvation-logo">	

							{jwt.result.id_permissions ==2 ? 
							<div className="row-icon-searching" >
								<span>{jwt.result.hotel}</span>
							</div> :  

							<StyledContextTyeHotel className="fade-in" valid={validHotel}  top={22} left={41.3} >
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
					
					{showContextMenu && <StyledContextMenuSearch className="fade-in" top={85} left={41.3}>
						{resultadosBusqueda?.map((option, index) => {
							console.log(option)
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
						
						
								
								<div className="row-icon-searching" >
								<IoNotificationsOutline fontSize={30} />
								</div>

								<div className="row-icon-searching" onClick={handleChange} >
									<RxSwitch
									fontSize={30} 
									/>
								</div>

								<div className="row-icon-searching" onClick={handleChange} >
										{jwt.result.name}
								</div>	

								
								
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
				showCursorLine
				sidebarContent={<div>Above The Left</div>}
				itemRenderer={  ItemRenderer}
				onItemClick={(itemId, e, time) =>{
					onItemClick(itemId, e, time)
				}}
				now={nowOne}
				canResize={"both"}
				itemStyle={{ background: "black" }}
				onItemSelect={handleItemSelect}
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
			<CursorMarker />
			
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