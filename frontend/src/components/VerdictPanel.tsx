import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

export interface VerdictData {
  riskLevel: "safe" | "suspicious" | "high-risk";
  score: number;
  reasons: string[];
}

interface VerdictPanelProps {
  verdict: VerdictData | null;
}

const riskConfig = {
  safe: {
    label: "SAFE",
    icon: ShieldCheck,
    glowClass: "glow-border-green",
    textColor: "text-success",
    bgGradient: "from-success/10 to-success/5",
    borderColor: "border-success/30",
  },
  suspicious: {
    label: "SUSPICIOUS",
    icon: AlertTriangle,
    glowClass: "glow-border-purple",
    textColor: "text-warning",
    bgGradient: "from-warning/10 to-warning/5",
    borderColor: "border-warning/30",
  },
  "high-risk": {
    label: "HIGH RISK",
    icon: ShieldAlert,
    glowClass: "glow-border-red",
    textColor: "text-destructive",
    bgGradient: "from-destructive/10 to-destructive/5",
    borderColor: "border-destructive/30",
  },
};

const VerdictPanel = ({ verdict }: VerdictPanelProps) => {
  if (!verdict) return null;

  const config = riskConfig[verdict.riskLevel];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={`glass-panel rounded-xl p-6 border ${config.borderColor} ${config.glowClass}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.bgGradient}`}>
            <Icon className={`w-7 h-7 ${config.textColor}`} />
          </div>
          <div>
            <h3 className={`font-display text-xl font-bold ${config.textColor} tracking-wider`}>
              {config.label}
            </h3>
            <p className="text-sm text-muted-foreground">Analysis Complete</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-display text-3xl font-bold ${config.textColor}`}>
            {verdict.score}
          </div>
          <div className="text-xs text-muted-foreground">/100</div>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${verdict.score}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-full rounded-full ${
            verdict.riskLevel === "safe"
              ? "bg-success"
              : verdict.riskLevel === "suspicious"
              ? "bg-warning"
              : "bg-destructive"
          }`}
        />
      </div>

      <div>
        <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Threat Indicators
        </h4>
        <ul className="space-y-2">
          {verdict.reasons.map((reason, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                verdict.riskLevel === "safe" ? "bg-success" : verdict.riskLevel === "suspicious" ? "bg-warning" : "bg-destructive"
              }`} />
              {reason}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default VerdictPanel;
