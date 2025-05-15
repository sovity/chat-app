export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: string;
  status?: 'sending' | 'delivered' | 'error';
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastMessage: Message | null;
  timestamp: string;
}
