import React, { useEffect, useRef } from "react"
import UseUsers from "../../hooks/UseUser"

const TableBictacoras =({children,bicta}) =>{
    let da =""
    let start = false
    const weekday = ["Domingo" ,"Lunes","Martes", "Miércoles", "Jueves", "Viernes", "Sabado"]
    let countData = bicta.length
    let html = "";
    let htmlFinal = "";
    const {jwt} = UseUsers()

    return (
        <>
            {bicta.map((index,e) =>{
                let today = new Date(index.fecha)
                console.log(index.fecha)
                let day = weekday[today.getDay()]
                const t = today.toISOString().split('T')[0]
                countData= countData -1
                if (start && t != da ) {
                    start = false
                    html += `<div></table>`;
                }
                if( t != da ) {
                    html += `<table key={${e}} >    
                                     <tr>
                                        <th class="Button-bicta">
                                            ${t} - ${day} - ${jwt.result.hotel}
                                        </th>
                                    <tr> 
                                <tr>
                                    <th>Reporta</th>
                                    <th>Hora</th>
                                    <th>Lugar</th>
                                    <th>Descripcion</th>
                                </tr>
                                <tr>
                                    <td>${index.nombre}</td>  
                                    <td>${index.hora}</td>   
                                    <td>${index.ubicacion}</td> 
                                    <td>${index.descripcion}</td>
                                </tr> 
                            `;
                    da = t;
                    start = true       
                } else {
                    html += `
                            <tr>
                                <td>${index.nombre}</td>  
                                <td>${index.hora}</td>   
                                <td>${index.ubicacion}</td> 
                                <td>${index.descripcion}</td>
                            </tr>
                           `;
                            da = t;
                }

                if ( countData == 0 ) {
                    start = false

                    html += `</table>`;

                    htmlFinal = html;
                    html = "";
                }
      
                return (
                    <>
                        <div className="container-bicta" >
                            <table className="de"  dangerouslySetInnerHTML={{__html: htmlFinal}}/>
                        </div>  
                    </>
                )
            })}
        </>    
    )
}   

export default TableBictacoras
