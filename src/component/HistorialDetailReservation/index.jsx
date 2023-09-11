import React, { useEffect, useState } from  "react"
import { config } from "../../config"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingDetail from "../../Ui/LoadingDetail"
import { CheckIcon, CloseIcon } from "../../Ui/Icon";
import { User } from "@nextui-org/react";
import moment from "moment";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";





const useFilterDeatailHistory =() =>{
    const filterReseration  =(reservation)=>{
        return reservation?.filter(ItemReservation  =>{
           return (
            ItemReservation.valid_buy !==0
           )
        })
    }

    return  {filterReseration}
}




const HistorialDetailReservation =() =>{
    const {id} = useParams()   
    const  {filterReseration} = useFilterDeatailHistory()
    const [historyReservation,setHistoryReservation] =useState()


    useEffect(() =>{
        fetch(`${config.serverRoute}/api/admin/getHistialReservationById/${id}`)
        .then(resp => resp.json())
        .then(data =>setHistoryReservation(data.query))
    },[])   

    const totalReservation = filterReseration(historyReservation)

    console.log(totalReservation)

    if(!historyReservation) return null

    return (
        <Paper sx={{ width: '100%',margin:"10px" }}>
         <TableContainer  component={Paper}   onSubmit={(e) =>{
           e.preventDefault()
         }} >
           <LoadingDetail 
                           loading={true}
                           titleLoading={"Historial modificados"}  />
               <Table > 
               <TableHead>
                   <TableRow>
                        <TableCell>Recepcionista</TableCell>
                        <TableCell>Descripcion</TableCell>
                        <TableCell>valor</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Estado</TableCell>
                   </TableRow>
               </TableHead>
               <TableBody> 
                {historyReservation.map(ItemHisstory =>{

                const fecha =moment(ItemHisstory.Fecha).utc().format('YYYY/MM/DD')

                if(ItemHisstory.valid_buy ==1){
                            return (
                                <TableRow key={ItemHisstory.ID} >
                                    <TableCell>
                                    <User
                                        bordered
                                        squared
                                        src={ItemHisstory.foto}
                                        name={ItemHisstory.name}
                                        color={"success"}
                                        zoomed
                                    /></TableCell>
                                    <TableCell>{ItemHisstory.Description}</TableCell> 
                                    <TableCell>${ItemHisstory.valor.toLocaleString()}</TableCell>
                                    <TableCell>{fecha}</TableCell>
                                    <TableCell>
                                        <CheckIcon/>
                                    </TableCell>
                                </TableRow>
                            )
                }else if(ItemHisstory.valid_buy ==2){
                    return (
                        <TableRow key={ItemHisstory.ID} >
                            <TableCell>
                            <User
                                bordered
                                squared
                                src={ItemHisstory.foto}
                                name={ItemHisstory.name}
                                color={"error"}
                                zoomed
                            /></TableCell>
                            <TableCell>{ItemHisstory.Description}</TableCell> 
                            <TableCell>${ItemHisstory.valor.toLocaleString()}</TableCell>
                            <TableCell>{fecha}</TableCell>
                            <TableCell>
                                <CloseIcon />
                            </TableCell>
                        </TableRow>
                    )
                }
                  })}
               </TableBody>
               </Table>
         </TableContainer> 
     </Paper> 
    )
}

export default HistorialDetailReservation