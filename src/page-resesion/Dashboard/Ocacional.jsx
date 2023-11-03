import React, { useContext, useRef, useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { useSelector } from "react-redux"
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

const Ocacionales =() =>{
  const tiempoActual = moment();

    const {postRoomOcasionalByID} = useRoomOcasional()
    const  {postDetailRoom} =  useDetailRoomAction()
    const {setOcacion,ocacion,jwt, finish,setFinish} = useContext(AutoProvider)
    const {loading,error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

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
    const futureTimeOne =  moment().add(6, 'hours');

    const horaactualOne =currentTimeOne.format('HH:mm:ss')
    const horaFutureOne=  futureTimeOne.format('HH:mm:ss')

    const fecha = moment().set({ hour: 0, minute: 0, second: 0 }).format('YYYY-MM-DD');

    const [estado, setEstado] = useState(false);

	const hanchangeEstado =() =>{
		setEstado(!estado)
	}

   
    const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 });
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);
    const textAreaRef = useRef(null);

    const handleContextMenu = (e,id,time_fin) => {
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

    const handChangeTypeRoomOne =(idByRoom,finish) =>{
        const momentoSalida = moment(finish, "HH:mm:ss");
       
        const diferencia = momentoSalida.diff(tiempoActual);
       
        const horas = Math.floor(diferencia / (60 * 60 * 1000));
        const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
        const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);
    
        setContextMenuVisible(false);
		confirmAlert({
		  title: '',
		  message: 'Desea cambiar el estado de la habitacion a:',
		  
          customUI: ({ onClose }) => {

            const handSubmitRoomOcasionalOne =async() =>{
                if(horas  <=0 && minutos  <=0 && segundos  <=0){
                    postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                    postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                    onClose()
                }else{
                    if(!Boolean(horas)){
                        postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                        postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactual,Time_salida:horaFuture,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                        onClose()
                    }else{
                        toast.error("NO puedes agregar mas horas hasta que termine")
                    }   
                }
            }

            const handSubmitRoomOcasionalTwo =async() =>{
                if(horas  <=0 && minutos  <=0 && segundos  <=0){
                    postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                    postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                    onClose()
                }else{
                    if(!Boolean(horas)){
                        postDetailRoom({id:idByRoom,ID_estado_habitacion:7})
                        postRoomOcasionalByID({ID_habitacion:idByRoom,Fecha:fecha,Time_ingreso:horaactualOne,Time_salida:horaFutureOne,id_user:idUser,Hora_adicional:0,Persona_adicional:0,Tipo_forma_pago:7,Abono:2000,ID_hotel:idHotel})
                        onClose()
                    }else{
                        toast.error("NO puedes agregar mas horas hasta que termine")
                    }
                }
            }
              
            return (
                <div className="popup-overlay"  >
                    <h4 className="let-letra" >Desea cambiar el estado de bebe:</h4>
                    <button  className="react-confirm-alert-button-group" onClick={handSubmitRoomOcasionalOne}  >3 horas</button>
                    <button  className="react-confirm-alert-button-group"  onClick={handSubmitRoomOcasionalTwo} >6 horas</button>
                    <button  className="react-confirm-alert-button-group"    >Disponible</button>
              </div>         
            );
          }
		})
    }
    
    const prdouctExistValid = (ByID) =>{
        return ocacion == ByID
    }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenOne, setModalOpenOne] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  
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

  const OpenModalOne =() =>{
    setModalOpenOne(true)
    setModalOpen(false);
  }

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
                        <button disabled={paymentValid}  className={`${paymentValid  ?  "disable-pay" :"pay-button-all"} `}   >
                            Facturar 
                        </button>
                      </div>
                     
                    </div>
                  )} 
                </div>

                <div>
                  {modalOpenOne && (
                    <div className="Modal">
                      <div className="modal-content">
                        <div className="row-container-flex-detail-invoince" ><AiOutlineAlignLeft fontSize={30} />  Detalle Pago <span className="close" onClick={CloseModalOne}>
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
