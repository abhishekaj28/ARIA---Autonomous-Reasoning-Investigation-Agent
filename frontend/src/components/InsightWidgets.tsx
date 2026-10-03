import { motion } from "framer-motion";
import { Globe, Link2, Phone, Tag } from "lucide-react";

interface InsightCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  status?: "safe" | "warning" | "danger";
}

const statusColors = {
  safe: "text-success border-success/20 glow-border-green",
  warning: "text-warning border-warning/20 glow-border-purple",
  danger: "text-destructive border-destructive/20 glow-border-red",
};

const InsightCard = ({ icon: Icon, label, value, status = "safe" }: InsightCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className={`glass-panel rounded-xl p-4 border ${statusColors[status]} transition-all duration-300`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${status === "safe" ? "text-success" : status === "warning" ? "text-warning" : "text-destructive"}`} />
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-foreground mt-0.5">{value}</div>
      </div>
    </div>
  </motion.div>
);

interface InsightWidgetsProps {
  visible: boolean;
}

const InsightWidgets = ({ visible }: InsightWidgetsProps) => {
  if (!visible) return null;

  const insights = [
    { icon: Globe, label: "Domain Age", value: "3 days", status: "danger" as const },
    { icon: Link2, label: "Link Safety", value: "Malicious", status: "danger" as const },
    { icon: Phone, label: "Phone Risk", value: "Unknown", status: "warning" as const },
    { icon: Tag, label: "Category", value: "Phishing", status: "danger" as const },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {insights.map((insight, i) => (
        <InsightCard key={i} {...insight} />
      ))}
    </div>
  );
};

export default InsightWidgets;
