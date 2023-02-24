import React from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"

const ReporteCamarera  =() =>{

    return (
        <ContainerGlobal>
                <LoadingDetail
                            loading={true}
                            titleLoading={"Reporte Camareria"}  />
            <h1>reporte camarera</h1>

        </ContainerGlobal>
    )
}

export default ReporteCamarera