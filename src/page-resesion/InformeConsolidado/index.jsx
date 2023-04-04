import React, { useContext, useEffect } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import { useState } from "react";
import ServiceInformesConsolidado from "../../service/ServiceInformeConsolidado";
import   AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceDescargar from "../../service/ServiceDescargarInformeConso";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import ServicetypeRooms from "../../service/ServicetypeRooms";

const InformeConsolidado = () => {

    const [value, setValue] = useState("");
    const [file, setFile] = useState(null);
    const [roomBusy,setRoomroomBusy] =useState(0)
    const [roomSell,setRoomSell] =useState(0)
    const [efectivoTotal,setEfectivoTotal] =useState(0)
    const [otrosMedios,setOtrosMedios]=useState(0)
    const [dolarespesos,setDolarespesos]=useState(0)
    const [gastos,setGastos] =useState(0)

    const [targetaDebito,setTargetaDebito] =useState(0)
    const [targetaCredito,setTargetaCredito] =useState(0)
    const [tranferencia,setTranferencia] =useState(0)
    const [pagoAgil,setPagoAgil] =useState(0)
    const [bitcon,setBitcon] =useState(0)
    const [payoner,setPayoner] =useState(0)
    const [dolares,setDolares]=useState(0)
    const [euros,setEuros]=useState(0)
    const [aeropuerto,setAeropuerto]=useState(0)
    const [lavenderia,setLavenderia]=useState(0)
    const [turismo,setTurismo]=useState(0)
    const [seguro,setGuro]=useState(0)
    const [souvenir,setSouvenir] =useState(0)
    const [bebidas,setBebidas] =useState(0)
    const [snak,setSnak] =useState(0)
    const [jacuzzi,setJacuzzi] =useState(0)
    const [observation,setObservation] =useState(0)
    const [room,setRoom] =useState()

    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])

    
    const {jwt} =useContext(AutoProvider)

    const handleChangegastors = event => {
        let newValue = event.target.value;
        setGastos(newValue);
    };

    const handleChangeroomBusy = event => {
        let newValue = event.target.value;
        setRoomroomBusy(newValue);
    };

    const handleChangeroomSell = event => {
        let newValue = event.target.value;
        setRoomSell(newValue);
    };

    const handleChangeefectivoTotal = event => {
        let newValue = event.target.value;
        setEfectivoTotal(newValue);
    };

    const handleChangesetOtrosMedios = event => {
        let newValue = event.target.value;
        setOtrosMedios(newValue);
    };

    const handleChangedolarespesos = event => {
        let newValue = event.target.value;
        setDolarespesos(newValue);
    };

    const handleChangetargetaDebito = event => {
        let newValue = event.target.value;
        setTargetaDebito(newValue);
    };

    const handleChangetargetaCredito = event => {
        let newValue = event.target.value;
        setTargetaCredito(newValue);
    };

    const handleChangetranferencia = event => {
        let newValue = event.target.value;
        setTranferencia(newValue);
    };

    const handleChangepagoAgil = event => {
        let newValue = event.target.value;
        setPagoAgil(newValue);
    };
    const handleChangebitcon = event => {
        let newValue = event.target.value;
        setBitcon(newValue);
    };

    const handleChangepayoner = event => {
        let newValue = event.target.value;
        setPayoner(newValue);
    };

    const handleChangedolares = event => {
        let newValue = event.target.value;
        setDolares(newValue);
    };

    const handleChangeeuros = event => {
        let newValue = event.target.value;
        setEuros(newValue);
    };

    const handleChangeaeropuerto = event => {
        let newValue = event.target.value;
        setAeropuerto(newValue);
    };

    const handleChangelavenderia = event => {
        let newValue = event.target.value;
        setLavenderia(newValue);
    };


    const handleChangeturismo = event => {
        let newValue = event.target.value;
        setTurismo(newValue);
    };


    const handleChangeseguro= event => {
        let newValue = event.target.value;
        setBebidas(newValue);
    };


    const handleChangesouvenir= event => {
        let newValue = event.target.value;
        setSouvenir(newValue);
    };


    const handleChangebebidas= event => {
        let newValue = event.target.value;
        setGuro(newValue);
    };


    const handleChangesnak= event => {
        let newValue = event.target.value;
        setSnak(newValue);
    };

    const handleChangejacuzzi= event => {
        let newValue = event.target.value;
        setJacuzzi(newValue);
    };

    const handleChangeobservation= event => {
        let newValue = event.target.value;
        setObservation(newValue);
    };

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    
    const f = new Date();
   
    const formatDate = (d) => {

    return d.getFullYear()+ "/"+(d.getMonth() + 1) +"/" + d.getDate() 
    }

    const fecha = formatDate(f)

    const {id_hotel,id_user} = jwt.result

    const [loading,setLoading] =useState(false)

    const handInformes=(e) =>{
        e.preventDefault()
        ServiceInformesConsolidado({id_hotel,id_user,date:fecha,habitaciones_ocupadas:roomBusy,habitaciones_sinVender:roomSell,efectivo_total:efectivoTotal,otrosMedios_total:otrosMedios,dolares_total:dolarespesos,gastos_NoCajaMenor:gastos,t_debito:targetaDebito,t_credito:targetaCredito,transferencia:tranferencia,pago_agil:pagoAgil,bitcoin:bitcon,payonner:payoner,dolares:dolares,euros:euros,puntos_aeropuerto:aeropuerto,puntos_lavanderia:lavenderia,puntos_turismo:turismo,puntos_seguroHotelero:seguro,ventas_souvenirs:souvenir,ventas_bebidas:bebidas,ventas_snacks:snak,ventas_jacuzzi:jacuzzi,observaciones:observation,img_rack:file.name}).then(index =>{
            if(index.OK =="TRUE"){
                ServiceDescargar({idUser:id_user}).then(e=>{
                    const link = document.createElement('a')
                    link.href =e.url;
                    link.setAttribute('target', '_blank');
                    link.download = 'Documento.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link) 
                }).catch(e =>{
                    console.log(e)
                })
            }else  {
                setLoading(true)
                console.log("falso")
            }
        }).catch(e =>{
            console.log(e)
        })       
    }

    return (
        <ContainerGlobal>
             <LoadingDetail
                        loading={true}
                        titleLoading={"Informe consolidado"}  />
             <LoadingDetail
                      
                        error={loading}
                        title={"Error Completar todos los campos"}  />
            <div className="init " >
                <form  className="container-flex-init" onSubmit={handInformes} >
                <div className="container-detail-dasboard-in" > 

                <span className="desde-detail-two-title" > Habitaciones ocupadas:</span>
                <span className="desde-detail-two-title" >Habitaciones sin vender:</span>
                <span className="desde-detail-three-title-das" >Subir pantallazo del rack soho:</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number"
                      className="desde-detail-two"  
                      placeholder="Habitaciones ocupadas" 
                      name="Adultos"
                      onChange={handleChangeroomBusy}
                      required
                        />  
             
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Habitaciones sin vender"  
                      type="number" 
                      onChange={handleChangeroomSell}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Subir pantallazo del rack soho"  
                      type="file" 
                      onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
        </form>     

      </div>

      <div className="init-informe top-one " >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title-informe" > Efectivo total:</span>
        <span className="desde-detail-two-title-informe-one" >Otros medios: </span>
        <span className="desde-detail-three-title-das-informe" >Dolares/Euros en pesos:</span>    
        <span className="desde-detail-three-title-das" >Gastos (NO CAJA MENOR):</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number" 
                      className="desde-detail-two"  
                      placeholder="Efectivo total" 
                      name="Adultos"
                      onChange={handleChangeefectivoTotal}
                        />  
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Otros medios"  
                      type="number" 
                      onChange={handleChangesetOtrosMedios}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Dolares/Euros en pesos"  
                      type="number" 
                      onChange={handleChangedolarespesos}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Gastos (NO CAJA MENOR)"  
                      type="number" 
                      onChange={handleChangegastors}
                />
            </div>
        </form>  

         <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title-informe-all" > T. Debito </span>
        <span className="desde-detail-two-title-informe-all" >T. Credito </span>
        <span className="desde-detail-three-title-das" > Transferencia</span>    
        <span className="desde-detail-three-title-das" >Pago agil</span>    
        <span className="desde-detail-three-title-das" >Bitcoin</span>    
        <span className="desde-detail-three-title-das" >Payonner</span>    
        <span className="desde-detail-three-title-das" >Dolares</span>    
        <span className="desde-detail-three-title-das" >Euros</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number" 
                      className="desde-detail-two"  
                      placeholder="T. Debito" 
                      name="Adultos"
                      onChange={handleChangetargetaDebito}
                        />  
             
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="T. Credito "  
                      type="number" 
                      onChange={handleChangetargetaCredito}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Transferencia"  
                      type="number" 
                      onChange={handleChangetranferencia}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Pago agil"  
                      type="number" 
                      onChange={handleChangepagoAgil}
                />

                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Bitcoin"  
                      type="number" 
                      onChange={handleChangebitcon}
                />

                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Payonner"  
                      type="number" 
                      onChange={handleChangepayoner}
                />

                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Dolares"  
                      type="number" 
                      onChange={handleChangedolares}
                      required
                />

                    <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Euros"  
                      type="number" 
                      onChange={handleChangeeuros}
                />
            </div>
        </form>      
      </div>


      <div className="init-informe  top-one" >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title-informe" >  Aeropuerto:</span>
        <span className="desde-detail-two-title-informe" >Lavanderia:</span>
        <span className="desde-detail-three-title-das-informe" >Turismo:</span>
        <span className="desde-detail-three-title-das" >Seguro hotelero:</span>      
            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number" 
                      className="desde-detail-two"  
                      placeholder="Aeropuerto" 
                      name="Adultos"
                      onChange={handleChangeaeropuerto}
                        />  
             
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Lavanderia"  
                      type="number" 
                      onChange={handleChangelavenderia}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Turismo"  
                      type="number" 
                      onChange={handleChangeturismo}
                />

                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Seguro hotelero"  
                      type="number" 
                      onChange={handleChangeseguro}
                />
            </div>

            
        </form>     

        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

        <span className="desde-detail-two-title-informe" > Souvenirs </span>
        <span className="desde-detail-two-title-informe" >Bedidas: </span>
        <span className="desde-detail-three-title-das-informe" >Snacks:</span>    
        <span className="desde-detail-three-title-das" >Espuma de jacuzzi:</span>    

            </div>
              <div className="container-detail-dasboard-in" > 
                <input type="number" 
                      className="desde-detail-two"  
                      placeholder="Souvenirs" 
                      name="Adultos"
                      onChange={handleChangesouvenir}
                        />  
             
                <input 
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Bedidas"  
                      type="number" 
                      onChange={handleChangebebidas}
                />
                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Snacks"  
                      type="number" 
                      onChange={handleChangesnak}
                />

                <input
                      className="desde-detail-two" 
                      name="Fecha" 
                      placeholder="Espuma de jacuzzi"  
                      type="number"
                      onChange={handleChangejacuzzi} 
                />
            </div>
        </form>     

      </div>


      <div className="init top-one  " >
        <form  className="container-flex-init" >
        <div className="container-detail-dasboard-in" > 

            </div>
              <div className="container-detail-dasboard-in" > 
              <textarea                                           rows="10" 
                                                        onChange={handleChangeobservation}
                                                        cols="217" 
                                                        placeholder="Observacion" 
                                                        name="observacion"
                                                        className="obs" ></textarea>  
            </div>
        </form>     
        </div>

        <div className="init " >
        <form  className="container-flex-init"  onClick={handInformes}>
            <div className="container-detail-dasboard-in" >
                <div className="button-checkout-one"     >
                    <button>Guardar informe (Solo se puede guardar una vez)</button>
                </div>
            </div>
        </form>

      </div>
      <FacturaCompany   jwt={jwt}  
                        efectivoTotal={efectivoTotal} 
                        otrosMedios={otrosMedios} 
                        dolarespesos={dolarespesos}
                        roomBusy={roomBusy} 
                        roomSell={roomSell} 
                        targetaDebito={targetaDebito}
                        targetaCredito={targetaCredito}
                        tranferencia={tranferencia}
                        pagoAgil={pagoAgil}
                        bitcon={bitcon}
                        payoner={payoner}
                        dolares={dolares}
                        euros={euros}
                        />
        </ContainerGlobal>
    )
}

