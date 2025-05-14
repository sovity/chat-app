"use client"

import {Button} from "@/components/ui/button"
import {MessageSquarePlus} from "lucide-react"

interface EmptyStateProps {
  onCreateChat: () => void
}

export const EmptyState = ({onCreateChat}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-full p-8 text-center">
    <div className="rounded-full bg-muted p-6 mb-4">
      <MessageSquarePlus className="h-12 w-12 text-muted-foreground"/>
    </div>
    <h2 className="text-2xl font-bold mb-2">No chat selected</h2>
    <p className="text-muted-foreground mb-6 max-w-md">
      Select an existing chat from the sidebar or create a new one to start communicating through the Tractus-X
      Connector.
    </p>
    <Button onClick={onCreateChat}>
      <MessageSquarePlus className="mr-2 h-4 w-4"/>
      Start a new chat
    </Button>
  </div>
);
