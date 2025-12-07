'use client';

import { useEffect } from "react";
import WebsitePreview from "@/components/WebsitePreview";
import AdminDashboard from "./AdminDashboard";
import VoiceDemo from "./VoiceDemo";
import ThreeDRender from "./ThreeDRender";
import FeatureThreeChat from "./FeatureThreeChat";

export default function Home() {

  useEffect(() => {
    // 1. Disable native browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. Scroll to top immediately on load
    window.scrollTo(0, 0);

    // 3. THE FIX: Force scroll to top right before the page refreshes
    // This wipes the browser's memory of the scroll position
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <main>
      <WebsitePreview />
      <AdminDashboard />
      <FeatureThreeChat />
      <VoiceDemo />
      <ThreeDRender />
    </main>
  );
}