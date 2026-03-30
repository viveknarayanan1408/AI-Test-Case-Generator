import type { FunctionSummary as FunctionSummaryType } from "@/types/test-generation";
import { Box, ArrowRight } from "lucide-react";

interface FunctionSummaryCardProps {
  summary: FunctionSummaryType;
}

const FunctionSummaryCard = ({ summary }: FunctionSummaryCardProps) => (
  <div className="bg-card border border-border rounded-lg p-5 animate-slide-up">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
      Function Summary
    </h3>
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Box className="w-4 h-4 text-primary" />
        <span className="font-mono text-primary font-semibold">{summary.name}</span>
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
          {summary.detectedLanguage}
        </span>
      </div>
      <p className="text-sm text-foreground/80">{summary.description}</p>
      <div className="flex flex-wrap gap-2">
        {summary.parameters.map((p, i) => (
          <span key={i} className="text-xs font-mono bg-muted px-2 py-1 rounded border border-border">
            {p.name}: <span className="text-primary">{p.type}</span>
          </span>
        ))}
        <ArrowRight className="w-4 h-4 text-muted-foreground self-center" />
        <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
          {summary.returnType}
        </span>
      </div>
    </div>
  </div>
);

export default FunctionSummaryCard;
