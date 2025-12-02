import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatLocalTime } from "@/lib/formatTime";
import { useCookies } from "react-cookie";
import { useEffect, useRef } from "react";

export const ChatMessage = ({ message }: { message: any[] }) => {
  const [cookie] = useCookies(["id"]);
  const id = cookie.id;
const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className="">
      {message.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex gap-2 mb-4 animate-fade-in",
              item.senderId === id ? "justify-end" : "justify-start"
            )}
          >
            {item.senderId !== id && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={""} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {item.sender.username?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
                item.senderId === id
                  ? "bg-primary rounded-br-sm"
                  : "bg-white text-chat-received-foreground rounded-bl-sm"
              )}
            >
              <p
                className={`text-sm leading-relaxed break-words max-w-64 ${
                  item.senderId === id ? "text-white" : ""
                }`}
              >
                {item.content}
              </p>
              <span
                className={cn(
                  `text-xs mt-1 block ${item.senderId === id ? "text-end" : ""}`,
                  item.senderId === id ? "text-gray-50" : "text-gray-400"
                )}
              >
                {formatLocalTime(item.createdAt)}
              </span>
            </div>

            {item.senderId === id && (
              <Avatar className="w-8 h-8">
                <AvatarImage src={""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  YOU
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
