import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="h-screen w-full overscroll-none overflow-hidden">
      <div className="min-h-screen bg-[#0a0a10] flex flex-col">
        <div className="max-w-[1800px] mx-auto w-full flex-1 flex flex-col p-4">
          <Header />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
            <EditorPanel />
            <OutputPanel />
          </div>

          <Footer />
        </div>
      </div>
    </main>
  );
}
