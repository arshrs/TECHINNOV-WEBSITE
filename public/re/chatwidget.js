(function() {
    // ==========================================
    // 1. CONFIGURATION & STATE
    // ==========================================
    const API_ENDPOINT = '/api/chat';

    const LOADING_STATUSES = [
        "Analyzing request...",
        "Searching database...",
        "Checking trends...",
        "Thinking...",
    ];

    const INITIAL_MESSAGE = {
        id: 'init',
        text: "Hello! I'm Aarini, your Real Estate Assistant. \n\nI can help with property details, market trends in Mumbai & Thane, or guide you through the buying process.",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["Show me listings in Bandra", "What are current interest rates?", "Checklist for buying a flat"]
    };

    // State
    let state = {
        history: [],
        messages: [INITIAL_MESSAGE],
        isLoading: false,
        isWindowOpen: false,
    };

    // ==========================================
    // 2. INITIALIZATION CONTROLLER
    // ==========================================
    function init() {
        if (document.querySelector('.aarini-section-container')) return;

        // 1. Inject Styles
        const styleSheet = document.createElement("style");
        styleSheet.textContent = getStyles();
        document.head.appendChild(styleSheet);

        // 2. Inject HTML Container
        const placeholder = document.createElement("div");
        placeholder.innerHTML = getHTML();
        document.body.appendChild(placeholder.firstElementChild);

        // 3. Attach Logic & Render
        attachLogic();
        render();
        state.isWindowOpen = true; // Window is always open now

        // 4. Auto-Open after 1.5s to show it's there
        setTimeout(() => {
            const win = document.getElementById('aarini-window');
            if (win && !state.isWindowOpen) {
                win.classList.add('active');
                state.isWindowOpen = true;
            }
        }, 1500);
    }

    // ==========================================
    // 3. HTML & CSS
    // ==========================================
    function getStyles() {
        return `
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            .aarini-section-container { 
                font-family: 'Plus Jakarta Sans', sans-serif; 
                padding: 4rem 1rem;
                background-color: #f8fafc;
            }
            .aarini-chat-window {
                width: 380px; height: 600px; background: #f8fafc;
                border-radius: 24px; overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
                border: 1px solid #e2e8f0;
                display: flex; flex-direction: column;
                transform-origin: bottom right; 
                margin: 0 auto; /* Center the chat window */
            }
            .aarini-chat-header {
                background: linear-gradient(to right, #0ea5e9, #2563eb);
                padding: 20px; color: white; display: flex; justify-content: space-between; align-items: flex-start;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            }
            .aarini-bot-badge { display: flex; align-items: center; gap: 12px; }
            .aarini-bot-icon { background: rgba(255,255,255,0.2); padding: 8px; border-radius: 12px; backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); }
            
            .aarini-chat-body { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 24px; background: white; scroll-behavior: smooth; }
            .aarini-chat-body::-webkit-scrollbar { width: 6px; }
            .aarini-chat-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
            
            .aarini-msg-row { display: flex; gap: 10px; width: 100%; animation: aarini-fadeIn 0.3s ease-out; }
            .aarini-msg-row.user { flex-direction: row-reverse; }
            
            .aarini-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; background: #e2e8f0; color: #475569; }
            .aarini-avatar.bot { background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe); color: #0284c7; border: 1px solid #bae6fd; }

            .aarini-bubble { max-width: 100%; padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.6; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.03); word-wrap: break-word; }
            .aarini-bubble.bot { background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0; border-top-left-radius: 4px; }
            .aarini-bubble.user { background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; border-top-right-radius: 4px; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2); }
            .aarini-bubble strong { font-weight: 700; color: #0f172a; }
            .aarini-bubble.user strong { color: white; }
            .aarini-bubble ul { margin-left: 20px; list-style-type: disc; padding-left: 0; }

            .aarini-suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
            .aarini-chip { background: white; border: 1px solid #e0f2fe; color: #0284c7; font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 20px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
            .aarini-chip:hover { background: #f0f9ff; border-color: #0ea5e9; transform: translateY(-1px); }

            .aarini-sources { margin-top: 12px; font-size: 11px; }
            .aarini-sources-title { font-weight: 600; color: #64748b; margin-bottom: 4px; }
            .aarini-source-item { display: block; color: #0ea5e9; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

            .aarini-chat-footer { padding: 16px; background: white; border-top: 1px solid #f1f5f9; position: relative; box-shadow: 0 -5px 20px -10px rgba(0,0,0,0.05); }
            .aarini-input-box { width: 100%; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 50px 14px 20px; font-size: 14px; outline: none; transition: all 0.2s; }
            .aarini-input-box:focus { background: white; border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1); }
            .aarini-send-btn { position: absolute; right: 22px; top: 22px; width: 40px; height: 40px; background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
            .aarini-send-btn:hover { transform: scale(1.05); }
            .aarini-send-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; }

            .aarini-loading-indicator { display: flex; align-items: center; gap: 8px; animation: aarini-fadeIn 0.3s; }
            .aarini-loading-dots { display: flex; gap: 2px; background: #f1f5f9; padding: 12px; border-radius: 18px; border-top-left-radius: 4px; }
            .aarini-loading-dots span { width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: aarini-bounce 1s infinite; }
            .aarini-loading-dots span:nth-child(2) { animation-delay: 0.15s; }
            .aarini-loading-dots span:nth-child(3) { animation-delay: 0.3s; }

            @keyframes aarini-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes aarini-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
            @media (max-width: 480px) { .aarini-chat-window { width: calc(100vw - 20px); height: calc(100vh - 90px); right: -10px; bottom: -10px; border-radius: 20px 20px 0 0; } }
        `;
    }

    function getHTML() {
        return `
            <section class="aarini-section-container reveal">
                <div class="max-w-6xl mx-auto">
                    <div class="w-full mb-8 border-b-2 border-slate-100 pb-4 flex items-end gap-6">
                        <span class="text-7xl md:text-8xl font-black text-blue-100 leading-none tracking-tighter" style="-webkit-text-stroke: 2px #e2e8f0;">03</span>
                        <div class="pb-2">
                            <h2 class="text-2xl md:text-3xl font-bold text-slate-900">AI Assistant</h2>
                            <p class="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Instant Answers • Lead Capture</p>
                        </div>
                    </div>
                    <div class="aarini-chat-window" id="aarini-window">
                        <div class="aarini-chat-header">
                            <div class="aarini-bot-badge">
                                <div class="aarini-bot-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M19 14v0a7 7 0 0 0-7-7v0"/><path d="M19 14v0a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v0"/><path d="M9 22v-4"/><path d="M15 22v-4"/></svg></div>
                                <div><h3 style="margin:0; font-weight:700; font-size:18px;">Aarini</h3><div style="font-size:11px; opacity:0.9; margin-top:2px;"><span style="width:8px; height:8px; background:#4ade80; border-radius:50%; display:inline-block; margin-right:4px;"></span>Online • Citizen Prop</div></div>
                            </div>
                            <div style="display:flex; gap:8px;">
                                <button id="aarini-clear-btn" title="Clear Chat" style="background:none; border:none; color:rgba(255,255,255,0.8); cursor:pointer; padding:4px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
                            </div>
                        </div>
                        <div class="aarini-chat-body" id="aarini-chat-feed"></div>
                        <div class="aarini-chat-footer">
                            <form id="aarini-input-form">
                                <input type="text" id="aarini-chat-input" class="aarini-input-box" placeholder="Ask me anything..." autocomplete="off">
                                <button type="submit" id="aarini-send-btn" class="aarini-send-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // ==========================================
    // 4. LOGIC ENGINE
    // ==========================================
    function attachLogic() {
        const els = {
            window: document.getElementById('aarini-window'),
            body: document.getElementById('aarini-chat-feed'),
            input: document.getElementById('aarini-chat-input'),
            form: document.getElementById('aarini-input-form'),
            clear: document.getElementById('aarini-clear-btn')
        };

        const actions = {
            clear: () => {
                state.history = [];
                state.messages = [INITIAL_MESSAGE];
                render();
            },
            send: async (textOverride) => {
                const text = textOverride || els.input.value.trim();
                if (!text || state.isLoading) return;

                addMessage({ text, sender: 'user' });
                state.history.push({ role: 'user', parts: [{ text }] });
                els.input.value = '';
                setLoading(true);

                const botMsgId = addMessage({ text: '', sender: 'bot', isStreaming: true });

                try {
                    await streamResponse(text, botMsgId);
                } catch (e) {
                    console.error("Chat Error:", e);
                    updateMessage(botMsgId, { text: "⚠️ Connection Error. Please try again." });
                }
                setLoading(false);
            }
        };

        els.clear.onclick = actions.clear;
        els.form.onsubmit = (e) => {
            e.preventDefault();
            actions.send();
        };

        window.aariniSuggest = (text) => actions.send(text);
    }

    // ==========================================
    // 5. STATE & RENDER MANAGEMENT
    // ==========================================
    function addMessage(msg) {
        const newMsg = { id: Date.now(), timestamp: new Date(), ...msg };
        state.messages.push(newMsg);
        render();
        return newMsg.id;
    }

    function updateMessage(id, updates) {
        const msgIndex = state.messages.findIndex(m => m.id === id);
        if (msgIndex > -1) {
            state.messages[msgIndex] = { ...state.messages[msgIndex], ...updates };
            render();
        }
    }

    function setLoading(bool) {
        state.isLoading = bool;
        document.getElementById('aarini-chat-input').disabled = bool;
        document.getElementById('aarini-send-btn').disabled = bool;
        render();
    }

    function render() {
        const body = document.getElementById('aarini-chat-feed');
        if (!body) return;

        body.innerHTML = state.messages.map(msg => createMessageHTML(msg)).join('');

        if (state.isLoading && state.messages[state.messages.length - 1].sender !== 'bot') {
            body.innerHTML += createLoadingIndicatorHTML();
        }

        body.scrollTop = body.scrollHeight;
    }

    function createMessageHTML(msg) {
        const isBot = msg.sender === 'bot';
        return `
            <div class="aarini-msg-row ${msg.sender}">
                ${isBot ? `<div class="aarini-avatar bot"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M19 14v0a7 7 0 0 0-7-7v0"/><path d="M19 14v0a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v0"/><path d="M9 22v-4"/><path d="M15 22v-4"/></svg></div>` : ''}
                <div style="max-width:85%; display: flex; flex-direction: column; align-items: ${isBot ? 'flex-start' : 'flex-end'};">
                    <div class="aarini-bubble ${msg.sender}">
                        ${parseMarkdown(msg.text)}
                        ${msg.isStreaming ? '<span style="animation:pulse 1s infinite">▋</span>' : ''}
                        ${msg.sources ? createSourcesHTML(msg.sources) : ''}
                    </div>
                    ${msg.suggestions ? `<div class="aarini-suggestions">${msg.suggestions.map(s => `<div class="aarini-chip" onclick="window.aariniSuggest('${s.replace(/'/g, "\\'")}')">${s}</div>`).join('')}</div>` : ''}
                </div>
                ${!isBot ? `<div class="aarini-avatar user"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>` : ''}
            </div>
        `;
    }

    function createLoadingIndicatorHTML() {
        const loadingText = LOADING_STATUSES[Math.floor(Math.random() * LOADING_STATUSES.length)];
        return `
            <div class="aarini-loading-indicator">
                <div class="aarini-loading-dots"><span></span><span></span><span></span></div>
                <span style="font-size: 12px; color: #64748b;">${loadingText}</span>
            </div>
        `;
    }

    function createSourcesHTML(sources) {
        return `
            <div class="aarini-sources">
                <div class="aarini-sources-title">Sources:</div>
                ${sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="aarini-source-item" title="${s.title}">${s.title || s.url}</a>`).join('')}
            </div>
        `;
    }

    function parseMarkdown(text = '') {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/<br>\s*[\*\-]\s+(.*)/g, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    }

    // ==========================================
    // 6. API COMMUNICATION
    // ==========================================
    async function streamResponse(userText, msgId) {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText, history: state.history })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = '';
        let botResponse = {};

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                try {
                    const json = JSON.parse(line);
                    if (json.text) accumulatedText += json.text;
                    if (json.grounding) {
                        botResponse.sources = (botResponse.sources || []).concat(json.grounding.map(g => g.web));
                    }
                } catch (e) {
                    console.warn("Could not parse JSON chunk:", line);
                }
            }

            const [mainText, suggsRaw] = accumulatedText.split("---SUGGESTIONS---");
            botResponse.text = mainText.trim();
            if (suggsRaw) {
                botResponse.suggestions = suggsRaw.split('\n').filter(s => s.trim().length > 0);
            }
            updateMessage(msgId, { ...botResponse, isStreaming: true });
        }

        state.history.push({ role: 'model', parts: [{ text: accumulatedText }] });
        updateMessage(msgId, { isStreaming: false });
    }

    // --- AUTO-INIT ---
    init();
})();