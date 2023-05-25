import React, { Component, useRef } from "react";
import moment from "moment";
import "moment/locale/es";
import Timeline,{
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from "react-calendar-timeline";
import { ServiceReservas } from "./dummy_data";
import 'react-calendar-timeline/lib/Timeline.css'
import "./BookingsTimeline.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AutoProvider  from "../../privateRoute/AutoProvider";
import "./index.css"
import { useSelector } from "react-redux";
import { selectDashboard } from "../../reducers/dashboardReducers";
import useDashboardAction from "../../action/useDashboardAction";
import DashboardModal from "./DashboardModal";
import { useHistory, useParams } from "react-router-dom";
import CardStore from "../../component/DetailStore/CardStore";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import ModalSate from "../../organisms/Modals/State";
import ModalCleanLine from "../../organisms/Modals/Cleanline";
import { selectDashboardChecking } from "../../reducers/dashboardCheckingReducer";
import useDashboardCheckingAction from "../../action/useDashboardCheckingAction";
import Checking from "./Checking";
import { VscVerified,VscSymbolEvent ,VscSignOut,VscSearch,VscRecord} from "react-icons/vsc";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { config } from "../../config";
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { fontWeight } from "@mui/system";
import  {Link} from "react-router-dom"
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import ServiceAllTotalReservation from "../../service/ServiceAllTotalReservation";
import ModalBlock from "../../organisms/Modals/Block";
import { confirmAlert } from "react-confirm-alert";
import { Button, Modal } from 'react-bootstrap';
import { GiBroom } from "react-icons/gi";
import CustomNav from "../../Ui/CustomNav";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { CiCircleCheck } from "react-icons/ci";
import { BsBucket ,BsCalendarCheck,BsCheckCircle,BsBell} from "react-icons/bs";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";

const GroupRows =({group,color,estado,iconState,letra}) =>{

	return (
		<div   style={{ backgroundColor: color, color:letra }} className="flex-romm-grup" >
			<div>
				{iconState}
			</div>
			<div>
				<span> {group} {estado} </span>
			</div>
		</div>
	)
}


const Info = styled(ReactTooltip)`
  max-width: 500px  !important;
  padding-top: 9px  !important;
  z-index: 0 !important;
  background: gray;
`;

const InfoMessage = styled.div`
  font: Roboto  !important;
  font-size: 13px  !important ;
  line-height: 1.4  !important;
  text-align: left  !important;
  z-index: 0 !important;
`;
  
const useCountRoom =({id}) =>{
	const [count,setCount] =useState()

	useEffect(() =>{
		fetch(`${config.serverRoute}/api/resecion/huespecount/${13}`)
		.then(resp => resp.json())
		.then(data => setCount(data.query))
	},[setCount])

	return {count}
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const Dashboard = (props) => {


	const {id} = useParams()
	const [open, setOpen] = useState(true);
	const [reservation,setReservas] = useState()
	const [state,setSate] =useState()
	const [modalState,setModalState] =useState(false)
	const [cleanline,setcleanline] =useState(false)
	const [block,setBlock] =useState(false)
	const [lookinfor,setLookingfor] =useState()
	const {jwt,update} =useContext(AutoProvider)
	const {toggleOpenDashBoard,toggleCloseDashboard} = useDashboardAction()
	const {toggleOpenDashboardChecking,toggleCloseDashboardChecking}  = useDashboardCheckingAction()
	const {dashboardVisible} = useSelector(selectDashboard)
	const {checkingDasboardVisible} = useSelector(selectDashboardChecking)
	const history = useHistory()
	const {count} =useCountRoom({id:jwt.result.id_hotel})
	const [loadingSkeleto,setLoadingSkeleto] =useState(true)
	const [hoveredItemId, setHoveredItemId] = useState(null);
	const  now = moment().format("YYYY-MM-DD");

	const timelineRef = useRef(null);
	const  [totalDay ,setTotalDay] =useState()

	const [selectedItem, setSelectedItem] = useState(null);
	const [isPopperOpen, setIsPopperOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	
	const handleItemSelect = (itemId, e, time) => {
		setSelectedItem(itemId);
		setIsPopperOpen(true);
	  };
	
	  const handleContextMenu = (e, timelineProps) => {
		e.preventDefault();
		const { itemId } = timelineProps;
	
		setSelectedItem(itemId);
		setIsPopperOpen(true);
	  };
	
	  const handlePopperClose = () => {
		setSelectedItem(null);
		setIsPopperOpen(false);
	  };
	
	  const handleModalClose = () => {
		setIsModalOpen(false);
	  };
	
	  const handleModalOpen = () => {
		setIsModalOpen(true);
		setIsPopperOpen(false);
	  };


	
	useEffect(() =>{
		ServiceAllTotalReservation({fecha:now,id:jwt.result.id_hotel}).then(index =>{
			setTotalDay(index)
		}).catch(e =>{
			console.log(e)
		})
	},[])

	const Skele =() =>{
		return (
		   <Stack spacing={1} className="App-new-skeleto">
			 <ul className="container-flex">
			   <Skeleton
				 variant="text"
				 width={250}
				 height={80}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={250}
				 height={80}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={250}
				 height={80}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={200}
				 height={80}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={250}
				 height={80}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={250}
				 height={80}
				 className="border-sekeleton"
			   />
			 </ul>
		  
			 <ul className="container-flex">
			 <Skeleton variant="rectangular" width={1494} height={600} />
			 </ul>
			 <ul className="container-flex">
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={365}
				 height={210}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={365}
				 height={210}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={365}
				 height={210}
				 className="border-sekeleton"
			   />
			   <Skeleton
				 variant="text"
				 sx={{ fontSize: "1rem" }}
				 width={365}
				 height={210}
				 className="border-sekeleton"
			   />
			 </ul>
		 </Stack>
		)
   }
	
	const handleOpen = () =>{
		setOpen(true);
	} 
	const handleClose = () => setOpen(false);

	const bookings = [
		{
		id: 1,
		group: 3,
		title:`Reservas 365`,
		start_time: new Date(`2022-09-${8+1}`),
		end_time: new Date(`2022-09-${10+1}`),
		state:50
		},
		{
		id: 2,
		group: 1,
		title: "Reservas  3065",
		start_time: moment().add(-3, "day"),
		end_time: moment().add(1, "day"),
		state:3
		},
		{
		id: 3,
		group: 5,
		title: "Reservas  3065",
		start_time: moment().add(2, "day"),
		end_time: moment().add(4, "day"),
		state:2,
		},
	];

	const handClickState =() =>{
		setModalState(true)
	}

	const handClickCloseState =() =>{
		setModalState(false)
	}

	const handClikCleanline =() =>{
		setcleanline(true)
		setModalState(false)
	}

	const handBlock =() =>{
		setBlock(true)
	}

	const hanClickCloseCleanline =()=>{
		setcleanline(false)
	}

	const handCloseBlock =() =>{
		setBlock(false)
	}
  
	const { onCanvasClickParentUpdate } = props;

	const currentDate = new moment();

	const isWeekendDay = (intervalContext, data) => {
		if (data.isMonth) {
			return false;
		}
		const day = intervalContext.interval.startTime.day();
		return day === 6 || day === 0; // Saturday or Sunday
	}

	const isCurrentDay = (intervalContext, data) => {
		return (
			!data.isMonth &&
			intervalContext.interval.startTime.isSame(data.currentDate, "day")
		);
	}

	const onItemClick = (itemId, e, time, onItemSelectParentUpdate) => {	
		history.push(`/DetailDashboard/${itemId}`)
	}

	const [prueba,setPrueba] =useState(false)

	const onItemDoubleclik =(itemId, e, time, onItemSelectParentUpdate, hand) =>{

		return (
			<div>
			</div>
		)
	}

	const [showInfo, setShowInfo] = useState(false);

	const itemRenderer = ({ item, itemContext, getItemProps }) => {

		const handleMouseEnter = () => {
		  setShowInfo(true);
		};
	  
		const handleMouseLeave = () => {
		  setShowInfo(false);
		};

		let colorWords 
		let iconState

		let valo =false
		let title 

		let color;
		if (item.state === 0) {
		  color = '#FF9990';
		  colorWords="black"
		  iconState = <BsBell  fontSize={15} />
		  title=itemContext.title
		} else if (item.state === 1) {
		  color = '#E9C9FF';
		  colorWords="black"
		  iconState= <BsBucket  fontSize={15}	  /> 
		  title=itemContext.title
		} else if (item.state === 2) {
		  color = '#747171';
		  colorWords="white"
		  title=itemContext.title
		} else if (item.state === 3) {
		  color = 'rgb(103 183 90)';
		  colorWords="white"
		  iconState= <VscSymbolEvent  fontSize={15}	  /> 
		  title=itemContext.title
		} else if (item.state === 4) {
		  color = '#0DC034';
		  colorWords="black"
		  title=itemContext.title
		}else if (item.state === 5) {
			color = '#e27382';
			colorWords="black"
			title="Aseo"
		  }
		  else if (item.state === 6) {
			color = '#82d8cd';
			colorWords="black"
			title=itemContext.title
			iconState=<BsCheckCircle  fontSize={15} />
		  }

		const key = `${item.id}_${item.id}_schedule`;

		const hanEnter =() => {
			valo= true	
		}

		return (
			
		  <div 
		  
		  data-for={key} data-tip
			{...getItemProps({
			  style: {
				display: 'flex',
				alignItems: 'center',
				background: color,
				border: '',
				borderRadius: '4px',
				padding: '8px',
				color: colorWords,
				position:"relative",
			  },
			})}
			onMouseEnter={hanEnter}
		  >
			<div
			  className="itemModal"
			  
			></div>
	  
			<div
			  style={{
				position: 'sticky',
				left: '0',
				display: 'inline-block',
				overflow: 'hidden',
				padding: '0 1x',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
			  }}
			>
			   <div className="icon-state-reservation" >
			   		<span className="margin-icon-state" >{iconState}</span>
			  		<span>{title}</span>
			   </div>

			 

				<div>
						<Info  	place="top" 
								variant="info" 
								id={key}  >
							<InfoMessage>
								<div className="go" >
									<ul >
									<li className="color-white " >Numero Habitacion :{item.Num_Room}</li>
									<li className="color-white " >Codigo reserva :{item.Codigo_Reserva}</li>
									<li className="color-white " >Huesped: {item.full_name}</li>
									<li className="color-white " >Check in :{item.Fecha_inicio}</li>
									<li className="color-white " >Check out :{item.Fecha_final}</li>
									<li className="color-white " >Noches :{item.Noches}</li>
									<li className="color-white " >Adultos :{item.Adultos}</li>
									<li className="color-white " >Niños :{item.Ninos}</li>
									</ul>
								</div>
							</InfoMessage>
						</Info>
				</div>
			</div>
		</div>
		);
	  };


	const intervalRendererdayNum= ({ getIntervalProps, intervalContext ,data }) => {


		const label = intervalContext.intervalText;
		const currentDate = moment().startOf("day");
		const isToday = moment(label, "D").isSame(currentDate, "day");

		return (
			<div
			{...getIntervalProps()}
			className={`day-num ${isToday ? "today" : ""}   rct-dateHeader ${
			data.isMonth ? "rct-dateHeader-primary" : ""
			}`}

			onClick={() => {
				return false;
			}}>
			<span
			style={{
				position:"absolute",
				margin: "auto",
				padding: "0 50rem",
				textTransform: "capitalize",
				color: "#b3aca7",
    			left: "48%;",
				fontWeight:"100",
				fontSize:"12px",
				zIndex:1
			}}
			
			>
			{label}
			</span>
		</div>
		);
			}
			const intervalRendererday = ({ getIntervalProps, intervalContext, data }) => {
				const label = intervalContext.intervalText;
				const currentDate = moment().startOf("day");
				const isToday = moment(label, "dddd D").isSame(currentDate, "day");
				const isThursday = moment(label, "dddd D").isoWeekday()  // 4 es el código ISO para el jueves
				const isFirstThursdayOfMonth = moment(label, "dddd D").date()  && isThursday; // Solo renderizar el primer jueves del mes

				const currentDay = moment().format('dddd');


				const acum = []

				if(isToday ==true){
					acum.push(0)
				}

				let acumlitor = 0

				if(acum.length ==1){
					acumlitor++;
				}

				
				return (
				  <div
					{...getIntervalProps()}
					className={`day-num ${acum.length ==1 ? "todayOne" : ""} rct-dateHeader ${
					  data.isMonth ? "rct-dateHeader-primary" : ""
					}`}
				  >
					<span
					  style={{
						position: "relative",
						margin: "auto",
						padding: "0 50rem",
						textTransform: "capitalize",
						color: "#b3aca7",
						fontWeight: "100",
						fontSize: "13px",
						textAlign: "center",
						left: "4px",
						top: "-9px",
						zIndex: 1,
					  }}
					>
					  {label}
					</span>
				  </div>
				);
			  };
			  
	const intervalRenderer = ({ intervalContext, getIntervalProps, data }) => {
		return (
		<div
			{...getIntervalProps()}
			className={`rct-dateHeader ${
			data.isMonth ? "rct-dateHeader-primary" : ""
			}`}
			onClick={() => {
				return false;
			}}>
			<span
			style={{
				position:"absolute",
				margin: "auto",
				padding: "0 10rem",
				textTransform: "capitalize",
				color: "#b3aca7",
    			left: "48%;",
				fontWeight:"100",
				zIndex:1
			}}
			>
			{intervalContext.intervalText}
			</span>
		</div>
		);
	}
	
	const [room,setRoom] = useState()
	const [raiting,setRaiting]= useState('')
	const [pruebareservas,setpruebareservas] =useState()

	useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])

	console.log({"room":room})

	const [search,setSearch] =useState([])

	const filtrar=(terminoBusqueda)=>{
		let resultadosBusqueda= state?.filter((elemento,index)=>{
			if(elemento?.ID_Tipo_habitaciones?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
			 || elemento?.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
				return elemento;
			}
		});
		setSearch(resultadosBusqueda);
		}
		
	const filtrarprueba=(terminoBusqueda)=>{
		let resultadosBusqueda= reservation?.filter((elemento,index)=>{
			if(elemento?.ID_Tipo_habitaciones?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
				|| elemento?.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
				return elemento;
			}
		});
		setpruebareservas(resultadosBusqueda);
		}
		
	const handRaiting =(e)=>{
		setRaiting(e.target.value)
		filtrar(e.target.value)
	}

	const handLookingfor=(e) =>{
		setLookingfor(e.target.value)
		filtrarprueba(e.target.value)
	}

	const [showModal, setShowModal] = useState(false);
  	const [contextItem, setContextItem] = useState(null);

	const handleCanvasContextMenu = (groupId, time, e) => {
		e.preventDefault();
		const item = pruebareservas.find((item) => item.id === contextItem);
		setContextItem(item);
		setShowModal(true);
	};

  const handleCloseModal = () => {
    setShowModal(false);
  };

	useEffect(() =>{
		fetch(`${config.serverRoute}/api/resecion/getroomsresecion/${jwt.result.id_hotel}`)
		.then(resp => resp.json())
		.then(data => {
			if(!data.ok){
				console.log("true")
			}else{
				console.log(data)
				const roomDefinid=[]
				for(let i =0;i<data?.query?.length;i++){	
					for(let e =0;e<data?.query?.length;e++){
						const to= parseInt(data?.query[i]?.ID_Tipo_habitaciones)
						const lo =(room[e]?.id_tipoHabitacion) 
						if(to ==lo ){
							roomDefinid.push({
								title:`${data?.query[i]?.title} ${room[e]?.nombre}   `,
								id:data?.query[i]?.id,
								ID_Tipo_estados:data?.query[i]?.ID_Tipo_estados,
								ID_Tipo_habitaciones:data?.query[i]?.ID_Tipo_habitaciones,
								ID_estado_habiatcion:data?.query[i].ID_estado_habitacion
							})
						}else{
							console.log("error")
						}
					}
				}
				setSate(roomDefinid)
				setSearch(roomDefinid)
			}
		})
	},[room,update])

	useEffect(() =>{
		ServiceReservas({id:jwt.result.id_hotel}).then(index=> {
			setReservas(index)
			
			setpruebareservas(index)
		})
	},[setSearch,update])
	
	if(search?.length ==0) {
		setSearch(state)
	}

	const handClickReservaction =() =>{
		history.push("/Createreservaction")
	}

	const hanclickReservation =() =>{
		history.push("/search")
	}

	const handChecking =() =>{
		history.push("/checking")
	}	

	const handRoomDetail =() =>{
		history.push("/RoomDetail")
	}

	setTimeout(() =>{
		setLoadingSkeleto(false)
	},500)

	const handContext =(action, item, time, resizeEdge) =>{
			if (time < new Date().getTime()) {
			  var newTime = Math.ceil(new Date().getTime() / (15*60*1000)) * (15*60*1000);
			  return newTime;
			}
			return time
	}

	/**
	 * 
	 * 
		{
		id: 2,
		name:"Informe mantenimiento"
		},
		{
		id: 3,
		name:"Informe tienda "
		},{
		id: 4,
		name:"Informe gerencia"
		},
		,,{
		id: 7,
		name:"Informe ventas"
		},{
		id: 8,
		name:"Informe facturación"
		},{
		id: 9,
		name:"Informe Camareria"
		},
		{
		id: 10,
		name:"Informe  caja menor"
		},
		{
		id: 11,
		name:"Informe caja mantenimiento"
		}
	 * 
	 */

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
		setInformes(e.target.value)	
	}

	const handChangeTypeRoomOne =(e) =>{
		confirmAlert({
		  title: '',
		  message: 'Desea cambiar el estado de la habitacion a:',
		  
		  buttons: [
			{
			  label: 'Bloquear',
			  onClick:() =>handBlock()
			},
			{
			  label: 'Asear',
			  onClick: () => handClikCleanline()
			},
		  ]
		});
	  }
	  
	useEffect(() =>{
		if(stateInformes ==5){
			return history.push("/informeauditoria")
		}
		if(stateInformes ==1){
			return history.push("/informecamareria")
		}
		if(stateInformes ==6){
			return history.push("/informeroomtosell")
		}
		if(stateInformes ==7){
			return history.push(`/informeStore/${jwt.result.id_hotel}`)
		}
		if(stateInformes ==8){
			return history.push(`/informeAccount`)
		}
		if(stateInformes ==9){
			return history.push(`/informeconsolidado`)
		}
		if(stateInformes ==10){
			return history.push(`/informeMovimiento`)
		}
	},[stateInformes,setInformes])

	const [hoveredItem, setHoveredItem] = useState(null);

	const handleItemHover = (itemId, time, e) => {
		setHoveredItem(itemId);
		
	  };

  // definir estado para almacenar la fecha actual
  	const [currentDat, setCurrentDate] = useState(new Date());

	  const handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
		const newDate = new Date(visibleTimeStart);
		if (newDate.getMonth() !== currentDat.getMonth()) {
		  updateScrollCanvas(currentDat, currentDat);
		} else {
		  setCurrentDate(newDate);
		}
	  };


	  const nowOne = new Date(2023, 4, 1, 3, 10);


	/**
	 *  <ul className="border-icon"  >
					<div className="state-type" >
						<li  className="imbox-color"> </li>
						<span className="margin-let-rig"  >Check out</span>
					</div>
					
					<div className="state-type" >
						<li  className="imbox-color-one"> </li>
						<span className="margin-let-rig" >Reserva</span>
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
						<li  className="imbox-color-five"> </li>
						<span className="margin-let-rig" >Bloqueada</span>
					</div>

				</ul>
	 * 
	 */
	const renderGroup = ({ group }) => {

		const rows= []



		if(group.ID_estado_habiatcion == 6){
			rows.push(
				<GroupRows 	
					color="#82d8cd"
					group={group.title} 
					key={group.id}
					estado={"Limpia"} 
					letra="black"
					iconState={<BsCheckCircle  fontSize={15} />}/>
			)
		}if(group.ID_estado_habiatcion == 5){
			rows.push(
				<GroupRows 	
					color="#e27382"
					group={"Aseo"} 
					key={group.id} 
					letra="white" 
					iconState={< GiBroom fontSize={15}  />}
					/>
			)
		}
		if(group.ID_estado_habiatcion == 2){
			rows.push(
				<GroupRows 	
					color="#747171"
					group={"Bloqueada"}
					letra="white" 
					key={group.id} 

					iconState={<IoBanOutline  color="white"  fontSize={15}/>}
					/>
			)
		}if(group.ID_estado_habiatcion == 3){
			rows.push(
				<GroupRows 	
					color="rgb(103 183 90)"
					group={"Ocupada"}
					letra="white" 
					key={group.id} 

					iconState={<VscSymbolEvent  fontSize={15}/> }
					/>
			)
		}

			rows.push(
				<GroupRows 	
					color="white"
					iconState={<IoBedOutline fontSize={15}  />}
					group={group.title} 
					key={group.id} />
			)

		return (
			<>
				{rows}
			</>
	);
	
};
				

	if(loadingSkeleto) return Skele()
	if(!pruebareservas) return null
	if(!search)  return null
	if(!state)  return null
	if(!reservation)return null
	if(!totalDay) return null
	return (
		<div ref={timelineRef} > 

			<div className="top-index-home"></div>
		 
			<div className="container-calender">
			
				<div className="container-button" >

				<div>
				
			</div>
					<button className='button-reservas' onClick={handClickReservaction} ><div className="flex-index-reservation" ><VscVerified fontSize={18} className="flex-contant" color="white"  /><span>Crear reserva</span></div></button>
					<button className='button-reservas-type-one-two' onClick={handChecking} ><div className="flex-index-reservation"><VscSymbolEvent fontSize={18} className="flex-contan"  color="white" /><span>Wolking   </span> <span className="pay-checkout-pago-pagado-One-two">Nuevo</span> </div></button>
					<button className='button-reservas-type-one-one' onClick={handRoomDetail} ><div className="flex-index-reservation" ><VscSignOut className="flex-contan"  color="white" fontSize={18}     /><span>Ver habitaciones </span> </div> </button>
					
					<button className='button-reservas-type' onClick={handChangeTypeRoomOne}>
					<div className="flex-index-reservation" ><VscRecord className="flex-contan-one" color="white"  fontSize={18} /><span>Estados</span></div></button>
					
					<select  onChange={handClickInformAuditoria} value={stateInformes}					
							className='button-reservas-type-one button-reservas-type-space button-reservas-type-one-two-two'>
								
							<option   className="opo-room"  > Informe</option>
							{Informes?.map(category =>(
													<option 
													className="opo-room"
													value={category.id	}   
													key={category.name}>
													{category.name}
												</option>
							 										))}
						</select>
				
					<select onChange={handRaiting}  
													value={raiting} 
													className='button-reservas-type-one button-reservas-type-space  button-reservas-type-one-two-two button-reservas-type-space-One-One' >
													<option  className="opo-room" >  Ver habitaciones</option>
													<option  className="opo-room" >Todas las Habitaciones</option>
													
												{room?.map(category =>(
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
					
					<button className='button-reservas-type-one '   onClick={hanclickReservation} >
							<div className="flex-index-reservation-one">
									<BsCalendarCheck className="flex-contan-one"  color="grey" fontSize={18} /> <span >Reservas</span>
							</div> 
					</button>	
				</div>
			</div>
			
			<ModalSate 	
						handChangeTypeRoomOne={handChangeTypeRoomOne}
						modalState={modalState} 
						handClickCloseState={handClickCloseState} 
						handClikCleanline={handClikCleanline}
						handBlock={handBlock} />

			<ModalCleanLine 	
							cleanline={cleanline} 
							hanClickCloseCleanline={hanClickCloseCleanline}  />		
			
			<ModalBlock    	block={block}  
							handCloseBlock={handCloseBlock}   />			
			<Checking  
						loading={checkingDasboardVisible}  
						toggleCloseDashboardChecking={toggleCloseDashboardChecking}  />
			
			<Timeline
				 groupRenderer={renderGroup}
				groups={search}
				items={ pruebareservas}
				onItemSelect={handleItemSelect}
				onContextMenu={handleContextMenu}
				defaultTimeStart={moment().startOf("day").add(-3, "day")}
				defaultTimeEnd={moment().startOf("day").add(14, "day")}
				stackItems
				itemHeightRatio={0.9}                                                             
				lineHeight={30}
				sidebarWidth={200}
				itemRenderer={  itemRenderer}
				onItemClick={(itemId, e, time) => onItemClick(itemId, e, time)}
				now={nowOne}
				canMove={true}>

					
				<TimelineHeaders className="list-booking-sticky"  >
					<SidebarHeader />
					<DateHeader
						unit="MONTH"
						labelFormat="MMMM"
						headerData={{ isMonth: false}}
						defaultTimeStart={moment().startOf("day")}
						defaultTimeEnd={moment().startOf("day")}
						intervalRenderer={intervalRenderer}
					/>
					<DateHeader
						unit="day"
						labelFormat="D"
						headerData={{ isMonth: false, currentDate }}
						intervalRenderer={intervalRendererdayNum}
						/>
					<DateHeader
						unit="day"
						labelFormat="dddd"
						defaultTimeStart={moment().startOf("day")}
						defaultTimeEnd={moment().startOf("day")}
						headerData={{ isMonth: false, currentDate, }}
						intervalRenderer={intervalRendererday}
					/>
				</TimelineHeaders>
				<TimelineMarkers>
          
          <CursorMarker />
        </TimelineMarkers>
		</Timeline>

		<CardStore totalday={totalDay} />
		</div>
	);

}

export default Dashboard;