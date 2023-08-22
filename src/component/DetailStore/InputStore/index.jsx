import moment from "moment"
import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { config } from "../../../config"
import HttpClient from "../../../HttpClient"
import  AutoProvider  from "../../../privateRoute/AutoProvider"
import ServiceInsertProductAdmin from "../../../service/ServiceInsertProductAdmin"
import ServiceTypeCategorys from "../../../service/ServiceTypeCategorys"
import Input from "../../../Ui/Input"
import Selected from "../../../Ui/Select"

const InputStore = ({id,fetchData}) => {

    const history = useHistory()
    const {jwt} = useContext(AutoProvider)

    const [state,setState] = useState()
    const [subCategory,setSubcategory]= useState()
 
    useEffect(() =>{
        ServiceTypeCategorys().then(index =>{
            setState(index)
        })
    }, [setState])

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/admin/getSubProduct`)
        .then(resp => resp.json())
        .then(data => setSubcategory(data))
    },[])

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

    console.log(change)
    
    const  now = moment().format("YYYY/MM/DD");

    const handSubmitProduct =async() =>{
        try {
            const postStore=  await HttpClient.PostAdminStore({ID_Hoteles:change.id_hotel,ID_Tipo_categoria:change.category,Nombre:change.name,Cantidad:change.amount,Precio:change.price,Fecha_registro:now,Precio_compra:change.Precio_compra,Nombre_Recepcion:jwt.result.name}).then(index =>{
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

    const totlaFilter =  subCategory?.query?.filter(index =>  index.Tipo_categoria  == change.category)

    console.log(totlaFilter)

    return (
        <>
            <ul className="flex-stores" >
                    <li>
                            <label className="title-stores" >Categoria</label>
                            <select onChange={handleInputChange}  
                                    name="category"
                                    className="select-hotel-type-three-three"
                            >
                                <option >Selecionar Categoria</option>
                                {state?.query.map(category =>(
                                    <option 
                                    value={category.ID}   
                                    key={category.ID}
                                >
                                    {category.nombre}
                                </option>
                                )
                                )}
                            </select>
                        </li>
                                
                            <li>
                        <label className="title-stores" >Producto registrado</label>
                        <select onChange={handleInputChange}  
                          name="name" 
                                className='select-hotel-type-three-three'
                        >
                            <option >Selecionar Producto</option>
                            {totlaFilter?.map(category =>(
                                <option 
                                value={category.Product}   
                                key={category.ID}
                            >
                                {category.Product}
                            </option>
                            )
                            )}
                        </select>
                    </li>

                <Input  
                    title="Cantidad" 
                    name="amount" 
                    type="text"
                    change={handleInputChange} />

                <Input  
                    title="Precio venta" 
                    name="price" 
                    type="text"
                    change={handleInputChange} />

                <Input  
                    title="Precio compra unidad" 
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