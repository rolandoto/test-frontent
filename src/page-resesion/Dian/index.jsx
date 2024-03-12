import React, { useContext, useEffect, useState } from "react";
import ContainerGlobal from "../../Ui/ContainerGlobal";
import HttpClient from "../../HttpClient";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import UseDianActions from "../../action/useDianActions";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import { Card, Loading, Text } from "@nextui-org/react";
import moment from "moment";
import { StyleSpan, StyleSpanIcons, StyledContextLoading, StyledContextMenuSearch, StyledMenuItem, StyledMenuItemLoading } from "../../stylecomponent/StyleMenu";
import toast from "react-hot-toast";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";

const Dian =() => {
 
    const {id} = useParams()
    const [select,setSelect] =useState([])
    const {jwt,Dian} = useContext(AutoProvider)
    const [pay,setPay] =useState()
    const {loading,error,ListClient,typeDocumentDian,seller,products,Payment,loadingInvoinces,Pdf} = useSelector((state) => state.Dian)
    const to = useSelector((state) => state.Dian)
    const {GetCLientDian,GetTypeDian,GetTSeller,GetTProductsDian,PostSendInvoinces,GetPayment} = UseDianActions()
    const {getDetailReservationById} = useDetailDashboardAction()
    const [selectedItems, setSelectedItems] = useState([]);

    const {DetailDashboard
    } = useSelector((state) => state.DetailDashboard)

    const fetchDataDetail =async() =>{
        await getDetailReservationById({id})
    }

    const [username,setUsername] =useState("")

    const handChange =(e) =>{
        setUsername(e.target.value)
    } 


    const fetchData =async() =>{
        await  GetCLientDian({token:Dian.access_token})
        await  GetTypeDian({token:Dian.access_token})
        await  GetTSeller({token:Dian.access_token})
        await  GetTProductsDian({token:Dian.access_token})
        await  GetPayment({token:Dian.access_token})
    } 

    const resultDashboard = DetailDashboard[0]

  

    const totalNum = resultDashboard.Iva == 1 ? true : false;

    const typeIva = resultDashboard.tipo_persona === "empresa" ? true : totalNum;
        
    const totalPrice =  parseInt(resultDashboard?.valor_habitacion)
  
    const totalRound =  totalPrice / 1.19
    const ValorBase = Math.round(totalRound * 100000) / 100000; // Redondear a 5 decimales

    const valueSTotalProduct =  typeIva ?  ValorBase : totalPrice
    const valuesPayments = typeIva ? totalPrice :totalPrice

    //218487.39495

    console.log(valueSTotalProduct)
    console.log(valuesPayments)
  
    const filteredItems = products?.results?.filter(item =>{
      return  item.id ==jwt?.result?.dian
    }
    );

     const itemsIva = filteredItems?.map(item => {
      return {
        code: `${item.code}`,
        description: `${item.name}`,
        quantity:1,
        price: valueSTotalProduct,
        discount: 0.00,
        taxes: [{
          id:item?.taxes[0]?.id  || 0
        }],
      };
    });

    const itemsProduct = [
      {
        code: '6',
        description: 'HOSPEDAJE EXENTO',
        quantity: 1,
        price: totalPrice,
        discount: 0.0,
       
      }
    ];

    const itemsExenta = itemsProduct?.map(item => {
      return {
        code: `${item.code}`,
        description: `${item.description}`,
        quantity:1,
        price: item.price ,
        discount: item.discount,
        taxes: [{
          id:14205
        }],
      };
    });

    const  items =  typeIva ? itemsIva   :itemsExenta

      const groupedAndSummedItems = pay?.reduce((groups, item) => {
        const code = item.Nombre;
      
        if (!groups[code]) {
          groups[code] = { value: 0, Nombre: "", id: 0, type: "pay" };
        }
      
        groups[code].value += item.Abono;
        groups[code].Nombre = item.Nombre;
      
        // Verificar si el nombre es igual a "Consignaciones" o "Efectivo"
        return groups;
      }, {});
      
      const payments =[{
        id: jwt?.result?.id_payment,
        value:valuesPayments,
      }]
  

    const DateExit = moment(DetailDashboard.Fecha_final).utc().format('YYYY-MM-DD')


    const response= {
      document: {
        id: jwt?.result?.id_document
      },
      date: DateExit,
      customer: {
        person_type: select?.person_type,
        id_type: select?.id_type?.code,
        identification:select?.identification,
       
        branch_office: 0,
        name: select?.name,
        address: {
          address:select?.address,
          city: {
            country_code:select?.address?.city?.country_code,
            state_code:select?.address?.city?.state_code,
            city_code:select?.address?.city?.city_code,
          },
          postal_code: select.postal_code
        },
        phones:select?.phones,
       contacts:select?.contacts
      },
    
      seller: 547,
      stamp: {
        send: true
      },
      mail: {
        send: true
      },
      
      observations: '',
      items,
      payments,
      additional_fields: {}
    };   


    console.log(response)

    useEffect(() =>{
      fetch(`${config.serverRoute}/api/resecion/getPayabono/${id}`)
      .then(resp => resp.json())
      .then(data=> setPay(data.query))
        fetchData()
        fetchDataDetail()
    },[id])

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

    const handSubmitInvoinces=async() =>{
      if(Boolean(resultDashboard.ID_facturacion.trim())){
          toast.error("no se puedes enviar mas facturacion electronica")
      }else{
        if(!loadingInvoinces){
          await PostSendInvoinces({token:Dian.access_token,body:response,id_Reserva:id})
        }else{
          toast.error("cargar factura")
        }
      
      } 
    }

    const toggleSelect = (itemId) => {
      setSelectedItems((prevSelected) => {
        if (prevSelected.includes(itemId)) {
          return prevSelected.filter((id) => id !== itemId);
        } else {
          const productIncartIndex = resultadosBusqueda.findIndex(item => item.id == itemId)
          const newStatet = structuredClone(resultadosBusqueda)
          const resultNewState =  newStatet[productIncartIndex]
          setSelect(resultNewState);
          return [prevSelected, itemId];
        }
      });
    };  
    

    function generarPDF() {
      const linkSource = `data:application/pdf;base64,${Pdf?.base64}`;
      const downloadLink = document.createElement("a");
      const fileName = "file.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }

    const {resultadosBusqueda}  = filtrarSearching(username)

  
    return (
        <div className="container-bicta" >
                <div className="contain-search">
                  {loadingInvoinces &&  <StyledContextLoading className="fade-in" top={332} left={39}>
                        <StyledMenuItemLoading>

                  <Loading type="default" size="lg" />
                    
                        </StyledMenuItemLoading>
              </StyledContextLoading> }
               
              <ButtonBack/>
             <ButtonHome/>
                    <ul className="flex-bedrooms-search">   
                            <li>
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        onChange={handChange}
                                        value={username}
                                        placeholder="Buscar cliente si esta registrado" />
                            </li>   
                            <Text  color="error" h4>"Por favor eleija la persona a la que enviara la factura electronica que sea la correcta"</Text>
                            <Text h4>{typeIva ? "Persona obligaba a pagar iva colombiana o empresa " : " persona exenta  extranjeros"} </Text>
                            <Text h4>{resultDashboard.Nombre} {resultDashboard.Apellido} </Text>
                            <Text h4>Documento: {resultDashboard.Num_documento}</Text>
                            <Text h4>Valor total reserva ${parseInt(resultDashboard.valor_habitacion).toLocaleString()} </Text>

                            <table  className="de "  >
                                <tbody class="tbody  "  > 
                                           
                                            {resultadosBusqueda?.map(index =>{
                                                const fullName= `${index.name[0]} ${index.name[1]} `
                                                
                                                const typeIdentification =  index.id_type.name
                                                
                                                const resulActive =index.active ? "Activo" : "no Activado"

                                                const vat_responsible = index.vat_responsible ? "Responsable de IVA	" :"No responsable de IVA"

                                                const address=`${index.address.address}`

                                                const city = `${index.address.city.country_name}`

                                                const phone  = index?.phones?.[0]?.number

                                                const nameContact = `${index.contacts[0]?.first_name} ${index.contacts[0]?.last_name} `
                                              
                                                    return (
                                                        <div className={selectedItems.includes(index.id) ? "selected" : "product-card"}     >
                                                         <input
                                                              type="checkbox"
                                                              className="checkbox-product"
                                                              checked={selectedItems.includes(index.id)}
                                                              onChange={() => toggleSelect(index.id)}
                                                            />
        
                                                            <td className=""  >{fullName}</td>
                                                            <td className=""  >{typeIdentification}</td>
                                                            <td className="" >{index.identification}</td>
                                                            <td className="" >{index.check_digit}</td>
                                                            <td>{index.branch_office}</td>
                                                            <td>{vat_responsible}</td>
                                                            <td>{address}</td>
                                                            <td>{city}</td>
                                                            <td>{phone}</td>
                                                            <td>{nameContact}</td>
                                                            <td>{resulActive}</td>
                                                            <td>{ selectedItems.includes(index.id) && <button  disabled={loadingInvoinces}
                                                                                                              onClick={handSubmitInvoinces}  className={`${loadingInvoinces ? "disable-pay" :"pay-button"}`} >Enviar </button> }</td>
                                                    </div>
                                                    )
                                        })}
                                </tbody>       
                            </table>
                    </ul>
                </div>          
        </div>
    )
}

export default Dian