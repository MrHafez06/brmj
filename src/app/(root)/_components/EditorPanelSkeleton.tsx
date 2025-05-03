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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl blur-2xl" />
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Logo skeleton */}
            <div className="w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5 animate-pulse" />
            <div>
              {/* Title and subtitle skeletons */}
              <div className="w-24 h-4 bg-white/5 rounded mb-1" />
              <div className="w-32 h-3 bg-white/5 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font size control skeleton */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <div className="w-4 h-4 bg-white/5 rounded" />
              <div className="w-20 h-1 bg-gray-600 rounded-lg" />
              <div className="w-8 h-4 bg-white/5 rounded" />
            </div>
            {/* Refresh button skeleton */}
            <div className="w-8 h-8 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5" />
            {/* Share button skeleton */}
            <div className="w-24 h-8 bg-gradient-to-r from-blue-500/30 to-blue-600/30 rounded-lg" />
          </div>
        </div>

        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="h-[600px] bg-[#1e1e2e]/50 backdrop-blur-sm p-4">
            {/* Code line skeletons */}
            {widths.map((width, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className="w-12 h-4 bg-white/5 rounded" />
                <div className="h-4 bg-white/5 rounded" style={{ width }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-3 flex justify-end">
          <div className={`w-40 h-6 bg-white/5 rounded-lg`} />
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400/50" />
          </div>
          <div className="w-16 h-4 bg-white/5 rounded" />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] to-[#1a1a2e] rounded-xl -z-10" />
        <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl" />
              <div className="w-48 h-4 mx-auto bg-white/5 rounded" />
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
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}
