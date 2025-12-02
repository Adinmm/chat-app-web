import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_BASEURL;

export const socket = io(url, {
  autoConnect: false,
});

export const useSocket = () => {
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) return;

    socket.auth = { token: cookies.token };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off(); 
      socket.disconnect();
    };
  }, [cookies.token]);

  return { socket };
};
