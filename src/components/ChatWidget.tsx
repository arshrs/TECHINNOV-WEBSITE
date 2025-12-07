'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Message, Sender } from '../types';
import { sendMessageStream, resetChatSession } from '../services/geminiService';
import ChatMessage from './ChatMessage';

// Icons
const SendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>;
const BotIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>;

const LOADING_STATUSES = ["Analyzing...", "Searching...", "Thinking..."];
const SUGGESTION_SEPARATOR = "---SUGGESTIONS---";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Aarini, your Real Estate Assistant. \n\nI can help with property details in Mumbai & Thane.",
      sender: Sender.Bot,
      timestamp: new Date(),
      suggestions: ["Show listings in Bandra", "Current interest rates?", "Buying checklist"]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STATUSES[0]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Loading Animation
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
      text: "Chat cleared. Ready to help!",
      sender: Sender.Bot,
      timestamp: new Date(),
      suggestions: ["Listings in Thane", "Negotiation tips"]
    }]);
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isLoading) return;

    setInputText('');
    setLoadingText(LOADING_STATUSES[0]);

    // Add User Message
    const userMessageId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMessageId, text: textToSend.trim(), sender: Sender.User, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: botMessageId, text: '', sender: Sender.Bot, timestamp: new Date(), isStreaming: true }]);

      const streamResult = await sendMessageStream(textToSend);
      let accumulatedText = '';

      for await (const chunk of streamResult) {
        // @ts-ignore
        accumulatedText += (chunk.text || '');
        const [mainText, suggestionsRaw] = accumulatedText.split(SUGGESTION_SEPARATOR);

        const suggestions = suggestionsRaw ? suggestionsRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0) : undefined;

        setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: mainText.trim(), suggestions: suggestions } : msg));
      }

      setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, isStreaming: false } : msg));

    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "Connection error. Please try again.", sender: Sender.Bot, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      // Only focus on desktop to prevent mobile keyboard popping up
      if (window.matchMedia("(min-width: 768px)").matches) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => { handleSendMessage(undefined, suggestion); };

  // --- STYLES ---
  const widgetContainerStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
    backgroundColor: '#f8fafc', borderRadius: '24px', overflow: 'hidden',
    border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #0ea5e9, #2563eb)', padding: '16px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 10, flexShrink: 0
  };

  // FIX: Column-Reverse forces items to stack from bottom-up. No scrolling needed!
  const messagesAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column-reverse', // THE MAGIC FIX
    gap: '16px',
    background: '#f8fafc'
  };

  const inputAreaStyle: React.CSSProperties = {
    padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0', zIndex: 20, flexShrink: 0
  };

  return (
    <div style={widgetContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
            <BotIcon />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>Aarini</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.9 }}>
              <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <button onClick={handleClearChat} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}>
          <TrashIcon />
        </button>
      </div>

      {/* Messages - Rendered in Reverse Order */}
      <div style={messagesAreaStyle} className="no-scrollbar">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* Loading Indicator (Appears at "bottom" which is visually top due to reverse) */}
        {isLoading && messages[messages.length - 1].sender !== Sender.Bot && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', opacity: 0.7, marginBottom: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>{loadingText}</div>
          </div>
        )}

        {/* Message List - Reversed for display */}
        {[...messages].reverse().map((msg) => (
          <ChatMessage key={msg.id} message={msg} onSuggestionClick={handleSuggestionClick} />
        ))}
      </div>

      {/* Input */}
      <div style={inputAreaStyle}>
        <form onSubmit={(e) => handleSendMessage(e)} style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            style={{
              width: '100%', padding: '14px 50px 14px 20px', borderRadius: '16px',
              border: '1px solid #e2e8f0', background: '#f1f5f9', outline: 'none', fontSize: '14px', color: '#334155'
            }}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            style={{
              position: 'absolute', right: '8px', top: '8px', width: '36px', height: '36px',
              background: !inputText.trim() ? 'transparent' : '#2563eb',
              color: !inputText.trim() ? '#cbd5e1' : 'white',
              border: 'none', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;