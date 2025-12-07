import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "figma:asset/1b0deca266db272ece610c5c199de3f86ef26a14.png";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  // --- Admin Click Tracking Logic ---
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<number | null>(null);
  const CLICK_TARGET = 5; // Clicks needed
  const CLICK_RESET_TIME = 1500; // 1.5 seconds

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, []);

  const handleLogoClick = () => {
    // Clear any existing reset timer
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === CLICK_TARGET) {
      // SUCCESS: Navigate to admin and reset
      console.log("Admin Login Triggered!");
      onNavigate("AdminLogin");
      setClickCount(0);
    } else {
      // Set a timer to reset the count if the user stops clicking
      clickTimer.current = window.setTimeout(() => {
        setClickCount(0);
      }, CLICK_RESET_TIME);
    }
  };
  // --- End of Admin Logic ---

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      {/* Subtle Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company */}
          <div>
            {/* THIS DIV IS NOW CLICKABLE */}
            <div
              className="mb-6 cursor-pointer"
              onClick={handleLogoClick}
            >
              <img
                src={logo}
                alt="Techinnov Logo"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Building digital intelligence for the future.
              Transforming ideas into powerful digital
              solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 mb-6 uppercase tracking-[0.2em] text-sm">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                "Websites",
                "Web Apps",
                "Custom Software",
                "AI Automation",
                "SEO Services",
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => onNavigate("Services")}
                    className="text-slate-600 hover:text-[#0066FF] transition-colors text-sm"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-slate-900 mb-6 uppercase tracking-[0.2em] text-sm">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About", page: "About" },
                { name: "Services", page: "Services" },
                { name: "Portfolio", page: "Portfolio" },
                { name: "Contact", page: "Contact" },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-slate-600 hover:text-[#0066FF] transition-colors text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-900 mb-6 uppercase tracking-[0.2em] text-sm">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:team.techinnov@gmail.com"
                  className="text-slate-600 hover:text-[#0066FF] transition-colors text-sm"
                >
                  team.techinnov@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" />
                <div className="text-slate-600 text-sm space-y-1">
                  <a
                    href="tel:+918657854711"
                    className="hover:text-[#0066FF] transition-colors block"
                  >
                    +91 86578 54711
                  </a>
                  <a
                    href="tel:+917304190805"
                    className="hover:text-[#0066FF] transition-colors block"
                  >
                    +91 73041 90805
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0066FF] mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 text-sm">
                  Mumbai, Maharashtra
                  <br />
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Techinnov. All
              rights reserved.
            </p>
            <div className="flex gap-8">
              <button className="text-slate-500 hover:text-[#0066FF] text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-slate-500 hover:text-[#0066FF] text-sm transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}