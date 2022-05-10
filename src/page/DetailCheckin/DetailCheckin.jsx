import React, { useState } from "react"
import Checking from "../../component/Checkin/Checkin"
import {useHistory} from "react-router-dom"
const DetailCheckin =() =>{
    
    const history = useHistory()

    const handNext=() =>{
        history.push("/CheckingPage")
    }
    
    return (
        <div>
                <Checking name="" lastName="" phone="" endDate="" handNext={handNext} />
        </div>
    )
}
export default DetailCheckin