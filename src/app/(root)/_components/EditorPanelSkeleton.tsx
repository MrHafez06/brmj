import { Terminal } from "lucide-react";
import { useMemo } from "react";

export function EditorPanelSkeleton() {
  // Precompute widths once so client & server match
  const widths = useMemo(
    () => Array.from({ length: 15 }, () => `${20 + Math.random() * 60}%`),
    []
  );

  return (
    <div className="relative">
      <div className="relative bg-[#121218] rounded-lg border border-gray-800/30 p-4">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Logo skeleton */}
            <div className="w-7 h-7 rounded-lg bg-[#1a1a24] border border-gray-800/30" />
            <div>
              {/* Title and subtitle skeletons */}
              <div className="w-24 h-4 bg-gray-800/50 rounded mb-1" />
              <div className="w-32 h-3 bg-gray-800/50 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font size control skeleton */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1a1a24] rounded-lg border border-gray-800/30">
              <div className="w-4 h-4 bg-gray-800/50 rounded" />
              <div className="w-20 h-1 bg-gray-700 rounded-lg" />
              <div className="w-8 h-4 bg-gray-800/50 rounded" />
            </div>
            {/* Refresh button skeleton */}
            <div className="w-8 h-8 bg-[#1a1a24] rounded-lg border border-gray-800/30" />
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="rounded-lg overflow-hidden border border-gray-800/30">
          <div className="h-[600px] bg-[#1a1a24] p-4">
            {/* Code line skeletons */}
            {widths.map((width, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-4 bg-gray-800/50 rounded" />
                <div className="h-4 bg-gray-800/50 rounded" style={{ width }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#121218] rounded-lg border border-gray-800/30 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1a1a24] border border-gray-800/30">
            <Terminal className="w-4 h-4 text-gray-500" />
          </div>
          <div className="w-16 h-4 bg-gray-800/50 rounded" />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="bg-[#1a1a24] border border-gray-800/30 rounded-lg p-4 h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-800/50 rounded" />
              <div className="w-48 h-4 mx-auto bg-gray-800/50 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}
