import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuccessSpotlight from "@/components/SuccessSpotlight";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

export default function Stories() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Real stories from the amazing girls we've had the privilege to help
            </p>
          </div>
          
          <div className="mb-16">
            <SuccessSpotlight />
          </div>
          
          <TestimonialsCarousel />
        </div>
      </main>
      <Footer />
    </div>
  );
}