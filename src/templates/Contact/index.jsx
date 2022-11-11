import React, { useState } from "react";
import { BiClinic } from "react-icons/bi";
import { FaAmbulance, FaCross, FaRegHospital } from "react-icons/fa";
import { MdLocalAirport, MdOutlineLocalPharmacy } from "react-icons/md";
import Accordion from "../../component/Accordion";

const ContactTemplate=(props) =>{

    const {acordionOne,accordionTwo,accordionThree,accordionFour,accordionFive,accordionSix,accordionSevent,accordionNone}  = props

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
export default ContactTemplate