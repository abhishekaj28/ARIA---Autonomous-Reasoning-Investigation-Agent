import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Eye, Moon, Globe } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

interface ToggleProps {
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  onToggle: () => void;
}

const SettingToggle = ({ label, description, icon: Icon, enabled, onToggle }: ToggleProps) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all">
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
        enabled ? "bg-primary" : "bg-muted"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-foreground transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoScan: true,
    darkMode: true,
    realTimeAlerts: false,
    advancedAnalysis: true,
    regionDetection: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="pl-56 pt-14 min-h-screen transition-all duration-300">
        <div className="p-6 max-w-3xl space-y-6">
          <h1 className="font-display text-xl font-bold text-foreground tracking-wider flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            Settings
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-xl p-6 border border-border space-y-3"
          >
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-4">
              General
            </h2>
            <SettingToggle
              label="Push Notifications"
              description="Receive alerts for detected threats"
              icon={Bell}
              enabled={settings.notifications}
              onToggle={() => toggle("notifications")}
            />
            <SettingToggle
              label="Auto-Scan"
              description="Automatically scan pasted content"
              icon={Shield}
              enabled={settings.autoScan}
              onToggle={() => toggle("autoScan")}
            />
            <SettingToggle
              label="Dark Mode"
              description="Use dark theme interface"
              icon={Moon}
              enabled={settings.darkMode}
              onToggle={() => toggle("darkMode")}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-xl p-6 border border-border space-y-3"
          >
            <h2 className="font-display text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Investigation
            </h2>
            <SettingToggle
              label="Real-Time Alerts"
              description="Show live threat notifications during scan"
              icon={Eye}
              enabled={settings.realTimeAlerts}
              onToggle={() => toggle("realTimeAlerts")}
            />
            <SettingToggle
              label="Advanced Analysis"
              description="Enable deep pattern matching and AI reasoning"
              icon={Shield}
              enabled={settings.advancedAnalysis}
              onToggle={() => toggle("advancedAnalysis")}
            />
            <SettingToggle
              label="Region Detection"
              description="Detect geographic origin of threats"
              icon={Globe}
              enabled={settings.regionDetection}
              onToggle={() => toggle("regionDetection")}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
