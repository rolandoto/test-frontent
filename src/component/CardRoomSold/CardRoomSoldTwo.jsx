import CardTableRoom from "../CardTableRoom"

const CardRoomSoldTWo =({InformeMonth}) =>{

    const { roomByIdIDtypeRoomChannel} = InformeMonth

    return (
        <div className="" style={{backgroundColor:"white" }}  >
            <div className="" >
                    <CardTableRoom  ItemValueRoom={roomByIdIDtypeRoomChannel} title={"Superior a 2 Persona del Domingo al miercoles"} />   
            </div>
        </div>
    )
}

export default CardRoomSoldTWo