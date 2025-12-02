import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatLocalTime } from "@/lib/formatTime";
import { useAppStore } from "@/states/app.state";
import { MoreVertical, MoveLeft } from "lucide-react";

interface ChatHeaderProps {
  contactName: string;
  contactAvatar?: string;
  lastSeen: string;
  friendId: string;
  online: any[];
}

export const ChatHeader = ({
  contactName,
  contactAvatar,
  lastSeen,
  friendId,
  online,
}: ChatHeaderProps) => {
  const { setToggle, toggle } = useAppStore();
  return (
    <div className="h-16 px-4 border-b border-border bg-background flex items-center justify-between">
      <div className="flex items-center justify-between gap-3 ">
        <div
          onClick={() => setToggle(false)}
          className={`md:hidden ${toggle ? "" : "hidden"}`}
        >
          <MoveLeft size={15} />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={contactAvatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {contactName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {online?.some((item) => item === friendId) && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>

          <div>
            <h2 className="font-semibold text-foreground">{contactName}</h2>
            <p className="text-xs text-muted-foreground">
              {online?.some((item) => item === friendId)
                ? "Online"
                : `terakhir dilihat ${formatLocalTime(lastSeen)}`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
