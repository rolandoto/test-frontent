import React, { useContext, useState, useEffect } from "react"
import HttpClient from "../../../HttpClient"
import ServiceInsertProductAdmin from "../../../service/ServiceInsertProductAdmin"
import ServiceTypeCategorys from "../../../service/ServiceTypeCategorys"
import Input from "../../../Ui/Input"
import Selected from "../../../Ui/Select"


const InputStore = ({id,fetchData}) => {

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

    })   

    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }
    
    const handSubmitProduct =async() =>{
        try {
            const postStore=  await HttpClient.PostAdminStore({ID_Hoteles:change.id_hotel,ID_Tipo_categoria:change.category,Nombre:change.name,Cantidad:change.amount,Precio:change.price}).then(index =>{
                console.log(index)
                fetchData()
            }).catch(e =>{
                console.log(e)
            })
        } catch (error) {
            console.log("error")
        }
    }   


    return (
        <>
            <ul className="flex-stores" >
                
                <Selected   title="Tipos Categoria" 
                            change={handleInputChange}
                            state={state?.query}
                            name="category"
                             />

                <Input  
                    title="Nombre del producto" 
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

                <li>
                    <button className="button-stores" onClick={handSubmitProduct} >
                        Agregar
                    </button>
                </li>       
                
            </ul> 
        </>
    )
}

export default InputStore