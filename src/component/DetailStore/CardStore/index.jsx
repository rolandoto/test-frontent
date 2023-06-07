import React from "react";
import { CiDatabase ,CiFaceSmile,CiBellOn,CiHome,CiDollar,CiShop} from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStore2Line } from "react-icons/ri";

const CardStore =({totalday}) =>{

    const payDay = totalday?.totalDay?.totalDay.toLocaleString();

    const tienda = (totalday?.totalDay?.totalDay.toLocaleString())

    return (
        <div>
            <ul  className="container-card" >
            <li className="card-stores  card-One card-stores-color" >
                    <CiShop fontWeight={100} color="gray"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >Cop {tienda}</h4>
                        <span className="text-venta black-title-card  "  >Venta tienda</span>
                    </div>
                </li>       
                <li className="card-stores  card-One card-stores-color" >
                    <CiDollar color="gray"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >Cop {payDay}</h4>
                        <span className="text-venta black-title-card  "  >Venta dia</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiHome color="gray"   fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.RoomBusyById[0]?.Num_Reservas}</h4>
                        <span className="text-venta black-title-card "  >Hab ocupadas</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiFaceSmile color="gray"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.TotalHuespedById[0]?.Num_Reservas}</h4>
                        <span className="text-venta black-title-card "  >Total huespedes</span>
                    </div>
                </li>

                <li className="card-stores  card-One card-store-gris" >
                    <CiBellOn color="gray"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.RoomReservationbyId[0]?.Num_Reservas}</h4>
                        <span className="text-venta black-title-card "  >Reservas</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <BsCurrencyDollar color="gray"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{0}</h4>
                        <span className="text-venta black-title-card "  >Dolares</span>
                    </div>
                </li>
                
            </ul>  
        </div>
    )

}

export default CardStore