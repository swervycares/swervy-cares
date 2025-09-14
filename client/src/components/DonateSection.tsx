import { Button } from "@/components/ui/button";

export default function DonateSection() {
  const openPayPalDonation = (amount?: number) => {
    const paypalUrl = amount 
      ? `https://www.paypal.com/paypalme/swervycares/${amount}`
      : 'https://www.paypal.com/paypalme/swervycares';
    window.open(paypalUrl, '_blank');
  };
  return (
    <section id="donate" className="py-20 px-4 bg-gradient-to-br from-swervy-pale-pink to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Support Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your generous support helps us create more self-care kits and reach more girls who need confidence and care.
          </p>
        </div>

        {/* Donation Impact Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl font-bold text-swervy-pink mb-4">$10</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Starter Kit</h3>
            <p className="text-gray-600 mb-6">Basic self-care items including lip balm, affirmation cards, and a personalized note.</p>
            <Button 
              onClick={() => openPayPalDonation(10)}
              className="bg-swervy-pink hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Donate $10
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border-2 border-swervy-pink">
            <div className="bg-swervy-pink text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">Most Popular</div>
            <div className="text-4xl font-bold text-swervy-pink mb-4">$30</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">3 Kits</h3>
            <p className="text-gray-600 mb-6">Three complete starter kits to help three different girls feel confident and cared for.</p>
            <Button 
              onClick={() => openPayPalDonation(30)}
              className="bg-swervy-pink hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Donate $30
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl font-bold text-swervy-pink mb-4">$55</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Deluxe Kit</h3>
            <p className="text-gray-600 mb-6">Help out 5 people with premium self-care kits including enhanced products and personalized touches.</p>
            <Button 
              onClick={() => openPayPalDonation(55)}
              className="bg-swervy-pink hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Donate $55
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl font-bold text-swervy-turquoise mb-4">$100</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Classroom Impact</h3>
            <p className="text-gray-600 mb-6">Four complete kits or workshop program for an entire classroom of girls.</p>
            <Button 
              onClick={() => openPayPalDonation(100)}
              className="bg-swervy-turquoise hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Donate $100
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl font-bold text-purple-500 mb-4">$250</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reach Dozens of Girls/Women</h3>
            <p className="text-gray-600 mb-6">Community impact program reaching dozens of girls and women with workshops and kits.</p>
            <Button 
              onClick={() => openPayPalDonation(250)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Donate $250
            </Button>
          </div>

          <div className="bg-gradient-to-br from-swervy-pink to-swervy-turquoise rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center text-white">
            <div className="text-4xl font-bold mb-4">💝</div>
            <h3 className="text-xl font-bold mb-2">Custom Amount</h3>
            <p className="mb-6 opacity-90">Every dollar helps us reach more girls and create more opportunities for confidence building.</p>
            <Button 
              onClick={() => openPayPalDonation()}
              className="bg-white text-swervy-pink font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Choose Amount
            </Button>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">How Your Donation Helps</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-swervy-pink rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">70%</div>
              <h4 className="font-bold text-gray-800 mb-2">Direct Program Costs</h4>
              <p className="text-gray-600">Kit contents, packaging, and shipping directly to girls</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-swervy-turquoise rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">20%</div>
              <h4 className="font-bold text-gray-800 mb-2">Operations</h4>
              <p className="text-gray-600">Website, communications, and administrative costs</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">10%</div>
              <h4 className="font-bold text-gray-800 mb-2">Growth & Development</h4>
              <p className="text-gray-600">Expanding our reach and developing new programs</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-8 italic">
            Swervy Cares is a registered 501(c)(3) non-profit organization. Your donation may be tax-deductible.
          </p>
        </div>
      </div>
    </section>
  );
}
