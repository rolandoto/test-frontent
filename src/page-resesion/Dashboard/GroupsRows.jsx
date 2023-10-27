import moment from "moment";
import React, { useEffect, useState } from  "react"
import useDetailRoomAction from "../../action/useDetailRoomAction";

const GroupRows =({group,color,estado,iconState,letra,root,parent,toggleGroup,Time_ingreso,Time_salida,Fecha,id,isValid}) =>{

	const [currentTime, setCurrentTime] = useState(
        moment().format("MMMM Do YYYY, h:mm:ss a")
      );

	  const  {postDetailRoom} =  useDetailRoomAction()
      const [diferenciaHoras, setDiferenciaHoras] = useState(0);
      const [diferenciaMinutos, setDiferenciaMinutos] = useState(0);
      const [diferenciaSegundos, setDiferenciaSegundos] = useState(0);
    
      const Time_ingresonow = Time_ingreso;
      const Time_salidanow = Time_salida;
      const fecha_today = Fecha;
    
      useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
          const tiempoActual = moment();
          setCurrentTime(tiempoActual.format("MMMM Do YYYY, h:mm:ss a"));
    
          const momentoIngreso = moment(Time_ingresonow, "HH:mm:ss");
          const momentoSalida = moment(Time_salidanow, "HH:mm:ss");
    
          // Check if the date is today
          const isToday = momentoIngreso.isSame(fecha_today, "day");
    
          if (!isToday) {
            clearInterval(interval);
            // Date is not today, perform necessary actions
            return;
          }
    
          const diferencia = momentoSalida.diff(tiempoActual);
    
          // Verifica si ya es hora de salida
          if (diferencia <= 0) {
            clearInterval(interval);
            // Puedes realizar otras acciones aquí si es necesario
            return;
          }
    
          const horas = Math.floor(diferencia / (60 * 60 * 1000));
          const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
          const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);
    
          setDiferenciaHoras(horas);
          setDiferenciaMinutos(minutos);
          setDiferenciaSegundos(segundos);
    
          // Check if class is finished and show alert
        
          if (horas ==0 &&  minutos == 0 && segundos == 0) {
            setTimeout(() => {
              alert("Tu clase ha terminado.");
            }, 1000); // Delay for 1 second to ensure the interval is cleared before the alert
          }
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      }, [Time_ingreso, Time_salida, fecha_today]);
        

    const handClickToggle  =() =>{
		toggleGroup(parent)
	}
	

  if(isValid){
    return (
			<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
				<div>
					<span  onClick={handClickToggle}  className="font-room" >  {group} {estado} {diferenciaHoras}:{diferenciaMinutos}:{" "} {diferenciaSegundos}     </span> 
				</div>
				<div>
					{iconState} 
				</div>
			</div>
		)
  }else{
    return (
			<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
				<div>
					<span  onClick={handClickToggle}  className="font-room" >  {group} {estado} </span> 
				</div>
				<div>
					{iconState} 
				</div>
			</div>
		)
  }
   
	
	
    
}

export default GroupRows