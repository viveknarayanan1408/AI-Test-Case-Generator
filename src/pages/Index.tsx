import { FlaskConical, Terminal } from "lucide-react";
import CodeInput from "@/components/CodeInput";
import FunctionSummaryCard from "@/components/FunctionSummaryCard";
import TestCasesTable from "@/components/TestCasesTable";
import CoverageAndRisks from "@/components/CoverageAndRisks";
import UnitTestViewer from "@/components/UnitTestViewer";
import ExportButtons from "@/components/ExportButtons";
import LoadingState from "@/components/LoadingState";
import { useTestGeneration } from "@/hooks/use-test-generation";

const Index = () => {
  const { result, isLoading, generate } = useTestGeneration();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-5xl py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                AI Test Case Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive test cases from code or descriptions
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-8 space-y-8">
        {/* Input Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Input
            </h2>
          </div>
          <CodeInput onGenerate={generate} isLoading={isLoading} />
        </section>

        {/* Results */}
        {isLoading && <LoadingState />}

        {result && !isLoading && (
          <div className="space-y-6">
            {/* Export + Summary */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Results
              </h2>
              <ExportButtons result={result} />
            </div>

            <FunctionSummaryCard summary={result.functionSummary} />

            <CoverageAndRisks
              coverageScore={result.coverageScore}
              missingScenarios={result.missingScenarios}
              topRisks={result.topRisks}
            />

            <TestCasesTable testCases={result.testCases} />

            {result.unitTestCode && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Generated Unit Tests
                </h3>
                <UnitTestViewer unitTestCode={result.unitTestCode} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
