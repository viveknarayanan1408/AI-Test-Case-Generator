import { useState } from "react";
import type { TestCase } from "@/types/test-generation";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface TestCasesTableProps {
  testCases: TestCase[];
}

const typeColors: Record<string, string> = {
  Basic: "bg-success/15 text-success border-success/30",
  Edge: "bg-warning/15 text-warning border-warning/30",
  Negative: "bg-destructive/15 text-destructive border-destructive/30",
  Advanced: "bg-primary/15 text-primary border-primary/30",
};

const importanceColors: Record<string, string> = {
  Critical: "text-destructive",
  High: "text-warning",
  Medium: "text-foreground",
  Low: "text-muted-foreground",
};

const TestCasesTable = ({ testCases }: TestCasesTableProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? testCases : testCases.filter((tc) => tc.type === filter);

  const copyTestCase = (tc: TestCase) => {
    const text = `Test: ${tc.name}\nInput: ${tc.input}\nExpected: ${tc.expectedOutput}\nType: ${tc.type}\nWhy: ${tc.explanation}`;
    navigator.clipboard.writeText(text);
    setCopiedId(tc.id);
    toast.success("Test case copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-slide-up space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Test Cases ({filtered.length})
        </h3>
        <div className="flex gap-1">
          {["All", "Basic", "Edge", "Negative", "Advanced"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-md transition-all ${
                filter === f
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((tc) => (
          <div key={tc.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => setExpandedId(expandedId === tc.id ? null : tc.id)}
            >
              {expandedId === tc.id ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <span className="font-mono text-xs text-muted-foreground w-12">{tc.id}</span>
              <span className={`text-xs px-2 py-0.5 rounded border ${typeColors[tc.type]}`}>
                {tc.type}
              </span>
              <span className="text-sm font-medium flex-1 truncate">{tc.name}</span>
              <span className={`text-xs font-medium ${importanceColors[tc.importance]}`}>
                {tc.importance}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyTestCase(tc);
                }}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                {copiedId === tc.id ? (
                  <Check className="w-3.5 h-3.5 text-success" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
            {expandedId === tc.id && (
              <div className="px-4 pb-4 pt-1 border-t border-border space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Input</span>
                    <pre className="font-mono text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                      {tc.input}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Expected Output</span>
                    <pre className="font-mono text-xs bg-muted p-2 rounded mt-1 overflow-x-auto">
                      {tc.expectedOutput}
                    </pre>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Why this matters</span>
                  <p className="text-xs text-foreground/80 mt-1">{tc.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCasesTable;
