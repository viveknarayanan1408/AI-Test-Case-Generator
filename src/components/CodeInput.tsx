import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, FileText, Zap } from "lucide-react";

interface CodeInputProps {
  onGenerate: (input: string, type: "code" | "description") => void;
  isLoading: boolean;
}

const CodeInput = ({ onGenerate, isLoading }: CodeInputProps) => {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<"code" | "description">("code");

  const handleGenerate = () => {
    if (!input.trim()) return;
    onGenerate(input, inputType);
  };

  return (
    <div className="space-y-4">
      {/* Input type toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setInputType("code")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            inputType === "code"
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
          }`}
        >
          <Code className="w-4 h-4" />
          Paste Code
        </button>
        <button
          onClick={() => setInputType("description")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            inputType === "description"
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80"
          }`}
        >
          <FileText className="w-4 h-4" />
          Describe Function
        </button>
      </div>

      {/* Input area */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            inputType === "code"
              ? "// Paste your code here (C#, JavaScript, Python, etc.)\nfunction add(a, b) {\n  return a + b;\n}"
              : "Describe the function you want to test...\nE.g.: A function that validates email addresses and returns true/false"
          }
          className="w-full h-64 bg-muted border border-border rounded-lg p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          spellCheck={false}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {input.length} chars
        </div>
      </div>

      {/* Generate button */}
      <Button
        onClick={handleGenerate}
        disabled={!input.trim() || isLoading}
        size="lg"
        className="w-full gap-2 font-semibold glow-primary"
      >
        <Zap className="w-4 h-4" />
        {isLoading ? "Generating Test Cases..." : "Generate Test Cases"}
      </Button>
    </div>
  );
};

export default CodeInput;
