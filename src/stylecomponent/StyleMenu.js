import styled, { keyframes ,css } from "styled-components"; // Make sure to install styled-components


export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


export const StyleSpanIcons = styled.span`
display: flex;
align-items: center
margin-right: 10px;
`

export const StyledContextMenu = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  background: #fff;
  box-shadow: 0 11px 34px 0 rgba(0,0,0,.2);
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

export const StyledContextMenuTypeRoom = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  height: 50%;
  background: #fff;
  box-shadow: 0 11px 34px 0 rgba(0,0,0,.2);
  padding: 8px;
  z-index: 1000;
  opacity: 0;
  overflow: scroll;
  border-radius: 9px;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation
  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;

export const StyledContextMenuTypeRoomCamareria = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  background: #fff;
  box-shadow: 0 11px 34px 0 rgba(0,0,0,.2);
  padding: 8px;
  z-index: 1000;
  opacity: 0;
  overflow: scroll;
  border-radius: 9px;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation
  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;


export const StyledContextMenuSearch = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: 0%;
  right:0%;
  margin: auto;
  background: #fff;
  width: 29%;
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


export const StyledContextMenuSearchDian = styled.div`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: 0%;
  right:0%;
  margin: auto;
  background: #fff;
  width: 80%;
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

export const StyledContextTyeHotel = styled.div`
  top: ${(props) => `${props.top}px`};
  position: absolute;
  left: 0%;
  width: 300px;
  left: 28px;
  overflow: scroll;
  height:  ${(props) => `${props.valid ? "50%" :"none" } `};
  margin: auto;
  z-index: 1000;
  padding: 8px;
  box-shadow: ${(props) => `${props.valid ? "17px 20px 40px rgba(0, 0, 0, .21)" :"none" } `} ;
  background: ${(props) => `${props.valid ? "#fff" :"none" } `};
  opacity: 0;
  border-radius: 9px;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation
  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;

export const StyledContextTyeHotelConfiguration = styled.div`
top:${(props) => `${props.top}px`};
position: absolute;
/* left: 50%; */
width: 300px;
right: ${(props) => `${props.left}px`};
overflow: scroll;
height: auto;
margin: auto;
z-index: 1000;
padding: 8px;
box-shadow: 17px 20px 40px rgba(0, 0, 0, .21);
background: #fff;
border-radius: 9px;
-webkit-transform: translateY(-10px);
-ms-transform: translateY(-10px);
transform: translateY(-10px);
-webkit-animation: boovBR 0.8s ease forwards;
animation: boovBR 0.8s ease forwards;
`;


export const StyledContextTyeHotelConfigurationHome = styled.div`
top: 67px;
    position: absolute;
    width: 300px;
    right: 40px;
    overflow: scroll;
    height: auto;
    margin: auto;
    z-index: 1000;
    padding: 8px;
    box-shadow: 17px 20px 40px rgba(0, 0, 0, .21);
    background: #fff;
    border-radius: 9px;
-webkit-transform: translateY(-10px);
-ms-transform: translateY(-10px);
transform: translateY(-10px);
-webkit-animation: boovBR 0.8s ease forwards;
animation: boovBR 0.8s ease forwards;
`;



export const StyledContextLoading = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}%`};
  background: #fff;
  width: 7%;
  box-shadow: 17px 20px 40px rgba(0, 0, 0, .21);
  padding: 8px;StyledContextMenu
  z-index: 1000;
  opacity: 0;
  border-radius: 9px;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation

  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;

export const StyledContextBack = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: ${(props) => `${props.top}px`};
  left: 0;
  right: 0;
  background: #fff;
  width: 4%;
  height: 5%;
  box-shadow: 17px 20px 40px rgba(0, 0, 0, 0.21);
  padding: 8px;
  z-index: 1000;
  opacity: 0;
  border-radius: 9px;
  transition: background 0.3s, transform 0.3s;
  transform: translateY(-10px);
  animation: ${fadeIn} 0.8s ease forwards; // Apply the fadeIn animation
  &.fade-in {
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
  :hover {
    background: #f0f0f0;
    border-radius: 5px;
    transform: scale(3);
    animation: ${fadeIn} 0.3s ease forwards; // Apply the fadeIn animation
  }
`;

export const StyledMenuItem = styled.div`
  cursor: pointer;
  padding:8px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  :hover   {
    background: #f0f0f0;
    border-radius: 5px;
  }
`;


export const StyledMenuItemUser = styled.div`
  cursor: pointer;
  padding:8px;
  transition: background 0.3s;
  display: flex;
  border-bottom: 1px solid #ced0d4;
  align-items: center;
  :hover   {
    background: #f0f0f0;
    border-radius: 5px;
  }
`;


export const StyledMenuItemSelectedRoom = styled.div`
  cursor: pointer;
  padding: 8px;
  transition: background 0.3s;
  display: flex;
  align-items: center;

  /* Condición para aplicar estilos cuando props.valid es true */
  ${(props) =>
    props.valid
      ? css`
           {
            background: #f0f0f0;
            border-radius: 5px;
          }
        `
      : css`
          &:hover {
            background: #dddddd;
            border-radius: 5px; 
          }
        `}
`;

export const StyledMenuItemLoading = styled.div`
  cursor: pointer;
  padding: 8px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  z-index:1000;
`;





export const StyleSpan = styled.span`
display: flex;
align-items: center;
font-weight: 300;
margin-left: 7px;
`


export const StyleTitle = styled.span`
margin-left: 7px;
font-weight: 500;
`

export const StyleTitleHotel = styled.span`
font-weight: 500;
`



export const StyleTitleGroup = styled.span`
font-weight: 500;
`


export const StyleContainerLoadingCLoudbeds = styled.div`
  height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`


export const MainProduct = styled.span`
width: 100%;
display: flex;
box-shadow: 17px 20px 40px rgba(0, 0, 0, .21) ;
justify-content: space-between;
align-items: center;
border-radius:25px;
`



export const ImginProduct = styled.img`
width: 28%;
object-fit: cover;
height:12rem;
border-bottom-left-radius:8%;
border-top-left-radius: 8%;
`


export const  TextWidth = styled.div`
font-weight: 400;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width: 470px
`


export const ContaineButton = styled.div`
width:17%;
`

export const BorderImgCloudbeds = styled.div`
  width: 43%;
border-radius: 10px;
`

