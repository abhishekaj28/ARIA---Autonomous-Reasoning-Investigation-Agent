import { Shield, Bell, Settings, User } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 glass-panel border-b border-border flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <div>
          <span className="font-display text-lg font-bold text-primary glow-text-primary tracking-wider">
            ARIA
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground ml-3">
            Autonomous Reasoning & Investigation Agent
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {[Bell, Settings, User].map((Icon, i) => (
          <button
            key={i}
            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-200"
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  );
};

export default DashboardHeader;
