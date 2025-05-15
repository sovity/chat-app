'use client';

import {Button} from '@/components/ui/button';
import {MessageSquarePlus} from 'lucide-react';

interface EmptyStateProps {
  onCreateChat: () => void;
}

export const EmptyState = ({onCreateChat}: EmptyStateProps) => (
  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
    <div className="bg-muted mb-4 rounded-full p-6">
      <MessageSquarePlus className="text-muted-foreground h-12 w-12" />
    </div>
    <h2 className="mb-2 text-2xl font-bold">No chat selected</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      Select an existing chat from the sidebar or create a new one to start
      communicating through the Tractus-X Connector.
    </p>
    <Button onClick={onCreateChat}>
      <MessageSquarePlus className="mr-2 h-4 w-4" />
      Start a new chat
    </Button>
  </div>
);
