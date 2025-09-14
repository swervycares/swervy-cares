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
    title: "The story behind AI powered beauty recommendations",
    excerpt: "The personal journey of building an AI chat that understands makeup preferences and guides girls to their perfect self-care kit.",
    content: `Working on the AI aspect behind Swervy Cares has been such a memorable experience for me. I built an AI chat that talks with you to understand your makeup preferences based on your age and the looks you like, whether that's bold, natural, or even glam.

The idea is to support girls who might not know much about makeup but want access to these products. The AI chat guides them and redirects them to the "Request a Kit" form, making the process easy and personal. My goal is for every kit to feel tailored, whether that means including a scent tied to a favorite memory or a color that you love.

This was made with all of you in mind, and I truly hope you enjoy it.`,
    date: "July 1, 2025",
    readTime: "7 min read",
    category: "Technology",
    image: "🤖",
    featured: false
  },
  {
    id: 3,
    title: "Building Confidence, More Than Just Makeup",
    excerpt: "Coming soon- When we think about girls and women in domestic violence shelters, homeless shelters, or even schools where resources are limited, makeup and self-care products aren't usually the first things that come to mind. But the truth is, they really do matter.",
    content: `Coming soon- When we think about girls and women in domestic violence shelters, homeless shelters, or even schools where resources are limited, makeup and self-care products aren't usually the first things that come to mind. But the truth is, they really do matter. As a high school girl I can positively tell you that confidence IS powerful. Having something as simple as lip gloss with your favorite color, or a scent tied to a happy memory can make someone feel valued and cared for. 

Swervy Cares was created with that belief in mind. This reflection is about looking beyond the surface and understanding that my mission giving underserved girls the chance to feel confident in their own skin.`,
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