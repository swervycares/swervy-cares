import { useState } from "react";
import KitRequestForm from "@/components/KitRequestForm";
import AIChatWidget from "@/components/AIChatWidget";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function KitRequest() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(null);

  const handleStartAIChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleRecommendations = (recommendations: any) => {
    setAiRecommendations(recommendations);
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-swervy-blue/5">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Request Your Kit
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete the form below to request your personalized self-care kit. 
              Use our AI chat assistant if you need help choosing what's right for you!
            </p>
            
            {!isChatOpen && (
              <Button 
                onClick={handleStartAIChat}
                className="mt-6 bg-swervy-purple hover:bg-swervy-purple/90 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                💬 Get AI Recommendations
              </Button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <KitRequestForm aiSuggestions={aiRecommendations} />
          </div>
        </div>
      </div>

      {/* AI Chat Widget Overlay */}
      <AIChatWidget 
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onRecommendations={handleRecommendations}
      />

      <Footer />
    </div>
  );
}