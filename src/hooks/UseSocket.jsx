import { useCallback, useEffect, useState } from "react";
import { SocketRoute } from "../config";
import io from 'socket.io-client';

const useSocket = () => {
	const [socket, setSocket] = useState(null);
  
	const initializeSocket = useCallback(() => {
	  const newSocket = io.connect(`${SocketRoute.serverRoute}`);
	  setSocket(newSocket);
	  return () => {
		newSocket.disconnect();
	  };
	}, []);
  
	useEffect(() => {
	  const cleanupSocket = initializeSocket();
	  return () => {
		cleanupSocket();
	  };
	}, [initializeSocket]);
  
	return socket;
  };
  
  export default useSocket;