'use client';

import {useState} from 'react';
import {Chat} from '@/types/chat';
import {mockChats} from '@/lib/mock-data';
import {ChatList} from '@/components/chat-list';
import {ChatWindow} from '@/components/chat-window';
import {EmptyState} from '@/components/empty-state';

export const ChatLayout = () => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    chats.length > 0 ? chats[0].id : null,
  );

  // Derive activeChat from activeChatId and chats array to ensure it's always up-to-date
  const activeChat = activeChatId
    ? chats.find((chat) => chat.id === activeChatId) || null
    : null;

  const handleCreateChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      name: `New Chat ${chats.length + 1}`,
      messages: [],
      lastMessage: null,
      timestamp: new Date().toISOString(),
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChatId);
  };

  const handleDeleteChat = (chatId: string) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);

    if (activeChatId === chatId) {
      setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const handleSendMessage = (chatId: string, content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
      status: 'sending' as const,
    };

    // First update with the sending status
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage,
            timestamp: new Date().toISOString(),
          };
        }
        return chat;
      }),
    );

    // Then simulate a response after a short delay
    setTimeout(() => {
      // First update the original message to "delivered"
      setChats((prevChats) =>
        prevChats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === newMessage.id
                    ? {...m, status: 'delivered' as const}
                    : m,
                ),
              }
            : c,
        ),
      );

      // Then add the response message
      setTimeout(() => {
        const responseMessage = {
          id: `msg-${Date.now() + 1}`,
          content: `Response to: ${content}`,
          sender: 'system' as const,
          timestamp: new Date().toISOString(),
          status: 'delivered' as const,
        };

        setChats((prevChats) =>
          prevChats.map((c) =>
            c.id === chatId
              ? {
                  ...c,
                  messages: [...c.messages, responseMessage],
                  lastMessage: responseMessage,
                  timestamp: new Date().toISOString(),
                }
              : c,
          ),
        );
      }, 1000);
    }, 1500);
  };

  return (
    <div className="bg-background flex h-screen">
      <ChatList
        chats={chats}
        activeChat={activeChat}
        onSelectChat={(chat) => setActiveChatId(chat.id)}
        onCreateChat={handleCreateChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="flex flex-1 flex-col">
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            onSendMessage={(content) =>
              handleSendMessage(activeChat.id, content)
            }
            onDeleteChat={() => handleDeleteChat(activeChat.id)}
          />
        ) : (
          <EmptyState onCreateChat={handleCreateChat} />
        )}
      </div>
    </div>
  );
};
