const fromServiceMotels =apiresponse =>{

     const link = apiresponse
         if(Array.isArray(link)){
                const Motels  = link.map((mt) =>{
                    const {id_hotel,nombre} = mt
                    return {id_hotel,nombre}
                })
            return Motels
        }
}

export const ServiceMotel = () =>{
    const url = `https://grupohoteles.co/api/getHotels`
    return fetch(url)
       .then(res => res.json())
       .then(fromServiceMotels)
}


