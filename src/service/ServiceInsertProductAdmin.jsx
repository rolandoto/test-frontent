import { config } from "../config";

const ENDPOINT =`${config.serverRoute}/api/admin/insertintostoreadmin`

const ServiceInsertProductAdmin = ({ ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio }) => {

    return fetch(`${ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({ ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio })
    }).then( resp => {
        return resp.json();
    }).then( resp => {
        return resp;
    })
}

export default ServiceInsertProductAdmin;