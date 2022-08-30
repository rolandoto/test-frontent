import React from "react"
import CardBedRoom from "../../component/CardBedroom"
import InputBedRoom from "../../component/InputBedRoom"
import TableBedRoom from "../../component/TableBedroom"
import "./index.css"
import {useParams}  from "react-router-dom"

const DetailBedRoom =() =>{

    const {id}  = useParams()

    return (
        <div>
            <InputBedRoom id={id} />
            <TableBedRoom id={id} />
            <CardBedRoom />
        </div>
    )

}
export default DetailBedRoom