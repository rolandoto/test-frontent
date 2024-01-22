import moment from "moment";
import React, { useEffect, useState } from  "react"
import useDetailRoomAction from "../../action/useDetailRoomAction";

const GroupRows =({group,color,estado,iconState,letra,root,parent,toggleGroup,Time_ingreso,Time_salida,Fecha,id,isValid}) =>{

	const [currentTime, setCurrentTime] = useState(
        moment().format("MMMM Do YYYY, h:mm:ss a")
      );

    const hours =  moment().format('HH:mm:ss');
	  const  {postDetailRoom} =  useDetailRoomAction()
      const [diferenciaHoras, setDiferenciaHoras] = useState(0);
      const [diferenciaMinutos, setDiferenciaMinutos] = useState(0);
      const [diferenciaSegundos, setDiferenciaSegundos] = useState(0);
    
      const Time_ingresonow = Time_ingreso;
      const Time_salidanow = Time_salida;
      const fecha_today = Fecha;
    
    
      const [occasions, setOccasions] = useState([
        {
          description: "Occasion 1",
          startTime: moment(hours,'HH:mm:ss'), // Start time
          endTime: moment(Time_salida, 'HH:mm:ss').add('hours'), // End time, 2 hours from start
        },
        // Add more occasions as needed
      ]);

      useEffect(() => {
        const intervalId = setInterval(() => {
          const now = moment();
    
          setOccasions((prevOccasions) =>
            prevOccasions.map((occasion) => ({
              ...occasion,
              remainingMinutes: Math.max(occasion.endTime.diff(now, 'minutes'), 0),
            }))
          );
        }, 1000); // Update every minute (60,000 milliseconds)
    
        return () => {
          clearInterval(intervalId); // Clear the interval when the component unmounts
        };
      }, []); //

    const handClickToggle  =() =>{
		toggleGroup(parent)
	}
	

  if(isValid){
    return (
			<div    style={{ backgroundColor: color, color:letra}} className="flex-romm-grup" >
				<div>
                  {occasions.map((occasion, index) => {

          console.log({"sdklnasldas":occasion.startTime})

          const minutes   = (occasion.endTime.diff(occasion.startTime, 'minutes')) // 44700
          const hours  = (occasion.endTime.diff(occasion.startTime, 'hours')) // 44700

              return (
                      <span className="font-room"  key={index}>
                        {group} {estado}     
                        {occasion.remainingMinutes} minutos
                      </span>
              )
          })}
					
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