import { useState, useEffect } from "react";
import { Calendar, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";

const monthlySpotlights = [
  {
    month: "January 2025",
    featured: {
      name: "Maya Chen",
      age: 15,
      location: "San Francisco, CA",
      story: "When I first got my Swervy Cares kit, I was struggling with confidence at my new high school. The AI chat helped me find the perfect coral lip shade that matched my personality. But what really changed everything was the confidence journal included in my kit. Writing down three things I was grateful for each day helped me see my own worth. Now I'm captain of the debate team and I credit that daily self-care routine with helping me find my voice.",
      before: "Shy, struggled to speak up in class, felt invisible at new school",
      after: "Confident public speaker, debate team captain, positive self-image",
      favoriteProduct: "Coral Crush lip shade + Daily Confidence Journal",
      quote: "Swervy Cares didn't just give me makeup - it gave me a daily reminder that I'm worth taking care of.",
      image: "🌸",
      achievements: ["Debate Team Captain", "Honor Roll Student", "Peer Mentor"],
      timeframe: "6 months with Swervy Cares"
    },
    honorableMentions: [
      {
        name: "Sophia R.",
        age: 13,
        achievement: "Started a self-care club at her middle school",
        impact: "25 students now participate in weekly confidence-building activities"
      },
      {
        name: "Emma K.",
        age: 16,
        achievement: "Launched her own YouTube channel about positive self-talk",
        impact: "Over 5,000 subscribers inspired by her confidence journey"
      },
      {
        name: "Aria M.",
        age: 12,
        achievement: "Organized a kit donation drive for younger girls",
        impact: "Raised funds for 15 additional kits for her community"
      }
    ]
  },
  {
    month: "December 2024",
    featured: {
      name: "Isabella Rodriguez",
      age: 14,
      location: "Los Angeles, CA",
      story: "I received my kit during a really tough time. My parents were going through a divorce and I felt like everything was falling apart. The cotton candy scented lip balm became my comfort item - I'd apply it before tests, presentations, or whenever I felt anxious. The motivational stickers went all over my school binders, reminding me daily that I'm strong and capable. Six months later, my grades improved from C's to A's and B's, and I finally felt like myself again.",
      before: "Dealing with family stress, grades suffering, high anxiety",
      after: "Improved academic performance, developed healthy coping strategies, increased resilience",
      favoriteProduct: "Cotton Candy lip balm + Motivational sticker pack",
      quote: "During the hardest time in my life, Swervy Cares reminded me that I'm worth taking care of, even when everything else felt broken.",
      image: "💝",
      achievements: ["Honor Roll Recovery", "Student Council Member", "Anxiety Management Success"],
      timeframe: "8 months with Swervy Cares"
    },
    honorableMentions: [
      {
        name: "Jasmine T.",
        age: 15,
        achievement: "Overcame social anxiety to join drama club",
        impact: "Now starring in school musical after building confidence through daily self-care"
      },
      {
        name: "Chloe W.",
        age: 13,
        achievement: "Started mentoring younger students",
        impact: "Helping 8 sixth-graders develop positive self-image"
      }
    ]
  },
  {
    month: "November 2024",
    featured: {
      name: "Zara Patel",
      age: 16,
      location: "Phoenix, AZ",
      story: "As one of the few South Asian girls at my school, I always felt like I didn't fit traditional beauty standards. The AI chat was amazing because it actually understood what colors would work with my skin tone. Getting my personalized kit with the perfect berry lip shade and sandalwood scent made me feel seen and beautiful for the first time. I started a cultural appreciation club at school and now help other girls of color embrace their unique beauty.",
      before: "Felt excluded from beauty standards, lacked representation, low self-esteem",
      after: "Embraces cultural identity, advocates for diversity, confident leader",
      favoriteProduct: "Deep Berry lip shade + Sandalwood scented scrub",
      quote: "Swervy Cares showed me that beauty comes in all colors and cultures. Now I help other girls see that too.",
      image: "🌍",
      achievements: ["Cultural Club Founder", "Diversity Advocate", "Scholarship Recipient"],
      timeframe: "10 months with Swervy Cares"
    },
    honorableMentions: [
      {
        name: "Maria S.",
        age: 14,
        achievement: "Improved body image and self-acceptance",
        impact: "Now volunteers with body positivity programs for teens"
      },
      {
        name: "Aisha K.",
        age: 17,
        achievement: "Accepted to dream college with confidence essay",
        impact: "Credits self-care routine with helping her write authentically about her journey"
      }
    ]
  }
];

export default function SuccessSpotlight() {
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const [showFullStory, setShowFullStory] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showFullStory) {
        setCurrentSpotlight((prev) => (prev + 1) % monthlySpotlights.length);
      }
    }, 8000);
    
    return () => clearInterval(timer);
  }, [showFullStory]);

  const goToPrevious = () => {
    setCurrentSpotlight((prev) => (prev - 1 + monthlySpotlights.length) % monthlySpotlights.length);
  };

  const goToNext = () => {
    setCurrentSpotlight((prev) => (prev + 1) % monthlySpotlights.length);
  };

  const current = monthlySpotlights[currentSpotlight];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Success Story Spotlight
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every month, we celebrate the incredible transformations and achievements of girls in our community.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-swervy-pink" />
                <span className="text-lg font-semibold text-gray-800">{current.month}</span>
              </div>
              <div className="flex space-x-2">
                {monthlySpotlights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSpotlight ? 'bg-swervy-pink w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Story */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-4xl">{current.featured.image}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{current.featured.name}</h3>
                  <p className="text-gray-600">{current.featured.age} years old • {current.featured.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Story
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className={`text-gray-700 leading-relaxed ${showFullStory ? '' : 'line-clamp-4'}`}>
                  {showFullStory ? current.featured.story : current.featured.story.substring(0, 300) + "..."}
                </p>
                <button
                  onClick={() => setShowFullStory(!showFullStory)}
                  className="text-swervy-pink hover:text-pink-600 font-semibold mt-2"
                >
                  {showFullStory ? 'Read Less' : 'Read Full Story'}
                </button>
              </div>

              <div className="bg-gradient-to-r from-swervy-pink to-swervy-purple text-white rounded-xl p-6 mb-6">
                <p className="italic font-medium">"{current.featured.quote}"</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Before Swervy Cares:</h4>
                  <p className="text-gray-600 text-sm">{current.featured.before}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">After Transformation:</h4>
                  <p className="text-gray-600 text-sm">{current.featured.after}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-4">
                  {current.featured.achievements.map((achievement, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {achievement}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span><strong>Favorite Product:</strong> {current.featured.favoriteProduct}</span>
                  <span><strong>Journey:</strong> {current.featured.timeframe}</span>
                </div>
              </div>
            </div>

            {/* Honorable Mentions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                  <Heart className="w-5 h-5 text-swervy-pink mr-2" />
                  This Month's Heroes
                </h3>
                
                <div className="space-y-4">
                  {current.honorableMentions.map((mention, index) => (
                    <div key={index} className="border-l-4 border-swervy-pink pl-4">
                      <h4 className="font-semibold text-gray-800">{mention.name}, {mention.age}</h4>
                      <p className="text-sm text-gray-600 mb-1">{mention.achievement}</p>
                      <p className="text-xs text-gray-500">{mention.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Want to be Featured?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Share your Swervy Cares transformation story with us! We love celebrating the amazing achievements of girls in our community.
                </p>
                <a 
                  href="mailto:aishniragh@icloud.com?subject=My Success Story"
                  className="bg-white text-orange-500 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Share Your Story
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
                <div className="text-3xl mb-2">⭐</div>
                <h4 className="font-bold text-gray-800 mb-2">Impact This Month</h4>
                <div className="text-2xl font-bold text-swervy-pink mb-1">47</div>
                <div className="text-sm text-gray-600">Girls reached their confidence goals</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Every Girl Has a Story</h3>
            <p className="text-gray-600 mb-6">
              These transformations remind us why Swervy Cares exists. Behind every kit is a young girl discovering her worth, finding her voice, and learning to care for herself.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#kit-request"
                className="bg-gradient-to-r from-swervy-pink to-swervy-purple text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
              </a>
              <a 
                href="/volunteer"
                className="bg-white border-2 border-swervy-pink text-swervy-pink font-bold py-3 px-6 rounded-full hover:bg-swervy-pink hover:text-white transition-all duration-300"
              >
                Help Others Succeed
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}