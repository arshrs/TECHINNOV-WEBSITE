'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function FeatureThreeChat() {
  const [loadIframe, setLoadIframe] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Scroll Reveal Animation Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal-chat");
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };
    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  // 2. LAZY LOAD LOGIC (Fixes the "Jump to Middle" issue)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadIframe(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 } // Load when 10% of the section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="chat-section" ref={containerRef}>

      {/* --- CSS STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .chat-section {
            width: 100%;
            background: #ffffff;
            font-family: 'Plus Jakarta Sans', sans-serif;
            padding: 6rem 1rem 8rem 1rem;
            border-top: 1px solid #f1f5f9;
            display: flex;
            justify-content: center;
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 1100px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* ANIMATIONS */
        .reveal-chat { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal-chat.active { opacity: 1; transform: translateY(0); }

        /* HEADER LAYOUT */
        .feature-header-row {
            display: flex;
            align-items: center;
            gap: 4rem; 
            margin-bottom: 1rem;
            width: 100%;
            padding-left: 10px;
        }
        .big-number {
             font-size: 8rem; 
             font-weight: 900; 
             color: #172554; 
             line-height: 1;
             letter-spacing: -4px;
             text-shadow: 5px 5px 0px #bfdbfe; 
        }
        .feature-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            line-height: 1.1;
            text-transform: capitalize;
            padding-top: 1rem;
        }

        /* SUBTITLE */
        .sub-title { 
            text-align: center; 
            color: #64748b; 
            font-size: 1.25rem; 
            margin-bottom: 4rem; 
            max-width: 800px; 
            margin-left: auto; 
            margin-right: auto; 
            font-weight: 500;
            line-height: 1.6;
        }

        /* ANNOTATIONS */
        .annotation {
            position: absolute;
            font-weight: 800;
            color: #334155;
            font-size: 2.25rem;
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 20;
            white-space: nowrap;
            text-shadow: 2px 2px 0px white, -2px -2px 0px white;
        }
        .arrow-draw {
            font-weight: 900;
            font-size: 3.5rem;
            color: #2563eb;
            line-height: 1;
        }

        /* CONTENT LAYOUT */
        .content-wrapper {
            display: flex;
            justify-content: center;
            width: 100%;
            position: relative;
        }

        /* CHATBOX CONTAINER */
        .chat-box-wrapper {
            width: 100%;
            max-width: 450px; 
            height: 700px;
            background: #ffffff;
            border-radius: 1.5rem;
            box-shadow: 0 40px 80px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
            border: 4px solid #f1f5f9;
            overflow: hidden;
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* LOADING PLACEHOLDER */
        .chat-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            color: #94a3b8;
            font-weight: 600;
        }
        .spinner {
            width: 40px; height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* MOBILE SENTENCE */
        .mobile-sentence { display: none; }

        /* --- MOBILE OPTIMIZATIONS --- */
        @media (max-width: 1200px) {
             .annotation { font-size: 1.8rem; }
             .arrow-draw { font-size: 2.5rem; }
        }

        @media (max-width: 1024px) {
            .feature-header-row { flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 1rem; padding-left: 0; }
            .big-number { font-size: 4.5rem; letter-spacing: -2px; margin-bottom: 1.5rem; top: -15px; }
            .feature-title { font-size: 1.75rem; padding-top: 0; }
            .sub-title { text-align: left; font-size: 1.1rem; margin-bottom: 2rem; }
            .annotation { display: none; }
            .mobile-sentence {
                display: block;
                font-size: 1.1rem;
                color: #64748b;
                line-height: 1.6;
                margin-bottom: 2.5rem; 
                font-weight: 500;
            }
            .highlight { color: #2563eb; font-weight: 700; }
            .chat-box-wrapper { 
                height: 600px; 
                max-width: 100%; 
                border-radius: 1.5rem; 
            }
        }
      `}</style>

      <div className="container">

        {/* HEADER */}
        <div className="feature-header-row reveal-chat">
          <span className="big-number">03</span>
          <span className="feature-title">AI Lead Assistant</span>
        </div>

        {/* DESKTOP SUBTITLE */}
        <p className="sub-title reveal-chat">
          Capture every lead instantly. We provide a fully <span style={{ color: '#2563eb', fontWeight: 700 }}>WhatsApp Integrated Chatbot</span> too, ensuring you never miss a customer on any platform.
        </p>

        {/* MOBILE ONLY SENTENCE */}
        <div className="reveal-chat mobile-sentence">
          Engage visitors 24/7 on <span className="highlight">Web</span> and we provide a <span className="highlight">WhatsApp Integrated Chatbot</span> too for instant mobile connection.
        </div>

        <div className="content-wrapper">

          {/* ANNOTATIONS */}
          <div className="annotation" style={{ right: '65%', top: '20%', transform: 'rotate(-5deg)' }}>
            <div style={{ textAlign: 'right' }}>WhatsApp<br />Ready</div>
            <div className="arrow-draw">→</div>
          </div>

          <div className="annotation" style={{ left: '65%', bottom: '30%', transform: 'rotate(5deg)' }}>
            <div className="arrow-draw">←</div>
            <div style={{ textAlign: 'left' }}>Auto<br />Qualify</div>
          </div>

          {/* CHATBOX CONTAINER */}
          <div className="chat-box-wrapper reveal-chat">
            {loadIframe ? (
              <iframe
                src="https://chatbot-zeta-two-92.vercel.app/"
                width="100%"
                height="100%"
                frameBorder="0"
                title="AI Chatbot"
                style={{ background: 'white', width: '100%', height: '100%' }}
                loading="lazy"
              ></iframe>
            ) : (
              <div className="chat-placeholder">
                <div className="spinner"></div>
                <span>Initializing AI...</span>
              </div>
            )}
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }} className="reveal">
          <div className="arrow-anim" style={{ fontSize: '3rem', color: '#93c5fd', fontWeight: '900' }}>↓</div>
        </div>
      </div>
    </section>
  );
}