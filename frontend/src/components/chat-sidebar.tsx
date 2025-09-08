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

import type {CounterpartyDto} from '@/lib/api/models/counterparty-dto';
import {ConnectionStatusDto} from '@/lib/api/models/connection-status-dto';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Skeleton} from '@/components/ui/skeleton';
import {PlusCircle, Trash2, CircleDot, RefreshCw} from 'lucide-react';
import {cn} from '@/lib/utils';

interface ChatSidebarProps {
  counterparties: CounterpartyDto[];
  selectedCounterparty: CounterpartyDto | null;
  onCounterpartySelect: (counterparty: CounterpartyDto) => void;
  onAddClick: () => void;
  onDeleteClick: (counterparty: CounterpartyDto) => void;
  isLoading: boolean;
  isRefreshing?: boolean;
}

export const ChatSidebar = ({
  counterparties = [], // Provide default empty array
  selectedCounterparty,
  onCounterpartySelect,
  onAddClick,
  onDeleteClick,
  isLoading,
  isRefreshing = false,
}: ChatSidebarProps) => {
  // Ensure counterparties is always an array
  const counterpartiesArray = Array.isArray(counterparties)
    ? counterparties
    : [];

  const getStatusColor = (status: ConnectionStatusDto) => {
    switch (status) {
      case ConnectionStatusDto.ONLINE:
        return 'text-green-500';
      case ConnectionStatusDto.CONNECTING:
        return 'text-amber-500';
      case ConnectionStatusDto.ERROR:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        {isRefreshing && (
          <RefreshCw className="text-muted-foreground h-4 w-4 animate-spin" />
        )}
      </div>

      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ))}
          </div>
        ) : counterpartiesArray.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No chats yet</p>
            <Button onClick={onAddClick} variant="outline" className="mx-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Start a new chat
            </Button>
          </div>
        ) : (
          <div className="p-2">
            {counterpartiesArray.map((counterparty) => (
              <div
                key={counterparty.participantId}
                className={cn(
                  'hover:bg-accent group flex cursor-pointer items-center justify-between rounded-md p-3',
                  selectedCounterparty?.participantId ===
                    counterparty.participantId && 'bg-accent',
                )}
                onClick={() => onCounterpartySelect(counterparty)}>
                <div className="flex items-center space-x-3 overflow-hidden">
                  <CircleDot
                    className={cn(
                      'h-3 w-3',
                      getStatusColor(counterparty.status),
                    )}
                  />
                  <div className="overflow-hidden">
                    <div className="truncate font-medium">
                      {counterparty.participantId}
                    </div>
                    <div className="text-muted-foreground truncate text-xs">
                      {counterparty.connectorEndpoint}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteClick(counterparty);
                  }}>
                  <Trash2 className="text-muted-foreground h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-4">
        <Button onClick={onAddClick} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
};
