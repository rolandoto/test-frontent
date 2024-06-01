import React from "react";

const CardCheckoutInformationHuesped =({Username,lastname,Document,Email,Phone,Nationalidad,Typerson}) =>(
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r">
        <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
            <p className="text-black"><span class="font-semibold text-black">Nombre:</span> {Username} {lastname}</p>
            <p className="text-black"><span class="font-semibold text-black">Documento:</span> {Document}</p>
            <p className="text-black"><span class="font-semibold text-black">Correo:</span> {Email}</p>
        </div>
        <div class="p-4  bg-white rounded-lg shadow-md  bg-gradient-to-r ">
        <div className=" p-4 bg-white rounded-lg shadow-md bg-gradient-to-r  to-sky-500 from-blue-700"></div>
            <p className="text-black"><span class="font-semibold ">Teléfono:</span> {Phone}</p>
            <p className="text-black"><span class="font-semibold">Nacionalidad:</span> {Nationalidad}</p>
            <p className="text-black"><span class="font-semibold">Tipo persona:</span> {Typerson}</p>
        </div>
    </div>

)


export default CardCheckoutInformationHuesped

