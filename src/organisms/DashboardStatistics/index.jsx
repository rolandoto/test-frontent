import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import CardToday from "../../component/CardToday"
import CardPorcentaje from "../../component/CardProcentaje"
import CardReservationActivity from "../../component/CardReservationActivity"
import ButtonBack from "../../component/ButtonBack"
import ButtonHome from "../../component/ButtonHome"


const DashboardStatisticsOrganism =({Available,Block,Occupation, NumReservation,NumBlock,NumAvailable ,InformeMonth , selectedDay, 
    setSelectedDay}) =>{

    return (<ContainerGlobal>
                    <div className="container-dashboard" > 
                    <ButtonBack />
                    <ButtonHome/>  
                    <div className="contianer-inbox-dasboard">
                        <CardToday />
                        <CardPorcentaje  
                            Available={Available} 
                            Block={Block} 
                            Occupation={Occupation}
                            NumReservation={NumReservation} 
                            NumBlock={NumBlock}
                            NumAvailable={NumAvailable} />
                    </div>
                    < CardReservationActivity 
                    InformeMonth={InformeMonth}
                    selectedDay={selectedDay} 
                    setSelectedDay={setSelectedDay}/>
                    </div> 
            </ContainerGlobal>
    )
}

export default DashboardStatisticsOrganism