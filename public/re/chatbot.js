

(function() {

    
    const GEMINI_API_KEY = "AIzaSyBlGHIzWfoVnlaMspw2saZmZKCfaXCGc1g"; 
    
    const KNOWLEDGE_BASE = `
    CITIZEN PROPERTIES — KNOWLEDGE FILE (MUMBAI & THANE)
    1) MARKET OVERVIEW: Mumbai (Premium), Thane (Growth).
    2) LISTINGS: 
       - "Seaview Serenity" (Bandra West, 2BHK, ₹2.4Cr)
       - "Urban Nest" (Andheri West, 1BHK, ₹78L)
       - "Powai Park Towers" (Powai, 3BHK, ₹3.10Cr)
    3) PRICING: Mumbai Prime >₹3.5Cr, Thane Mid ₹40L-₹80L.
    `;

    const SYSTEM_INSTRUCTION = `
    You are Aarini, the AI Lead Qualification Assistant for Citizen Properties.
    Use this Knowledge Base: ${KNOWLEDGE_BASE}
    Guidelines: Be professional, concise, use bullet points.
    End response with "---SUGGESTIONS---" followed by 3 follow-up questions.
    `;

    // State
    let state = {
        messages: [{
            id: 'init',
            text: "Hello! I'm Aarini, your Real Estate Assistant. \n\nI can help with property details, market trends in Mumbai & Thane, or guide you through the buying process.",
            sender: 'bot',
            timestamp: new Date(),
            suggestions: ["Show me listings in Bandra", "Current interest rates?", "Buying checklist"]
        }],
        isLoading: false
    };

    // ==========================================
    // 2. INITIALIZATION CONTROLLER
    // ==========================================
    function init() {
        if (document.getElementById('aarini-widget')) return;
        
        console.log("✅ Aarini Bot: Force Initializing...");
        
        // 1. Inject Styles
        const styleSheet = document.createElement("style");
        styleSheet.textContent = getStyles();
        document.head.appendChild(styleSheet);

        // 2. Inject HTML Container
        const widgetContainer = document.createElement("div");
        widgetContainer.id = "aarini-widget";
        widgetContainer.innerHTML = getHTML();
        document.body.appendChild(widgetContainer);

        // 3. Attach Logic
        attachLogic();

        // 4. Auto-Open after 1.5s to prove it's there
        setTimeout(() => {
            const win = document.getElementById('aarini-window');
            if(win) win.classList.add('active');
        }, 1500);
    }

    // --- 3. CSS STYLES (With !important) ---
    function getStyles() {
        return `
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            #aarini-widget { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                position: fixed !important; 
                bottom: 20px !important; 
                right: 20px !important; 
                z-index: 2147483647 !important; /* Maximum Z-Index possible */
                display: flex; 
                flex-direction: column; 
                align-items: flex-end; 
                gap: 16px; 
                pointer-events: none; /* Let clicks pass through empty space */
            }
            
            #aarini-widget > * {
                pointer-events: auto; /* Re-enable clicks on children */
            }
            
            /* Toggle Button */
            .chat-toggle {
                width: 64px; height: 64px; border-radius: 50%;
                background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                color: white; border: 3px solid white; cursor: pointer;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                display: flex; align-items: center; justify-content: center;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .chat-toggle:hover { transform: scale(1.1) rotate(-5deg); }

            /* Chat Window */
            .chat-window {
                width: 380px; height: 600px; background: #f8fafc;
                border-radius: 24px; overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
                border: 1px solid #e2e8f0;
                display: flex; flex-direction: column;
                transform-origin: bottom right; 
                transform: scale(0); opacity: 0; 
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                margin-bottom: 10px;
            }
            .chat-window.active { transform: scale(1); opacity: 1; }

            /* Header */
            .chat-header {
                background: linear-gradient(to right, #0ea5e9, #2563eb);
                padding: 16px; color: white; display: flex; justify-content: space-between; align-items: center;
            }
            .bot-badge { display: flex; align-items: center; gap: 10px; }
            .bot-icon { background: rgba(255,255,255,0.2); padding: 8px; border-radius: 12px; backdrop-filter: blur(4px); }
            
            /* Body */
            .chat-body { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; background: white; scroll-behavior: smooth; }
            
            /* Messages */
            .msg-row { display: flex; gap: 10px; width: 100%; animation: fadeIn 0.3s ease-out; }
            .msg-row.user { flex-direction: row-reverse; }
            
            .avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; }
            .avatar.bot { background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe); color: #0284c7; border: 1px solid #bae6fd; }
            .avatar.user { background: #f1f5f9; color: #64748b; }

            .bubble {
                max-width: 85%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.5;
                position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.02); word-wrap: break-word;
            }
            .bubble.bot { background: white; color: #1e293b; border: 1px solid #e2e8f0; border-top-left-radius: 4px; }
            .bubble.user { background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; border-top-right-radius: 4px; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2); }

            /* Suggestions */
            .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; margin-left: 42px; }
            .chip {
                background: white; border: 1px solid #e0f2fe; color: #0284c7; font-size: 12px; font-weight: 600;
                padding: 8px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            }
            .chip:hover { background: #f0f9ff; border-color: #0ea5e9; transform: translateY(-1px); }

            /* Input */
            .chat-footer { padding: 16px; background: white; border-top: 1px solid #f1f5f9; position: relative; }
            .input-box {
                width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;
                padding: 14px 50px 14px 16px; font-size: 14px; outline: none; transition: all 0.2s;
            }
            .input-box:focus { background: white; border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1); }
            .send-btn {
                position: absolute; right: 24px; top: 24px; width: 36px; height: 36px;
                background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; border: none; border-radius: 10px;
                cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;
            }
            .send-btn:hover { transform: scale(1.05); }

            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @media (max-width: 480px) { .chat-window { width: 100vw; height: 80vh; right: -20px; bottom: -20px; border-radius: 20px 20px 0 0; } }
        `;
    }

    // --- 4. HTML STRUCTURE ---
    function getHTML() {
        return `
            <div class="chat-window" id="aarini-window">
                <div class="chat-header">
                    <div class="bot-badge">
                        <div class="bot-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M19 14v0a7 7 0 0 0-7-7v0"/><path d="M19 14v0a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v0"/><path d="M9 22v-4"/><path d="M15 22v-4"/></svg></div>
                        <div><h3 style="margin:0; font-weight:700; font-size:16px;">Aarini</h3><div style="font-size:11px; opacity:0.9; margin-top:2px;"><span style="width:8px; height:8px; background:#4ade80; border-radius:50%; display:inline-block; margin-right:4px;"></span>Online • Citizen Prop</div></div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button id="clear-btn" style="background:none; border:none; color:rgba(255,255,255,0.8); cursor:pointer;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
                        <button id="close-btn" style="background:none; border:none; color:white; cursor:pointer;">✕</button>
                    </div>
                </div>
                <div class="chat-body" id="chat-feed"></div>
                <div class="chat-footer">
                    <input type="text" id="chat-input" class="input-box" placeholder="Ask about listings..." autocomplete="off">
                    <button id="send-btn" class="send-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
                </div>
            </div>
            <div class="chat-toggle" id="toggle-btn">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
        `;
    }

    // --- 5. LOGIC ENGINE ---
    function attachLogic() {
        const els = {
            window: document.getElementById('aarini-window'),
            body: document.getElementById('chat-feed'),
            input: document.getElementById('chat-input'),
            btn: document.getElementById('send-btn'),
            toggle: document.getElementById('toggle-btn'),
            close: document.getElementById('close-btn'),
            clear: document.getElementById('clear-btn')
        };

        const actions = {
            toggle: () => {
                els.window.classList.toggle('active');
                if(els.window.classList.contains('active')) setTimeout(() => els.input.focus(), 100);
            },
            clear: () => {
                state.messages = [state.messages[0]];
                render(els);
            },
            send: async (textOverride) => {
                const text = textOverride || els.input.value.trim();
                if(!text || state.isLoading) return;

                addMessage(els, { text, sender: 'user', timestamp: new Date() });
                els.input.value = '';
                setLoading(els, true);

                const botMsgId = addMessage(els, { text: "Thinking...", sender: 'bot', timestamp: new Date(), isStreaming: true });
                
                try {
                    await streamGemini(text, botMsgId, els);
                } catch(e) {
                    console.error(e);
                    updateMessage(els, botMsgId, "⚠️ Connection Error. Please check API Key.", false);
                }
                setLoading(els, false);
            }
        };

        els.toggle.onclick = actions.toggle;
        els.close.onclick = actions.toggle;
        els.clear.onclick = actions.clear;
        els.btn.onclick = () => actions.send();
        els.input.addEventListener('keypress', (e) => { if(e.key === 'Enter') actions.send(); });

        window.aariniSuggest = (text) => actions.send(text);
        render(els);
    }

    function addMessage(els, msg) {
        msg.id = msg.id || Date.now();
        state.messages.push(msg);
        render(els);
        return msg.id;
    }

    function updateMessage(els, id, text, isStreaming, suggestions) {
        const msg = state.messages.find(m => m.id === id);
        if(msg) {
            msg.text = text;
            msg.isStreaming = isStreaming;
            if(suggestions) msg.suggestions = suggestions;
            render(els);
        }
    }

    function setLoading(els, bool) {
        state.isLoading = bool;
        els.btn.style.opacity = bool ? '0.5' : '1';
        els.input.disabled = bool;
    }

    function render(els) {
        els.body.innerHTML = state.messages.map(msg => `
            <div class="msg-row ${msg.sender}">
                ${msg.sender === 'bot' ? `<div class="avatar bot"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M19 14v0a7 7 0 0 0-7-7v0"/><path d="M19 14v0a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v0"/><path d="M9 22v-4"/><path d="M15 22v-4"/></svg></div>` : ''}
                <div style="max-width:85%">
                    <div class="bubble ${msg.sender}">
                        ${parseMarkdown(msg.text)}
                        ${msg.isStreaming ? '<span style="animation:pulse 1s infinite">▋</span>' : ''}
                    </div>
                    ${msg.suggestions ? `
                        <div class="suggestions">
                            ${msg.suggestions.map(s => `<div class="chip" onclick="window.aariniSuggest('${s}')">${s}</div>`).join('')}
                        </div>` : ''}
                </div>
                ${msg.sender === 'user' ? `<div class="avatar user"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>` : ''}
            </div>
        `).join('');
        els.body.scrollTop = els.body.scrollHeight;
    }

    function parseMarkdown(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- /g, '<br>• ');
    }

    async function streamGemini(userText, msgId, els) {
        if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("PASTE")) {
            updateMessage(els, msgId, "Please paste API Key in chatbot.js line 12.", false);
            return;
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: SYSTEM_INSTRUCTION + "\nUser Query: " + userText }] }]
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
                try {
                    const json = JSON.parse(line.replace(/^,/, '')); 
                    if (json.candidates && json.candidates[0].content) {
                        const newText = json.candidates[0].content.parts[0].text;
                        fullText += newText;
                        
                        if (fullText.includes("---SUGGESTIONS---")) {
                            const [main, suggs] = fullText.split("---SUGGESTIONS---");
                            updateMessage(els, msgId, main.trim(), true, suggs.split('\n').filter(s => s.trim().length > 0));
                        } else {
                            updateMessage(els, msgId, fullText, true);
                        }
                    }
                } catch(e) {}
            }
        }
        
        if (fullText.includes("---SUGGESTIONS---")) {
            const [main, suggs] = fullText.split("---SUGGESTIONS---");
            updateMessage(els, msgId, main.trim(), false, suggs.split('\n').filter(s => s.trim().length > 0));
        } else {
            updateMessage(els, msgId, fullText, false);
        }
    }

    // --- 6. AUTO-INIT ---
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();