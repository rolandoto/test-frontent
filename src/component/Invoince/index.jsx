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
import UsePrice from "../../hooks/UsePrice";
import   AutoProvider  from "../../privateRoute/AutoProvider";
import { useContext } from "react";

const Invoince =({resultDashboard=[],carts=[],dataCount,setInvoice,priceCart,client,identification,raiting,handLoading,loading,handLoadingOne,sinIvaCart,tienda,handSubmitInsertCartOne,hancCheckout}) =>{
        
    const dispatch  = useDispatch()
    const t= moment().format();   
    let today = new Date(t)
    const day = today.toISOString().split('T')[0]
    const [state,setate] =useState(false)
    const [information,setInformacion] =useState()
    
    const {jwt} = useContext(AutoProvider)
    let componentRef = useRef();

    const totalResultPrice = priceCart  *19/100

    const resultSinIva = sinIvaCart  *19/100

    const totalResultPriceTwo = priceCart  +totalResultPrice  -resultSinIva


    const totalPrice  = UsePrice({number:priceCart })
    const toPriceIva = UsePrice({number:totalResultPrice -resultSinIva})

    const to  = toPriceIva.price =="COPNaN" ?0 : toPriceIva.price
    const toPriceDefinitive = UsePrice({number:totalResultPriceTwo})

    const toOne = toPriceDefinitive.price ?  toPriceDefinitive.price:  totalPrice.price

    const handClickProduct =() =>{
        dispatch(postProduct({product:carts}))
        setate(true)
        const element = document.getElementById("demo");
        element.remove();
    }

    const totalIva = resultDashboard.Iva ==1? to :0

    const totalwiTHiV =resultDashboard.Iva ==1? toOne :totalPrice.price 

    const handSubmit =() =>{
        handlePrint()
        handLoading()
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const hadAllInvoince =() =>{
        handSubmitInsertCartOne()
        handlePrint()
    }

     const handStInvoince =() =>{
        setInvoice(false)
        handLoadingOne() 
     }

     const handClose =() =>{
        window.location.reload()
        setInvoice(false)
     }

     const [invo,setIvo] =useState(false)

     const handAll =() =>{
        handLoading()
        setIvo(true)
        hancCheckout()
       

        setTimeout(()  =>{
            handlePrint()
        },600)
     }



     useEffect(()  =>{
        fetch(`http://localhost:4000/api/resecion/informationByIdHotel/${jwt.result.id_hotel}`)
        .then(resp => resp.json())
        .then(data =>setInformacion(data))
        .catch(e  => {
            console.log(e)
        }) 
     },[setInformacion])

    const searchingHotel =  information?.query?.find(index =>index.id_hotel  == jwt.result.id_hotel )
     
    if(invo){
        return (
            <div   >
            <div>
                <div className="content-Modal-store-one-two" ref={componentRef}  >
                        <div className="handclose" onClick={() => handStInvoince()}>
                            <IoMdCloseCircle   fontSize={30} color="black" />
                        </div>
                            <div  className="form-login container-invoince-to "> 
                                <span className="invoince title-invoince-cart" >{jwt.result.hotel}</span>
                                <span className="invoince title-invoince-cart" >Nit: {searchingHotel?.Nit}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Direcion}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Telefono}</span>
                            
                                <h6 className="p title-invoince " >GRACIAS POR SU VISITA</h6>
                                <span className="p title-invoince-cart" >RES DIAN {searchingHotel?.Res_dian}</span>
                                <span className="p title-invoince-cart  ">Fecha: {moment(searchingHotel?.fecha).utc().format('YYYY/MM/DD')}</span>
                                <span className="p title-invoince-cart  ">Resolucion {searchingHotel?.Resolucion_initial} al {searchingHotel?.Resolucion_final}</span>
                                <span className="p title-invoince-cart  ">FACTURA DE VENTA</span>
                                <span className="p title-invoince-cart  ">FP-{dataCount?.Resolucion}</span>


                                <span className="atm title-invoince-cart" >Recepcionista: {jwt.result.name} </span>
                                <span className="atm title-invoince-cart" >Fecha: {day}</span>
                                <span className="title-invoince-cart" >Tipo pago: {raiting}</span>
                                <span className="title-invoince-cart">Cliente: {client}</span>  
                                <span className="title-invoince-cart">CC/NIT: {identification} </span> 

                                <div className="details-invoince atm" >
                                        <span className="title-invoince-cart" >Detalles </span>
                                        <span className="value title-invoince-cart" >Valor</span>
                                    
                                </div>

                            {carts && <div className="container-invoince" >
                                {carts?.map(index =>{
                                    const toPrice = UsePrice({number:index.price})
                                    return (
                                    <div className="carts-invoince">
                                        <span className="title-invoince-cart">{index.name}</span>   
                                        <span className="valo title-invoince-cart ">{toPrice.price}</span> 
                                        <span className="title-invoince-cart" ></span>              
                                    </div>
                                    )
                                })}
                            </div>}
                            <div className="sub-total title-invoince-cart sub-total-top ">
                                <span>Sub Total</span>
                                <span className="valo" > {totalPrice.price} </span>
                            </div>
                            <div className="sub-total title-invoince-cart" >
                                <span>IVA</span>
                                <span className="valo" >{totalIva}</span>
                            </div>
                            <div className="sub-total title-invoince-cart">
                                <span>Total</span>
                                <span className="valo" >{totalwiTHiV}</span>
                            </div>
                            
                            <div className="container-invoince line-invoince"></div>

                            <h6 className="p title-invoince " >Califica nuestro servicio</h6>
                            <img className="image-qr" src="https://github.com/rolandoto/image-pms/blob/main/qr.jpeg?raw=true" alt="" />
                        
                            <span className="invoince grupo title-invoince-cart to-cart-grupo" >WWW.GRUPO-HOTLELES.COM</span>
                        </div>            
                </div>      
                </div>
                    <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} onClick={handSubmit}>
                        <span className="itemNameonE">Guardar e imprimir</span>
                    </button>
        </div>
        )
    }
    


    if(tienda){
        return (
            <>        
                <div className="border-ri">
                    <div>
                        <div className="content-Modal-store" ref={componentRef}   >
                                    <div className="handclose" onClick={handClose}>
                                        <IoMdCloseCircle   fontSize={30} color="black" />
                                    </div>
                                        <div  className="form-login container-invoince-to "> 
                                            <h6 className="p title-invoince " >Tienda {jwt.result.hotel}  </h6>
                                            <span className="atm title-invoince-cart" >Recepcionista: {jwt.result.name} </span>
                                            <span className="atm title-invoince-cart" >Fecha: {day}</span>
                                            <span className="title-invoince-cart" >Tipo pago: {raiting}</span>
                                            <span className="title-invoince-cart">Cliente: {client}</span>  
                                            <span className="title-invoince-cart">CC/NIT: {identification} </span> 

                                            <div className="details-invoince atm" >
                                                    <span className="title-invoince-cart" >Detalles </span>
                                                    <span className="value title-invoince-cart" >Valor</span>
                                                
                                            </div>
                                                {carts && <div className="container-invoince" >
                                                    {carts?.map(index =>{
                                                        const toPrice = UsePrice({number:index.price})
                                                        return (
                                                        <div className="carts-invoince">
                                                            <span className="title-invoince-cart">{index.name}</span>   
                                                            <span className="valo title-invoince-cart ">{toPrice.price}</span> 
                                                            <span className="title-invoince-cart" ></span>              
                                                        </div>
                                                        )
                                                    })}
                                        </div>}
                                        <div className="sub-total title-invoince-cart sub-total-top ">
                                            <span>Sub Total</span>
                                            <span className="valo" > {totalPrice.price} </span>
                                        </div>
                                        <div className="sub-total title-invoince-cart" >
                                        </div>
                                        <div className="sub-total title-invoince-cart">
                                            <span>Total</span>
                                            <span className="valo" >{totalPrice.price} </span>
                                        </div>
                                        
                                        <div className="container-invoince line-invoince"></div>

                                        <h6 className="p title-invoince " >Califica nuestro servicio</h6>
                                        <img className="image-qr" src="https://github.com/rolandoto/image-pms/blob/main/qr.jpeg?raw=true" alt="" />
                                    
                                    </div>            
                            </div>     
                        </div>
                        <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} onClick={hadAllInvoince}>
                            <span className="itemNameonE">Guardar e imprimir</span>
                        </button>
                        </div>
                </>
        )
    }else{

    return (
        <>   
            <div className="border-ri"   >
                    <div>
                        <div className="content-Modal-store-one"   >
                                <div className="handclose" onClick={() => setInvoice(false)}>
                                    <IoMdCloseCircle   fontSize={30} color="black" />
                                </div>
                                        <div  className="form-login container-invoince-to "> 
                                        <span className="invoince title-invoince-cart" >{jwt.result.hotel}</span>
                                {jwt.result.id_hotel  == 7 && <span className="invoince title-invoince-cart" >Rolando Guerrero</span>  || jwt.result.id_hotel  == 3 && <span className="invoince title-invoince-cart" >Efraín Giraldo </span>} 
                                <span className="invoince title-invoince-cart" >Nit: {searchingHotel?.Nit}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Direcion}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Telefono}</span>
                                { jwt.result.id_hotel  == 7 && <span className="invoince title-invoince-cart" >No responsable</span> ||  jwt.result.id_hotel  == 3 && <span className="invoince title-invoince-cart" >No responsable</span> }

                            
                                <h6 className="p title-invoince " >GRACIAS POR SU VISITA</h6>
                                {jwt.result.id_hotel  == 7 ? <span></span> :<span className="p title-invoince-cart" >RES DIAN {searchingHotel?.Res_dian}</span> }  
                                <span className="p title-invoince-cart  ">Fecha: {moment(searchingHotel?.fecha).utc().format('YYYY/MM/DD')}</span>
                                <span className="p title-invoince-cart  ">{jwt.result.id_hotel  == 7 ? "Numeracion" : "Resolucion"} {searchingHotel?.Resolucion_initial} al {searchingHotel?.Resolucion_final}</span>
                                <span className="p title-invoince-cart  ">FACTURA DE VENTA</span>
                                <span className="p title-invoince-cart  ">{jwt.result.id_hotel  == 7 ? "FV":"FP" && jwt.result.id_hotel  == 3 ? "FV":"FP"  }-{dataCount?.Resolucion}</span>
                                


                                <span className="atm title-invoince-cart" >Recepcionista: {jwt.result.name} </span>
                                <span className="atm title-invoince-cart" >Fecha: {day}</span>
                                <span className="title-invoince-cart" >Tipo pago: {raiting}</span>
                                <span className="title-invoince-cart">Cliente: {client}</span>  
                                <span className="title-invoince-cart">CC/NIT: {identification} </span> 


                                        <div className="details-invoince atm" >
                                                <span className="title-invoince-cart" >Detalles </span>
                                                <span className="value title-invoince-cart" >Valor</span>
                                            
                                        </div>

                                    {carts && <div className="container-invoince" >
                                        {carts?.map(index =>{
                                            const toPrice = UsePrice({number:index.price})
                                            return (
                                            <div className="carts-invoince">
                                                <span className="title-invoince-cart">{index.name}</span>   
                                                <span className="valo title-invoince-cart ">{toPrice.price}</span> 
                                                <span className="title-invoince-cart" ></span>              
                                            </div>
                                            )
                                        })}
                                    </div>}
                                    <div className="sub-total title-invoince-cart sub-total-top ">
                                        <span>Sub Total</span>
                                        <span className="valo" > {totalPrice.price} </span>
                                    </div>
                                    <div className="sub-total title-invoince-cart" >
                                        <span>IVA</span>
                                        <span className="valo" >{totalIva}</span>
                                    </div>
                                    <div className="sub-total title-invoince-cart">
                                        <span>Total</span>
                                        <span className="valo" >{totalwiTHiV}</span>
                                    </div>
                                    
                                    <div className="container-invoince line-invoince"></div>

                                    <h6 className="p title-invoince " >Califica nuestro servicio</h6>
                                    <img className="image-qr" src="https://github.com/rolandoto/image-pms/blob/main/qr.jpeg?raw=true" alt="" />
                                
                                    <span className="invoince grupo title-invoince-cart to-cart-grupo" >WWW.GRUPO-HOTLELES.COM</span>
                                </div>            
                        </div>      
                        </div>
                            <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} onClick={handAll}>
                                <span className="itemNameonE">Guardar e imprimir</span>
                            </button>
                </div>
         </>
        )
    }
}

export default Invoince