import { Table } from "@nextui-org/react";



const CardTableRoom  =({ItemValueRoom}) =>{
    
        return (  <Table
                    
            bordered
            shadow={false}
            selectionMode="multiple"
            aria-label="Example static bordered collection table"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
                >
                    <Table.Header>
                    <Table.Column>Canal</Table.Column>
                    <Table.Column>Abono</Table.Column>
                    <Table.Column>Cantidad</Table.Column>
                    </Table.Header>
                    <Table.Body>

                    {ItemValueRoom.map((itemChannel,e) => (
                         <Table.Row key={e}>
                            <Table.Cell>{itemChannel.nameChanel}</Table.Cell>
                            <Table.Cell>${parseInt(itemChannel.abono).toLocaleString()}</Table.Cell>
                            <Table.Cell>{itemChannel.cantidad}</Table.Cell>
                        </Table.Row>
                    ))}  
                    </Table.Body>
                </Table>
        )

}

export default CardTableRoom