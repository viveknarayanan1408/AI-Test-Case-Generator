import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { GenerationResult } from "@/types/test-generation";
import { toast } from "sonner";

export function useTestGeneration() {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async (input: string, inputType: "code" | "description") => {
    setIsLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-tests", {
        body: { input, inputType },
      });

      if (error) {
        toast.error(error.message || "Failed to generate test cases");
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setResult(data as GenerationResult);
      toast.success("Test cases generated successfully!");
    } catch (e) {
      toast.error("An unexpected error occurred");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, generate };
}
