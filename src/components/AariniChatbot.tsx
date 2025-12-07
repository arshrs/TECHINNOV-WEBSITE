import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Message } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { MessageSquare, Send, ChevronRight, Bot, X } from 'lucide-react';

// --- HELPER FUNCTIONS ---

/**
 * Parses markdown-like syntax for Bold (**text**), Bullet points (- or *), and Numbered lists (1.).
 */
const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();

    // Parse Bold: **text**
    const parseBold = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      });
    };

    // 1. Handle Bullet Points (starts with - or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <div key={i} className="flex items-start gap-2 ml-2 mb-1">
          <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 block" />
          <p className="text-slate-700 leading-relaxed text-[15px]">{parseBold(trimmed.substring(2))}</p>
        </div>
      );
    }

    // 2. Handle Numbered Lists (starts with 1., 2., etc)
    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberMatch) {
      return (
        <div key={i} className="flex items-start gap-2 ml-2 mb-2">
          <span className="font-bold text-blue-600 min-w-[1.2rem]">{numberMatch[1]}.</span>
          <p className="text-slate-700 leading-relaxed text-[15px]">{parseBold(numberMatch[2])}</p>
        </div>
      );
    }

    // 3. Handle Empty Lines (spacing)
    if (trimmed === '') {
      return <div key={i} className="h-2" />;
    }

    // 4. Regular Paragraph
    return (
      <p key={i} className="mb-1 text-slate-700 leading-relaxed text-[15px]">
        {parseBold(line)}
      </p>
    );
  });
};

/**
 * Helper to parse text vs suggestions.
 */
const parseMessageContent = (text: string) => {
  const cleanText = text.replace(/<SUGGESTIONS>[\s\S]*/, '').trim();
  const suggestionBlockMatch = text.match(/<SUGGESTIONS>([\s\S]*?)<\/SUGGESTIONS>/);
  let suggestions: string[] = [];

  if (suggestionBlockMatch && suggestionBlockMatch[1]) {
    try {
      suggestions = JSON.parse(suggestionBlockMatch[1]);
    } catch (e) {
      // Ignore incomplete JSON
    }
  }

  return { cleanText, suggestions };
};

/**
 * Memoized Message Item
 */
