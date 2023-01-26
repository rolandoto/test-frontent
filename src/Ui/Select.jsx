import React from "react";

const Selected =({title,change,state,name,value}) =>{

    return (
        <li>
            <label className="title-stores" >{title}</label>
            <select onChange={change}  
                    name={name}
                    value={value}
                    className='select-hotel-type'
            >
                <option >Seleccionar {title}</option>
                {state?.map(category =>(
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
    )   
}
export default Selected