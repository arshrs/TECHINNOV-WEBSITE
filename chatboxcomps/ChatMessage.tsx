
import React from 'react';
import { Message, Sender } from '../src/types';
import { Bot, User, Link as LinkIcon, ArrowRight } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isBot = message.role === Sender.Bot;

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const isListItem = /^\s*[\*\-]\s/.test(line);
      const cleanLine = isListItem ? line.replace(/^\s*[\*\-]\s/, '') : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*|\*(?=\S)(?:.*?\S)?\*)/g);

      const formattedParts = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold text-inherit">{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('*') && part.endsWith('*') && part.length > 1) {
          return <em key={j} className="italic text-inherit">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <div key={i} className="flex items-start gap-2.5 my-1.5 ml-1">
            <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isBot ? 'bg-sky-400' : 'bg-white/70'}`} />
            <span className="flex-1 leading-relaxed">{formattedParts}</span>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={i} className="h-3" />;
      }

      return <p key={i} className="min-h-[1.5em] leading-relaxed my-0.5">{formattedParts}</p>;
    });
  };

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up group`}>
      <div className={`flex max-w-[85%] flex-col ${isBot ? 'items-start' : 'items-end'}`}>

        <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2.5`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm mb-1 transition-transform group-hover:scale-110 ${isBot
            ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 text-sky-600'
            : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
            }`}>
            {isBot ? <Bot size={18} strokeWidth={2.5} /> : <User size={18} strokeWidth={2.5} />}
          </div>

          {/* Message Bubble */}
          <div className={`relative px-5 py-4 shadow-sm text-[15px] ${isBot
            ? 'bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100'
            : 'bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl rounded-br-none shadow-md shadow-sky-500/20'
            }`}>
            <div className="flex flex-col gap-0.5">
              {renderFormattedText(message.text)}
            </div>

            {/* Sources Display */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100/50">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                  <LinkIcon size={12} />
                  <span>Sources</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-1.5 text-xs bg-gray-50 hover:bg-sky-50 text-gray-600 hover:text-sky-600 border border-gray-200 hover:border-sky-200 pl-2 pr-3 py-1.5 rounded-lg transition-all duration-300 max-w-full"
                    >
                      <span className="truncate max-w-[150px]">{source.title || 'Web Result'}</span>
                      <ArrowRight size={10} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <span className={`text-[10px] font-medium text-gray-300 mt-1.5 px-1 ${isBot ? 'ml-12 text-left' : 'mr-12 text-right'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {/* Suggested Questions */}
        {isBot && message.suggestions && message.suggestions.length > 0 && !message.isStreaming && (
          <div className="mt-3 ml-11 flex flex-wrap gap-2 animate-fade-in-up">
            {message.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="group flex items-center gap-2 text-xs font-medium bg-white text-sky-600 border border-sky-100 hover:border-sky-400 hover:bg-sky-50 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{suggestion}</span>
                <ArrowRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatMessage;
