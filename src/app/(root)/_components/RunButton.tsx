"use client";

import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { Loader2, Play } from "lucide-react";

function RunButton() {
  const { runCode, isRunning } = useCodeEditorStore();

  const handleRun = async () => {
    await runCode();
    getExecutionResult();
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className={`
        inline-flex items-center gap-2 px-4 py-2.5
        bg-[#1a1a24] hover:bg-[#252532]
        rounded-lg border border-gray-800/30
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-colors
      `}
    >
      {isRunning ? (
        <>
          <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          <span className="text-sm font-medium text-gray-300">
            Executing...
          </span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Run Code</span>
        </>
      )}
    </button>
  );
}

export default RunButton;
