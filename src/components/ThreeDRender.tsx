'use client';

import React, { useEffect } from 'react';

export default function ThreeDRender() {

  // Scroll Reveal Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal-render");
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
    <section className="render-section">

      {/* --- CSS STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .render-section {
            padding: 6rem 1rem 8rem 1rem;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            width: 100%;
            display: flex;
            flex-direction: column; /* Changed to column to stack elements */
            align-items: center;    /* Center align items */
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* ANIMATIONS */
        .reveal-render { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal-render.active { opacity: 1; transform: translateY(0); }

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

        /* MOBILE SENTENCE */
        .mobile-sentence { display: none; }

        /* CONTENT CONTAINER */
        .visual-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
            width: 100%;
            position: relative;
        }

        /* MEDIA CARDS */
        .media-card {
            flex: 1;
            height: 500px;
            background: white;
            border-radius: 1.5rem;
            border: 4px solid white;
            box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
            transition: transform 0.4s ease;
        }
        .media-card:hover { transform: translateY(-5px); }

        .media-content {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* ARROW BETWEEN CARDS */
        .process-arrow {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            z-index: 2;
        }
        .arrow-icon {
            font-size: 50px; color: #2563eb;
            font-weight: 900;
            text-shadow: 0 4px 10px rgba(37,99,235,0.3);
        }

        /* LABELS & OVERLAYS */
        .media-label {
            position: absolute; top: 20px; left: 20px;
            background: rgba(15, 23, 42, 0.9); color: white;
            padding: 8px 16px; border-radius: 99px;
            font-size: 0.8rem; font-weight: 700;
            backdrop-filter: blur(4px);
            z-index: 10;
        }
        .wasd-overlay {
            position: absolute; bottom: 30px; right: 30px;
            display: flex; gap: 6px; opacity: 0.9;
        }
        .key {
            width: 32px; height: 32px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.6);
            border-radius: 6px;
            color: white; font-size: 12px; font-weight: bold;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(4px);
        }

        /* CTA SECTION STYLES */
        .cta-section {
            margin-top: 6rem;
            text-align: center;
            width: 100%;
        }
        .cta-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: #1e293b;
        }
        .cta-button {
            background: #0f172a;
            color: white;
            padding: 16px 32px;
            border-radius: 99px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3);
            display: inline-block;
            transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            background: #1e293b;
        }

        /* --- MOBILE OPTIMIZATIONS --- */
        @media (max-width: 1024px) {
            /* Header Stack */
            .feature-header-row { flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 2rem; padding-left: 0; }
            .big-number { font-size: 4.5rem; letter-spacing: -2px; margin-bottom: 1.5rem; top: -15px; }
            .feature-title { font-size: 1.75rem; padding-top: 0; }

            /* Mobile Sentence */
            .mobile-sentence {
                display: block;
                font-size: 1.1rem;
                color: #64748b;
                line-height: 1.6;
                margin-bottom: 2.5rem; 
                font-weight: 500;
            }
            .highlight { color: #2563eb; font-weight: 700; }

            /* Vertical Layout */
            .visual-container { flex-direction: column; gap: 2rem; }
            .media-card { width: 100%; height: 400px; border-radius: 1.5rem; }
            
            /* Rotate Arrow Down */
            .arrow-icon { transform: rotate(90deg); margin: 10px 0; }
        }
      `}</style>

      <div className="container">

        {/* HEADER */}
        <div className="feature-header-row reveal-render">
          <span className="big-number">05</span>
          <span className="feature-title">3D Interactive Rendering</span>
        </div>

        {/* MOBILE ONLY SENTENCE */}
        <div className="reveal-render mobile-sentence">
          Transform simple <span className="highlight">2D floor plans</span> into immersive, fully interactive <span className="highlight">3D walkthroughs</span> instantly.
        </div>

        <div className="visual-container">

          {/* Left Card: Blueprint */}
          <div className="media-card reveal-render">
            <div className="media-label">Input: 2D Plan</div>
            <img
              src="/re/assets/blueprint.png" // Ensure this file exists or use external link
              className="media-content"
              alt="2D Blueprint"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>

          {/* Arrow */}
          <div className="process-arrow reveal-render">
            <div className="arrow-icon">➔</div>
          </div>

          {/* Right Card: Video */}
          <div className="media-card reveal-render">
            <div className="media-label" style={{ background: '#2563eb' }}>Output: Interactive 3D</div>
            <video
              className="media-content"
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            >
              <source src="/re/assets/render.mp4" type="video/mp4" />
            </video>

            <div className="wasd-overlay">
              <div className="key">W</div><div className="key">A</div><div className="key">S</div><div className="key">D</div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }} className="reveal">
          <div className="arrow-anim" style={{ fontSize: '3rem', color: '#93c5fd', fontWeight: '900' }}>↓</div>
        </div>

        {/* CTA SECTION */}
        <div className="cta-section reveal-render">
          <h2 className="cta-title">Ready to scale your business?</h2>
          <a href="/" className="cta-button">Get Your Platform Now</a>
        </div>

      </div>

    </section>
  );
}