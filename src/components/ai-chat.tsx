import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
} from "lucide-react";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    id: "newbox-assistant",
    transport: chatTransport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-glow)] hover:opacity-90 transition active:scale-95"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] w-[calc(100vw-48px)] max-w-[380px] h-[520px] max-h-[calc(100vh-120px)] rounded-2xl border border-border bg-card flex flex-col shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card shrink-0">
            <div className="w-9 h-9 rounded-full bg-primary/10 grid place-items-center text-primary">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Assistente NEWBOX</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online agora
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 grid place-items-center text-primary mx-auto mb-3">
                  <Bot className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Olá! Sou o assistente da NEWBOX PHONES.
                  <br />
                  Como posso te ajudar hoje?
                </p>
              </div>
            )}

            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs">Digitando...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-background border border-input rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");

  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-secondary text-secondary-foreground rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
