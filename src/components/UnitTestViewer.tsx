import { useState } from "react";
import type { UnitTestCode } from "@/types/test-generation";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface UnitTestViewerProps {
  unitTestCode: UnitTestCode;
}

const UnitTestViewer = ({ unitTestCode }: UnitTestViewerProps) => {
  const [tab, setTab] = useState<"jest" | "xunit">("jest");
  const [copied, setCopied] = useState(false);

  const code = tab === "jest" ? unitTestCode.jest : unitTestCode.xunit;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Test code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-slide-up">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex gap-1">
          <button
            onClick={() => setTab("jest")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              tab === "jest"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Jest (JavaScript)
          </button>
          <button
            onClick={() => setTab("xunit")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
              tab === "xunit"
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            xUnit (C#)
          </button>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs font-mono text-foreground/90 max-h-96">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default UnitTestViewer;
