import { Suspense, lazy, useState, useEffect } from "react";
import { CircuitBackground } from "./components/CircuitBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { Toaster } from "./components/ui/sonner";

// --- Lazy Load Components ---
const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Services = lazy(() => import("./components/Services").then((m) => ({ default: m.Services })));
const Portfolio = lazy(() => import("./components/Portfolio").then((m) => ({ default: m.Portfolio })));
const CTA = lazy(() => import("./components/CTA").then((m) => ({ default: m.CTA })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

// --- Lazy Load Pages ---
const ResponsivePage = lazy(() => import("./pages/Responsive").then((m) => ({ default: m.ResponsivePage })));
const SEOPage = lazy(() => import("./pages/SEO").then((m) => ({ default: m.SEOPage })));
const SpeedPage = lazy(() => import("./pages/Speed").then((m) => ({ default: m.SpeedPage })));
const EightReasonsPage = lazy(() => import("./pages/EightReasons").then((m) => ({ default: m.EightReasonsPage })));
const CustomSoftwarePage = lazy(() => import("./pages/CustomSoftware").then((m) => ({ default: m.CustomSoftwarePage })));
const BigIdeaPage = lazy(() => import("./pages/BigIdea").then((m) => ({ default: m.BigIdeaPage })));
const RequestProjectPage = lazy(() => import("./pages/RequestProject").then((m) => ({ default: m.RequestProjectPage })));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage").then((m) => ({ default: m.AdminDashboardPage })));

// 1. CHANGED: Renamed to AdsPage and pointing to correct file
const AdsPage = lazy(() => import("./components/AdsPage"));

// --- Loaders ---
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#0066FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-slate-900 text-lg">Loading...</p>
    </div>
  </div>
);

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-12 h-12 border-3 border-[#0066FF] border-t-transparent rounded-full animate-spin" />
  </div>
);

// 2. CHANGED: Updated Type Definition
type Page =
  | "Home"
  | "About"
  | "Services"
  | "Portfolio"
  | "Contact"
  | "Responsive"
  | "SEO"
  | "Speed"
  | "8Reasons"
  | "CustomSoftware"
  | "BigIdea"
  | "RequestProject"
  | "AdminLogin"
  | "AdminDashboard"
  | "AdsPage"; // Renamed here

export default function App() {
  // 3. UPDATED: Check URL for AdsPage
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // If the browser URL is /re, load AdsPage
    if (typeof window !== 'undefined' && window.location.pathname === '/re') {
      return "AdsPage";
    }
    return "Home";
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);

    // Update URL
    if (page === "Home") {
      window.history.pushState({}, "", "/");
    } else if (page === "AdsPage") {
      window.history.pushState({}, "", "/re");
    }

    if (
      page === "About" ||
      page === "Services" ||
      page === "Portfolio" ||
      page === "Contact"
    ) {
      setTimeout(() => {
        const element = document.getElementById(page.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // 4. NEW: Specific Block for AdsPage (White Theme)
  // We handle this separately so it doesn't get the Black background
  if (currentPage === "AdsPage") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Pass currentPage so Navbar knows what to highlight */}
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        <Suspense fallback={<PageLoader />}>
           {/* Add padding so it doesn't hide behind Navbar */}
           <div className="pt-20">
             <AdsPage />
           </div>
        </Suspense>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  // 5. EXISTING: Dark Mode Pages (Circuit Background)
  if (
    currentPage === "Responsive" ||
    currentPage === "SEO" ||
    currentPage === "Speed" ||
    currentPage === "8Reasons" ||
    currentPage === "CustomSoftware" ||
    currentPage === "BigIdea" ||
    currentPage === "RequestProject" ||
    currentPage === "AdminLogin" ||
    currentPage === "AdminDashboard"
    // REMOVED AdsPage from here so it stays White
  ) {
    return (
      <div className="min-h-screen bg-black">
        <CircuitBackground />
        <Navbar
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        <Suspense fallback={<PageLoader />}>
          {currentPage === "Responsive" && <ResponsivePage onNavigate={handleNavigate} />}
          {currentPage === "SEO" && <SEOPage onNavigate={handleNavigate} />}
          {currentPage === "Speed" && <SpeedPage onNavigate={handleNavigate} />}
          {currentPage === "8Reasons" && <EightReasonsPage onNavigate={handleNavigate} />}
          {currentPage === "CustomSoftware" && <CustomSoftwarePage onNavigate={handleNavigate} />}
          {currentPage === "BigIdea" && <BigIdeaPage onNavigate={handleNavigate} />}
          {currentPage === "RequestProject" && <RequestProjectPage onNavigate={handleNavigate} />}
          {currentPage === "AdminLogin" && <AdminLoginPage onNavigate={handleNavigate} />}
          {currentPage === "AdminDashboard" && <AdminDashboardPage onNavigate={handleNavigate} />}
        </Suspense>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  // 6. EXISTING: Home Page (Default White)
  return (
    <div className="min-h-screen bg-white">
      <PerformanceMonitor />
      <ScrollProgress />
      <Navbar
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <Hero onNavigate={handleNavigate} />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTA onNavigate={handleNavigate} />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact onNavigate={handleNavigate} />
      </Suspense>
      <Footer onNavigate={handleNavigate} />
      <BackToTop />
      <Toaster />
    </div>
  );
}