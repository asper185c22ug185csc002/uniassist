import { useState, useEffect, useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "uniassist-chat-history";

export const useChatHistory = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const createSession = useCallback((messages: Message[]): string => {
    const id = crypto.randomUUID();
    const title = messages[0]?.content.slice(0, 50) + (messages[0]?.content.length > 50 ? "..." : "") || "New Chat";
    const now = new Date().toISOString();
    
    const newSession: ChatSession = {
      id,
      title,
      messages,
      createdAt: now,
      updatedAt: now,
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(id);
    return id;
  }, []);

  const updateSession = useCallback((id: string, messages: Message[]) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? {
              ...session,
              messages,
              title: messages[0]?.content.slice(0, 50) + (messages[0]?.content.length > 50 ? "..." : "") || session.title,
              updatedAt: new Date().toISOString(),
            }
          : session
      )
    );
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  }, [currentSessionId]);

  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setCurrentSessionId(null);
  }, []);

  const getSession = useCallback(
    (id: string): ChatSession | undefined => {
      return sessions.find((session) => session.id === id);
    },
    [sessions]
  );

  const exportAsText = useCallback((session: ChatSession): string => {
    const header = `UniAssist AI - Chat History\n`;
    const divider = "=".repeat(50) + "\n";
    const dateInfo = `Date: ${new Date(session.createdAt).toLocaleString()}\n`;
    const titleInfo = `Topic: ${session.title}\n\n`;

    const messagesText = session.messages
      .map((msg) => {
        const role = msg.role === "user" ? "You" : "UniAssist AI";
        return `${role}:\n${msg.content}\n`;
      })
      .join("\n" + "-".repeat(30) + "\n\n");

    return header + divider + dateInfo + titleInfo + divider + "\n" + messagesText;
  }, []);

  const downloadAsFile = useCallback((session: ChatSession, format: "txt" | "md" = "txt") => {
    const content = exportAsText(session);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `uniassist-chat-${session.id.slice(0, 8)}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [exportAsText]);

  return {
    sessions,
    currentSessionId,
    setCurrentSessionId,
    createSession,
    updateSession,
    deleteSession,
    clearAllSessions,
    getSession,
    exportAsText,
    downloadAsFile,
  };
};
