import { Button, Checkbox } from "@nextui-org/react"
import React from "react"


const TableClientDian =({ListClient,select,handleSelectChange,handleSelectDelete,loadingInvoinces,isSelected,handleCheckboxChange}) =>{

    return (<>  
            {ListClient?.results?.length >0 ?( 
            <div className="bg-green-50 border-l-4 border-green-400  rounded-md shadow-md" role="alert">
            <div className=" ">
                <p className="font-semibold">¡Resultados encontrados!  </p>
                    <div className="mt-6">
                        
                            <table className="min-w-full  rounded-md">
                                <tr>
                                <th className="px-4 py-2 bg-green-50 border-b">Avatar</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Nombre Completo</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Tipo de ID</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Estado</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Responsable de IVA</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Dirección</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Ciudad</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Teléfono</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Nombre del Contacto</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Acciones</th>
                                    <th className="px-4 py-2 bg-green-50 border-b">Acciones</th>
                                    </tr>
                                {ListClient?.results?.map((itemClient) =>{
                                    const fullName= `${itemClient.name[0]} ${itemClient.name[1]} `
                                    const typeIdentification =  itemClient.id_type.name
                                    const resulActive =itemClient.active ? "Activo" : "no Activado"
                                    const vat_responsible = itemClient.vat_responsible ? "Responsable de IVA	" :"No responsable de IVA"
                                    const address=`${itemClient.address.address}`
                                    const city = `${itemClient.address.city.country_name}`
                                    const phone  = itemClient?.phones?.[0]?.number
                                    const nameContact = `${itemClient.contacts[0]?.first_name} ${itemClient.contacts[0]?.last_name} `
                                    return (
                                    <tr   key={itemClient.id} className="bg-gray-50">
                                       
                                        <td className="px-4   font-semibold bg-green-50  py-2 border-b"> <img className=" w-9 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /></td>
                                        <td className="px-4   font-semibold bg-green-50  py-2 border-b"> {fullName}</td>
                                        <td className="px-4 font-semibold bg-green-50  py-2 border-b">{typeIdentification}</td>
                                        <td className="px-4 font-semibold bg-green-50  py-2 border-b">{resulActive}</td>
                                        <td className="px-4 font-semibold bg-green-50  py-2 border-b">{vat_responsible}</td>
                                        <td className="px-4 font-semibold   bg-green-50  py-2 border-b">{address}</td>
                                        <td className="px-4 font-semibold   bg-green-50  py-2 border-b">{city}</td>
                                        <td className="px-4  font-semibold   bg-green-50    py-2 border-b">{phone}</td>
                                        <td className="px-4  font-semibold bg-green-50  py-2 border-b">{nameContact}</td>
                                        <td className="px-4  font-semibold bg-green-50  py-2 border-b ">
                                        <Checkbox 
                                                size="sm" 
                                                color="success" 
                                                onClick={handleCheckboxChange}
                                                disabled={loadingInvoinces}
                                                defaultSelected
                                                checked={isSelected}
                                                disableAnimation
                                                  
                                                lineThrough>
                                            <span> Aplicar Retefuente</span> 
                                        </Checkbox>
                                        </td>
                                            <td className="px-4 py-2 border-b bg-green-50 ">
                                            {select.id == itemClient.id ?   <Button
                                                                color={"error"}
                                                                disabled={loadingInvoinces}
                                                                className="px-2 py-1 bg-yellow-500 text-white rounded ml-2"
                                                                onClick={() => handleSelectDelete(itemClient)}
                                                                            >Eliminar</Button>
                                                    :   <Button
                                                    disabled={loadingInvoinces}
                                                    className="px-2 py-1 bg-yellow-500 text-white rounded ml-2"
                                                    onClick={() => handleSelectChange(itemClient)}
                                                >Selecionar</Button>}
                                            </td>  
                                    </tr>
                                    )
                                })}
                            </table>
                        </div>
                        </div>
                    </div>
                    ): 
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-semibold">¡Resultados no encontrado encontrados!</p>
                    </div>
                    }
                           </>)

}

export default TableClientDian