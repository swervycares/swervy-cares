import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ShareSection() {
  const { toast } = useToast();

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent("I'm supporting Swervy Cares, a nonprofit that empowers young girls through personalized self-care kits. Every girl deserves to feel confident and valued! 💖");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent("I'm supporting @SwervyCares, a nonprofit that empowers young girls through personalized self-care kits. Every girl deserves to feel confident and valued! 💖 #SwervyCares #EmpowerGirls");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    toast({
      title: "Share on Instagram",
      description: "To share on Instagram, please visit our profile @SwervyCares and share our latest post! 📷",
    });
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `${label} copied successfully.`,
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    });
  };

  const socialMessage = "I'm supporting @SwervyCares, a nonprofit that empowers young girls through personalized self-care kits. Every girl deserves to feel confident and valued! 💖 Learn more at swervycares.org #SwervyCares #EmpowerGirls #SelfCare #Confidence";

  const emailMessage = `Subject: A Cause Close to My Heart

Hi [Name],

I wanted to share something special with you. I recently discovered Swervy Cares, a nonprofit organization that creates personalized self-care kits for young girls who need confidence and care.

Their mission really resonates with me because every girl deserves to feel valued and beautiful just as she is. They're working to reach 500 girls this year with their empowering kits.

If you're interested in learning more or supporting their mission, check out their website: swervycares.org

Thanks for taking the time to read this!

[Your name]`;

  return (
    <section id="share" className="py-20 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Share Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us reach more girls who need confidence and care by sharing our mission with your network.
          </p>
        </div>

        {/* Social Sharing Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <Button 
            onClick={shareOnFacebook}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            size="lg"
          >
            <span className="text-2xl">📘</span>
            <span>Share on Facebook</span>
          </Button>
          
          <Button 
            onClick={shareOnTwitter}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            size="lg"
          >
            <span className="text-2xl">🐦</span>
            <span>Share on Twitter</span>
          </Button>
          
          <Button 
            onClick={shareOnInstagram}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            size="lg"
          >
            <span className="text-2xl">📷</span>
            <span>Share on Instagram</span>
          </Button>
          
          <Button 
            onClick={shareOnLinkedIn}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            size="lg"
          >
            <span className="text-2xl">💼</span>
            <span>Share on LinkedIn</span>
          </Button>
        </div>

        {/* Pre-written Messages */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📱 Social Media Post</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 italic text-sm">
                {socialMessage}
              </p>
            </div>
            <Button 
              onClick={() => copyToClipboard(socialMessage, "Social media message")}
              className="bg-swervy-pink hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Copy Message
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📧 Email Template</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {emailMessage}
              </p>
            </div>
            <Button 
              onClick={() => copyToClipboard(emailMessage, "Email template")}
              className="bg-swervy-turquoise hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Copy Email
            </Button>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-swervy-pink to-swervy-turquoise rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">Share Our Impact</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="opacity-90">Kits Goal for 2025</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8-12</div>
              <p className="opacity-90">Items per Kit</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6-17</div>
              <p className="opacity-90">Age Range Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="opacity-90">Personalized Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
