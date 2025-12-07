'use client';

import React from 'react';
import { Message, Sender } from '../types';

// Icons
const BotIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>;
const UserIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const LinkIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>;
const ArrowIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>;

interface ChatMessageProps {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSuggestionClick }) => {
  const isBot = message.role === Sender.Bot;

  // --- STYLES ---
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    justifyContent: isBot ? 'flex-start' : 'flex-end',
    marginBottom: '1rem',
    // REMOVED OPACITY: 0 TO FIX VISIBILITY ISSUE
  };

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '85%',
    alignItems: isBot ? 'flex-start' : 'flex-end',
  };

  const bubbleRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isBot ? 'row' : 'row-reverse',
    alignItems: 'flex-end',
    gap: '8px',
  };

  const avatarStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: isBot ? 'white' : '#e2e8f0',
    border: isBot ? '1px solid #e2e8f0' : 'none',
    color: isBot ? '#0284c7' : '#64748b',
  };

  const bubbleStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '14px',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    backgroundColor: isBot ? 'white' : '#0284c7',
    color: isBot ? '#1e293b' : 'white',
    borderRadius: '16px',
    borderBottomLeftRadius: isBot ? '0' : '16px',
    borderBottomRightRadius: isBot ? '16px' : '0',
    border: isBot ? '1px solid #e2e8f0' : 'none',
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} style={{ height: '8px' }} />;
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <div key={i} style={{ marginBottom: '4px' }}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
        </div>
      );
    });
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>

        <div style={bubbleRowStyle}>
          {/* Avatar */}
          <div style={avatarStyle}>
            {isBot ? <BotIcon /> : <UserIcon />}
          </div>

          {/* Bubble */}
          <div style={bubbleStyle}>
            {renderFormattedText(message.text)}

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
                  <LinkIcon /> SOURCES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {message.sources.map((source, idx) => (
                    <a key={idx} href={source.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f8fafc', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', textDecoration: 'none', color: '#475569', border: '1px solid #e2e8f0' }}>
                      {source.title || 'Web Result'} <ArrowIcon />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggestions */}
        {isBot && message.suggestions && message.suggestions.length > 0 && !message.isStreaming && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px', marginLeft: '40px' }}>
            {message.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick?.(suggestion)}
                style={{ background: 'white', border: '1px solid #bae6fd', color: '#0284c7', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                {suggestion} <span style={{ opacity: 0.5 }}><ArrowIcon /></span>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatMessage;