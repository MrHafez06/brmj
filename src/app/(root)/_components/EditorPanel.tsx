"use client";
import dynamic from "next/dynamic";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";

// Dynamically import the client-only editor panel
const EditorPanelClient = dynamic(() => import("./EditorPanelClient"), {
  ssr: false,
  loading: () => <EditorPanelSkeleton />,
});

export default function EditorPanel() {
  return <EditorPanelClient />;
}
