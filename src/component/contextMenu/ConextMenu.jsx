// ContextMenu.jsx

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components"; // Make sure to install styled-components
import  "./index.css"


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const StyleSpanIcons = styled.span`
display: flex;
align-items: center
margin-right: 10px;
`

const StyledContextMenu = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  background: #fff;
  box-shadow: 17px 20px 40px rgba(0, 0, 0, .21);
  padding: 8px;
  z-index: 1000;
  opacity: 0;
  border-radius: 9px;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation

  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;

const StyledMenuItem = styled.div`
  cursor: pointer;
  padding: 8px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  &:hover {
    background: #f0f0f0;
    border-radius: 5px;
  }
`;

const StyleSpan = styled.span`
display: flex;
align-items: center
`





const ContextMenu = ({ top, left, options, onClose,ocacion ,handChangeTypeRoomOne,finish,openModal,handSubmitRoomOcasionalOne,handSubmitRoomOcasionalTwo}) => {

  const handleItemClick = (action) => {
    if(action =="asignar"){
      handChangeTypeRoomOne(ocacion,finish)
      handSubmitRoomOcasionalOne(ocacion,finish)
      handSubmitRoomOcasionalTwo={ocacion,finish}
      onClose()
    }else if(action =="Facturar"){
      openModal(ocacion)
      onClose()
    }
    else{
      onClose()
    }
  };

  return createPortal(
    <StyledContextMenu className="fade-in" top={top} left={left}>
      {options.map((option, index) => (
        <StyledMenuItem
          key={index}
          onClick={() => handleItemClick(option.action)}>
        <StyleSpanIcons   >  {option.icon} </StyleSpanIcons> 
        <StyleSpan>{option.label} </StyleSpan>
        </StyledMenuItem>
      ))}
    </StyledContextMenu>,
    document.body
  );
};

export default ContextMenu;

