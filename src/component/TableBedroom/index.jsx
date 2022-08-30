import React, { useState } from "react"
import { useEffect } from "react"






const TableBedRoom =({id}) =>{
    const [results,setResults] = useState();


    const Prueba = ({re}) =>{
        
            const url = `https://grupohoteles.co/api/getTypeRoomByID?id_tipo_habitacion=2`
            return fetch(url)
            .then(res => res.json())
            .then(data => data)
     }
     
    const [state,setState] = useState()

    useEffect(() =>{
        fetch(`http://localhost:4000/api/admin/getroomsadmin/${id}`)
        .then(resp => resp.json())
        .then(data => setState(data))
        resultls()
    },[])

    const pokemonsArray = [];
         
    const resultls = async () => {
    
          for await (const index of state.customer) {
            pokemonsArray.push(index.ID_Tipo_habitaciones)
          }
      };
    
    
      //console.log(results)
    return (
        <div className="container-table" >
            <table className="table" >
                <tr>
                    <th>Tipo de habitacion</th>
                    <th>tipo de estado</th>
                    <th>Numero o Nombre</th>
                    <th>Precio</th>
                    <th>Precio persona adicional</th>
                    <th>Cantidad de personas</th>
                    <th>Cantidad maximos de personas</th>
                </tr>

                    {state?.customer.map(index =>{
                       
                       let dataTypeRoom = Prueba(index.ID_Tipo_habitaciones);
                        console.log(dataTypeRoom)
                        return (
                            <tr>
                                <td>{index.nombreEstado}</td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )

}
export default TableBedRoom