const ChatMessageItem = React.memo(({ msg, onSuggestionClick }: { msg: Message, onSuggestionClick: (text: string) => void }) => {
  const isUser = msg.role === 'user';
  const { cleanText, suggestions } = useMemo(() => parseMessageContent(msg.text), [msg.text]);

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-200`}
    >
      <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`
            relative p-3.5 rounded-2xl shadow-sm text-[15px]
            ${isUser
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
            }
          `}
        >
          <div className={`${isUser ? 'text-white' : ''}`}>
            {isUser ? cleanText : renderFormattedText(cleanText)}
          </div>
        </div>

        {!isUser && suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-2 duration-300 delay-75">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick(suggestion)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 transition-all hover:shadow-md hover:border-blue-200 active:scale-95 group"
              >
                {suggestion}
                <ChevronRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        )}

        <span className={`text-[10px] mt-1 px-1 ${isUser ? 'text-slate-300' : 'text-slate-400'}`}>
          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

// --- MAIN COMPONENT ---

interface AariniChatbotProps {
  embedded?: boolean;
}

const AariniChatbot: React.FC<AariniChatbotProps> = ({ embedded = false }) => {
  const [isOpen, setIsOpen] = useState(embedded);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm **Aarini**. How can I help you find your dream home in Mumbai or Thane today?\n\n<SUGGESTIONS>\n[\"Show listings in Bandra\", \"Budget 1 BHKs?\", \"Rentals under ₹50k\"]\n</SUGGESTIONS>",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Use a Ref for the container to control internal scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom logic - using scrollTop to avoid page jumping
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      // Smoothly scroll the container to the bottom
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isWaitingForResponse, isOpen]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    setDebugInfo(`Key: ${apiKey ? 'Present' : 'MISSING'} | Model: gemini-1.5-flash`);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setIsWaitingForResponse(true);

    // Force strict scroll to bottom
    setTimeout(scrollToBottom, 50);

    try {
      const streamGenerator = await sendMessageStream(text);

      setIsWaitingForResponse(false);

      const botMsgId = (Date.now() + 1).toString();
      let fullText = "";

      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: "",
        timestamp: new Date()
      }]);

      for await (const chunk of streamGenerator) {
        fullText += chunk.text;
        setMessages(prev => prev.map(msg =>
          msg.id === botMsgId ? { ...msg, text: fullText } : msg
        ));
        // Scroll on each chunk for streaming effect
        // scrollToBottom(); // Optional: might be too jittery
      }

    } catch (error: any) {
      console.error("Error sending message:", error);
      setIsWaitingForResponse(false);

      let errorMessage = "I'm having trouble connecting. Please try again.";
      if (error.message?.includes('404')) {
        errorMessage = "Error: The AI model is currently unavailable (404). Please ensure your API key has access to 'gemini-1.5-flash'.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      setIsWaitingForResponse(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <>
      {/* Floating Toggle (only if not embedded) */}
      {!embedded && (
        <div
          className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center h-16 w-16 bg-gradient-to-br from-[#0066FF] to-blue-500 text-white rounded-full shadow-[0_8px_30px_rgba(0,102,255,0.4)] hover:shadow-[0_12px_40px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 ring-2 ring-white/50 ring-offset-2 ring-offset-transparent"
            aria-label="Open chat"
          >
            <MessageSquare className="w-7 h-7 fill-current stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Main Chat Window */}
      <div
        className={
          embedded
            ? `
              w-full h-full flex flex-col overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/60 shadow-lg relative
            `
            : `
          fixed z-[100] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isOpen
              ? 'opacity-100 scale-100 translate-y-0 translate-x-0 pointer-events-auto'
              : 'opacity-0 scale-95 translate-y-12 translate-x-12 pointer-events-none'
            }
          /* Layout */
          bottom-0 right-0 sm:bottom-6 sm:right-6
          w-full h-[100dvh] sm:w-[420px] sm:h-[600px] sm:max-h-[85vh] sm:rounded-3xl
          bg-white/95 backdrop-blur-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden 
          border border-white/50 sm:border-slate-200/60
        `}
      >
        {/* Header */}
        <div
          className="relative bg-gradient-to-r from-[#0066FF] to-blue-600 p-5 shrink-0 flex items-center justify-between shadow-md z-10"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

          <div className="flex items-center gap-3.5 relative z-10 w-full">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="w-6 h-6 text-white ml-0.5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[2.5px] border-blue-600 shadow-sm"></div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl text-white leading-tight tracking-wide font-display">Aarini</h2>
              <p className="text-blue-100 text-[10px] font-mono opacity-90 tracking-wide truncate max-w-[150px]" title={debugInfo}>
                {debugInfo || "Real Estate AI Assistant"}
              </p>
            </div>
          </div>
          {!embedded && (
            <button
              onClick={() => setIsOpen(false)}
              className="group p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 text-white/90 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-slate-50 scroll-smooth relative"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>

          {messages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              msg={msg}
              onSuggestionClick={handleSendMessage}
            />
          ))}

          {isWaitingForResponse && (
            <div className="flex justify-start w-full animate-in fade-in duration-200">
              <div className="bg-white border border-slate-100 px-4 py-3.5 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce"></div>
                </div>
                <span className="text-xs text-slate-400 font-medium tracking-wide">Aarini is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0 z-10 pb-6 relative">
          <form
            onSubmit={handleFormSubmit}
            className="group flex items-end gap-2 bg-slate-50 p-2 pr-2 rounded-[24px] border border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-200 shadow-sm hover:border-blue-200"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for listings in Mumbai..."
              className="flex-1 bg-transparent px-4 py-3 outline-none text-[15px] text-slate-800 placeholder:text-slate-400 min-h-[48px]"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`
                h-10 w-10 rounded-full transition-all duration-200 flex items-center justify-center shrink-0 mb-1 mr-1
                ${inputText.trim() && !isTyping
                  ? 'bg-[#0066FF] text-white shadow-md hover:bg-blue-700 hover:scale-110 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <Send className="w-4.5 h-4.5 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3 flex items-center justify-center gap-1.5 opacity-60">
            <Bot className="w-3 h-3 text-[#0066FF]" />
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AariniChatbot;