const fromServiceMotels =apiresponse =>{

     const link = apiresponse
         if(Array.isArray(link)){
                const Motels  = link.map((mt) =>{
                    const {id_hotel,nombre,segurohotelero,valorseguro} = mt
                    return {id_hotel,nombre,segurohotelero,valorseguro}
                })
            return Motels
        }
}

export const ServiceMotel = () =>{
    const url = `https://grupo-hoteles.com/api/getHotels`
    return fetch(url)
       .then(res => res.json())
       .then(fromServiceMotels)
}