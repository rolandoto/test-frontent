import react from "react"
import { useContext } from "react"
import { useState } from "react"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceInfomeMovimientoPost from "../../service/ServiceInformeMovimientoPost"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"
import { CiUser } from "react-icons/ci";
import Swal from 'sweetalert2'
import moment from "moment"
import "moment/locale/es";


const InformeMovimiento =() =>{

    const [LookinforFecha,setLokinforFecha] =useState()
    const {jwt} = useContext(AutoProvider)
    const [state,setState] =useState()

    const hadChangeFecha =(e) =>{
        setLokinforFecha(e.target.value)
    }

    const handConsultar = ()  =>{
        ServiceInfomeMovimientoPost({id:jwt.result.id_hotel,fecha:LookinforFecha}).then(index => {
            setState(index.query)
            console.log(index)
        }).catch(e =>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>No encontro ningun dato</p>',
                showConfirmButton: false,
                timer: 1000
              })
        })
    }

    console.log(state)

    return (
        <ContainerGlobal>
            <LoadingDetail
                        loading={true}
                        titleLoading={"Informe movimiento"}  />
               
               <div>
                <input type="date" className="input-selecto-dasboard-n1-reservaction" onChange={hadChangeFecha} value={LookinforFecha}   />
                <button className="button-informe-cosultar" onClick={handConsultar} >Consultar</button>
            </div>

        
            {state?.map(index => {

                const fecha =  moment(index.Fecha).utc().format('YYYY-MM-DD HH:mm:ss ')
                
                return (
                    <div className="card-one" > 
                        <div className="display-flex-card" >
                        <div>   
                                <div className="flex-card-One" >
                                    <span><CiUser fontSize={30} color="black" /></span>
                                    <span  >{index.Nombre_recepcion}</span>
                                </div>
                                <h4 className="let-letra-movimiento" >{index.Movimiento}</h4>
                            </div>
                                
                            <div>
                                <span>{fecha}</span>
                            </div>
                            
                        </div>
                
                    </div>
                )

            })}

        </ContainerGlobal>
    )

}

export default InformeMovimiento