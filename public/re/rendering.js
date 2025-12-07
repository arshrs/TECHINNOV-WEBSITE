/* FILENAME: js/rendering.js
   PURPOSE: Feature 05 - Big Visual Showcase (Image -> Arrow -> Video)
   CHANGES: Huge Images, Removed Text Clutter, Full Width
*/

(function() {

    // --- 1. LOCAL CONFIGURATION ---
    const LOCAL_IMG_PATH = "assets/blueprint.png";
    const LOCAL_VID_PATH = "assets/render.mp4";

    // --- 2. CSS STYLES ---
    const styles = `
    <style>
        .ti-section-render { 
            padding: 6rem 2rem; 
            background: #f8fafc; 
            border-top: 1px solid #e2e8f0; 
            font-family: 'Plus Jakarta Sans', sans-serif; 
        }

        /* Full Width Container */
        .visual-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            width: 100%;
            max-width: 1400px; /* Wide screen support */
            margin: 0 auto;
        }

        /* The Cards (Huge) */
        .media-card {
            flex: 1;
            height: 550px; /* Much Taller */
            background: white;
            border-radius: 24px;
            border: 4px solid white;
            box-shadow: 0 30px 60px -15px rgba(0,0,0,0.15);
            overflow: hidden;
            position: relative;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .media-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 40px 80px -20px rgba(37,99,235,0.2);
            z-index: 10;
        }

        .media-content {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* Floating Badges */
        .media-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(8px);
            color: white;
            font-size: 12px;
            font-weight: 800;
            padding: 8px 16px;
            border-radius: 40px;
            border: 1px solid rgba(255,255,255,0.2);
            z-index: 5;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .badge-blue { background: rgba(37, 99, 235, 0.9); }

        /* The Animated Arrow (Larger) */
        .process-arrow {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-width: 60px;
            color: #94a3b8;
            z-index: 2;
        }
        .arrow-icon {
            font-size: 40px;
            color: #2563eb;
            animation: slideRight 1.5s infinite ease-in-out;
            text-shadow: 0 0 20px rgba(37,99,235,0.4);
        }
        @keyframes slideRight {
            0% { transform: translateX(-5px); opacity: 0.5; }
            50% { transform: translateX(5px); opacity: 1; }
            100% { transform: translateX(-5px); opacity: 0.5; }
        }

        /* WASD Overlay */
        .wasd-overlay {
            position: absolute;
            bottom: 30px;
            right: 30px;
            display: flex;
            gap: 6px;
            opacity: 0.9;
        }
        .key {
            width: 32px; height: 32px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.6);
            border-radius: 6px;
            color: white;
            font-size: 12px;
            font-weight: bold;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(4px);
            box-shadow: 0 4px 0 rgba(0,0,0,0.2);
        }

        /* Header Style */
        .render-header {
            text-align: center;
            margin-bottom: 3rem;
        }
    </style>
    `;

    // --- 3. HTML STRUCTURE ---
    const html = `
    <section class="ti-section-render">
        
        <div class="render-header">
            <div class="inline-flex items-center gap-3 mb-2">
                <span class="text-6xl font-black text-slate-200 leading-none">05</span>
                <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">3D Interactive Rendering</h2>
            </div>
            <p class="text-blue-600 font-bold uppercase tracking-widest text-sm">Blueprint ➝ 3D Reality</p>
        </div>

        <div class="visual-container">
            
            <div class="media-card group">
                <div class="media-badge">Input: 2D Floor Plan</div>
                <img src="${LOCAL_IMG_PATH}" class="media-content" alt="2D Blueprint" 
                     onerror="this.src='https://placehold.co/800x1200/f1f5f9/94a3b8?text=Add+blueprint.jpg'">
            </div>

            <div class="process-arrow">
                <div class="arrow-icon">➔</div>
            </div>

            <div class="media-card group">
                <div class="media-badge badge-blue">Output: Interactive 3D</div>
                <video class="media-content" autoplay loop muted playsinline poster="https://placehold.co/800x1200/000/FFF?text=Loading...">
                    <source src="${LOCAL_VID_PATH}" type="video/mp4">
                </video>
                
                <div class="wasd-overlay">
                    <div class="key">W</div><div class="key">A</div><div class="key">S</div><div class="key">D</div>
                </div>
            </div>

        </div>

    </section>
    
    <div class="h-24 bg-f8fafc"></div>
    `;

    // 4. INJECT
    document.head.insertAdjacentHTML("beforeend", styles);
    document.body.insertAdjacentHTML("beforeend", html);

})();