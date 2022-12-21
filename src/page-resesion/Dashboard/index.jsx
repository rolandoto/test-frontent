import React, { Component } from "react";
import moment from "moment";
import "moment/locale/sl";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
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
import { useHistory } from "react-router-dom";
import CardStore from "../../component/DetailStore/CardStore";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import ModalSate from "../../organisms/Modals/State";
import ModalCleanLine from "../../organisms/Modals/Cleanline";
import { selectDashboardChecking } from "../../reducers/dashboardCheckingReducer";
import useDashboardCheckingAction from "../../action/useDashboardCheckingAction";
import Checking from "./Checking";

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
	const [open, setOpen] = useState(true);
	const [reservation,setReservas] = useState()
	const [state,setSate] =useState()
	const [modalState,setModalState] =useState(false)
	const [cleanline,setcleanline] =useState(false)
	const [lookinfor,setLookingfor] =useState()
	const {jwt} =useContext(AutoProvider)
	const {toggleOpenDashBoard,toggleCloseDashboard} = useDashboardAction()
	const {toggleOpenDashboardChecking,toggleCloseDashboardChecking}  = useDashboardCheckingAction()
	const {dashboardVisible} = useSelector(selectDashboard)
	const {checkingDasboardVisible} = useSelector(selectDashboardChecking)
	const history = useHistory()

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

	const hanClickCloseCleanline =()=>{
		setcleanline(false)
	}
  
	const { onCanvasClickParentUpdate } = props;
    const currentDate = moment();

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

	const onItemClick = (itemId, e, time, onItemSelectParentUpdate, hand) => {	
		history.push(`/DetailDashboard/${itemId}`)
	}

	const [prueba,setPrueba] =useState(false)

	const onItemDoubleclik =(itemId, e, time, onItemSelectParentUpdate, hand) =>{

		return (
			<div>
			</div>
		)
	}

	const itemRenderer = ({ item, itemContext, getItemProps }) => {
		
		let color 
		if(item.state==0){
			color = "#FFAD31"
		}else if(item.state==1){
			color ="#DD69D1"
		}else if(item.state==2){
			color ="#F94141"
		}else if(item.state==3){
			color ="#3C8AE7"
		}else if(item.state==4){
			color ="#0DC034"
		}
		return (
			<div
				{...getItemProps({
				style: {
					display: "flex",
					alignItems: "center",
					background: color,
					border: ``,
					borderRadius: "8px",
					padding:"8px",
				}
				})}

				onDoubleClick={() =>{
					console.log("solor")
				}} 
			>
      <div className="itemModal" style={{
        left: "left",
        right: "right"
      }}>
			{prueba && <span>{item.title}</span>}
      </div>
     
				<div
				style={
					{
					position: "sticky",
					left: "0",
					display: "inline-block",
					overflow: "hidden",
					padding: "0 1rem",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}
			}
				>
				{itemContext.title}
				</div>
			</div>
		);
	}

	const intervalRenderer = ({ intervalContext, getIntervalProps, data }) => {
		return (
		<div
			{...getIntervalProps()}
			className={`rct-dateHeader ${
			data.isMonth ? "rct-dateHeader-primary" : ""
			}`}
			onClick={() => {
				return false;
			}}
		>
			<span
			style={{
				position: data.isMonth ? "sticky" : "static",
				marginRight: data.isMonth ? "auto" : "inherit",
				left: "5rem",
				padding: "0 10rem",
				fontWeight:
				isWeekendDay(intervalContext, data) ||	
				isCurrentDay(intervalContext, data)
					? "100"
					: "110",
				color: isCurrentDay(intervalContext, data) ? "gray" : "gray",
				width:"1%",

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
        ServicetypeRooms({id:4}).then(index =>{
            setRoom(index)
        })
    },[])

	const [search,setSearch] =useState([])

	const filtrar=(terminoBusqueda)=>{
		let resultadosBusqueda= state.filter((elemento,index)=>{
			if(elemento.ID_Tipo_habitaciones?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
			 || elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
				return elemento;
			}
		});
		setSearch(resultadosBusqueda);
		}


	const filtrarprueba=(terminoBusqueda)=>{
		let resultadosBusqueda= reservation.filter((elemento,index)=>{
			if(elemento.ID_Tipo_habitaciones?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
				|| elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
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

		useEffect(() =>{
			fetch(`http://localhost:4000/api/resecion/getroomsresecion/${4}`)
			.then(resp => resp.json())
			.then(data => {
				const roomDefinid=[]
				for(let i =0;i<data?.query?.length;i++){	
					for(let e =0;e<data?.query?.length;e++){
						const to= parseInt(data?.query[i]?.ID_Tipo_habitaciones)
						const lo =(room[e]?.id_tipoHabitacion) 
						if(to ==lo ){
							roomDefinid.push({
								title:`${data.query[i].title} ${room[e].nombre} `,
								id:data?.query[i]?.id,
								ID_Tipo_estados:data?.query[i]?.ID_Tipo_estados,
								ID_Tipo_habitaciones:data?.query[i]?.ID_Tipo_habitaciones
							})
						}
					}
				}
				setSate(roomDefinid)
				setSearch(roomDefinid)
			})
		},[room])

	useEffect(() =>{
		ServiceReservas().then(index=> {
			setReservas(index)
			setpruebareservas(index)
		})
	},[setSearch])
	
	if(search?.length ==0) {
		setSearch(state)
	}

	const handClickSearch=() =>{
		history.push("/search")
	}

	const handClickReservaction =() =>{
		history.push("/Createreservaction")
	}

	const days = [
		"Lunes",
		"Martes",
		"Miercoles",
		"Jueves",
		"Viernes",
		"Sabado",
		"Domingo"
	];
	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	];
  
  const locale = {
	localize: {
	  day: (n) => days[n],
	  month: (n) => months[n]
	},
	formatLong: {
	  date: () => "mm/dd/yyyy"
	}
  };
  const handChecking =() =>{
	history.push("/checking")
}	
	if(!pruebareservas) return null
	if(!search)  return null
	if(!state)  return null
	if(!reservation)return null
	return (
		<>
		<div className="container-calender">
			<div className="container-button" >
				<button className='button-reservas' onClick={handClickReservaction} >Crear reserva</button>
				<button className='button-reservas-type' onClick={handChecking} >Hacer Checking</button>
				<select onChange={handRaiting}  
												value={raiting} 
												className='select-hotel-dashboard' >
												<option >Tipo de Habitacion</option>
												<option >Todas las Habitaciones</option>
												
											{room?.map(category =>(
												<option 
												value={category.id_tipoHabitacion}   
												key={category.ID}
											>
												{category.nombre}
											</option>
											)
											)}
											</select>
				
				<button className='button-reservas-type' onClick={handClickState}>Estados</button>
				<input className='button-reservas-type-one' placeholder="Busquedas de Reservas" value={lookinfor}  onChange={handLookingfor}  />
			
			</div>
		 </div>
		 <ModalSate 
		 			modalState={modalState} 
		 			handClickCloseState={handClickCloseState} 
					handClikCleanline={handClikCleanline} />

		 <ModalCleanLine 	
		 				cleanline={cleanline} 
		 				hanClickCloseCleanline={hanClickCloseCleanline}  />
		 

		 <Checking  
		 			loading={checkingDasboardVisible}  
		 			toggleCloseDashboardChecking={toggleCloseDashboardChecking}  />
			<Timeline
				groups={search}
				items={ pruebareservas}
				defaultTimeStart={moment().startOf("day").add(-3, "day")}
				defaultTimeEnd={moment().startOf("day").add(20, "day")}
				maxZoom={100}
				rightSidebarWidth={40}
				itemHeightRatio={0.9}                                                             
				lineHeight={40}
				itemRenderer={itemRenderer}
				onItemDoubleClick={true}
				onItemClick={(itemId, e, time) => onItemClick(itemId, e, time)}
				onCanvasContextMenu={(itemId, e, time) =>onItemDoubleclik()}
				>
				<TimelineHeaders className="list-booking-sticky">
					<SidebarHeader />
					<DateHeader
						 locale={locale}
						unit="month"
						labelFormat="MMMM"
						headerData={{ isMonth: false }}
						intervalRenderer={intervalRenderer}
					/>
					<DateHeader
						unit="day"
						locale={locale}
						labelFormat="D"
						headerData={{ isMonth: true, currentDate }}
					/>
				</TimelineHeaders>
		</Timeline>
		<CardStore />
		</>
	);

}

export default Dashboard;