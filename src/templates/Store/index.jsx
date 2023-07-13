
import React, { useState,useEffect,useContext} from "react"
import ItemCard from "../../component/ItemCard"
import Cart from "../../organisms/Store/Cart"
import ModalStore from "../../component/Modal/ModalStore";
import Organize from "../../component/Organize";
import Invoince from "../../component/Invoince";
import { IoMdCloseCircle } from "react-icons/io";
import DebitCard from "../../component/DebitCard/DebitCard";
import MenuItem from "../../component/MenuItems/MenuItems";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import ServiceaInsertCart from "../../service/serviceaInsertCart";
import { AiOutlineCaretLeft } from "react-icons/ai";
import ServiceReservationCheckin from "../../service/ServiceReservasCheckin";
import moment from "moment";
import "moment/locale/es";
import ServiceaInsertStore from "../../service/ServiceInsertCart";

const StoreTemplate =({Store}) =>{

    const MenuItems = [
        {
          id: 1,
          itemId: "Bebidas",
          name: "Bebidas",
          imgSrc:
          "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
        },
        {
          id: 2,
          itemId: "Snacks",
          name: "Snacks",
          imgSrc:
             "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
        } ,
        {
          id: 3,
          itemId: "Souvenir",
          name: "Souvenir",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1_Mesa-06.png?raw=true",
        } ,
        {
          id:4,
          itemId: "Aseo p.",
          name: "Aseo p.",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
        },
        {
          id: 5,
          itemId: "Adultos",
          name: "Adultos",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-05-removebg-preview.png?raw=true",
        } ,
        {
          id: 6,
          itemId: "Lenceria",
          name: "Lencería",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/Lencenria.png?raw=true",
        },
        {
          id: 7,
          itemId: "Servicio",
          name: "Servicio",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/servicio.png?raw=true",
        } 
      ];

      const Items = [
        {
          id: 1,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "ABSOLUTE BOTELLA 700MIL",
          ratings: 5,
          stock:"1",
          price: 120.000,
        },
        {
          id: 2,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "ABSOLUTE MEDIA",
          ratings: 6,
          stock:"1",
          price: 95.000,
        },
        {
          id: 80,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "AGUA CON GAS",
          ratings: 6,
          stock:"38",
          price: 114.000,
        },
        {
          id: 3,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "AGUA NATURAL",
          ratings: 6,
          stock:"72",
          price: 216.000,
        },
        {
          id: 4,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "AGUA ARDIENTE 1/2",
          ratings: 6,
          stock:"3",
          price: 105.000,
        },
        {
          id: 5,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "AGUARDIENTE 1/4",
          ratings: 6,
          stock:"2",
          price: 46.000,
        },
        {
          id: 6,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "AGUA ARDIENTE 1L",
          ratings: 6,
          stock:"1",
          price: 55.000,
        },
        {
          id: 7,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name:"AGUILA LIGHT",
          ratings: 6,
          stock:"54",
          price: 243.000,
        },
        {
          id: 60,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name:"AGUILA NORMAL",
          ratings: 6,
          stock:"22",
          price: 99.000,
        },
        {
          id: 8,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "ALKASELTZER",
          ratings: 6,
          stock:"12",
          price: 30.000,
        },
        {
          id: 9,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "ALOE VERA",
          ratings: 6,
          stock:"30",
          price: 120.000,
        },
        {
          id: 10,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "ANDINA",
          ratings: 6,
          stock:"27",
          price: 135.000,
        },
        {
          id: 11,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "BONFIEST SOBRE",
          ratings: 6,
          stock:"4",
          price: 12.000,
        },
        {
          id: 12,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "BUCANA 1/2",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 13,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "CLUB COLOMBIA LATA",
          ratings: 6,
          stock:"8",
          price: 44.000,
        },
        {
          id: 14,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "COCA COLA",
          ratings: 6,
          stock:"51",
          price: 204.000,
        },
        {
          id: 15,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "COLA Y POLA",
          ratings: 6,
          stock:"43",
          price: 215.000,
        },
        {
          id: 16,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "CORONITAS",
          ratings: 6,
          stock:"29",
          price: 150.800,
        },
        {
          id: 17,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "COSTEÑA",
          ratings: 6,
          stock:"24",
          price: 120.000,
        },
        {
          id: 18,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "DESODORANTE",
          ratings: 6,
          stock:"15",
          price: 30.000,
        },
        {
          id: 19,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "DETODITO SURTIDO",
          ratings: 6,
          stock:"17",
          price: 51.000,
        },
        {
          id: 20,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "DORITOS",
          ratings: 6,
          stock:"16",
          price:32.000,
        },
        {
          id: 21,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "ESPUMA JACUZZI",
          ratings: 6,
          stock:"16",
          price: 80.000,
        },
        {
          id: 22,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "ESTATUS PEQUEÑA",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 23,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "STELLA ARTOIS",
          ratings: 6,
          stock:"27",
          price: 243.000,
        },
        {
          id: 24,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "GASEOSA POSTOBON",
          ratings: 6,
          stock:"34",
          price: 102.000,
        },
  
        {
          id: 25,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "GATORADE",
          ratings: 6,
          stock:"22",
          price: 110.000,
        },
  
        {
          id: 26,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "GOMINA GEL",
          ratings: 6,
          stock:"0",
          price: 0,
        },
  
        {
          id: 27,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "HALLS",
          ratings: 6,
          stock:"9",
          price: 18.000,
        },
  
        {
          id: 28,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "HEINIKEN",
          ratings: 6,
          stock:"36",
          price: 216.000,
        },
        {
          id: 29,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "HIELO BOLSA GRANDE",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 30,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "JOSE CUERVO 375ML",
          ratings: 6,
          stock:"0",
          price: 0,
        },
  
        {
          id: 31,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "JOSE CUERVO 750ML",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 32,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "JUGO HIT",
          ratings: 6,
          stock:"30",
          price: 120.000,
        },
  
        {
          id: 33,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "JUMBO MANI MEDIANA",
          ratings: 6,
          stock:"24",
          price: 72.000,
        },
  
        {
          id: 34,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "KIT DE AFEITAR",
          ratings: 6,
          stock:"13",
          price: 55.000,
        },
  
        {
          id: 35,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "KIT DENTAL",
          ratings: 6,
          stock:"0",
          price: 0,
        },
  
        {
          id: 36,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "LECHERITA",
          ratings: 6,
          stock:"12",
          price: 42.000,
        },
        
        {
          id: 37,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "MADUROS P",
          ratings: 6,
          stock:"16",
          price: 40.000,
        },
        
        {
          id: 38,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "MANI ESPECIAL P",
          ratings: 6,
          stock:"25",
          price: 87.000,
        },
        
        {
          id: 39,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "MR TEE",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        
        {
          id: 40,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "OLD PARR 500ML",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        
        {
          id: 41,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "OLD PARR 750ML",
          ratings: 6,
          stock:"1",
          price: 165.000,
        },
        
        {
          id: 42,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "PAPITAS SURDITAS",
          ratings: 6,
          stock:"18",
          price: 45.000,
        },
        
        {
          id: 43,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "PILSEN",
          ratings: 6,
          stock:"25",
          price: 125.000,
        },
        
        {
          id: 44,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "PINTURA STEVEN ECHEVERRI",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 61,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "PONY MALTA",
          ratings: 6,
          stock:"38",
          price: 95.000,
        },
        
        {
          id: 61,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "PRESERVATIVO DUO",
          ratings: 6,
          stock:"66",
          price: 198.000,
        },
        {
          id: 61,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "PROTECTORAS NOSOTRAS",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 63,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "REDBULL",
          ratings: 6,
          stock:"15",
          price: 120.000,
        },
        
        {
          id: 45,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "REDDS",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        
        {
          id: 46,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "RON CALDAS 1/2",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        
        {
          id: 47,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "RON CALDAS 1/4",
          ratings: 6,
          stock:"3",
          price: 81.000,
        },
        
        {
          id:48 ,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "RON MEDELLIN 1/2",
          ratings: 6,
          stock:"4",
          price: 140.000,
        },
        
        {
          id: 49,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "RON MEDELLIN 1/4",
          ratings: 6,
          stock:"5",
          price: 125.000,
        },
        {
          id: 50,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "SALCHICHAS TARRO",
          ratings: 6,
          stock:"15",
          price: 82.000,
        },
        {
          id: 51,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "SMIRNOFF",
          ratings: 6,
          stock:"17",
          price: 170.000,
        },
        {
          id: 52,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-02.png?raw=true",
          name: "SODA",
          ratings: 6,
          stock:"27",
          price:108.000,
        },
        {
          id: 53,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "TAPABOCA",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 54,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "TOALLA NOSOTRAS",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 55,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-03.png?raw=true",
          name: "TRIDENT",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 56,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/image-pms/blob/main/1-04-removebg-preview.png?raw=true",
          name: "VASO HABITACION",
          ratings: 6,
          stock:"0",
          price: 0,
        },
        {
          id: 57,
          itemId: "cocina01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "VIVE 100",
          ratings: 6,
          stock:"21",
          price:94.000
        },
      ]

    

    const [state,setState] = useState(false)

    const [isMainData, setMainData] = useState(
      Store?.query?.filter((element) => element.Nombre_categoria == "Snacks"));    

    console.log(isMainData)
      
    const [num,setNum] =useState()
    
    const handModal =() =>{
        setState(true)
    }

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      const menuLi = document.querySelectorAll("#menu li");
  
      function setMenuActive() {
        menuLi.forEach((n) => n.classList.remove("active"));
        this.classList.add("active");
      }
      
      menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  
      // menu Card active class changer
      const menuCard = document
        .querySelector(".rowContainer")
        .querySelectorAll(".rowMenuCard");
  
      function setMenuCardActive() {
        menuCard.forEach((n) => n.classList.remove("active"));
        this.classList.add("active");
      }
      
      menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
    }, [isMainData, totalPrice]);

      const setData = (itemId) => {
        setMainData( Store?.query?.filter((element) => element.Nombre_categoria ==  itemId));
      };
    
    const handCart =(evt) =>{

    const to =  carts.cart.find(index => index.ID === evt.ID)

    const findImage = MenuItems.find(itemCategory =>  itemCategory.id ==evt.id_categoria )

    if(!to) {

      console.log({"cart":carts})
     
      return  setCarts({
          ...carts,
          cart:[...carts.cart,{...evt,quantity:1,img:findImage.imgSrc}]
        })
      }
    }

    const {carts,setCarts,jwt} = useContext(AutoProvider)

    const [priceCart,setPriceCart] =useState()

    const handTotal =({total}) =>{
      setPriceCart(total)
    }

    const [stateOne,setStateOne] = useState(false)

    const handSubmit =() =>{
      setState(false)
      setStateOne(true)
    }

    const [organize,setOrganize] =useState(false)

    const handOrganize =() =>{
      setOrganize(true)
      setState(false)
    }
    const [raiting,setRaiting]= useState('')

    const handRaiting =(e)=>{
      setRaiting(e.target.value)
  }

    const [invoice,setInvoice] =useState(false)
    const [client,setClient] =useState("")
    const [identification,setIndentification] =useState("")
    const [peopleReservation,setPeopleReservation] =useState()
    const [peopleId,setPeopleId] =useState()

    const handChange =(e) =>{
      setPeopleId(e.target.value)
    }

    const handModalInvoice =() =>{
      setOrganize(false)
      setInvoice(true)
    }


    useEffect(() =>{
      ServiceReservationCheckin({id:jwt.result.id_hotel}).then(index =>{
        setPeopleReservation(index)

      })
    },[setPeopleReservation])

 
  // `getDate()` devuelve el día del mes (del 1 al 31)
 
// obtener la fecha de hoy en formato `MM/DD/YYYY`
  const  now = moment().format("YYYY/MM/DD");
  
    const data ={
      ID_Reserva:peopleId,
      Cart:carts.cart,
      ID_Hoteles:jwt.result.id_hotel,
      Fecha_compra:now,
      Nombre_recepcion:jwt.result.name,
    }
    
    const handSubmitInsertCart =() =>{
       ServiceaInsertCart({data}).then(index =>{
          window.location.reload()
       }).catch(e=> {
          console.log(e)
       })
    }

    var n1 = 2000;
    var n2 = 1000;
    var numero = Math.floor(Math.random() * (n1 - (n2 - 1))) + n2;

    const dataOne ={
      ID_Reserva:numero,
      Cart:carts.cart,
      ID_hotel:jwt.result.id_hotel,
      Fecha_compra:now,
      Nombre_persona:client,
      Forma_pago:raiting,
      Num_documento:identification,
      Nombre_recepcion:jwt.result.name
    }

    console.log(dataOne)

    const handSubmitInsertCartOne =() =>{
      ServiceaInsertStore({data:dataOne}).then(index =>{
         console.log("entro")
      }).catch(e=> {
         console.log(e)
      })
   }

    const {cart} = carts
    const currenCart =[]

    for(let i=0;i<cart.length;i++){
      currenCart.push({
          name:cart[i].Nombre,
          price:cart[i].Precio
        })
    }

    const [to,setTo] =useState()

    useEffect(()  =>{
        fetch("http://localhost:4000/api/resecion/resolucion")
        .then(res => res.json())
        .then(data => setTo(data?.query))
    },[])

    const  dataCount = to?.find(index => index.ID === 1)

    useEffect(() => {
      const toggleIcon = document.querySelector(".toggleMenu");
      console.log(toggleIcon)
      toggleIcon.addEventListener("click", () => {
        document.querySelector(".rightMenu").classList.toggle("active");
        console.log(true)
      });

      toggleIcon.addEventListener("click", () => {
        document.querySelector(".ocultar").classList.toggle("active");
        console.log(true)
      });
    }, []);
    

    console.log(dataOne)
        return (    
            <div className="mainContainer">
                <div className="rowContainer" >
                        {MenuItems?.map((index,e)  => (
                        <MenuItem
                                key={e}
                                {...index}
                                    setData={setData}    />
                        ))}
                </div>
                <div className="grid-container" >
                        {isMainData.map((index,e)  =>  (
                            <ItemCard
                                key={e} 
                                index={index}  
                                handCart={handCart}  /> 
                        ))}
                    <ModalStore state={state} 
                                setState={setState} 
                                handSubmit={handSubmit}  
                                handOrganize={handOrganize} />

                    {stateOne && <div className="border-ri" >
                            <div className="content-Modal" >
                                    <div className="handclose" onClick={() => setStateOne(false)}>
                                        <IoMdCloseCircle   fontSize={30} color="black" />
                                    </div>
                                <div  className="form-login">
                                      <li>
                                                <label className="title-stores" >Asignar habitacion</label>
                                                <select onChange={handChange}
                                                        value={peopleId}
                                                        name="disponibilidad"
                                                        className='select-hotel-type-rooms'>
                                                    <option></option>
                                                    {peopleReservation?.query?.map(category =>(
                                                        <option 
                                                        value={category.id}   
                                                        key={category.id}>
                                                         {category.Numero}  {category.title}  {category.Apellido}
                                                    </option>
                                                    )
                                                    )}
                                                </select>
                                      </li>
                                    <button className='button-login' onClick={handSubmitInsertCart} >Asignar habitacion</button>
                                </div> 
                            </div>
                    </div>
                    }

                    {organize &&  <Organize 
                                        setOrganize={setOrganize} 
                                        handModalInvoice={handModalInvoice}
                                        handRaiting={handRaiting}
                                        raiting={raiting} 
                                        setClient={setClient}
                                        client={client}
                                        setIndentification={setIndentification}
                                        identification={identification}
                                        />
                    }

                    {invoice && <Invoince
                                        handSubmitInsertCartOne={handSubmitInsertCartOne}
                                        tienda={true}
                                        dataCount={dataCount}
                                        setInvoice={setInvoice} 
                                        carts={currenCart}
                                        priceCart={priceCart}
                                        client={client} 
                                        identification={identification}
                                        raiting={raiting} />
                    }
                        </div>
                        <div className="rightMenu">
                          <button className=" toggleMenu  ocultar" > <AiOutlineCaretLeft fontSize={50} color="black" /></button>
                            <div className="debitCardContainer">
                                <div className="debitCard">
                                    <DebitCard />
                                </div>
                            </div>
                            {!carts.cart.length>0 ? (
                                <div className="addSomeItem">
                                </div>
                            ) : (
                                <Cart
                                    handTotal={handTotal} 
                                    handModal={handModal} 
                                    priceCart={priceCart} 
                                    carts={carts} 
                                    Items={Store} />
                            )}
                            </div> 
                 
              </div>
        )

}

export default StoreTemplate