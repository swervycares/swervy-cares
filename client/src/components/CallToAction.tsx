import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLocation } from "wouter";

export default function CallToAction() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetKitClick = () => {
    trackEvent('cta_kit_request', 'engagement', 'call_to_action');
    scrollToSection('request');
  };

  const handleVolunteerClick = () => {
    trackEvent('cta_volunteer', 'engagement', 'call_to_action');
    setLocation('/volunteer');
  };

  const handleDonateClick = () => {
    trackEvent('cta_donate', 'engagement', 'call_to_action');
    setLocation('/donate');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our mission to empower young girls with confidence, self-care, and the knowledge that they are valued and beautiful just as they are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Get a Kit */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Your Kit</h3>
            <p className="text-gray-600 mb-6">
              Use our AI chat to discover your perfect colors and request a personalized self-care kit designed just for you.
            </p>
            <Button 
              onClick={handleGetKitClick}
              className="bg-gradient-to-r from-swervy-pink to-pink-500 hover:from-pink-500 hover:to-swervy-pink text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Request My Kit
            </Button>
          </div>

          {/* Volunteer */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Volunteer</h3>
            <p className="text-gray-600 mb-6">
              Join our team and help assemble kits, reach out to communities, or support our mission in many other meaningful ways.
            </p>
            <Button 
              onClick={handleVolunteerClick}
              className="bg-gradient-to-r from-swervy-turquoise to-teal-500 hover:from-teal-500 hover:to-swervy-turquoise text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Join Our Team
            </Button>
          </div>

          {/* Donate */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Support Us</h3>
            <p className="text-gray-600 mb-6">
              Help us reach more girls by donating. Every $25 provides a complete kit that can change a young girl's confidence forever.
            </p>
            <Button 
              onClick={handleDonateClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Donate Now
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-swervy-pink to-swervy-purple rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Together, We Can Change Lives</h3>
          <p className="text-lg opacity-90">
            Every girl deserves to feel confident and beautiful. Join us in creating a world where that's possible for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}