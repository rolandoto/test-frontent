import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';    
import Container from "../../Ui/Container";
import LoadingDetail from "../../Ui/LoadingDetail";
import { AiOutlineEdit } from "react-icons/ai";
import "./style.css"
import { useHistory } from "react-router-dom";

const CheckingEditarOrganism =({DetailDashboard,id}) =>{
  const [quyery,setQuery] =useState()

    useEffect(() =>{
        fetch(`https://railway.grupo-hoteles.com/api/resecion/getdetailchecking/${id}`)
        .then(resp => resp.json())
        .then(data=> setQuery(data.query))
    },[])

    const history = useHistory()
      console.log(quyery)

      const huespe =[]
      for(let i=0;i<quyery?.length;i++){
        if(quyery[i-1] !==undefined){
            huespe.push(quyery[i])
        }       
      }

      const handEditar =(e) =>{
        history.push(`/editarpersonas/${e}`)
      }


      
      console.log(huespe)

      if(quyery?.length ==1) {
        return (
            <Container>
                <h1>no hay huespedes</h1>
          </Container>
        )
      }

    
        return (
            <Container>
            <TableContainer component={Paper}>
                <LoadingDetail  
                            loading={true}
                            titleLoading={"Acompañante"}  />
                <Table sx={{ minWidth: 650 ,marginTop:1}} size="small" aria-label="a dense table">
                    
                <TableHead>
                    <TableRow>
                    <TableCell>Nombre de los huespedes</TableCell>
                    <TableCell align="right">Apellido</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {huespe.map((row) => (
                    <TableRow
                    >
                        <TableCell >
                        {row.Nombre}
                        </TableCell>
                        <TableCell>{row.Apellido} </TableCell>
                        <TableCell className="editar-checking" onClick={() => handEditar(row.huespedes)}  ><AiOutlineEdit fontSize={30} color="black" /></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
          </Container>
        )

}

export default CheckingEditarOrganism