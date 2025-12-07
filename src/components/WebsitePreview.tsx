'use client';

import React, { useEffect } from 'react';

export default function WebsitePreview() {

  // Scroll Reveal Logic
  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
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
    <div style={{ width: '100%', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: 'hidden', padding: '6rem 1rem 10rem 1rem', position: 'relative' }}>

      {/* GLOBAL STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        @keyframes bounce-glow { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(10px); opacity: 1; } }
        .arrow-anim { animation: bounce-glow 2s infinite; }

        /* --- ADVERTISEMENT HEADER STYLES --- */
        .header-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 6rem;
            position: relative;
        }

        .main-title { 
            font-size: 4.5rem; 
            font-weight: 800; 
            line-height: 1.05; 
            letter-spacing: -0.03em;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #0f172a 40%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            max-width: 900px;
        }

        .sub-title { 
            font-size: 1.35rem; 
            color: #475569; 
            max-width: 750px; 
            line-height: 1.6;
            font-weight: 500;
        }

        /* Feature Header Layout */
        .feature-header-row {
            display: flex;
            align-items: center;
            gap: 4rem; 
            margin-bottom: 2rem;
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
             position: relative;
             top: 0; 
        }

        .feature-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            line-height: 1.1;
            text-transform: capitalize;
            padding-top: 1rem;
        }

        /* Desktop Annotations */
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
            text-shadow: 2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white;
        }
        .arrow-draw {
            font-weight: 900;
            font-size: 3.5rem;
            color: #2563eb;
            line-height: 1;
        }

        /* Mobile Sentence (Hidden on Desktop) */
        .mobile-sentence { display: none; }

        /* Iframe Box (Desktop) */
        .preview-box {
             width: 100%; 
             height: 600px; 
             background: white; 
             border-radius: 1.5rem; 
             box-shadow: 0 40px 80px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05);
             border: 1px solid #e2e8f0; 
             overflow: hidden; 
             display: flex; 
             flex-direction: column; 
             position: relative; 
             z-index: 10;
             transition: transform 0.3s ease;
        }
        .preview-box:hover { transform: translateY(-5px); }

        /* Browser Toolbar (Visible on Desktop) */
        .browser-toolbar {
            height: 48px; 
            background: #f8fafc; 
            border-bottom: 1px solid #e2e8f0; 
            display: flex; 
            align-items: center; 
            padding: 0 1.25rem; 
            justify-content: space-between; 
            flex-shrink: 0;
        }

        /* --- MOBILE OPTIMIZATIONS --- */
        @media (max-width: 1200px) {
             .annotation { font-size: 1.8rem; }
             .arrow-draw { font-size: 2.5rem; }
        }
        
        @media (max-width: 1024px) {
            /* Header Updates */
            .main-title { font-size: 2.75rem; margin-bottom: 1rem; }
            .sub-title { font-size: 1.15rem; }
            .header-container { margin-bottom: 4rem; }

            /* Feature Section Stack */
            .feature-header-row { 
                flex-direction: column; 
                align-items: flex-start; 
                gap: 0; 
                margin-bottom: 2.5rem; 
                padding-left: 0;
            }
            .big-number { 
                font-size: 4.5rem; 
                letter-spacing: -2px; 
                text-shadow: 3px 3px 0px #bfdbfe;
                margin-bottom: 1.5rem; 
                top: -15px; 
            }
            .feature-title { 
                font-size: 1.75rem; 
                padding-top: 0;
            }

            .annotation { display: none; } 
            
            .mobile-sentence {
                display: block;
                font-size: 1.1rem;
                color: #64748b;
                line-height: 1.6;
                margin-bottom: 2.5rem; 
                font-weight: 500;
            }
            .highlight {
                color: #2563eb;
                font-weight: 700;
            }

            .browser-toolbar { display: none; } 
            
            .preview-box { 
                height: 600px; 
                border-radius: 1.5rem; 
                border: 4px solid #e2e8f0; 
                box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
            }
        }
      `}</style>

      {/* TOP TEXT - ENHANCED ADVERTISEMENT STYLE */}
      <div className="header-container reveal">
        <h1 className="main-title">Features We Provide</h1>
        <p className="sub-title">Deliver stunning, high-performance web experiences that convert visitors into customers.</p>
      </div>

      {/* FEATURE SECTION */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* HEADER: "01 Website Interface" */}
        <div className="reveal feature-header-row">
          <span className="big-number">01</span>
          <span className="feature-title">Website Interface</span>
        </div>

        {/* MOBILE ONLY: Descriptive Sentence */}
        <p className="reveal mobile-sentence">
          Experience a <span className="highlight">lightning fast</span>, fully <span className="highlight">SEO optimized</span> custom build that looks perfect on every <span className="highlight">mobile device</span>.
        </p>

        {/* PREVIEW CONTAINER */}
        <div className="reveal" style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>

          {/* DESKTOP ANNOTATIONS */}
          <div className="annotation" style={{ left: '-260px', top: '15%', transform: 'rotate(-5deg)' }}>
            <div style={{ textAlign: 'right' }}>Lightning<br />Fast</div>
            <div className="arrow-draw">→</div>
          </div>

          <div className="annotation" style={{ right: '-240px', top: '15%', transform: 'rotate(5deg)' }}>
            <div className="arrow-draw">←</div>
            <div style={{ textAlign: 'left' }}>SEO<br />Optimized</div>
          </div>

          <div className="annotation" style={{ right: '-220px', bottom: '20%', transform: 'rotate(-5deg)' }}>
            <div className="arrow-draw" style={{ transform: 'rotate(90deg) translateY(5px)' }}>↓</div>
            <div style={{ textAlign: 'left' }}>Custom<br />Build</div>
          </div>

          <div className="annotation" style={{ left: '-220px', bottom: '20%', transform: 'rotate(5deg)' }}>
            <div style={{ textAlign: 'right' }}>Mobile<br />Ready</div>
            <div className="arrow-draw" style={{ transform: 'rotate(-90deg) translateY(5px)' }}>↓</div>
          </div>

          {/* BROWSER / PHONE WINDOW */}
          <div className="preview-box">
            {/* Toolbar (Visible on Desktop, Hidden on Mobile) */}
            <div className="browser-toolbar">
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', fontFamily: 'monospace', background: '#e2e8f0', padding: '4px 16px', borderRadius: '6px' }}>citizen-properties.lovable.app</div>
              <a href="https://citizen-properties.lovable.app/" target="_blank" style={{ fontSize: '11px', fontWeight: 800, background: '#2563eb', color: 'white', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}>OPEN LIVE ↗</a>
            </div>

            {/* Content */}
            <div style={{ flex: 1, width: '100%', position: 'relative', backgroundColor: 'white' }}>
              <iframe
                src="https://citizen-properties.lovable.app/"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                loading="lazy"
                title="Website Preview"
              ></iframe>
            </div>
          </div>

        </div>

      </section>

      {/* Down Arrow */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6rem' }} className="reveal">
        <div className="arrow-anim" style={{ fontSize: '3rem', color: '#93c5fd', fontWeight: '900' }}>↓</div>
      </div>

    </div>
  );
}