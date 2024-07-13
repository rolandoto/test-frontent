
import React, { useContext, useEffect, useState,useMemo, useCallback  } from "react";
import { useHistory, useParams } from "react-router-dom";
import Container from "../../Ui/Container";
import ServicetypeRooms from "../../service/ServicetypeRooms";
import moment from "moment";
import ServiceUpdatePersonas from "../../service/ServiceUpdatePersonas";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { config } from "../../config";
import ServiceUpdateReservation from "../../service/ServiceUpdatereservation";
import UseDocument from "../../hooks/useDocument";
import ButtonBack from "../../component/ButtonBack";
import { useSelector } from "react-redux";
import UseCitySigoActions from "../../action/useCitySigoActions";
import PageBack from "../../component/PageBack";
import { StyleContainerLoadingCLoudbeds } from "../../stylecomponent/StyleMenu";
import ContentLoader from "react-content-loader";
import UseDianActions from "../../action/useDianActions";
import { Button } from "@nextui-org/react";


function calcularDV(cedula) {
    // Secuencia de multiplicación
    const secuencia = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43];
    let suma = 0;
    
    // Convertir la cédula a string y revertirla
    const cedulaStr = cedula.toString().split('').reverse().join('');
    
    // Multiplicar cada dígito por el número correspondiente en la secuencia
    for (let i = 0; i < cedulaStr.length; i++) {
      suma += parseInt(cedulaStr[i]) * secuencia[i % secuencia.length];
    }
    
    // Calcular el residuo de la suma dividida por 11
    const residuo = suma % 11;
    
    // Restar el residuo de 11 para obtener el dígito de verificación
    const dv = 11 - residuo;
    
    // Si el resultado es 10 o mayor, el dígito de verificación es 0
    return dv >= 10 ? 0 : dv;
  }

