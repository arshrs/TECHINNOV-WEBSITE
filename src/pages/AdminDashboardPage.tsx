import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertTriangle,
  LogOut,
  Mail,
  Phone,
  User,
  FileText,
  MessageSquare,
  Clock,
  Calendar,
  Briefcase,
  Globe,
  HelpCircle,
  X,
  Eye,
} from "lucide-react";

// --- ERROR FIX: Inlined Button Component ---
// This is the placeholder button to prevent import errors.
const Button = ({
  children,
  className,
  variant,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "ghost" | "default" | "lg";
}) => {
  let baseClasses =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50";
  if (variant === "outline") {
    baseClasses +=
      " bg-white border border-slate-300 text-slate-700 hover:bg-slate-100";
  } else {
    baseClasses +=
      " bg-gradient-to-r from-[#0066FF] to-[#3b82f6] text-white";
  }
  return (
    <button
      className={`${baseClasses} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
// --- END OF FIX ---

// --- 1. SET THESE VALUES ---
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw3ZTR73u9AHh8xVrhBIQO7lDWT0HGY60qSJdm6CVS4YX54o1B267KLOPn3oL5WnTrzJA/exec";
const ADMIN_SECRET_KEY = "sarman123";
// ---

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
}

// Type for all fields
type Submission = {
  [key: string]: string | number | Date;
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  projectType: string;
  description: string;
  budget: string;
  deadline: string;
  website: string;
  referralSource: string;
};

// --- DataField Helper (for the modal) ---
const DataField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | Date | null;
}) => {
  let displayValue: React.ReactNode = (
    <span className="text-slate-400 italic">Not provided</span>
  );
  if (value) {
    if (label === "Timestamp" || label === "Deadline") {
      displayValue = new Date(
        value as string,
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (label === "Email") {
      displayValue = (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      );
    } else if (label === "Phone") {
      displayValue = (
        <a
          href={`tel:${value}`}
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      );
    } else if (label === "Website") {
      const url = value.toString().startsWith("http")
        ? value.toString()
        : `https://${value}`;
      displayValue = (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {value}
        </a>
      );
    } else {
      displayValue = String(value);
    }
  }
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 text-slate-500 mt-1">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-sm text-slate-800 break-words">
          {displayValue}
        </div>
      </div>
    </div>
  );
};

