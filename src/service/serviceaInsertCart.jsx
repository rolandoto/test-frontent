const ENDPOINT ='http://localhost:4000/api/resecion/insertcartreservation'

const ServiceaInsertCart =({data})=>{
    return fetch(`${ENDPOINT}/`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceaInsertCart