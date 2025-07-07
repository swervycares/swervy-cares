import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does the AI chat work?",
    answer: "Our AI assistant asks you questions about your makeup style, favorite colors, and scent preferences to create personalized recommendations. The AI is trained to understand beauty preferences and suggests products that match your unique style and personality."
  },
  {
    question: "What's included in each self-care kit?",
    answer: "Each kit is personalized, but typically includes: lip products (shade & scent of your choice), lashes (natural or glam), lip oil, scrubs, and additional confidence-boosting items like journals, stickers, or accessories. Every kit contains 3-4 items total."
  },
  {
    question: "What age range do you serve?",
    answer: "We serve girls ages 6-17+. Our AI adjusts recommendations based on age-appropriate products and focuses on building confidence and self-care habits rather than heavy makeup for younger girls."
  },
  {
    question: "How do I request a kit?",
    answer: "You can either chat with our AI assistant first to get personalized recommendations, or go directly to our kit request form. The AI chat helps you discover your perfect colors and scents before filling out the form."
  },
  {
    question: "Is there a cost for the kits?",
    answer: "Our kits are provided free of charge to girls who need them. We're a nonprofit organization supported by donations and volunteers. If you can afford to contribute, we welcome donations to help us reach more girls."
  },
  {
    question: "How long does delivery take?",
    answer: "We typically deliver kits within 5-7 days of receiving your request. During busy periods, it may take up to 2 weeks maximum. We'll send you updates about your kit's progress via email if you provide one."
  },
  {
    question: "Can I volunteer to help make kits?",
    answer: "Absolutely! We always need volunteers to help assemble kits, write encouraging notes, and spread awareness. Visit our Volunteer page to learn about current opportunities and how to get involved."
  },
  {
    question: "How do you ensure privacy and safety?",
    answer: "We take privacy seriously. We only collect necessary information for kit delivery and never share personal details. Our AI chat conversations are not stored permanently, and we follow strict guidelines for interacting with minors."
  },
  {
    question: "What if I don't like something in my kit?",
    answer: "While we can't replace individual items, we'd love to hear your feedback! Your input helps us improve our recommendations for future kits. You can also share what you loved most to help us help other girls."
  },
  {
    question: "How can I support Swervy Cares?",
    answer: "You can support us by donating money or supplies, volunteering your time, sharing our story on social media, or spreading the word to families who might benefit from our kits. Every bit of support helps us reach more girls!"
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our AI-powered self-care kits and how we help girls build confidence.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-swervy-pink flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-swervy-pink flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-6 text-gray-700 leading-relaxed animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Reach out through our contact form or social media.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:aishniragh@icloud.com" 
                className="bg-swervy-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-500 transition-colors"
              >
                Email Us
              </a>
              <a 
                href="#" 
                className="bg-swervy-turquoise text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-500 transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}