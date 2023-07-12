import React, { useRef ,useState,useEffect,useContext} from "react";
import moment from "moment";
import "moment/locale/es";
import Timeline,{
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker
} from "react-calendar-timeline";
import { ServiceReservas } from "./dummy_data";
import 'react-calendar-timeline/lib/Timeline.css'
import "./BookingsTimeline.css";
import AutoProvider  from "../../privateRoute/AutoProvider";
import "./index.css"
import { useHistory } from "react-router-dom";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import { VscSymbolEvent } from "react-icons/vsc";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import ServiceAllTotalReservation from "../../service/ServiceAllTotalReservation";
import { confirmAlert } from "react-confirm-alert";
import { GiBroom } from "react-icons/gi";
import { BsBucket ,BsCheckCircle,BsBell} from "react-icons/bs";
import { IoBedOutline ,IoBanOutline} from "react-icons/io5";
import useUpdateDetailPointerActions from "../../action/useUpdateDetailPointerActions";
import UseListMotels from "../../hooks/UseListMotels";
import useUpdateDetailPounterRangeSliceActions from "../../action/useUpdateDetailPounterRangeSliceActions";
import HttpClient from "../../HttpClient";
import { CiBadgeDollar } from "react-icons/ci";
import { Button, Spacer } from '@nextui-org/react';
import { CameraIcon, HeartIcon, LockIcon, NotificationIcon } from "./IconReservation";
import Footer from "../../component/Footer/Footer";

const GroupRows =({group,color,estado,iconState,letra}) =>{
	return (
		<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
			<div>
			<span className="font-room" >  {group} {estado}  </span> 
			</div>

			<div>
			{iconState} 
			</div>
		</div>
	)
}

const Info = styled(ReactTooltip)`
  max-width: 500px;
  padding-top: 9px;
  z-index: 1000 !important;
  background: rgb(243 243 243 / 70%) !important ;
  opacity: .95;
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000 !important;
`;

const InfoMessage = styled.div`
  font: Roboto;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  z-index: 1000 !important;
`;

