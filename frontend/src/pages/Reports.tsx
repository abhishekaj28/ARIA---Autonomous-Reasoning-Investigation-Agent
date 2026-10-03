import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { fetchStats } from "@/lib/api";

interface RecentInvestigation {
  id: number;
  verdict: string;
  confidence: number;
  red_flags: number;
  timestamp: string;
}

const statusConfig: Record<string, { label: string; icon: typeof ShieldCheck; color: string; border: string; bg: string }> = {
  SAFE: { label: "Safe", icon: ShieldCheck, color: "text-success", border: "border-success/20", bg: "bg-success/10" },
  SUSPICIOUS: { label: "Suspicious", icon: AlertTriangle, color: "text-warning", border: "border-warning/20", bg: "bg-warning/10" },
  SCAM: { label: "Scam", icon: ShieldAlert, color: "text-destructive", border: "border-destructive/20", bg: "bg-destructive/10" },
};

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<RecentInvestigation[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStats()
      .then((res) => setReports(res.data.recentInvestigations ?? []))
      .catch(() => setError(true));
  }, []);

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

          {error && (
            <p className="text-sm text-destructive mb-4">
              Could not reach the ARIA backend. Start it with <code>npm run dev</code> in the backend folder.
            </p>
          )}
          {!error && reports.length === 0 && (
            <p className="text-sm text-muted-foreground">No investigations yet. Run one from the Investigate page.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {reports.map((report, i) => {
              const config = statusConfig[report.verdict] ?? statusConfig.SAFE;
              const Icon = config.icon;
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass-panel rounded-xl p-5 border ${config.border} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                      <Icon className="w-3 h-3" />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {report.red_flags} red flag{report.red_flags === 1 ? "" : "s"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Risk:</span>
                      <span className={`font-display text-sm font-bold ${config.color}`}>
                        {report.confidence}/100
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
