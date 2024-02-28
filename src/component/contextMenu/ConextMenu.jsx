// ContextMenu.jsx

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components"; // Make sure to install styled-components
import  "./index.css"
import { StyleSpan, StyleSpanIcons, StyledContextMenu, StyledMenuItem } from "../../stylecomponent/StyleMenu";


const ContextMenu = ({ top, left, options, onClose,ocacion ,handChangeTypeRoomOne,finish,openModal,handSubmitRoomOcasionalOne,handSubmitRoomOcasionalTwo}) => {

  const handleItemClick = (action) => {
    if(action =="asignar"){
      handChangeTypeRoomOne(ocacion,finish)
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

