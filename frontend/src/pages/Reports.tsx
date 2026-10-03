import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

const reports = [
  {
    id: 1,
    preview: "\"Your account has been suspended. Click here to verify...\"",
    score: 92,
    status: "Scam" as const,
    date: "2026-03-24",
    category: "Phishing",
  },
  {
    id: 2,
    preview: "\"Congratulations! You've won a $500 Amazon gift card...\"",
    score: 88,
    status: "Scam" as const,
    date: "2026-03-23",
    category: "Prize Fraud",
  },
  {
    id: 3,
    preview: "\"Hi, this is your bank. Please confirm your OTP...\"",
    score: 75,
    status: "Suspicious" as const,
    date: "2026-03-22",
    category: "UPI Scam",
  },
  {
    id: 4,
    preview: "\"Meeting rescheduled to 3 PM. See you then.\"",
    score: 8,
    status: "Safe" as const,
    date: "2026-03-21",
    category: "Legitimate",
  },
  {
    id: 5,
    preview: "\"Urgent: Work from home opportunity, earn $5000/week...\"",
    score: 85,
    status: "Scam" as const,
    date: "2026-03-20",
    category: "Job Fraud",
  },
  {
    id: 6,
    preview: "\"Your package is being held. Pay $2.99 delivery fee...\"",
    score: 79,
    status: "Suspicious" as const,
    date: "2026-03-19",
    category: "Phishing",
  },
];

const statusConfig = {
  Safe: { icon: ShieldCheck, color: "text-success", border: "border-success/20", glow: "glow-border-green", bg: "bg-success/10" },
  Suspicious: { icon: AlertTriangle, color: "text-warning", border: "border-warning/20", glow: "glow-border-purple", bg: "bg-warning/10" },
  Scam: { icon: ShieldAlert, color: "text-destructive", border: "border-destructive/20", glow: "glow-border-red", bg: "bg-destructive/10" },
};

const Reports = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="pl-56 pt-14 min-h-screen transition-all duration-300">
        <div className="p-6 max-w-[1600px]">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold text-foreground tracking-wider">
              Investigation Reports
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {reports.map((report, i) => {
              const config = statusConfig[report.status];
              const Icon = config.icon;
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass-panel rounded-xl p-5 border ${config.border} cursor-pointer hover:${config.glow} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {report.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                  </div>

                  <p className="text-sm text-foreground/80 font-mono leading-relaxed mb-3 line-clamp-2">
                    {report.preview}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {report.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Risk:</span>
                      <span className={`font-display text-sm font-bold ${config.color}`}>
                        {report.score}/100
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
