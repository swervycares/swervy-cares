import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

interface HeroSectionProps {
  onStartAIChat?: () => void;
}

export default function HeroSection({ onStartAIChat }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient and patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-swervy-pale-pink via-white to-teal-100 opacity-70"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="absolute top-10 left-10 w-32 h-32 text-swervy-pink opacity-10" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40"/>
        </svg>
        <svg className="absolute bottom-10 right-10 w-24 h-24 text-swervy-turquoise opacity-10" fill="currentColor" viewBox="0 0 100 100">
          <polygon points="50,15 85,85 15,85"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Building Confidence,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-swervy-pink to-swervy-turquoise">
              {" "}One Kit at a Time
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover your perfect self-care kit with our AI-powered personalization. 
            Every girl deserves to feel confident, valued, and empowered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={onStartAIChat}
              className="bg-gradient-to-r from-swervy-pink to-pink-500 hover:from-pink-500 hover:to-swervy-pink text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              🤖 Start AI Chat
            </Button>
            <Button 
              onClick={() => scrollToSection('request')}
              variant="outline"
              className="border-2 border-swervy-turquoise text-swervy-turquoise hover:bg-swervy-turquoise hover:text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              size="lg"
            >
              Request Your Kit
            </Button>
          </div>

          {/* AI Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-slide-up">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI Color Matching</h3>
              <p className="text-gray-600">Our AI analyzes your preferences to recommend perfect lip shades and scents</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Conversations</h3>
              <p className="text-gray-600">Chat naturally about your style and let AI understand your unique preferences</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Personalized Magic</h3>
              <p className="text-gray-600">Get kit recommendations tailored specifically to boost your confidence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
