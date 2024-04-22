import React  from "react";


const CardDetailPorcentaje =({className, NumberPorcentaje,title,porcentaje}) =>{

    return (
        <ul className="container-detail-pocentaje" >
            <li> <div class={className}></div></li>
            <li>{NumberPorcentaje}</li>
            <li>{title} </li>
            <li>{porcentaje}%</li>
        </ul>
    )

}

export default CardDetailPorcentaje