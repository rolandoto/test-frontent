
const UseFilterRooms =() =>{

    const filterRooms  =(Rooms,ItemInput)=>{
        if(ItemInput==0){
            return Rooms
        }
        return Rooms.filter(itemRoom  =>{
           return (itemRoom &&(itemRoom.ID_Tipo_habitaciones ==  ItemInput))
        })
      } 

      return { filterRooms}
}
export default UseFilterRooms