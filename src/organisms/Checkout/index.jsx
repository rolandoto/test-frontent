import React, { Fragment, useContext, useEffect, useState } from "react"
import "./style.css"
import moment from "moment"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import { useParams } from "react-router-dom"
import Invoince from "../../component/Invoince"
import {  config } from "../../config"
import UsePrice from "../../hooks/UsePrice"
import ServiceStatus from "../../service/ServiceStatus"
import ServiceResolution from "../../service/serviceResolution"
import ServiceInfomeMovimiento from "../../service/ServiceInformeMovimiento"
import UseModalText from "../../hooks/UseModalText"
import ButtonBack from "../../component/ButtonBack"
import ButtonHome from "../../component/ButtonHome"
import toast from "react-hot-toast"
import useSocket from "../../hooks/UseSocket"
import IconsUser from "../../component/IconUser"
import CardCartChekout from "../../component/CardCartChekout"
import CardCheckoutInformationHuesped from "../../component/CardCheckoutInformationHuesped"
import CardinformationValue from "../../component/CardInformationValue"

const CheckoutOrganism =({DetailDashboard,postDetailRoom,fetchDataApiWhatsapp}) =>{

    const socket = useSocket();
    const resultDashboard = DetailDashboard[0] 
    const {id} = useParams()
    const {jwt} = useContext(AutoProvider)
    const [data,setDate] =useState()
    const [invoince,setInvoice] =useState(false)
    const [isChecked, setIsChecked] = useState(true);
    const [to,setTo] =useState()


    const [query,setQuery] = useState()

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getcartreservaction/${id}`)
        .then(resp => resp.json())
        .then(data =>setDate(data.query)  )
        fetch(`${config.serverRoute}/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data?.query))
    },[setDate])

    const bebidas  = data?.filter(index => index.ID_Categoria ==1)    
    const Snacks  = data?.filter(index => index.ID_Categoria ==2)    
    const Souvenir  = data?.filter(index => index.ID_Categoria ==3)    
    const Drogueria  = data?.filter(index => index.ID_Categoria ==4)    
    const Adultos  = data?.filter(index => index.ID_Categoria ==5)    
    const Lenceria  = data?.filter(index => index.ID_Categoria ==6)    
    const Servicio  = data?.filter(index => index.ID_Categoria ==7)    

    const priceBebidas = bebidas?.reduce((acum,current) => {
        return acum  +  parseInt(current.Precio)
    },0)

    const priceSnacks = Snacks?.reduce((acum,current) => {
        return acum  +  parseInt(current.Precio)
    },0)

    const priceSouvenir = Souvenir?.reduce((acum,current) => {
        return acum  +  parseInt(current.Precio)
    },0)

    const priceDrogueria = Drogueria?.reduce((acum,current) => {
        return acum  +  parseInt(current.Precio)
    },0)

    const priceAdultos = Adultos?.reduce((acum,current) => {
        return acum  +  parseInt(current.Precio)
    },0)

    const priceLenceria = Lenceria?.reduce((acum,current) => {
        return acum  + parseInt(current.Precio)
    },0)

    const priceServicio = Servicio?.reduce((acum,current) => {
        return acum  + parseInt(current.Precio)
    },0)

    const priceLenceriaTotal = parseFloat(priceLenceria) || 0;
    const priceAdultosTotal = parseFloat(priceAdultos) || 0;
    const priceDrogueriaTotal = parseFloat(priceDrogueria) || 0;
    const priceSouvenirTotal = parseFloat(priceSouvenir) || 0;
    const priceSnacksTotal = parseFloat(priceSnacks) || 0;
    const priceBebidasTotal = parseFloat(priceBebidas) || 0;
    const priceServicioTotal = parseFloat(priceServicio) || 0;

    const prices = [
        priceLenceriaTotal,
        priceAdultosTotal,
        priceDrogueriaTotal,
        priceSouvenirTotal,
        priceSnacksTotal,
        priceBebidasTotal,
        priceServicioTotal
    ];

  
    const totalStore = prices.reduce((total, price) => total + price, 0);
    
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
   

    const handCloseInvoince =() =>{
        setInvoice(false)
    }

    const handOpenInvoince =() =>{
           setInvoice(true)
    }
    
 
    const totalPrice = cart?.reduce((acum,current) =>{
        return      acum  + parseInt( current.price)
    },0)

    const sinIvaCart  = sinIva?.reduce((acum,current) =>{
        return      acum  + parseInt( current.price)
    },0)

    const totalPersona =  resultDashboard?.tipo_persona =="persona"?"Natural":"Juridica"

    const valor_habitacion =  resultDashboard.valor_habitacion
    const iva =  parseInt(valor_habitacion *19/100)
        
    const [loading,setLoading] =useState(false)

    const handLoading =() =>{
        setLoading(true)
    }

    const handLoadingOne =() =>{
        setLoading(false)
    }

    const  dataCount = to?.find(index => index.ID_hotel == jwt.result.id_hotel)

    useEffect(()  =>{
        fetch(`${config.serverRoute}/api/resecion/resolucion`)
        .then(res => res.json())
        .then(data => setTo(data?.query))
    },[])

    const handUpdateStatus =() =>{
      const  adeudado =  parseInt(resultDashboard.valor_abono)
      const pago = parseInt(resultDashboard.valor_habitacion)
        if(!sinIva.find(debt => debt.pago_deuda === 0)){
            if(adeudado == pago){
                handOpenInvoince()
            }else{
                toast.error("Habitacion adeudada")
                }
        }else{
            toast.error("Minibar adeudada")
        }
    }
    
    const hancCheckout =async() => {
        try {
           await ServiceResolution({Resolucion:dataCount.Resolucion+1,ID:dataCount.ID})
           await ServiceInfomeMovimiento({Nombre_recepcion:jwt.result.name,Fecha:now,Movimiento:`Check out realizado tipo habitacion ${resultDashboard?.nombre_habitacion} ${resultDashboard.Numero}`,id:jwt.result.id_hotel,Valor_habitacion:"0",Codigo_reserva:id})
            if(resultDashboard.Estado==3){
               await postDetailRoom({id:resultDashboard.ID_Habitaciones,ID_estado_habitacion:5})
               await ServiceStatus({id,ID_Tipo_Estados_Habitaciones:6})
            }
            socket.emit("sendNotification","photo");
            toast.success("exitoso")
        } catch (error) {
        toast.error("error")
         }
    }

    const toPriceNoche = UsePrice({number:resultDashboard.valor_dia_habitacion})
    const numOne = parseInt(resultDashboard?.valor_habitacion)
    var totalIvaPerson =numOne /1.19;
    const ivaOne = totalIvaPerson * 19/100;
    const totalNum = resultDashboard.Iva == 1 ? totalIvaPerson : numOne;
    const formattedNum = resultDashboard.tipo_persona === "empresa" ? totalIvaPerson : totalNum;
    const valorTotalIva = totalIvaPerson +ivaOne ;
    const formatoIva = resultDashboard.Iva === 1 ? ivaOne.toLocaleString() : 0;
    var formatteOne =   totalStore.toLocaleString();


    const pagoInvoince =resultDashboard.forma_pago
    const totalAbono =  parseInt(resultDashboard.valor_abono)
    const totalAobonoDecimal =totalAbono.toLocaleString();
    const  handClickCheckout =UseModalText({handlModal:handUpdateStatus,Text:"Estas seguro de que desea hacer Check Out ?"})

    function handleOnChange() {
        setIsChecked(!isChecked);
    }
    
    const fechaFinal= moment(resultDashboard?.Fecha_final).utc().format('YYYY/MM/DD')

    return (<>
                {invoince  && <Invoince           
                resultDashboard={resultDashboard}
                tienda={false}
                formatoIva={formatoIva}
                formattedNum={formattedNum}
                valorTotalIva={valorTotalIva}
                sinIvaCart={sinIvaCart}
                dataCount={dataCount}
                setInvoice={handCloseInvoince} 
                carts={cart}
                priceCart={totalPrice}
                client={resultDashboard?.Nombre}
                lastname={resultDashboard?.Apellido} 
                identification={resultDashboard?.Num_documento}
                nacionalidad={resultDashboard?.nacionalidad}
                correo={resultDashboard?.Correo}
                raiting={pagoInvoince}
                loading={loading}
                handLoading={handLoading}
                handLoadingOne={handLoadingOne}
                hancCheckout={hancCheckout} 
                fechaFinal={fechaFinal}
                totalStore={totalStore}/>}

                        <IconsUser  Username={jwt.result.name} />
                        <ButtonBack/>
                        <ButtonHome/>
                         <div class="w-full max-w-96 mx-auto p-6 ">
                            <CardCheckoutInformationHuesped 
                                Username={resultDashboard?.Nombre}
                                lastname= {resultDashboard?.Apellido}
                                Document={resultDashboard?.Num_documento}
                                Email={resultDashboard?.Correo}
                                Phone= {resultDashboard.Celular}
                                Nationalidad={resultDashboard.nacionalidad}
                                Typerson={totalPersona}
                             />

                        <CardinformationValue
                                CountPerson={query?.length}
                                Nigth={resultDashboard?.Noches}
                                nameRoom= {resultDashboard?.nombre_habitacion}
                                Price={toPriceNoche?.price}
                                Pass={totalAobonoDecimal}
                                Total={formattedNum.toLocaleString()}
                                Iva={formatoIva}
                                ValidIva={resultDashboard.Iva}
                                ValorTotal={valorTotalIva?.toLocaleString()}
                                Retention={resultDashboard.Retention}
                                ValuePass={resultDashboard.valor_abono}
                                />

                        <div class="p-4   bg-white rounded-lg  shadow-md mb-6">
                            <div className="flex  " > 
                                <div className="" >
                                    <h2 class="text-xl font-semibold mb-8">Tienda hotel</h2>
                                    <p><span class="font-semibold">Bebidas:</span> ${priceBebidas ?parseInt(priceBebidas).toLocaleString() : 0 }</p>
                                    <p><span class="font-semibold">Snacks:</span> ${priceSnacks ?parseInt(priceSnacks).toLocaleString() :0}</p>
                                    <p><span class="font-semibold">Souvenir:</span> ${priceSouvenir ?parseInt(priceSouvenir).toLocaleString() :0}</p>
                                    <p><span class="font-semibold">Aseo p.:</span> ${priceDrogueria ?parseInt(priceDrogueria).toLocaleString():0}</p>
                                    <p><span class="font-semibold">Adultos:</span> ${priceAdultos ?parseInt(priceAdultos).toLocaleString() :0}</p>
                                    <p><span class="font-semibold">Lencería multas:</span> ${priceLenceria ?parseInt(priceLenceria).toLocaleString() :0}</p>
                                    <p><span class="font-semibold">Servicio:</span> ${priceServicio ?priceServicio :0}</p>
                                    <div class="mt-4">
                                        <p class="text-2xl font-bold text-gray-800">Total ${formatteOne =="NaN"?0:formatteOne}</p>
                                    </div>
                                </div>
                        <div className="ml-10 rounded-lg ">
                                <h2 class="text-xl font-semibold">Carrito</h2>
                                {sinIva.map(index =>(
                                <  CardCartChekout nameProduct={index.name} Price={index.price}    />
                                ))} 
                            </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md mb-6">
                            <label class="flex items-center space-x-3">
                                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600"
                                 onChange={handleOnChange}  
                                 checked={isChecked}  />
                                <span class="text-gray-700">Incluir tienda</span>
                            </label>
                        </div>
                        <div class="text-center" >
                            <button class="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800"
                             onClick={handClickCheckout.handModalText}>Check Out</button>
                        </div>
                    </div>
            </>
    )
}

export default CheckoutOrganism
