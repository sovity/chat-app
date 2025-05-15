'use client';

import type {Chat} from '@/types/chat';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {cn} from '@/lib/utils';
import {formatDistanceToNow} from '@/lib/date-utils';
import {PlusCircle, Trash2} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ChatListProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onCreateChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export const ChatList = ({
  chats,
  activeChat,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
}: ChatListProps) => {
  return (
    <div className="border-border bg-muted/30 flex h-full w-80 flex-col border-r">
      <div className="border-border border-b p-4">
        <Button
          onClick={onCreateChat}
          className="w-full justify-start"
          variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.length === 0 ? (
            <div className="text-muted-foreground px-4 py-8 text-center">
              No chats yet. Create a new one to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    'group flex cursor-pointer items-center justify-between rounded-md p-3',
                    activeChat?.id === chat.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50',
                  )}
                  onClick={() => onSelectChat(chat)}>
                  <div className="flex-1 truncate">
                    <div className="truncate font-medium">{chat.name}</div>
                    {chat.lastMessage && (
                      <div className="text-muted-foreground truncate text-xs">
                        {chat.lastMessage.content}
                      </div>
                    )}
                    <div className="text-muted-foreground mt-1 text-xs">
                      {formatDistanceToNow(chat.timestamp)}
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                          }}>
                          <Trash2 className="h-4 w-4" />
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
      <div className="border-border border-t p-4">
        <div className="text-sm font-medium">Tractus-X Connector</div>
        <div className="text-muted-foreground text-xs">Catena-X Dataspace</div>
      </div>
    </div>
  );
};
