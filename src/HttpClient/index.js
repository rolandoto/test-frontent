import { config } from "../config"

const BASE_URL =`${config.serverRoute}/api/admin/`

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${BASE_URL}/${url}`


    const isOk = (response) =>
    response.ok
      ? response.json()
      : new Error('Response is not ok')

  const get = (url = '', headers = {}) =>
    fetch((`${config.serverRoute}/api/admin/${url}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(isOk)

  const post =({id_hotel,id_habitaciones,name_num}) =>{
     return fetch((`${config.serverRoute}/api/admin/inserintoroomsadmin`),{
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
    return fetch((`${config.serverRoute}/api/admin/${url}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(isOk)
  }

  const PostAdminStore =( {ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio,Fecha_registro,Precio_compra,Nombre_Recepcion}) =>{
    return fetch((`${config.serverRoute}/api/admin/insertintostoreadmin`),{
       method:"POST",
       body:JSON.stringify({ID_Tipo_categoria, ID_Hoteles, Nombre, Cantidad, Precio,Fecha_registro,Precio_compra,Nombre_Recepcion}),
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
    return fetch((`${config.serverRoute}/api/resecion/validateavaible`),{
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
  return fetch((`${config.serverRoute}/api/resecion/${url}`), {
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
  return fetch((`https://grupo-hoteles.com/api/getBitacoraByIDHotel?${url}`),{
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
 return fetch((`https://grupo-hoteles.com/api/getFormatosByIDHotel?${url}`),{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
    }
  }).then(isOk)
}

const GetContact =(url="") =>{
  return fetch((`https://grupo-hoteles.com/api/getNumberEmergencyByIDHotel?${url}`),{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    }
  }).then(isOk)
}

const getForget =(url="") =>{
  return fetch((`https://grupo-hoteles.com/api/getReporte-olvidos?${url}`),{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    }
  }).then(isOk)
}


const insertPayABono = ({data}) =>{
  return fetch((`${config.serverRoute}/api/resecion/insertPayAbono`),{
    method:"POST",
      body:JSON.stringify({data}),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  })
}

const postUpdateRoomDetail = ({ID_estado_habitacion,id}) =>{
  return fetch((`${config.serverRoute}/api/resecion/RoomDetail`),{
    method:"POST",
      body:JSON.stringify({ID_estado_habitacion,id}),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  })
}


const postApiWhasatapp = ({ to, plantilla,languaje,name }) => {
  const formData = new FormData();
  formData.append('body', plantilla);
  formData.append('token', '1c38cf1f1b92656924501747a458e4a6b5ac30306d29ed668f9bd8f99f2832fc6ee451');
  formData.append('instance', '268');
  formData.append('to', to);
  formData.append('language', "es");
  formData.append('type', 'text');
  const parametros = [
    { type: 'text', text: 'Paola' },
    { type: 'text', text: 'https://grupo-hoteles.com/planes_turisticos' },
    { type: 'text', text: ' https://grupo-hoteles.com/suvenir' },
  ];
  formData.append('parameters', JSON.stringify(parametros));
  return fetch('https://whatslight.com/manager/ajax/chat_api.ajax.php', {
    method: 'POST',
    body: formData,
  })
    .then(resp => {
      if (resp.status === 'error') throw new Error('Response is not ok');
      return resp.json();
    }).catch(e =>{
      console.log(e)
    })
};

const postUpdatailPounter= ({Fecha_final,id,countSeguro}) =>{
  return fetch((`${config.serverRoute}/api/resecion/UpdatePonter`),{
    method:"POST",
      body:JSON.stringify({Fecha_final,id,countSeguro}),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  })
}


const postUpdatailPounterRange= ({desde,hasta,ID_Habitaciones,id}) =>{
  return fetch((`${config.serverRoute}/api/resecion/UpdatePonterRange`),{
    method:"POST",
      body:JSON.stringify({desde,hasta,ID_Habitaciones,id}),
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  })
}

const GetReservation=({url=""}) =>{
  return fetch((`${config.serverRoute}/api/resecion/getreservarecepcion/${url}`),{
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

  export default {
    get,
    post,
    GetAdminStore,
    PostAdminStore,
    PostAvaible,
    GetDetailReservation,
    GetBictacoras,
    GetFormats,
    GetContact,
    getForget,
    insertPayABono,
    postUpdateRoomDetail,
    postApiWhasatapp,
    postUpdatailPounter,
    postUpdatailPounterRange,
    GetReservation
  }
  