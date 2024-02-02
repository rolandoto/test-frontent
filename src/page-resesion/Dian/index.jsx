import React, { useContext, useEffect, useState } from "react";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import HttpClient from "../../HttpClient";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import useDianActions from "../../action/useDianActions";
import { useDispatch, useSelector } from "react-redux";

const Dian =() => {

    const [select,setSelect] =useState([])
    const {jwt,Dian} = useContext(AutoProvider)
    const dispatch =useDispatch()
    const {loading,error,ListClient,typeDocumentDian,seller,products} = useSelector((state) => state.Dian)
    const {GetCLientDian,GetTypeDian,GetTSeller,GetTProductsDian} = useDianActions()

    const [username,setUsername] =useState("")

    const handChange =(e) =>{
        setUsername(e.target.value)
    }

    const fetchData =async() =>{
        await  GetCLientDian({token:Dian.access_token})
        await  GetTypeDian({token:Dian.access_token})
        await  GetTSeller({token:Dian.access_token})
        await  GetTProductsDian({token:Dian.access_token})
    }

   
    const body = {
        document: {
          id: 24446
        },
        date: '2024-02-02',
        customer: {
          person_type: select?.person_type,
          id_type: select?.person_type?.code,
          identification:select?.identification,
          branch_office: 0,
          name: select?.name,
          address: {
            address:select?.address,
            city: select?.city,
            postal_code: select?.postal_code
          },
          phones:select?.phones,
          contacts:select?.contacts
        },
        cost_center: 235,   
        seller: 35071,
        stamp: {
          send: true
        },
        mail: {
          send: true
        },
        observations: 'nigundasnjkdadnaskdnsadnjaskj',
        items: [
          {
            code: 'Item-1',
            description: 'Camiseta de algodón',
            quantity: 1,
            price: 1069.77,
            discount: 0.0,
            taxes: [
              {
                id: 13156
              }
            ],
          }
        ],
        payments: [
          {
            id: 5636,
            value: 1273.03,
            due_date: '2021-03-19'
          }
        ],
        additional_fields: {}
      };
      
    
    useEffect(() =>{
        fetchData()
    },[])

    console.log({products})

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


    const hanClickRooms =(item) =>{
   
        setSelect(item);
    }

    console.log(select)

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
                                                        <tr   onClick={() =>hanClickRooms(index)}    >
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