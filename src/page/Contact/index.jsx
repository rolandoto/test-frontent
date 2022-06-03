import React ,{useEffect, useState}  from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "../../component/Accordion"
import { getEmercies } from "../../store/slice"

const Contact =() =>{

    const dispatch= useDispatch()

    const {emegrcies} = useSelector(state => state.listBooking)
    console.log(emegrcies)
    useEffect(() =>{
            dispatch(getEmercies()) 
    },[dispatch])

    const acordionOne  = emegrcies.link?.filter(index => index.servicio == 1)
    const accordionTwo  = emegrcies.link?.filter(index => index.servicio == 2)
    const accordionThree  = emegrcies.link?.filter(index => index.servicio == 3)
    const accordionFour  = emegrcies.link?.filter(index => index.servicio == 4)
    const accordionFive  = emegrcies.link?.filter(index => index.servicio == 5)
    const accordionSix  = emegrcies.link?.filter(index => index.servicio == 6)
    const accordionSevent  = emegrcies.link?.filter(index => index.servicio == 7)
    const accordionNone  = emegrcies.link?.filter(index => index.servicio == 8)
    
    const [active,setActive] = useState("title1")

    return (
        <div className="container-contact" >
            <Accordion title="Linea de emergencias y autoridades y entidades" active={active}  setActive={setActive} acordionOne={acordionOne} />
            <Accordion title="Primeros auxilios" active={active}  setActive={setActive} accordionTwo={accordionTwo} />
            <Accordion title="Ambulacia" active={active}  setActive={setActive} accordionThree={accordionThree} />
            <Accordion title="Clinicas" active={active}  setActive={setActive} accordionFour={accordionFour} />
            <Accordion title="Hospitales" active={active}  setActive={setActive} accordionFive={accordionFive} />
            <Accordion title="Droguerias" active={active}  setActive={setActive} accordionSix={accordionSix} />
            <Accordion title="Servicios publicos" active={active}  setActive={setActive} accordionSevent={accordionSevent} />
            <Accordion title="Terminales y aeropuerto" active={active}  setActive={setActive}  accordionNone={accordionNone} />
        </div>
    )
}

export default Contact