export default InformeConsolidado


const FacturaCompany  =({jwt,roomBusy,roomSell,efectivoTotal,otrosMedios,dolarespesos, 
    targetaDebito,targetaCredito,tranferencia,pagoAgil,bitcon,payoner,dolares,euros}) =>{

    let docToPrint = React.createRef();

    const [avaible,setAvaible] =useState()
    const [room,setRoom] =useState()

    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])


    useEffect(() =>{
        fetch("http://localhost:4000/api/resecion/informeConsolidadoByHotel/13")
        .then(resp => resp.json())
        .then(data  => setAvaible(data))   
    },[])

    const  now = moment().format("YYYY-MM-DD");

    console.log(avaible)
    
    const printDocument = () => {
        const input = docToPrint.current;
        html2canvas(input,{scale:0.8}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            format:  [500, 900 ]
        });
        pdf.addImage(imgData, "JPEG", 0, 0);
        // pdf.output("dataurlnewwindow");
        pdf.save("Up4-receipt.pdf");
        });
    };
    setTimeout(() =>{
        printDocument()
    },1000  )

    const RoomAvaible = avaible?.RoomAvaible[0].Num_Disponibles
    const RoomBusy = avaible?.RoomBusyById[0].Num_Reservas

    const habitacionesOcupadas = parseInt(RoomBusy);
    const totalHabitaciones = parseInt(RoomAvaible);
    const porcentaje = (parseInt( RoomBusy)  /  parseInt (RoomAvaible +RoomBusy)) * 100;    

    const totalPorcentaje = Math.round(porcentaje)

    const totalVentas = parseInt(efectivoTotal ) +parseInt(otrosMedios) + parseInt(dolarespesos)    

    console.log(room)


    return (
     <>
      <div className="container-pdf-flex" >
            <div  className="global-factura" style={{
            borderRadius: "5px",
            }} >
            <div className="container-flex-comorobante" >
                <div className="text-center top-factura-company " >
                        <div className="top-flex-pdf negrita" >
                            <span>Medellín, Colombia</span>
                        </div>
                        <div className="top-flex-pdf negrita" >
                            <span>Fecha: {now}</span>
                        </div>
                        <div className="top-flex-pdf negrita" >
                            <span>Hotel: {jwt.result.hotel}</span>
                        </div>
                    </div>
                </div>

                    <div className="container-flex-comorobante" >
                        <div className="text-center top-factura-company-One " >
                                <div className="top-flex-pdf negrita" >
                                    <span>Señores: Gerencia GH, e-commerce, contabilidad y analitica. </span>
                                </div>
                                <div className="top-flex-pdf negrita" >
                                    <span>Asunto: Informe consolidado de ventas y ocupación</span>
                                </div> 
                        </div>
                    </div>

                    <div className="container-flex-comorobante" >
                        <div className="text-center  " >
                                <div className="top-flex-pdf negrita" >
                                    <span>A continuación se presenta el consolidado de ventas y ocupación diaria correspondientes al dia  {now} de Florencia plaza: </span>
                                </div>
                        </div>
                    </div>

                    <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > HABITACIONES OCUPADAS: </span> <span className="text-font-wei-one-informe-One" >{habitacionesOcupadas}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > HABITACIONES SIN VENDER:</span> <span className="text-font-wei-one-informe-One" >{totalHabitaciones}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > PORCENTAJE OCUPACIÓN:</span> <span className="text-font-wei-one-informe-One"
                             >{totalPorcentaje}%</span> </div> </th>
                        </tr>
                    </table>

                    <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span> Efectivo total: : </span> <span>{efectivoTotal.toLocaleString()}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span> Otros medios::</span> <span>{otrosMedios.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span> Dolares/Euros en pesos:</span> <span>{dolarespesos.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span> Ingreso Total:    :</span> <span>{totalVentas.toLocaleString()}</span> </div> </th>
                        </tr>
                    </table>

                    <table className="table-factura-One" >
                        <tr>
                            <th>T. Debito</th>
                            <th>T. Credito</th>
                            <th>Transferencia</th>
                            <th>Pago agil</th>
                            <th>Bitcoin</th>
                            <th>Payonner</th>
                            <th>Dolares</th>
                            <th>Euros</th>
                        </tr>
                        <tr>
                            <td>{targetaDebito}</td>
                            <td>{targetaCredito}</td>
                            <td>{tranferencia}</td>
                            <td>{pagoAgil}</td>
                            <td>{bitcon}</td>
                            <td>{payoner}</td>
                            <td>{dolares}</td>
                            <td>{euros}</td>
                        </tr>
                        
                    </table>

                    
            <div className="table-pdf-room" >
                    <table className="table-factura-One" >
                                <tr>
                                    <th>Habitación</th>
                                    <th>Cantidad</th>
                                    <th>Ventas</th>
                                </tr>
                                

                                    {room?.map(index  => (
                                        <tr>
                                            <td>{index.nombre}</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    ))}
                    </table>

                    <table className="table-factura-One" >
                                <tr>
                                    <th>Habitación</th>
                                    <th>Cantidad</th>
                                    <th>Ventas</th>
                                </tr>
                                

                                    {room?.map(index  => (
                                        <tr>
                                            <td>{index.nombre}</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    ))}
                    </table>


                    <table className="table-factura-One" >
                                <tr>
                                    <th>Habitación</th>
                                    <th>Cantidad</th>
                                    <th>Ventas</th>
                                </tr>
                                

                                    {avaible?.roomByIdIDtypeRoom?.map(index  => (
                                        <tr>
                                            <td>{index.room}</td>
                                            <td>{index.cantidad}</td>
                                            <td>{index.abono}</td>
                                        </tr>
                                    ))}
                    </table>

            </div>
            </div>


            
        </div>
      </>)
}