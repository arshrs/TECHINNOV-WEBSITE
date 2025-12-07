import React, { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface AdminLoginPageProps {
  onNavigate: (page: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onNavigate,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // --- THIS IS WHERE YOU WOULD ADD YOUR REAL AUTH LOGIC ---
    if (username === "admin" && password === "admin123") {
      // 1. Store a "logged in" flag in session storage
      sessionStorage.setItem("isAdminLoggedIn", "true");
      // 2. Navigate to the dashboard
      onNavigate("AdminDashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full">
        {/* Login Form */}
        <div className="p-8 rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-800 text-[#0066FF] flex items-center justify-center rounded-full mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl text-white font-bold">
              Admin Login
            </h1>
            <p className="text-slate-400">
              Access the website control panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-slate-300"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white focus:border-[#0066FF] focus:ring-[#0066FF]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-slate-300"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white focus:border-[#0066FF] focus:ring-[#0066FF]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;