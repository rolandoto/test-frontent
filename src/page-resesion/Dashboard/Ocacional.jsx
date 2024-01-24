import React, { useContext, useEffect, useRef, useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { useDispatch, useSelector } from "react-redux"
import CardRowsRoom from "../../component/CardRowsRoom/CardRowsRoom"
import ContextMenu from "../../component/contextMenu/ConextMenu"
import CardRowsRoomOcacional from "../../component/CardRowsRoom/CardRowsRoomOcacional"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import { confirmAlert } from "react-confirm-alert"
import useRoomOcasional from "../../action/useRoomOcasional"
import moment from "moment"
import ServiceStatus from "../../service/ServiceStatus"
import useDetailRoomAction from "../../action/useDetailRoomAction"
import { toast } from "react-hot-toast";
import { AiOutlineFieldTime ,AiOutlineDelete,AiOutlineDeliveredProcedure,AiOutlineDownload,AiOutlineHeart,AiOutlineIssuesClose} from "react-icons/ai";
import HttpClient from "../../HttpClient"
import { AiOutlineAlignLeft ,AiOutlineCloseCircle} from "react-icons/ai";
import CardColorReservation from "./CardColorsReservation"
import ProductCard from "../../component/ProducCardOcasional/ProductCardOcasional"
import ProductCardWaypay from "../../component/ProducCardOcasional/ProductCardWaypay"
import useReservationActions from "../../action/useReservationActions"

const Ocacionales =() =>{
    const tiempoActual = moment();
    const {postRoomOcasionalByID} = useRoomOcasional()
    const  {postDetailRoom} =  useDetailRoomAction()
    const dispatch = useDispatch();
    const {
      getRoomByReservation,
      getRoomFilterRoom,
    } = useReservationActions()
    const {setOcacion,ocacion,jwt, finish,setFinish} = useContext(AutoProvider)
    const {loading,error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)  

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenOne, setModalOpenOne] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [block,setBlock] =useState(false)

  const [price, setPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState({tarifa:0,hora:0});

  console.log(amountPaid)

  const [inputPayValueOcasioanal, setInputPayValueOcasioanal] = useState({
    Tipo_forma_pago: null,
  });

  const fetchData =async() =>{
		try {
			await getRoomByReservation()
			await getRoomFilterRoom()
			} catch (error) {
				console.error("Error fetching data:", error);
				console.log("error")
			}
        
  }

	useEffect(() =>{
    fetchData()
},[dispatch,loading])

const handleInputPayOcasioanal = (event) => {
  const value = parseInt(event.target.value);
    if(isValidNumber(value)){
      setInputPayValueOcasioanal({
        ...inputPayValueOcasioanal,
        [event.target.name]: value
      });
    }
}

  const handlePriceChange = (event) => {
    // Assuming you're dealing with input of type number
    const newPrice = parseFloat(event.target.value);
    setPrice(newPrice);

  };

  const handClickThreeIOpen=() =>{
    setModalOpenThree(true)
    setModalOpenTwo(false)
  }
  
  const handClickThreeOpen =() =>{
    setModalOpenThree(false)
  }
  
  const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelect = (itemId) => {
      setSelectedItems((prevSelected) => {
        if (prevSelected.includes(itemId)) {
          return prevSelected.filter((id) => id !== itemId);
        } else {
          return [...prevSelected, itemId];
        }
      });
    };

    const idUser = jwt.result.id_user
    const idHotel = jwt.result.id_hotel

    const currentTime = moment();
    const futureTime = moment().add(3, 'hours');
    
    const horaactual =currentTime.format('HH:mm:ss')
    const horaFuture =  futureTime.format('HH:mm:ss')

    const currentTimeOne =   moment();
    const futureTimeOne =  moment().add(1, 'hours');

    const horaactualOne =currentTimeOne.format('HH:mm:ss')
    const horaFutureOne=  futureTimeOne.format('HH:mm:ss')

    const fecha = moment().format("YYYY-MM-DDTHH:mm:ss");
    const fechaone = moment().add(3, 'hours').format("YYYY-MM-DDTHH:mm:ss");
   
    const [estado, setEstado] = useState(false);

    const hanchangeEstado =() =>{
      setEstado(!estado)
    }

    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);
    const textAreaRef = useRef(null);

    const handleContextMenu = (e,id,time_fin,tarifaOcasioanal,HoraAdicional) => {
        setAmountPaid({tarifa:tarifaOcasioanal,hora:HoraAdicional})
        setOcacion(id)
        setFinish(time_fin)
        e.preventDefault();
        setContextMenuPosition({ top: e.clientY, left: e.clientX });
        setContextMenuVisible(true);
    };

    const handleCloseContextMenu = (id) => {
        setContextMenuVisible(false);
    };

    const contextMenuOptions = [
        { label: 'Asignar tiempo', action: 'asignar',icon:<AiOutlineFieldTime fontSize={20} style={{marginRight:"8px"}}  /> },
        { label: 'Eliminar', action: 'delete' ,icon:<AiOutlineDelete fontSize={20} style={{marginRight:"8px"}} />},
        { label: 'Facturar', action: 'Facturar' ,icon:<AiOutlineDeliveredProcedure fontSize={20} style={{marginRight:"8px"}} /> },
        { label: 'Editar', action: 'delete' ,icon:<AiOutlineDownload fontSize={20}  style={{marginRight:"8px"}}/> },
        { label: 'Copiar', action: 'delete'  ,icon:<AiOutlineHeart fontSize={20} style={{marginRight:"8px"}} />},
        { label: 'Actualizar', action: 'delete' ,icon:<AiOutlineIssuesClose fontSize={20} style={{marginRight:"8px"}} /> },
    ];
      
      const handSubmitRoomOcasionalOne =async() =>{
        const momentoSalida = moment(finish, "HH:mm:ss");
        const diferencia = momentoSalida.diff(tiempoActual);
        const horas = Math.floor(diferencia / (60 * 60 * 1000));
        const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
        const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);

        if(!horas  <=0 && !minutos  <=0 && !segundos  <=0){
            postDetailRoom({id:ocacion,ID_estado_habitacion:7})
            postRoomOcasionalByID({ID_habitacion:ocacion,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:inputPayValueOcasioanal.Tipo_forma_pago,Abono:amountPaid.tarifa,ID_hotel:idHotel,Fecha_today:fechaone})
            fetchData()
            setBlock(true)
        }else{
            if(!Boolean(horas)){
            postDetailRoom({id:ocacion,ID_estado_habitacion:7})
            postRoomOcasionalByID({ID_habitacion:ocacion,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:inputPayValueOcasioanal.Tipo_forma_pago,Abono:amountPaid.tarifa,ID_hotel:idHotel,Fecha_today:fechaone})
            fetchData()
            setBlock(true)
            }else{
                toast.error("NO puedes agregar mas horas hasta que termine")
                setBlock(false)
            }   
        }
    }

  //ocasional #2
    const OpenModalTwo =() =>{
      setModalOpenTwo(true)
    }

    const OpenModalCloseModal =() =>{
      setModalOpenTwo(false)
    }

    const handSubmitRoomOcasionalTwo =async() =>{
      const momentoSalida = moment(finish, "HH:mm:ss");
      const diferencia = momentoSalida.diff(tiempoActual);
      const horas = Math.floor(diferencia / (60 * 60 * 1000));
      const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
      const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);

      if(!horas  <=0 && !minutos  <=0 && !segundos  <=0){
          postDetailRoom({id:ocacion,ID_estado_habitacion:7})
          postRoomOcasionalByID({ID_habitacion:ocacion,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:inputPayValueOcasioanal.Tipo_forma_pago,Abono:amountPaid.hora,ID_hotel:idHotel,Fecha_today:fechaone})
          fetchData()
          setBlock(true)
      }else{
          if(!Boolean(horas)){
              postDetailRoom({id:ocacion,ID_estado_habitacion:7})
              postRoomOcasionalByID({ID_habitacion:ocacion,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:inputPayValueOcasioanal.Tipo_forma_pago,Abono:amountPaid.hora,ID_hotel:idHotel,Fecha_today:fechaone})
              fetchData()
              setBlock(true) 
          }else{
              toast.error("NO puedes agregar mas horas hasta que termine")
              setBlock(false)
          }
      }
    }



    const handChangeTypeRoomOne =(idByRoom,finish) =>{
        /* const momentoSalida = moment(finish, "HH:mm:ss");
        const diferencia = momentoSalida.diff(tiempoActual);
        const horas = Math.floor(diferencia / (60 * 60 * 1000));
        const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
        const segundos = Math.floor((diferencia % (60 * 1000)) / 1000); */
    
        setContextMenuVisible(false);
        confirmAlert({
          title: '',
          message: 'Desea cambiar el estado de la habitacion a:',
		  
          customUI: ({ onClose }) => {

            const handSubmitOpen =() =>{
              if( amountPaid.tarifa  !=0 && amountPaid.hora !==0){
                handClickThreeIOpen()
                onClose()
              }else{
                toast.error("no esta disponible para esta habitacion")
              }
          
            }

            const handSubmitOpenClick =() =>{
              if( amountPaid.tarifa  !=0 && amountPaid.hora !==0){
                OpenModalTwo()
                onClose()
              }else{
                toast.error("No disponible")
              }
          
            
            }

            return (
                <div className="popup-overlay"  >
                    <h4 className="let-letra" >Seleciones unas de las opciones:</h4>
                    <button  className="react-confirm-alert-button-group"  onClick={handSubmitOpen} >3 horas</button>
                    <button  className="react-confirm-alert-button-group"  onClick={handSubmitOpenClick}  >1 horas adiconal </button>
              </div>         
            );
          }
		})
    }
    
    const prdouctExistValid = (ByID) =>{
        return ocacion == ByID
    }

  
  const openModal = (byIdRoom) => {
    HttpClient.occasionalRoomDetails({id:byIdRoom}).then(index =>{
        console.log(index.query)
        setProductDetails(index.query)
        toast.success("exitoso")
    }).catch(e =>{
        console.log("error")
        setProductDetails([])
        toast.error("no se encontro ningun facturacion")
    })
    setModalOpen(true);
  };

  //store billing
  const OpenModalOne =() =>{
    setModalOpenOne(true)
    setModalOpen(false);
  }
  //store billing
  const CloseModalOne =() =>{
    setModalOpenOne(false)
    setModalOpen(false);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkboxProduct = (pay) => {
    return typeof pay === 'number' && pay === 0;
  };

const [inputPayValue, setInputPayValue] = useState({
    Tipo_forma_pago: null,
});

const isValidNumber = (value) => {
  const parsedValue = parseFloat(value);
  return !isNaN(parsedValue) && parsedValue >= 0;
};

const handleInputPay = (event) => {
  const value = parseInt(event.target.value);
  if(event.target.name =="PayAbono"){
    if(isValidNumber(value)){
      setInputPayValue({
        ...inputPayValue,
        [event.target.name]: value
      });
    }
  }else{
    setInputPayValue({
      ...inputPayValue,
      [event.target.name]: value
    });
  }
}

const data = {
  selectedItems,
  Tipo_forma_pago:inputPayValue.Tipo_forma_pago
}

const handSubmitPayOcasiona  =() =>{
    HttpClient.occasionalUpdateProductData({data}).then(index => {
      console.log(index)
      setSelectedItems([])
      CloseModalOne()
      toast.success("exitoso")
    }).catch(e =>{
      console.log(e)
      toast.error("error al pagar producto")
    })
}

const  typy_buy =  [
  {   
      id:1,
      name:"Efectivo",
  },
  {
      id:2,
      name:"Consignaciones",
  },
  {   
      id:3,
      name:"Destino",
  },
  {   
      id:4,
      name:"Sitio Web",
  },
  {   
      id:5,
      name:"Payoneer",
  },
  {   
      id:6,
      name:"T.Debito",
  },
  {   
      id:7,
      name:"T.Credito",
  },
  {   
      id:8,
      name:"Hotel Beds",
  },
  {   
      id:9,
      name:"Despegar",
  },
  {   
      id:10,
      name:"Price Travel",
  },
  {   
      id:11,
      name:"Link de pago",
  },
  {   
      id:12,
      name:"Expedia",
  },
]

const checkboxProductPayment = () => {
  return productDetails.some(item => item.Pago_deuda ==0 )
}
 
  const PayAbono = isNaN(amountPaid.tarifa) || isNaN(price) ? amountPaid.tarifa : Math.max(amountPaid.tarifa - price, 0);

  const validProducto =  PayAbono ==0 ?  false :true

  const validTypePay = inputPayValueOcasioanal.Tipo_forma_pago ? validProducto : true

  const totalBlock =  block  ? block  : validTypePay

  const PayAbonoOne = isNaN(amountPaid.hora) || isNaN(price) ? amountPaid.hora : Math.max(amountPaid.hora - price, 0);

  const validProductoOne =  PayAbonoOne ==0 ?  false :true

  const validTypePayOne = inputPayValueOcasioanal.Tipo_forma_pago ? validProductoOne : true

  const totalBlockOne =  block  ? block  : validTypePayOne


  const handClickCheckout =() =>{
    postDetailRoom({id:ocacion,ID_estado_habitacion:5})
    toast.success("exitoso")
    fetchData()
  }

const paymentValid = checkboxProductPayment()

    return (
            <ContainerGlobal>
                <div className="card-two" >   
                  <CardColorReservation />
                    <ul class="flex-container wrap-reverse">
                        {Room?.map(index => {
                            const ValidRoom = prdouctExistValid(index.id)
                            console.log(ValidRoom)
                            return (
                                <CardRowsRoomOcacional  {...index}
                                ID_estado_habitacion={index.ID_estado_habiatcion}
                                key={index.id}
                                textAreaRef={textAreaRef}
                                setOcacion={setOcacion}
                                ocacion={ocacion}
                                ValidRoom={ValidRoom}
                                setContextMenuVisible={setContextMenuVisible}
                                handleContextMenu={handleContextMenu}
                                hanchangeEstado={hanchangeEstado}
                                postDetailRoomById={postDetailRoom}  />
                            )
                        })}
                        </ul>
                </div> 

                <div>
                  {modalOpen && (
                    <div className="Modal">
                      <div className="modal-content">
                        <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Factura <span className="close" onClick={closeModal}>
                          <AiOutlineCloseCircle fontSize={30}  />
                        </span> </div>
                        {productDetails?.map((product, index) => {
                        
                        const checkButton =checkboxProduct(product.Pago_deuda)
                  
                        return (
                          <ProductCard
                            checkButton={checkButton}
                            selectedItems={selectedItems}
                            toggleSelect={toggleSelect}
                            ID={product.ID}
                            pago_valid={product.Pago_deuda}
                            Precio={product.Precio}
                            title={product.nombre_product}
                            description={`Cantidad: ${product.Cantidad}`}
                            rating={4}
                            imageUrl={product.img_product}
                          />
                        )})}
                         <button disabled={!selectedItems.length >0}  className={`${selectedItems.length >0  ? "pay-button-all" : "disable-pay" } `} onClick={OpenModalOne}   >
                            Pagar consumo
                        </button>
                        <button disabled={paymentValid}  className={`${paymentValid  ?  "disable-pay" :"pay-button-all"} `}  onClick={handClickCheckout}  >
                            Facturar 
                        </button>
                      </div>
                     
                    </div>
                  )} 
                </div>

                <div>
                  {modalOpenTwo && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Factura <span className="close" onClick={OpenModalCloseModal}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div>
                       
                         <ProductCardWaypay
                         
                         />
                        <button   className={`pay-button-all`}    onClick={handClickThreeIOpen}  >
                           Pagar ocasional
                       </button>
                     </div>
                    
                   </div>
                  )} 
                </div>


                <div>
                  {modalOpenThree && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Factura <span className="close" onClick={handClickThreeOpen}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <div  className={"product-card"} >
                            
                            <div className="product-image">
                              <img src={"https://raw.githubusercontent.com/rolandoto/image-pms/main/servicio.png"} alt={"skldnask"} />
                            </div>

                            <div className="product-detail-container" >
                                <div className="product-details">
                                  <h2 className="product-title">total a pagar  ${amountPaid.tarifa.toLocaleString()}</h2>
                                  <p className="product-description">Cantidad horas: 3</p>
                                  <p className="product-description">Precio: ${amountPaid.tarifa.toLocaleString()}</p>
                                  <div className="product-rating"> </div>
                                </div>
                                    <div className="container-button-pay" >
                                    </div>
                            </div> 
                          </div>

                          <select   name="Tipo_forma_pago"
                            value={inputPayValueOcasioanal.Tipo_forma_pago}
                            onChange={handleInputPayOcasioanal}
                            className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                              <option></option>
                              {typy_buy?.map(category =>(
                                  <option 
                                  value={category.id}   
                                  key={category.id}>
                                  {category.name}
                              </option>
                              )
                              )}
                        </select>

                        <input 
                                type="number"
                                id="priceInput"
                                value={price}
                                defaultValue={0}
                                onChange={handlePriceChange}
                                min={0}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        </input>

                        <div 
                            className="flex-ocasioanles">
                           
                            <div  className="desde-detail-product-datail-debe" >
                              Debe:  ${PayAbono.toLocaleString()}
                            </div>
                        </div>
                                              
                        <button  disabled={totalBlock}  className={`${totalBlock  ?  "disable-pay" :"pay-button-all"} `} onClick={handSubmitRoomOcasionalOne}   >
                           Pagar ocasional
                        </button>
                     </div>
                    
                   </div>
                  )} 
                </div>



                <div>
                  {modalOpenTwo && (
                     <div className="Modal">
                     <div className="modal-content">
                       <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Factura <span className="close" onClick={OpenModalCloseModal}>
                         <AiOutlineCloseCircle fontSize={30}  />
                       </span> </div> 

                       <div  className={"product-card"} >
                            
                            <div className="product-image">
                              <img src={"https://raw.githubusercontent.com/rolandoto/image-pms/main/servicio.png"} alt={"skldnask"} />
                            </div>

                            <div className="product-detail-container" >
                                <div className="product-details">
                                  <h2 className="product-title">total a pagar  ${amountPaid.hora.toLocaleString()}</h2>
                                  <p className="product-description">Hora Adicional:1</p>
                                  <p className="product-description">Precio: ${amountPaid.hora.toLocaleString()}</p>
                                  <div className="product-rating"> </div>
                                </div>
                                    <div className="container-button-pay" >
                                    </div>
                            </div> 
                          </div>

                          <select   name="Tipo_forma_pago"
                            value={inputPayValueOcasioanal.Tipo_forma_pago}
                            onChange={handleInputPayOcasioanal}
                            className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                              <option></option>
                              {typy_buy?.map(category =>(
                                  <option 
                                  value={category.id}   
                                  key={category.id}>
                                  {category.name}
                              </option>
                              )
                              )}
                        </select>

                        <input 
                                type="number"
                                id="priceInput"
                                value={price}
                                defaultValue={0}
                                onChange={handlePriceChange}
                                min={0}
                                className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                        </input>

                      <div 
                          className="flex-ocasioanles">
                          
                          <div  className="desde-detail-product-datail-debe" >
                            Debe:  ${PayAbonoOne.toLocaleString()}
                          </div>
                      </div>
                                              
                        <button  disabled={totalBlockOne}  className={`${totalBlockOne  ?  "disable-pay" :"pay-button-all"} `} onClick={handSubmitRoomOcasionalTwo}   >
                           Pagar ocasional
                        </button>
                     </div>
                    
                   </div>
                  )} 
                </div>

                <div>
                  {modalOpenOne && (
                    <div className="Modal">
                      <div className="modal-content">
                        <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle pagos <span className="close" onClick={CloseModalOne}>
                          <AiOutlineCloseCircle fontSize={30}  />
                        </span> </div>
                        <select   name="Tipo_forma_pago"
                            value={inputPayValue.Tipo_forma_pago}
                            onChange={handleInputPay}
                            className={`desde-detail-product-datail  "error-solicitud"  ` }   >
                              <option></option>
                              {typy_buy?.map(category =>(
                                  <option 
                                  value={category.id}   
                                  key={category.id}>
                                  {category.name}
                              </option>
                              )
                              )}
                        </select>
                         <button className="pay-button-all" onClick={handSubmitPayOcasiona}  >
                            Pagar 
                        </button>
                      </div>
                    </div>
                  )} 
                </div>

                {isContextMenuVisible && (
                    <ContextMenu
                    top={contextMenuPosition.top}
                    left={contextMenuPosition.left}
                    options={contextMenuOptions}
                    ocacion={ocacion}
                    finish={finish}
                    openModal={openModal}
                    onClose={handleCloseContextMenu}
                    handChangeTypeRoomOne={handChangeTypeRoomOne}

                    />
            )}
            </ContainerGlobal>
    )
}

export default Ocacionales
