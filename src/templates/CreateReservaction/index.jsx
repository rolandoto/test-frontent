import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDashboardAction from "../../action/useDashboardAction";
import useDashboardCheckingAction from "../../action/useDashboardCheckingAction";
import DashboardModal from "../../page-resesion/Dashboard/DashboardModal";
import { selectDashboard } from "../../reducers/dashboardReducers";
import ServicetypeRooms from "../../service/ServicetypeRooms";

const TemplateCreateReservaction =() =>{
    const {toggleOpenDashBoard,toggleCloseDashboard} = useDashboardAction()
	const {toggleOpenDashboardChecking,toggleCloseDashboardChecking}  = useDashboardCheckingAction()
    const {dashboardVisible} = useSelector(selectDashboard)
    


    
    return (
        <DashboardModal 	
		 				
					 />
    )

}

export default TemplateCreateReservaction