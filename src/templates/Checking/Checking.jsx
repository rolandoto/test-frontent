import React from "react"
import Checking from "../../page-resesion/Dashboard/Checking"

const TemplateChecking =() =>{

    return (
        <Checking loading={checkingDasboardVisible}  
        toggleCloseDashboardChecking={toggleCloseDashboardChecking}   />
    )

}

export default TemplateChecking