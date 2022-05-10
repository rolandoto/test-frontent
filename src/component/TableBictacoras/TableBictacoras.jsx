import React, { useEffect, useRef } from "react"
import UseUsers from "../../hooks/UseUser"


const TableBictacoras =({bicta}) =>{
    let da =""
    let entro = false
    const weekday = ["Domingo" ,"Lunes","Martes", "Miércoles", "Jueves", "Viernes", "Sabado"]
    let countData = bicta.length
    let html = "";
    let htmlFinal = "";
    const {jwt} = UseUsers()
    
    return (
        <>
            {bicta.map((index,e) =>{
                let today = new Date(index.date)
                let day = weekday[today.getDay()]
                const t = today.toISOString().split('T')[0]
                countData= countData -1
                if ( entro && t != da ) {
                    entro = false
                    html += `<div></table>`;
                }
                if( t != da ) {
                    html += `<table>    
                                     <tr>
                                            <th class="Button-bicta">
                                                ${t} - ${day} - ${jwt.result.hotel}
                                            </th>
                                      
                                    <tr> 
                                <tr>
                                        <th>Reporta</th>
                                        <th>Hora</th>
                                        <th>Lugar</th>
                                        <th>Descripcion</th
                                </tr>
                                <tr>
                                    <td>${index.name}</td>  
                                    <td>${index.time}</td>   
                                    <td>${index.lugar}</td> 
                                    <td>${index.description}</td>
                                </tr> 
                            `;
                    da = t;
                    entro = true       
                } else {
                    html += `
                                <tr>
                                    <td>${index.name}</td>  
                                    <td>${index.time}</td>   
                                    <td>${index.lugar}</td> 
                                    <td>${index.description}</td> 
                                </tr>
                           `;
                            da = t;
                }

                if ( countData == 0 ) {
                    entro = false

                    html += `</table>`;

                    htmlFinal = html;
                    html = "";
                }
      
                return (
                    <>
                        <div >
                            <table className="de"  dangerouslySetInnerHTML={{__html: htmlFinal}}/>
                        </div>
                    </>
                )
            })}
      
        </>    
    )
}   

export default TableBictacoras
