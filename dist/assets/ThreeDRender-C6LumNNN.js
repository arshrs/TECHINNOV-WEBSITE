import{r as n,j as e}from"./index-CBrkOxU3.js";function d(){const[a]=n.useState(`?v=${new Date().getTime()}`);return n.useEffect(()=>{const t=()=>{const i=document.querySelectorAll(".reveal-render");for(let r=0;r<i.length;r++){const s=window.innerHeight;i[r].getBoundingClientRect().top<s-100&&i[r].classList.add("active")}};return window.addEventListener("scroll",t),t(),()=>window.removeEventListener("scroll",t)},[]),e.jsxs("section",{className:"render-section",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .render-section {
            padding: 6rem 1rem 8rem 1rem;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            font-family: 'Plus Jakarta Sans', sans-serif;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
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
      `}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"feature-header-row reveal-render",children:[e.jsx("span",{className:"big-number",children:"05"}),e.jsx("span",{className:"feature-title",children:"3D Interactive Rendering"})]}),e.jsxs("div",{className:"reveal-render mobile-sentence",children:["Transform simple ",e.jsx("span",{className:"highlight",children:"2D floor plans"})," into immersive, fully interactive ",e.jsx("span",{className:"highlight",children:"3D walkthroughs"})," instantly."]}),e.jsxs("div",{className:"visual-container",children:[e.jsxs("div",{className:"media-card reveal-render",children:[e.jsx("div",{className:"media-label",children:"Input: 2D Plan"}),e.jsx("img",{src:"/assets/blueprint.png",className:"media-content",alt:"2D Blueprint",onError:t=>{t.currentTarget.onerror=null,t.currentTarget.src="https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}})]}),e.jsx("div",{className:"process-arrow reveal-render",children:e.jsx("div",{className:"arrow-icon",children:"➔"})}),e.jsxs("div",{className:"media-card reveal-render",children:[e.jsx("div",{className:"media-label",style:{background:"#2563eb"},children:"Output: Interactive 3D"}),e.jsxs("video",{className:"media-content",playsInline:!0,autoPlay:!0,loop:!0,muted:!0,poster:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",children:[e.jsx("source",{src:`/assets/render-v2.mp4${a}`,type:"video/mp4"}),"Your browser does not support the video tag."]},a),e.jsxs("div",{className:"wasd-overlay",children:[e.jsx("div",{className:"key",children:"W"}),e.jsx("div",{className:"key",children:"A"}),e.jsx("div",{className:"key",children:"S"}),e.jsx("div",{className:"key",children:"D"})]})]})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"6rem"},className:"reveal",children:e.jsx("div",{className:"arrow-anim",style:{fontSize:"3rem",color:"#93c5fd",fontWeight:"900"},children:"↓"})}),e.jsxs("div",{className:"cta-section reveal-render",children:[e.jsx("h2",{className:"cta-title",children:"Ready to scale your business?"}),e.jsx("a",{href:"/",className:"cta-button",children:"Get Your Platform Now"})]})]})]})}export{d as default};
