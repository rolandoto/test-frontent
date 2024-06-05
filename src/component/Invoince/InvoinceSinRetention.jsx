import React, { useRef, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io";
import moment from "moment"
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import UsePrice from "../../hooks/UsePrice";
import   AutoProvider  from "../../privateRoute/AutoProvider";
import { useContext } from "react";
import { config } from "../../config";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardRetention from "../CardRententionIvoince";
import CardRententionIvoinceSinIva from "../CardRententionIvoinceSinIva";

const InvoinceSinRetention =({resultDashboard=[],carts=[],dataCount,setInvoice,priceCart,client,identification,raiting,handLoading,loading,handLoadingOne,sinIvaCart,tienda,handSubmitInsertCartOne,hancCheckout,lastname,fechaFinal,formattedNum,formatoIva,valorTotalIva,nacionalidad,
    correo}) =>{    
    
    const {id} = useParams()
    
    const totalStore = carts.reduce((total, item) => {
        // Convertir el precio a número, eliminando espacios en blanco
        const price = parseFloat(item.price.toString().trim()) || 0;
        return total + price;
    }, 0);

    const [query,setQuery] =useState()

    const [information,setInformacion] =useState()
    
    const {jwt} = useContext(AutoProvider)
    let componentRef = useRef();
    let componetRefSinDian = useRef()
  
   
    const handLEpront = useReactToPrint({
        content: () => componetRefSinDian.current
    });

    const [validState,setValidSatte] =useState(false)

    const handSubmitOne =() =>{
        setValidSatte(true) 
        handLoading()
        hancCheckout()
        setTimeout(()  =>{
            handLEpront()
        },600)
    }

     const handStInvoince =() =>{
        setInvoice(false)
        handLoadingOne() 
     }

     let totalId = false;

    if ( jwt.result.id_hotel == 23 || jwt.result.id_hotel == 5 || jwt.result.id_hotel == 6 || jwt.result.id_hotel == 12  || jwt.result.id_hotel == 10 || jwt.result.id_hotel == 2  ) {
        totalId = true;
    }

    let hotelId 
    if (jwt.result.id_hotel == 6 ) {
        hotelId = true;
    }

     useEffect(()  =>{
        fetch(`${config.serverRoute}/api/resecion/informationByIdHotel/${jwt.result.id_hotel}`)
        .then(resp => resp.json())
        .then(data =>setInformacion(data))
        .catch(e  => {
            console.log(e)
        }) 
        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data?.query))
  
     },[setInformacion])

     //{totalId ?   <span></span> :   <span className="p title-invoince-cart" >RES DIAN {searchingHotel?.Res_dian}</span>}  

    const searchingHotel =  information?.query?.find(index =>index.id_hotel  == jwt.result.id_hotel )

    if(validState){
        return (
            <>     
            <div className="border-ri  "    >
                    <div  >
                        <div className={`content-Modal-store-one-two-finish-tomo`}  ref={componetRefSinDian}    >
                                <div className="handclose" onClick={() => handStInvoince()}>
                                    <IoMdCloseCircle   fontSize={30} color="black" />
                                </div>
                                        <div  className="form-login container-invoince-to "> 
                                        <span className="invoince title-invoince-cart" >{jwt.result.hotel}</span>
                                {jwt.result.id_hotel  == 7 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS</span>   ||  jwt.result.id_hotel  == 3 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS </span>||  jwt.result.id_hotel  == 4 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS </span> ||  jwt.result.id_hotel  == 23 && <span className="invoince title-invoince-cart" >Carlos Ramirez </span> ||  jwt.result.id_hotel  == 6 && <span className="invoince title-invoince-cart" >Jose Bejumea </span> ||  jwt.result.id_hotel  == 12 && <span className="invoince title-invoince-cart" >Jairo enrique </span>||  jwt.result.id_hotel  == 5 && <span className="invoince title-invoince-cart" >Jose dominguez</span> } 
                                <span className="invoince title-invoince-cart" >Nit: {searchingHotel?.Nit}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Direcion}</span>
                                <span className="invoince title-invoince-cart" >{searchingHotel?.Telefono}</span>
                                { totalId && <span className="invoince title-invoince-cart" >No responsable</span> }
                                { hotelId && <span className="invoince title-invoince-cart" >Regimen ordinario</span> }

                                <h6 className="p title-invoince " >GRACIAS POR SU VISITA </h6>
                                {totalId ?   <span></span> :   <span className="p title-invoince-cart" >RES DIAN {searchingHotel?.Res_dian}</span>}  
                                <span className="p title-invoince-cart  ">Fecha: {moment(searchingHotel?.fecha).utc().format('YYYY/MM/DD')}</span>
                                <span className="p title-invoince-cart  ">{  totalId ? "Numeracion" : "Resolucion"  } {searchingHotel?.Resolucion_initial} al {searchingHotel?.Resolucion_final}</span>
                                <span className="p title-invoince-cart  ">FACTURA DE VENTA</span>
                                <span className="p title-invoince-cart  "> { totalId ? "FV":"FP"  }-{dataCount?.Resolucion}</span>
                                


                                <span className="atm title-invoince-cart" >Recepcionista: {jwt.result.name} </span>
                                <span className="atm title-invoince-cart" >Fecha: {fechaFinal}</span>
                                <span className="title-invoince-cart" >Tipo pago: {raiting}</span>
                                <span className="title-invoince-cart">Cliente: {client} {lastname} </span>  
                                <span className="title-invoince-cart">CC/NIT: {identification} </span> 
                                <span className="title-invoince-cart">Nacionalidad: {nacionalidad} </span> 
                                <span className="title-invoince-cart">Email: {correo} </span> 
                                <span className="title-invoince-cart">Huespedes: {query?.length} </span> 

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
    
                                        <CardRententionIvoinceSinIva Dashboard={resultDashboard}  
                                                        Total={formattedNum.toLocaleString()} 
                                                        Iva={formatoIva}
                                                        totalStore={totalStore}
                                                        ValorTotal={valorTotalIva.toLocaleString()}/> 
                                    <div className="container-invoince line-invoince"></div>

                                    <h6 className="p title-invoince " >Gracias por su visita</h6>
                                   
                                
                                </div>            
                        </div>      
                        </div>
                            <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} onClick={handSubmitOne}>
                                <span className="itemNameonE">Guardar e imprimir</span>
                            </button>
                </div>
         </>
         
        )
    }else{
        return (
            <>   
                <div className="border-ri"   >
                        <div  >
                            <div className={`content-Modal-store-one`}      >
                                    <div className="handclose" onClick={() => handStInvoince()}>
                                        <IoMdCloseCircle   fontSize={30} color="black" />
                                    </div>
                                            <div  className="form-login container-invoince-to "> 
                                          
                                    {jwt.result.id_hotel  == 7 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS</span>   ||  jwt.result.id_hotel  == 3 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS </span>||  jwt.result.id_hotel  == 4 && <span className="invoince title-invoince-cart" >DIEZ ELEMENTOS SAS </span> ||  jwt.result.id_hotel  == 23 && <span className="invoince title-invoince-cart" >Carlos Ramirez </span> ||  jwt.result.id_hotel  == 6 && <span className="invoince title-invoince-cart" >Jose Bejumea </span> ||  jwt.result.id_hotel  == 12 && <span className="invoince title-invoince-cart" >Jairo enrique </span>||  jwt.result.id_hotel  == 5 && <span className="invoince title-invoince-cart" >Jose dominguez</span> } 
                                    <span className="invoince title-invoince-cart" >Nit: {searchingHotel?.Nit}</span>
                                    <span className="invoince title-invoince-cart" >{searchingHotel?.Direcion}</span>
                                    <span className="invoince title-invoince-cart" >{searchingHotel?.Telefono}</span>
                                    { totalId && <span className="invoince title-invoince-cart" >No responsable</span> }
    
                                    <h6 className="p title-invoince " >GRACIAS POR SU VISITA</h6>
                                    
                                    <span className="p title-invoince-cart  ">Fecha: {moment(searchingHotel?.fecha).utc().format('YYYY/MM/DD')}</span>
                                    <span className="p title-invoince-cart  ">{  totalId ? "Numeracion" : "Resolucion"  } {searchingHotel?.Resolucion_initial} al {searchingHotel?.Resolucion_final}</span>
                                    <span className="p title-invoince-cart  ">FACTURA DE VENTA</span>
                                    <span className="p title-invoince-cart  "> { totalId ? "FV":"FP"  }-{dataCount?.Resolucion}</span>
                                    
    
    
                                    <span className="atm title-invoince-cart" >Recepcionista: {jwt.result.name} </span>
                                    <span className="atm title-invoince-cart" >Fecha: {fechaFinal}</span>
                                    <span className="title-invoince-cart" >Tipo pago: {raiting}</span>
                                    <span className="title-invoince-cart">Cliente: {client} {lastname} </span>  
                                    <span className="title-invoince-cart">CC/NIT: {identification} </span> 
                                    <span className="title-invoince-cart">Nacionalidad: {nacionalidad} </span> 
                                    <span className="title-invoince-cart">Email: {correo} </span> 
                                    <span className="title-invoince-cart">Huespedes: {query?.length} </span> 
    
    
    
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
    
                                        <CardRententionIvoinceSinIva Dashboard={resultDashboard}  
                                                        Total={formattedNum.toLocaleString()} 
                                                        Iva={formatoIva}
                                                        totalStore={totalStore}
                                                        ValorTotal={valorTotalIva.toLocaleString()}/> 
                                        <h6 className="p title-invoince " >Gracias por su visita</h6>
                                    </div>            
                            </div>      
                            </div>
                                <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} onClick={handSubmitOne}>
                                    <span className="itemNameonE">Guardar e imprimir</span>
                                </button>
                    </div>
             </>
    
        )
    }


   

    

}

export default InvoinceSinRetention