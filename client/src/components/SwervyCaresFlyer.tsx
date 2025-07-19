export default function SwervyCaresFlyer() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
      <svg
        viewBox="0 0 400 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Gradient */}
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FDF2F8', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#F3E8FF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F0FDFA', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#14B8A6', stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#DB2777', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#9333EA', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="400" height="600" fill="url(#backgroundGradient)" />

        {/* Decorative Elements */}
        {/* Hearts */}
        <g fill="#EC4899" opacity="0.3">
          <path d="M50 80 C45 75, 35 75, 35 85 C35 95, 50 110, 50 110 C50 110, 65 95, 65 85 C65 75, 55 75, 50 80 Z" />
          <path d="M320 120 C315 115, 305 115, 305 125 C305 135, 320 150, 320 150 C320 150, 335 135, 335 125 C335 115, 325 115, 320 120 Z" />
          <path d="M80 500 C75 495, 65 495, 65 505 C65 515, 80 530, 80 530 C80 530, 95 515, 95 505 C95 495, 85 495, 80 500 Z" />
          <path d="M350 480 C345 475, 335 475, 335 485 C335 495, 350 510, 350 510 C350 510, 365 495, 365 485 C365 475, 355 475, 350 480 Z" />
        </g>

        {/* Stars */}
        <g fill="#A855F7" opacity="0.4">
          <polygon points="30,150 35,160 45,160 37,167 40,177 30,170 20,177 23,167 15,160 25,160" />
          <polygon points="360,200 365,210 375,210 367,217 370,227 360,220 350,227 353,217 345,210 355,210" />
          <polygon points="70,350 75,360 85,360 77,367 80,377 70,370 60,377 63,367 55,360 65,360" />
          <polygon points="320,420 325,430 335,430 327,437 330,447 320,440 310,447 313,437 305,430 315,430" />
        </g>

        {/* Sparkles */}
        <g fill="#14B8A6" opacity="0.5">
          <circle cx="90" cy="200" r="2" />
          <circle cx="310" cy="160" r="3" />
          <circle cx="40" cy="300" r="2" />
          <circle cx="360" cy="380" r="2" />
          <circle cx="120" cy="450" r="2" />
          <circle cx="280" cy="520" r="3" />
        </g>

        {/* Header Section */}
        <rect x="0" y="30" width="400" height="100" fill="url(#headerGradient)" />
        
        {/* Title */}
        <text x="200" y="70" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="Arial, sans-serif">
          Swervy Cares
        </text>
        <text x="200" y="95" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial, sans-serif">
          Empowering girls through self-care
        </text>

        {/* Main Content */}
        <text x="200" y="180" textAnchor="middle" fill="#1F2937" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">
          ✨ Fundraiser Event ✨
        </text>

        {/* Event Details Box */}
        <rect x="40" y="200" width="320" height="180" fill="white" stroke="#EC4899" strokeWidth="2" rx="15" opacity="0.95" />
        
        <text x="200" y="230" textAnchor="middle" fill="#DB2777" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
          Sunday, July 20, 2025
        </text>
        
        <text x="200" y="255" textAnchor="middle" fill="#1F2937" fontSize="16" fontFamily="Arial, sans-serif">
          3:30 PM
        </text>
        
        <text x="200" y="280" textAnchor="middle" fill="#1F2937" fontSize="16" fontFamily="Arial, sans-serif">
          📍 Evergreen Village Square
        </text>

        <text x="200" y="320" textAnchor="middle" fill="#1F2937" fontSize="14" fontFamily="Arial, sans-serif">
          Join us for a community fundraiser
        </text>
        <text x="200" y="340" textAnchor="middle" fill="#1F2937" fontSize="14" fontFamily="Arial, sans-serif">
          to support our mission of empowering
        </text>
        <text x="200" y="360" textAnchor="middle" fill="#1F2937" fontSize="14" fontFamily="Arial, sans-serif">
          young girls through self-care kits! 💕
        </text>

        {/* Mission Statement */}
        <text x="200" y="420" textAnchor="middle" fill="#6B7280" fontSize="12" fontFamily="Arial, sans-serif">
          "Every girl deserves to feel confident and beautiful"
        </text>

        {/* Call to Action */}
        <rect x="100" y="450" width="200" height="40" fill="url(#buttonGradient)" rx="20" />
        <text x="200" y="475" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">
          Come Support Our Cause! 💖
        </text>

        {/* Contact Info */}
        <text x="200" y="520" textAnchor="middle" fill="#6B7280" fontSize="12" fontFamily="Arial, sans-serif">
          Contact: aishniragh@icloud.com
        </text>

        {/* Bottom Decorative Border */}
        <rect x="0" y="550" width="400" height="50" fill="url(#headerGradient)" opacity="0.8" />
        
        {/* Bottom Text */}
        <text x="200" y="575" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">
          Making a Difference, One Kit at a Time
        </text>
      </svg>
    </div>
  );
}