const Dashboard = () => {
	const currentDate = new moment();
	const [reservation,setReservas] = useState()
	const [pruebareservas,setpruebareservas] =useState()
	const [state,setSate] =useState()
	const {jwt} =useContext(AutoProvider)
	const history = useHistory()
	const  now = moment().format("YYYY-MM-DD");
	const timelineRef = useRef(null);
	const  [totalDay ,setTotalDay] =useState()
	const {postUpdateDetailPointer} = useUpdateDetailPointerActions()
	const {postUpdateDetailPointerRange} = useUpdateDetailPounterRangeSliceActions()
	const {iduser} = UseListMotels()
	
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
	
	useEffect(() =>{
		ServiceAllTotalReservation({fecha:now,id:jwt.result.id_hotel}).then(index =>{
			setTotalDay(index)
		}).catch(e =>{
			console.log(e)
		})
	},[])

	
	const onItemClick = (itemId, e, time, onItemSelectParentUpdate) => {	
		history.push(`/DetailDashboard/${itemId}`)
	}

	const itemRenderer = ({ item, itemContext, getItemProps }) => {
		const total_habitacion = parseInt(item.valor_habitacion)

		const abono = parseInt(item.abono)

		let colorWords;
		let iconState;
		let title = itemContext.title; // Establecer título predeterminado

		let color;

		switch (item.state) {
		case 0:
			if(abono>0){
				color = '#ff9275';
				colorWords = 'white ';
				iconState = <CiBadgeDollar fontSize={20} /> ;
			}else{
				color = '#f31260';
				colorWords = 'white';
				iconState = <BsBell fontSize={15} />;
			}
			break;
		case 1:
			color = '#7828c8';
			colorWords = 'white';
			iconState = <BsBucket fontSize={15} />;
			break;
		case 2:
			color = '#747171';
			colorWords = 'white';
			break;
		case 3:
			if(abono >= total_habitacion){
				color = '#17c964';
				colorWords = 'white';
				iconState = <VscSymbolEvent fontSize={15} />;
			}else{
				color = 'green';
				colorWords = 'white';
				iconState = <VscSymbolEvent fontSize={15} />;
			}
			break;
		case 4:
			color = '#0DC034';
			colorWords = 'black';
			break;
		case 5:
			color = 'rgba(243, 217, 36, 0.8)';
			colorWords = 'black';
			title = 'Aseo';
			break;
		case 6:
			color = '#0072f5';
			colorWords = 'white';
			iconState = <BsCheckCircle fontSize={15} />;
			break;
		default:
			break;
		}
			const backgroundColor = itemContext.selected  ? "black" :color

			const key = `${item.id}_${item.id}_schedule`;
			

			return (
				
			<div 
			
					data-for={key} data-tip
						{...getItemProps({
						style: {
							display: "flex",
					alignItems: "center",
					backgroundColor,
					border: "",
					borderRadius: "12px",
					padding: "8px",
					color: colorWords,
					position: "relative",
					visibility: "visible",
					opacity: "100",
					boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
					transition: "background-color 0.8s ease",
					zIndex:1000
						},	  
						})}
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
						<span className="text-words" >{title}</span>
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
										<li className="color-white " >Total hospedaje :${total_habitacion.toLocaleString()}</li>
										<li className="color-white " >Abono :${abono.toLocaleString()}</li>
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
			className={`day-num ${isToday ? "todayOne-end-one" : "todayOne"}   rct-dateHeader ${
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
				zIndex:1,
				marginLeft:"-13px"
			}}
			
			>
			 <span className={` day-num ${isToday && "color-day"}`} > {label}</span>
			</span>
		</div>
		);
			}
			const intervalRendererday = ({ getIntervalProps, intervalContext, data }) => {
				
				const label = intervalContext.intervalText;
				const currentDate = moment().startOf('day');
				const isToday = moment(label, 'dd D').isSame(currentDate, 'day');
				const isThursday = moment(label, 'dd D').isoWeekday() === 4; // 4 es el código ISO para el jueves
				const isFirstThursdayOfMonth = moment(label, 'dd D').date() && isThursday;
			  
				const acum = [];
			  
				
				if (isToday) {
				  acum.push(0);
				}
			  
				let acumlitor = 0;
			  
				if (acum.length === 1) {
				  acumlitor++;
				}
			  
				const dayOfWeek = moment(label, 'dd D').locale('es').format('ddd');
		
			  
				return (
				  <div
					{...getIntervalProps()}
					className={`day-num ${acum.length === 1 ? 'todayOne-end' : 'todayOne-Finsihs'} rct-dateHeader ${
					  data.isMonth ? 'rct-dateHeader-primary' : ''
					}`}
				  >
					<span
					  style={{
						position: 'relative',
						margin: 'auto',
						padding: '0 50rem',
						textTransform: 'uppercase',
						color: '#b3aca7',
						fontWeight: '100',
						fontSize: '13px',
						textAlign: 'center', // Ajusta el texto al centro
						display:"grid",
						justifyContent:"center",
						left:"13px",
						top: '10px',
						zIndex: 1,
					  }}
					>
					 <span  className={` day-num ${acum.length === 1  ? "color-day " : ""} `}   > { dayOfWeek}</span>   
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
	
	useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])

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
		
	const handRaiting =(e)=>{
		setRaiting(e.target.value)
		filtrar(e.target.value)
	}

	useEffect(() => {
		HttpClient.GetRoom({url:jwt.result.id_hotel}).then(index =>{
			setSate(index.query);
			setSearch(index.query);
		})
	}, []);
  
	if(search?.length ==0) {
		setSearch(state)
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

	  const handleItemResize = (itemId, time, edge) => {
		const fecha = moment(time).format('YYYY-MM-DD');
	  
		const newReservation = structuredClone(pruebareservas)

		const ReservationIndex = pruebareservas.findIndex(item => item.id == itemId)

		const handModalText =(e) =>{
			confirmAlert({
			  title: '',
			  message: Text,
			  
				  customUI: ({ onClose }) => {
	
					const handClick =() =>{
						if (edge === 'left') {
							newReservation[ReservationIndex].start_time = time
							setpruebareservas(newReservation);
							setReservas(newReservation)
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro });
							
						}else{
							newReservation[ReservationIndex].end_time = time
							setpruebareservas(newReservation);
							setReservas(newReservation)
							postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro });
						}
						onClose() 
					}
		
				   const handClose =() =>{
					setpruebareservas(newReservation);
					setReservas(newReservation)
					onClose() 
				   }
		
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirmar cambio de reserva ?</h4>
							<button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
					  </div>         
					);
				  }
			})
		}

		handModalText()

		postUpdateDetailPointer({ id: itemId, Fecha_final: fecha,countSeguro });
	  };

	  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
		let dragTimeOne =0
		let ID_Habitaciones = 0
		
		
		const group = search[newGroupOrder];

		 reservation.map(item =>{
			if(item.id  ==  itemId){
				dragTimeOne= dragTime+( item.end_time - item.start_time)
				ID_Habitaciones =group.id
			}
		})

		const fecha1 = moment(dragTime).format('YYYY-MM-DD');
		const fecha2 = moment(dragTimeOne).format('YYYY-MM-DD');

		const desde =  `${fecha1} 15:00:00`
		const hasta = `${fecha2} 13:00:00`
		const newReservation = structuredClone(pruebareservas)

		const handModalText =(e) =>{
			confirmAlert({
			  title: '',
			  message: Text,
			  
				  customUI: ({ onClose }) => {
	
					const handClick =() =>{
							const updatedItems = reservation.map(item =>
								item.id === itemId
								  ? {
									  ...item,
									  start_time: dragTime,
									  end_time: dragTime + (item.end_time - item.start_time),
									  group: group.id,
									}
								  : item,
							  );
							
							  postUpdateDetailPointerRange({desde,hasta,ID_Habitaciones,id:itemId})
							  setpruebareservas(updatedItems);
							  setReservas(updatedItems)
						onClose() 
					}
		
				   const handClose =() =>{
					
					setpruebareservas(newReservation);
					setReservas(newReservation)
					onClose() 
				   }
		
					return (
						<div className="popup-overlay"  >
							<h4 className="let-letra" >Confirmar cambio de habitacion ?</h4>
							<button  className="react-confirm-alert-button-group" onClick={handClick} >Si</button>
							<button  className="react-confirm-alert-button-group" onClick={ handClose} >No</button>
					  </div>         
					);
				  }
			})
		}

		handModalText()
	  };
	
	 
	  const nowOne = new Date(2023, 4, 1, 3, 10);

	const renderGroup = ({ group }) => {

		const rows= []
		if(group.ID_estado_habiatcion == 6){
			rows.push(
				<GroupRows 	
					color="white"
					group={group.title} 
					key={group.id}
					estado={"Limpia"} 
					letra="black"
					iconState={<BsCheckCircle color="black"  fontSize={15} />}/>
			)
		}if(group.ID_estado_habiatcion == 5){
			rows.push(
				<GroupRows 	
					color="white"
					group={`${group.title}`} 
					key={group.id} 
					letra="black" 
					iconState={< GiBroom fontSize={15} color="black"  />}
					/>
			)
		}
		if(group.ID_estado_habiatcion == 2){
			rows.push(
				<GroupRows 	
					color="white"
					group={`${group.title}`}
					letra="black" 
					key={group.id} 

					iconState={<IoBanOutline  color="black"  fontSize={15}/>}
					/>
			)
		}if(group.ID_estado_habiatcion == 3){
			rows.push(
				<GroupRows 	
					color="white"
					group={` ${group.title}`}
					letra="black" 
					key={group.id} 

					iconState={<VscSymbolEvent  fontSize={15}/> }
					/>
			)
		}
			rows.push(
				<GroupRows 	
					color="white"
					iconState={<IoBedOutline fontSize={15}  color="black" />}
					group={group.title} 
					key={group.id} />
			)

		return (
			<>
				{rows}
			</>
	);

};	

	useEffect(() =>{
		ServiceReservas({id:jwt.result.id_hotel}).then(index=> {
			setReservas(index)
			setpruebareservas(index)
		})
	},[setRoom])

const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

	if(!search)  return null
	if(!state)  return null
	if(!reservation)return null
	if(!totalDay) return null
	if(!pruebareservas) return null
	return (
		<>			
			<div ref={timelineRef} > 
			<div style={{ display: "flex"}}>
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
								
							<option   className="opo-room"  > Informe</option>
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
					icon={<NotificationIcon fill="currentColor" />}  color="secondary">  <span  className="text-words" > Reservas </span> </Button>
			<Spacer  x={0.5} y={1} />
			<Button style={{width:"20%"}}  color="error" flat> <span  className="text-words" >Total reservas</span>  </Button>
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
												<Spacer  x={0.5} y={1} />
		</div>

				
			
			<Timeline
				groupRenderer={renderGroup}
				groups={search}
				items={[...pruebareservas]}
				onItemResize={handleItemResize}
				defaultTimeStart={moment().startOf("day").add(-3, "day")}
				defaultTimeEnd={moment().startOf("day").add(30, "day")}
				stackItems
				onItemMove={handleItemMove}									
				itemHeightRatio={0.9}                                                             
				lineHeight={34}
				sidebarWidth={200}
				sidebarContent={<div>Above The Left</div>}
				itemRenderer={  itemRenderer}
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
										width:"210px"}}  
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
							height: "67px",
							zIndex:0
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
						intervalRenderer={intervalRenderer}
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

				<CustomMarker date={Date.now()}>
          {/* custom renderer for this marker */}
          {({ styles, date }) => {
            const customStyles = {
              ...styles,
			  position: "absolute",
			  top:"0px",
			  bottom: "0px",
			  width: "3%",
			  backgroundColor: "rgba(23, 201, 100, 0.32)",
			  left:" 1845.47px",
			  margin: "auto",
			  zIndex: "100",
              pointerEvents: "auto"
            };
            return (
              <div
                style={customStyles}
              />
            );
          }}
        </CustomMarker>
			</TimelineMarkers>
			</Timeline>
			<Footer totalday={totalDay}   />
			</div>
		</>

	);
}
export default Dashboard;