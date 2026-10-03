import { motion } from "framer-motion";
import { BarChart3, TrendingUp, ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

const stats = [
  { label: "Total Scans", value: "1,284", icon: Activity, change: "+12%" },
  { label: "Threats Detected", value: "847", icon: ShieldAlert, change: "+8%" },
  { label: "Safe Messages", value: "437", icon: ShieldCheck, change: "+15%" },
  { label: "Detection Rate", value: "99.2%", icon: TrendingUp, change: "+0.3%" },
];

const categories = [
  { name: "Phishing", count: 342, pct: 40 },
  { name: "Job Fraud", count: 198, pct: 23 },
  { name: "UPI Scam", count: 156, pct: 18 },
  { name: "Prize Fraud", count: 95, pct: 11 },
  { name: "Other", count: 56, pct: 7 },
];

const recentActivity = [
  { time: "2 min ago", text: "Phishing attempt detected — score 92/100" },
  { time: "15 min ago", text: "Safe message verified — score 8/100" },
  { time: "1 hr ago", text: "UPI scam blocked — score 85/100" },
  { time: "3 hrs ago", text: "Job fraud flagged — score 79/100" },
  { time: "5 hrs ago", text: "Suspicious link analyzed — score 67/100" },
];

const Analytics = () => {
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

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-xl p-5 border border-border hover:glow-border-primary transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-success font-semibold">{stat.change}</span>
                </div>
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl p-6 border border-border"
            >
              <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Scam Categories
              </h2>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-foreground/80">{cat.name}</span>
                      <span className="text-muted-foreground font-mono">{cat.count} ({cat.pct}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.pct}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel rounded-xl p-6 border border-border"
            >
              <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-5">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/80">{item.text}</p>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
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
