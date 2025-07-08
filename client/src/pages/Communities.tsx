import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnershipShowcase from "@/components/PartnershipShowcase";
import InteractiveMap from "@/components/InteractiveMap";

export default function Communities() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Communities
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Building partnerships and reaching girls across the country
            </p>
          </div>
          
          <div className="mb-16">
            <InteractiveMap />
          </div>
          
          <PartnershipShowcase />
        </div>
      </main>
      <Footer />
    </div>
  );
}