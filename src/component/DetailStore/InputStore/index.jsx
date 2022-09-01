import React, { useContext, useState, useEffect } from "react"
import ServiceInsertProductAdmin from "../../../service/ServiceInsertProductAdmin"
import ServiceTypeCategorys from "../../../service/ServiceTypeCategorys"

const InputStore = ({id}) => {

    const [state,setState] = useState()
    const [loading,setLoading] =useState({loading:false,error:false})

    useEffect(() =>{
        ServiceTypeCategorys().then(index =>{
            setState(index)
        })
    }, [setState])


    const [category, setCategory] = useState()
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [price, setPrice] = useState();
    
    const handCategory =(e)=>{
        setCategory(e.target.value)
    } 

    const handChangeName=(e) =>{
        setName(e.target.value)
    }

    const handChangeAmount = (e) => {
        setAmount(e.target.value);
    }

    const handChangePrice = (e) => {
        setPrice(e.target.value);
    }

    
    
    const handSubmitProduct =() =>{
        setLoading(({loading:true}))
        ServiceInsertProductAdmin({ ID_Tipo_categoria: category, ID_Hoteles: id, Nombre: name, Cantidad: amount, Precio: price }).then(index =>{
            setLoading({loading:false});
            alert("guardado");
            setName('');
            setAmount('');
            setPrice('');
        }).catch(e =>{
            setLoading({error:true})
        })
    }

    return (
        <>
            <ul className="flex-stores" >
                {loading.error && <h1>error al Guardar</h1>}
                {loading.loading && <h1> Guardardo</h1>}

                <li>
                    <label className="title-stores" >Tipo de categoria</label>
                    <select onChange={handCategory}  
                            value={category} 
                            className='select-hotel-type'
                    >
                        <option disabled>Seleccionar categoria</option>
                        {state?.query?.map(category =>(
                            <option 
                            value={category.ID}   
                            key={category.ID}
                        >
                            {category.Nombre}
                        </option>
                        )
                        )}
                    </select>
                </li>
                <li>
                    <label className="title-stores">Nombre producto</label>
                    <input className="input-stores" value={name}  type="text" onChange={handChangeName} />
                </li>
                <li>
                    <label className="title-stores">Cantidad</label>
                    <input className="input-stores" value={amount}  type="text" onChange={handChangeAmount} />
                </li>
                <li>
                    <label className="title-stores">Precio</label>
                    <input className="input-stores" value={price}  type="text" onChange={handChangePrice} />
                </li>
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