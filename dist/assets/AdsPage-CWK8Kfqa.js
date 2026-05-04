const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AdminDashboard-BP1tnUDN.js","assets/index-CBrkOxU3.js","assets/index-BbG1vDqY.css","assets/VoiceDemo-CXEeOONC.js","assets/ThreeDRender-C6LumNNN.js","assets/FeatureThreeChat-LxY4rB_X.js"])))=>i.map(i=>d[i]);
import{r as t,j as e,_ as o}from"./index-CBrkOxU3.js";function p(){const[i,l]=t.useState(!1);return t.useEffect(()=>{const d=setTimeout(()=>{l(!0)},2500),s=()=>{const a=document.querySelectorAll(".reveal");for(let r=0;r<a.length;r++){const c=window.innerHeight;a[r].getBoundingClientRect().top<c-100&&a[r].classList.add("active")}};return window.addEventListener("scroll",s),s(),()=>{window.removeEventListener("scroll",s),clearTimeout(d)}},[]),e.jsxs("div",{style:{width:"100%",backgroundColor:"#ffffff",color:"#0f172a",fontFamily:"'Plus Jakarta Sans', sans-serif",overflowX:"hidden",padding:"6rem 1rem 10rem 1rem",position:"relative"},children:[e.jsx("style",{children:`
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
        
        /* Fade In Animation for Iframe */
        .fade-in { animation: fadeIn 0.8s ease forwards; opacity: 0; }
        @keyframes fadeIn { to { opacity: 1; } }

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
      `}),e.jsxs("div",{className:"header-container reveal",children:[e.jsx("h1",{className:"main-title",children:"Features We Provide"}),e.jsx("p",{className:"sub-title",children:"Deliver stunning, high-performance web experiences that convert visitors into customers."})]}),e.jsxs("section",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",maxWidth:"1100px",margin:"0 auto",position:"relative"},children:[e.jsxs("div",{className:"reveal feature-header-row",children:[e.jsx("span",{className:"big-number",children:"01"}),e.jsx("span",{className:"feature-title",children:"Website Interface"})]}),e.jsxs("p",{className:"reveal mobile-sentence",children:["Experience a ",e.jsx("span",{className:"highlight",children:"lightning fast"}),", fully ",e.jsx("span",{className:"highlight",children:"SEO optimized"})," custom build that looks perfect on every ",e.jsx("span",{className:"highlight",children:"mobile device"}),"."]}),e.jsxs("div",{className:"reveal",style:{position:"relative",width:"100%",display:"flex",justifyContent:"center"},children:[e.jsxs("div",{className:"annotation",style:{left:"-260px",top:"15%",transform:"rotate(-5deg)"},children:[e.jsxs("div",{style:{textAlign:"right"},children:["Lightning",e.jsx("br",{}),"Fast"]}),e.jsx("div",{className:"arrow-draw",children:"→"})]}),e.jsxs("div",{className:"annotation",style:{right:"-240px",top:"15%",transform:"rotate(5deg)"},children:[e.jsx("div",{className:"arrow-draw",children:"←"}),e.jsxs("div",{style:{textAlign:"left"},children:["SEO",e.jsx("br",{}),"Optimized"]})]}),e.jsxs("div",{className:"annotation",style:{right:"-220px",bottom:"20%",transform:"rotate(-5deg)"},children:[e.jsx("div",{className:"arrow-draw",style:{transform:"rotate(90deg) translateY(5px)"},children:"↓"}),e.jsxs("div",{style:{textAlign:"left"},children:["Custom",e.jsx("br",{}),"Build"]})]}),e.jsxs("div",{className:"annotation",style:{left:"-220px",bottom:"20%",transform:"rotate(5deg)"},children:[e.jsxs("div",{style:{textAlign:"right"},children:["Mobile",e.jsx("br",{}),"Ready"]}),e.jsx("div",{className:"arrow-draw",style:{transform:"rotate(-90deg) translateY(5px)"},children:"↓"})]}),e.jsxs("div",{className:"preview-box",children:[e.jsxs("div",{className:"browser-toolbar",children:[e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ef4444"}}),e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:"#f59e0b"}}),e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:"#22c55e"}})]}),e.jsx("div",{style:{fontSize:"13px",color:"#64748b",fontWeight:"600",fontFamily:"monospace",background:"#e2e8f0",padding:"4px 16px",borderRadius:"6px"},children:"citizen-properties.lovable.app"}),e.jsx("a",{href:"https://citizen-properties.lovable.app/",target:"_blank",style:{fontSize:"11px",fontWeight:800,background:"#2563eb",color:"white",padding:"6px 12px",borderRadius:"6px",textDecoration:"none",boxShadow:"0 4px 6px -1px rgba(37,99,235,0.2)"},children:"OPEN LIVE ↗"})]}),e.jsx("div",{style:{flex:1,width:"100%",position:"relative",backgroundColor:"white"},children:i?e.jsx("iframe",{src:"https://citizen-properties.lovable.app/",className:"fade-in",style:{width:"100%",height:"100%",border:"none",display:"block"},loading:"lazy",title:"Website Preview"}):e.jsxs("div",{style:{width:"100%",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#f1f5f9"},children:[e.jsx("div",{style:{width:"40px",height:"40px",border:"4px solid #cbd5e1",borderTop:"4px solid #3b82f6",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsx("p",{style:{marginTop:"1rem",color:"#64748b",fontWeight:"600",fontSize:"0.9rem"},children:"Initializing Live Preview..."}),e.jsx("style",{children:"@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"})]})})]})]})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"6rem"},className:"reveal",children:e.jsx("div",{className:"arrow-anim",style:{fontSize:"3rem",color:"#93c5fd",fontWeight:"900"},children:"↓"})})]})}const x=t.lazy(()=>o(()=>import("./AdminDashboard-BP1tnUDN.js"),__vite__mapDeps([0,1,2]))),m=t.lazy(()=>o(()=>import("./VoiceDemo-CXEeOONC.js"),__vite__mapDeps([3,1,2]))),h=t.lazy(()=>o(()=>import("./ThreeDRender-C6LumNNN.js"),__vite__mapDeps([4,1,2]))),f=t.lazy(()=>o(()=>import("./FeatureThreeChat-LxY4rB_X.js"),__vite__mapDeps([5,1,2]))),n=()=>e.jsx("div",{className:"w-full h-[500px] flex items-center justify-center bg-slate-50",children:e.jsx("div",{className:"w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"})});function u(){return t.useEffect(()=>{"scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0);const i=()=>{window.scrollTo(0,0)};return window.addEventListener("beforeunload",i),()=>{window.removeEventListener("beforeunload",i)}},[]),e.jsxs("main",{className:"w-full overflow-x-auto px-4 md:px-8 [zoom:0.8] md:[zoom:0.9] xl:[zoom:1] relative",children:[e.jsx(p,{}),e.jsx(t.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(x,{})}),e.jsx(t.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(f,{})}),e.jsx(t.Suspense,{fallback:e.jsx(n,{}),children:e.jsx(m,{})}),e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"h-[200px]"}),children:e.jsx(h,{})})]})}export{u as default};
