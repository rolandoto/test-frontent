import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { useContext } from "react"
import CardStore from "../../component/DetailStore/CardStore"
import InputStore from "../../component/DetailStore/InputStore"
import TableStore from "../../component/DetailStore/TableStore"
import { config } from "../../config"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceInformeStore from "../../service/ServiceInformeStore"
import ServiceTypeCategorys from "../../service/ServiceTypeCategorys"
import Input from "../../Ui/Input"
import Selected from "../../Ui/Select"
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom"

const InformeStore =() =>{
    const history = useHistory()
    const {jwt} =useContext(AutoProvider)
    const id = jwt.result.id_hotel

    const [informeStore,setInformeSotore] =useState()
    const [informeStoreOne,setInformeStoreOne] =useState()

    const [change,setChange] =useState({
        id_hotel:id,
        category:"",
        name:"",
        amount:"",
        price:"",
    })   

    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }

    const [state,setState] = useState()
 
    useEffect(() =>{
        ServiceTypeCategorys().then(index =>{
            setState(index)
        })
       fetch(`${config.serverRoute}/api/resecion/handInformaSotreById/${id}`)
       .then(resp =>  resp.json())
       .then(data => {
            setInformeSotore(data.query)
            setInformeStoreOne(data.query)
       })
    }, [setState])

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda= informeStoreOne?.filter((elemento,index)=>{
            if(elemento?.ID_Tipo_categoria?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
        setInformeSotore(resultadosBusqueda);
        }
    
    useEffect(() =>{
        filtrar(change.category)
    },[setChange,change])

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const handNextDetailStore =(ByIdproduct) =>{
        history.push(`/Detailinforme/${ByIdproduct}`)
    }
    
    const totalPrice = informeStore?.reduce((acum,current) => {
        return acum  +  current.ventas   *current.Precio 
    },0)

    return (
        <>            
            <ul className="flex-stores" >
                <Selected  title="Tipos Categoria" 
                            change={handleInputChange}
                            state={state?.query}
                            name="category"
                             />
                <li>
                    <button className="button-stores-admin-One"  >
                        Buscar
                    </button>
                </li>   
                <li>
                    <button className="button-stores-admin-One" onClick={handlePrint} >
                        Imprimir
                    </button>
                </li>       
            </ul> 
                <div className="container-bicta">
                        <tbody  ref={componentRef} > 
                            <table className="de">
                                <tr>
                                    <th>Poducto</th>
                                    <th>Inv inicial</th>
                                    <th>Inv actual</th>
                                    <th>Reintegro</th>
                                    <th>Cant disponible</th>
                                    <th>Cant Venta</th>
                                    <th>Precio compra</th>
                                    <th>Precio venta</th>
                                    <th>Total venta</th>
                                    <th>Fecha venta</th>
                                </tr>
                                {informeStore?.map(index =>{
                                    const total  = index.ventas   *index.Precio 
                                    const totalVenta = total.toLocaleString();
                                    const precioVenta = index.Precio.toLocaleString()
                                    const precioCompra =  index.Precio_compra.toLocaleString();
                                    return (
                                        <tr key={index.ID} >
                                            <td>{index.Nombre}</td>
                                            <td>{index.Cantidad_inicial}</td>
                                            <td>{index.Cantidad}</td>
                                            <td>{0}</td>
                                            <td>{index.Cantidad}</td>
                                            <td>{index.ventas}</td>
                                            <td>${precioCompra}</td>
                                            <td>${precioVenta}</td>
                                            <td>${totalVenta}</td>
                                            <td><li className="totalPricecheckout pay-checkout-pago-pagado-One pointer-one" onClick={(e) => handNextDetailStore(index.ID)} >Ver</li> </td>
                                        </tr>
                                        )
                                    })}
                                     <tr>
                                        <th>Total  ${totalPrice?.toLocaleString()}</th>
                                    </tr>
                            </table>
                    </tbody>
                </div>
            </>

    )


}

export default InformeStore