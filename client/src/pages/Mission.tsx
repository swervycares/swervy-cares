import Header from "@/components/Header";
import MissionSection from "@/components/MissionSection";
import Footer from "@/components/Footer";

export default function Mission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Beautiful pink-purple-blue aura effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-3xl animate-aura-float"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-r from-purple-400/40 to-blue-500/40 rounded-full blur-3xl animate-aura-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-300/35 to-pink-400/35 rounded-full blur-3xl animate-aura-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-purple-400/30 rounded-full blur-2xl animate-aura-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-purple-300/25 to-blue-400/25 rounded-full blur-2xl animate-aura-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <MissionSection />
        <Footer />
      </div>
    </div>
  );
}