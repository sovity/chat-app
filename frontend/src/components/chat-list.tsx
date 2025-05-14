"use client"

import type {Chat} from "@/types/chat"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils"
import {formatDistanceToNow} from "@/lib/date-utils"
import {PlusCircle, Trash2} from "lucide-react"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface ChatListProps {
  chats: Chat[]
  activeChat: Chat | null
  onSelectChat: (chat: Chat) => void
  onCreateChat: () => void
  onDeleteChat: (chatId: string) => void
}

export const ChatList = ({chats, activeChat, onSelectChat, onCreateChat, onDeleteChat}: ChatListProps) => {
  return (
    <div className="w-80 border-r border-border bg-muted/30 flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Button onClick={onCreateChat} className="w-full justify-start" variant="default">
          <PlusCircle className="mr-2 h-4 w-4"/>
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No chats yet. Create a new one to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md cursor-pointer group",
                    activeChat?.id === chat.id ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                  )}
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="flex-1 truncate">
                    <div className="font-medium truncate">{chat.name}</div>
                    {chat.lastMessage && (
                      <div className="text-xs text-muted-foreground truncate">{chat.lastMessage.content}</div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(chat.timestamp)}</div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteChat(chat.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4"/>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete chat</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <div className="text-sm font-medium">Tractus-X Connector</div>
        <div className="text-xs text-muted-foreground">Catena-X Dataspace</div>
      </div>
    </div>
  )
};
