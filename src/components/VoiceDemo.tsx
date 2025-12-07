'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function VoiceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Audio
  useEffect(() => {
    // Ensure this file exists in public/assets/
    audioRef.current = new Audio("/re/assets/call_demo.mp3");

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio Play Error:", e));
      audioRef.current.onended = () => handleEnd();
    }

    let seconds = 0;
    setTimer("00:00");
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      setTimer(`${mins}:${secs}`);
    }, 1000);
  };

  const handleEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  // Scroll Reveal Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal-voice");
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

  return (
    <section className="voice-section">

      {/* --- CSS STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .voice-section {
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
        .reveal-voice { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal-voice.active { opacity: 1; transform: translateY(0); }

        /* WAVEFORM ANIMATION */
        .wave-container { display: flex; gap: 6px; height: 40px; align-items: center; margin: 20px 0; }
        .wave-bar { width: 6px; background: #60a5fa; border-radius: 4px; height: 10px; transition: height 0.2s; }
        .is-playing .wave-bar { animation: wave-anim 1s infinite ease-in-out; }
        .wave-bar:nth-child(1) { animation-delay: 0.1s; }
        .wave-bar:nth-child(2) { animation-delay: 0.2s; }
        .wave-bar:nth-child(3) { animation-delay: 0.3s; }
        .wave-bar:nth-child(4) { animation-delay: 0.4s; }
        .wave-bar:nth-child(5) { animation-delay: 0.5s; }
        @keyframes wave-anim { 0%, 100% { height: 10px; opacity: 0.5; } 50% { height: 40px; opacity: 1; } }

        /* HEADER LAYOUT */
        .feature-header-row {
            display: flex;
            align-items: center;
            gap: 4rem; 
            margin-bottom: 3rem;
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
            gap: 6rem;
            width: 100%;
            align-items: center;
            justify-content: center;
        }

        /* CARD WRAPPER */
        .card-wrapper {
            position: relative;
            z-index: 10;
            flex-shrink: 0;
            width: 380px;   
            height: 600px;  
        }

        /* TEXT SIDE */
        .text-side { width: 100%; max-width: 550px; text-align: left; }
        
        .description { 
            font-size: 1.25rem; 
            color: #64748b; 
            line-height: 1.7;
            margin-bottom: 2.5rem; 
        }
        
        .highlight { color: #2563eb; font-weight: 700; }
        
        .sound-badge { 
            display: inline-flex; align-items: center; gap: 8px; 
            background: #f1f5f9; color: #64748b; padding: 10px 20px; 
            border-radius: 99px; font-size: 0.875rem; font-weight: 700; 
        }

        /* MOBILE SENTENCE */
        .mobile-sentence { display: none; }

        /* CARD STYLE */
        .voice-card {
            width: 100%;
            height: 100%;
            background: #0f172a; 
            border-radius: 2.5rem;
            box-shadow: 0 30px 60px -10px rgba(15, 23, 42, 0.5);
            border: 8px solid #1e293b;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            color: white;
        }
        
        .voice-glow {
            position: absolute; width: 100%; height: 100%;
            background: radial-gradient(circle at center, rgba(37,99,235,0.2) 0%, transparent 70%);
            pointer-events: none;
        }

        /* BUTTONS */
        .btn-call {
            background: #22c55e; color: white; padding: 16px 48px; border-radius: 99px;
            font-weight: 700; border: none; font-size: 1.1rem; cursor: pointer;
            box-shadow: 0 10px 20px -5px rgba(34, 197, 94, 0.4);
            transition: transform 0.2s; z-index: 10;
        }
        .btn-call:hover { transform: scale(1.05); }

        .btn-end {
            width: 64px; height: 64px; border-radius: 50%; background: #ef4444;
            color: white; border: none; display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem; cursor: pointer; box-shadow: 0 10px 20px -5px rgba(239, 68, 68, 0.4);
            transition: transform 0.2s; z-index: 10; margin-top: 2rem;
        }
        .btn-end:hover { transform: scale(1.1); }

        /* --- DESKTOP LAYOUT --- */
        @media (min-width: 1024px) {
            .content-wrapper { 
                flex-direction: row; 
            }
        }

        /* --- MOBILE OPTIMIZATIONS --- */
        @media (max-width: 1024px) {
            .content-wrapper { 
                flex-direction: column; 
                gap: 2rem;
            }

            /* Header Stack */
            .feature-header-row { flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 2rem; padding-left: 0; }
            .big-number { font-size: 4.5rem; letter-spacing: -2px; margin-bottom: 1.5rem; top: -15px; }
            .feature-title { font-size: 1.75rem; padding-top: 0; }

            /* Hide Desktop Text/Annotations, Show Mobile Sentence */
            .text-side { display: none; }
            .annotation { display: none; }

            .mobile-sentence {
                display: block;
                font-size: 1.1rem;
                color: #64748b;
                line-height: 1.6;
                margin-bottom: 2.5rem; 
                font-weight: 500;
            }

            /* Reset fixed wrapper for mobile responsiveness */
            .card-wrapper { width: 100%; height: auto; }
            .voice-card { 
                height: 600px !important; 
                min-height: 600px;
                width: 100%;
                max-width: 100%; 
                border-radius: 2rem; 
            }
        }

      `}</style>

      <div className="container">

        {/* HEADER */}
        <div className="feature-header-row reveal-voice">
          <span className="big-number">04</span>
          <span className="feature-title">AI Voice Caller</span>
        </div>

        {/* MOBILE ONLY SENTENCE */}
        <div className="reveal-voice mobile-sentence">
          Aarini engages leads with a human voice in <span className="highlight">multiple regional languages</span>, sends <span className="highlight">automated follow-ups</span>, and books meetings 24/7.
          <div className="sound-badge" style={{ marginTop: '1rem' }}><span>🔊 Sound ON</span></div>
        </div>

        <div className="content-wrapper">

          {/* CARD SIDE (Left) with Annotations Wrapper */}
          <div className="card-wrapper reveal-voice">

            {/* ANNOTATION 1: Top Left */}
            <div className="annotation" style={{ right: '105%', top: '20%', transform: 'rotate(5deg)' }}>
              <div style={{ textAlign: 'right' }}>Human-like<br />Voice</div>
              <div className="arrow-draw">→</div>
            </div>

            {/* ANNOTATION 2: Bottom Left (UPDATED) */}
            <div className="annotation" style={{ right: '105%', bottom: '25%', transform: 'rotate(-5deg)' }}>
              <div style={{ textAlign: 'right' }}>Auto<br />Follow-up</div>
              <div className="arrow-draw">→</div>
            </div>

            {/* THE PHONE CARD */}
            <div className="voice-card">
              <div className="voice-glow"></div>

              {/* IDLE STATE */}
              {!isPlaying && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%', height: '100%', justifyContent: 'center' }}>
                  {/* GREEN GLOW REMOVED HERE */}

                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #334155', marginBottom: '2rem', zIndex: 2 }}>
                    <svg width="40" height="40" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Incoming Call</h3>
                  <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>AI Sales Agent</p>

                  <button onClick={handlePlay} className="btn-call">
                    Answer Demo
                  </button>
                </div>
              )}

              {/* ACTIVE STATE */}
              {isPlaying && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%', height: '100%', justifyContent: 'center' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}>
                    <span style={{ fontSize: '2rem' }}>🗣️</span>
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Aarini</div>
                  <div style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '1rem', marginBottom: '2rem' }}>{timer}</div>

                  <div className="wave-container is-playing">
                    <div className="wave-bar"></div><div className="wave-bar"></div><div className="wave-bar"></div><div className="wave-bar"></div><div className="wave-bar"></div>
                  </div>

                  <button onClick={handleEnd} className="btn-end">
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TEXT SIDE (Right) - UPDATED TEXT */}
          <div className="text-side reveal-voice">
            <p className="description">
              Experience the future of real estate sales. Aarini engages leads in <span className="highlight">multiple regional languages</span>, sends <span className="highlight">automated follow-up messages</span>, and books qualified site visits directly into your calendar—24/7.
            </p>
            <div className="sound-badge">
              <span>🔊 Sound ON</span>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }} className="reveal">
          <div className="arrow-anim" style={{ fontSize: '3rem', color: '#93c5fd', fontWeight: '900' }}>↓</div>
        </div>

      </div>
    </section>
  );
}