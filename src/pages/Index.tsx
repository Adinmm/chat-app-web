import { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetChatRoom, useGetUser } from "@/hooks/useGet";
import { MessageCircleMore } from "lucide-react";
import {
  useCreateCharRoom,
  useFriendList,
  useFriendRequest,
} from "@/hooks/usePost";
import { useDeleteFriendRequest } from "@/hooks/useDelete";
import { useChat } from "@/hooks/useChat";
import { useCookies } from "react-cookie";
import { useAppStore } from "@/states/app.state";
import { useResponsive } from "@/lib/useResponsive";

const Index = () => {
  const [cookie] = useCookies(["id", "room1", "room2"]);
  const idUserLogin = cookie.id;

  const [activeContactId, setActiveContactId] = useState("");
  const [friendListFriend, setFriendListFriend] = useState("");
  const [requestFriendListId, setRequestFriendListId] = useState("");

  const [id2UserChatRoom, setId2UserChatRoom] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { data } = useGetUser(idUserLogin);

  const [roomId, setRoomId] = useState("");

  const { sendMessage, getData, userData, idOnline, lastMessage } = useChat(
    idUserLogin,
    roomId || "",
    activeContactId || friendListFriend
  );

  const isFriendRequest = data?.sentRequests?.some((item: any) => {
    return String(item.receiver.id).includes(activeContactId);
  });

  const cekReceivedRequest = data?.receivedRequests?.some((item: any) => {
    return item.sender.id === requestFriendListId;
  });

  const activeContact = data?.friendListUser.find(
    (c: any) => c.friend.id === activeContactId
  );
  const friendList = data?.friendListFriend.find(
    (c: any) => c.user.id === friendListFriend
  );

  const { mutation } = useFriendRequest();
  const { mutation: mutationList } = useFriendList();
  const { mutation: mutationDelete } = useDeleteFriendRequest();
  const { mutation: mutationCreateChat } = useCreateCharRoom();

  const { data: chatRoom, isLoading } = useGetChatRoom(
    cookie.id,
    id2UserChatRoom
  );

  useEffect(() => {
    if (!isLoading && chatRoom) {
      setRoomId(chatRoom.id);
    }
  });

  const createFriendRequest = (data: any) => {
    mutation.mutate(data);
  };
  const createFriendList = async (data: any) => {
    await mutationList.mutateAsync(data);
    await mutationDelete.mutateAsync(activeContactId);
    await mutationCreateChat.mutateAsync({
      user1Id: data.userId,
      user2Id: data.friendId,
    });
  };
  const { toggle } = useAppStore();
  const { isMobile } = useResponsive();
  useEffect(() => {
    if (activeContactId !== "") {
      setId2UserChatRoom(activeContactId);
    }
    if (friendListFriend !== "") {
      return setId2UserChatRoom(friendListFriend);
    }
  }, [
    roomId,
    chatRoom,
    activeContactId,
    friendListFriend,
    data?.friendListUser,
  ]);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        onClicked={setIsClicked}
        requestFriends={data?.receivedRequests || []}
        contacts={data?.friendListUser || []}
        friendListFriends={data?.friendListFriend || []}
        activeContactId={activeContactId}
        activeContact2Id={friendListFriend}
        onSelectContact={setActiveContactId}
        onRequestList={setRequestFriendListId}
        onFriendListFriend={setFriendListFriend}
        idOnline={idOnline}
        lastMessage={lastMessage}
      />
      <div
        className={`flex-1 flex-col bg-gray-50 h-screen flex  ${
          !isMobile ? "" : toggle ? "" : "hidden"
        }`}
      >
        {activeContact ? (
          <>
            <ChatHeader
              contactName={activeContact.friend.username}
              contactAvatar={activeContact.avatar}
              friendId={activeContact.friend.id}
              online={idOnline}
              lastSeen={userData.last_seen}
            />
            {getData.length > 0 &&
              activeContact &&
              roomId === (getData[0] as any).roomId && (
                <>
                  <ScrollArea className="flex-1 bg-chat-bg p-4 overflow-hidden ">
                    <div className="max-w-4xl mx-auto ">
                      <ChatMessage room={roomId} message={getData} />
                    </div>
                  </ScrollArea>
                  <ChatInput onSendMessage={sendMessage} />
                </>
              )}
          </>
        ) : friendList ? (
          <>
            <ChatHeader
              contactName={friendList.user.username}
              friendId={friendList.user.id}
              contactAvatar={friendList.avatar}
              online={idOnline}
              lastSeen={userData.last_seen}
            />
            {getData.length > 0 &&
              friendList &&
              roomId === (getData[0] as any).roomId && (
                <>
                  <ScrollArea className="flex-1 bg-chat-bg p-4 overflow-hidden ">
                    <div className="max-w-4xl mx-auto ">
                      <ChatMessage room={roomId} message={getData} />
                    </div>
                  </ScrollArea>
                  <ChatInput onSendMessage={sendMessage} />
                </>
              )}

            <ChatInput onSendMessage={sendMessage} />
          </>
        ) : isClicked ? (
          <div className="w-full h-screen flex justify-center items-center p-5">
            <div className="px-10 py-8 rounded-2xl shadow-lg border bg-white text-center animate-fadeIn max-w-sm">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {isFriendRequest
                  ? "Request Terkirim"
                  : cekReceivedRequest
                  ? "Terima Permintaan ?"
                  : "Ayok Berteman"}
              </h1>

              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                {isFriendRequest
                  ? "Permintaan pertemanan telah dikirim. Tunggu sampai temanmu menyetujuinya."
                  : cekReceivedRequest
                  ? "Klik tombol di bawah untuk menyetujui permintaan pertemanan"
                  : "Mulai hubungan baru dan tambah teman baru sekarang."}
              </p>

              {!isFriendRequest && (
                <div>
                  {cekReceivedRequest ? (
                    <button
                      onClick={() => {
                        createFriendList({
                          userId: data?.id,
                          friendId: requestFriendListId,
                        });
                      }}
                      className="w-full py-2.5 rounded-xl bg-primary text-white font-medium transition-all active:scale-95 shadow-md"
                    >
                      Terima Permintaan
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        createFriendRequest({
                          id_sending: activeContactId,
                          id_receiving: data?.id,
                        });
                      }}
                      className="w-full py-2.5 rounded-xl bg-primary text-white font-medium  transition-all active:scale-95 shadow-md"
                    >
                      Mengirim Permintaan
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <div>
              <div className="w-full flex justify-center">
                <MessageCircleMore className="text-cyan-600" size={100} />
              </div>
              <div className="mt-5 text-xl font-semibold">
                Welcome To Chat App
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
