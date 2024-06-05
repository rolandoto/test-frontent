import React from "react";
import UseRoundRention from "../../hooks/UseRoundRention";

const CardinformationValue =({CountPerson,Nigth,nameRoom,Price,Pass,ValuePass}) =>{
  
    const {TotalPay} =UseRoundRention({Price:ValuePass})


    return (<div class="p-4   bg-white rounded-lg shadow-md mb-6">
                <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
                    <h2 class="text-xl font-semibold mb-4">Hospedaje hotel</h2>
                    <p><span class="font-semibold">Cantidad personas:</span> {CountPerson}</p>
                    <p><span class="font-semibold">Cantidad noches:</span> {Nigth } </p>
                    <p><span class="font-semibold">Tipo habitación:</span> {nameRoom}</p>
                    <p><span class="font-semibold">Valor por noche:</span> {Price}</p>
                    <p><span class="font-semibold">Descuento:</span> 0</p>
                    <p><span class="font-semibold">Abono reserva:</span>{Pass}</p>
                    <p><span class="text-2xl font-bold text-gray-800">Valor Pagar:{parseInt(TotalPay).toLocaleString()}</span> </p>
                <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
            </div>)
}

export default CardinformationValue