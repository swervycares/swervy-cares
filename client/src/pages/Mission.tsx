import Header from "@/components/Header";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

export default function Mission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-rose-50/20 to-fuchsia-50/30 relative overflow-hidden">
      {/* Magical aura effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-pink-300/20 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-r from-fuchsia-300/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-fuchsia-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <MissionSection />
        <Footer />
      </div>
    </div>
  );
}