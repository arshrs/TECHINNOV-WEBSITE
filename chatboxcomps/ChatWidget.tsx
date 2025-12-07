
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Trash2, Bot, ChevronRight } from 'lucide-react';
import { Message, Sender } from '../types';
import { sendMessageStream, resetChatSession } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import { GenerateContentResponse } from '@google/genai';

const LOADING_STATUSES = [
  "Analyzing request...",
  "Searching database...",
  "Checking trends...",
  "Thinking...",
];

const SUGGESTION_SEPARATOR = "---SUGGESTIONS---";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Aarini, your Real Estate Assistant. \n\nI can help with property details, market trends in Mumbai & Thane, or guide you through the buying process.",
      sender: Sender.Bot,
      timestamp: new Date(),
      suggestions: [
        "Show me listings in Bandra",
        "What are current interest rates?",
        "Checklist for buying a flat"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STATUSES[0]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % LOADING_STATUSES.length;
        setLoadingText(LOADING_STATUSES[index]);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleClearChat = () => {
    resetChatSession();
    setMessages([{
      id: Date.now().toString(),
      text: "Chat cleared. Ready to help with your real estate journey!",
      sender: Sender.Bot,
      timestamp: new Date(),
      suggestions: [
        "Listings in Thane",
        "Documents for sellers",
        "Negotiation tips"
      ]
    }]);
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || inputText;

    if (!textToSend.trim() || isLoading) return;

    setInputText('');
    setLoadingText(LOADING_STATUSES[0]);

    const userMessageId = Date.now().toString();
    const newMessage: Message = {
      id: userMessageId,
      text: textToSend.trim(),
      sender: Sender.User,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMessageId,
        text: '',
        sender: Sender.Bot,
        timestamp: new Date(),
        isStreaming: true
      }]);

      const streamResult = await sendMessageStream(textToSend);

      let accumulatedText = '';
      const uniqueSources = new Map<string, string>();

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text || '';
        accumulatedText += textChunk;

        const groundingChunks = c.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (groundingChunks) {
          groundingChunks.forEach((gChunk: any) => {
             if (gChunk.web?.uri) {
                uniqueSources.set(gChunk.web.uri, gChunk.web.title || 'Web Source');
             }
          });
        }

        const sourcesArray = Array.from(uniqueSources.entries()).map(([url, title]) => ({ title, url }));
        const [mainText, suggestionsRaw] = accumulatedText.split(SUGGESTION_SEPARATOR);
        
        const suggestions = suggestionsRaw 
          ? suggestionsRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined;

        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { 
                ...msg, 
                text: mainText.trim(),
                sources: sourcesArray.length > 0 ? sourcesArray : undefined,
                suggestions: suggestions
              }
            : msg
        ));
      }

      setMessages(prev => prev.map(msg =>
        msg.id === botMessageId
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error("Failed to generate response", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I encountered a connection issue. Please try again.",
        sender: Sender.Bot,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(undefined, suggestion);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex-none bg-gradient-to-r from-sky-500 to-blue-600 p-5 shadow-lg z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white border border-white/20 shadow-inner">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">Aarini</h2>
              <div className="flex items-center gap-1.5 opacity-90">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs text-sky-50 font-medium">Online • Citizen Properties</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="text-white/70 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            title="Clear conversation"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onSuggestionClick={handleSuggestionClick}
          />
        ))}
        {isLoading && messages[messages.length - 1].sender !== Sender.Bot && (
          <div className="flex items-center gap-2 ml-2 animate-fade-in-up">
            <div className="flex gap-1 bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-sky-600 rounded-full animate-bounce"></span>
            </div>
            <span className="text-xs text-gray-400 font-medium animate-pulse">{loadingText}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-none p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-20">
        <form onSubmit={(e) => handleSendMessage(e)} className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 rounded-2xl pl-5 pr-14 py-4 focus:ring-2 focus:ring-sky-500/50 focus:bg-white transition-all outline-none border border-transparent focus:border-sky-100 shadow-inner"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`absolute right-2 top-2 bottom-2 aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${
              !inputText.trim() || isLoading
                ? 'text-gray-400 bg-transparent'
                : 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg hover:shadow-sky-500/30 hover:scale-105 transform'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={inputText.trim() ? "ml-0.5" : ""} />}
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="flex items-center justify-center gap-1 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
            <Sparkles size={10} className="text-sky-400" />
            AI Powered Assistant
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
