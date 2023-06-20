import React from "react";
import { CiDatabase ,CiFaceSmile,CiBellOn,CiHome,CiDollar,CiShop} from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiStore2Line } from "react-icons/ri";
import ContainerGlobal from "../../../Ui/ContainerGlobal";
import { Progress, Grid } from "@nextui-org/react";
import useProgress from "../../../hooks/useProgress";

const CardStore =({totalday}) =>{

    const payDay = totalday?.totalDay?.totalDay.toLocaleString();

    const tienda = (totalday?.totalDay?.totalDay.toLocaleString())

    const {progress} = useProgress({id:5})

    

    return (
       <div className="container-flex-init-global-carbed" >
        
            <Grid.Container xs={1} sm={40} gap={0}>
                    <span className="text-venta black-title-card  "  >Venta tienda Cop {tienda} </span>
                    <Grid>
                    <Progress value={progress == 100 ?100 :progress} color="gradient" />
                    </Grid>
               

        
            <span className="text-venta black-title-card  ">  Venta dia {tienda} </span>
            <Grid>
            <Progress value={progress == 100 ?90 :progress} color="secondary" />
            </Grid>
           

            <span className="text-venta black-title-card  "  >Hab ocupadas {totalday?.RoomBusyById[0]?.Num_Reservas} </span>
            <Grid>
            <Progress value={progress == 100 ?80 :progress} color="success" />
            </Grid>
         

          
            <span className="text-venta black-title-card  "  >Total huespedes {totalday?.TotalHuespedById[0]?.Num_Reservas} </span>
            <Grid>
            <Progress value={progress == 100 ?70 :progress} color="warning" />
            </Grid>
          
           
            <span className="text-venta black-title-card  "  >Reservas {totalday?.RoomReservationbyId[0]?.Num_Reservas} </span>
            <Grid>
            <Progress value={progress == 100 ?60 :progress} color="error" />
            </Grid>
           

           
            <span className="text-venta black-title-card  "  >Dolares  {0} </span>
            <Grid>
            <Progress value={progress == 100 ?50 :progress} color="primary" />
            </Grid>
            </Grid.Container>


            
           
       </div>
    )

}

export default CardStore