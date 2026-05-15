import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';  
import { Button, Grid, Image, Loading, Spacer, Table as table,Tooltip, User } from "@nextui-org/react";
import { FaFilePdf } from "react-icons/fa";
import LoadingDetail from '../../Ui/LoadingDetail';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import UseDianActions from '../../action/useDianActions';
import {  useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import moment from 'moment';
import  AutoProvider  from '../../privateRoute/AutoProvider';
import toast from 'react-hot-toast';

const TableInvoinceDian =() =>{

    const {id} = useParams()
    const {Dian} = useContext(AutoProvider)
    const {GetInvonceByIdReservation,GetPayAbono} =UseDianActions()
    const  {getPdfSigo} =UseDianActions()

    const {loading,error,InvonceByIdReservation,sigoBYIDpdf,payabono} = useSelector((state) => state.Dian)

    const sumWithInitial = InvonceByIdReservation.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.Abono;
    }, 0);

    const fetchData = async () => {
        await GetInvonceByIdReservation({id})
        await GetPayAbono({id})
    }

    useEffect(() =>{
        fetchData()
    },[])
    
    const fillContent =() =>{
        if(loading){
            return  <Loading color="success" style={{ width:"100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Descargando factura
          </Loading>
        }if(error){
            return <p>...error</p>
    }


    return  <Paper sx={{ width: '100%',margin:"10px" }}>
              <TableContainer  component={Paper}   onSubmit={(e) =>{
                e.preventDefault()
              }} >
              <LoadingDetail  
                              loading={true}
                              titleLoading={"Facturas emitidas por la Dian"}  />
                    <Table  > 
                    <TableHead>
                        <TableRow>
                        <TableCell align="right">Fecha</TableCell>
                        <TableCell align="right">Pago</TableCell>
                        <TableCell align="right">Nombre Recepcion</TableCell>
                        <TableCell align="right">Descargar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {InvonceByIdReservation.map((itemByIdReservation) =>{
                            
                      const Fecha =  moment(itemByIdReservation.Fecha).utc().format('YYYY/MM/DD')

                    const GnerarPdf = async () => {
                        window.open(itemByIdReservation.ID_facturacion, "_blank");
                    };

                      return (
                        <TableRow>
                        <TableCell align="right">{Fecha}</TableCell>
                        <TableCell align="right">${itemByIdReservation.Abono.toLocaleString()}</TableCell>
                        <TableCell align="right">{itemByIdReservation.name} {itemByIdReservation.lastname}</TableCell>
                        <TableCell align="right" >  
                          <Button
                            onClick={GnerarPdf}
                            icon={<FaFilePdf className="flex-contan" color="white" fontSize={20} />}
                            className="button-checking-detail-one-das"
                            color="error"
                          >
                            <span className="text-words">Descargar factura Sigo</span>
                          </Button></TableCell>
                      </TableRow>
                      )
                    })}
                    </TableBody>
                    <TableHead>
                        <TableRow>
                        <TableCell align="right">Total ${sumWithInitial.toLocaleString()}</TableCell>
                        </TableRow>
                    </TableHead>
                    </Table>
              </TableContainer> 
          </Paper>  
    }
    return (<>{fillContent()}</>)
}

export default TableInvoinceDian