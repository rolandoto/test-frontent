import CardTableRoom from "../CardTableRoom"

const CardRoomSold =({InformeMonth}) =>{


    const { roomByIdIDtypeRoom,roomByIdIDtypeRoomTwoPerson,roomByIdIDtypeRoomTwoPersonThre,roomByIdIDtypeRoomTwoPersonFour} = InformeMonth

    return (
        <div className="flex-item-dashboard-two" style={{backgroundColor:"white" }}  >
            
            <div className="table-pdf-room" >
                    <CardTableRoom  ItemValueRoom={roomByIdIDtypeRoom} title={"1 Persona del Domingo al miercoles"} />   
                    <CardTableRoom ItemValueRoom={roomByIdIDtypeRoomTwoPerson}  title={"2 Persona del Domingo al miercoles"}  />   
                    <CardTableRoom ItemValueRoom={roomByIdIDtypeRoomTwoPersonThre}  title={"1 Persona del Jueves al Sabados"}  />   
                    <CardTableRoom ItemValueRoom={roomByIdIDtypeRoomTwoPersonFour}  title={"2 Persona del Jueves al Sabados"}  />   
            </div>
        </div>
    )
}

export default CardRoomSold