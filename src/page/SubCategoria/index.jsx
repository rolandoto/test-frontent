import React, { useEffect, useState } from "react"
import { config } from "../../config"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import ServiceTypeCategorys from "../../service/ServiceTypeCategorys"
import Input from "../../Ui/Input"
import { toast } from "react-hot-toast";
import HttpClient from "../../HttpClient"
import { Button } from "@nextui-org/react"
const SubCategoria =() =>{

    const {id} = useParams()
    const [subCategory,setSubcategory]= useState()
    const [state,setState] = useState()
    const [loading,setLoading] =useState(false)
    useEffect(() =>{
        ServiceTypeCategorys().then(index =>{
            setState(index)
        })
    }, [setState,loading])

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/admin/getSubProduct`)
        .then(resp => resp.json())
        .then(data => setSubcategory(data))
    },[loading])

    const [change,setChange] =useState({
        Product:"",
        Tipo_categoria:"",
    })   

    const handSubmit=() =>{
        setLoading(true)
        HttpClient.PostClienInsertStoreSubcategory({Product:change.Product,Tipo_categoria:change.Tipo_categoria}).then(index =>{
            toast.success("exitoso")
           
            setLoading(false)
        }).catch((e) =>{
            setLoading(false)
            console.log(e)
            toast.error("error")
        })
    }

    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }

    return (<>
                <ul className="flex-stores" >
                    <li>
                            <label className="title-stores" >Categoria</label>
                            <select onChange={handleInputChange}  
                                    name="Tipo_categoria"
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
                    
                        <Input  
                    title="Producto" 
                    name="Product" 
                    type="text"
                    change={handleInputChange} />

                <li>
                    <Button onClick={handSubmit} disabled={loading}  className="button-stores-admin"   >
                        Agregar
                    </Button>
                </li>  
            </ul> 

            
          

            <div className="container-table-One" >
                
           
            <table   className="table" >
                <tr>
                    <th>Product</th>
                    <th>Tipo categoria</th>
                </tr>

                {subCategory?.query?.map((item) =>{
                const findProduct=  state?.query.find(itemCategroty => itemCategroty.ID== item.Tipo_categoria )
                return  <tr>
                            <td>{item.Product}</td>
                            <td>{findProduct?.nombre}</td>
                        </tr> 
                })}   
                        
            </table>
            </div>
            </>)

}

export default SubCategoria