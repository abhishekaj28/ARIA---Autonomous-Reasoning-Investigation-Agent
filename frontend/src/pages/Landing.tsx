import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CyberGrid from "@/components/CyberGrid";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <CyberGrid />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 glass-panel rounded-full px-6 py-3 glow-border-primary">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-display text-2xl font-bold text-primary glow-text-primary tracking-wider">
              ARIA
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Detect Scams</span>
          <br />
          <span className="text-primary glow-text-primary">Before They Detect You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          ARIA investigates suspicious messages like a cyber detective — analyzing threats step by step with autonomous AI reasoning.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/dashboard")}
          className="neon-button inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg tracking-wide"
        >
          Start Investigation
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { value: "99.2%", label: "Detection Rate" },
            { value: "< 3s", label: "Analysis Time" },
            { value: "50K+", label: "Threats Blocked" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-primary glow-text-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="scan-line absolute inset-0 pointer-events-none h-[200px]" />
    </div>
  );
};

export default Landing;
