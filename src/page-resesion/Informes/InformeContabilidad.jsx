import React, { useContext, useEffect, useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import * as XLSX from 'xlsx';
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UseDocument from "../../hooks/useDocument";
import AutoProvider  from "../../privateRoute/AutoProvider";
import HttpClient from "../../HttpClient";


const ExportButton = ({ data, filename }) => {
    const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
      XLSX.writeFile(wb, filename);
    };
  
    return (
      <button onClick={exportToExcel}>
        Exportar a Excel
      </button>
    );
  };

const InformeContabilidad = () =>{

  const  {jwt} = useContext(AutoProvider)
  const [ReservationContabilidad,setReservationContabilidad] =useState()

  useEffect(() =>{
    HttpClient.postInformContabilidad({id:jwt.result.id_hotel}).then(index =>{
      setReservationContabilidad(index.query)
    }).catch(e =>{
      console.log(e)
    })
  },[])

    const data = [
        {
          "residualsArray": 0,
          "ID_RESERVA": 99317,
          "Observacion": "Canal de Reserva: undefined, Tipo de Habitacion: ESTANDAR, Numero de Ocupantes: 2, Valor por noche: COP 120,000, Noches: 1, Suma alojamiento: COP 120,000",
          // ... (otras propiedades)
        }
        // Agrega más objetos según tus necesidades
      ];

    const history = useHistory()



  const  documentUse = UseDocument()

    const filterReservation = ReservationContabilidad?.map((reservation) => {
      const tipo_documento = documentUse.document?.find(index =>  index?.ID == reservation?.ID_Tipo_documento)

                      const valorRoom = parseInt(reservation.valor_habitacion)

                        var totalIvaPerson =valorRoom /1.19;
                        const ivaOne = totalIvaPerson * 19/100;
                        const valorTotalIva = totalIvaPerson +ivaOne ;

                        const Persona =  reservation?.tipo_persona == "persona"
                        const Empresa = reservation?.tipo_persona =="empresa"

                        const formatoIva = reservation.Iva === 1 ? ivaOne.toLocaleString() : 0;

                        const totalNum = reservation.Iva == 1 ? totalIvaPerson : valorRoom;



                         const formattedNum = reservation.tipo_persona === "empresa" ? totalIvaPerson : totalNum;




                        const totalIvaEmpresa = Empresa ? ivaOne.toLocaleString() :  formatoIva.toLocaleString()
                        const dateStarn =moment(reservation.Fecha_inicio).utc().format('YYYY/MM/DD')
                        const dateEnd =moment(reservation.Fecha_final).utc().format('YYYY/MM/DD')

                        const subtotal = formattedNum.toLocaleString()
                        const total =valorTotalIva.toLocaleString()
                        const iva =totalIvaEmpresa
          const { Nombre ,Apellido,Num_documento,Ninos,Adultos,forma_pago} = reservation;
          return { Nombre,Apellido,tipo_documento,Num_documento,Adultos,Ninos,dateStarn ,dateEnd,subtotal,forma_pago,iva,total,Empresa,Persona};
        });

    console.log(ReservationContabilidad)

    if(!ReservationContabilidad) return null

    return(
        <ContainerGlobal>
            <h1>contabilidad</h1>

            <ExportButton data={filterReservation} filename="output.xlsx" />

            <table  className="de" >
                <tbody>
                    <tr>    
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo documento</th>
                        <th>Nit</th>
                        <th>Adutlos</th>
                        <th>menores</th>
                        <th>Salida prevista</th>
                        <th>Salida prevista</th>
                        <th>Forma de pago</th>
                        <th>Sub total</th> 
                        <th>Iva</th>
                        <th>Valor total</th>
                        <th>opciones</th>
                    </tr>

                    {ReservationContabilidad?.map((index) =>{

                        const handClick = () =>{
                            history.push(`/DetailDashboard/${index.ID_RESERVA}`)
                        }
                        const tipo_documento = documentUse.document?.find(item =>  item?.ID == index?.ID_Tipo_documento)

                        const valorRoom = parseInt(index.valor_habitacion)

                        var totalIvaPerson =valorRoom /1.19;
                        const ivaOne = totalIvaPerson * 19/100;
                        const valorTotalIva = totalIvaPerson +ivaOne ;

                        const findPersona =  index?.tipo_persona == "persona"
                        const findEmpresa = index?.tipo_persona =="empresa"

                        const formatoIva = index.Iva === 1 ? ivaOne.toLocaleString() : 0;


                        const totalNum = index.Iva == 1 ? totalIvaPerson : valorRoom;

                         const formattedNum = index.tipo_persona === "empresa" ? totalIvaPerson : totalNum;

                        const dateStarn =moment(index.Fecha_inicio).utc().format('YYYY/MM/DD')
                        const dateEnd =moment(index.Fecha_final).utc().format('YYYY/MM/DD')

                        const totalIvaEmpresa = findEmpresa ? ivaOne.toLocaleString() :  formatoIva.toLocaleString()

                        return (
                            <tr >
                                <td>{index.Nombre}</td>
                                <td>{index.Apellido}</td>
                                <td>{tipo_documento?.nombre}</td>
                                <td>{index.Num_documento}</td>
                                <td>{index.Adultos}</td>
                                <td>{index.Ninos}</td>
                                <td>{dateStarn}</td>
                                <td>{dateEnd}</td> 
                                <td>{index.forma_pago}</td>
                                <td>{formattedNum.toLocaleString()}</td> 
                                <td>{totalIvaEmpresa}</td>
                                <td>{valorTotalIva.toLocaleString()}</td>
                               
                                <td> 
                                <input   type="checkbox" 
                                        className={`checkbox-round  ${findPersona && "checkbox-round-click"} `}
                                       
                                        defaultValue={(e) =>findPersona && (true)}       
                                        checked={findPersona} /> Persona
                    
                                </td>
                                <td> 
                              
                                    <input   type="checkbox" 
                                            className={`checkbox-round  ${findEmpresa && "checkbox-round-click"} `}
                                          
                                            readOnly={true}
                                            checked={findEmpresa}/> Empresa
                               
                                
                                

                                 </td>
                                 <td><button className="button-dasboard-thre-search-view"  onClick={handClick} >Ver reservas</button></td>
                            </tr>
                        )
                    })}
                   
                </tbody>

        </table>
        </ContainerGlobal>
    )
}
export default InformeContabilidad