// --- Submission Detail Modal ---
const SubmissionDetailModal = ({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) => (
  <div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
    >
      {/* Centered Modal Header */}
      <div className="relative p-5 border-b border-slate-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            {submission.fullName}
          </h3>
          <p className="text-sm text-blue-600 font-medium">
            {submission.projectType}
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-800"
        >
          <X size={24} />
        </button>
      </div>
      {/* Scrollable Modal Body */}
      <div className="p-6 space-y-6 overflow-y-auto">
        <section>
          <h4 className="text-lg font-semibold text-slate-800 mb-4">
            Contact Details
          </h4>
          <div className="space-y-4">
            <DataField
              icon={<User size={16} />}
              label="Full Name"
              value={submission.fullName}
            />
            <DataField
              icon={<Mail size={16} />}
              label="Email"
              value={submission.email}
            />
            <DataField
              icon={<Phone size={16} />}
              label="Phone"
              value={submission.phone}
            />
          </div>
        </section>
        <section className="pt-5 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">
            Project Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <DataField
              icon={<Briefcase size={16} />}
              label="Company"
              value={submission.companyName}
            />
            <DataField
              icon={<Globe size={16} />}
              label="Website"
              value={submission.website}
            />
            <DataField
              icon={<FileText size={16} />}
              label="Budget"
              value={submission.budget}
            />
            <DataField
              icon={<Calendar size={16} />}
              label="Deadline"
              value={submission.deadline}
            />
          </div>
        </section>
        <section className="pt-5 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">
            Project Description
          </h4>
          <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-md border border-slate-200 whitespace-pre-wrap">
            {submission.description || (
              <span className="text-slate-400 italic">
                Not provided
              </span>
            )}
          </p>
        </section>
        <section className="pt-5 border-t border-slate-200">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">
            Additional Info
          </h4>
          <div className="space-y-4">
            <DataField
              icon={<HelpCircle size={16} />}
              label="Referral Source"
              value={submission.referralSource}
            />
            <DataField
              icon={<Clock size={16} />}
              label="Timestamp"
              value={submission.timestamp}
            />
          </div>
        </section>
      </div>
      {/* Modal Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
        <Button
          variant="outline"
          className="bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  </div>
);

// --- Helper for Project Type Badge ---
const getProjectBadgeColor = (projectType: string | null) => {
  const type = projectType ? projectType.toLowerCase() : "";
  switch (type) {
    case "website":
      return "bg-blue-100 text-blue-800";
    case "webapp":
      return "bg-green-100 text-green-800";
    case "ai-agent":
      return "bg-purple-100 text-purple-800";
    case "mobile-app":
      return "bg-yellow-100 text-yellow-800";
    case "custom-software":
      return "bg-slate-200 text-slate-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// --- Main Dashboard Page Component ---
export const AdminDashboardPage: React.FC<
  AdminDashboardPageProps
> = ({ onNavigate }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("isAdminLoggedIn") !== "true") {
      onNavigate("Home");
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${GOOGLE_SCRIPT_URL}?key=${ADMIN_SECRET_KEY}`,
        );
        if (!response.ok)
          throw new Error("Network response was not ok");
        const result = await response.json();
        if (result.result === "success") {
          setSubmissions(result.data);
        } else {
          throw new Error(
            result.message || "Failed to fetch data",
          );
        }
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [onNavigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    onNavigate("Home");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              {isLoading
                ? "Loading..."
                : `Viewing ${submissions.length} project submissions.`}
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center text-slate-600 p-12">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span className="text-lg mt-2">
              Loading Submissions...
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-50 border border-red-300 text-red-700 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Error:</strong> {error}
            </span>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {submissions.length === 0 ? (
              <p className="p-12 text-center text-slate-500 bg-white rounded-lg border border-slate-200 shadow-sm">
                No submissions found.
              </p>
            ) : (
              // --- ORGANIZED TABLE UI ---
              <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  {/* By adding `table-fixed` and `w-full`, we tell the table to use the full width. */}
                  <table className="min-w-full w-full table-fixed">
                    {/* Table Head */}
                    <thead className="bg-slate-50">
                      <tr>
                        {/* Define widths for each column */}
                        <th className="w-[35%] px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="w-[30%] px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Project Details
                        </th>
                        <th className="w-[15%] px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="w-[20%] px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-slate-200">
                      {submissions.map((sub, index) => (
                        <tr
                          key={
                            sub.timestamp
                              ? `${sub.timestamp}-${index}`
                              : index
                          }
                          className="hover:bg-slate-50 transition-colors"
                        >
                          {/* Column 1: Contact Info */}
                          <td className="px-6 py-4 align-top">
                            <div className="text-sm font-semibold text-slate-900 truncate">
                              {sub.fullName}
                            </div>
                            <div className="text-sm text-slate-500 truncate">
                              {sub.email}
                            </div>
                            <div className="text-sm text-slate-500 truncate">
                              {sub.phone}
                            </div>
                          </td>

                          {/* Column 2: Project Details */}
                          <td className="px-6 py-4 align-top">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectBadgeColor(sub.projectType)}`}
                            >
                              {sub.projectType || "N/A"}
                            </span>
                            <div className="text-sm text-slate-500 mt-1 truncate">
                              {sub.budget}
                            </div>
                          </td>

                          {/* Column 3: Date */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 align-top">
                            {new Date(
                              sub.timestamp,
                            ).toLocaleDateString("en-IN")}
                          </td>

                          {/* Column 4: Actions */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top">
                            <Button
                              variant="outline"
                              className="bg-white text-slate-700 border-slate-300 hover:bg-slate-100 text-xs py-1 px-3"
                              onClick={() =>
                                setSelectedSubmission(sub)
                              }
                            >
                              <Eye
                                size={14}
                                className="mr-1.5"
                              />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* --- RENDER THE MODAL --- */}
      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;