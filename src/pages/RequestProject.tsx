import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// 🚨 PASTE YOUR GOOGLE SCRIPT WEB APP URL FROM STEP 2 HERE
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw3ZTR73u9AHh8xVrhBIQO7lDWT0HGY60qSJdm6CVS4YX54o1B267KLOPn3oL5WnTrzJA/exec";

interface RequestProjectPageProps {
  onNavigate?: (page: string) => void;
}

export function RequestProjectPage({
  onNavigate,
}: RequestProjectPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    projectType: "",
    description: "",
    budget: "",
    deadline: "",
    website: "",
    referralSource: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+91[\s]?)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ""));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email =
        "Please enter a valid email address (e.g., name@gmail.com)";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone =
        "Please enter a valid Indian phone number (10 digits)";
    }

    if (!formData.projectType) {
      errors.projectType = "Please select a project type";
    }

    if (!formData.description.trim()) {
      errors.description = "Project description is required";
    } else if (formData.description.trim().length < 20) {
      errors.description =
        "Please provide at least 20 characters describing your project";
    }

    if (!formData.budget) {
      errors.budget = "Please select a budget range";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- THIS IS THE SUBMIT FUNCTION FOR GOOGLE SHEETS ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors above before submitting");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // 1. Check if the URL has been set
    if (
      GOOGLE_SCRIPT_URL ===
      "YOUR_DEPLOYED_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"
    ) {
      setError(
        "Developer error: Please add the Google Script URL.",
      );
      setIsSubmitting(false);
      return;
    }

    // 2. Format the data for Google Apps Script
    const urlEncodedData = new URLSearchParams();
    for (const key in formData) {
      urlEncodedData.append(
        key,
        formData[key as keyof typeof formData],
      );
    }

    try {
      // 3. Send the data using fetch
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData.toString(),
        mode: "no-cors", // Use 'no-cors' for simple cross-origin POSTs
      });

      console.log("Project submission successful");
      setIsSubmitted(true);

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        projectType: "",
        description: "",
        budget: "",
        deadline: "",
        website: "",
        referralSource: "",
      });
    } catch (err) {
      console.error("Error submitting project request:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- END OF MODIFIED FUNCTION ---

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="max-w-lg w-full"
        >
          <div className="p-8 sm:p-10 rounded-2xl border border-[#0066FF]/20 bg-gradient-to-b from-[#0066FF]/5 to-white backdrop-blur-md text-center shadow-xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#0066FF] to-[#3b82f6] flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl shadow-[#0066FF]/30 animate-pulse">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl text-slate-900 mb-3 sm:mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-slate-700 mb-2 text-base sm:text-lg">
              Thank you for choosing{" "}
              <span className="text-[#0066FF]">Techinnov</span>!
            </p>
            <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              We've received your project request and our team
              will reach back to you within{" "}
              <span className="text-slate-900">24 hours</span>.
              We're excited to bring your vision to life!
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-[#0066FF]/30"
              >
                Submit Another Request
              </Button>
              <Button
                onClick={() =>
                  onNavigate
                    ? onNavigate("Home")
                    : (window.location.href = "/")
                }
                variant="outline"
                className="w-full border-[#0066FF]/30 text-[#0066FF] hover:bg-[#0066FF]/5"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {onNavigate && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => onNavigate("Home")}
              variant="ghost"
              className="group flex items-center gap-2 text-slate-600 hover:text-[#0066FF] hover:bg-[#0066FF]/5 transition-all duration-300 -ml-2"
            >
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <span>Back to Home</span>
            </Button>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3 sm:mb-4">
            Request a Project
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 px-4">
            Let's bring your vision to life. Fill out the form
            below and we'll get back to you shortly.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-white shadow-lg space-y-6"
        >
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-slate-700 mb-2 block"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  handleChange("fullName", e.target.value)
                }
                className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
                placeholder="John Doe"
              />
              {validationErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-slate-700 mb-2 block"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
                placeholder="john@example.com"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <Label
                htmlFor="phone"
                className="text-slate-700 mb-2 block"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
                placeholder="+91 86578 54711"
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <Label
                htmlFor="companyName"
                className="text-slate-700 mb-2 block"
              >
                Company / Startup Name
              </Label>
              <Input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  handleChange("companyName", e.target.value)
                }
                className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          {/* Project Type */}
          <div>
            <Label
              htmlFor="projectType"
              className="text-slate-700 mb-2 block"
            >
              Project Type *
            </Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) =>
                handleChange("projectType", value)
              }
              required
            >
              <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-200">
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="webapp">Web App</SelectItem>
                <SelectItem value="ai-agent">
                  AI Agent
                </SelectItem>
                <SelectItem value="mobile-app">
                  Mobile App
                </SelectItem>
                <SelectItem value="custom-software">
                  Custom Software
                </SelectItem>
              </SelectContent>
            </Select>
            {validationErrors.projectType && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.projectType}
              </p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-slate-700 mb-2 block"
            >
              Project Description *
            </Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF] min-h-[150px]"
              placeholder="Tell us about your project, goals, and requirements..."
            />
            {validationErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {validationErrors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Budget Range */}
            <div>
              <Label
                htmlFor="budget"
                className="text-slate-700 mb-2 block"
              >
                Budget Range *
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  handleChange("budget", value)
                }
                required
              >
                <SelectTrigger className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200">
                  <SelectItem value="under-50k">
                    Under ₹50,000
                  </SelectItem>
                  <SelectItem value="50k-1L">
                    ₹50,000 - ₹1,00,000
                  </SelectItem>
                  <SelectItem value="1L-2.5L">
                    ₹1,00,000 - ₹2,50,000
                  </SelectItem>
                  <SelectItem value="2.5L-5L">
                    ₹2,50,000 - ₹5,00,000
                  </SelectItem>
                  <SelectItem value="5L-plus">
                    ₹5,00,000+
                  </SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.budget && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.budget}
                </p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <Label
                htmlFor="deadline"
                className="text-slate-700 mb-2 block"
              >
                Expected Deadline
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  handleChange("deadline", e.target.value)
                }
                className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <Label
              htmlFor="website"
              className="text-slate-700 mb-2 block"
            >
              Website (Optional)
            </Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                handleChange("website", e.target.value)
              }
              className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
              placeholder="https://example.com"
            />
          </div>

          {/* Referral Source */}
          <div>
            <Label
              htmlFor="referralSource"
              className="text-slate-700 mb-2 block"
            >
              How did you hear about us? (Optional)
            </Label>
            <Input
              id="referralSource"
              type="text"
              value={formData.referralSource}
              onChange={(e) =>
                handleChange("referralSource", e.target.value)
              }
              className="bg-white border-slate-200 text-slate-900 focus:border-[#0066FF]"
              placeholder="Friend, Social Media, etc."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 uppercase tracking-wider"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Request
              </>
            )}
          </Button>

          <p className="text-slate-500 text-sm text-center">
            By submitting this form, you agree to be contacted
            by Techinnov regarding your project.
          </p>
        </motion.form>
      </div>
    </div>
  );
}