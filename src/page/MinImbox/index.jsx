import React,{useEffect} from "react"
import "./MinImbox.css"
import { useDispatch, useSelector } from "react-redux";
import { getImboxMaintance, getImboxResesion } from "../../store/slice";
import Imbox from "../../component/Imbox";
import UseTitle from "../../hooks/UseTitle";

const MinImbox =() =>{

    const dispatch = useDispatch()

    UseTitle({title:"Caja menor"})

    const {ressecion}= useSelector((state) =>state.listBooking)
    const {maintenanceRecepcion}= useSelector((state) =>state.listBooking)

    useEffect(() =>{
        dispatch(getImboxResesion())
        dispatch(getImboxMaintance())
    },[dispatch])

    return (
        <div className="container-bicta" >
            <Imbox  imbox={ressecion} title="Caja menor Recepcion" />
            <Imbox  imbox={maintenanceRecepcion} title="Caja Menor Recepcion" />
        </div>
    )
}

export default MinImbox