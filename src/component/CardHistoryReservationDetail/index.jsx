import React, { useEffect } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useReservationActions from "../../action/useReservationActions"
import { Loading } from "@nextui-org/react"
import { useSelector } from "react-redux"
import LoadingDetail from "../../Ui/LoadingDetail"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';  
import moment from "moment"
const CardHistoryReservationDetail =() =>{

    const  {id}  = useParams()
    const {Historyreservation,loadingHistoryreservation,errorHistoryreservation} = useSelector((state) => state.ReservationSlice)
    const {setGetHistoryReservation} =useReservationActions()

    const FetchDate =async()=>{
        await setGetHistoryReservation({id})
    }

    useEffect(() =>{
        FetchDate()
    },[])

    const fillContent =() =>{
        if(loadingHistoryreservation){
            return  <Loading color="success" style={{ width:"100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Descargando factura
          </Loading>
        }if(errorHistoryreservation){
            return <p>...error</p>
        }


        return     <Paper sx={{ width: '90%',margin:"10px" }}> 
        <TableContainer  onSubmit={(e) =>{
        e.preventDefault()
        }} >
        <LoadingDetail  
                        loading={true}
                        titleLoading={"Historial de la reserva"}  />
            <Table aria-label="simple table"   > 
            <TableHead>
                <TableRow>
                <TableCell align="right">Codigo</TableCell> 
                <TableCell align="right">Fecha</TableCell> 
                <TableCell align="right">Usuario</TableCell>  
                <TableCell align="right">Cambios</TableCell> 
                
                </TableRow>
            </TableHead>
            <TableBody>
            {Historyreservation.map((item) =>{
                return (
                    <TableRow>
                        <TableCell align="right">{item.Codigo_reserva}</TableCell> 
                        <TableCell align="right"> {moment(item.Fecha).utc().format('YYYY/MM/DD HH:mm')}</TableCell> 
                        <TableCell align="right">{item.Nombre_recepcion}</TableCell> 
                        <TableCell align="right">{item.Movimiento}</TableCell> 
                    </TableRow>
                )
            })}
              </TableBody>
            
  </Table>
</TableContainer> 
</Paper>  

    }

    console.log({Historyreservation})
    
    
    return (<>
                {fillContent()}

            

            </>)

}

export default CardHistoryReservationDetail