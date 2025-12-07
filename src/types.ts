export const Sender = {
  User: 'user',
  Bot: 'model'
} as const;

export type Sender = typeof Sender[keyof typeof Sender];

export interface Message {
  id: string;
  role: Sender;
  text: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
}
