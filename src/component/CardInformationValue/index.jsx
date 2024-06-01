import React from "react";
import UseRoundRention from "../../hooks/UseRoundRention";

const CardinformationValue =({CountPerson,Nigth,nameRoom,Price,Pass,Total,Iva,ValorTotal,ValidIva,Retention,ValuePass}) =>{
  
    const {SubtotalDian,TotalRetentionDian,TotalPay,TotalIva} =UseRoundRention({Price:ValuePass})

    const mensajeRetencion = Retention === 0  ? (
        <div class="mt-4">
            <p class="text-2xl font-bold text-gray-800">COP {Total}</p>
            {ValidIva ==1 && 
            <div class="mt-4">
                <p class="text-1xl text-gray-500">IVA: {Iva}</p>
                <p class="text-1xl text-gray-500">Valor total:{ValorTotal}</p>
            </div>}
        </div>
    ): (<div class="mt-4">
            {ValidIva ==1 && 
            <div class="mt-4">
                <p class="text-1xl text-gray-500">Sub total: {parseInt(SubtotalDian).toLocaleString()}</p>
                <p class="text-1xl text-gray-500">IVA 19%: {parseInt(TotalIva).toLocaleString()}</p>
                <p class="text-1xl text-gray-500">Retefuente 3.5%: {parseInt(TotalRetentionDian).toLocaleString()}</p>
                <p class="text-1xl text-gray-500">Valor total:{parseInt(TotalPay).toLocaleString()}</p>
            </div>
                }
        </div>)


    return (<div class="p-4   bg-white rounded-lg shadow-md mb-6">
                <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
                    <h2 class="text-xl font-semibold mb-4">Hospedaje hotel</h2>
                    <p><span class="font-semibold">Cantidad personas:</span> {CountPerson}</p>
                    <p><span class="font-semibold">Cantidad noches:</span> {Nigth } </p>
                    <p><span class="font-semibold">Tipo habitación:</span> {nameRoom}</p>
                    <p><span class="font-semibold">Valor por noche:</span> {Price}</p>
                    <p><span class="font-semibold">Descuento:</span> 0</p>
                    <p><span class="font-semibold">Abono reserva:</span>{Pass}</p>
                  

                     {mensajeRetencion}
                <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
            </div>)
}

export default CardinformationValue