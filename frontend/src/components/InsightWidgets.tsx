import { motion } from "framer-motion";
import { Gauge, Flag, Link2, ShieldAlert } from "lucide-react";

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

interface InvestigationStepData {
  label: string;
  text: string;
}

export interface InsightData {
  verdict: string;
  verdictClass: "scam" | "warning" | "safe" | string;
  confidence: number;
  steps: InvestigationStepData[];
}

interface InsightWidgetsProps {
  visible: boolean;
  data: InsightData | null;
}

const InsightWidgets = ({ visible, data }: InsightWidgetsProps) => {
  if (!visible || !data) return null;

  const flagsStep = data.steps.find((s) => s.label === "RED FLAGS DETECTED");
  const redFlags = !flagsStep || flagsStep.text.startsWith("No red flags")
    ? 0
    : flagsStep.text.split(" | ").length;
  const linkStep = data.steps.find((s) => s.label === "URL / CONTACT SCAN");
  const linkFound = !!linkStep && linkStep.text.startsWith("External link");

  const riskStatus =
    data.verdictClass === "scam" ? "danger" :
    data.verdictClass === "warning" ? "warning" : "safe";

  const insights = [
    { icon: ShieldAlert, label: "Verdict", value: data.verdict, status: riskStatus as InsightCardProps["status"] },
    { icon: Gauge, label: "Confidence", value: `${data.confidence}%`, status: riskStatus as InsightCardProps["status"] },
    { icon: Flag, label: "Red Flags", value: String(redFlags), status: (redFlags > 0 ? "warning" : "safe") as InsightCardProps["status"] },
    { icon: Link2, label: "Link Detected", value: linkFound ? "Yes" : "No", status: (linkFound ? "warning" : "safe") as InsightCardProps["status"] },
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
