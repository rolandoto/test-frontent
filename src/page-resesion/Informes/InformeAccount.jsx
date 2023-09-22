import moment from "moment";
import React ,{useState} from "react"
import { useContext } from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import serviceInformeAcoountErrings from "../../service/serviceInformeAcoountErrings";
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail";
import Swal from 'sweetalert2'
const InformeAccount = () =>  {

    let componentRef = useRef();

    const history = useHistory()

    const {jwt} = useContext(AutoProvider)

    const [LookinforFecha,setLokinforFecha] =useState()
    const [account,setAccount] =useState()

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

   const handlePrint = useReactToPrint({
    content: () => componentRef.current
    });

    const handClikcDescargar =() =>{
        handlePrint()
    }

    const handClicAccountArring =() => {
        serviceInformeAcoountErrings({ id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index  => {
            setAccount(index)
        }).catch(e => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>No encontro ningun dato</p>',
                showConfirmButton: false,
                timer: 1000
              })
        })
    }


    return  (
        <>
            <ContainerGlobal>
        
            <LoadingDetail 
                        loading={true}
                        titleLoading={"Informe cuenta pendiente"}  />
            <br />
            <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction"   onChange={hadChangeFecha}      />
                <br />
                <button className="button-informe-cosultar-cuentas"  onClick={handClicAccountArring}>Consultar</button>
            </div>
           
            <table className="de"  ref={componentRef} >
                <tbody>
                    <tr>    
                        <th>Fecha</th>
                        <th>Habitacion</th>
                        <th>Tipo habitacion</th>
                        <th>Cantidad</th>
                        <th>Nombre producto</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Opcion</th>
                    </tr>

                    {account?.roomByIdIDtypeRoom?.map(index => {

                        const fecha =  moment(index.fecha).utc().format('YYYY/MM/DD')

                        const handNext =() => {
                            history.push(`DetailDashboard/${index.codigo}`)
                        }
                        
                        return (
                        <tr>
                            <td className="width-informe">{fecha}</td>
                            <td className="width-informe">{index.numero}</td>
                            <td className="width-informe">{index.room}</td>
                            <td className="width-informe">{index.cantidad}</td>
                            <td className="width-informe">{index.nombreRoom}</td>
                            <td className="width-informe">${index.precio.toLocaleString()}</td>
                            <td className="width-informe pay_deudado-One-One">Pendiente</td>
                            <td className="width-informe  pointer pay_deudado-One-two " onClick={handNext} >Ver habitacion</td>
                        </tr>  
                        )
                    })}      
                </tbody>   
            </table>
                    

            </ContainerGlobal>
        </>
    )

}

export default  InformeAccount 
