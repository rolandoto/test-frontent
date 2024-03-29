import { config } from "../config";

const BASE_URL = `${config.serverRoute}/api/admin/`;

const readUrl = (url = "") =>
  url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${BASE_URL}/${url}`;

const isOk = (response) =>
  response.ok ? response.json() : new Error("Response is not ok");

const get = (url = "", headers = {}) =>
  fetch(`${config.serverRoute}/api/admin/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(isOk);

const post = ({ id_hotel, id_habitaciones, name_num }) => {
  return fetch(`${config.serverRoute}/api/admin/inserintoroomsadmin`, {
    method: "POST",
    body: JSON.stringify({ id_hotel, id_habitaciones, name_num }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Response is not ok");
    return res.json();
  });
};

const GetAdminStore = (url = "", headers = {}) => {
  return fetch(`${config.serverRoute}/api/admin/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(isOk);
};

const PostAdminStore = ({
  ID_Tipo_categoria,
  ID_Hoteles,
  Nombre,
  Cantidad,
  Precio,
  Fecha_registro,
  Precio_compra,
  Nombre_Recepcion,
}) => {
  return fetch(`${config.serverRoute}/api/admin/insertintostoreadmin`, {
    method: "POST",
    body: JSON.stringify({
      ID_Tipo_categoria,
      ID_Hoteles,
      Nombre,
      Cantidad,
      Precio,
      Fecha_registro,
      Precio_compra,
      Nombre_Recepcion,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Response is not ok");
    return res.json();
  });
};

const PostAvaible = ({ habitaciones, desde, hasta }) => {
  return fetch(`${config.serverRoute}/api/resecion/validateavaible`, {
    method: "POST",
    body: JSON.stringify({ habitaciones, desde, hasta }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const GetDetailReservation = (url = "") => {
  return fetch(`${config.serverRoute}/api/resecion/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const GetBictacoras = (url = "") => {
  return fetch(`https://grupo-hoteles.com/api/getBitacoraByIDHotel?${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Response is not ok");
    return res.json();
  });
};

const GetFormats = (url = "") => {
  return fetch(`https://grupo-hoteles.com/api/getFormatosByIDHotel?${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(isOk);
};

const GetContact = (url = "") => {
  return fetch(
    `https://grupo-hoteles.com/api/getNumberEmergencyByIDHotel?${url}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then(isOk);
};

const getForget = (url = "") => {
  return fetch(`https://grupo-hoteles.com/api/getReporte-olvidos?${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(isOk);
};

const insertPayABono = ({ data }) => {
  return fetch(`${config.serverRoute}/api/resecion/insertPayAbono`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const postUpdateRoomDetail = ({ ID_estado_habitacion, id }) => {
  return fetch(`${config.serverRoute}/api/resecion/RoomDetail`, {
    method: "POST",
    body: JSON.stringify({ ID_estado_habitacion, id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const postApiWhasatapp = ({ to, plantilla, name, url }) => {
  const formData = new FormData();
  formData.append("body", plantilla);
  formData.append(
    "token",
    "1c38cf1f1b92656924501747a458e4a6b5ac30306d29ed668f9bd8f99f2832fc6ee451"
  );
  formData.append("instance", "268");
  formData.append("to", to);
  formData.append("language", "es");
  formData.append("type", "text");
  const parametros = [
    { type: "text", text: url },
    { type: "text", text: name },
  ];
  formData.append("parameters", JSON.stringify(parametros));
  return fetch("https://whatslight.com/manager/ajax/chat_api.ajax.php", {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      if (resp.status === "error") throw new Error("Response is not ok");
      return resp.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

const postApiWhasatappCheckout = ({ to, plantilla, name, hotel, factura }) => {
  const formData = new FormData();
  formData.append("body", plantilla);
  formData.append(
    "token",
    "1c38cf1f1b92656924501747a458e4a6b5ac30306d29ed668f9bd8f99f2832fc6ee451"
  );
  formData.append("instance", "268");
  formData.append("to", to);
  formData.append("language", "es");
  formData.append("type", "text");
  const parametros = [
    { type: "text", text: hotel },
    { type: "text", text: "https://grupo-hoteles.com/suvenir" },
    { type: "text", text: factura },
  ];
  formData.append("parameters", JSON.stringify(parametros));
  return fetch("https://whatslight.com/manager/ajax/chat_api.ajax.php", {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      if (resp.status === "error") throw new Error("Response is not ok");
      return resp.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

const UploadImage = ({ file1, file2, ID }) => {
  const formData = new FormData();
  formData.append("myFile", file1);
  formData.append("myFile", file2);
  formData.append("id", ID);
  return fetch(
    `https://geco-backend-production.up.railway.app/api/resecion/uploadfile`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const UploadImageOne = ({ file1 }) => {
  const formData = new FormData();
  formData.append("myFile", file1);
  return fetch(
    `https://geco-backend-production.up.railway.app/api/resecion/uploadPopUp`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const UploadImageFirma = ({ file1, ID }) => {
  const formData = new FormData();
  formData.append("myFile", file1);
  formData.append("id", ID);
  return fetch(`${config.serverRoute}/api/resecion/uploadfileSignature`, {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const postUpdatailPounter = ({ Fecha_final, id, countSeguro, type }) => {
  return fetch(`${config.serverRoute}/api/resecion/UpdatePonter`, {
    method: "POST",
    body: JSON.stringify({ Fecha_final, id, countSeguro, type }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const postUpdatailPounterRange = ({
  desde,
  hasta,
  ID_Habitaciones,
  id,
  ID_estado_habiatcion,
}) => {
  return fetch(`${config.serverRoute}/api/resecion/UpdatePonterRange`, {
    method: "POST",
    body: JSON.stringify({
      desde,
      hasta,
      ID_Habitaciones,
      id,
      ID_estado_habiatcion,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const GetReservation = ({ url = "" }) => {
  return fetch(
    `${config.serverRoute}/api/resecion/getreservarecepcion/${url}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (!res.ok) throw new Error("Response is not ok");
    return res.json();
  });
};

const GetRoom = ({ url = "" }) => {
  return fetch(`${config.serverRoute}/api/resecion/getroomsresecion/${url}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Response is not ok");
    return res.json();
  });
};

const handchangeformapay = ({ ID, Tipo_forma_pago }) => {
  return fetch(`${config.serverRoute}/api/resecion/updateformapago`, {
    method: "POST",
    body: JSON.stringify({ ID, Tipo_forma_pago }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const validCheckingAll = ({ ID }) => {
  return fetch(`${config.serverRoute}/api/resecion/validChecking/${ID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const GetKpiUser = ({ month, year, idUser, ID_hotel }) => {
  return fetch(`${config.serverRoute}/api/resecion/userIdKpi`, {
    method: "POST",
    body: JSON.stringify({ month, year, idUser, ID_hotel }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (!resp.ok) throw new Error("Response is not ok");
    return resp.json();
  });
};

const postUpdateTarifaReservation = ({
  id,
  valid_buy,
  noches,
  Abono,
  ID_reservation,
  valor,
}) => {
  return fetch(
    `${config.serverRoute}/api/admin/posUpdateTarifasReservation/${id}`,
    {
      method: "POST",
      body: JSON.stringify({
        id,
        valid_buy,
        noches,
        Abono,
        ID_reservation,
        valor,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const postTarifaReservation = ({
  id_user,
  id_hotel,
  valor,
  Description,
  Fecha,
  ID_reservation,
  name_reservation,
  codigo_reserva,
  noches,
  Abono,
}) => {
  return fetch(`${config.serverRoute}/api/admin/postInsetTarifaReservation`, {
    method: "POST",
    body: JSON.stringify({
      id_user,
      id_hotel,
      valor,
      Description,
      Fecha,
      ID_reservation,
      name_reservation,
      codigo_reserva,
      noches,
      Abono,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const postApiWhasatappSolicitud = ({ to }) => {
  const formData = new FormData();
  formData.append("body", "solicitude");
  formData.append(
    "token",
    "1c38cf1f1b92656924501747a458e4a6b5ac30306d29ed668f9bd8f99f2832fc6ee451"
  );
  formData.append("instance", "268");
  formData.append("to", to);
  formData.append("language", "es");
  formData.append("type", "text");
  return fetch("https://whatslight.com/manager/ajax/chat_api.ajax.php", {
    method: "POST",
    body: formData,
  })
    .then((resp) => {
      if (resp.success) throw new Error("Response is not ok");
      return resp.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

const PostUploadCarPresent = ({ ID_Reserva, Username }) => {
  return fetch(
    `https://geco-backend-production.up.railway.app/api/resecion/uploadCartPresent`,
    {
      method: "POST",
      body: JSON.stringify({ ID_Reserva, Username }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const PostSearchValue = ({ serchvalue, type }) => {
  
  return fetch(`${config.serverRoute}/api/resecion/searchUsersaved`, {
    method: "POST",
    body: JSON.stringify({ serchvalue, type }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp.results;
    });
};

const PostRoomsOcasional = ({
  ID_habitacion,
  Fecha,
  Fecha_today,
  Time_ingreso,
  Time_salida,
  id_user,
  Hora_adicional,
  Persona_adicional,
  Tipo_forma_pago,
  Abono,
  ID_hotel,
}) => {
  return fetch(`${config.serverRoute}/api/resecion/RoomsOcasional`, {
    method: "POST",
    body: JSON.stringify({
      ID_habitacion,
      Fecha,
      Fecha_today,
      Time_ingreso,
      Time_salida,
      id_user,
      Hora_adicional,
      Persona_adicional,
      Tipo_forma_pago,
      Abono,
      ID_hotel,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const occasionalCartRoomInsertion = ({ data }) => {
  return fetch(`${config.serverRoute}/api/resecion/occasionalCartRoomInsertion`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp.results;
    });
};

const occasionalRoomDetails = ({ id }) => {
  return fetch(`${config.serverRoute}/api/resecion/occasionalRoomDetails`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
};

const occasionalUpdateProductData = ({ data }) => {
  return fetch(`${config.serverRoute}/api/resecion/occasionalUpdateProductData`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
}


const postInformContabilidad = ({ id }) => {
  return fetch(`${config.serverRoute}/api/resecion/postReservationContabilidad/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
}

const getReservaSendingContabilidad = ({ id }) => {
  return fetch(`${config.serverRoute}/api/resecion/getReservaSendingContabilidad/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
}

const PostResdianByIdReserva = ({ id, resdian }) => {
  return fetch(`${config.serverRoute}/api/resecion/postChangeResdian`, {
    method: "POST",
    body: JSON.stringify({ id, resdian }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
}


const PostSeacrhHotelsByIdHotel = ({ id, desde, hasta }) => {
  return fetch(`${config.serverRoute}/api/hotels//SeacrhHotelsById`, {
    method: "POST",
    body: JSON.stringify({ id, desde, hasta }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return resp;
    });
}
const PostAutenticationDian = () => {
  const body = {
    username: '10elementossas@gmail.com',
    access_key: "YzFmOTA0MjktNmVmYi00YzMzLWJmOTItN2QyNDk1NGE1YzIzOmlkVioxSDIjalE="
  };
  return fetch(`https://private-anon-1be4d3c754-siigoapi.apiary-proxy.com/auth`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data
    })
}

const GetLisClienteDian = ({token,document}) => {
  return fetch(`https://private-anon-1be4d3c754-siigoapi.apiary-proxy.com/v1/customers?identification=${document}`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};

const PostCreatebill = ({body,token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/invoices`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      return data
    }).catch((e) =>{
      console.log(e)
    })
}

const GetTypeDocuments= ({token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/document-types?type=FV`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};

const GetSellerDian= ({token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/users`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};

const GetProducts= ({token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/products?created_start=2024-02-06`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};


const GetCostCenter= ({token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/cost-centers`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};

const GetTypePayment= ({token}) => {
  return fetch(`https://private-anon-407a01d67e-siigoapi.apiary-proxy.com/v1/payment-types?document_type=FV`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};


const GetSalesInvoice= ({token,id}) => {
  return fetch(`https://private-anon-1faab24ca7-siigoapi.apiary-proxy.com/v1/invoices/${id}/pdf`, {
    method: "GET",
    headers: {
      "Authorization":token,
      'Content-Type': 'application/json',
      'Partner-Id': 'officegroup'
    },
  }).then((resp) => {
    return resp.json();
  })
  .then((data) => {
    return data
  })
};




const GetTypeRoom = ({id}) => {
  return fetch(`${config.serverRoute}/api/resecion/getTypeRoomsByIDHotelid_hotel/${id}`, {
    method: "POST",
    headers:{
      'Content-type':'application/json'
  },
  }).then(resp =>{
    return resp.json()
  }).then(resp=>{
    return resp
  })
};


const GetServiceInfomeRoomtoSell =({id,fechaInicio,fechaFinal})=>{
  return fetch(`${config.serverRoute}/api/resecion/informeroomtosell/${id}`,{
      method:'POST',
      headers:{
          'Content-type':'application/json'
      },  
      body: JSON.stringify({fechaInicio,fechaFinal})
  }).then(resp =>{
      if(!resp.ok) throw new Error('Response is not ok')
      return resp.json()
  }).then(resp=>{
      return resp
  })
}


const PostRegisterTRA = ({ body, token }) => {
 
  return fetch(`${config.serverRoute}/api/resecion/pmstraone`, {
    method: "POST",
    headers:{
      'Content-type':'application/json'
  },
    body:JSON.stringify({body,token})
  })
  .then((resp) => {
    if(!resp.ok) throw new Error('Response is not ok')
    return resp.json();
  })
  .then((data) => {
  
   return data
  })
};


const PostRegisterTRATwo = ({ body, token }) => {

  return fetch(`${config.serverRoute}/api/resecion/pmstratwo`, {
    method: "POST",
    headers:{
      'Content-type':'application/json'
  },
    body:JSON.stringify({body,token})
  })
  .then((resp) => {
    if(!resp.ok) throw new Error('Response is not ok')
    return resp.json();
  })
  .then((data) => {
   return data
  })
};


const PostInsertSigOpdfbyid = ({ id, id_sigo }) => {
  return fetch(`${config.serverRoute}/api/resecion/insertpdfsigo`, {
    method: "POST",
    headers:{
      'Content-type':'application/json'
  },
    body:JSON.stringify({ id, id_sigo})
  })
  .then((resp) => {
    if(!resp.ok) throw new Error('Response is not ok')
    return resp.json();
  })
  .then((data) => {
   return data
  })
};


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
  GetReservation,
  GetRoom,
  UploadImage,
  handchangeformapay,
  validCheckingAll,
  UploadImageFirma,
  postApiWhasatappCheckout,
  GetKpiUser,
  UploadImageOne,
  postUpdateTarifaReservation,
  postTarifaReservation,
  postApiWhasatappSolicitud,
  PostUploadCarPresent,
  PostSearchValue,
  PostRoomsOcasional,
  occasionalCartRoomInsertion, 
  occasionalRoomDetails,
  occasionalUpdateProductData,
  postInformContabilidad,
  PostResdianByIdReserva,
  PostSeacrhHotelsByIdHotel,
  getReservaSendingContabilidad,
  PostAutenticationDian,
  GetLisClienteDian,
  GetTypeDocuments,
  GetSellerDian,
  GetProducts,
  PostCreatebill,
  GetCostCenter,
  GetTypePayment,
  GetSalesInvoice,
  GetTypeRoom,
  GetServiceInfomeRoomtoSell,
  PostRegisterTRA,
  PostRegisterTRATwo,
  PostInsertSigOpdfbyid
};
