import React from "react";
import CardBedRoom from "../../component/CardBedroom";
import InputBedRoom from "../../component/InputBedRoom";
import TableBedRoom from "../../component/TableBedroom";


const DetailBedRoomTemplate =({id,fetchData,Room}) =>{

    return (
        <>
            <InputBedRoom id={id} fetchData={fetchData} />
            <TableBedRoom Room={Room} />
            <CardBedRoom/> 
        </>
    )

}

export default DetailBedRoomTemplate