import React from "react";
import CardBedRoom from "../../component/CardBedroom";
import InputBedRoom from "../../component/InputBedRoom";
import TableBedRoom from "../../component/TableBedroom";
import Container from "../../Ui/Container";


const DetailBedRoomTemplate =({id,fetchData,Room}) =>{

    return (
        <>
            <InputBedRoom id={id} fetchData={fetchData} />
            <TableBedRoom Room={Room} />
        </>
    )

}

export default DetailBedRoomTemplate