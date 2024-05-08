import React from "react"
import { Table } from "@nextui-org/react";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";

const CardImformeOcasionalMonth =({OcasionalMonth}) =>{
    return ( 
       <Table
      compact
      color={"error"}
      aria-label="Example static compact collection table"
      selectionMode="multiple"
      css={{
        height: "auto",
        minWidth: "100%",
        display:"content"
      }}
    >
      <Table.Header>
      <Table.Column>Ocasional</Table.Column>
        <Table.Column>Recepcionista</Table.Column>
        <Table.Column>Habitacion</Table.Column>
        <Table.Column>Forma pago</Table.Column>
        <Table.Column>Fecha ingreso</Table.Column>
        <Table.Column>Fecha salida</Table.Column>
        <Table.Column css={{
            width:"69px"
        }} >Fecha</Table.Column>
      </Table.Header>
      <Table.Body css={{
        display:"contents"
      }} >
        {OcasionalMonth.map((item,i) =>{
            const fecha = moment(item.Fecha).utc().format('YYYY/MM/DD')
            return (   <Table.Row key={i}>
                        <Table.Cell  css={{
            width:"69px",
        }}  > <AiFillHeart className="live-indicator-heart margin-right-rig " color="red"  fontSize={20}/></Table.Cell>
                        <Table.Cell> {item.username}</Table.Cell>
                        <Table.Cell>{item.Habitacion} {item.Numero}  </Table.Cell>
                        <Table.Cell>{item.Tipo_forma_pago} </Table.Cell>
                        <Table.Cell>{item.Time_ingreso} </Table.Cell>
                        <Table.Cell>{item.Time_salida} </Table.Cell>
                        <Table.Cell>{fecha} </Table.Cell>
                    </Table.Row>)
        })}
      </Table.Body>
    </Table>
    )
}


export default CardImformeOcasionalMonth