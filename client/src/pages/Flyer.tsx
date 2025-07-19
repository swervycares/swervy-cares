import SwervyCaresFlyer from "@/components/SwervyCaresFlyer";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

export default function Flyer() {
  const handleDownload = () => {
    // Create a canvas to convert SVG to image for download
    const flyerElement = document.querySelector('.flyer-container svg') as SVGElement;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!flyerElement || !ctx) return;
    
    const svgData = new XMLSerializer().serializeToString(flyerElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 600;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = 'swervy-cares-flyer.png';
          link.href = URL.createObjectURL(blob);
          link.click();
        }
      });
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Swervy Cares Fundraiser',
          text: 'Join us for our fundraiser on Sunday, July 20th at 3:30 PM at Evergreen Village Square!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-purple-600 to-turquoise-600 bg-clip-text text-transparent">
            Swervy Cares Fundraiser Flyer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download and share our beautiful fundraiser flyer to help spread the word about our upcoming event!
          </p>
        </div>

        {/* Flyer Display */}
        <div className="flex justify-center mb-8">
          <div className="flyer-container">
            <SwervyCaresFlyer />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            onClick={handleDownload}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Flyer
          </Button>
          <Button 
            onClick={handleShare}
            variant="outline" 
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
          >
            <Share className="w-5 h-5 mr-2" />
            Share Event
          </Button>
        </div>

        {/* Event Details */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Event Details</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <span className="font-semibold w-20">Date:</span>
              <span>Sunday, July 20, 2025</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold w-20">Time:</span>
              <span>3:30 PM</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold w-20">Location:</span>
              <span>Evergreen Village Square</span>
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold w-20">Contact:</span>
              <span>aishniragh@icloud.com</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-turquoise-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Help Us Spread the Word!</h3>
            <p className="text-lg mb-6 opacity-90">
              Share this flyer with friends and family to help us reach more people and make a bigger impact in our community.
            </p>
            <Button 
              onClick={handleShare}
              className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Share Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}