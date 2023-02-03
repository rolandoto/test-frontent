import React, { useRef, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io";
import UseUsers from "../../hooks/UseUser"
import moment from "moment"
import ReactToPrint from "react-to-print";
import { useDispatch, useSelector } from "react-redux"
import { postProduct } from "../../store/slice";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import ServiceResolution from "../../service/serviceResolution";

const Invoince =({carts=[], setInvoice,priceCart,client,identification,raiting}) =>{
        
    const dispatch  = useDispatch()
    const t= moment().format();   
    let today = new Date(t)
    const day = today.toISOString().split('T')[0]
    const [state,setate] =useState(false)
    const [data,setData] =useState([])

    const {jwt} = UseUsers()
    let componentRef = useRef();

    

    const handClickProduct =() =>{
        dispatch(postProduct({product:carts}))
        setate(true)
        const element = document.getElementById("demo");
        element.remove();
    }

    useEffect(()  =>{
        fetch("http://localhost:4000/api/resecion/resolucion")
        .then(res => res.json())
        .then(data => setData(data?.query[0]))
    },[])

    
    
    let count = data?.Resolucion+1
    console.log(count)

    const handSubmit =() =>{
        handlePrint()
        ServiceResolution({Resolucion:count}).then(index=>{
            console.log(index)
        }).catch(e =>{
            console.log(e)
        })
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });


    return (
        <div className="border-ri"   >
            <div    >
                <div className="content-Modal-store"  ref={componentRef} >
                            <div className="handclose" onClick={() => setInvoice(false)}>
                                <IoMdCloseCircle   fontSize={30} color="black" />
                            </div>
                                <div  className="form-login container-invoince-to "> 
                                    <span className="invoince title-invoince-cart" >{jwt.result.hotel}</span>
                                    <span className="invoince title-invoince-cart" >Nit: 900768373-3</span>
                                    <span className="invoince title-invoince-cart" >CR 41A #10-41</span>
                                    <span className="invoince title-invoince-cart" >3053638733</span>
                                
                                    <h6 className="p title-invoince " >GRACIAS POR SU COMPRA</h6>
                                    <span className="p title-invoince-cart" >RES DIAN 18764043666304</span>
                                    <span className="p title-invoince-cart  ">Fecha: 2023/01/31</span>
                                    <span className="p title-invoince-cart  ">Resolucion 1001 al 3000</span>
                                    <span className="p title-invoince-cart  ">FACTURA DE VENTA</span>
                                    <span className="p title-invoince-cart  ">FP-{data?.Resolucion}</span>

                                    <span className="atm title-invoince-cart" >Cajero: {jwt.result.name} </span>
                                    <span className="atm title-invoince-cart" >Fecha: {day}</span>
                                    <span className="title-invoince-cart" >Pago: {raiting}</span>
                                    <span className="title-invoince-cart">Cliente: {client}</span>  
                                    <span className="title-invoince-cart">CC/NIT: {identification} </span> 

                                    <div className="details-invoince atm" >
                                            <span className="title-invoince-cart" >Detalles </span>
                                            <span className="value title-invoince-cart" >Valor</span>
                                            <span className="title-invoince-cart" >Iva</span>
                                    </div>

                                {carts && <div className="container-invoince" >
                                    {carts?.map(index =>(
                                        <div className="carts-invoince">
                                            <span className="title-invoince-cart">{index.name}</span>   
                                            <span className="valo title-invoince-cart ">{index.price}</span> 
                                            <span className="title-invoince-cart" >0</span>              
                                        </div>
                                    ))}
                                </div>}
                                <div className="sub-total title-invoince-cart sub-total-top ">
                                    <span>Sub Total</span>
                                    <span> {priceCart} </span>
                                </div>
                                <div className="sub-total title-invoince-cart" >
                                    <span>IVA</span>
                                    <span>0</span>
                                </div>
                                <div className="sub-total title-invoince-cart">
                                    <span>Total</span>
                                    <span>1000</span>
                                </div>
                                
                                <div className="container-invoince line-invoince"></div>

                                <h6 className="p title-invoince " >Califica nuestro servicio</h6>
                                <img className="image-qr" src="https://github.com/rolandoto/image-pms/blob/main/qr.jpeg?raw=true" alt="" />
                            
                                <span className="invoince grupo title-invoince-cart to-cart-grupo" >WWW.GRUPO-HOTLELES.COM</span>
                               
                            </div>  
                            <button id="demo" className= {`  "dispaly-one"}    checkOut  sub-total-top`} onClick={handSubmit}>
                                                            <span className="itemName">Imprimir</span>
                                                    </button>          
                    </div>

                    
                      
                             
                </div>
               
        </div>
    )

}

export default Invoince