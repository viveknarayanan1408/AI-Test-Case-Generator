import type { Risk } from "@/types/test-generation";
import { AlertTriangle, Shield } from "lucide-react";

interface CoverageAndRisksProps {
  coverageScore: number;
  missingScenarios: string[];
  topRisks: Risk[];
}

const severityColors: Record<string, string> = {
  High: "text-destructive",
  Medium: "text-warning",
  Low: "text-muted-foreground",
};

const CoverageAndRisks = ({ coverageScore, missingScenarios, topRisks }: CoverageAndRisksProps) => {
  const scoreColor =
    coverageScore >= 80 ? "text-success" : coverageScore >= 50 ? "text-warning" : "text-destructive";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
      {/* Coverage Score */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Test Coverage Score
        </h3>
        <div className="flex items-end gap-3 mb-4">
          <span className={`text-5xl font-bold font-mono ${scoreColor}`}>{coverageScore}</span>
          <span className="text-muted-foreground text-lg mb-1">/ 100</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              coverageScore >= 80
                ? "bg-success"
                : coverageScore >= 50
                ? "bg-warning"
                : "bg-destructive"
            }`}
            style={{ width: `${coverageScore}%` }}
          />
        </div>
        {missingScenarios.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">Missing scenarios:</p>
            <ul className="space-y-1">
              {missingScenarios.map((s, i) => (
                <li key={i} className="text-xs text-warning/80 flex items-start gap-1.5">
                  <span className="text-warning mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Top Risks */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          Top Risks
        </h3>
        <div className="space-y-4">
          {topRisks.map((risk, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${severityColors[risk.severity]}`}>
                  {risk.severity}
                </span>
                <span className="text-sm font-medium">{risk.risk}</span>
              </div>
              <div className="flex items-start gap-1.5 ml-0.5">
                <Shield className="w-3 h-3 text-success mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground">{risk.mitigation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverageAndRisks;
