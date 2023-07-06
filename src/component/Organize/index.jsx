import React from "react";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";


const Organize =({setOrganize,handModalInvoice,handRaiting,raiting,setClient,client,setIndentification,identification}) =>{
    
    const iduser = [
        {
          id: 1,
          name: "Efectivo",
          imgSrc:
          "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
        },
        {
          id: 6,
          name: "T.Debito",
          imgSrc:
             "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
        } ,
        {
          id: 7,
          name: "T.Credito",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1_Mesa-06.png?raw=true",
        },
        {
            id: 2,
            name: "Consignaciones",
            imgSrc:
              "https://github.com/rolandoto/image-pms/blob/main/1_Mesa-06.png?raw=true",
          }
      ];

    const [error,setError] =useState(false)

    var valoresAceptados = /^[0-9]+$/

    const verifyForm =  (e) => {
        setError(false)
        e.preventDefault()
        if(!identification?.match(valoresAceptados)||identification.length<3){
            setError(true)
        }else if(client.length<3){
            setError(true)   
        }else{
            handModalInvoice()
        }
    }
    return (
        <div className="border-ri" >
            <div className="content-Modal" >
                    <div className="handclose" onClick={() => setOrganize(false)}>
                        <IoMdCloseCircle   fontSize={30} color="black" />
                    </div>
                        <form  className="form-login" onSubmit={verifyForm}> 
                                <input type="text"
                                        placeholder="Nombre Cliente"
                                        className='inputglobal'
                                        value={client}
                                        onChange={(e) => setClient(e.target.value)}
                                        />
                                        {error && <span className="error">minimo de 3</span>}
                                            <input type="text"
                                                    placeholder="C.C"
                                                    className='inputglobal' 
                                                    value={identification}
                                                    onChange={(e)=>setIndentification(e.target.value)}
                                        />
                                        {error && <span className="error"  >no es un nuemero</span>}
                                            <select onChange={handRaiting}  
                                                    value={raiting} 
                                                    className='select-hotel' >
                                                    <option disabled >raiting tuype</option>
                                                    <option  >Selecione</option>
                                                    {iduser.map(category =>(
                                                        <option 
                                                        value={category.id}   
                                                        key={category.id}>
                                                        {category.name}
                                                    </option>
                                                    )
                                                    )}
                                            </select>
                                            <button className='button-login'>
                                                    Facturar
                                            </button>
                        </form>     
            </div>
        </div>
    )

}

export default Organize