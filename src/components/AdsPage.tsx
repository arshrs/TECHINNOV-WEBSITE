'use client';

import { useEffect, Suspense, lazy } from "react";
// 1. KEEP THIS IMPORT STANDARD (It's the first thing users see)
import WebsitePreview from "@/components/WebsitePreview";

// 2. MAKE THESE LAZY (They load in the background)
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const VoiceDemo = lazy(() => import("./VoiceDemo"));
const ThreeDRender = lazy(() => import("./ThreeDRender")); // This is likely the heaviest part
const FeatureThreeChat = lazy(() => import("./FeatureThreeChat"));

// Simple loading placeholder for the lower sections
const SectionLoader = () => (
  <div className="w-full h-[500px] flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    // Applied the "Smart Zoom" fix from before so layout fits laptops
    <main className="w-full overflow-x-auto px-4 md:px-8 [zoom:0.8] md:[zoom:0.9] xl:[zoom:1] relative">


      {/* 3. Render immediate content first */}
      <WebsitePreview />

      {/* 4. Wrap heavy sections in Suspense so they don't block the page load */}
      <Suspense fallback={<SectionLoader />}>
        <AdminDashboard />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FeatureThreeChat />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <VoiceDemo />
      </Suspense>

      {/* 5. 3D Renders are very heavy. Lazy loading this makes the biggest difference. */}
      <Suspense fallback={<div className="h-[200px]" />}>
        <ThreeDRender />
      </Suspense>

    </main>
  );
}