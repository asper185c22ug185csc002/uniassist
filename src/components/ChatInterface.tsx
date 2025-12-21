import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to **Periyar University**! I'm UniAssist AI, your dedicated campus assistant. I can help you with:\n\n- 📚 Admissions & Academic Programs\n- 📖 Library Services & E-Resources\n- 🏠 Hostel & Campus Facilities\n- 💰 Fee Structure & Scholarships\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please wait a moment before trying again.");
        } else if (response.status === 402) {
          toast.error("Service temporarily unavailable. Please try again later.");
        } else {
          toast.error(errorData.error || "Failed to get response. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > 1) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickQuestions = [
    "What are the admission requirements?",
    "Tell me about hostel facilities",
    "Library timings and rules",
    "CDOE distance education programs",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-h-[800px] w-full max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-4 md:p-6 border-b border-slate-800/50">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-glow-orange">
            <GraduationCap className="w-8 h-8 text-slate-950" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-slate-950 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-slate-950" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100">UniAssist AI</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
            <span>AI Knowledge Base Active</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 animate-in",
              message.role === "user" ? "flex-row-reverse" : ""
            )}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                message.role === "user"
                  ? "bg-blue-600"
                  : "bg-gradient-to-br from-orange-500 to-orange-600"
              )}
            >
              {message.role === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-slate-950" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-sm"
                  : "glass-dark rounded-tl-sm"
              )}
            >
              <div className={cn(
                "text-sm leading-relaxed prose-sm",
                message.role === "user" ? "text-white" : "text-slate-200"
              )}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-slate-300">{children}</li>,
                    strong: ({ children }) => <strong className="font-semibold text-orange-400">{children}</strong>,
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex items-start gap-3 animate-in">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div className="glass-dark rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                <span className="text-sm text-slate-400">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 md:px-6 pb-2">
          <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="text-xs px-3 py-2 rounded-full glass-dark text-slate-300 hover:text-orange-400 hover:border-orange-500/30 transition-all"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t border-slate-800/50">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about admissions, courses, library, hostel..."
            className="flex-1 min-h-[48px] max-h-32 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 text-sm text-slate-200 placeholder:text-slate-500 transition-all"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 shadow-glow-orange flex-shrink-0 transition-all"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;