const fromServiceMotels =apiresponse =>{

     const {link} = apiresponse.LisMotel.data.result 
         if(Array.isArray(link)){
                const Motels  = link.map((mt) =>{
                    const {id,name} = mt
                    return {id,name}
                })
            return Motels
        }
}

export const ServiceMotel = () =>{
    const url = `http://localhost:4000/api/listmotel`
    return fetch(url)
       .then(res => res.json())
       .then(fromServiceMotels)
}


