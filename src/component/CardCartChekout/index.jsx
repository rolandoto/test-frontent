import React from "react"

const CardCartChekout =({nameProduct,Price}) =>(
<div class="flex items-start  ">
    <img src="https://raw.githubusercontent.com/rolandoto/image-pms/main/servicio.png" alt="Training shoes" class="w-8 h-8 mr-4"/>
        <h3 class="text-lg font-medium">{nameProduct}   ${parseInt(Price).toLocaleString()}</h3>
    <div className="divide-y divide-slate-700"></div>
</div>  
)

export default CardCartChekout