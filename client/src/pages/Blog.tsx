import BlogSection from "@/components/BlogSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Blog
            </h1>
            <p className="text-lg text-gray-600">
              Stories, insights, and updates from the Swervy Cares journey
            </p>
          </div>
          <BlogSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}