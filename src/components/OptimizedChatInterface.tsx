import { useState, useRef, useEffect, memo, lazy, Suspense } from "react";
import { Send, Bot, User, Loader2, Sparkles, Coins, GraduationCap, Library, Home, History, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useChatHistory, Message } from "@/hooks/useChatHistory";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Lazy load heavy markdown renderer
const ReactMarkdown = lazy(() => 
  import("react-markdown").then(mod => ({ default: mod.default }))
);

// Lazy load chat history sidebar
const ChatHistorySidebar = lazy(() => 
  import("./ChatHistorySidebar").then(mod => ({ default: mod.ChatHistorySidebar }))
);

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const quickActions = [
  {
    icon: Coins,
    title: "HOSTEL FEES",
    description: "What are the annual hostel fees and monthly mess charges?",
  },
  {
    icon: GraduationCap,
    title: "ONLINE PROGRAMS",
    description: "Which courses are offered by the Center for Distance and Online Education?",
  },
  {
    icon: Library,
    title: "LIBRARY ACCESS",
    description: "How do I access the digital library resources like N-LIST and DELNET?",
  },
  {
    icon: Home,
    title: "CAMPUS TOUR",
    description: "Tell me about the campus facilities and departments at Periyar University.",
  },
];

// Memoized message component for performance
const ChatMessage = memo(({ message, isLast }: { message: Message; isLast: boolean }) => (
  <div
    className={cn(
      "flex items-start gap-3 animate-in",
      message.role === "user" ? "flex-row-reverse" : ""
    )}
  >
    <div
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
        message.role === "user"
          ? "bg-blue-600"
          : "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30"
      )}
    >
      {message.role === "user" ? (
        <User className="w-5 h-5 text-white" />
      ) : (
        <Bot className="w-5 h-5 text-orange-400" />
      )}
    </div>
    <div
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        message.role === "user"
          ? "bg-blue-600 text-white rounded-tr-sm"
          : "bg-slate-800/60 backdrop-blur-sm rounded-tl-sm border border-slate-700/50"
      )}
    >
      <div className={cn(
        "text-sm leading-relaxed prose-sm",
        message.role === "user" ? "text-white" : "text-slate-200"
      )}>
        {message.role === "assistant" ? (
          <Suspense fallback={<span>{message.content}</span>}>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-blue-300">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-slate-700/50 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
                ),
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Suspense>
        ) : (
          message.content
        )}
      </div>
    </div>
  </div>
));

ChatMessage.displayName = 'ChatMessage';

// Quick action button component
const QuickActionButton = memo(({ action, onClick }: { action: typeof quickActions[0]; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/60 transition-all group text-left border border-slate-700/30"
  >
    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
      <action.icon className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1">
        {action.title}
      </p>
      <p className="text-xs text-slate-500 line-clamp-2">
        {action.description}
      </p>
    </div>
  </button>
));

QuickActionButton.displayName = 'QuickActionButton';

export const OptimizedChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin } = useAuth();

  const {
    sessions,
    currentSessionId,
    setCurrentSessionId,
    createSession,
    updateSession,
    deleteSession,
    clearAllSessions,
    getSession,
    downloadAsFile,
  } = useChatHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      if (currentSessionId) {
        updateSession(currentSessionId, messages);
      } else {
        createSession(messages);
      }
    }
  }, [messages, currentSessionId, createSession, updateSession]);

  const executeAdminCommand = async (jsonStr: string) => {
    try {
      const command = JSON.parse(jsonStr);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("Authentication required for admin commands");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(command),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        toast.error(result.error || "Failed to execute command");
        return;
      }

      toast.success("Admin command executed successfully");
    } catch (error) {
      console.error("Failed to execute command:", error);
      toast.error("Failed to execute admin command");
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
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
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          userId: user?.id || null 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please wait a moment.");
        } else {
          toast.error(errorData.error || "Failed to get response.");
        }
        setIsLoading(false);
        return;
      }

      if (!response.body) throw new Error("No response body");

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
                if (last?.role === "assistant") {
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
      
      if (isAdmin && assistantContent) {
        const jsonMatch = assistantContent.match(/```json\s*(\{[\s\S]*?"action"[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          await executeAdminCommand(jsonMatch[1]);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
  };

  const handleSelectSession = (session: { id: string; messages: Message[] }) => {
    setMessages(session.messages);
    setCurrentSessionId(session.id);
  };

  const handleDownloadCurrent = () => {
    if (messages.length === 0) {
      toast.error("No messages to export");
      return;
    }
    const session = currentSessionId ? getSession(currentSessionId) : null;
    if (session) {
      downloadAsFile(session);
      toast.success("Chat exported!");
    }
  };

  return (
    <>
      {isHistoryOpen && (
        <Suspense fallback={null}>
          <ChatHistorySidebar
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            sessions={sessions}
            currentSessionId={currentSessionId}
            onSelectSession={handleSelectSession}
            onNewChat={handleNewChat}
            onDeleteSession={(id) => {
              deleteSession(id);
              if (id === currentSessionId) {
                setMessages([]);
                setCurrentSessionId(null);
              }
              toast.success("Chat deleted");
            }}
            onDownloadSession={(session) => {
              downloadAsFile(session);
              toast.success("Chat exported!");
            }}
            onClearAll={() => {
              clearAllSessions();
              setMessages([]);
              toast.success("History cleared");
            }}
          />
        </Suspense>
      )}

      <div className="flex flex-col h-[calc(100vh-2rem)] md:h-screen w-full max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100">UniAssist AI</h1>
              <p className="text-xs text-slate-500">KNOWLEDGE BASE PORTAL</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsHistoryOpen(true)}
              className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 relative"
              title="Chat History"
            >
              <History className="w-5 h-5" />
              {sessions.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  {sessions.length}
                </span>
              )}
            </Button>

            {messages.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownloadCurrent}
                  className="text-slate-400 hover:text-green-400 hover:bg-slate-800/50"
                  title="Export Chat"
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/50"
                  title="New Chat"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-green-400">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-4 border-slate-700/50 shadow-2xl flex items-center justify-center">
                  <Bot className="w-12 h-12 text-orange-400" />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2 text-center">
                Welcome to <span className="text-blue-400">UniAssist AI</span>
              </h2>
              <p className="text-slate-400 text-center max-w-lg mb-8 px-4">
                Your official gateway to Periyar University information. Ask about fees, courses, library access, or campus facilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                {quickActions.map((action, index) => (
                  <QuickActionButton
                    key={index}
                    action={action}
                    onClick={() => sendMessage(action.description)}
                  />
                ))}
              </div>

              {sessions.length > 0 && (
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors"
                >
                  <History className="w-4 h-4" />
                  View {sessions.length} saved conversation{sessions.length > 1 ? "s" : ""}
                </button>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-6 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={index} 
                  message={message} 
                  isLast={index === messages.length - 1} 
                />
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 border border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <div className="py-4 border-t border-slate-800/50">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about admissions, courses, fees, library..."
                className="w-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-6 py-4 pr-14 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
            <p className="text-center text-xs text-slate-600 mt-3">
              AI responses are for guidance only. Contact the office for official information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptimizedChatInterface;
