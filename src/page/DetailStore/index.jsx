import React from "react"
import CardStore from "../../component/DetailStore/CardStore"
import InputStore from "../../component/DetailStore/InputStore"
import TableStore from "../../component/DetailStore/TableStore"
import "./index.css"
import {useParams}  from "react-router-dom"

const DetailStore =() =>{

    const {id}  = useParams()

    return (
        <div>
            <InputStore id={id} />
            <TableStore id={id} />
            <CardStore />
        </div>
    )

}
export default DetailStore