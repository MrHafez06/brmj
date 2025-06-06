"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

function OutputPanel() {
  const { output, error, isRunning } = useCodeEditorStore();
  const [isCopied, setIsCopied] = useState(false);

  const hasContent = error || output;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#121218] rounded-lg border border-gray-800/30 p-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1a1a24] border border-gray-800/30">
            <Terminal className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-300">Output</h2>
            <p className="text-xs text-gray-500">Execution results</p>
          </div>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 bg-[#1a1a24] 
            rounded-lg border border-gray-800/30 hover:bg-[#252532] transition-colors"
          >
            {isCopied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Output Area */}
      <div className="rounded-lg overflow-hidden border border-gray-800/30">
        <div className="bg-[#1a1a24] p-4 h-[calc(100vh-280px)] min-h-[600px] overflow-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#252532] border border-gray-800/30 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
