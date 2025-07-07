import { useState, useEffect } from "react";

const stats = [
  { value: 500, label: "Girls Helped", suffix: "+", icon: "💝" },
  { value: 95, label: "Satisfaction Rate", suffix: "%", icon: "⭐" },
  { value: 50, label: "Communities Reached", suffix: "+", icon: "🌍" },
  { value: 1000, label: "Smiles Created", suffix: "+", icon: "😊" }
];

function CountingNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 50;
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < target) {
          return Math.min(prev + increment, target);
        }
        clearInterval(timer);
        return target;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{Math.floor(count)}{suffix}</span>;
}

export default function ImpactStats() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-swervy-pink to-swervy-purple">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact So Far</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Together, we're making a real difference in young girls' lives across communities
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountingNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/90 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-white/90">
            Every kit delivered represents a young girl who now feels more confident and valued
          </p>
        </div>
      </div>
    </section>
  );
}