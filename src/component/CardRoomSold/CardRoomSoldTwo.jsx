import CardTableRoom from "../CardTableRoom"

const CardRoomSoldTWo =({InformeMonth}) =>{

    const { roomByIdIDtypeRoomTwoPersonFive,roomByIdIDtypeRoomTwoPersonSix} = InformeMonth

    return (
        <div className="flex-item-dashboard-two" style={{backgroundColor:"white" }}  >
            <div className="table-pdf-room" >
                    <CardTableRoom  ItemValueRoom={roomByIdIDtypeRoomTwoPersonFive} title={"Superior a 2 Persona del Domingo al miercoles"} />   
                    <CardTableRoom ItemValueRoom={roomByIdIDtypeRoomTwoPersonSix}  title={"superio a 2 Persona del Jueves al viernes"}  />   
            </div>
        </div>
    )
}

export default CardRoomSoldTWo