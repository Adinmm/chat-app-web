import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    console.log(text);
    onSendMessage(text); // KIRIM KE SOCKET
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-border bg-background"
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
        >
          <Smile className="h-5 w-5" />
        </Button>

        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 rounded-full bg-muted border-none focus-visible:ring-primary"
        />

        <Button
          type="submit"
          size="icon"
          className="flex-shrink-0 rounded-full bg-primary hover:bg-primary/90"
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
