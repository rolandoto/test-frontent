import React, { useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import * as XLSX from 'xlsx';
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


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

    const {loading,error,Items,Room,filterRoom,
        ReservationContabilidad
	} = useSelector((state) => state.ReservationSlice)

    const filterReservation = ReservationContabilidad.map((reservation) => {

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





          const { Nombre ,Apellido,Num_documento} = reservation;
          return { Nombre,Apellido,Num_documento,dateStarn ,dateEnd,subtotal,iva,total,Empresa,Persona};
        });

    console.log(filterReservation)

    return(
        <ContainerGlobal>
            <h1>contabilidad</h1>

            <ExportButton data={filterReservation} filename="output.xlsx" />

            <table  className="de" >
                <tbody>
                    <tr>    
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nit</th>
                        <th>Salida prevista</th>
                        <th>Salida prevista</th>
                        <th>Sub total</th> 
                        <th>Iva</th>
                        <th>Valor total</th>
                        <th>opciones</th>
                    </tr>

                    {ReservationContabilidad.map((index) =>{

                        const handClick = () =>{
                            history.push(`/Checkout/${index.ID_RESERVA}`)
                        }

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
                                <td>{index.Num_documento}</td>
                                <td>{dateStarn}</td>
                                <td>{dateEnd}</td> 
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