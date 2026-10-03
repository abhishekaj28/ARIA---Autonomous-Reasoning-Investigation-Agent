import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import InvestigationPanel from "@/components/InvestigationPanel";
import AIThinkingPanel, { InvestigationStep } from "@/components/AIThinkingPanel";
import VerdictPanel, { VerdictData } from "@/components/VerdictPanel";
import InsightWidgets, { InsightData } from "@/components/InsightWidgets";
import { investigateMessage } from "@/lib/api"; 

const investigationSteps: Omit<InvestigationStep, "status">[] = [
  { id: 1, text: "Parsing message content..." },
  { id: 2, text: "Matching scam keyword patterns..." },
  { id: 3, text: "Scanning for links and suspicious domains..." },
  { id: 4, text: "Checking urgency and pressure language..." },
  { id: 5, text: "Scoring risk..." },
  { id: 6, text: "Generating threat assessment..." },
];

const Dashboard = () => {
  const [steps, setSteps] = useState<InvestigationStep[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [verdict, setVerdict] = useState<VerdictData | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [insightData, setInsightData] = useState<InsightData | null>(null);

  const runInvestigation = useCallback(async (text: string) => {
    setIsScanning(true);
    setVerdict(null);
    setShowInsights(false);
    setInsightData(null);
    setSteps([]);

    investigationSteps.forEach((step, i) => {
      setTimeout(() => {
        setSteps((prev) => [...prev, { ...step, status: "running" }]);
      }, i * 600);
      setTimeout(() => {
        setSteps((prev) =>
          prev.map((s) => (s.id === step.id ? { ...s, status: "success" } : s))
        );
      }, i * 600 + 500);
    });

    try {
      const result = await investigateMessage(text);
      const data = result.data;

      setTimeout(() => {
        setIsScanning(false);

        const riskLevel =
          data.verdictClass === "scam" ? "high-risk" :
          data.verdictClass === "warning" ? "suspicious" : "safe";

        setVerdict({
          riskLevel,
          score: data.confidence,
          reasons: data.steps.map((s: any) => s.text),
        });
        setInsightData(data);
        setShowInsights(true);
      }, investigationSteps.length * 600 + 200);

    } catch (error) {
      console.error("Investigation failed:", error);
      setIsScanning(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <DashboardHeader />
      <DashboardSidebar />

      <main className="pl-56 pt-14 min-h-screen transition-all duration-300">
        <div className="p-6 space-y-6 max-w-[1600px]">
          {/* Top section: Investigation + AI Thinking */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <InvestigationPanel onInvestigate={runInvestigation} isScanning={isScanning} />
            </div>
            <div className="lg:col-span-2">
              <AIThinkingPanel steps={steps} isActive={isScanning} />
            </div>
          </div>

          {/* Insight widgets */}
          <InsightWidgets visible={showInsights} data={insightData} />

          {/* Verdict */}
          {verdict && <VerdictPanel verdict={verdict} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
