import React, { Component } from "react";
import moment from "moment";
import "moment/locale/es";
import Timeline, {
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
	const [lookinfor,setLookingfor] =useState()
	const {jwt} =useContext(AutoProvider)
	const {toggleOpenDashBoard,toggleCloseDashboard} = useDashboardAction()
	const {toggleOpenDashboardChecking,toggleCloseDashboardChecking}  = useDashboardCheckingAction()
	const {dashboardVisible} = useSelector(selectDashboard)
	const {checkingDasboardVisible} = useSelector(selectDashboardChecking)
	const history = useHistory()
	const {count} =useCountRoom({id:jwt.result.id_hotel})
	const [loadingSkeleto,setLoadingSkeleto] =useState(true)

	

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

	const hanClickCloseCleanline =()=>{
		setcleanline(false)
	}
  
	const { onCanvasClickParentUpdate } = props;
    const currentDate = moment().locale("es")

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

	const itemRenderer = ({ item, itemContext, getItemProps }) => {

		let color
		if(item.state==0){
			color = "#FF9990"
		}else if(item.state==1){
			color ="#E9C9FF"
		}else if(item.state==2){
			color ="#F94141"
		}else if(item.state==3){
			color ="#C2DEE5"
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
					color:"black"
				}
				})}
			>
      <div className="itemModal" style={{
        left: "left",
        right: "right"
      }}>

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


	const intervalRendererdayNum= ({ intervalContext, getIntervalProps, data }) => {
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
				padding: "0 50rem",
				textTransform: "capitalize",
				color: "#b3aca7",
    			left: "48%;",
				fontWeight:"100",
				fontSize:"12px"
			}}
			>
			{intervalContext.intervalText}
			</span>
		</div>
		);
	}


	const intervalRendererday = ({ intervalContext, getIntervalProps, data }) => {
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
				position:"relative",
				margin: "auto",
				padding: "0 50rem",
				textTransform: "capitalize",
				color: "#b3aca7",
				fontWeight:"100",
				fontSize:"13px",
				textAlign:"center",
				left:"20px",
				top:"-9px"
			
			}}
			>
			{intervalContext.intervalText}
			</span>
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
			}}>
			<span
			style={{
				position:"absolute",
				margin: "auto",
				padding: "0 50rem",
				textTransform: "capitalize",
				color: "#b3aca7",
    			left: "48%;",
				fontWeight:"100"
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


	console.log(state)
	
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
								title:`${data?.query[i]?.title} ${room[e]?.nombre} `,
								id:data?.query[i]?.id,
								ID_Tipo_estados:data?.query[i]?.ID_Tipo_estados,
								ID_Tipo_habitaciones:data?.query[i]?.ID_Tipo_habitaciones
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
	},[room])


	useEffect(() =>{
		ServiceReservas({id:jwt.result.id_hotel}).then(index=> {
			setReservas(index)
			console.log(index)
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

	const hanclickReservation =() =>{
		history.push("/search")
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
			name:"Informe sell"
		}
	];

	const [selected, setSelected] = useState(new Date());

	const [stateInformes,setInformes] =useState(0)


	const handClickInformAuditoria =(e) =>{
		setInformes(e.target.value)	
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
	},[stateInformes,setInformes])

	console.log(stateInformes)

	if(loadingSkeleto) return Skele()
	if(!pruebareservas) return null
	if(!search)  return null
	if(!state)  return null
	if(!reservation)return null
	return (
		<>
			<div className="container-calender">
				<div className="container-button" >
					<button className='button-reservas' onClick={handClickReservaction} ><div className="flex-index-reservation" ><VscVerified fontSize={18} className="flex-contant" color="white"  /><span>Crear reserva</span></div></button>
					<button className='button-reservas-type-one-two' onClick={handChecking} ><div className="flex-index-reservation"><VscSymbolEvent fontSize={18} className="flex-contan"  color="white" /><span> Check in</span> </div></button>
					<button className='button-reservas-type-one-one'><div className="flex-index-reservation" ><VscSignOut className="flex-contan"  color="white" fontSize={18}  /><span>Checkout</span> </div> </button>
					<button className='button-reservas-type' onClick={handClickState}>
					<div className="flex-index-reservation" ><VscRecord className="flex-contan-one" color="white"  fontSize={18} /><span>Estados</span></div></button>
					
					<select  onChange={handClickInformAuditoria} value={stateInformes}					
							className='button-reservas-type-one button-reservas-type-space button-reservas-type-one-two-two ' >
							<option   >Informe</option>
							{Informes?.map(category =>(
													<option 
													value={category.id	}   
													key={category.name}
												>
													{category.name}
												</option>
							 										))}
						</select>
				
					<select onChange={handRaiting}  
													value={raiting} 
													className='button-reservas-type-one button-reservas-type-space  button-reservas-type-one-two-two' >
													<option >Ver habitaciones</option>
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
					
					
					<button className='button-reservas-type-one '   onClick={hanclickReservation} >
							<div className="flex-index-reservation-one">
									<VscSearch className="flex-contan-one"  color="grey" fontSize={18} /> <span >Buscar reservas</span>
							</div>
							 
					</button>	
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
				defaultTimeStart={moment().startOf("day").add(-8, "day")}
				defaultTimeEnd={moment().startOf("day").add(10, "day")}
				maxZoom={100}
				stackItems
				itemHeightRatio={0.9}                                                             
				lineHeight={45}
				sidebarWidth={180}
				itemRenderer={itemRenderer}
				onItemDoubleClick={false}
				moveResizeValidator={(action, itemId, time, resizeEdge)  => handContext(action, itemId, time, resizeEdge)}
				onItemClick={(itemId, e, time) => onItemClick(itemId, e, time)}
				onCanvasContextMenu={(itemId, e, time) =>onItemDoubleclik()}>
				<TimelineHeaders className="list-booking-sticky">
					<SidebarHeader />
					<DateHeader
						unit="MONTH"
						labelFormat="MMMM"
						headerData={{ isMonth: false}}
						defaultTimeStart={moment().startOf("day").add(-8, "day")}
						defaultTimeEnd={moment().startOf("day").add(10, "day")}
						intervalRenderer={intervalRenderer}
					/>
					<DateHeader
						unit="day"
						labelFormat="D"
						headerData={{ isMonth: false, currentDate, }}
						intervalRenderer={ intervalRendererdayNum}
					/>

					<DateHeader
						unit="day"
						labelFormat="ddd"
						headerData={{ isMonth: true, currentDate, }}
						intervalRenderer={intervalRendererday}
					/>
				</TimelineHeaders>
				<TimelineMarkers>
          {/* <TodayMarker /> */}
          {/* <CustomMarker date={moment().valueOf()} /> */}
          
          <CursorMarker />
        </TimelineMarkers>
		</Timeline>
		
		<CardStore  countRoom={count} />
		</>
	);

}

export default Dashboard;