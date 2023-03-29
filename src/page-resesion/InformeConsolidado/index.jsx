import React, { useContext, useEffect } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import { useState } from "react";
import ServiceInformesConsolidado from "../../service/ServiceInformeConsolidado";
import   AutoProvider  from "../../privateRoute/AutoProvider";
import ServiceDescargar from "../../service/ServiceDescargarInformeConso";

const InformeConsolidado = () => {

    const [value, setValue] = useState("");
    const [file, setFile] = useState(null);
    const [roomBusy,setRoomroomBusy] =useState("")
    const [roomSell,setRoomSell] =useState("")
    const [efectivoTotal,setEfectivoTotal] =useState("")
    const [otrosMedios,setOtrosMedios]=useState("")
    const [dolarespesos,setDolarespesos]=useState("")
    const [gastos,setGastos] =useState("")
    const [targetaDebito,setTargetaDebito] =useState("")
    const [targetaCredito,setTargetaCredito] =useState("")
    const [tranferencia,setTranferencia] =useState("")
    const [pagoAgil,setPagoAgil] =useState("")
    const [bitcon,setBitcon] =useState("")
    const [payoner,setPayoner] =useState("")
    const [dolares,setDolares]=useState("")
    const [euros,setEuros]=useState("")
    const [aeropuerto,setAeropuerto]=useState("")
    const [lavenderia,setLavenderia]=useState("")
    const [turismo,setTurismo]=useState("")
    const [seguro,setGuro]=useState("")
    const [souvenir,setSouvenir] =useState("")
    const [bebidas,setBebidas] =useState("")
    const [snak,setSnak] =useState("")
    const [jacuzzi,setJacuzzi] =useState("")
    const [observation,setObservation] =useState("")
    
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
                <input type="text"
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
        </ContainerGlobal>
    )
}

export default InformeConsolidado