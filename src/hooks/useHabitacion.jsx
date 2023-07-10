import { useEffect, useState } from "react"



const UseHabitacion =({itemId=13,group="65"}) =>{
    const [hoteById,setHotelById] = useState()

    const fectData = async() =>{
        const response =  await fetch( `https://grupo-hoteles.com/api/getTypeRoomsByIDHotel?id_hotel=${itemId}`,{
            method:"post",
            headers:{'Content-type':'application/json'}
        }).then(index =>{
            const data =  index.json()
            return  data
        })
        .catch((e) =>{
            console.error(e)
        })
        setHotelById(response)
    }  

    useEffect(() =>{
        fectData()
    },[itemId])


    const findHotel = hoteById?.find(itemHotel  => itemHotel.id_tipoHabitacion == group)

    return [findHotel]



}

export default UseHabitacion