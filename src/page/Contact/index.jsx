import React ,{useEffect, useState}  from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "../../component/Accordion"
import { getEmercies } from "../../store/slice"
import { FaAmbulance,FaRegHospital ,FaCross} from "react-icons/fa";
import { BiClinic } from "react-icons/bi";
import { MdLocalAirport,MdOutlineLocalPharmacy } from "react-icons/md";
import UseTitle from "../../hooks/UseTitle";

const Contact =() =>{

    const dispatch= useDispatch()

    const {emegrcies} = useSelector(state => state.listBooking)
    
    useEffect(() =>{
            dispatch(getEmercies({id:2})) 
    },[dispatch])

    const acordionOne  = emegrcies.filter(index => index.servicio == 1)
    const accordionTwo  = emegrcies.filter(index => index.servicio == 2)
    const accordionThree  = emegrcies.filter(index => index.servicio == 3)
    const accordionFour  = emegrcies.filter(index => index.servicio == 4)
    const accordionFive  = emegrcies.filter(index => index.servicio == 5)
    const accordionSix  = emegrcies.filter(index => index.servicio == 6)
    const accordionSevent  = emegrcies.filter(index => index.servicio == 7)
    const accordionNone  = emegrcies.filter(index => index.servicio == 8)

    UseTitle({title:"Contactos"})
    
    const [active,setActive] = useState("title1")

    return (
        <div className="container-contact" >
            <Accordion title={`Linea de emergencias y autoridades y entidades`} active={active}  setActive={setActive} acordionOne={acordionOne}  icone={<FaCross/>}  />
            <Accordion title="Primeros auxilios" active={active}  setActive={setActive} accordionTwo={accordionTwo} icone={<FaCross/>} />
            <Accordion title="Ambulacia" active={active}  setActive={setActive} accordionThree={accordionThree} icone={<FaAmbulance color="white" />} />
            <Accordion title="Clinicas" active={active}  setActive={setActive} accordionFour={accordionFour} icone={<BiClinic color="white" />}  />
            <Accordion title="Hospitales" active={active}  setActive={setActive} accordionFive={accordionFive} icone={<FaRegHospital color="white" />}  />
            <Accordion title="Droguerias" active={active}  setActive={setActive} accordionSix={accordionSix}  icone={<MdOutlineLocalPharmacy color="whit" />}  />
            <Accordion title="Servicios publicos" active={active}  setActive={setActive} accordionSevent={accordionSevent} icone={<MdLocalAirport color="white" />} />
            <Accordion title="Terminales y aeropuerto" active={active}  setActive={setActive}  accordionNone={accordionNone} icone={<MdLocalAirport color="white" />} />
        </div>
    )
}
export default Contact