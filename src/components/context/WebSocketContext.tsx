import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextProps {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextProps>({ socket: null });

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000";
    const newSocket = io(websocketUrl, {
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });
    setSocket(newSocket);

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    newSocket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
