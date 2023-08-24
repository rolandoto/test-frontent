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
import UseListMotels from "../../hooks/UseListMotels";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ServiceInformeGeneral from "../../service/ServiceInformeGeneral";
import ServiceAuditoria from "../../service/ServiceInformeAuditoria";
import html2pdf from 'html2pdf.js';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    padding: '20px',
  },
  globalFactura: {
    borderRadius: '5px',
  },
  // Agrega aquí los estilos adicionales necesarios para tu HTML
});


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


    const componentRef = useRef(null);

  const generatePDF = () => {
    const options = {
      filename: 'example.pdf',
      margin: [20, 20, 20, 20], // Márgenes [izquierdo, superior, derecho, inferior]
      jsPDF: { format: 'a4', orientation: 'portrait' }, // Opciones de jsPDF
    };

    html2pdf()
      .set(options)
      .from(componentRef.current)
      .save();
  };

    
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



    const [auditoria,setAuditoria] =useState()
    const [store,setStore] =useState()
    const [storeOne,setStoreOne] =useState()
    const [LookinforFecha,setLokinforFecha] =useState()
    const [loadingOne,setLoadingOne] =useState({loading:false,error:false})

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const hanLookingFor =() =>{
        setLoadingOne({loading:true})
        ServiceAuditoria({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index =>{
            console.log(index.queryTwo)
            setAuditoria(index.result)
            setStore(index.queryTwo)
            setStoreOne(index.queryOne)
            setLoadingOne({loading:true})
        }).catch(e =>{
            setLoadingOne({loading:false})
            setAuditoria(null)
        })
    }

    console.log({"pruebas": auditoria })

    
    const totalFilterForma = auditoria?.filter(index => index.Forma_pago ==1)

    const totalFilterFormaStore = store?.filter(index => index.Forma_pago ==1)

    const carritoReserva = storeOne?.filter(index => index.Forma_pago ==1)



    const totalFilterFormaDebito = auditoria?.filter(index => index.Forma_pago ==6)

    const totalFilterFormaStoreDebito= store?.filter(index => index.Forma_pago ==6)

    const carritoReservaDebito = storeOne?.filter(index => index.Forma_pago ==6)

    let countSix =0
    for(let i =0;i<totalFilterFormaDebito?.length;i++){
        if((totalFilterFormaDebito[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterFormaDebito[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebito[i]?.abono )
            countSix += total
        }else  if((totalFilterFormaDebito[i].Iva ==1)){
            const totalwith = parseInt(totalFilterFormaDebito[i].abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebito[i]?.abono )
            countSix += total
        } else{
            countSix += parseInt(totalFilterFormaDebito[i].abono)
        }
    }



    let countOneSix =0
    for(let i =0;i<totalFilterFormaStoreDebito?.length;i++){
        const totalwith = parseInt(totalFilterFormaStoreDebito[i]?.total ) 
        countOneSix += totalwith
    }

    let countTwoSix =0
    for(let i =0;i<carritoReservaDebito?.length;i++){
        const totalwith = parseInt(carritoReservaDebito[i]?.total ) 
        countTwoSix += totalwith
    }

    const tarjetaDebeito = countSix+countOneSix+countTwoSix 

    const totalFilterFormaDebitoTwo = auditoria?.filter(index => index.Forma_pago ==7)

    const totalFilterFormaStoreDebitoTwo= store?.filter(index => index.Forma_pago ==7)

    const carritoReservaDebitoTwo = storeOne?.filter(index => index.Forma_pago ==7)

    let countSixTwo =0
    for(let i =0;i<totalFilterFormaDebitoTwo?.length;i++){
        if((totalFilterFormaDebitoTwo[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterFormaDebitoTwo[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoTwo[i]?.abono )
            countSixTwo += total
        }else  if((totalFilterFormaDebitoTwo[i].Iva ==1)){
            const totalwith = parseInt(totalFilterFormaDebitoTwo[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoTwo[i]?.abono )
            countSixTwo += total
        } else{
            countSixTwo += parseInt(totalFilterFormaDebitoTwo[i].abono)
        }
    }

    let countOneSixTwo =0
    for(let i =0;i<totalFilterFormaStoreDebitoTwo?.length;i++){
        const totalwith = parseInt(totalFilterFormaStoreDebito[i]?.total ) 
        countOneSixTwo += totalwith
    }

    let countTwoSixTwo =0
    for(let i =0;i<carritoReservaDebitoTwo?.length;i++){
        const totalwith = parseInt(carritoReservaDebitoTwo[i]?.total ) 
        countTwoSixTwo += totalwith
    }

    const totalCredito = countSixTwo +  countOneSixTwo +countTwoSixTwo

    const totalFilterFormaDebitoThree = auditoria?.filter(index => index.Forma_pago ==5)

    const totalFilterFormaStoreDebitoThree= store?.filter(index => index.Forma_pago ==5)

    const carritoReservaDebitoThree = storeOne?.filter(index => index.Forma_pago ==5)

    let countSixThree =0
    for(let i =0;i<totalFilterFormaDebitoThree?.length;i++){
        if((totalFilterFormaDebitoThree[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterFormaDebitoThree[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoThree[i].abono )
            countSixThree += total
        }else  if((totalFilterFormaDebitoThree[i].Iva ==1)){
            const totalwith = parseInt(totalFilterFormaDebitoThree[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoThree[i]?.abono )
            countSixThree += total
        } else{
            countSixThree += parseInt(totalFilterFormaDebitoThree[i]?.abono)
        }
    }


    let countOneSixThree =0
    for(let i =0;i<totalFilterFormaStoreDebitoThree?.length;i++){
        const totalwith = parseInt(totalFilterFormaStoreDebitoThree[i]?.total ) 
        countOneSixThree += totalwith
    }

    let countTwoSixthree =0
    for(let i =0;i<carritoReservaDebitoThree?.length;i++){
        const totalwith = parseInt(carritoReservaDebitoThree[i]?.total ) 
        countTwoSixthree += totalwith
    }

    const totalPayoner = countSixThree  +countOneSixThree + countTwoSixthree

    const totalFilterFormaDebitoThreeFour = auditoria?.filter(index => index.Forma_pago ==11)

    const totalFilterFormaStoreDebitoThreeFour= store?.filter(index => index.Forma_pago ==11)

    const carritoReservaDebitoThreeFour = storeOne?.filter(index => index.Forma_pago ==11)

    let countSixFour =0
    for(let i =0;i<totalFilterFormaDebitoThreeFour?.length;i++){
        if((totalFilterFormaDebitoThreeFour[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterFormaDebitoThreeFour[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoThreeFour[i].abono )
            countSixFour += total
        }else  if((totalFilterFormaDebitoThreeFour[i].Iva ==1)){
            const totalwith = parseInt(totalFilterFormaDebitoThreeFour[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaDebitoThreeFour[i]?.abono )
            countSixFour += total
        } else{
            countSixFour += parseInt(totalFilterFormaDebitoThreeFour[i]?.abono)
        }
    }

    let countOneSixFour =0
    for(let i =0;i<totalFilterFormaStoreDebitoThree?.length;i++){
        const totalwith = parseInt(totalFilterFormaStoreDebitoThree[i]?.total ) 
        countOneSixFour += totalwith
    }

    let countTwoSixFour =0
    for(let i =0;i<carritoReservaDebitoThree?.length;i++){
        const totalwith = parseInt(carritoReservaDebitoThree[i]?.total ) 
        countTwoSixFour += totalwith
    }

    const totalLinkPago = countSixFour  +countOneSixFour + countTwoSixFour



    const totalFilterFormaOne = auditoria?.filter(index => index.Forma_pago !=1)

    const totalFilterFormaStoreOne = store?.filter(index => index.Forma_pago !=1)

    const carritoReservaONe = storeOne?.filter(index => index.Forma_pago !=1)


    let countThree =0
    for(let i =0;i<totalFilterFormaOne?.length;i++){
        if((totalFilterFormaOne[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterFormaOne[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaOne[i].abono )
            countThree += total
        }else  if((totalFilterFormaOne[i].Iva ==1)){
            const totalwith = parseInt(totalFilterFormaOne[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterFormaOne[i]?.abono )
            countThree += total
        } else{
            countThree += parseInt(totalFilterFormaOne[i]?.abono)
        }
    }

    

    
    
    let count =0
    for(let i =0;i<totalFilterForma?.length;i++){
        if((totalFilterForma[i].Tipo_persona =="empresa")){
            const totalwith = parseInt(totalFilterForma[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterForma[i]?.abono )
            count += total
        }else  if((totalFilterForma[i].Iva ==1)){
            const totalwith = parseInt(totalFilterForma[i]?.abono ) *19/100
            const total = totalwith + parseInt(totalFilterForma[i]?.abono )
            count += total
        } else{
            count += parseInt(totalFilterForma[i]?.abono)
        }
    }


    let countOne =0
    for(let i =0;i<totalFilterFormaStore?.length;i++){
        const totalwith = parseInt(totalFilterFormaStore[i]?.total ) 
        countOne += totalwith
    }

    let countTwo =0
    for(let i =0;i<carritoReserva?.length;i++){
        const totalwith = parseInt(carritoReserva[i]?.total ) 
        countTwo += totalwith
    }

    let countFour =0
    for(let i =0;i<totalFilterFormaStoreOne?.length;i++){
        const totalwith = parseInt(totalFilterFormaStoreOne[i]?.total ) 
        countFour += totalwith
    }

    let countFive =0
    for(let i =0;i<carritoReservaONe?.length;i++){
        const totalwith = parseInt(carritoReservaONe[i]?.total ) 
        countFive += totalwith
    }

    const totalEfectivo = countOne +count +countTwo

    console.log({"total efectivo": totalEfectivo})


    const OtrosMedios  = countThree +countFour +countFive




    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    
    
    const handClikcDescargar =() =>{
        handlePrint()
    }
    

    return (
        <ContainerGlobal>
             <LoadingDetail
                        loading={true}
                        titleLoading={"Informe consolidado"}  />
       

<div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"  onChange={hadChangeFecha} value={LookinforFecha}   />
                <button className="button-informe-cosultar" onClick={hanLookingFor}>Consultar</button>
                <button className="button-informe-descargar" >Descargar Informe</button>
               <button className="button-informe-imprimir"  onClick={handClikcDescargar} >Imprimir</button>
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
        <form  className="container-flex-init" onClick={generatePDF}>
            <div className="container-detail-dasboard-in" >
                <div className="button-checkout-one"     >
                    <button>Guardar informe (Solo se puede guardar una vez)</button>
                </div>
            </div>
        </form>

      </div>
      <FacturaCompany   jwt={jwt}  
                        totalEfectivooNE={totalEfectivo}
                        efectivoTotal={efectivoTotal} 
                        otrosMedios={otrosMedios} 
                        OtrosMedios={OtrosMedios}
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
                        aeropuerto={aeropuerto}
                        lavenderia={lavenderia}
                        turismo={turismo}
                        componentRef={componentRef}
                        store={store}
                        storeOne={storeOne}
                        LookinforFecha={LookinforFecha}
                        hanLookingFor={hanLookingFor}
                        tarjetaDebeito={tarjetaDebeito}
                        totalCredito={totalCredito}
                        totalPayoner={totalPayoner}
                        totalLinkPago={totalLinkPago}
                        />
        </ContainerGlobal>
    )
}

export default InformeConsolidado


const FacturaCompany  =({jwt,roomBusy,roomSell,efectivoTotal,otrosMedios,dolarespesos, 
    targetaDebito,targetaCredito,tranferencia,pagoAgil,bitcon,payoner,dolares,euros,aeropuerto,lavenderia,turismo,componentRef,totalEfectivooNE,OtrosMedios,store,storeOne,LookinforFecha,hanLookingFor,tarjetaDebeito,totalCredito,totalPayoner,totalLinkPago}) =>{

    let docToPrint = React.createRef();

    console.log(tranferencia)

    const [avaible,setAvaible] =useState()
    const [room,setRoom] =useState()

    const {iduser} = UseListMotels()

    const FindIdHotel=(hotel) =>{
        return hotel.id_hotel == jwt.result.id_hotel
      }

    const hotel = iduser.find(FindIdHotel)

    let countSeguro =0
       
       if(hotel?.segurohotelero ==0){
            countSeguro=0
       }else{
            countSeguro = parseInt(hotel?.valorseguro)
       }

       console.log(countSeguro)

    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setRoom(index)
        })
    },[setRoom])

    const  now = moment().format("YYYY-MM-DD");

    useEffect(() =>{
        ServiceInformeGeneral({fecha:LookinforFecha,id:jwt.result.id_hotel}).then(index => {
            setAvaible(index)
            console.log(index)
        }).catch(e => {
            console.log(e)
        })
    },[hanLookingFor])

    

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
    },1000)

    const RoomAvaible = avaible?.RoomAvaible[0]?.Num_Disponibles
    const RoomBusy = avaible?.RoomBusyById[0]?.Num_Reservas
    const totalEfectivo = avaible?.totalEfectivo[0]?.Total_Abono
    const totalOtherMedios = avaible?.totalOtherMedios[0]?.Total_Abono
    const debito =  avaible?.tarjetadebito[0]?.Total_Abono
    const credito =  avaible?.tarjetaCredito[0]?.Total_Abono
    const efectviotienda =  avaible?.carrtoTendaEfectivo[0]?.Total_Abono
    const efectviotiendaONe =  avaible?.carrtoTendaEfectivoOne[0]?.Total_Abono
    const debeitocarritoONe =  avaible?.carrtoTendaEfectivoTwo[0]?.Total_Abono
    const debeitocarritoThre =  avaible?.carrtoTendaEfectivoThree[0]?.Total_Abono

    const efectviocarrito =  avaible?.carroReservaEfectivo[0]?.Total_Abono
    const efectviocarritoONe =  avaible?.carroReservaEfectivoOne[0]?.Total_Abono
    const debitopocarritoTwo =  avaible?.carroReservaEfectivoTwo[0]?.Total_Abono
    const debitopocarritoThree =  avaible?.carroReservaEfectivoThree[0]?.Total_Abono

    const valEfectivo  = totalEfectivo ? totalEfectivo + efectviotienda  +efectviocarrito: 0

    const valOtherMedios  = totalOtherMedios ? totalOtherMedios +efectviotiendaONe  +efectviocarritoONe: 0

    const tarjetaBeditos =  debito +  debeitocarritoONe +debitopocarritoTwo 

    const Credito = credito +debeitocarritoThre +debitopocarritoThree 

    const habitacionesOcupadas = parseInt(RoomBusy);
    const totalHabitaciones = parseInt(RoomAvaible);
    const porcentaje = (parseInt( RoomBusy)  /  parseInt (RoomAvaible +RoomBusy)) * 100;    

    const totalPorcentaje = Math.round(porcentaje)

    const totalVentas = parseInt(efectivoTotal ) +parseInt(otrosMedios) + parseInt(dolarespesos)    

    

    const totaRoom = valEfectivo+ valOtherMedios 

    let count =0

    for(let i =0;i<avaible?.roomByIdIDtypeRoom?.length;i++){
        const totalwith = parseInt(avaible?.roomByIdIDtypeRoom[i]?.abono )
        count  += totalwith
    }

    const totalIngresosPuntos  = parseInt( aeropuerto ) + parseInt( lavenderia) +   parseInt (turismo) + parseInt( countSeguro) 
    
    const findBebidas = store?.filter(index =>  index.categoria == 1)
    const findSnaks = store?.filter(index =>  index.categoria == 2)
    const findSouvenir = store?.filter(index =>  index.categoria == 3)
    const findAseo = store?.filter(index =>  index.categoria == 4)
    const findAdultols = store?.filter(index =>  index.categoria == 5)
    const findLenceria= store?.filter(index =>  index.categoria == 6)
    const findServicio = store?.filter(index =>  index.categoria == 7)

   

    const findBebidasOne = storeOne?.filter(index =>  index.categoria == 1)
    const findSnaksOne = storeOne?.filter(index =>  index.categoria == 2)
    const findSouvenirOne = storeOne?.filter(index =>  index.categoria == 3)
    const findAseoOne = storeOne?.filter(index =>  index.categoria == 4)
    const findAdultolsOne = storeOne?.filter(index =>  index.categoria == 5)
    const findLenceriaOne= storeOne?.filter(index =>  index.categoria == 6)
    const findServicioOne = storeOne?.filter(index =>  index.categoria == 7)

    console.log({"categorias":findBebidas})

    const priceBebidas = findBebidas?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceSnaks = findSnaks?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceSouvenir= findSouvenir?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceAseo = findAseo?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceAdultos = findAdultols?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceLenceria = findLenceria?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceServicio = findServicio?.reduce((acum,current) => {
        return acum  +  current.total
    },0)



    const priceBebidasOne = findBebidasOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceSnaksOne = findSnaksOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceSouvenirOne= findSouvenirOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceAseoOne= findAseoOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceAdultosOne = findAdultolsOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceLenceriaOne = findLenceriaOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const priceServicioOne= findServicioOne?.reduce((acum,current) => {
        return acum  +  current.total
    },0)

    const totalBebidas =  priceBebidas + priceBebidasOne 

    const totalSnaks = priceSnaks + priceSnaksOne

    const totalSouvenir = priceSouvenir  +priceSouvenirOne

    const totalAseo  = priceAseo +priceAseoOne

    const totalAdults = priceAdultos + priceAdultosOne

    const totalLenceria =  priceLenceriaOne +  priceLenceria

    const totalServicios =  priceServicio + priceServicioOne

    const totalTienda =  totalBebidas + totalSnaks +totalSouvenir +totalAseo +totalAdults +totalLenceria +totalServicios

    const totalCount = count +  totalTienda

    const totalDefinido =OtrosMedios + totalEfectivooNE


    
    const MyDocument = () => (
        <Document>
          <Page>
            <View style={styles.container}>
              <View style={styles.globalFactura}>
                {/* Agrega aquí el contenido HTML */}
              </View>
            </View>
          </Page>
        </Document>
      );


    return (
     <>
      <div className="container-pdf-flex"  ref={componentRef} >
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
                                    <span>A continuación se presenta el consolidado de ventas y ocupación diaria correspondientes al dia  {now} </span>
                                </div>
                        </div>
                    </div>

                    <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span  className="text-font-wei-one-informe let-title-color" > Efectivo total: : </span> <span  className="text-font-wei-one-informe let-title-color" >${totalEfectivooNE.toLocaleString()}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span  className="text-font-wei-one-informe let-title-color" > Otros medios::</span> <span  className="text-font-wei-one-informe let-title-color" >$ {OtrosMedios.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span  className="text-font-wei-one-informe" > Dolares/Euros en pesos:</span  > <span  className="text-font-wei-one-informe " >{dolarespesos.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe let-title-color  "  > Ingreso Total:    :</span> <span  className="text-font-wei-one-informe let-title-color" >${totalDefinido.toLocaleString()}</span> </div> </th>
                        </tr>
                    </table>

                    <table className="table-factura-One" >
                        <tr>
                            <th className="text-font-wei-one-informe" >T. Debito</th>
                            <th className="text-font-wei-one-informe" >T. Credito</th>
                            <th className="text-font-wei-one-informe" >Transferencia</th>
                            <th className="text-font-wei-one-informe" >Pago agil</th>
                            <th className="text-font-wei-one-informe" >Bitcoin</th>
                            <th className="text-font-wei-one-informe" >Payonner</th>
                            <th className="text-font-wei-one-informe" >Dolares</th>
                            <th className="text-font-wei-one-informe" >Euros</th>
                        </tr>
                        <tr>
                            <td>${tarjetaDebeito?.toLocaleString()}</td>
                            <td>${totalCredito?.toLocaleString()}</td>
                            <td>$</td>
                            <td>{totalLinkPago.toLocaleString()}</td>
                            <td>{bitcon}</td>
                            <td>${totalPayoner.toLocaleString()}</td>
                            <td>{dolares}</td>
                            <td>{euros}</td>
                        </tr>
                        
                    </table>

                    <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > HABITACIONES OCUPADAS: </span> <span className="text-font-wei-one-informe-One" >{habitacionesOcupadas}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > HABITACIONES SIN VENDER:</span> <span className="text-font-wei-one-informe-One" >{totalHabitaciones}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > PORCENTAJE OCUPACIÓN:</span> <span className="text-font-wei-one-informe-One"
                             >{totalPorcentaje}%</span> </div> </th>
                        </tr>
                    </table>
            <div className="table-pdf-room" >
                    <table className="table-factura-One" >
                                <tr>
                                    <th  className="text-font-wei-one-informe"  >Habitación</th>
                                    <th  className="text-font-wei-one-informe" >Cantidad</th>
                                    <th  className="text-font-wei-one-informe" >Ventas</th>
                                </tr>
                                    {room?.map(index  => (
                                        <tr>
                                            <td>{index.nombre}</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    ))}

                                <tr>
                                    <th className="text-font-wei-one-informe" >Total Day Use</th>
                                </tr>
                    </table>

                    <table className="table-factura-One" >
                                <tr>
                                    <th  className="text-font-wei-one-informe"  >Habitación</th>
                                    <th className="text-font-wei-one-informe"  >Cantidad</th>
                                    <th  className="text-font-wei-one-informe"  >Ventas</th>
                                </tr>
                                

                                    {room?.map(index  => (
                                        <tr>
                                            <td>{index.nombre}</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    ))}
                                <tr>
                                    <th className="text-font-wei-one-informe" >Total Amanecida</th>
                                </tr>
                    </table>


                    <table className="table-factura-One" >
                                <tr>
                                    <th className="text-font-wei-one-informe"  >Habitación</th>
                                    <th className="text-font-wei-one-informe"  >Cantidad</th>
                                    <th  className="text-font-wei-one-informe"  >Ventas</th>
                                </tr>   
                                    {avaible?.roomByIdIDtypeRoom?.map(index  => {

                                    const totalIva= parseInt(index.abono * 19 / 100)

                                    const totalWith = parseInt(index.abono) + totalIva

                                    const totalDefinid = index.Iva ==1 ?totalWith : parseInt(index.abono)

                                    const totalDefiniType = index.tipo_persona  =="empresa"  ?totalWith  :totalDefinid
                                    
                                        return (
                                            <tr>
                                            <td>{index.room}</td>
                                            <td>{index.cantidad}</td>
                                            <td>${index.abono.toLocaleString()}</td>
                                        </tr>
                                        )}
                                     )}
                                     <tr>
                                    <th className="text-font-wei-one-informe" >Total Hospedaje </th>
                                    <th className="text-font-wei-one-informe" >${count.toLocaleString()}</th>
                                </tr>
                    </table>
                </div>
            
                <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >AEROPUERTO: </span> <span className="text-font-wei-one-informe-One" >{aeropuerto}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > LAVANDERIA:</span> <span className="text-font-wei-one-informe-One" >{lavenderia}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > TURISMO:</span> <span className="text-font-wei-one-informe-One" >{turismo}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > SEGURO HOTELERO:</span> <span className="text-font-wei-one-informe-One" >${countSeguro.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >TOTAL:</span> <span className="text-font-wei-one-informe-One"
                             >${totalIngresosPuntos.toLocaleString()}</span> </div> </th>
                        </tr>
                </table>

                <table className="table-factura-One" >
                        <tr>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >BEBIDAS: </span> <span className="text-font-wei-one-informe-One" >${totalBebidas?.toLocaleString()}</span></div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > SNAKS:</span> <span className="text-font-wei-one-informe-One" >${totalSnaks?.toLocaleString()}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" > SOUVENIR:</span> <span className="text-font-wei-one-informe-One" >${totalSouvenir?.toLocaleString()}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >ASEO P.:</span> <span className="text-font-wei-one-informe-One" >${totalAseo?.toLocaleString()}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >ADULTOS.:</span> <span className="text-font-wei-one-informe-One" >${totalAdults?.toLocaleString()}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >LENCERIA MULTAS:</span> <span className="text-font-wei-one-informe-One" >${totalLenceria?.toLocaleString()}</span> </div> </th>
                            <th> <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >SERVICIO:</span> <span className="text-font-wei-one-informe-One" >${totalServicios?.toLocaleString()}</span> </div> </th>
                            <th > <div className="container-block-informe-conslidado"> <span className="text-font-wei-one-informe" >TOTAL:</span> <span className="text-font-wei-one-informe-One"
                             >${totalTienda.toLocaleString()}</span> </div> </th>
                        </tr>
                </table>
            </div>
        </div>
      </>)
}