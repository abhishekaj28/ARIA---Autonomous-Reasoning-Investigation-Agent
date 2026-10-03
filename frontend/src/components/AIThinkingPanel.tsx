import { motion, AnimatePresence } from "framer-motion";
import { Brain, CheckCircle2, AlertTriangle, XCircle, Loader2 } from "lucide-react";

export interface InvestigationStep {
  id: number;
  text: string;
  status: "pending" | "running" | "success" | "warning" | "error";
}

interface AIThinkingPanelProps {
  steps: InvestigationStep[];
  isActive: boolean;
}

const statusConfig = {
  pending: { icon: Loader2, color: "text-muted-foreground", spin: false },
  running: { icon: Loader2, color: "text-primary", spin: true },
  success: { icon: CheckCircle2, color: "text-success", spin: false },
  warning: { icon: AlertTriangle, color: "text-warning", spin: false },
  error: { icon: XCircle, color: "text-destructive", spin: false },
};

const AIThinkingPanel = ({ steps, isActive }: AIThinkingPanelProps) => {
  return (
    <div className="glass-panel rounded-xl p-6 border border-border h-full">
      <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
        <Brain className={`w-4 h-4 text-accent ${isActive ? "animate-pulse" : ""}`} />
        Investigation Progress
      </h2>

      {steps.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground/50">
          <Brain className="w-10 h-10 mb-3" />
          <span className="text-sm">Awaiting investigation...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {steps.map((step, index) => {
              const config = statusConfig[step.status];
              const Icon = config.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/20"
                >
                  <Icon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color} ${config.spin ? "animate-spin" : ""}`}
                  />
                  <span className="text-sm text-foreground/80 font-mono">{step.text}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isActive && (
            <div className="flex items-center gap-1 pt-2 pl-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Progress bar */}
      {steps.length > 0 && (
        <div className="mt-5">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: isActive
                  ? `${(steps.filter((s) => s.status !== "pending" && s.status !== "running").length / steps.length) * 100}%`
                  : "100%",
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIThinkingPanel;
