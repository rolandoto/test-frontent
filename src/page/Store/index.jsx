import React, { useEffect, useState,createContext, useContext, useReducer } from "react"
import "./index.css"



const Store =() => {

    const MenuItems = [
        {
          id: 1,
          itemId: "bebidas01",
          name: "Bebidas",
        },
        {
          id: 2,
          itemId: "snacks01",
          name: "Snacks",
          imgSrc:
            "https://cdn-icons.flaticon.com/png/512/4943/premium/4943197.png?token=exp=1651938355~hmac=3b059128658083fde793c9770a471847",
        } ,
        {
          id: 3,
          itemId: "souvenir01",
          name: "Souvenir",
          imgSrc:
            "https://cdn-icons.flaticon.com/png/512/4943/premium/4943197.png?token=exp=1651938355~hmac=3b059128658083fde793c9770a471847",
        } ,
        {
          id: 4,
          itemId: "drogueria01",
          name: "Drogueria",
          imgSrc:
            "https://cdn-icons.flaticon.com/png/512/4943/premium/4943197.png?token=exp=1651938355~hmac=3b059128658083fde793c9770a471847",
        },
        {
          id: 5,
          itemId: "eroticos01",
          name: "Eroticos",
          imgSrc:
            "https://cdn-icons.flaticon.com/png/512/4943/premium/4943197.png?token=exp=1651938355~hmac=3b059128658083fde793c9770a471847",
        } 
      ];

    
      const Items = [
        {
          id: 1,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/2c9f9610-f6b2-4305-aac4-45191155d710-removebg-preview.png?raw=true",
          name: "ABSOLUTE BOTELLA 700MIL",
          ratings: 5,
          stock:"1",
          price: "120,000",
        },
        {
          id: 2,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/22aaf476-273e-443b-8a69-1b5a56c157f8-removebg-preview.png?raw=true",
          name: "ABSOLUTE MEDIA",
          ratings: 6,
          stock:"1",
          price: "95,000",
        },
        {
          id: 80,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/IMG_2280-removebg-preview.png?raw=true",
          name: "AGUA CON GAS",
          ratings: 6,
          stock:"38",
          price: "114,000",
        },
        {
          id: 3,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/15ad09db-b579-47fc-a17e-a0e605d3c5f5-removebg-preview.png?raw=true",
          name: "AGUA NATURAL",
          ratings: 6,
          stock:"72",
          price: "216,000",
        },
        {
          id: 4,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/37a2d677-e44f-4fba-88fa-a2931a6a8b7b-removebg-preview.png?raw=true",
          name: "AGUA ARDIENTE 1/2",
          ratings: 6,
          stock:"3",
          price: "105,000",
        },
        {
          id: 5,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/39fe9914-bdc3-4dac-880b-b5b6cd28dc8e-removebg-preview.png?raw=true",
          name: "AGUARDIENTE 1/4",
          ratings: 6,
          stock:"2",
          price: "46,000",
        },
        {
          id: 6,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "AGUA ARDIENTE 1L",
          ratings: 6,
          stock:"1",
          price: "55,000",
        },
        {
          id: 7,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name:"AGUILA LIGHT",
          ratings: 6,
          stock:"54",
          price: "243,000",
        },
        {
          id: 60,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name:"AGUILA NORMAL",
          ratings: 6,
          stock:"22",
          price: "99,000",
        },
        {
          id: 8,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "ALKASELTZER",
          ratings: 6,
          stock:"12",
          price: "30,000",
        },
        {
          id: 9,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "ALOE VERA",
          ratings: 6,
          stock:"30",
          price: "120,000",
        },
        {
          id: 10,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "ANDINA",
          ratings: 6,
          stock:"27",
          price: "135,000",
        },
        {
          id: 11,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "BONFIEST SOBRE",
          ratings: 6,
          stock:"4",
          price: "12,000",
        },
        {
          id: 12,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "BUCANA 1/2",
          ratings: 6,
          stock:"0",
          price: "0,000",
        },
        {
          id: 13,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "CLUB COLOMBIA LATA",
          ratings: 6,
          stock:"8",
          price: "44,000",
        },
        {
          id: 14,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "COCA COLA",
          ratings: 6,
          stock:"51",
          price: "204,000",
        },
        {
          id: 15,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "COLA Y POLA",
          ratings: 6,
          stock:"43",
          price: "215,000",
        },
        {
          id: 16,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "CORONITAS",
          ratings: 6,
          stock:"29",
          price: "150,800",
        },
        {
          id: 17,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "COSTEÑA",
          ratings: 6,
          stock:"24",
          price: "120,000",
        },
        {
          id: 18,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "DESODORANTE",
          ratings: 6,
          stock:"15",
          price: "30,000",
        },
        {
          id: 19,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "DETODITO SURTIDO",
          ratings: 6,
          stock:"17",
          price: "51,000",
        },
        {
          id: 20,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "DORITOS",
          ratings: 6,
          stock:"16",
          price:"32,000",
        },
        {
          id: 21,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "ESPUMA JACUZZI",
          ratings: 6,
          stock:"16",
          price: "80,000",
        },
        {
          id: 22,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "ESTATUS PEQUEÑA",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 23,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "STELLA ARTOIS",
          ratings: 6,
          stock:"27",
          price: "243,000",
        },
        {
          id: 24,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "GASEOSA POSTOBON",
          ratings: 6,
          stock:"34",
          price: "102,000",
        },

        {
          id: 25,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "GATORADE",
          ratings: 6,
          stock:"22",
          price: "110,000",
        },

        {
          id: 26,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "GOMINA GEL",
          ratings: 6,
          stock:"0",
          price: "0,000",
        },

        {
          id: 27,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "HALLS",
          ratings: 6,
          stock:"9",
          price: "18,000",
        },

        {
          id: 28,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "HEINIKEN",
          ratings: 6,
          stock:"36",
          price: "216,000",
        },
        {
          id: 29,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "HIELO BOLSA GRANDE",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 30,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "JOSE CUERVO 375ML",
          ratings: 6,
          stock:"0",
          price: "0",
        },

        {
          id: 31,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "JOSE CUERVO 750ML",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 32,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "JUGO HIT",
          ratings: 6,
          stock:"30",
          price: "120,000",
        },

        {
          id: 33,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "JUMBO MANI MEDIANA",
          ratings: 6,
          stock:"24",
          price: "72,000",
        },

        {
          id: 34,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "KIT DE AFEITAR",
          ratings: 6,
          stock:"13",
          price: "55,000",
        },

        {
          id: 35,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "KIT DENTAL",
          ratings: 6,
          stock:"0",
          price: "0",
        },

        {
          id: 36,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "LECHERITA",
          ratings: 6,
          stock:"12",
          price: "42,000",
        },
        
        {
          id: 37,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "MADUROS P",
          ratings: 6,
          stock:"16",
          price: "40,000",
        },
        
        {
          id: 38,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "MANI ESPECIAL P",
          ratings: 6,
          stock:"25",
          price: "87,000",
        },
        
        {
          id: 39,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "MR TEE",
          ratings: 6,
          stock:"0",
          price: "0,000",
        },
        
        {
          id: 40,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "OLD PARR 500ML",
          ratings: 6,
          stock:"0",
          price: "0,000",
        },
        
        {
          id: 41,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "OLD PARR 750ML",
          ratings: 6,
          stock:"1",
          price: "165,000",
        },
        
        {
          id: 42,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PAPITAS SURDITAS",
          ratings: 6,
          stock:"18",
          price: "45,000",
        },
        
        {
          id: 43,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PILSEN",
          ratings: 6,
          stock:"25",
          price: "125,000",
        },
        
        {
          id: 44,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PINTURA STEVEN ECHEVERRI",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 61,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PONY MALTA",
          ratings: 6,
          stock:"38",
          price: "95,000",
        },
        
        {
          id: 61,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PRESERVATIVO DUO",
          ratings: 6,
          stock:"66",
          price: "198,000",
        },
        {
          id: 61,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "PROTECTORAS NOSOTRAS",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 63,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "REDBULL",
          ratings: 6,
          stock:"15",
          price: "120,000",
        },
        
        {
          id: 45,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "REDDS",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        
        {
          id: 46,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "RON CALDAS 1/2",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        
        {
          id: 47,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "RON CALDAS 1/4",
          ratings: 6,
          stock:"3",
          price: "81,000",
        },
        
        {
          id:48 ,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "RON MEDELLIN 1/2",
          ratings: 6,
          stock:"4",
          price: "140,000",
        },
        
        {
          id: 49,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "RON MEDELLIN 1/4",
          ratings: 6,
          stock:"5",
          price: "125,000",
        },
        
        {
          id: 50,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "SALCHICHAS TARRO",
          ratings: 6,
          stock:"15",
          price: "82,000",
        },
        {
          id: 51,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "SMIRNOFF",
          ratings: 6,
          stock:"17",
          price: "170,000",
        },
        {
          id: 52,
          itemId: "bebidas01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "SODA",
          ratings: 6,
          stock:"27",
          price: "108,000",
        },
        {
          id: 53,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "TAPABOCA",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 54,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "TOALLA NOSOTRAS",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 55,
          itemId: "snacks01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "TRIDENT",
          ratings: 6,
          stock:"0",
          price: ",000",
        },
        {
          id: 56,
          itemId: "drogueria01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "VASO HABITACION",
          ratings: 6,
          stock:"0",
          price: "0",
        },
        {
          id: 57,
          itemId: "cocina01",
          imgSrc:
            "https://github.com/rolandoto/Mader/blob/main/3b21edd2-1fc3-4a86-812c-8a7c09a71e39-removebg-preview.png?raw=true",
          name: "VIVE 100",
          ratings: 6,
          stock:"21",
          price: "94,000",
        },
      ]

      const [isMainData, setMainData] = useState(
        Items.filter((element) => element.itemId == "cocina01")
      );
        
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
        setMainData(Items.filter((element) => element.itemId ==  itemId));
      };

      console.log(isMainData)

    return (
        <div className="mainContainer">
            <div className="rowContainer" >
                    {MenuItems?.map((index,e) => {
                        const da =  index.id == "2" ? true : false
                        return (
                          <div onClick={() => setData(index.itemId) } key={e} >
                                <div className={`rowMenuCard ${da ? `active` : ``}`}>
                                        <div className="imgBox-Container">
                                            <img  alt="" />
                                        </div>
                                              <h3>{index.name}</h3>
                                      <i className="loadMenu">
                                      </i>
                                </div>
                          </div>
                    )})}
            </div>
        </div>
    )

}
export default Store