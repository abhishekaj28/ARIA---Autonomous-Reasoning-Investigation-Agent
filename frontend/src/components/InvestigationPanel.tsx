import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Upload, Mic } from "lucide-react";

interface InvestigationPanelProps {
  onInvestigate: (text: string) => void;
  isScanning: boolean;
}

const InvestigationPanel = ({ onInvestigate, isScanning }: InvestigationPanelProps) => {
  const [input, setInput] = useState("");

  return (
    <div className="glass-panel rounded-xl p-6 border border-border relative overflow-hidden">
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-2 rounded-full border border-primary/10" />
                <div className="absolute inset-4 rounded-full border border-primary/5" />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, hsl(226 100% 67% / 0.3) 60deg, transparent 120deg)",
                    animation: "radar-sweep 2s linear infinite",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
              <span className="font-display text-sm text-primary tracking-widest uppercase">
                Scanning...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <Search className="w-4 h-4 text-primary" />
        Investigation Input
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste suspicious message, link, or scam here..."
        className="w-full h-32 bg-muted/30 border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-mono text-sm"
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          disabled
          title="Coming soon"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground opacity-50 cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          Upload Screenshot (coming soon)
        </button>
        <button
          disabled
          title="Coming soon"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground opacity-50 cursor-not-allowed"
        >
          <Mic className="w-4 h-4" />
          Voice Input (coming soon)
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => input.trim() && onInvestigate(input)}
          disabled={!input.trim() || isScanning}
          className="ml-auto flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display text-sm font-semibold tracking-wide neon-button disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4" />
          Investigate
        </motion.button>
      </div>
    </div>
  );
};

export default InvestigationPanel;
