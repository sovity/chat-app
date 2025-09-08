/*
 * Copyright (c) 2025 sovity GmbH
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Contributors:
 *      sovity GmbH - initial implementation
 */

'use client';

import type React from 'react';

import {useState, useEffect, useRef} from 'react';
import type {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import type {MessageDto} from '@/lib/api/models/message-dto';
import {MessageDirectionDto} from '@/lib/api/models/message-direction-dto';
import {MessageStatusDto} from '@/lib/api/models/message-status-dto';
import {getAllMessages, sendMessage} from '@/lib/api/client';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Skeleton} from '@/components/ui/skeleton';
import {Send, CheckCircle2, AlertCircle, Clock} from 'lucide-react';
import {cn} from '@/lib/utils';

interface ChatWindowProps {
  counterparty: CounterpartyDto;
}

export const ChatWindow = ({counterparty}: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Track initial loading separately
  const [isRefreshing, setIsRefreshing] = useState(false); // Track refreshes separately
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialLoadCompleted = useRef(false);

  // Function to fetch messages
  const fetchMessages = async (isInitialFetch = false) => {
    try {
      if (isInitialFetch) {
        setIsInitialLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const data = await getAllMessages(counterparty.participantId);
      setMessages(data);

      if (isInitialFetch) {
        initialLoadCompleted.current = true;
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      if (isInitialFetch) {
        setIsInitialLoading(false);
      }
      setIsRefreshing(false);
    }
  };

  // Initial load of messages when the component mounts or counterparty changes
  useEffect(() => {
    initialLoadCompleted.current = false;
    fetchMessages(true);

    // Poll for new messages every 2 seconds
    const interval = setInterval(() => {
      if (initialLoadCompleted.current) {
        fetchMessages(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [counterparty.participantId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Optimistically add the message to the UI
    const tempId = `temp-${Date.now()}`;
    const tempMessage: MessageDto = {
      messageId: tempId,
      createdAt: new Date(),
      message: newMessage,
      messageDirection: MessageDirectionDto.OUTGOING,
      status: MessageStatusDto.SENDING,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const sentMessage = await sendMessage(counterparty.participantId, {
        message: newMessage,
        username: 'User', // Assuming a default username
      });

      // Replace the temp message with the real one
      setMessages((prev) =>
        prev.map((msg) => (msg.messageId === tempId ? sentMessage : msg)),
      );
    } catch (error) {
      console.error('Failed to send message:', error);

      // Update the temp message to show error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === tempId
            ? {...msg, status: MessageStatusDto.ERROR}
            : msg,
        ),
      );
    }
  };

  const getStatusIcon = (status: MessageStatusDto) => {
    switch (status) {
      case MessageStatusDto.SENDING:
        return <Clock className="text-muted-foreground h-3 w-3" />;
      case MessageStatusDto.OK:
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case MessageStatusDto.ERROR:
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h2 className="font-semibold">{counterparty.participantId}</h2>
          <p className="text-muted-foreground max-w-md truncate text-sm">
            {counterparty.connectorEndpoint}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {isInitialLoading ? (
          <div className="space-y-4">
            {Array.from({length: 5}).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex',
                  i % 2 === 0 ? 'justify-start' : 'justify-end',
                )}>
                <Skeleton
                  className={cn(
                    'h-16 rounded-lg',
                    i % 2 === 0 ? 'w-2/3' : 'w-1/2',
                  )}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h3 className="font-medium">No messages yet</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Send a message to start the conversation
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.messageId}
                className={cn(
                  'flex',
                  message.messageDirection === MessageDirectionDto.OUTGOING
                    ? 'justify-end'
                    : 'justify-start',
                )}>
                <div
                  className={cn(
                    'max-w-[70%] rounded-lg p-3',
                    message.messageDirection === MessageDirectionDto.OUTGOING
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted',
                  )}>
                  <div className="break-words">{message.message}</div>
                  <div className="mt-1 flex items-center justify-end space-x-1">
                    <span className="text-xs opacity-70">
                      {formatTime(message.createdAt)}
                    </span>
                    {message.messageDirection ===
                      MessageDirectionDto.OUTGOING && (
                      <span>{getStatusIcon(message.status)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center space-x-2 border-t p-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          disabled={isInitialLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!newMessage.trim() || isInitialLoading}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
};
