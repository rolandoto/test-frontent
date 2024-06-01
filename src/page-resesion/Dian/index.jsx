import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import UseDianActions from "../../action/useDianActions";
import { useSelector } from "react-redux";
import { SocketRoute } from "../../config";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import { Button, Card, Loading, Text } from "@nextui-org/react";
import moment from "moment";
import {StyledContextLoading,  StyledMenuItemLoading } from "../../stylecomponent/StyleMenu";
import toast from "react-hot-toast";
import ButtonBack from "../../component/ButtonBack";
import ButtonHome from "../../component/ButtonHome";
import TableClientDian from "../../component/TableClientDian";
import { useDebounce } from 'use-debounce';
import SearchClient from "../../component/SearchClientSigo";
import useSocket from "../../hooks/UseSocket";
import UseRoundRention from "../../hooks/UseRoundRention";
import DiscordLoader from "../../component/LoadingDian";

const Dian =() => {
  const socket = useSocket();
    const {jwt,Dian} = useContext(AutoProvider)
    const {id} = useParams()
    const [select,setSelect] =useState({})
    const {loading,
          error,
          typeDocumentDian,
          seller,
          products,
          Payment,
          Taxes,
          ListClient,
          loadingClient,
          errorClient,
          loadingInvoinces,
          payabono} = useSelector((state) => state.Dian)
    //const to = useSelector((state) => state.Dian)
    const {GetCLientDian,
          GetTypeDian,
          GetTSeller,
          GetTProductsDian,
          PostSendInvoinces,
          GetPayment,
          GetTaxesDian} = UseDianActions()
    const {getDetailReservationById} = useDetailDashboardAction()
    const {GetPayAbono} =UseDianActions()
    const now = moment().utc().format('YYYY-MM-DD')
    const [isSelected, setIsSelected] = useState(false); // defaultSelected
 
    const handleCheckboxChange = () => {
      setIsSelected(!isSelected);
    };
  
    
    const {DetailDashboard
      } = useSelector((state) => state.DetailDashboard)
    
    const fetchDataDetail =async() =>{
      await getDetailReservationById({id})
  }

    const fetchData =async() =>{
      //  await  GetTypeDian({token:Dian.access_token})
      //  await  GetTSeller({token:Dian.access_token})
        await  GetTProductsDian({token:Dian.access_token})
        await  GetPayment({token:Dian.access_token})
        await GetTaxesDian({token:Dian.access_token})
    } 

    const fetchDataPayment =async() =>{
      await  GetPayAbono({id})
  } 

  const sumWithInitial = payabono.reduce((accumulator, currentValue) => {
    if (currentValue.Valid_Dian === 0) {
      return accumulator + currentValue.Abono;
    }else{
      return accumulator
    }
  }, 0);

  const {SubtotalDian,TotalRetentionDian} =UseRoundRention({Price:sumWithInitial})

  useEffect(() => {
		if (socket) {
			socket.on("sendNotification", async(data) => {
				fetchData()
				toast.success("Se creo una reserva")
		});	
		}
	}, [socket]);

    const resultDashboard = DetailDashboard[0]

    const totalNum = resultDashboard?.Iva == 1 ? true : false;
    const typeIva = resultDashboard?.tipo_persona === "empresa" ? true : totalNum;

    const totalPrice = sumWithInitial
    const totalRound =  totalPrice / 1.19
    const ValorBase = Math.round(totalRound * 100000) / 100000; // Redondear a 5 decimales
    const valueSTotalProduct =  typeIva ?  ValorBase : totalPrice
    const valuesPayments = typeIva ? totalPrice :totalPrice

    const filteredItems = products?.filter(item =>{
      return  item.id ==jwt?.result?.dian
    });

    console.log(filteredItems)

    const filterItemsExecento = products?.filter(item =>{
      return  item.code =="6"
    });

    const itemIva = useMemo(() => (
      filteredItems?.map(item => ({
        code: `${item.code}`,
        description: `${item.name}`,
        quantity: 1,
        price: valueSTotalProduct,
        discount: 0.00,
        taxes: [{
          id: item?.taxes[0]?.id || 0
        }]
      }))
    ), [filteredItems, valueSTotalProduct]);
  
    const itemRetention = useMemo(() => (
      filteredItems?.map(item => ({
        code: `${item.code}`,
        description: `${item.name}`,
        quantity: 1,
        price: SubtotalDian,
        discount: 0.00,
        taxes: [{
          id: item?.taxes[0]?.id || 0
        }, {
          id: 11451
        }]
      }))
    ), [filteredItems, SubtotalDian]);

    
    const itemsExenta = useMemo(() => (
      filterItemsExecento?.map(item => ({
        code: `${item.code}`,
        description: `${item.name}`,
        quantity: 1,
        price: totalPrice,
        discount: 0.00,
        taxes: [{
          id: item?.taxes[0]?.id || 0
        }]
      }))
    ), [filterItemsExecento, totalPrice]);

    const Retention = isSelected ?   TotalRetentionDian : 0
    const  itemsIva =  isSelected ?  itemRetention :  itemIva
    const items =  typeIva ? itemsIva   :itemsExenta

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

    useEffect(() =>{
      fetchDataPayment()
        fetchData()
        fetchDataDetail()
    },[id])
    
    const handSubmitInvoinces=async() =>{
      if(sumWithInitial ==0) {
        toast.error("No se puede facturar no tiene ningun valor pendiente");
      }else{
        if(Boolean(resultDashboard.ID_facturacion.trim())){
          toast.error("no se puedes enviar mas facturacion electronica")
      }else{
        if(!loadingInvoinces){
            await PostSendInvoinces({token:Dian.access_token,body:response,id_Reserva:id,id_user:jwt.result.id_user,fecha:now,Retention})
            socket.emit("sendNotification",jwt.result.name);
        }else{
          toast.error("Error factura")
        }} 
      }
    }

    const handleSelectChange = (client) => {
      setSelect(client);
    };

    const handleSelectDelete = (client) => {
      setSelect(() => ListClient.results.filter((product) => product.id !== client.id))
    };

  const [searchTerm, setSearchTerm] = useState();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // 500ms de retraso

  const fetchSearchResults = useCallback(async () => {
    try {
      if (debouncedSearchTerm) {
        await GetCLientDian({ token: Dian.access_token, document: debouncedSearchTerm });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [debouncedSearchTerm]); // Dependencia para el useCallback

  useEffect(() => {
    fetchSearchResults();
  }, [id, fetchSearchResults]); // Ejecutar el efecto cuando fetchSearchResults cambie

  const handleChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []); 
    
    const FillContent =() =>{
      if(loadingClient){
        return  <DiscordLoader />
      }if(errorClient){
        return  <div class="bg-red-50 border-l-4 border-red-400  rounded-md shadow-md">
                  <div class="flex items-center">
                      <svg class="h-6 w-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <p class="font-semibold text-red-800">¡Oops! Resultados no encontrados</p>
                  </div>
              </div>
      }
     return  <TableClientDian  
                          ListClient={ListClient}
                          handleCheckboxChange={handleCheckboxChange }
                          isSelected={isSelected}
                          handleSelectChange={handleSelectChange} 
                          select={select}
                          handleSelectDelete={handleSelectDelete} 
                          loadingInvoinces={loadingInvoinces} />
    }


    const checkboxCliente = () =>{
      return ListClient?.results?.some(item => item.id == select.id)
  }


  const validProductCheck  = checkboxCliente() 


    return (<><div className="container-bicta" >
                <div className="contain-search">
                  {loadingInvoinces &&  <StyledContextLoading className="fade-in" top={332} left={39}>
                        <StyledMenuItemLoading>
                        <Loading type="default" size="lg" />
                        </StyledMenuItemLoading>
                    </StyledContextLoading> }
                    
                        {!loadingInvoinces && (
                          <Fragment >
                                <ButtonHome/>
                                <ButtonBack/>
                          </Fragment>
                        )   }
                    
                <div class=" mx-auto bg-white p-6 rounded-lg shadow-md">
                    <SearchClient 
                    typeIva={typeIva}
                    resultDashboard={resultDashboard}
                    searchTerm={searchTerm}
                    handleChange={handleChange}
                    />
                    {FillContent()}
                 {validProductCheck &&  (
                   <Button
                   onClick={handSubmitInvoinces}
                   disabled={loadingInvoinces}
                   className="m-2"
                   color={"success"}                                     
                 >
                   Emitir facturacion electronica
                 </Button>
                 )} 
                  </div>
                </div>    
            </div>
            </>)
}

export default Dian
