const ENDPOINT ='http://localhost:4000/api/admin/getcategoryadmin'

const ServiceTypeCategorys = () => {
    return fetch(`${ENDPOINT}`,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        },
    }).then(resp =>{
        return resp.json();
    }).then(resp=>{
        return resp;
    })
}

export default ServiceTypeCategorys