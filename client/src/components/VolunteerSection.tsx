import { useState } from "react";
import { Button } from "@/components/ui/button";
import VolunteerForm from "@/components/VolunteerForm";

export default function VolunteerSection() {
  const [showForm, setShowForm] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGetStarted = () => {
    setShowForm(true);
  };

  return (
    <section id="volunteer" className="py-20 px-4 bg-gradient-to-br from-white to-teal-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Become part of our mission to empower young girls. There are many ways to get involved and make a difference.
          </p>
        </div>

        {/* Volunteer Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Kit Assembly */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-swervy-pink">
            <div className="text-4xl mb-4">🏡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Kit Assembly</h3>
            <p className="text-sm text-swervy-pink font-semibold mb-3">2-4 hours/week</p>
            <p className="text-gray-600 mb-4">Help us assemble and personalize self-care kits with love and attention to detail.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Detail-oriented individuals who love crafting</p>
          </div>

          {/* Community Outreach */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-swervy-turquoise">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community Outreach</h3>
            <p className="text-sm text-swervy-turquoise font-semibold mb-3">4-6 hours/week</p>
            <p className="text-gray-600 mb-4">Connect with schools and organizations to identify girls who would benefit from our kits.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Social, outgoing relationship builders</p>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-pink-500">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Social Media</h3>
            <p className="text-sm text-pink-500 font-semibold mb-3">2-3 hours/week</p>
            <p className="text-gray-600 mb-4">Create content and manage our social media presence to spread awareness.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Creative digital marketing enthusiasts</p>
          </div>

          {/* Workshop Facilitation */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-purple-500">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Workshop Facilitation</h3>
            <p className="text-sm text-purple-500 font-semibold mb-3">2-4 hours/month</p>
            <p className="text-gray-600 mb-4">Lead workshops on self-care, confidence building, and body positivity.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Experienced educators and speakers</p>
          </div>

          {/* Creative Design */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-orange-500">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Creative & Design</h3>
            <p className="text-sm text-orange-500 font-semibold mb-3">1-3 hours/week</p>
            <p className="text-gray-600 mb-4">Design graphics, create affirmation cards, and develop educational materials.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Designers and creative professionals</p>
          </div>

          {/* Administrative Support */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-t-4 border-green-500">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Administrative Support</h3>
            <p className="text-sm text-green-500 font-semibold mb-3">3-5 hours/week</p>
            <p className="text-gray-600 mb-4">Support operations with data entry, communication, and scheduling tasks.</p>
            <p className="text-sm text-gray-700"><strong>Perfect for:</strong> Organized, detail-oriented individuals</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-swervy-pink to-swervy-turquoise rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-xl mb-8 opacity-90">Join our community of changemakers and help empower the next generation of confident young women.</p>
          <Button 
            onClick={handleGetStarted}
            className="bg-white text-swervy-pink font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-100"
            size="lg"
          >
            Get Started Today
          </Button>
        </div>

        {/* Volunteer Form */}
        {showForm && (
          <div className="mt-16 animate-fade-in">
            <VolunteerForm />
          </div>
        )}
      </div>
    </section>
  );
}
