export default function MissionSection() {
  return (
    <section id="mission" className="py-20 px-4 bg-gradient-to-br from-swervy-pale-pink to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering young girls to embrace their uniqueness, build confidence, and practice self-care through personalized beauty and wellness kits.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Founder's Story */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Founder's Story</h3>
              <div className="space-y-4 text-gray-600">
                <p className="italic">
                  "When I was younger, I often struggled with fitting into beauty standards that didn't look like me. I realized early on that confidence isn't something you find—it's something you build."
                </p>
                <p>
                  "Swervy Cares is my way of using technology and cosmetics to give girls the tools I wish I had, tools that remind them they are worthy, capable, and beautiful just as they are."
                </p>
                <p className="font-semibold text-swervy-pink">- Aishni Raghuvanshi, Founder</p>
              </div>
            </div>
          </div>

          {/* What We Believe */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🌟</div>
              <h4 className="font-bold text-gray-800 mb-2">Individuality</h4>
              <p className="text-sm text-gray-600">Every girl is unique and beautiful in her own way</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💪</div>
              <h4 className="font-bold text-gray-800 mb-2">Confidence</h4>
              <p className="text-sm text-gray-600">True beauty comes from within and grows with self-care</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💝</div>
              <h4 className="font-bold text-gray-800 mb-2">Self-Love</h4>
              <p className="text-sm text-gray-600">Taking care of yourself is an act of love</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="font-bold text-gray-800 mb-2">Community</h4>
              <p className="text-sm text-gray-600">Together we're stronger and can lift each other up</p>
            </div>
          </div>
        </div>

        {/* Impact Goals */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our 2025 Impact Goals</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-swervy-pink mb-2">500+</div>
              <p className="text-gray-700 font-semibold">Personalized Kits</p>
              <p className="text-sm text-gray-600">Delivered to girls who need them most</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-swervy-turquoise mb-2">50+</div>
              <p className="text-gray-700 font-semibold">Community Partners</p>
              <p className="text-sm text-gray-600">Schools and youth organizations</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-500 mb-2">100+</div>
              <p className="text-gray-700 font-semibold">Workshop Sessions</p>
              <p className="text-sm text-gray-600">Confidence and self-care education</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
