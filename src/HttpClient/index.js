
const BASE_URL = 'http://localhost:4000/api/admin/'

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${BASE_URL}/${url}`


    const isOk = (response) =>
    response.ok
      ? response.json()
      : new Error('Response is not ok')

  const get = (url = '', headers = {}) =>
    fetch((`http://localhost:4000/api/admin/${url}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(isOk)

  const post =({id_hotel,id_habitaciones,name_num}) =>{
     return fetch((`http://localhost:4000/api/admin/inserintoroomsadmin`),{
        method:"POST",
        body:JSON.stringify({id_hotel,id_habitaciones,name_num}),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if(!res.ok) throw new Error('Response is not ok')
        return  res.json()
      })
  }

  const GetAdminStore =(url = '', headers = {}) =>{
    return fetch((`http://localhost:4000/api/admin/${url}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(isOk)
  }

  const PostAdminStore =( {ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio}) =>{
    return fetch((`http://localhost:4000/api/admin/insertintostoreadmin`),{
       method:"POST",
       body:JSON.stringify({ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio}),
       headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
       }
     }).then(res => {
       if(!res.ok) throw new Error('Response is not ok')
       return  res.json() 
     })
 }

 //recepcion endopoint

 const PostAvaible =({habitaciones,desde,hasta}) =>{
    return fetch(("http://localhost:4000/api/resecion/validateavaible"),{
      method:"POST",
      body:JSON.stringify({habitaciones,desde,hasta}),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
    })
 }

const GetDetailReservation=(url="") =>{
  return fetch((`http://localhost:4000/api/resecion/${url}`), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if(!res.ok) throw new Error('Response is not ok')
    return  res.json() 
  })
}

const GetBictacoras=(url="") =>{
  return fetch((`https://grupohoteles.co/api/getBitacoraByIDHotel?${url}`),{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if(!res.ok) throw new Error('Response is not ok')
    return  res.json() 
  })
}

const GetFormats=(url="") =>{
 return fetch((`https://grupohoteles.co/api/getFormatosByIDHotel?${url}`),{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    }
  }).then(isOk)
}

const GetContact =(url="") =>{
  return fetch((`https://grupohoteles.co/api/getNumberEmergencyByIDHotel?${url}`),{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    }
  }).then(isOk)
}

  export default {
    get,
    post,
    GetAdminStore,
    PostAdminStore,
    PostAvaible,
    GetDetailReservation,
    GetBictacoras,
    GetFormats,
    GetContact
  }
  