const LoadingSkeleton =(props) =>{
    return (      <ContentLoader height={1000} width={700} >
        <circle cx="25" cy="50" r="25" />
        <circle cx="25" cy="150" r="25" />
        <circle cx="25" cy="250" r="25" />
        <circle cx="25" cy="330" r="25" />
      
       
        <rect x="60" y="30" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="50" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="50" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="50" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="50" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="70" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="70" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="70" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="70" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="70" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="70" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="130" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="150" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="150" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="150" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="150" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="170" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="170" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="170" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="170" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="170" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="170" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="230" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="250" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="250" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="250" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="250" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="270" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="270" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="270" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="270" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="270" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="270" rx="5" ry="5" width="60" height="15" />
  
        <rect x="60" y="310" rx="5" ry="5" width="220" height="15" />
        <rect x="60" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="140" y="330" rx="5" ry="5" width="90" height="15" />
        <rect x="240" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="320" y="330" rx="5" ry="5" width="60" height="15" />
        <rect x="390" y="330" rx="5" ry="5" width="50" height="15" />
        <rect x="450" y="330" rx="5" ry="5" width="70" height="15" />
        <rect x="60" y="350" rx="5" ry="5" width="60" height="15" />
        <rect x="130" y="350" rx="5" ry="5" width="80" height="15" />
        <rect x="220" y="350" rx="5" ry="5" width="90" height="15" />
        <rect x="320" y="350" rx="5" ry="5" width="100" height="15" />
        <rect x="380" y="350" rx="5" ry="5" width="50" height="15" />
        <rect x="440" y="350" rx="5" ry="5" width="60" height="15" />
      </ContentLoader>)
}

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }
const ReservasUpdate =(props) =>{
    const {DetailDashboard} = props
    const {id} =useParams()
    const [nombre,setNombre] =useState()
    const [apellido,setApellido] =useState()
    const [document,setDocumento] =useState()
    const [check_digit,setcheck_digit] =useState()
    const [nacimiento,setNacimiento] =useState()
    const [correo,setCorreo] =useState()
    const [celular,setCelular] =useState()
    const [ciudad,setCiudad] =useState()
    const [nacionalidad,setNacionalidad] =useState()
    const [typeDocument,setypeDocument] = useState() 
    const [country,setCountry] =useState()
    const [direcion,setDirecion] =useState()
    const {jwt,Dian} = useContext(AutoProvider)
    const  documentUse = UseDocument()
    const {getCitySigo} = UseCitySigoActions()
  
    const {City,
        error,loading}= useSelector((state) => state.CitySigoSlice)

    const {ErrorRegisterClient,loadingRegisterClient,RegisterClient}= useSelector((state) => state.Dian)
  
    const {PostCLienteRegister} =UseDianActions()

    const FetchDate=async() =>{
        await getCitySigo()
    }   

    useEffect(() =>{
        FetchDate() 
    },[])
    

    const resultDasboard =  DetailDashboard[0]
    const [showDropdown, setShowDropdown] = useState(false);
    const typeCityName = City?.find(index =>  index?.ID ==resultDasboard?.Ciudad )

    const [searchTerm, setSearchTerm] = useState(resultDasboard?.City);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const filteredCities = useMemo(() => {
        return City.filter(city =>
            city.City.toLowerCase().includes(debouncedSearchTerm?.toLowerCase() ?? '')
        );
    }, [debouncedSearchTerm, City]);


    const handleCityClick = useCallback((city) => {
        setSearchTerm(city.City);
        setCiudad(city.ID);
        setShowDropdown(false);
    }, [setNacionalidad]);
    
    const handleChange = useCallback((e) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
    }, []);


    const docu = documentUse.document?.find(index =>  index?.ID == resultDasboard?.ID_Tipo_documento)

    const person  = docu?.ID_document_dian ==31?"Company" :"Person"


    const n = moment(resultDasboard?.Fecha_nacimiento).utc().format('YYYY/MM/DD')

    useEffect(() =>{
      fetch(`${config.serverRoute}/api/resecion/getcountry`)
            .then(resp => resp.json())
            .then(data=> setCountry(data))
  },[])

    let data  ={
            Num_documento:document,
            Nombre:nombre,
            Apellido:apellido,
            Fecha_nacimiento:nacimiento,
            Correo:correo,
            Celular:celular,
            ID_Prefijo:nacionalidad,
            ID_Tipo_documento:typeDocument,
            Ciudad:ciudad,
            person_type:person,
            check_digit:check_digit,
            Direcion:direcion,
    }

    const cedula = resultDasboard.Num_documento;
    const dv = calcularDV(cedula);

    const validDefinidName = person =="Company" ?  
    [
        `${resultDasboard.Nombre,resultDasboard.Apellido}`
    ].join(""): 
    [
        resultDasboard.Nombre,
        resultDasboard.Apellido
    ] 
   
    const body = {
        "type": "Customer",
        "person_type":`${person}`,
        "id_type": `${docu?.ID_document_dian}`,
        "identification": resultDasboard.Num_documento,
        "check_digit":`${dv}`,
        "name": [
            validDefinidName
        ],
        "commercial_name":  resultDasboard.Nombre,
        "branch_office": 0,
        "active": true,
        "vat_responsible": false,
        "fiscal_responsibilities": [
          {
            "code": "R-99-PN"
          }
        ],
        "address": {
          "address":resultDasboard.Direcion,
          "city": {
            "country_code": typeCityName?.Code_country,
            "state_code":  typeCityName?.Code_state,
            "city_code": typeCityName?.Code_city
          },
          "postal_code":typeCityName?.Code_city
        },
        "phones": [
          {
            "indicative": "00",
            "number": "00",
            "extension": "00"
          }
        ],
        "contacts": [
          {
            "first_name":  resultDasboard.Nombre,
            "last_name":   resultDasboard.Apellido,
            "email":resultDasboard?.Correo,
            "phone": {
              "indicative": "0",
              "number": "0",
              "extension": "0"
            }
          }
        ]

        

      }

      const handSubmitInvoinces=async() =>{
        await PostCLienteRegister({token:Dian.access_token,body})
    }
    
  const handClick =() =>{
    ServiceUpdateReservation({id,data}).then(index =>{
       window.location.reload()
        }).catch(e =>{
        console.log(e)
    })
  }

  const FillContent =() =>{
    if(loading){
      return (<StyleContainerLoadingCLoudbeds >
                 <LoadingSkeleton type="default"  color={"success"} size="lg" />
             </StyleContainerLoadingCLoudbeds>
         )
    }if(error){
      return  <PageBack />
    }
   return  <>
    <div className=""  >
            <LoadingDetail loading={loading}  titleLoading="guardado correctame"/>
            <LoadingDetail loading={true}  titleLoading="Editar personas"/>
            <div className="container-detail-dasboard-in-one" >
          </div>
          <ButtonBack />
            <form  className="p-6  mx-auto max-w-3xl  rounded-md space-y-4"  onSubmit={(e) =>{
                e.preventDefault()
            }}>
                <div className="grid border-grid-cols-1 gap-4">
                    <label className="block col-span-2">
                    <span className="text-gray-700">Nombre /Nombre empresa</span>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre" 
                        defaultValue={resultDasboard?.Nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        required
                    />
                    </label>
                    <label className="block col-span-2">
                    <span className="text-gray-700">Apellido </span>
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido" 
                        defaultValue={resultDasboard?.Apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        required
                    />
                    </label>
                    <label className=" block col-span-2 ">
                    <span className="text-gray-700">Tipo documento</span>
                        <select
                            defaultValue={docu?.nombre}
                            onChange={(e) => setypeDocument(e.target.value)}
                            className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        >
                            <option >{docu?.nombre}</option>
                                    {documentUse?.document?.map(category =>(
                                        <option 
                                        value={category.ID}   
                                        key={category.ID}
                                    >
                                        {category.nombre}
                                    </option>
                                    )
                                    )}
                            </select>
                       
                        </label>
                      
                        <label className="block col-span-2">
                            <span className="text-gray-700">Documento/ NIT</span>
                            <input
                                type="text"
                                name="Documento"
                                onChange={(e) => setDocumento(e.target.value)}
                                defaultValue={resultDasboard?.Num_documento}
                                className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                        </label>

                        <label className="block col-span-2">
                            <span className="text-gray-700">Div</span>
                            <input
                                type="number"
                                name="Documento"
                                onChange={(e) => setcheck_digit(e.target.value)}
                                defaultValue={dv}
                                disabled={true}
                                className="pt-2 bg-gray-100 pb-2 block w-full px-0 mt-0 border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                        </label>


                        <label className="block col-span-2">
                        <span className="text-gray-700">Fecha de nacimiento</span>
                        <input
                            type="text"
                            name="fechaNacimiento"
                            onChange={(e) => setNacimiento(e.target.value)}
                            defaultValue={n}
                            className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        />
                    </label>
                    
                    <label className="block col-span-2">
                 
                    <span className="text-gray-700">Nacionalidad</span>
                    <select required  
                            onChange={(e) => setNacionalidad(e.target.value)} 
                            className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            defaultValue={resultDasboard?.nacionalidad}
                                                                        >
                            <option >{resultDasboard?.nacionalidad}</option>
                            {country?.query?.map(category =>(
                                <option 
                                value={category.ID}   
                                key={category.ID}
                            >
                                {category.nombre}
                            </option>
                            )
                            )}
                    </select>
                    </label>
                    <label className="block col-span-2">
                    <span className="text-gray-700">Correos</span>
                    <input
                        type="text"
                        name="Correos"
                        defaultValue={resultDasboard?.Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                    />
                    </label>
                    <label className="block col-span-2">
                    <span className="text-gray-700">Celular</span>
                    <input
                        type="text"
                        name="idFiscalEmpresa"
                        defaultValue={resultDasboard?.Celular}
                        onChange={(e) => setCelular(e.target.value)}
                        className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                    />
                    </label>
                    
                    <label className="block col-span-2">
                        <span className="text-gray-700">Ciudad</span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleChange}
                            defaultValue={"kdjakjdasd"}
                            placeholder="Buscar ciudad..."
                            className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                        />
                        {showDropdown && filteredCities.length > 0 && (
                            <ul className="mt-2 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                            {filteredCities.map(category => (
                                <li
                                key={category.ID}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleCityClick(category)}
                                >
                                {category.Country} - {category.City}
                                </li>
                            ))}
                            </ul>
                        )}
                        </label>
                    <label className="block col-span-2">
                    <span className="text-gray-700">Direccion</span>
                    <input
                        type="text"
                        name="apartamento"
                        defaultValue={resultDasboard?.Direcion}
                        onChange={(e) => setDirecion(e.target.value)}
                        className="pt-2 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                    />
                    </label>
                   
                </div>
                <div className="flex justify-between">
                    <button
                    onClick={handClick}
                    className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-700">
                    Guardar
                    </button>

                    <Button
                   onClick={handSubmitInvoinces}
                   disabled={loadingRegisterClient}
                   className="m-2"
                   color={"success"}                                     
                 >
                  Registrar persona para facturar
                 </Button>
                </div>
                </form>
                     
        </div>
            </>
}

  /**   <div className=" one-detail" >
                    
                            <form className="container-flex-init" >

                            <div className="container-detail-dasboard-in" > 
                                <span className="desde-detail-three-das" > Nombre </span>
                                <span className="desde-detail-three-das" >Apellido </span>
                                <span className="desde-detail-two-das" >Tipo de Documento</span>    
                                <span  className="desde-detail-three-das">No documento</span>
                            </div>
                                    <div className="container-detail-dasboard-in" >
                                    <input  type="text" 
                                            className="desde-detail-three"  
                                            placeholder="Nombre" 
                                            defaultValue={resultDasboard?.Nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            />

                                    <input  type="text" 
                                            className="desde-detail-three" 
                                            name="Apellido"  
                                            placeholder="Apellido" 
                                            defaultValue={resultDasboard?.Apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            />

                                    <select  type="text" 
                                            className="desde-detail-two" 
                                            placeholder="Tipo de documento"
                                            name="Fecha"
                                            onChange={(e) => setypeDocument(e.target.value)}
                                            defaultValue={docu?.nombre} >
                                        <option >{docu?.nombre}</option>
                                                                    {documentUse?.document?.map(category =>(
                                                                        <option 
                                                                        value={category.ID}   
                                                                        key={category.ID}
                                                                    >
                                                                        {category.nombre}
                                                                    </option>
                                                                    )
                                                                    )}
                                    </select>

                                    <input  type="text" 
                                            className="desde-detail-two" 
                                            name="Fecha" 
                                            placeholder="No Documento"  
                                            onChange={(e) => setDocumento(e.target.value)}
                                            defaultValue={resultDasboard?.Num_documento}
                                            />
                                 <input  type="text" 
                                            className="desde-detail-two" 
                                            name="Fecha" 
                                            placeholder="No Documento"  
                                            onChange={(e) => setDocumento(e.target.value)}
                                            defaultValue={resultDasboard?.Num_documento}
                                            />
                                </div>
                            </form>
                        <form className="container-flex-init" >

            
            <div className="container-detail-dasboard-in" > 
                <span className="desde-detail-three-das" > Fecha Nacimiento </span>
                <span className="desde-detail-three-das" >Nacionalidad </span>
                <span className="desde-detail-two-das" >Correo electronico</span>    
                <span  className="desde-detail-three-das">Celular /sin indicativo</span>
                <span  className="desde-detail-two-das">Ciudad</span>
            </div>

            <div className="container-detail-dasboard-in" >
                <input  type="text" 
                        className="desde-detail-three" 
                        placeholder="Fecha Nacimiento"
                    
                        onChange={(e) => setNacimiento(e.target.value)}
                        defaultValue={n}
                        />

              
                                                            <select required  onChange={(e) => setNacionalidad(e.target.value)} 
                                                                        name={"Nacionalidad"}
                                                                        defaultValue={resultDasboard?.nacionalidad}
                                                                        className="desde-detail-three">
                                                                    <option >{resultDasboard?.nacionalidad}</option>
                                                                    {country?.query?.map(category =>(
                                                                        <option 
                                                                        value={category.ID}   
                                                                        key={category.ID}
                                                                    >
                                                                        {category.nombre}
                                                                    </option>
                                                                    )
                                                                    )}
                                                                </select>
                  

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Correo" 
                        placeholder="Correo  electronico"  
                        defaultValue={resultDasboard?.Correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        />

                <input  type="text" 
                        className="desde-detail-two" 
                        name="Celular"  
                        placeholder="Celular"  
                        defaultValue={resultDasboard?.Celular}
                        onChange={(e) => setCelular(e.target.value)}
                        />
                 <input  type="text" 
                        className="desde-detail-two" 
                        name="Celular"  
                        placeholder="Celular"  
                        defaultValue={resultDasboard?.Ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        />
            </div>
        </form>

        <div className="container-flex-init-one" >
                    

                    <div>
                        <button className="button-checking-detail-one-das-one" onClick={handClick} > <span> Guardar </span></button>
                    </div>

                    </div>
                         </div>
 */

    return (
        <>
           {FillContent()}
        </>
    )

}

export default ReservasUpdate