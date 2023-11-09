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
import ServiceResolution from "../../service/serviceResolution"
import { confirmAlert } from "react-confirm-alert"; // Import
import Swal from 'sweetalert2'
import { CiUser ,CiShop,CiBank } from "react-icons/ci";
import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento"
import UseModalText from "../../hooks/UseModalText"
import ServePdf from "../../service/PdfServe"
import io from "socket.io-client";


const socket = io.connect("http://localhost:3001");

const CheckoutOrganism =({DetailDashboard,postDetailRoom,fetchDataApiWhatsapp}) =>{

    useEffect(() => {
        socket.on("receive_message", (data) => {
          console.log(data)
        });
      }, [socket]);

    const {id} = useParams()
    const {jwt} = useContext(AutoProvider)
    const [room,setRoom] =useState()
    const resultDashboard = DetailDashboard[0] 
    const [data,setDate] =useState()
    const [search,setSearch] =useState()
    const [searchFilter,setSearchFilter] =useState()
    const [preSearchFilter,setPreSearchFilter] =useState(null)
    const [filterFinish,setFilterFinish] =useState()
    const [invoince,setInvoice] =useState(false)
    const [comprobante,setComprobante] =useState(false)
    const [isChecked, setIsChecked] = useState(true);
    const [isChecke, setIsChecke] = useState();
    const [to,setTo] =useState()


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
          name: "Aseo p.",
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
        },
        {
            id: 7,
            itemId: "Lenceria",
            name: "Servicio",
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
    const Servicio  = data?.filter(index => index.ID_Categoria ==7)    


    const priceBebidas = bebidas?.reduce((acum,current) => {
        return acum  +  current.Precio
    },0)

    const priceSnacks = Snacks?.reduce((acum,current) => {
        return acum  +  current.Precio
    },0)

    const priceSouvenir = Souvenir?.reduce((acum,current) => {
        return acum  + current.Precio
    },0)

    const priceDrogueria = Drogueria?.reduce((acum,current) => {
        return acum  + current.Precio
    },0)

    const priceAdultos = Adultos?.reduce((acum,current) => {
        return acum  + current.Precio
    },0)

    const priceLenceria = Lenceria?.reduce((acum,current) => {
        return acum  + parseInt(current.Precio)
    },0)

    const priceServicio = Servicio?.reduce((acum,current) => {
        return acum  + parseInt(current.Precio)
    },0)

    const totalStore = priceLenceria+priceAdultos+priceDrogueria+priceSouvenir+priceSnacks+priceBebidas+ priceServicio
 
    const totalObject = totalStore ? totalStore.toLocaleString() :0

    const now = moment().format("YYYY/MM/DD")
       
    const cart =[]

    const sinIva =[]

    cart.push({
        name:`${resultDashboard.Noches} Noches `,
        price:`${resultDashboard.valor_habitacion} `
    })

    for(let i =0;i<data?.length;i++){
        if(isChecked){
            cart.push({
                name:` ${data[i].Cantidad} ${data[i].Nombre_producto}`,
                price:data[i].Precio,
                pago_deuda:data[i].pago_deuda
            })
        }
            sinIva.push({
                name:`${data[i].Cantidad} ${data[i].Nombre_producto}`,
                price:data[i].Precio,
                pago_deuda:data[i].pago_deuda
            })
    }
    
    const [query,setQuery] = useState()

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data?.query))
    },[])


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

    const sinIvaCart  = sinIva?.reduce((acum,current) =>{
        return      acum  + parseInt( current.price)
    },0)

    const persona  = searchFilter?.filter(index => index.type_people =="Persona Natural")
    const juridica = searchFilter?.filter(index => index.type_people =="Persona Juridica")

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda= searchFilter.filter((elemento,index)=>{
            if(elemento?.name_people.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
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

    const valor_habitacion =  resultDashboard.valor_habitacion
    const iva =  parseInt(valor_habitacion *19/100)
        
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',  
        currency: 'COP',
        minimumFractionDigits: 0
    })

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

    const  dataCount = to?.find(index => index.ID_hotel == jwt.result.id_hotel)


    var curr = new Date(resultDashboard?.Fecha_inicio);
    curr.setDate(curr.getDate());
    var fecha_inicio = curr.toISOString().substring(0,10);

    var currOne = new Date(resultDashboard?.Fecha_final);
    currOne.setDate(currOne.getDate());
    var fecha_final = currOne.toISOString().substring(0,10);

    useEffect(()  =>{
        fetch(`${config.serverRoute}/api/resecion/resolucion`)
        .then(res => res.json())
        .then(data => setTo(data?.query))
    },[])

    const handUpdateStatus =() =>{
      const  adeudado =  parseInt(resultDashboard.valor_abono)
      const pago = parseInt(resultDashboard.valor_habitacion)

      if(adeudado >= pago){
        handOpenInvoince()
      }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '<p>Habitacion adeudada</p>',
            showConfirmButton: false,
            timer: 2000
          })   
      }
    }
    const numberPhone = resultDashboard?.codigo +""+ resultDashboard?.Celular

    const totalNumberPhone = numberPhone.replace("+","")

    const fullName =   resultDashboard.Nombre +" "+ resultDashboard.Apellido

    const hancCheckout =async() => {
        ServePdf({ codigoReserva:resultDashboard?.Num_documento,Nombre:resultDashboard?.Nombre,room:resultFinish?.nombre,adults:resultDashboard?.Adultos,children:resultDashboard?.Ninos,tituloReserva:resultDashboard?.Nombre,abono:resultDashboard?.valor_abono,formaPago:resultDashboard?.forma_pago,telefono:resultDashboard.Celular,identificacion:resultDashboard.Num_documento,correo:resultDashboard.Correo,urllogo:jwt?.result?.logo,tarifa:resultDashboard.valor_habitacion,entrada:fecha_inicio,salida:fecha_final}).then(index=>{
            fetchDataApiWhatsapp({phone:totalNumberPhone,name:fullName,hotel:jwt.result.hotel,factura:index[0]})
        })
        if(resultDashboard.Estado==3){
            postDetailRoom({id:resultDashboard.ID_Habitaciones,ID_estado_habitacion:5})
            ServiceStatus({id,ID_Tipo_Estados_Habitaciones:1}).then(index=>{
                ServiceResolution({Resolucion:dataCount.Resolucion+1,ID:dataCount.ID}).then(index=>{
                    ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Check out realizado tipo habitacion ${resultFinish?.nombre} ${resultDashboard.Numero}`,id:jwt.result.id_hotel}).then(index =>{
                    }).catch(e =>{
                        console.log(e)
                    })
                }).catch(e =>{
                    console.log(e)
                })
          
            }).catch(e =>{
                console.log(e)
            })
        }
           
       
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

    const porcentajeIVA = 0.19; // 19%

    const ivaOne = numOne * porcentajeIVA;

    var totalIvaPerson =numOne - ivaOne;

    const totalNum = resultDashboard.Iva == 1 ? totalIvaPerson : numOne;

    const formattedNum = resultDashboard.tipo_persona === "empresa" ? totalIvaPerson : totalNum;

    const Iva  = numOne*19/100

    const resultNum = totalStore  ? totalStore : 0 

    const totalIva = numOne + Iva +resultNum
    
    const validFilterSearch =  filterSearch?.id ==5 ? numOne  +resultNum : totalIva

    const valorTotalIva = totalIvaPerson +ivaOne ;

    const formatoIva = ivaOne.toLocaleString();

    var formatteOne = totalStore.toLocaleString();

    const [factura,setFactura] = useState(false)    

    let timerInterval
    const handServiFormularios =() =>{
        if(filterSearch) {
            ServiceFormulariosCheckout({id:filterSearch.id,status:"2",fecha_ingreso:fechaInicio,fecha_salida:FechaFinal,valortotal:validFilterSearch}).then(index =>{
                setFactura(true)
                setComprobante(true)
               setTimeout(() =>{
                Swal.fire({
                    title: 'Se hara Check out',
                    html: 'Cargando Check out',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                      const b = Swal.getHtmlContainer().querySelector('b')
                      timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                      }, 100)
                    },
                    willClose: () => {
                      clearInterval(timerInterval)
                    }
                  }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      console.log('I was closed by the timer')
                      hancCheckout()
                    
                    }
                  })
               
               },2000)
                console.log(index)
            }).catch(e => {
                setFactura(false)
                console.log(e)
            }) 
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>Selecione empresa para continuar</p>',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }
    
    const pagoInvoince =resultDashboard.forma_pago

    const totalAbono =  parseInt(resultDashboard.valor_abono)

    const totalAobonoDecimal =totalAbono.toLocaleString();

    const  handClickCheckout =UseModalText({handlModal:handUpdateStatus,Text:"Estas seguro de que desea hacer Check Out ?"})

    const handSendFactura =() =>{
        confirmAlert({
            title: '',
            message: 'Enviar factura electronica llega al correo electronico 3  dias',
            buttons: [
              {
                label: 'Si',
                onClick: () => handServiFormularios()
              },
              {
                label: 'No',
                onClick: () => console.log("no")
              }
            ]
          });
    }


    function handleOnChange(event) {
        setIsChecked(!isChecked);
      }

    const fechaFinal= moment(resultDashboard?.Fecha_final).utc().format('YYYY/MM/DD')

    

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
                                <CiUser  className="ri-icon-user-One-two-two "  fontSize={70}   color="black"  />    
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
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad personas:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad noches: </li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Tipo habitacion:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Valor por noche:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Descuento:</li> 
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Abono:</li>   
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
                                            <li className="totalPricecheckout-two" >{0}</li>     
                                            <li className="totalPricecheckout-two" >{0}</li>                
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
                                          
                                            <span className="no-price" >$</span>        <span className="price-store" >{formattedNum.toLocaleString()} <span className="no-price" > COP</span>  </span> 

                                            <CiBank className="ri-icon-user-One"  fontSize={70}   color="black"  />   
                                            {filterSearch?.id !=5  ? 
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Sub total: </span> <span> {formattedNum.toLocaleString()}</span> 
                                            </div>
                                           : null}

                                           
                                            {filterSearch?.id !=5  ? 
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Iva: </span><span>{formatoIva}</span>
                                            </div>
                                            : null}

                                                {filterSearch?.id !=5  ? 
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Valor total:</span> <span>{valorTotalIva.toLocaleString()} </span>
                                            </div>
                                              : null}
                                            
                                          </li>
                                          
                                        </ul>  
                                    </div>
                            </div>
                </div>

              <div className="container-checkout-border" >
                        <div className="container-store-checkout-three forme-treeh" >
                                <div>
                                    <ul>
                                       {MenuItems.map(index => (
                                         <li className="totalPricecheckout-two-finish negrita let-persona" >{index?.name}:</li>
                                       ))}              
                                    </ul>                 
                                </div>
                                <div className="re-tow-definish" >
                                    <ul>
                                        <li className="totalPricecheckout" >${priceBebidas ?priceBebidas : 0 }</li>           
                                        <li className="totalPricecheckout" >${priceSnacks ?priceSnacks :0}</li>           
                                        <li className="totalPricecheckout" >${priceSouvenir ?priceSouvenir :0}</li>           
                                        <li className="totalPricecheckout" >${priceDrogueria ?priceDrogueria:0}</li>   
                                        <li className="totalPricecheckout" >${priceAdultos ?priceAdultos :0}</li>   
                                        <li className="totalPricecheckout" >${priceLenceria ?priceLenceria :0}</li>       
                                        <li className="totalPricecheckout" >${priceServicio ?priceServicio :0}</li>                
                                    </ul>  
                                </div>

                                <hr className="row-hr" />
                                   <div className={`${totalObject ? "re-two-one-two " : "re-two"}`}   >
                                        <ul>
                                           {sinIva.map(index =>(
                                               <div className="carts-invoince one-flex-one">
                                                    <li className={`totalPricecheckout ${index.pago_deuda ==0  ? "pay-checkout-pago-deudado-One" :"pay-checkout-pago-pagado-One" } `} >{index.pago_deuda ==0 ?<span>Adeudado</span>:<span >Pagado</span> }</li>
                                                   <li className="totalPricecheckout" >{index.name}</li>        
                                                   <li className="totalPricecheckout" >{index.price}</li>   
                                                     
                                               </div>       
                                           ))}
                                      </ul>     
                                           
                                   </div>
       
                                <div>
                                        <ul>
                                             <li>
                                           
                                          </li>
                                            <li className="relative-total">
                                            <div className="to-hospedaje" >
                                                <span  >Tienda hotel</span>
                                            </div>
                                                
                                                <span className="no-price" >$</span><span className="price-store" >{totalObject} <span className="no-price" >COP</span>  </span>
                                          </li>
                                          <CiShop  className="ri-icon-user-Two"  fontSize={70}   color="black"   />   
                                        </ul>  
                                    </div>
                            </div>   
                    </div>
            <div className="container-store-checkout-two">
                    <div className="container-flex-buttton-checkout" >    
                            <div className="button-checkout" onClick={handSendFactura} >
                                <button>Check out y enviar factura electronica</button>
                            </div>
                        </div>
                    </div>
                    {comprobante && <FacturaCompany Room={resultFinish}
                        validFilterSearch={validFilterSearch}
                        formattedNum={formattedNum}
                        formatoIva={formatoIva}
                        valorTotalIva={valorTotalIva}
                        Valor_dia_habitacion={resultDashboard}
                        resultFinish={resultFinish}
                        filterSearch={filterSearch}
                        resultDashboard={resultDashboard}
                        comprobante={comprobante}
                        setComprobante={setComprobante} 
                        priceBebidas={priceBebidas}
                        priceSnacks={priceSnacks}
                        priceSouvenir={priceSouvenir}
                        priceDrogueria={priceDrogueria}
                        priceAdultos={priceAdultos}
                        priceLenceria={priceLenceria}
                        totalStore={totalStore}
                        jwt={jwt}/>}
            </div>
         }
        </>
    )
    else{
        return (
            <>
              {invoince  && <Invoince           
                                        resultDashboard={resultDashboard}
                                        tienda={false}
                                        sinIvaCart={sinIvaCart}
                                        dataCount={dataCount}
                                        setInvoice={handCloseInvoince} 
                                        carts={cart}
                                        priceCart={totalPrice}
                                        client={resultDashboard?.Nombre}
                                        lastname={resultDashboard?.Apellido} 
                                        identification={resultDashboard?.Num_documento}
                                        raiting={pagoInvoince}
                                        loading={loading}
                                        handLoading={handLoading}
                                        handLoadingOne={handLoadingOne}
                                        hancCheckout={hancCheckout} 
                                        fechaFinal={fechaFinal}/>}

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
                                <CiUser  className="ri-icon-user"  fontSize={70}   color="black"  /> 
                            </div>

                <div className="container-checkout-border" >
                            <div className="container-store-checkout-three" >
                                    <div className="op">
                                        <ul>
                                        <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad personas:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Cantidad noches: </li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Tipo habitacion:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Valor por noche:</li>   
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Descuento:</li> 
                                            <li className="totalPricecheckout-two-finish-one negrita let-persona" >Abono reserva:</li>   
                                        </ul>                 
                                    </div>
                                    <div className="ri-two">
                                        <ul>
                                            <li>{resultDashboard?.Adultos + resultDashboard?.Ninos }</li>           
                                            <li className="totalPricecheckout-two" >{resultDashboard?.Noches } Noches</li>           
                                            <li className="totalPricecheckout-two" >{resultFinish?.nombre}</li>           
                                            <li className="totalPricecheckout-two" >{toPriceNoche?.price}</li>   
                                            <li className="totalPricecheckout-two" >{count}</li>   
                                            <li className="totalPricecheckout-two" >COP {totalAobonoDecimal}</li>               
                                        </ul>  
                                    </div>
                                  
                                    <div>
                                        <ul>
                                             <li>
                                           
                                          </li>
                                            <li>
                                            <div className="to-hospedaje" >
                                                <span >Hospedaje hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span>  <span className="price-store" >{formattedNum.toLocaleString()} <span className="no-price" >COP</span>  </span>
                                          </li>

                                         
                                          <CiBank className="ri-icon-user-One"  fontSize={70}   color="black"  />    
                                        {resultDashboard.Iva ==1 && <div>                                          
                                          <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Sub total: </span> <span> {formattedNum.toLocaleString()}</span> 
                                            </div>
                                          
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Iva: </span><span>{formatoIva}</span>
                                            </div>
                                          
                                            <div className="to-hospedaje-one" >
                                                <span className="negrita"  >Valor total:</span> <span>{valorTotalIva.toLocaleString()} </span>
                                            </div>
                                        </div> }

                                          
                                        </ul>  
                                        
                                    </div>  
                        </div>
                       
                </div>

                <div className="container-checkout-border" >
                            <div className="container-store-checkout-three forme-treeh " >
                                    <div>
                                        <ul>
                                        {MenuItems.map(index => (
                                            <li className="totalPricecheckout-two-finish negrita let-persona" >{index?.name}:</li>
                                        ))}     

                                         <div className="container-checkbox" >
                                                <input   type="checkbox" 
                                                        className={`checkbox-round  ${isChecked && "checkbox-round-click"} `}
                                                        onChange={handleOnChange}       
                                                        checked={isChecked} /> Incluir tienda 
                                                
                                        </div>          
                                        </ul>                 
                                    </div>
                                    <div className="re-tow-definish">
                                        <ul>
                                            <li className="totalPricecheckout" >${priceBebidas ?priceBebidas : 0 }</li>           
                                            <li className="totalPricecheckout" >${priceSnacks ?priceSnacks :0}</li>           
                                            <li className="totalPricecheckout" >${priceSouvenir ?priceSouvenir :0}</li>           
                                            <li className="totalPricecheckout" >${priceDrogueria ?priceDrogueria:0}</li>   
                                            <li className="totalPricecheckout" >${priceAdultos ?priceAdultos :0}</li>   
                                            <li className="totalPricecheckout" >${priceLenceria ?priceLenceria :0}</li>    
                                            <li className="totalPricecheckout" >${priceServicio ?priceServicio :0}</li>                
                                        </ul>                 
                                    </div>
                                            <hr className="row-hr" />
                                    <div className={`${totalObject ? "re-two-one-two " : "re-two"}`} >
                                         <ul>
                                            {sinIva.map(index =>(
                                                <div className="carts-invoince one-flex-one">
                                                     <li className={`totalPricecheckout ${index.pago_deuda ==0  ? "pay-checkout-pago-deudado-One" :"pay-checkout-pago-pagado-One" } `} >{index.pago_deuda ==0 ?<span>Adeudado</span>:<span >Pagado</span> }</li>   
                                                    <li className="totalPricecheckout" >{index.name}</li>        
                                                    <li className="totalPricecheckout" >{index.price}</li>   
                                                   
                                                </div>       
                                            ))}
                                       </ul>     
                                            
                                    </div>

                                    

                                    <div>
                                  
                                        <ul>
                                             <li>
                                           
                                          </li >
                                            <li className="relative-total ">
                                            <div className="to-hospedaje" >
                                                <span  >Tienda hotel</span>
                                            </div>
                                          
                                            <span className="no-price" >$</span><span className="price-store" >{formatteOne =="NaN"?0:formatteOne} <span className="no-price" >COP</span>  </span>
                                          </li>
                                          <CiShop  className="ri-icon-user-Two"  fontSize={70}   color="black"   />   
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
           

            <div className="container-store-checkout-two" onClick={handClickCheckout.handModalText} >
                <div className="container-flex-buttton-checkout" >    
                        <div className="button-checkout-one-one"  >
                            <div className="inke-in" > 
                                <img width={20} className="ro-img"  src="https://medellin47.com/ico_pms/qout.svg" alt="" /> <span> Check out </span> 
                            </div>
                        </div>
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
        
            format:  [600, 600 ]
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

const FacturaCompany  =({validFilterSearch,valorTotalIva,formatoIva,formattedNum,jwt,totalStore,Room,Valor_dia_habitacion,resultFinish,comprobante,setComprobante,filterSearch,priceBebidas,priceSnacks,priceSouvenir,priceDrogueria,priceAdultos,priceLenceria}) =>{
    let docToPrint = React.createRef();
    let startDate = new Date(Valor_dia_habitacion.Fecha_inicio);
    let startDateOne = new Date(Valor_dia_habitacion.Fecha_inicio);
    let endDate = new Date(Valor_dia_habitacion.Fecha_final);
    const toPrice = parseInt(Valor_dia_habitacion?.valor_dia_habitacion)
    const valor_dia = UsePrice({number:toPrice})

    let month = startDate.toLocaleString("default", { month: "long" });
    let mes = startDate.getDate()
    let year = startDate.getFullYear()
  
    let monthOne = endDate.toLocaleString("default", { month: "long" });
    let mesOne = endDate.getDate()
    let yearOne = endDate.getFullYear()

    const rayDate = []
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        let month = date.toLocaleString("default", { month: "long" });
     
            rayDate.push({
            Fecha:(date.getDate()+" " +month) ,
            Room:Room?.nombre,
            Price:valor_dia.price
            })
    }   
    const fecha =  startDateOne.toISOString().split('T')[0]
    const fechaOne = endDate.toISOString().split('T')[0]

    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input,{scale:0.8}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            
            format:  [500, 900 ]
        });
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output("dataurlnewwindow");
        pdf.save("Up4-receipt.pdf");
        });
    };
    setTimeout(() =>{
        printDocument()
    },1000  )


    setTimeout(() => {
        setComprobante(false)
    }, 2000);
    
  const totalAll = Valor_dia_habitacion?.valor_dia_habitacion * rayDate?.length
  const toPriceAll = UsePrice({number:totalAll})
  const url ="data:image/png;base64,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"
  const codigo ="data:image/png;base64,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"

  const valoTotal = parseInt(Valor_dia_habitacion.valor_habitacion) 
  
  const to =jwt.result

  const Iva = valoTotal*19/100
  
  const total = valoTotal+totalStore

  const toPriceIva = Iva
    
  const toStore =totalStore

  const totalConIVA =  valoTotal+ totalStore+ Iva

  let Num1 = totalConIVA.toLocaleString();
  let Num2 = toPriceIva.toLocaleString();
  let Num3 = total.toLocaleString();

  const valorNetuno = validFilterSearch.toLocaleString();

    return (
     <>
      <div className="container-pdf-flex" ref={docToPrint}>
        <div>

        </div>
        <div  className="global-factura" style={{
          borderRadius: "5px",
        }} >
        <div className="container-flex-comorobante" >
            <div className="text-center" >
                    <h4>Precuenta</h4>
                    <div className="top-flex-pdf negrita" >
                        <span>HOTEL FLORENCIA PLAZA</span>
                    </div>
                    <div className="top-flex-pdf" >
                        <span>NIT 900768373-3</span>
                    </div>
                    
                    <div className="top-flex-pdf" >
                        <span>CRR 41A No 10-41 Poblado medellin</span>
                    </div>
                    <div className="top-flex-pdf" >
                        <span>305 3638733</span>
                    </div>
                    <div className="top-flex-pdf" >
                        <span>www.florenciaplaza.com</span>
                    </div>  
                </div>

                <div>
                    <img width={200} src={url} alt="" />
                    <div>   
                        <span>Elaboro</span>
                    </div>
                        <div>
                            <span>{to?.name}</span>
                        </div>   
                </div>
            </div>
           
          <div>

        <div className="to-resumen">

            <span className="negrita-pdf" >Resumen factura enviada al correo electronico:</span> <span>{filterSearch?.email_people}</span>
        </div>
        <div className="relative-codigo" >
        <img src={codigo} alt="" />
      </div>

        <div>
            <div className="flex-container-pdf">
                <div>
                    <div className="container-checkout-border  margin-top-pdf-definish" >
                        <div className="container-store-checkout-three-pdf wid-border-pdf" >
                                <div className="op">
                                    <ul>
                                        <li className="totalPricecheckout-two-finish-one negrita let-persona" >Empresa:</li>   
                                        <li className="totalPricecheckout-two-finish-one negrita  let-persona" >Nit: </li>   
                                        <li className="totalPricecheckout-two-finish-one negrita let-persona" >Correo:</li>    
                                    </ul>                 
                                </div>
                                <div className="ri-two">
                                <div className="op">
                                    <ul>
                                        <li className="totalPricecheckout-two-finish-one  let-persona" >{filterSearch?.name_people}</li>   
                                        <li className="totalPricecheckout-two-finish-one   let-persona" >{filterSearch?.num_id}</li>   
                                        <li className="totalPricecheckout-two-finish-one  let-persona" >{filterSearch?.email_people}</li>    
                                    </ul>                 
                                </div>
                            </div>
                            <div className="op">
                                    <ul>
                                        <li className="totalPricecheckout-two-finish-one negrita let-persona" >Telefono:</li>   
                                        <li className="totalPricecheckout-two-finish-one negrita  let-persona" >Direccion: </li>   
                                        
                                    </ul>                 
                                </div>
                                <div className="ri-two">
                                <div className="op">
                                    <ul>
                                        <li className="totalPricecheckout-two-finish-one  let-persona" >{filterSearch?.number_people}</li>   
                                        <li className="totalPricecheckout-two-finish-one   let-persona" >{filterSearch?.direccion_people}</li>   
                                    
                                    </ul>                 
                                </div>
                            </div>

                        </div>     
                    </div> 
                    <div className="container-checkout-border" >
                                <div className="container-store-checkout-three-pdf wid-border-pdf" >
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Fecha de ingreso:</li>   
                                            </ul>                 
                                        </div>
                                        <div className="ri-two">
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{mes} {month} {year}</li>   
                                            </ul>                 
                                        </div>
                                    </div>

                                    <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Fecha de salida:</li>   
                                                    
                                                
                                            </ul>                 
                                        </div>
                                        <div className="ri-two">
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >{mesOne} {monthOne} {yearOne} </li>   
                                            
                                            </ul>                 
                                        </div>
                                    </div>

                                </div>  
                    </div>
                    
                </div>
                  
                </div>

                <div className="container-checkout-border" >
                                <div className="container-store-checkout-three-pdf " >
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Cantidad Personas:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Cantidad noches:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Tarifa por noche:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Tipo pago:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Tipo habitacion:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >P: adicionales</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Horas adicional:</li> 
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Early check in::</li>   
                                            </ul>                 
                                        </div>
                                        <div className="me">
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{Valor_dia_habitacion?.Adultos + Valor_dia_habitacion?.Ninos}</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{Valor_dia_habitacion?.Noches}</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{Valor_dia_habitacion?.valor_dia_habitacion}</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{Valor_dia_habitacion?.forma_pago}</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >{resultFinish?.nombre}</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >0</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >0</li>   
                                                <li className="totalPricecheckout-two-finish-one  let-persona" >0</li>   
                                            </ul>                 
                                        </div>
                                    </div>

                                    <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Bebidas:</li>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Snaks:</li>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Souvenir:</li>   
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Drogueria:</li>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Adultos:</li>
                                                <li className="totalPricecheckout-two-finish-one negrita let-persona wid-fecha" >Lenceria multas:</li>
                                            </ul>                 
                                        </div>
                                        <div className="ri-two">
                                        <div className="op">
                                            <ul>
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceBebidas ?priceBebidas : 0 }</li> 
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceSnacks ?priceSnacks :0}</li>  
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceSouvenir ?priceSouvenir :0}</li>  
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceDrogueria ?priceDrogueria:0}</li>  
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceAdultos ?priceAdultos :0}</li>  
                                                <li className="totalPricecheckout-two-finish-one   let-persona" >${priceLenceria ?priceLenceria :0}</li>   
                                            </ul>                 
                                        </div>
                                    </div>

                                </div> 
                    </div>
            </div>
          </div>
        </div> 
            <div className="container-checkout-border" >
                <div className="container-store-checkout-three-pdf  relative-price " >
                        <div className="op">
                        {filterSearch?.id !=5  ? 
                            <ul>
                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Sub total::</li> 
                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Iva:</li> 
                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Valor total:</li>   
                            </ul>   
                            :
                            <ul>
                                <li className="totalPricecheckout-two-finish-one negrita let-persona  wid-fecha " >Valor total:</li>   
                            </ul>   
                        }              
                        </div>
                        <div className="me">
                        <div className="op">
                        {filterSearch?.id !=5  ? 
                            <ul>
                                <li className="totalPricecheckout-two-finish-one " >Cop {formattedNum.toLocaleString()}</li>   
                                <li className="totalPricecheckout-two-finish-one  " >Cop {formatoIva}</li>   
                                <li className="totalPricecheckout-two-finish-one  " >Cop {valorTotalIva.toLocaleString()}</li>   
                            </ul>   
                        : <ul>
                                <li className="totalPricecheckout-two-finish-one " >Cop {valorNetuno}</li>    
                        </ul>  }              
                        </div>
                     
                    </div>
                </div> 
            </div>
      </div>
      </>)
}