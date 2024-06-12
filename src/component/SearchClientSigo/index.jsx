import React from "react"



const SearchClient =({  sumWithInitial,searchTerm,handleChange,resultDashboard,typeIva }) =>{

    return (
        <div >
        <h2 class="text-2xl font-semibold mb-4">Facturacion electronica</h2>
            <h2 class="text-2xl font-semibold mb-4">Buscador de Clientes</h2>
            <div class="mb-4">
                <label for="search" class="block text-gray-700 mb-2">Buscar cliente si está registrado</label>
                <input type="text"
                 value={searchTerm}
                onChange={handleChange}  id="search" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Ingrese nombre o documento" />
                          </div>
                   
            <div>
                <p class="text-gray-700 mb-2">Por favor elija la persona a la que enviará la factura electrónica que sea la correcta</p>
                <table class="min-w-full bg-white border border-gray-300 rounded-md">

                        <tr>
                            <th class="px-4 py-2 border-b">Iva</th>
                            <th class="px-4 py-2 border-b">Nacionalidad</th>
                            <th class="px-4 py-2 border-b">Documento</th>
                            <th class="px-4 py-2 border-b">Nombre</th>
                            <th class="px-4 py-2 border-b">Apellido</th>
                            <th class="px-4 py-2 border-b">Valor Habitación</th>
                        </tr>
            
                        <tr class="bg-gray-50">
                            <td class="text-gray-700">{typeIva ? "si" : "no"}</td>
                            <td class="text-gray-700">{resultDashboard.nacionalidad}</td>
                            <td class="text-gray-700">{resultDashboard.Num_documento}</td>
                            <td class="text-gray-700">{resultDashboard.Nombre}</td>
                            <td class="text-gray-700">{resultDashboard.Apellido}</td>
                            <td class="text-gray-700">${parseInt(sumWithInitial).toLocaleString()}</td>
                          
                        </tr>
                  
                </table>
            
            
            
        </div>
    </div>
    )
}

export default SearchClient