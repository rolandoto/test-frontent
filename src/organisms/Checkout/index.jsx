import React, { useContext, useEffect, useState } from "react"
import LoadingDetail from "../../Ui/LoadingDetail"
import "./style.css"
import moment from "moment"
import ServicetypeRooms from "../../service/ServicetypeRooms"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import { useParams } from "react-router-dom"
import Invoince from "../../component/Invoince"
import { config } from "../../config"
import ServiceFormulariosCheckout from "../../service/ServiceFormulariosCheckout"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import UsePrice from "../../hooks/UsePrice"
import { height, maxHeight } from "@mui/system"
import ServiceStatus from "../../service/ServiceStatus"

const CheckoutOrganism =({DetailDashboard}) =>{
    const {id} = useParams()
    const {jwt} = useContext(AutoProvider)
    const [room,setRoom] =useState()
    const resultDashboard = DetailDashboard[0] 
    const [data,setDate] =useState()
    const [search,setSearch] =useState()
    const [searchFilter,setSearchFilter] =useState()
    const [preSearchFilter,setPreSearchFilter] =useState()
    const [filterFinish,setFilterFinish] =useState()
    const [invoince,setInvoice] =useState(false)
    const [comprobante,setComprobante] =useState(false)

    const handComprobante =() =>{
        setComprobante(true)
    }   

    const MenuItems = [
        {
          id: 1,
          itemId: "Bebidas",
          name: "Bebidas",
          imgSrc:
          "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
        },
        {
          id: 2,
          itemId: "Snacks",
          name: "Snacks",
          imgSrc:
             "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
        } ,
        {
          id: 3,
          itemId: "Souvenir",
          name: "Souvenir",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1_Mesa-06.png?raw=true",
        } ,
        {
          id: 4,
          itemId: "Drogueria",
          name: "Drogueria",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
        },
        {
          id: 5,
          itemId: "Adultos",
          name: "Adultos",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-05-removebg-preview.png?raw=true",
        } ,
        {
          id: 6,
          itemId: "Lenceria",
          name: "Lencería multas",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-05-removebg-preview.png?raw=true",
        } 
      ];

    const init  =   moment(resultDashboard?.Fecha_inicio).utc().format('MM/DD/YYYY')
    const fin = moment(resultDashboard?.Fecha_final).utc().format('MM/DD/YYYY')

    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[])

    const resultFinish = room?.find(index=>index?.id_tipoHabitacion == resultDashboard?.ID_Tipo_habitaciones)

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getcartreservaction/${id}`)
        .then(resp => resp.json())
        .then(data =>setDate(data.query)  )
    },[setDate])

    const bebidas  = data?.filter(index => index.ID_Categoria ==1)    
    const Snacks  = data?.filter(index => index.ID_Categoria ==2)    
    const Souvenir  = data?.filter(index => index.ID_Categoria ==3)    
    const Drogueria  = data?.filter(index => index.ID_Categoria ==4)    
    const Adultos  = data?.filter(index => index.ID_Categoria ==5)    
    const Lenceria  = data?.filter(index => index.ID_Categoria ==6)    

    const totalBebidas = bebidas?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceBebidas = bebidas?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)

    const totalSnacks = Snacks?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceSnacks = Snacks?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)

    const totalSouvenir = Souvenir?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceSouvenir = Souvenir?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)

    const totalDrogueria = Drogueria?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceDrogueria = Drogueria?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)

    const totalAdultos = Adultos?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceAdultos = Adultos?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)


    const totalLenceria = Lenceria?.reduce((acum,current) => {
        return acum  + current.Cantidad
    },0)

    const priceLenceria = Lenceria?.reduce((acum,current) => {
        return acum  + current.Cantidad * current.Precio
    },0)


    const totalStore = priceLenceria+priceAdultos+priceDrogueria+priceSouvenir+priceSnacks+priceBebidas

    console.log(resultDashboard)

    /**
     *  <div className="container-search-filter" >
                                {[null]?.map((index,e) =>( 
                                    <section className='section-Search' key={`section-${e}`} >
                                            <ul className='border-search'  >
                                                    <li>
                                                        <div >
                                                            <div className='flex-Autocomplete'>
                                                                    <a className='hover:bg-blue-300 flex gap-4 p-4'>
                                            
                                                                    <div className='flex-'>
                                                                        <h3 className='text-sm font-semibold'>Nombre de la empresa: Cocacola</h3>
                                                                    </div>
                                                                </a>
                                                            </div>   
                                                        </div>
                                                    </li>

                                                   
                                            </ul>
                                  
                                    </section>
                                ))}
                    </div>
     * 
     */


    /**
     * 
     * <div className="container-flex-init-global" >
            <LoadingDetail
                loading={true}
                titleLoading={"Bienvenido Checkout"}  />

                <ul className="flex-bedrooms-checking-modal-checkout  ">      
                    <li  >      
                        <input className="input-searching-input-checkout dow"  placeholder="Busquedad de Empresa" name="Buscar" type="text"  />
                    </li>
                </ul>

            <div className="container-checkout-border" >
                        <div className="container-store-checkout" >
                                <div>
                                    <ul>
                                       {MenuItems.map(index => (
                                         <li className="totalPricecheckout-two" >{index?.name}</li>
                                       ))}              
                                    </ul>                 
                                </div>
                                <div>
                                    <ul>
                                        <li className="totalPricecheckout-two" >{totalBebidas ?totalBebidas :0}</li>           
                                        <li className="totalPricecheckout-two" >{totalSnacks ?totalSnacks:0}</li>           
                                        <li className="totalPricecheckout-two" >{totalSouvenir ?totalSouvenir:0}</li>           
                                        <li className="totalPricecheckout-two" >{totalDrogueria ?totalDrogueria:0}</li>   
                                        <li className="totalPricecheckout-two" >{totalAdultos ?totalAdultos:0}</li>   
                                        <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>                
                                    </ul>  
                                </div>

                                <div>
                                    <ul>
                                        <li className="totalPricecheckout" >${priceBebidas ?priceBebidas : 0 }</li>           
                                        <li className="totalPricecheckout" >${priceSnacks ?priceSnacks :0}</li>           
                                        <li className="totalPricecheckout" >${priceSouvenir ?priceSouvenir :0}</li>           
                                        <li className="totalPricecheckout" >${priceDrogueria ?priceDrogueria:0}</li>   
                                        <li className="totalPricecheckout" >${priceAdultos ?priceAdultos :0}</li>   
                                        <li className="totalPricecheckout" >${priceLenceria ?priceLenceria :0}</li>                
                                    </ul>  
                                </div>

                        </div>

                        <div className="container-store-checkout" >
                                <div>
                                    <ul>
                                        <li>Nombre empresa:</li>           
                                        <li>Nit:</li>           
                                        <li>Correo:</li>           
                                        <li>Direccion:</li> 
                                        <li>Telefono:</li>                
                                    </ul>                 
                                </div>
                                <div>
                                    <ul>
                                        <li>Bancolombia </li>           
                                        <li>21212132123</li>           
                                        <li>bancolombia@dasdsadasdasdasd.com</li>           
                                        <li>calle 9</li>  
                                        <li>3202720874</li>                
                                    </ul>  
                                </div>
                        </div>

            </div>

            <div className="resume-title-valor" >
                <span className="title-resumen" >{resultDashboard?.Adultos} Adultos-{resultDashboard?.Ninos} Niños -{resultDashboard?.Noches} Noches- habitacion {resultFinish?.nombre}  total tienda</span> <span className="total-store-checkout" > ${totalStore}</span>
            </div>




            <div className="container-checkout-border" >
                        <div className="container-checkbox" >
                                    <input   
                                        type="checkbox" 
                                        className={`checkbox-round`}
                                    /> Incluir tiendas
                        </div>

                        <div className="container-store-checkout-one" >
                                            <div>
                                                <ul>
                                                    <li className="border-checkout" >0 dias</li>           
                                                    <li className="border-checkout" >Tohalla</li>           
                                                    <li className="border-checkout" >2</li>                        
                                                </ul>                 
                                            </div>
                                            <div>
                                                <ul>
                                                    <li className="border-checkout-one" >fumar</li>           
                                                    <li className="border-checkout-one" >lenceria:</li>           
                                                    <li className="border-checkout-one" >tarjetas</li>                        
                                                </ul>   
                                            </div>
                        </div> 
                        <div className="container-checkbox" >
                        <input   
                            type="checkbox" 
                            className={`checkbox-round`}
                        /> Desocupar habitacion
                    </div>
            </div>



            <div className="container-checkout-border" >
            <div className="container-store-checkout-one" >
                <div>
                    <ul>
                        <li>Sub total:</li>           
                        <li>Iva:</li>           
                        <li>Total:</li>                 
                    </ul>                 
                </div>
                <div>
                    <ul>
                        <li>8000</li>           
                        <li>9000</li>           
                        <li className="total-checkout" >17000</li>           
                    </ul>  
                </div>
            </div>



        
            <div className="container-store-checkout-one box" >
                    <div className="container-checkbox " >
                        <input   
                            type="checkbox" 
                            className={`checkbox-round`}
                        /> Retencion
                        
                    </div>
                    <div className="container-checkbox " >
                        <input   
                            type="checkbox" 
                            className={`checkbox-round`}
                        /> Desocupar la habitacion
                        
                    </div>

                    <div className="container-checkbox " >
                        <input   
                            type="checkbox" 
                            className={`checkbox-round`}
                        /> Retencion de iva
                        
                    </div>
            </div>
            

                <div>
                <p><label for="w3review">Observacion de la factura</label></p>
                    <textarea id="w3review" className="text-tarea" name="w3review" rows="4" cols="50"></textarea> 
                </div>  
            </div>

            <div className="button-checkout" >
                <button>imprimir factura</button>
            </div>

        </div>

        <ul>
                                        <li>{resultDashboard.Nombre} {resultDashboard.Apellido}</li>           
                                        <li>{resultDashboard.Num_documento}</li>           
                                        <li>{resultDashboard.Correo}</li>           
                                        <li>calle 9</li>  
                                        <li>{resultDashboard.Celular}</li>                
        </ul>  
     * 
     */
    

        /**
         * 
         *   {state && <Invoince
                                        setInvoice={setInvoice} 
                                        carts={carts}
                                        priceCart={priceCart}
                                        client={resultDashboard.Nombre} 
                                        identification={resultDashboard.Num_documento}
                                        raiting={raiting} />
                }
         * 
         */
                
    const cart =[]

    for(let i =0;i<data?.length;i++){
        cart.push({
            name:data[i].Nombre_producto,
            price:data[i].Precio
        })
    }   


    const handCloseInvoince =() =>{
        setInvoice(false)
    }

    const handOpenInvoince =() =>{
        setInvoice(true)
    }
                
    useEffect(() =>{
        fetch("https://grupo-hoteles.com/api/formulariofacturacion")
        .then(resp => resp.json())
        .then(data=> {
            setSearchFilter(data)
        } )
    },[])


    const totalPrice = cart?.reduce((acum,current) =>{
        return      acum  + current.price
    },0)

    console.log(totalPrice)
    
    const persona  = searchFilter?.filter(index => index.type_people =="Persona Natural")
    const juridica = searchFilter?.filter(index => index.type_people =="Persona Juridica")

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda= juridica.filter((elemento,index)=>{
            if(elemento.name_people.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.apellido_people.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
    setPreSearchFilter(resultadosBusqueda)
    }

    const filterSearch = searchFilter?.find(index => index.id == filterFinish)
    
    const findPersona =  resultDashboard.tipo_persona == "persona"
    const findEmpresa = resultDashboard.tipo_persona =="empresa"    

    console.log(resultDashboard)

    const valor_habitacion =  resultDashboard.valor_habitacion
    const iva =  parseInt(valor_habitacion *19/100)
        
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',  
        currency: 'COP',
        minimumFractionDigits: 0
    })

    const valor_habitacion_total =formatter.format(valor_habitacion)
    const ivaTo = formatter.format(iva)
    const totalAll =formatter.format(parseInt( valor_habitacion))
    const total_Valor = parseInt(valor_habitacion+ iva)



    const handClickSearc =(event) =>{
        setFilterFinish(event)
        setSearch(null)
        setPreSearchFilter(null)
    }

    const handChange =(e) =>{
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    

    /**
     * 
     * <ul>
                                            <li className="totalPricecheckout-two" >{resultDashboard.Nombre} {resultDashboard.Apellido}</li>           
                                            <li className="totalPricecheckout-two" >{resultDashboard.Num_documento}</li>           
                                            <li className="totalPricecheckout-two" >{resultDashboard.Correo}</li>           
                                            <li className="totalPricecheckout-two" >calle 9</li>  
                                            <li className="totalPricecheckout-two" >{resultDashboard.Celular}</li>      
                                            <li className="totalPricecheckout-two" >{resultDashboard.nacionalidad}</li>                
                                    </ul> 
     */
    let inicio = new Date(resultDashboard?.Fecha_inicio)
    const fechaInicio = inicio.toISOString().split('T')[0]
    
    const final=  new Date(resultDashboard?.Fecha_final)   
    const FechaFinal = final.toISOString().split('T')[0]


    const handServiFormularios =() =>{
        ServiceFormulariosCheckout({id:filterSearch.id,status:"2",fecha_ingreso:fechaInicio,fecha_salida:FechaFinal,valortotal:total_Valor}).then(index =>{
            alert("Factura enviada")
        }).catch(e => {
           alert("error al guardar")
        }) 
    }

    const [loading,setLoading] =useState(false)

    const handLoading =() =>{
        setLoading(true)
    }

    const handLoadingOne =() =>{
        setLoading(false)
    }

    const handUpdateStatus =() =>{
        ServiceStatus({id,ID_Tipo_Estados_Habitaciones:1}).then(index=>{
           window.location.href = "/home"
        }).catch(e =>{
            console.log(e)
        })
    }
    
    if(findEmpresa)
    return (
        <>     
            {invoince  && <Invoince
                                                setInvoice={handCloseInvoince} 
                                                carts={cart}
                                                priceCart={totalPrice}
                                                client={filterSearch?.name_people} 
                                                identification={filterSearch?.num_id}
                                                raiting={"dasd"} 
                                                loading={loading}
                                                handLoading={handLoading}
                                                handLoadingOne={handLoadingOne}/>
                                    }
        {loading ? null  :
        <div className="container-flex-init-global" >
            <LoadingDetail
                loading={true}
                titleLoading={"Checkout Empresa"}  />

                <ul className="flex-bedrooms-checking-modal-checkout  ">      
                    <li  >      
                        <input className="input-searching-input-checkout dow"  placeholder="Busquedad de Empresa" name="Buscar" type="text"  onChange={handChange} />
                    </li>
                </ul>

                <div className="container-search-filter" >
                                {preSearchFilter?.map((index,e) =>( 
                                    <section className='section-Search' key={`section-${e}`} onClick={() => handClickSearc(index.id)}  >
                                            <ul className='border-search' >
                                                    <li>
                                                        <div >
                                                            <div className='flex-Autocomplete'>
                                                                <a className='hover:bg-blue-300 flex gap-4 p-4'>
                                        
                                                                <div className='flex-'>
                                                                    <h3 className='text-sm font-semibold'>{index.name_people}</h3>
                                                                </div>
                                                                </a>
                                                            </div>   
                                                        </div>
                                                    </li>  
                                            </ul>
                                    </section>
                                ))}
                                </div>
                            

              <div className="container-checkout-border" >
                        <div className="container-store-checkout-three" >
                                <div>
                                    <ul>
                                       {MenuItems.map(index => (
                                         <li className="totalPricecheckout-two-finish" >{index?.name}</li>
                                       ))}              
                                    </ul>                 
                                </div>
                                <div>
                                    <ul>
                                        <li className="totalPricecheckout-two" >{totalBebidas ?totalBebidas :0}</li>           
                                        <li className="totalPricecheckout-two" >{totalSnacks ?totalSnacks:0}</li>           
                                        <li className="totalPricecheckout-two" >{totalSouvenir ?totalSouvenir:0}</li>           
                                        <li className="totalPricecheckout-two" >{totalDrogueria ?totalDrogueria:0}</li>   
                                        <li className="totalPricecheckout-two" >{totalAdultos ?totalAdultos:0}</li>   
                                        <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>                
                                    </ul>  
                                </div>

                                <div>
                                    <ul>
                                        <li className="totalPricecheckout" >${priceBebidas ?priceBebidas : 0 }</li>           
                                        <li className="totalPricecheckout" >${priceSnacks ?priceSnacks :0}</li>           
                                        <li className="totalPricecheckout" >${priceSouvenir ?priceSouvenir :0}</li>           
                                        <li className="totalPricecheckout" >${priceDrogueria ?priceDrogueria:0}</li>   
                                        <li className="totalPricecheckout" >${priceAdultos ?priceAdultos :0}</li>   
                                        <li className="totalPricecheckout" >${priceLenceria ?priceLenceria :0}</li>                
                                    </ul>  
                                </div>

                                
                                <div>
                                    <ul>
                                    <li className="totalPricecheckout-one-three one-v-total     " >
                                            <span>Valor consumo ${totalStore ?totalStore : 0 }</span>
                                    </li>        
                                       
                                    </ul>  
                                </div>

                        </div>

                        <div className="container-store-checkout" >
                                 <div className="container-store-checkout" >
                                <div>
                                    <ul>
                                        <li className="totalPricecheckout-two" >Nombre empresa:</li>           
                                        <li className="totalPricecheckout-two" >Nit:</li>           
                                        <li className="totalPricecheckout-two" >Correo:</li>           
                                        <li className="totalPricecheckout-two" >Direccion:</li> 
                                        <li className="totalPricecheckout-two" >Telefono:</li>             
                                    </ul>                 
                                </div>
                                <div>
                                    <ul>
                                        <li className="totalPricecheckout-two" >{filterSearch?.name_people}</li>           
                                        <li className="totalPricecheckout-two" >{filterSearch?.num_id}</li>           
                                        <li className="totalPricecheckout-two" >{filterSearch?.email_people}</li>           
                                        <li className="totalPricecheckout-two" >{filterSearch?.direccion_people}</li>   
                                        <li className="totalPricecheckout-two" >{filterSearch?.number_people}</li>              
                                    </ul>  
                                </div>
                            </div>
                        </div>

            </div>
            


            <div className="container-store-checkout-two" >
                <div className="container-border-checkout" >
                    <div>
                        <ul>
                            <li>{resultDashboard?.Adultos} Adultos,{resultDashboard?.Ninos} Niños,{resultDashboard?.Noches} Noches</li>           
                            <li></li>                  
                            <li> habitacion{resultFinish?.nombre}</li>   
                            <li className="flex-checkout" ><span>Multas: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled >raiting tuype</option>
                                        <option></option>
                                    </select>
                                            </li>   
                                            <li className="flex-checkout" ><span>Lenceria: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled > Lenceria</option>
                                        <option></option>
                                    </select>
                                            </li>   
                                            <li className="flex-checkout" ><span>Tarjetas: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled >raiting tuype</option>
                                        <option></option>
                                    </select>
                            </li>   
                        </ul> 
                        <div className="container-checkout-border-one" >
           
            </div>                
                    </div>

                    <div>
                        <ul>
                            <li className="totalPricecheckout-one-three-finish"><span>Sub total:{valor_habitacion_total}</span> 
                            <span>Iva: {ivaTo} </span>
                            <span>V Tota$: {totalAll}</span>
                            </li>  
                            <div className="container-store-checkout-one box" >

                    <div className="container-checkbox " >
                        <input   
                            type="checkbox" 
                            className={`checkbox-round`}
                        /> Incluir tienda
                        
                        </div>

                    </div>                               
                        </ul>  
                    </div>
                    
                </div>


                    <div className="container-store-checkout-two" >
                            <textarea id="w3review" placeholder="Observacion de la factura" className="text-tarea-one" name="w3review" rows="4" cols="50"></textarea>    
                        </div>

                    <div>

                        <div className="button-checkout-three" onClick={handOpenInvoince} >
                            <button>Imprimir POS tienda</button>
                        </div>
                            
                        <div className="button-checkout" onClick={handServiFormularios} >
                            <button>Enviar factura electronica</button>
                        </div>

                        <div className="button-checkout-one" onClick={handComprobante}  >
                            <button>Descargar comprobante</button>
                        </div>

                        <div className="button-checkout-two-finally" onClick={handUpdateStatus}  >
                            <button>checkout</button>
                        </div>
                    </div>
                </div>
            

            
                                        
          
        {comprobante && <FacturaCompany Room={resultFinish}
                    Valor_dia_habitacion={resultDashboard}
                    resultFinish={resultFinish}
                    filterSearch={filterSearch}
                    resultDashboard={resultDashboard}
                    comprobante={comprobante}
                    setComprobante={setComprobante} />
        }

        </div>
         }
        </>
    )
    else{
        return (
            <>
              {invoince  && <Invoince
                                        setInvoice={handCloseInvoince} 
                                        carts={cart}
                                        priceCart={totalPrice}
                                        client={resultDashboard?.Nombre} 
                                        identification={resultDashboard?.Num_documento}
                                        raiting={"dasd"}
                                        loading={loading}
                                        handLoading={handLoading}
                                        handLoadingOne={handLoadingOne} />
                            }

        {loading ? null  :            
             <div className="container-flex-init-global" >
            <LoadingDetail
                loading={true}
                titleLoading={"Checkout persona natural"}  />
                <div className="container-search-filter" >
                                {preSearchFilter?.map((index,e) =>( 
                                    <section className='section-Search' key={`section-${e}`} onClick={() => handClickSearc(index.id)}  >
                                            <ul className='border-search' >
                                                    <li>
                                                        <div >
                                                            <div className='flex-Autocomplete'>
                                                                <a className='hover:bg-blue-300 flex gap-4 p-4'>
                                        
                                                                <div className='flex-'>
                                                                    <h3 className='text-sm font-semibold'>{index.name_people}</h3>
                                                                </div>
                                                                </a>
                                                            </div>   
                                                        </div>
                                                    </li>  
                                            </ul>
                                    </section>
                                ))}
                                </div>
                            
                          
                <div className="container-checkout-border" >
                            <div className="container-store-checkout-three" >
                                    <div>
                                        <ul>
                                        {MenuItems.map(index => (
                                            <li className="totalPricecheckout-two-finish" >{index?.name}</li>
                                        ))}              
                                        </ul>                 
                                    </div>
                                    <div>
                                        <ul>
                                            <li className="totalPricecheckout-two" >{totalBebidas ?totalBebidas :0}</li>           
                                            <li className="totalPricecheckout-two" >{totalSnacks ?totalSnacks:0}</li>           
                                            <li className="totalPricecheckout-two" >{totalSouvenir ?totalSouvenir:0}</li>           
                                            <li className="totalPricecheckout-two" >{totalDrogueria ?totalDrogueria:0}</li>   
                                            <li className="totalPricecheckout-two" >{totalAdultos ?totalAdultos:0}</li>   
                                            <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>                
                                        </ul>  
                                    </div>

                                    <div>
                                        <ul>
                                            <li className="totalPricecheckout" >${priceBebidas ?priceBebidas : 0 }</li>           
                                            <li className="totalPricecheckout" >${priceSnacks ?priceSnacks :0}</li>           
                                            <li className="totalPricecheckout" >${priceSouvenir ?priceSouvenir :0}</li>           
                                            <li className="totalPricecheckout" >${priceDrogueria ?priceDrogueria:0}</li>   
                                            <li className="totalPricecheckout" >${priceAdultos ?priceAdultos :0}</li>   
                                            <li className="totalPricecheckout" >${priceLenceria ?priceLenceria :0}</li>                
                                        </ul>  
                                    </div>
                                    
                                    <div>
                                        <ul>
                                        <li className="totalPricecheckout-one-three  one-v-total    " >
                                            <span>V Tota${totalStore ?totalStore : 0 }</span>
                                            </li>  
                                            <li className="totalPricecheckout-two-one" onClick={handOpenInvoince} >Imprimir</li>                     
                                        </ul>  
                                    </div>
                            </div>

                            <div className="container-store-checkout" >
                                    <div className="container-store-checkout" >
                                    <div>
                                        <ul>
                                            <li className="totalPricecheckout-two" >Nombre:</li>           
                                            <li className="totalPricecheckout-two" >Cedula:</li>           
                                            <li className="totalPricecheckout-two" >Correo:</li>        
                                            <li className="totalPricecheckout-two" >Telefono:</li>      
                                            <li className="totalPricecheckout-two" >Nacionalidad:</li> 
                                                     
                                        </ul>                 
                                    </div>
                                    <div>
                                        <ul>
                                                <li className="totalPricecheckout-two" >{resultDashboard.Nombre} {resultDashboard.Apellido}</li>           
                                                <li className="totalPricecheckout-two" >{resultDashboard.Num_documento}</li>           
                                                <li className="totalPricecheckout-two" >{resultDashboard.Correo}</li>   
                                                <li className="totalPricecheckout-two" >{resultDashboard.Celular}</li>         
                                                <li className="totalPricecheckout-two" >{resultDashboard.nacionalidad}</li>  
                                                               
                                        </ul>  
                                    </div>
                                </div>
                            </div>
                </div>
            


            <div className="container-store-checkout-two" >
                <div className="container-border-checkout" >
                    <div>
                        <ul>
                            <li>{resultDashboard?.Adultos} Adultos,{resultDashboard?.Ninos} Niños,{resultDashboard?.Noches} Noches</li>           
                            <li></li>                  
                            <li> Habitacion: {resultFinish?.nombre}</li>   
                            <li className="flex-checkout" ><span>Multas: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled >raiting tuype</option>
                                        <option></option>
                                    </select>
                                            </li>   
                                            <li className="flex-checkout" ><span>Lenceria: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled > Lenceria</option>
                                        <option></option>
                                    </select>
                                            </li>   
                                            <li className="flex-checkout" ><span>Tarjetas: </span>   
                                    <select className='select-hotel-checkout' >
                                        <option disabled >raiting tuype</option>
                                        <option></option>
                                    </select>
                            </li>   
                        </ul>                 
                    </div>

                    <div>
                        <ul>
                            <li className="totalPricecheckout-one-three" ><span>Sub total:</span> 
                            <span>Iva: </span>
                            <span>V Tota$: {totalAll}</span>
                            </li>  
                                        
                            <li className="totalPricecheckout-two-one" >Imprimir</li>                     
                        </ul>  
                        
                    </div>
                    
                </div>


                    <div className="container-store-checkout-two" >
                         
                                    <textarea id="w3review" placeholder="Observacion de la factura" className="text-tarea-one" name="w3review" rows="4" cols="50"></textarea>
                                
                        </div>
                </div>
            <div className="container-checkout-border-one" >
            
            </div>

            <div className="button-checkout" >
                <button>Enviar factura</button>
            </div>
            <div className="button-checkout-one" onClick={handComprobante}  >
                <button>Descargar Comprobante</button>
            </div>

            
            <div className="button-checkout-two-finally" onClick={handUpdateStatus}  >
                <button>Finalizar Checkout</button>
            </div>

        {comprobante &&  <Factura Room={resultFinish}
                    Valor_dia_habitacion={resultDashboard}
                    resultFinish={resultFinish}
                    comprobante={comprobante}
                    setComprobante={setComprobante} />
        }                           
        </div>
        }
            </>
        )
    }

}

export default CheckoutOrganism


const Factura  =({Room,Valor_dia_habitacion,resultFinish,comprobante,setComprobante}) =>{
    let docToPrint = React.createRef();
    let startDate = new Date(Valor_dia_habitacion.Fecha_inicio);
    let startDateOne = new Date(Valor_dia_habitacion.Fecha_inicio);
    let endDate = new Date(Valor_dia_habitacion.Fecha_final);
    const toPrice = parseInt(Valor_dia_habitacion?.valor_dia_habitacion)
    const valor_dia = UsePrice({number:toPrice})

    const rayDate = []
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        let month = date.toLocaleString("default", { month: "long" });
            rayDate.push({
            Fecha:(  date.getDate()+" " +month) ,
            Room:Room?.nombre,
            Price:valor_dia.price
            })
    }   
    const fecha =  startDateOne.toISOString().split('T')[0]
    const fechaOne = endDate.toISOString().split('T')[0]

  const printDocument = () => {
    const input = docToPrint.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
    
        format:  [canvas.width, canvas.height ]
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output("dataurlnewwindow");
      pdf.save("Up4-receipt.pdf");
    });
  };

  useEffect(() =>{
    printDocument()
  },[comprobante])


  setTimeout(() => {
    setComprobante(false)
  }, 1000);
  

  
  const totalAll = Valor_dia_habitacion?.valor_dia_habitacion * rayDate?.length
  const toPriceAll = UsePrice({number:totalAll})

    return (<div>
        <div>

        </div>
        <div ref={docToPrint} className="global-factura" style={{
          borderRadius: "5px",
        }} >

            
            <div className="text-center" >
                <h1>HOTEL FLORENCIA PLAZA</h1>
                <h4>Crr 41 no 10-41</h4>
            </div>
          <div>

          <table className="table-factura-one">
              <tr>
                <th>Nombre</th>
                <th>Apellido </th>
                <th className="tarifa-val" >Nacionalidad </th>
                <th className="fecha-entrada-val" >Telefono</th>
                <th className="fecha-sal" >Documento</th>
              </tr>
              <tr>
                <th>{Valor_dia_habitacion?.Nombre}</th>
                <th>{Valor_dia_habitacion?.Apellido} </th>
                <th className="tarifa-val" >{Valor_dia_habitacion?.nacionalidad}</th>
                <th className="fecha-entrada-val" >{Valor_dia_habitacion?.Celular}</th>
                <th className="fecha-sal" >{Valor_dia_habitacion?.Celular}</th>
              </tr>
            </table>
            
          <table className="table-factura">
          <tr>
                <th className="No-person" >No. PERSONAS</th>
                <th className="Tarifa" >Tarifa</th>
                <th className="fecha-entrada" >Fecha entrada</th>
                <th className="fecha-salida" >Fecha salida</th>
                <th>Habitacion</th>
              </tr>
            </table>
            
          <table className="table-factura-one">
              <tr>
                <th>Adultos: {Valor_dia_habitacion?.Adultos}</th>
                <th>Menores: {Valor_dia_habitacion?.Ninos} </th>
                <th className="tarifa-val" >0 </th>
                <th className="fecha-entrada-val" >{fecha} </th>
                <th className="fecha-sal" >{fechaOne}</th>
                <th className="room-detail" >{resultFinish?.nombre}</th>
              </tr>
            </table>
            <table className="table-factura-one">
              <tr>
                <th>Fecha</th>
                <th>Conceptos</th>
                <th>Cargos</th>
                <th>Saldo</th>
              </tr>
           
                {rayDate.map((item,index)=>(
                    <tr>
                        <td>{item.Fecha}</td>
                        <td>{item.Room}</td>
                        <td>{item.Price}</td>
                        <td>{item.Price}</td>
                  </tr>
                ))}
            
            </table>
            <table className="table-factura-one">
              <tr>
                <th>Valor total : {toPriceAll.price}</th>
              </tr>
            </table> 
          </div>
        </div>
      </div>)
}

const FacturaCompany  =({Room,Valor_dia_habitacion,resultFinish,comprobante,setComprobante,filterSearch}) =>{
    let docToPrint = React.createRef();
    let startDate = new Date(Valor_dia_habitacion.Fecha_inicio);
    let startDateOne = new Date(Valor_dia_habitacion.Fecha_inicio);
    let endDate = new Date(Valor_dia_habitacion.Fecha_final);
    const toPrice = parseInt(Valor_dia_habitacion?.valor_dia_habitacion)
    const valor_dia = UsePrice({number:toPrice})

    const rayDate = []
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        let month = date.toLocaleString("default", { month: "long" });
            rayDate.push({
            Fecha:(  date.getDate()+" " +month) ,
            Room:Room?.nombre,
            Price:valor_dia.price
            })
    }   
    const fecha =  startDateOne.toISOString().split('T')[0]
    const fechaOne = endDate.toISOString().split('T')[0]

  const printDocument = () => {
    const input = docToPrint.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
    
        format:  [canvas.width, canvas.height ]
      });
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output("dataurlnewwindow");
      pdf.save("Up4-receipt.pdf");
    });
  };

  useEffect(() =>{
    printDocument()
  },[comprobante])


  setTimeout(() => {
    setComprobante(false)
  }, 2000);
  

  
  const totalAll = Valor_dia_habitacion?.valor_dia_habitacion * rayDate?.length
  const toPriceAll = UsePrice({number:totalAll})
 
    return (<div>
        <div>

        </div>
        <div ref={docToPrint} className="global-factura" style={{
          borderRadius: "5px",
        }} >

            
            <div className="text-center" >
                <h5>HOTEL FLORENCIA PLAZA</h5>
                <h5>NIT:900768373-3</h5>
                <h5>CR 41A #10-41</h5>
                <h5>3053638733</h5>
            </div>
          <div>

          <table className="table-factura-one">
              <tr>
                <th>Nombre empresa</th>
                <th>Nit </th>
                <th className="tarifa-val" >Correo </th>
                <th className="fecha-entrada-val" >Direccion</th>
                <th className="fecha-sal" >Telefono</th>
              </tr>
              <tr>
                <th>{filterSearch?.name_people}</th>
                <th>{filterSearch?.num_id} </th>
                <th className="tarifa-val" >{filterSearch?.email_people}</th>
                <th className="fecha-entrada-val" >{filterSearch?.direccion_people}</th>
                <th className="fecha-sal" >{filterSearch?.number_people}</th>
              </tr>
            </table>
            
          <table className="table-factura">
          <tr>
                <th className="No-person" >No. PERSONAS</th>
                <th className="Tarifa" >Tarifa</th>
                <th className="fecha-entrada" >Fecha entrada</th>
                <th className="fecha-salida" >Fecha salida</th>
                <th>Habitacion</th>
              </tr>
            </table>
            
          <table className="table-factura-one">
              <tr>
                <th>Adultos: {Valor_dia_habitacion?.Adultos}</th>
                <th>Menores: {Valor_dia_habitacion?.Ninos} </th>
                <th className="tarifa-val" >0 </th>
                <th className="fecha-entrada-val" >{fecha} </th>
                <th className="fecha-sal" >{fechaOne}</th>
                <th className="room-detail" >{resultFinish?.nombre}</th>
              </tr>
            </table>
            <table className="table-factura-one">
              <tr>
                <th>FECHA</th>
                <th>CONCEPTO</th>
                <th>CARGO</th>
                <th>SALDO</th>
              </tr>
           
                {rayDate.map((item,index)=>(
                    <tr>
                        <td>{item.Fecha}</td>
                        <td>{item.Room}</td>
                        <td>{item.Price}</td>
                        <td>{item.Price}</td>
                  </tr>
                ))}
            
            </table>
            <table className="table-factura-one">
              <tr>
                <th>Valor total : {toPriceAll.price}</th>
              </tr>
            </table> 
          </div>
        </div>
      </div>)
}