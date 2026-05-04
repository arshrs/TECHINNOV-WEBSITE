import{r,j as e}from"./index-CBrkOxU3.js";function m(){const[s,o]=r.useState(!1),n=r.useRef(null);return r.useEffect(()=>{const t=()=>{const i=document.querySelectorAll(".reveal-chat");for(let a=0;a<i.length;a++){const l=window.innerHeight;i[a].getBoundingClientRect().top<l-100&&i[a].classList.add("active")}};return window.addEventListener("scroll",t),t(),()=>window.removeEventListener("scroll",t)},[]),r.useEffect(()=>{const t=new IntersectionObserver(i=>{i[0].isIntersecting&&(o(!0),t.disconnect())},{threshold:.1});return n.current&&t.observe(n.current),()=>t.disconnect()},[]),e.jsxs("section",{className:"chat-section",ref:n,children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"feature-header-row reveal-chat",children:[e.jsx("span",{className:"big-number",children:"03"}),e.jsx("span",{className:"feature-title",children:"AI Lead Assistant"})]}),e.jsxs("p",{className:"sub-title reveal-chat",children:["Capture every lead instantly. We provide a fully ",e.jsx("span",{style:{color:"#2563eb",fontWeight:700},children:"WhatsApp Integrated Chatbot"})," too, ensuring you never miss a customer on any platform."]}),e.jsxs("div",{className:"reveal-chat mobile-sentence",children:["Engage visitors 24/7 on ",e.jsx("span",{className:"highlight",children:"Web"})," and we provide a ",e.jsx("span",{className:"highlight",children:"Web Integrated Chatbot"})," too for instant mobile connection."]}),e.jsxs("div",{className:"content-wrapper",children:[e.jsxs("div",{className:"annotation",style:{right:"65%",top:"20%",transform:"rotate(-5deg)"},children:[e.jsxs("div",{style:{textAlign:"right"},children:["WhatsApp",e.jsx("br",{}),"Ready"]}),e.jsx("div",{className:"arrow-draw",children:"→"})]}),e.jsxs("div",{className:"annotation",style:{left:"65%",bottom:"30%",transform:"rotate(5deg)"},children:[e.jsx("div",{className:"arrow-draw",children:"←"}),e.jsxs("div",{style:{textAlign:"left"},children:["Auto",e.jsx("br",{}),"Qualify"]})]}),e.jsx("div",{className:"chat-box-wrapper reveal-chat",children:s?e.jsx("iframe",{src:"https://chatbot-zeta-two-92.vercel.app/",width:"100%",height:"100%",frameBorder:"0",title:"AI Chatbot",style:{background:"white",width:"100%",height:"100%"},loading:"lazy"}):e.jsxs("div",{className:"chat-placeholder",children:[e.jsx("div",{className:"spinner"}),e.jsx("span",{children:"Initializing AI..."})]})})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"6rem"},className:"reveal",children:e.jsx("div",{className:"arrow-anim",style:{fontSize:"3rem",color:"#93c5fd",fontWeight:"900"},children:"↓"})})]})]})}export{m as default};
