"use client"

import type React from "react"

import {useState, useRef, useEffect} from "react"
import type {Chat} from "@/types/chat"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {cn} from "@/lib/utils"
import {formatTime} from "@/lib/date-utils"
import {Send, Trash2} from "lucide-react"
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
} from "@/components/ui/alert-dialog"

interface ChatWindowProps {
  chat: Chat
  onSendMessage: (content: string) => void
  onDeleteChat: () => void
}

export const ChatWindow = ({chat, onSendMessage, onDeleteChat}: ChatWindowProps) => {
  const [message, setMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight
        }, 0)
      }
    }

    // Focus input when chat changes
    inputRef.current?.focus()
  }, [chat]) // Changed from chat.messages to chat to ensure it runs when the entire chat object changes

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="font-semibold">{chat.name}</div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4"/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete chat</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this chat? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteChat}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {chat.messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No messages yet. Start the conversation!</div>
          ) : (
            chat.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex items-start gap-3", msg.sender === "user" ? "justify-end" : "justify-start")}
              >
                {msg.sender !== "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?key=tx1zs" alt="Tractus-X"/>
                    <AvatarFallback>TX</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <div>{msg.content}</div>
                  <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                    {formatTime(msg.timestamp)}
                    {msg.sender === "user" && msg.status && (
                      <span className="ml-2">
                        {msg.status === "sending"
                          ? "• Sending..."
                          : msg.status === "delivered"
                            ? "• Delivered"
                            : "• Failed"}
                      </span>
                    )}
                  </div>
                </div>
                {msg.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/abstract-geometric-shapes.png" alt="User"/>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4"/>
          </Button>
        </form>
      </div>
    </div>
  )
};
