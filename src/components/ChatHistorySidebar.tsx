import { History, Download, Trash2, Plus, X, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatSession } from "@/hooks/useChatHistory";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ChatHistorySidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onDownloadSession: (session: ChatSession) => void;
  onClearAll: () => void;
};

export const ChatHistorySidebar = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onDownloadSession,
  onClearAll,
}: ChatHistorySidebarProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-slate-900 border-r border-slate-800 z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-slate-100">Chat History</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* New Chat Button */}
          <div className="p-3 border-b border-slate-800">
            <Button
              onClick={() => {
                onNewChat();
                onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </Button>
          </div>

          {/* Sessions List */}
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No saved chats yet</p>
                  <p className="text-xs mt-1">Start a conversation to see it here</p>
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={cn(
                      "group p-3 rounded-lg cursor-pointer transition-all",
                      currentSessionId === session.id
                        ? "bg-blue-600/20 border border-blue-500/30"
                        : "bg-slate-800/50 hover:bg-slate-800 border border-transparent"
                    )}
                    onClick={() => {
                      onSelectSession(session);
                      onClose();
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {session.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span className="text-xs text-slate-500">
                            {formatDate(session.updatedAt)}
                          </span>
                          <span className="text-xs text-slate-600">•</span>
                          <span className="text-xs text-slate-500">
                            {session.messages.length} messages
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-blue-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownloadSession(session);
                          }}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSession(session.id);
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          {sessions.length > 0 && (
            <div className="p-3 border-t border-slate-800">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-slate-900 border-slate-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-slate-100">
                      Clear all chat history?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-400">
                      This action cannot be undone. All your saved conversations will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onClearAll}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Clear All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
