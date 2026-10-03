import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ShieldAlert, ShieldCheck, AlertTriangle, Activity } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { fetchStats } from "@/lib/api";

interface Overview {
  total_scans: number;
  total_scams: number;
  total_suspicious: number;
  total_safe: number;
}

interface RecentInvestigation {
  id: number;
  verdict: string;
  confidence: number;
  red_flags: number;
  timestamp: string;
}

const Analytics = () => {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [recent, setRecent] = useState<RecentInvestigation[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStats()
      .then((res) => {
        setOverview(res.data.overview);
        setRecent(res.data.recentInvestigations ?? []);
      })
      .catch(() => setError(true));
  }, []);

  const total = overview?.total_scans ?? 0;
  const stats = [
    { label: "Total Scans", value: total, icon: Activity },
    { label: "Scams Detected", value: overview?.total_scams ?? 0, icon: ShieldAlert },
    { label: "Suspicious", value: overview?.total_suspicious ?? 0, icon: AlertTriangle },
    { label: "Safe Messages", value: overview?.total_safe ?? 0, icon: ShieldCheck },
  ];
  const breakdown = stats.slice(1).map((s) => ({
    name: s.label,
    count: s.value,
    pct: total > 0 ? Math.round((s.value / total) * 100) : 0,
  }));

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="pl-56 pt-14 min-h-screen transition-all duration-300">
        <div className="p-6 max-w-[1600px] space-y-6">
          <h1 className="font-display text-xl font-bold text-foreground tracking-wider flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Analytics Dashboard
          </h1>

          {error && (
            <p className="text-sm text-destructive">
              Could not reach the ARIA backend. Start it with <code>npm run dev</code> in the backend folder.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-xl p-5 border border-border hover:glow-border-primary transition-all duration-300"
              >
                <div className="mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl p-6 border border-border"
            >
              <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Verdict Breakdown
              </h2>
              <div className="space-y-4">
                {breakdown.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-foreground/80">{item.name}</span>
                      <span className="text-muted-foreground font-mono">{item.count} ({item.pct}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel rounded-xl p-6 border border-border"
            >
              <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Recent Investigations
              </h2>
              <div className="space-y-3">
                {recent.length === 0 && (
                  <p className="text-sm text-muted-foreground">No investigations yet. Run one from the Investigate page.</p>
                )}
                {recent.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/80">
                        {item.verdict} — score {item.confidence}/100, {item.red_flags} red flag{item.red_flags === 1 ? "" : "s"}
                      </p>
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
