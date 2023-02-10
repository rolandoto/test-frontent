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
import { VscVerified,VscSymbolEvent ,VscSignOut,VscSearch,VscRecord} from "react-icons/vsc";
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
    const [isChecked, setIsChecked] = useState();
    const [isChecke, setIsChecke] = useState();

    const handComprobante =() =>{
        setComprobante(true)
    }   

    const [fp,setfP] =useState()

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
    console.log(resultDashboard)
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

    cart.push({
        name:`${resultDashboard.Noches} Noches `,
        price:`${resultDashboard.valor_habitacion} `
    })

    const [query,setQuery] = useState()

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data?.query))
    },[])

    console.log(query)

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
        return      acum  + parseInt( current.price)
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
    
    const totalPersona =  resultDashboard?.tipo_persona =="persona"?"Natural":"Juridica"

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

    const cartOne =[]

    console.log(resultDashboard)



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

   
    const totalHabitacion =UsePrice({number:resultDashboard.valor_habitacion})
    
    let count =0
    for(let i =0;i<query?.length;i++){
        if(query[i] >parseInt(resultFinish?.persona)){
            count++
        }
    }

   
    const toPriceNoche = UsePrice({number:resultDashboard.valor_dia_habitacion})
    const numOne = parseInt(resultDashboard?.valor_habitacion)
    var formattedNum =numOne.toLocaleString(); 

    const Iva  = numOne*19/100

    const totalIva = numOne + Iva

    const valorTotalIva = totalIva.toLocaleString();
    const formatoIva = Iva.toLocaleString();

    var formatteOne = totalStore.toLocaleString();
    const [factura,setFactura] = useState(false)
    const handServiFormularios =() =>{
        ServiceFormulariosCheckout({id:filterSearch.id,status:"2",fecha_ingreso:fechaInicio,fecha_salida:FechaFinal,valortotal:totalIva}).then(index =>{
            setFactura(true)
            handComprobante()
            
        }).catch(e => {
            setFactura(false)
        }) 
    }

    const [to,setTo] =useState()

    useEffect(()  =>{
        fetch(`${config.serverRoute}/api/resecion/resolucion`)
        .then(res => res.json())
        .then(data => setTo(data?.query))
    },[])

    const  dataCount = to?.find(index => index.ID === 1)
    
    if(findEmpresa)
    return (
        <>     
            {invoince  && <Invoince             
                                                dataCount={dataCount}
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
                titleLoading={"Check Out Empresa"}  />
             <LoadingDetail
                loading={factura}
                titleLoading={"Factura electronica enviada"}  />

            <LoadingDetail
                error={!factura}
                title={"Error al enviar datos"}  />
                <ul className="flex-bedrooms-checking-modal-checkout  ">      
                    <li  > 
                        <div className="contan-seacrh" >
                            <VscSearch color="greys" />  
                        </div>
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
                            

                                <div className="container-store-checkout" >
                                 <div className="container-store-checkout" >
                                <div className="rp">
                                    <ul>
                                        <li className="totalPricecheckout-two negrita let-persona" >Nombre empresa:</li>           
                                        <li className="totalPricecheckout-two negrita let-persona" >Nit:</li>           
                                        <li className="totalPricecheckout-two negrita let-persona" >Correo:</li>           
                                                     
                                    </ul>                 
                                </div>
                                <div className="ri-one" >
                                    <ul>
                                        <li className="totalPricecheckout-two" >{filterSearch?.name_people}</li>           
                                        <li className="totalPricecheckout-two" >{filterSearch?.num_id}</li>           
                                        <li className="totalPricecheckout-two" >{filterSearch?.email_people}</li>           
                                      
                                    </ul>  
                                </div>
                                <div>
                                    <ul>
                                                  
                                        <li className="totalPricecheckout-two negrita " >Direccion:</li> 
                                        <li className="totalPricecheckout-two negrita" >Telefono:</li>             
                                    </ul>                 
                                </div>
                                <div>
                                    <ul>
                                        <li className="totalPricecheckout-two" >{filterSearch?.direccion_people}</li>   
                                        <li className="totalPricecheckout-two" >{filterSearch?.number_people}</li>                      
                                    </ul>                 
                                </div>
                            </div>
                        </div>


                        <div className="container-checkout-border" >
                            <div className="container-store-checkout-three" >
                                    <div className="ub" >
                                        <ul>
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona"  >Cantidad personas:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad noches: </li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Tipo habitacion:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Valor por noche:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Persona adiciona:l</li> 
                                            <li className="totalPricecheckout-two-finish-one  negrita let-persona" >Hora Adicional:</li> 
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Ealy check in:</li>  
                                        </ul>                 
                                    </div>
                                    <div className="ri-two">
                                        <ul>
                                            <li>{resultDashboard?.Adultos + resultDashboard?.Ninos }</li>           
                                            <li className="totalPricecheckout-two" >{resultDashboard?.Noches } Noches</li>           
                                            <li className="totalPricecheckout-two" >{resultFinish?.nombre}</li>           
                                            <li className="totalPricecheckout-two" >{toPriceNoche?.price}</li>   
                                            <li className="totalPricecheckout-two" >{count}</li>   
                                            <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>     
                                            <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>                
                                        </ul>  
                                    </div>

                                    
                                    
                                    <div>
                                        <ul>
                                             <li>
                                           
                                          </li>
                                            <li>
                                            <div className="to-hospedaje" >
                                                <span  >Hospedaje hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span>        <span className="price-store" >{formattedNum} <span className="no-price" > COP</span>  </span>

                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Sub total: </span> <span> {formattedNum}</span> 
                                            </div>
                                          
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Iva: </span><span>{formatoIva}</span>
                                            </div>
                                          
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Valor total:</span> <span>{valorTotalIva} </span>
                                            </div>
                                          
                                            
                                          </li>
                                          
                                        </ul>  
                                    </div>
                            </div>


                </div>

              <div className="container-checkout-border" >
                        <div className="container-store-checkout-three" >
                                <div>
                                    <ul>
                                       {MenuItems.map(index => (
                                         <li className="totalPricecheckout-two-finish negrita let-persona" >{index?.name}:</li>
                                       ))}              
                                    </ul>                 
                                </div>
                                

                                <div className="be-two" >
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
                                             <li>
                                           
                                          </li>
                                            <li>
                                            <div className="to-hospedaje" >
                                                <span  >Tienda hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span><span className="price-store" >{totalStore ?totalStore : 0 } <span className="no-price" >COP</span>  </span>
                                           
                                          </li>
                                          
                                        </ul>  
                                    </div>

                        </div>

                     
            </div>
            


            <div className="container-store-checkout-two" >
                             
                
                   
            <div className="container-flex-buttton-checkout" >    
                        <div className="button-checkout" onClick={handServiFormularios} >
                            <button>Enviar factura e imprimir comprobante</button>
                        </div>

                        <div className="button-checkout-two-finally" onClick={handUpdateStatus}  >
                            <button>Check Out</button>
                        </div>
                    </div>
                </div>
            
 
               

            
                                        
          
        {!comprobante && <FacturaCompany Room={resultFinish}
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
              {invoince  && <Invoince  dataCount={dataCount}
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
                titleLoading={"Check Out persona natural"}  />
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
                                <div className="container-store-checkout-one" >
                                    <div className="container-store-checkout-one " >
                                    <div className="up" >
                                        <ul>
                                            <li className="totalPricecheckout-two negrita let-persona " >Nombre:</li>           
                                            <li className="totalPricecheckout-two negrita let-persona" >Documento:</li>           
                                            <li className="totalPricecheckout-two negrita let-persona" >Correo:</li>        
                                           
                                                     
                                        </ul>                 
                                    </div>
                                    <div className="ve-one" >
                                        <ul>
                                                <li className="totalPricecheckout-two" >{resultDashboard?.Nombre} {resultDashboard?.Apellido}</li>           
                                                <li className="totalPricecheckout-two" >{resultDashboard?.Num_documento}</li>           
                                                <li className="totalPricecheckout-two" >{resultDashboard?.Correo}</li>   
                                              
                                                               
                                        </ul>  
                                    </div>

                                    <div>
                                            <li className="totalPricecheckout-two negrita " >Telefono:</li>      
                                            <li className="totalPricecheckout-two negrita" >Nacionalidad:</li> 
                                            <li className="totalPricecheckout-two negrita" >Tipo persona:</li> 
                                    </div>

                                    <div>
                                        <li className="totalPricecheckout-two" >{resultDashboard.Celular}</li>         
                                        <li className="totalPricecheckout-two" >{resultDashboard.nacionalidad}</li>  
                                        <li className="totalPricecheckout-two" >{totalPersona}</li>  
                                    </div>
                                    
                                </div>
                            </div>
                          
                <div className="container-checkout-border" >
                            <div className="container-store-checkout-three" >
                                    <div className="op">
                                        <ul>
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad personas:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita  let-persona" >Cantidad noches: </li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Tipo habitacion:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Valor por noche:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Persona Adicional:</li> 
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Hora Adicional:</li> 
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Ealy check in:</li>  
                                        </ul>                 
                                    </div>
                                    <div className="ri-two">
                                        <ul>
                                            <li>{resultDashboard?.Adultos + resultDashboard?.Ninos }</li>           
                                            <li className="totalPricecheckout-two" >{resultDashboard?.Noches } Noches</li>           
                                            <li className="totalPricecheckout-two" >{resultFinish?.nombre}</li>           
                                            <li className="totalPricecheckout-two" >{toPriceNoche?.price}</li>   
                                            <li className="totalPricecheckout-two" >{count}</li>   
                                            <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>     
                                            <li className="totalPricecheckout-two" >{totalLenceria ?totalLenceria :0}</li>                
                                        </ul>  
                                    </div>

                                    
                                    
                                    <div>
                                        <ul>
                                             <li>
                                           
                                          </li>
                                            <li>
                                            <div className="to-hospedaje" >
                                                <span  >Hospedaje hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span>  <span className="price-store" >{formattedNum} <span className="no-price" >COP</span>  </span>
                                          </li>
                                          
                                        </ul>  
                                    </div>
                            </div>


                </div>

                <div className="container-checkout-border" >
                            <div className="container-store-checkout-three" >
                                    <div>
                                        <ul>
                                        {MenuItems.map(index => (
                                            <li className="totalPricecheckout-two-finish negrita let-persona" >{index?.name}:</li>
                                        ))}              
                                        </ul>                 
                                    </div>
                                    <div className="re-two">
                                        
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
                                             <li>
                                           
                                          </li>
                                            <li>
                                            <div className="to-hospedaje" >
                                                <span  >Tienda hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span><span className="price-store" >{formatteOne =="NaN"?0:formatteOne} <span className="no-price" >COP</span>  </span>
                                          </li>
                                          
                                        </ul>  
                                    </div>
                            </div>


                </div>
            
               
            <div className="container-store-checkout-two" >
        

                        <div>
                </div>
                </div>
            <div className="container-checkout-border-one" >
            
            </div>
            <div className="container-flex-buttton-checkout" >
            <div className="button-checkout-three" onClick={handOpenInvoince} >
                    <button>Imprimir POS persona natural</button>
                </div>
                <div className="button-checkout-two-finally" onClick={handUpdateStatus}  >
                    <button>Check Out</button>
                </div>  
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

    console.log({"resultFinish":resultFinish})

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
  

  console.log(rayDate)
  const totalAll = Valor_dia_habitacion?.valor_dia_habitacion * rayDate?.length
  const toPriceAll = UsePrice({number:totalAll})

    return (<div>
        <div>

        </div>
        <div ref={docToPrint} className="global-factura" style={{
          borderRadius: "5px",
        }} >

            
            <div className="text-center" >
                <span>HOTEL FLORENCIA PLAZA</span>
               
            </div>

            <div className="text-center" >
                <span>NIT 900768737-3</span>
            </div>

            <div className="text-center" >
                <span>CRR 41A No 10-41 Poblado medellin</span>
            </div>

            <div className="text-center" >
                <span>3053638733</span>
            </div>
           
            <div className="container-store-checkout-one-pdf" >
                <div>
                    <ul>
                        <li>Empresa</li>
                        <li>Nit</li>
                        <li>Correo</li>
                    </ul>
                </div>
                <div>
                <ul>
                        <li>Empresa</li>
                        <li>Nit</li>
                        <li>Correo</li>
                    </ul>
                </div>

                <div>

                    <ul>
                        <li>Empresa</li>
                        <li>Nit</li>
                    </ul>
                </div>
                <div>

                <ul>
                    <li>Empresa</li>
                    <li>Nit</li>
                </ul>
                </div>
                
               
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
                <th className="fecha-sal" >{Valor_dia_habitacion?.Num_documento}</th>
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
                <th className="room-detail" >{resultFinish?.nombre} {Valor_dia_habitacion?.Numero}</th>
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
  const url ="data:image/png;base64,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"
    return (<div>
        <div>

        </div>
        <div ref={docToPrint} className="global-factura" style={{
          borderRadius: "5px",
        }} >

            <img width={200} src={url} alt="" />
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
                <th className="room-detail" >{resultFinish?.nombre} {Valor_dia_habitacion?.Numero}</th>
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