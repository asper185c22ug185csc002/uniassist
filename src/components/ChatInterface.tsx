import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, Coins, GraduationCap, Library, Home, History, Download, Plus, Edit3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import periyarLogo from "@/assets/periyar-logo.jpg";
import { useChatHistory, Message } from "@/hooks/useChatHistory";
import { ChatHistorySidebar } from "@/components/ChatHistorySidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Auto-save current conversation when messages change
  useEffect(() => {
    if (messages.length > 0) {
      if (currentSessionId) {
        updateSession(currentSessionId, messages);
      } else {
        // Create new session when first message is sent
        createSession(messages);
      }
    }
  }, [messages, currentSessionId, createSession, updateSession]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
  };

  // Function to execute admin edit commands via server-side edge function
  const executeAdminCommand = async (jsonStr: string) => {
    try {
      const command = JSON.parse(jsonStr);
      console.log("Sending admin command to server:", command.action);
      
      // Get the current session for auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error("Authentication required for admin commands");
        return;
      }

      // Execute command via server-side edge function with proper auth
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

      // Show success message based on action
      switch (command.action) {
        case "update_hostel":
          toast.success(`Updated hostel ${command.field} to ${command.value}`);
          break;
        case "update_university_info":
          toast.success(`Updated ${command.key} to ${command.value}`);
          break;
        case "add_news":
          toast.success("Added new announcement");
          break;
        case "add_iv":
          toast.success("Added industrial visit");
          break;
        case "approve_alumni":
          toast.success(`Alumni ${command.approve ? "approved" : "rejected"}`);
          break;
      }
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
      
      // Check for admin commands in the final response
      if (isAdmin && assistantContent) {
        const jsonMatch = assistantContent.match(/```json\s*(\{[\s\S]*?"action"[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          await executeAdminCommand(jsonMatch[1]);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleQuickAction = (description: string) => {
    sendMessage(description);
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
      toast.success("Chat exported successfully!");
    } else {
      // Create temporary session for download
      const tempSession = {
        id: crypto.randomUUID(),
        title: messages[0]?.content.slice(0, 50) || "Chat Export",
        messages,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      downloadAsFile(tempSession);
      toast.success("Chat exported successfully!");
    }
  };

  return (
    <>
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
          toast.success("Chat exported successfully!");
        }}
        onClearAll={() => {
          clearAllSessions();
          setMessages([]);
          toast.success("All history cleared");
        }}
      />

      <div className="flex flex-col h-[calc(100vh-2rem)] md:h-screen w-full max-w-5xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-center justify-between py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-orange-500/30">
              <img 
                src={periyarLogo} 
                alt="Periyar University" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-bold text-slate-100">UniAssist AI</h1>
              <p className="text-xs text-slate-500">KNOWLEDGE BASE PORTAL</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* History Button */}
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

            {/* Export Button */}
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownloadCurrent}
                className="text-slate-400 hover:text-green-400 hover:bg-slate-800/50"
                title="Export Chat"
              >
                <Download className="w-5 h-5" />
              </Button>
            )}

            {/* New Chat Button */}
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNewChat}
                className="text-slate-400 hover:text-blue-400 hover:bg-slate-800/50"
                title="New Chat"
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
              <span className="text-xs font-medium text-green-400">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            /* Welcome State */
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              {/* Logo with Glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-700/50 shadow-2xl">
                  <img 
                    src={periyarLogo} 
                    alt="Periyar University" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2 text-center">
                Welcome to <span className="text-blue-400">UniAssist AI</span>
              </h2>
              <p className="text-slate-400 text-center max-w-lg mb-8 px-4">
                Your official gateway to Periyar University information. Ask about fees, courses, library access, or campus facilities.
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.description)}
                    className="flex items-start gap-4 p-4 rounded-xl glass-dark hover:bg-slate-800/60 transition-all group text-left"
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
                ))}
              </div>

              {/* History Hint */}
              {sessions.length > 0 && (
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition-colors"
                >
                  <History className="w-4 h-4" />
                  View {sessions.length} saved conversation{sessions.length > 1 ? "s" : ""}
                </button>
              )}

              {/* Features Info */}
              <div className="mt-8 pt-6 border-t border-slate-800/50 w-full max-w-2xl px-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Info className="w-4 h-4" />
                  <span>UniAssist Features</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["AI Chat Assistant", "28+ Departments", "Library Catalog", "E-Resources Portal", "Sports & Hostel Info", "Alumni Network", "Placement Stats", "Admin Management"].map((feature) => (
                    <span key={feature} className="text-xs px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50">
                      {feature}
                    </span>
                  ))}
                </div>
                {isAdmin && (
                  <p className="text-xs text-orange-400 text-center mt-3">
                    🔧 Admin Mode: You can edit content directly on pages or use /admin command
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto py-6 space-y-4 custom-scrollbar">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 animate-in",
                    message.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden",
                      message.role === "user"
                        ? "bg-blue-600"
                        : "border-2 border-orange-500/30"
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <img 
                        src={periyarLogo} 
                        alt="UniAssist AI" 
                        className="w-full h-full object-cover"
                      />
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
                          strong: ({ children }) => <strong className="font-semibold text-blue-400">{children}</strong>,
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
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-orange-500/30">
                    <img 
                      src={periyarLogo} 
                      alt="UniAssist AI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="glass-dark rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-sm text-slate-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="py-4 border-t border-slate-800/50">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message UniAssist AI..."
              className="w-full px-5 py-4 pr-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-sm text-slate-200 placeholder:text-slate-500 transition-all"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-700/50"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          <p className="text-center text-xs text-slate-600 mt-3">
            OFFICIAL UNIASSIST • GEMINI 2.5 HUB
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
