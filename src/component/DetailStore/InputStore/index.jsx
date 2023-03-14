import moment from "moment"
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import HttpClient from "../../../HttpClient"
import ServiceInsertProductAdmin from "../../../service/ServiceInsertProductAdmin"
import ServiceTypeCategorys from "../../../service/ServiceTypeCategorys"
import Input from "../../../Ui/Input"
import Selected from "../../../Ui/Select"

const InputStore = ({id,fetchData}) => {

    const history = useHistory()

    const [state,setState] = useState()
 
    useEffect(() =>{
        ServiceTypeCategorys().then(index =>{
            setState(index)
        })
    }, [setState])

    const [change,setChange] =useState({
        id_hotel:id,
        category:"",
        name:"",
        amount:"",
        price:"",
        Precio_compra:""

    })   

  

    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }
    
    const  now = moment().format("YYYY/MM/DD");

    const handSubmitProduct =async() =>{
        try {
            const postStore=  await HttpClient.PostAdminStore({ID_Hoteles:change.id_hotel,ID_Tipo_categoria:change.category,Nombre:change.name,Cantidad:change.amount,Precio:change.price,Fecha_registro:now,Precio_compra:change.Precio_compra}).then(index =>{
                console.log(index)
                fetchData()
            }).catch(e =>{
                console.log(e)
            })
        } catch (error) {
            console.log("error")
        }
    }   

    const handNextHistory =() =>{
        history.push(`/informeStore/${id}`)
    }
    
    return (
        <>
            <ul className="flex-stores" >
                
                <Selected   title="Categoria" 
                            change={handleInputChange}
                            state={state?.query}
                            name="category"
                             />
                <Input  
                    title="Producto" 
                    name="name" 
                    type="text"
                    change={handleInputChange} />

                <Input  
                    title="Cantidad" 
                    name="amount" 
                    type="text"
                    change={handleInputChange} />

                <Input  
                    title="Precio" 
                    name="price" 
                    type="text"
                    change={handleInputChange} />

                    <Input  
                    title="Precio compra" 
                    name="Precio_compra" 
                    type="text"
                    change={handleInputChange} />

                <li>
                    <button className="button-stores-admin" onClick={handSubmitProduct} >
                        Agregar
                    </button>
                </li>   
                <li>
                    <button className="button-stores-admin" onClick={handNextHistory} >
                        Informe
                    </button>
                </li>       
                
            </ul> 
        </>
    )
}

export default InputStore