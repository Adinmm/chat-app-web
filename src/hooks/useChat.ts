import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";
import { useCookies } from "react-cookie";
import { useAppStore } from "@/states/app.state";

export const useChat = (
  senderId: string,
  roomId: string | null,
  receiverId: string
) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [getData, setGetData] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [idOnline, setIdOnline] = useState([]);
  const [lastMessage, setLastMessage] = useState([]);
  const [cookie] = useCookies(["id"]);
  const { socket } = useSocket();
  const { setNewChat } = useAppStore();
  useEffect(() => {
    socket.on("user-online", (data: any) => {
      setIdOnline(data);
    });

    socket.emit("get-id-user", {
      id: cookie.id,
    });

    socket.on("last-message", (data: any) => {
      setLastMessage(data);
    });

    if (!roomId) return;
    // === CLEAN ALL LISTENERS DULU ===
    socket.off("is-online");
    socket.off("receive-message");
    socket.off("message-data");
    socket.off("user-data");
    // cek online
    socket.emit("cek-is-online", senderId);
    socket.on("is-online", (data) => setIsOnline(data.isOnline));

    // join room
    socket.emit("join-room", roomId);

    // receive message
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // get chat history
    socket.emit("get-message", roomId);
    socket.on("message-data", (data) => setGetData(data));

    // get user receiver
    socket.emit("get-user", receiverId);
    socket.on("user-data", (data) => {
      setUserData(data);
    });
  }, [roomId, senderId, messages, idOnline, lastMessage]);

  const sendMessage = (content: string) => {
    setNewChat(content);
    socket.emit("send-message", {
      roomId,
      senderId,
      content,
    });
  };

  return { sendMessage, getData, isOnline, userData, idOnline, lastMessage };
};
