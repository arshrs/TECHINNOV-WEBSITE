import React, { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Message } from '../types';

/**
 * Parses markdown-like syntax for Bold (**text**), Bullet points (- or *), and Numbered lists (1.).
 */
const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();
    
    const parseBold = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return <span key={index}>{part}</span>;
      });
    };

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <div key={i} className="flex items-start gap-2 ml-2 mb-1">
          <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0 block" />
          <p className="text-slate-700 leading-relaxed text-[15px]">{parseBold(trimmed.substring(2))}</p>
        </div>
      );
    }

    const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberMatch) {
      return (
        <div key={i} className="flex items-start gap-2 ml-2 mb-2">
          <span className="font-bold text-blue-600 min-w-[1.2rem]">{numberMatch[1]}.</span>
          <p className="text-slate-700 leading-relaxed text-[15px]">{parseBold(numberMatch[2])}</p>
        </div>
      );
    }

    if (trimmed === '') {
      return <div key={i} className="h-2" />;
    }

    return (
      <p key={i} className="mb-1 text-slate-700 leading-relaxed text-[15px]">
        {parseBold(line)}
      </p>
    );
  });
};

const parseMessageContent = (text: string) => {
  const cleanText = text.replace(/<SUGGESTIONS>[\s\S]*/, '').trim();
  const suggestionBlockMatch = text.match(/<SUGGESTIONS>([\s\S]*?)<\/SUGGESTIONS>/);
  let suggestions: string[] = [];

  if (suggestionBlockMatch && suggestionBlockMatch[1]) {
    try {
      suggestions = JSON.parse(suggestionBlockMatch[1]);
    } catch (e) { /* Incomplete JSON during stream */ }
  }

  return { cleanText, suggestions };
};

interface ChatMessageItemProps {
  msg: Message;
  onSuggestionClick: (text: string) => void;
}

const ChatMessageItem = React.memo(({ msg, onSuggestionClick }: ChatMessageItemProps) => {
  const isUser = msg.role === 'user';
  const { cleanText, suggestions } = useMemo(() => parseMessageContent(msg.text), [msg.text]);

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-200`}>
      <div className={`max-w-[85%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`relative p-3.5 rounded-2xl shadow-sm text-[15px] ${isUser ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)]'}`}>
          <div className={`${isUser ? 'text-white' : ''}`}>
            {isUser ? cleanText : renderFormattedText(cleanText)}
          </div>
        </div>
        {!isUser && suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-left-2 duration-300 delay-75">
            {suggestions.map((suggestion, idx) => (
              <button key={idx} onClick={() => onSuggestionClick(suggestion)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100 transition-all hover:shadow-md hover:border-blue-200 active:scale-95 group">
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

export default ChatMessageItem;