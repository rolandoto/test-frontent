import Rect, { useContext, useEffect, useState } from "react"
import  AutoProvider  from "../../privateRoute/AutoProvider";
import "./styles.css"

const MouseOver =({socket}) =>{
    const {jwt} = useContext(AutoProvider)
    const [mousePositions, setMousePositions] = useState({});
    const [currentUser, setCurrentUser] = useState("");
    const [userColor, setUserColor] = useState("#FFFFFF"); // Color del cursor del usuario actual

  // Function to generate a unique color based on a string
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return `#${"00000".substring(0, 6 - c.length)}${c}`;
  };

  useEffect(() => {
    // Asigna un color único al usuario actual
    const userId = jwt?.result?.id_user;
    setUserColor(stringToColor(userId));

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const userId = jwt?.result?.id_user // Reemplaza con el identificador real del usuario
      const userName = jwt?.result?.name; // Reemplaza con el nombre real del usuario
     const Id_hotel = jwt?.result?.id_hotel
      // Enviar los datos del mouse al servidor
      socket.emit("mousemove", { userId, userName, userColor, x, y ,Id_hotel});
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [userColor]);

  useEffect(() => {
    // Escuchar los datos del mouse de otros usuarios
    socket.on("clientmousemove", (data) => {
      setMousePositions((prevState) => ({
        ...prevState,
        [data.userId]: data
      }));
    });

    // Limpia el evento cuando el componente se desmonta
    return () => {
      socket.off("clientmousemove");
    };
  }, []);

  return (
    <div className="App">
      {Object.keys(mousePositions).map((userId) => (
        <>
          <div
            key={userId}
            className={`cursor ${
              userId === "tu_identificador_de_usuario" ? "current-user" : ""
            }`}
            style={{
              left: `${mousePositions[userId].x}px`,
              top: `${mousePositions[userId].y}px`,
              backgroundColor: mousePositions[userId].userColor
            }}
          >
            <span className="cursor-name">
              {userId === "tu_identificador_de_usuario"
                ? "Rolando 🇨🇴"
                : `${mousePositions[userId].userName} 🇨🇴`}
            </span>
          </div>
        </>
      ))}
    </div>
  )

}

export default MouseOver