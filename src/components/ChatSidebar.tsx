import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useState } from "react";
import { useGetPeople, useGetUser } from "@/hooks/useGet";
import { useCookies } from "react-cookie";
import { ArrowBigLeft, MessageCircleMore, Users } from "lucide-react";
import { useAppStore } from "@/states/app.state";
import { useResponsive } from "@/lib/useResponsive";
import { Button } from "./ui/button";
import { formatLocalTime } from "@/lib/formatTime";

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
}

interface ChatSidebarProps {
  contacts: any[];
  friendListFriends: any[];
  requestFriends: any[];
  activeContactId: string;
  activeContact2Id: string;
  onSelectContact: (id: string) => void;
  onClicked: (data: boolean) => void;
  onRequestList: (id: string) => void;
  onFriendListFriend: (id: string) => void;
  lastMessage: any;
  idOnline: any[];
}

export const ChatSidebar = ({
  contacts,
  friendListFriends,
  requestFriends,
  activeContactId,
  activeContact2Id,
  onSelectContact,
  onClicked,
  onRequestList,
  onFriendListFriend,
  lastMessage,
  idOnline,
}: ChatSidebarProps) => {
  const [cookie] = useCookies(["id"]);
  const idUserLogin = cookie.id;
  const [inputSearch, setInputSearch] = useState("");
  const { data } = useGetPeople(idUserLogin, inputSearch);
  const { data: user } = useGetUser(idUserLogin);
  const { setToggle, toggle, requestFriend, setRequestFriend } = useAppStore();
  const { isMobile } = useResponsive();

const {setScrollBottom} = useAppStore()

  return (
    <div
      className={`w-full md:w-80 bg-sidebar-bg border-r border-border flex flex-col h-full ${
        isMobile && toggle ? "hidden" : ""
      } `}
    >
      <div className="p-4 border-b border-border">
        <div className="w-full flex justify-start gap-1 items-center mb-3">
          <MessageCircleMore className="text-cyan-600" size={30} />
          <h1 className="text-2xl font-bold text-cyan-600">Chat Aja</h1>
        </div>
        <div className="flex w-full  items-center gap-2 mt-3">
          <Input
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
            type="text"
            placeholder="Search People"
          />
          <Button onClick={() => setRequestFriend(true)} className="relative">
            <Users size={20} />
            {/* Badge merah */}
            {requestFriends.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {requestFriends.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      {inputSearch === "" ? (
        <ScrollArea className="flex-1">
          {!requestFriend && (
            <ScrollArea className="h-full">
              <div className="p-2">
                {/* Contacts */}
                {contacts?.map((item: any, index: number) => {
                  const matchedRoom = lastMessage?.messages?.find(
                    (r: any) =>
                      (r.room.user1Id === cookie.id &&
                        r.room.user2Id === item.friend.id) ||
                      (r.room.user2Id === cookie.id &&
                        r.room.user1Id === item.friend.id)
                  );

                  const latestMessage =
                    matchedRoom?.room?.messages?.[0]?.content;
                  const latestTime =
                    matchedRoom?.room?.messages?.[0]?.createdAt;
                  const isOnline = idOnline?.some(
                    (id) => id === item.friend.id
                  );

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        onFriendListFriend("");
                        onSelectContact(item.friend.id);
                        onClicked(true);
                        setToggle(true);
                        setScrollBottom(true)

                      }}
                      className={cn(
                        "w-full p-3 rounded-lg flex items-start gap-3 hover:bg-gray-100 transition-colors mb-1",
                        activeContactId === item.friend.id && "bg-gray-200"
                      )}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={``} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {item.friend.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-bg" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground truncate">
                            {item.friend.username}
                          </span>
                          {latestTime && (
                            <span className="text-sm text-muted-foreground truncate">
                              {formatLocalTime(latestTime)}
                            </span>
                          )}
                        </div>
                        {latestMessage && (
                          <div className="text-sm text-muted-foreground max-w-36  text-ellipsis overflow-hidden">
                            {latestMessage}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Friend List Friends */}
                {friendListFriends?.map((item: any, index: number) => {
                  const matchedRoom = lastMessage?.messages?.find(
                    (r: any) =>
                      (r.room.user1Id === cookie.id &&
                        r.room.user2Id === item.user.id) ||
                      (r.room.user2Id === cookie.id &&
                        r.room.user1Id === item.user.id)
                  );

                  const latestMessage =
                    matchedRoom?.room?.messages?.[0]?.content;
                  const latestTime =
                    matchedRoom?.room?.messages?.[0]?.createdAt;
                  const isOnline = idOnline?.some((id) => id === item.user.id);

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        onSelectContact("");
                        onFriendListFriend(item.user.id);
                        onClicked(true);
                        setToggle(true);
                          setScrollBottom(true)
                      }}
                      className={cn(
                        "w-full p-3 rounded-lg flex items-start gap-3 hover:bg-gray-100 transition-colors mb-1",
                        activeContact2Id === item.user.id && "bg-gray-200"
                      )}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={``} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {item.user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar-bg" />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground truncate">
                            {item.user.username}
                          </span>
                          {latestTime && (
                            <span className="text-sm text-muted-foreground truncate">
                              {formatLocalTime(latestTime)}
                            </span>
                          )}
                        </div>
                        {latestMessage && (
                          <div className="text-sm text-muted-foreground truncate">
                            {latestMessage}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          {/* friend request list */}
          {requestFriend && (
            <div className=" ">
              <div className="p-5 flex items-center gap-3 justify-between">
                <p className=" font-bold text-start text-cyan-700">
                  Request Friend
                </p>
                <Button onClick={() => setRequestFriend(false)} className="">
                  <ArrowBigLeft size={16} />
                </Button>
              </div>
              <ScrollArea>
                {requestFriends?.map((item: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSelectContact(item.id);
                      onRequestList(item.sender.id);

                      setToggle(true);
                      onClicked(true);
                    }}
                    className={cn(
                      "w-full p-3 rounded-lg flex items-start gap-3 hover:bg-sidebar-hover transition-colors mb-1",
                      activeContactId === item.id && "bg-sidebar-hover"
                    )}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={``} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {item.sender.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground truncate">
                          {item.sender.username}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}
        </ScrollArea>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-2">
            {data?.map((item: any, index: number) => (
              <button
                key={index}
                onClick={() => {
                  onSelectContact(item.id);
                  onFriendListFriend(item.id);
                  onRequestList(item.id);
                  onClicked(true);
                  setToggle(true);
                }}
                className={cn(
                  "w-full p-3 rounded-lg flex items-start gap-3 hover:bg-sidebar-hover transition-colors mb-1",
                  activeContactId === item.id && "bg-sidebar-hover"
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={``} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {item.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground truncate">
                      {item.username}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
      <div className="py-[15.5px] border border-t">
        <div className=" flex items-center gap-2 px-5">
          <Avatar>
            <AvatarImage src={``} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading">
            <p className="text-sm font-semibold m-0">{user?.username}</p>
            {idOnline.some((item) => item === user?.id) && (
              <span className="text-xs m-0 text-green-600 font-semibold">
                online
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
