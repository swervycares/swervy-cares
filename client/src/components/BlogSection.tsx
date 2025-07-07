import { useState } from "react";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why I Started Swervy Cares",
    excerpt: "The personal journey that led me to create a platform for empowering young girls through self-care and confidence building.",
    content: `Hi, I'm Aishni Raghuvanshi. I wanted to take a moment to share the story behind Swervy Cares, a project that I have recently dedicated a lot of my time to kick off.

In 2019, right before the world shut down because of COVID, I started making and selling cosmetics. I built a little website, opened social media pages, and slowly started building a small community of customers. I sold handmade lip glosses and lip scrubs that I carefully packaged in fun, creative containers. I was so proud of what I made. It was more than just a hobby, it was something I truly loved.

Over time, Swervy Cosmetics started getting orders from all over the country. I even remember someone making a YouTube video reviewing the products. For three years, I ran my small business with so much passion and joy.

As I got older, I began exploring other interests, especially in AI and machine learning, and I eventually shifted my focus to those new paths. But even though my passions started to change, my love for beauty and self-care never really went away.

At the same time, something kept sticking with me. I realized that not every girl had the chance to experience the little things I was creating, like lip gloss, scrubs, or cute makeup accessories. The things that made me feel good were things some girls didn't have access to at all. These aren't necessities in life, but they do bring joy. They help you feel confident. They're small, but they matter. And for girls who are already facing hard things, not having access to even these small luxuries felt unfair.

That's what inspired me to start Swervy Cares. I wanted to create something that would give these beauty products to girls who might not be able to afford them. More importantly, I wanted these girls to know something they may not hear enough:

💗 You're beautiful. You're worthy. You deserve this.

Swervy Cares isn't just about giving away beauty products. It's about building confidence.

Whether it's through beauty kits, self-care events, or just showing up for the community, my hope is that no girl feels left out because of her situation.

This is only the beginning. I'm so grateful you're here with me.

Thank you for supporting Swervy Cares. Let's keep spreading love: one lip gloss, one care package, one girl at a time.

With love,
Aishni Raghuvanshi`,
    date: "May 15, 2025",
    readTime: "5 min read",
    category: "Founder's Story",
    image: "📝",
    featured: true
  },
  {
    id: 2,
    title: "The Science Behind AI-Powered Beauty Recommendations",
    excerpt: "How we use machine learning to understand personal style preferences and create perfectly matched recommendations for each girl.",
    content: `Working on the AI behind Swervy Cares has been one of the most meaningful things I've ever done. Whenever someone asks how our AI chat works, I genuinely love sharing the story and walking them through how carefully we built it.

It all starts with understanding three simple but important things. First, the makeup style each girl feels drawn to. Some prefer natural looks, others love bold styles, and some are all about the latest trends. Second, the colors that make them feel most confident. And third, the scents they personally love, which often connect to memories or emotions.

What makes our AI really special isn't just the technology. It's how we trained it to understand girls in a real, thoughtful way. For example, when a 12-year-old says she likes bold makeup, that can mean something completely different from what a 16-year-old might mean. The system is built to give age-appropriate recommendations every time.

The recommendation engine works with over 30 color choices and more than 16 scent options. But it's not about picking from a big list. It's about finding what truly fits each girl. If someone says she loves warm tones and sweet scents, the AI doesn't just grab random suggestions. It carefully chooses products that make sense based on the whole conversation.

One thing I'm really proud of is that the system remembers the little things. If a girl says she feels confident wearing a certain color to school, that stays in mind. It helps recommend not just the right lip gloss, but maybe also a confidence journal or a motivational sticker that speaks to her personally.

The best part? It's when I see messages from girls who say the AI really understood them. That moment makes everything worth it. It's not magic. It's care, attention, and a lot of heart behind the way we built it.`,
    date: "July 1, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "🤖",
    featured: false
  },
  {
    id: 3,
    title: "Building Confidence: More Than Just Makeup",
    excerpt: "Coming Soon - Reflections on how self-care rituals create lasting confidence and why external beauty can help nurture inner strength.",
    content: `This blog post is coming soon! Stay tuned for insights on how self-care rituals create lasting confidence and the deeper meaning behind our mission.`,
    date: "Coming Soon",
    readTime: "Coming Soon",
    category: "Reflection",
    image: "💭",
    featured: false
  },
  {
    id: 4,
    title: "The Power of Community: How Schools Are Embracing Self-Care",
    excerpt: "Coming Soon - Amazing partnerships with educators who understand that confidence and academic success go hand in hand.",
    content: `This blog post is coming soon! Stay tuned for stories about our community partnerships and how schools are embracing self-care programs.`,
    date: "Coming Soon",
    readTime: "Coming Soon",
    category: "Community",
    image: "🏫",
    featured: false
  }
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", "Personal Journey", "Technology", "Reflection", "Community"];
  
  const filteredPosts = selectedCategory && selectedCategory !== "All" 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  if (selectedPost) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-swervy-pink hover:text-pink-600 font-semibold flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </button>

          <article className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{selectedPost.image}</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>
              
              <div className="flex justify-center items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <span className="bg-swervy-pink text-white px-3 py-1 rounded-full text-sm">
                  {selectedPost.category}
                </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-swervy-pink to-swervy-purple rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Aishni Raghuvanshi</p>
                    <p className="text-gray-600">Founder, Swervy Cares</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Share your thoughts with us!</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Aishni's Journey & Reflections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personal stories, insights, and reflections from building Swervy Cares and empowering young girls through technology and self-care.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category || (selectedCategory === null && category === "All")
                  ? 'bg-swervy-pink text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105 ${
                post.featured ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{post.image}</div>
                <span className="bg-swervy-pink text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>

              <h3 className={`font-bold text-gray-800 mb-4 ${
                post.featured ? 'text-3xl' : 'text-xl'
              }`}>
                {post.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="text-swervy-pink font-semibold hover:text-pink-600">
                  Read More →
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Want to Share Your Story?</h3>
            <p className="text-gray-600 mb-6">
              If Swervy Cares has made a difference in your life, I'd love to hear about it. Your story could inspire other girls!
            </p>
            <a 
              href="mailto:aishniragh@icloud.com?subject=My Swervy Cares Story" 
              className="bg-gradient-to-r from-swervy-pink to-swervy-purple text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}