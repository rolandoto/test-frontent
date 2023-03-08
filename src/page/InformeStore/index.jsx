import React, { useState } from "react"
import CardStore from "../../component/DetailStore/CardStore"
import InputStore from "../../component/DetailStore/InputStore"
import TableStore from "../../component/DetailStore/TableStore"
import Input from "../../Ui/Input"
import Selected from "../../Ui/Select"

const InformeStore =() =>{

    const id = "13"

    const [change,setChange] =useState({
        id_hotel:id,
        category:"",
        name:"",
        amount:"",
        price:"",
    })   

    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }
    

    const array = [1]
    
    return (
        <>            
            <ul className="flex-stores" >
                
                <Selected  title="Tipos Categoria" 
                            change={handleInputChange}
                            state={array}
                            name="category"
                             />

                <Input
                    title="Desde" 
                    name="name" 
                    type="date"
                    change={handleInputChange} />

                <Input  
                    title="hasta" 
                    name="amount" 
                    type="date"
                    change={handleInputChange} />

                <li>
                    <button className="button-stores-admin-One"  >
                        Buscar
                    </button>
                </li>   
                <li>
                    <button className="button-stores-admin-One" >
                        Imprimir
                    </button>
                </li>       
            </ul> 
                <div className="container-bicta">
                        <tbody>
                            <table className="de">
                                <tr>
                                    <th>Poducto</th>
                                    <th>Inv inicial</th>
                                    <th>Inv actual</th>
                                    <th>Reintegro</th>
                                    <th>Cant disponible</th>
                                    <th>Cant Venta</th>
                                    <th>Precio compra</th>
                                    <th>Precio venta</th>
                                    <th>Total venta</th>
                                </tr>
                            </table>
                    </tbody>
                </div>
            </>

    )


}

export default InformeStore