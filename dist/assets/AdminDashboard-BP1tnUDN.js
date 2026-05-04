import{r,j as e}from"./index-CBrkOxU3.js";function g(){const[t,a]=r.useState("overview"),[o,d]=r.useState(!1),[l,c]=r.useState(!1);return r.useEffect(()=>{const i=()=>{const s=document.querySelectorAll(".reveal-admin");for(let n=0;n<s.length;n++){const x=window.innerHeight;s[n].getBoundingClientRect().top<x-100&&s[n].classList.add("active")}};return window.addEventListener("scroll",i),i(),()=>window.removeEventListener("scroll",i)},[]),e.jsxs("div",{style:{width:"100%",backgroundColor:"#f8fafc",color:"#0f172a",fontFamily:"'Plus Jakarta Sans', sans-serif",overflowX:"hidden",padding:"4rem 1rem 8rem 1rem",borderTop:"1px solid #e2e8f0"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        
        .reveal-admin { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5, 0, 0, 1); }
        .reveal-admin.active { opacity: 1; transform: translateY(0); }

        /* Feature Header Layout */
        .feature-header-row {
            display: flex;
            align-items: center;
            gap: 1.5rem;
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
            text-shadow: 2px 2px 0px white, -2px -2px 0px white;
        }
        .arrow-draw {
            font-weight: 900;
            font-size: 3.5rem;
            color: #2563eb;
            line-height: 1;
        }

        /* Mobile Sentence (Hidden on Desktop) */
        .mobile-sentence { display: none; }

        /* Dashboard Box */
        .dashboard-box {
            width: 100%;
            height: 650px;
            background: #ffffff;
            border-radius: 1.5rem;
            box-shadow: 0 40px 80px -20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
            display: flex;
            flex-direction: row; 
            position: relative;
            z-index: 10;
            transition: transform 0.3s ease;
        }
        .dashboard-box:hover { transform: translateY(-5px); }

        /* --- DASHBOARD INTERNALS --- */
        .sidebar { 
            width: 250px; 
            background: #f8fafc; 
            border-right: 1px solid #e2e8f0; 
            display: flex; 
            flex-direction: column; 
            flex-shrink: 0; 
        }
        
        .profile-area { padding: 20px; border-bottom: 1px solid #e2e8f0; display: flex; flex-direction: column; }
        .nav-area { padding: 10px; display: flex; flex-direction: column; gap: 5px; }
        .content-area { flex: 1; padding: 2rem; overflow-y: auto; background: white; }
        
        .nav-btn {
            width: 100%; text-align: left; padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;
            color: #64748b; background: transparent; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 10px;
        }
        .nav-btn:hover { background: #e2e8f0; }
        .nav-btn.active { background: #eff6ff; color: #2563eb; border-right: 3px solid #2563eb; }

        .card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
        .list-item { display: flex; align-items: center; gap: 16px; padding: 12px; border: 1px solid #f1f5f9; border-radius: 12px; margin-bottom: 12px; }
        
        /* Bar Chart Styles */
        .chart-container { display: flex; align-items: flex-end; justify-content: space-between; height: 160px; gap: 10px; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; }
        .bar { width: 100%; background: #3b82f6; border-radius: 4px 4px 0 0; transition: height 1s ease; }

        /* Toggles */
        .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; cursor: pointer; }
        .toggle-track { width: 44px; height: 24px; border-radius: 99px; position: relative; transition: background 0.3s; }
        .toggle-dot { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; top: 3px; box-shadow: 0 1px 2px rgba(0,0,0,0.2); transition: transform 0.3s; }

        /* --- MOBILE OPTIMIZATIONS --- */
        @media (max-width: 1200px) {
             .annotation { font-size: 1.8rem; }
             .arrow-draw { font-size: 2.5rem; }
        }
        
        @media (max-width: 1024px) {
            .feature-header-row { flex-direction: column; align-items: flex-start; gap: 0; margin-bottom: 1rem; padding-left: 0; }
            .big-number { font-size: 5rem; letter-spacing: -2px; text-shadow: 3px 3px 0px #bfdbfe; margin-bottom: -5px; }
            .feature-title { font-size: 1.75rem; padding-top: 0; }
            .annotation { display: none; }
            .mobile-sentence {
                display: block; font-size: 1.1rem; color: #64748b; line-height: 1.5; margin-bottom: 1.5rem; font-weight: 500;
            }
            .highlight { color: #2563eb; font-weight: 700; }
            .dashboard-box { flex-direction: column; height: auto; min-height: 800px; }
            .sidebar { width: 100%; border-right: none; border-bottom: 1px solid #e2e8f0; overflow-x: auto; flex-direction: row; padding: 10px; }
            .nav-area { display: flex; flex-direction: row; gap: 10px; width: 100%; }
            .profile-area { display: none; } 
            .nav-btn { white-space: nowrap; border-right: none; width: auto; }
            .nav-btn.active { border-bottom: 2px solid #2563eb; border-right: none; background: #eff6ff; }
            .metric-grid { grid-template-columns: 1fr; }
        }
      `}),e.jsxs("section",{style:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",maxWidth:"1100px",margin:"0 auto",position:"relative"},children:[e.jsxs("div",{className:"reveal-admin feature-header-row",children:[e.jsx("span",{className:"big-number",children:"02"}),e.jsx("span",{className:"feature-title",children:"Admin Dashboard"})]}),e.jsxs("p",{className:"reveal-admin mobile-sentence",children:["Manage your business with a ",e.jsx("span",{className:"highlight",children:"Custom CRM"}),", ",e.jsx("span",{className:"highlight",children:"real-time data & analytics"}),", and advanced ",e.jsx("span",{className:"highlight",children:"lead management"}),"."]}),e.jsxs("div",{className:"reveal-admin",style:{position:"relative",width:"100%",display:"flex",justifyContent:"center"},children:[e.jsxs("div",{className:"annotation",style:{left:"-260px",top:"15%",transform:"rotate(-5deg)"},children:[e.jsxs("div",{style:{textAlign:"right"},children:["Custom",e.jsx("br",{}),"CRM"]}),e.jsx("div",{className:"arrow-draw",children:"→"})]}),e.jsxs("div",{className:"annotation",style:{right:"-240px",top:"15%",transform:"rotate(5deg)"},children:[e.jsx("div",{className:"arrow-draw",children:"←"}),e.jsxs("div",{style:{textAlign:"left"},children:["Real-time Data",e.jsx("br",{}),"& Analytics"]})]}),e.jsxs("div",{className:"annotation",style:{right:"-240px",bottom:"30%",transform:"rotate(-5deg)"},children:[e.jsx("div",{className:"arrow-draw",style:{transform:"rotate(90deg) translateY(10px)"},children:"↓"}),e.jsxs("div",{style:{textAlign:"left"},children:["Lead",e.jsx("br",{}),"Management"]})]}),e.jsxs("div",{className:"dashboard-box",children:[e.jsxs("div",{className:"sidebar",children:[e.jsx("div",{className:"profile-area",children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"#eff6ff",color:"#2563eb",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"RS"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold"},children:"Rahul S."}),e.jsx("div",{style:{fontSize:"11px",color:"#94a3b8"},children:"Premium Agent"})]})]})}),e.jsxs("div",{className:"nav-area",children:[e.jsx("button",{className:`nav-btn ${t==="overview"?"active":""}`,onClick:()=>a("overview"),children:"📈 Growth"}),e.jsx("button",{className:`nav-btn ${t==="properties"?"active":""}`,onClick:()=>a("properties"),children:"🏡 Listings"}),e.jsx("button",{className:`nav-btn ${t==="leads"?"active":""}`,onClick:()=>a("leads"),children:"👥 Prospects"}),e.jsx("button",{className:`nav-btn ${t==="settings"?"active":""}`,onClick:()=>a("settings"),children:"⚡ Automation"})]})]}),e.jsxs("div",{className:"content-area",children:[t==="overview"&&e.jsxs("div",{style:{animation:"fade-in 0.4s ease-out"},children:[e.jsxs("div",{className:"metric-grid",children:[e.jsxs("div",{className:"card",children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"bold",color:"#94a3b8",textTransform:"uppercase"},children:"Total Volume"}),e.jsx("div",{style:{fontSize:"24px",fontWeight:"bold",margin:"5px 0"},children:"₹ 12.4 Cr"}),e.jsx("div",{style:{fontSize:"11px",color:"#22c55e"},children:"↑ 18% vs last month"})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"bold",color:"#94a3b8",textTransform:"uppercase"},children:"Active Deals"}),e.jsx("div",{style:{fontSize:"24px",fontWeight:"bold",margin:"5px 0"},children:"18"}),e.jsx("div",{style:{fontSize:"11px",color:"#64748b"},children:"Mumbai & Pune"})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{style:{fontSize:"11px",fontWeight:"bold",color:"#94a3b8",textTransform:"uppercase"},children:"Hot Leads"}),e.jsx("div",{style:{fontSize:"24px",fontWeight:"bold",margin:"5px 0",color:"#2563eb"},children:"42"}),e.jsx("div",{style:{fontSize:"11px",color:"#64748b"},children:"High intent"})]})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{style:{marginBottom:"15px",fontSize:"12px",fontWeight:"bold",color:"#64748b"},children:"Revenue Trend"}),e.jsx("div",{className:"chart-container",children:[{h:"40%"},{h:"70%"},{h:"50%"},{h:"90%"},{h:"60%"}].map((i,s)=>e.jsx("div",{className:"bar",style:{height:i.h}},s))})]})]}),t==="properties"&&e.jsxs("div",{style:{animation:"fade-in 0.4s ease-out"},children:[e.jsxs("div",{className:"list-item",children:[e.jsx("div",{style:{width:"48px",height:"48px",background:"#e2e8f0",borderRadius:"8px"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:"bold",fontSize:"14px"},children:"Lodha World Towers"}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b"},children:"Lower Parel"})]}),e.jsx("div",{style:{fontSize:"12px",fontWeight:"bold",color:"#22c55e",background:"#dcfce7",padding:"4px 8px",borderRadius:"4px"},children:"Active"})]}),e.jsxs("div",{className:"list-item",children:[e.jsx("div",{style:{width:"48px",height:"48px",background:"#e2e8f0",borderRadius:"8px"}}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:"bold",fontSize:"14px"},children:"Prestige Tech Park"}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b"},children:"Bangalore"})]}),e.jsx("div",{style:{fontSize:"12px",fontWeight:"bold",color:"#b45309",background:"#fef3c7",padding:"4px 8px",borderRadius:"4px"},children:"Pending"})]})]}),t==="leads"&&e.jsxs("div",{style:{animation:"fade-in 0.4s ease-out"},children:[e.jsxs("div",{className:"list-item",children:[e.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"#dbeafe",color:"#2563eb",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"AP"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:"bold",fontSize:"14px"},children:"Amit Patel"}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b"},children:"Inquired about Lodha"})]}),e.jsx("div",{style:{fontSize:"20px"},children:"💬"})]}),e.jsxs("div",{className:"list-item",children:[e.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"#fce7f3",color:"#be185d",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"PS"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontWeight:"bold",fontSize:"14px"},children:"Priya Singh"}),e.jsx("div",{style:{fontSize:"12px",color:"#64748b"},children:"Site Visit: Monday"})]}),e.jsx("div",{style:{fontSize:"20px"},children:"📞"})]})]}),t==="settings"&&e.jsx("div",{style:{animation:"fade-in 0.4s ease-out"},children:e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"toggle-row",onClick:()=>d(!o),children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold"},children:"WhatsApp Alerts"}),e.jsx("div",{style:{fontSize:"12px",color:"#94a3b8"},children:"Notify on new leads"})]}),e.jsx("div",{className:"toggle-track",style:{background:o?"#22c55e":"#e2e8f0"},children:e.jsx("div",{className:"toggle-dot",style:{transform:o?"translateX(20px)":"translateX(4px)"}})})]}),e.jsx("div",{style:{height:"1px",background:"#f1f5f9",margin:"10px 0"}}),e.jsxs("div",{className:"toggle-row",onClick:()=>c(!l),children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"14px",fontWeight:"bold"},children:"Auto-Schedule"}),e.jsx("div",{style:{fontSize:"12px",color:"#94a3b8"},children:"Sync Calendar"})]}),e.jsx("div",{className:"toggle-track",style:{background:l?"#22c55e":"#e2e8f0"},children:e.jsx("div",{className:"toggle-dot",style:{transform:l?"translateX(20px)":"translateX(4px)"}})})]})]})})]})]})]})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"6rem"},className:"reveal",children:e.jsx("div",{className:"arrow-anim",style:{fontSize:"3rem",color:"#93c5fd",fontWeight:"900"},children:"↓"})})]})}export{g as default};
