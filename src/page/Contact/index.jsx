import React ,{useEffect, useState}  from "react"
import { useDispatch, useSelector } from "react-redux"
import Accordion from "../../component/Accordion"
import { FaAmbulance,FaRegHospital ,FaCross} from "react-icons/fa";
import { BiClinic } from "react-icons/bi";
import { MdLocalAirport,MdOutlineLocalPharmacy } from "react-icons/md";
import UseTitle from "../../hooks/UseTitle";
import useContactAction from "../../action/useContactAction";
import UseUsers from "../../hooks/UseUser";
import ContactTemplate from "../../templates/Contact";
import useProgress from "../../hooks/useProgress";
import LineProgress from "../../Ui/LineProgress";

const Contact =() =>{
    UseTitle({title:"Contactos"})
    const {jwt} = UseUsers()
    const {id_hotel}  = jwt.result
    const {getContactById} = useContactAction()
    const {loading,error,Contact
                                } = useSelector((state) =>state.Contact)
    const {progress} =useProgress({id:id_hotel})

    const fethData = async() =>{
        getContactById({id:id_hotel})
    }

    useEffect(() =>{
        fethData()
    },[id_hotel])

    const acordionOne  = Contact.filter(index => index.servicio == 1)
    const accordionTwo  = Contact.filter(index => index.servicio == 2)
    const accordionThree  = Contact.filter(index => index.servicio == 3)
    const accordionFour  = Contact.filter(index => index.servicio == 4)
    const accordionFive  = Contact.filter(index => index.servicio == 5)
    const accordionSix  = Contact.filter(index => index.servicio == 6)
    const accordionSevent  = Contact.filter(index => index.servicio == 7)
    const accordionNone  = Contact.filter(index => index.servicio == 8)

    const fillContent =() =>{
        if(progress< 100){
            return <LineProgress  progress={progress} />
        }
        if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>{error}</p>
        }

        return <ContactTemplate  
                    acordionOne={acordionOne}
                    accordionTwo={accordionTwo} 
                    accordionThree={accordionThree}
                    accordionFour={accordionFour}
                    accordionFive={accordionFive}
                    accordionSix={accordionSix}
                    accordionSevent={accordionSevent}
                    accordionNone={accordionNone}                              
                    />
    }
 
    return (
        <>
        {fillContent()}
        </>
    )
}
export default Contact