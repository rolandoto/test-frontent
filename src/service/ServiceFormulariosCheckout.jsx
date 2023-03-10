

const ENDPOINT =`https://grupo-hoteles.com/api/updateFormulario`

    const ServiceFormulariosCheckout =({id,status,fecha_ingreso,fecha_salida,valortotal})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },  
            body: JSON.stringify({id,status,fecha_ingreso,fecha_salida,valortotal})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceFormulariosCheckout