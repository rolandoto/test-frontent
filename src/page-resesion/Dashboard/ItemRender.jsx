import React, { useState } from  "react"
import { CiBadgeDollar } from "react-icons/ci";
import { BsBucket ,BsCheckCircle,BsBell} from "react-icons/bs";
import { VscSymbolEvent } from "react-icons/vsc";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";


const Info = styled(ReactTooltip)`
  max-width: 500px;
  padding-top: 9px;
  z-index: 1000 !important;
  background: rgb(243 243 243 / 70%) !important ;
  opacity: .95;
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000 !important;
`;

const InfoMessage = styled.div`
  font: Roboto;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;
  z-index: 1000 !important;
`;

const   itemRenderer = ({ item, itemContext, getItemProps }) => {

    const total_habitacion = parseInt(item.valor_habitacion)

    const abono = parseInt(item.abono)

    let colorWords;
    let iconState;
    let title = itemContext.title; // Establecer título predeterminado

    let color;


    switch (item.state) {
    case 0:
        if(abono>0){
            color = '#ff9275';
            colorWords = 'white ';
            iconState = <CiBadgeDollar fontSize={20} /> ;
        }else{
            color = '#f31260';
            colorWords = 'white';
            iconState = <BsBell fontSize={15} />;
        }
        break;
    case 1:
        color = '#7828c8';
        colorWords = 'white';
        iconState = <BsBucket fontSize={15} />;
        break;
    case 2:
        color = '#747171';
        colorWords = 'white';
        break;
    case 3:
            color = '#17c964';
            colorWords = 'white';
            iconState = <VscSymbolEvent fontSize={15} />;
        break;
    case 4:
        color = '#0DC034';
        colorWords = 'black';
        break;
    case 5:
        color = 'rgba(243, 217, 36, 0.8)';
        colorWords = 'black';
        title = 'Aseo';
        break;
    case 6:
        color = '#0072f5';
        colorWords = 'white';
        iconState = <BsCheckCircle fontSize={15} />;
        break;
    default:
        break;
    }
        const backgroundColor = itemContext.selected  ? "black" :color

        const key = `${item.id}_${item.id}_schedule`;

        return (
            
        <div 
        className="reservation-rows"
        
                data-for={key} data-tip
                    {...getItemProps({
                    style: {
                        display: "flex",
                alignItems: "center",
                backgroundColor,
                border: "",
                borderRadius: "12px",
                padding: "8px",
                color: colorWords,
                position: "relative",
                visibility: "visible",
                opacity: "100",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)",
                transition: "background-color 0.8s ease",
                    },	  
                    })}
                >	
                    <div
           
            ></div>
    
            <div
            style={{
                position: 'sticky',
                left: '0',
                display: 'inline-block',
                overflow: 'hidden',
                padding: '0 1x',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: "background-color 0.8s ease",
            }}
          className="reservation-rows"
            >
            <div className="icon-state-reservation " >
                    <span className="margin-icon-state" >{iconState}</span>
                    <span className="text-words" >{title}</span>
            </div>
               
                <div>
                        <Info  	place="top" 
                                variant="info" 
                                id={key}  >
                            <InfoMessage>
                                <div className="go" >
                                    <ul >
                                    <li className="color-white " >Numero Habitacion :{item.Num_Room}</li>
                                    <li className="color-white " >Codigo reserva :{item.Codigo_Reserva}</li>
                                    <li className="color-white " >Huesped: {item.full_name}</li>
                                    <li className="color-white " >Check in :{item.Fecha_inicio}</li>
                                    <li className="color-white " >Check out :{item.Fecha_final}</li>
                                    <li className="color-white " >Noches :{item.Noches}</li>
                                    <li className="color-white " >Adultos :{item.Adultos}</li>
                                    <li className="color-white " >Niños :{item.Ninos}</li>
                                    <li className="color-white " >Total hospedaje :${total_habitacion.toLocaleString()}</li>
                                    <li className="color-white " >Abono :${abono.toLocaleString()}</li>
                                    </ul>
                                </div>
                            </InfoMessage>
                        </Info>
                </div>
            </div>
    </div>
    );
  };


  export default itemRenderer