import type { GenerationResult } from "@/types/test-generation";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExportButtonsProps {
  result: GenerationResult;
}

const ExportButtons = ({ result }: ExportButtonsProps) => {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `test-cases-${result.functionSummary.name || "export"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON exported!");
  };

  const exportCSV = () => {
    const headers = "ID,Name,Input,Expected Output,Type,Importance,Explanation";
    const rows = result.testCases.map(
      (tc) =>
        `"${tc.id}","${tc.name}","${tc.input}","${tc.expectedOutput}","${tc.type}","${tc.importance}","${tc.explanation}"`
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `test-cases-${result.functionSummary.name || "export"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={exportJSON} className="gap-1.5 text-xs">
        <Download className="w-3.5 h-3.5" />
        Export JSON
      </Button>
      <Button variant="outline" size="sm" onClick={exportCSV} className="gap-1.5 text-xs">
        <Download className="w-3.5 h-3.5" />
        Export CSV
      </Button>
    </div>
  );
};

export default ExportButtons;
