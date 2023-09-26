import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import useUpdateDetailPointerActions from "../action/useUpdateDetailPointerActions";
import AutoProvider from "../privateRoute/AutoProvider";
import useUpdateDetailPounterRangeSliceActions from "../action/useUpdateDetailPounterRangeSliceActions";

const  UseUpdateRange =({getPostByReservation,
                        countSeguro,
                        message,
                        socket,
						Items,
						Room}) =>{
							
    
    const {postUpdateDetailPointerRange} = useUpdateDetailPounterRangeSliceActions()

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
								await getPostByReservation()
							  postUpdateDetailPointerRange({desde,hasta,ID_Habitaciones,id:itemId,ID_estado_habiatcion})
							  socket.emit("sendNotification",message);
							  
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
      return {handleItemMove}
  };



export default UseUpdateRange