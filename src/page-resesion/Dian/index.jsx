import React, { useContext, useEffect, useState } from "react";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import HttpClient from "../../HttpClient";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import useDianActions from "../../action/useDianActions";
import { useDispatch, useSelector } from "react-redux";

const Dian =() => {

    const {jwt,Dian} = useContext(AutoProvider)
    const dispatch =useDispatch()
    const {loading,error,ListClient} = useSelector((state) => state.Dian)
    const {GetCLientDian} = useDianActions()

    const [username,setUsername] =useState("")

    const handChange =(e) =>{
        setUsername(e.target.value)
    }


    const fetchData =async() =>{
        await  GetCLientDian({token:Dian.access_token})
    }

    useEffect(() =>{
        fetchData()
    },[])


    const filtrarSearching = (terminoBusqueda) => {
        let resultadosBusqueda = ListClient?.results?.filter((elemento, index) => {
            // Filtrar por término de búsqueda
            const condicionBusqueda = elemento.identification?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento?.name[0]?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento?.name[1]?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                                      elemento.full_name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase());
    
            // Filtrar por rango de fechas
            let condicionFechas = true;
          
    
            // Retornar elemento si cumple con ambas condiciones
            return condicionBusqueda && condicionFechas;
        });
    
        return { resultadosBusqueda };
    };


    const {resultadosBusqueda}  = filtrarSearching(username)

    return (
        <div className="container-bicta" >
                <div className="contain-search">
                    <ul className="flex-bedrooms-search">   
                            <li>
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        onChange={handChange}
                                        value={username}
                                        placeholder="Buscar cliente si esta registrado" />
                            </li>   
                            
                                  
                            <table  className="de table"  >
                                <tbody class="tbody  body-cliente"  > 
                                            <thead >
                                                <tr>    
                                                    <th>Nombre completo</th>
                                                    <th>Tipo identificacion</th>
                                                    <th>Identificación</th>
                                                    <th>Digito verificacion</th>
                                                    <th>Sucursal</th>
                                                    <th>Tipo de regimen IVA</th>
                                                    <th>Direccion</th>
                                                    <th>Ciudad</th>
                                                    <th>Telefono</th>
                                                    <th>Nombre contacto</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            {resultadosBusqueda?.map(index =>{
                                                const fullName= `${index.name[0]} ${index.name[1]} `
                                                
                                                const typeIdentification =  index.id_type.name
                                                
                                                const resulActive =index.active ? "Activo" : "no Activado"

                                                const vat_responsible = index.vat_responsible ? "Responsable de IVA	" :"No responsable de IVA"

                                                const address=`${index.address.address}`

                                                const city = `${index.address.city.country_name}`

                                                const phone  = `${index.phones[0].number}`

                                                const nameContact = `${index.contacts[0].first_name} ${index.contacts[0].last_name} `
                                            
                                                    return (
                                                        <tr    >
                                                            <td className="width-informe"  >{fullName}</td>
                                                            <td className="width-informe"  >{typeIdentification}</td>
                                                            <td className="width-informe" >{index.identification}</td>
                                                            <td className="width-informe" >{index.check_digit}</td>
                                                            <td>{index.branch_office}</td>
                                                            <td>{vat_responsible}</td>
                                                            <td>{address}</td>
                                                            <td>{city}</td>
                                                            <td>{phone}</td>
                                                            <td>{nameContact}</td>
                                                            <td>{resulActive}</td>
                                                    </tr>
                                                    )
                                                }
                                            )}

                                            
                                            </tbody>
                                            <tr  className="search-Client"  >
                                                    <td>Crear nuevo</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                            </table>
        
                    </ul>
                </div>          
        </div>
    )
}

export default Dian