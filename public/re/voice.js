/* FILENAME: js/voice.js
   PURPOSE: Feature 04 (AI Voice Demo)
*/

(function() {

    // CONFIGURATION
    const VOICE_AUDIO_URL = "assets/call_demo.mp3"; 
    let callAudio = new Audio(VOICE_AUDIO_URL);
    let voiceTimerInterval;

    // --- 1. CSS STYLES ---
    const styles = `
    <style>
        .ti-section-voice { padding: 6rem 1.5rem; background: #fff; border-top: 1px solid #f1f5f9; font-family: 'Plus Jakarta Sans', sans-serif; }
        .voice-card { background: #0f172a; border-radius: 24px; height: 450px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; color: white; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.3); }
        .voice-glow { position: absolute; width: 100%; height: 100%; background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%); pointer-events: none; }
        
        .wave-container { display: flex; gap: 6px; height: 40px; align-items: center; margin: 20px 0; }
        .wave-bar { width: 6px; background: #60a5fa; border-radius: 4px; height: 10px; transition: height 0.2s; }
        .is-playing .wave-bar { animation: wave-anim 1s infinite ease-in-out; }
        @keyframes wave-anim { 0%, 100% { height: 10px; opacity: 0.5; } 50% { height: 40px; opacity: 1; } }
        
        .call-btn { px-8 py-3 rounded-full font-bold transition shadow-lg flex items-center gap-2 transform hover:scale-105; }
    </style>
    `;

    // --- 2. HTML STRUCTURE ---
    const html = `
    <section class="ti-section-voice">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-center">
            
            <div class="w-full md:w-1/2 md:text-right"> 
                 <div class="flex items-end gap-4 mb-6 md:justify-end">
                    <span class="text-7xl font-black text-slate-200 leading-none -mb-2">04</span>
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900">AI Voice Caller</h2>
                        <p class="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Audio Demo</p>
                    </div>
                </div>
                <p class="text-slate-500 text-lg mb-6">
                    <strong>Experience the future.</strong> Listen to a <strong>pre-recorded demo</strong> of how our AI Agent calls leads, negotiates, and books appointments in real-time.
                </p>
                <div class="inline-flex items-center gap-2 text-slate-400 text-sm md:justify-end"><span>🔊 Sound ON</span></div>
            </div>

            <div class="w-full md:w-1/2">
                <div class="voice-card">
                    <div class="voice-glow"></div>
                    
                    <div id="voice-idle" class="flex flex-col items-center z-10 relative">
                        <div class="w-24 h-24 rounded-full border border-slate-600 flex items-center justify-center mb-6 relative cursor-pointer" onclick="voiceActions.answer()">
                            <div class="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                            <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center z-10 border border-green-500/50">
                                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold mb-2 text-white">Incoming Demo Call</h3>
                        <button onclick="voiceActions.answer()" class="bg-green-500 hover:bg-green-600 text-white px-10 py-3 rounded-full font-bold shadow-lg mt-4">Play Demo</button>
                    </div>

                    <div id="voice-active" class="hidden flex-col items-center z-10 w-full">
                        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                             <span class="text-4xl">🗣️</span>
                        </div>
                        <div class="text-xl font-bold mb-1 text-white">Playing Demo...</div>
                        <div class="text-blue-300 font-mono text-sm mb-8" id="voice-timer">00:00</div>
                        <div class="wave-container" id="wave-visualizer">
                            <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                        </div>
                        <button onclick="voiceActions.end()" class="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg mt-4">✕</button>
                    </div>

                </div>
            </div>

        </div>
    </section>
    `;

    document.head.insertAdjacentHTML("beforeend", styles);
    document.body.insertAdjacentHTML("beforeend", html);

    // --- 3. LOGIC ---
    window.voiceActions = {
        answer: () => {
            document.getElementById('voice-idle').classList.add('hidden');
            const active = document.getElementById('voice-active');
            active.classList.remove('hidden');
            active.classList.add('flex');
            
            callAudio.currentTime = 0;
            callAudio.play().catch(e => console.log("Audio Error:", e));
            document.getElementById('wave-visualizer').classList.add('is-playing');
            
            let seconds = 0;
            document.getElementById('voice-timer').innerText = "00:00";
            voiceTimerInterval = setInterval(() => {
                seconds++;
                const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
                const secs = (seconds % 60).toString().padStart(2, '0');
                document.getElementById('voice-timer').innerText = `${mins}:${secs}`;
            }, 1000);
            
            callAudio.onended = () => voiceActions.end();
        },
        end: () => {
            callAudio.pause();
            callAudio.currentTime = 0;
            document.getElementById('voice-active').classList.add('hidden');
            document.getElementById('voice-active').classList.remove('flex');
            document.getElementById('voice-idle').classList.remove('hidden');
            document.getElementById('wave-visualizer').classList.remove('is-playing');
            clearInterval(voiceTimerInterval);
        }
    };

})();