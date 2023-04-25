import React from "react"
import CardStore from "../../component/DetailStore/CardStore"
import InputStore from "../../component/DetailStore/InputStore"
import TableStore from "../../component/DetailStore/TableStore"

const DetailStoreTemplate =({id,fetchData,Store}) =>{
    
    return (
        <>
            <InputStore id={id} fetchData={fetchData} />
            <TableStore  Store={Store} />
        </>
    )

}
export default DetailStoreTemplate  