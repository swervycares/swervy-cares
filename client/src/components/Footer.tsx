import { Link } from "wouter";

export default function Footer() {

  return (
    <footer id="contact" className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-swervy-pink">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-swervy-turquoise">📧</span>
                <div>
                  <p className="font-semibold">General Inquiries</p>
                  <a href="mailto:swervycares101@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    swervycares101@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-swervy-turquoise">💝</span>
                <div>
                  <p className="font-semibold">Donations</p>
                  <a href="mailto:aishniragh@icloud.com" className="text-gray-300 hover:text-white transition-colors">
                    aishniragh@icloud.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-swervy-turquoise">📱</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:6506759847" className="text-gray-300 hover:text-white transition-colors">
                    (650) 675-9847
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-swervy-pink">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                href="/"
                className="block text-left w-full text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/mission"
                className="block text-left w-full text-gray-300 hover:text-white transition-colors"
              >
                Our Mission
              </Link>
              <Link 
                href="/volunteer"
                className="block text-left w-full text-gray-300 hover:text-white transition-colors"
              >
                Volunteer
              </Link>
              <Link 
                href="/donate"
                className="block text-left w-full text-gray-300 hover:text-white transition-colors"
              >
                Donate
              </Link>
              <Link 
                href="/share"
                className="block text-left w-full text-gray-300 hover:text-white transition-colors"
              >
                Share Our Story
              </Link>
            </div>
          </div>

          {/* Social Media & Updates */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-swervy-pink">Stay Connected</h3>
            <p className="text-gray-300 mb-6">Follow us on social media for updates and inspiration!</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => alert('Follow us @SwervyCares!')}
                className="bg-swervy-pink hover:bg-pink-500 p-3 rounded-full transition-colors"
              >
                <span className="text-white text-xl">📷</span>
              </button>
              <button 
                onClick={() => alert('Follow us on Facebook!')}
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
              >
                <span className="text-white text-xl">📘</span>
              </button>
              <button 
                onClick={() => alert('Follow us @SwervyCares!')}
                className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition-colors"
              >
                <span className="text-white text-xl">🐦</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 Swervy Cares. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
