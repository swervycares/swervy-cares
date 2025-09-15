import { useState } from "react";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why I Started Swervy Cares",
    excerpt: "The personal journey that led me to create a platform for empowering young girls through self-care and confidence building.",
    content: `Growing up, I was always obsessed with cosmetics like lip gloss, lip scrubs, and even lashes. These little things brought me so much joy. I'd spend hours playing dress-up, experimenting with the eyeshadow palettes my mom would bring home for me. Those simple moments made my childhood magical.

As I entered my teen years, makeup continues to become vital for me in terms of having fun and it became a way for me to express myself and build confidence. I saw first hand how beauty could empower.

But as I got older, I also became more aware of the girls and women who don't have access to that same joy. There are so many in domestic violence shelters, foster homes, and low-income schools. While people often remember to provide essentials like food and hygiene, we sometimes forget that they, too, appreciate beauty, and deserve to feel seen, celebrated, and confident.

That's why I started Swervy cares: to bring personalized beauty kits to girls who need more than just survival. They need joy. They need hope. They need to feel beautiful.

And we can give them that, one kit at a time.`,
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

            <div className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${
              selectedPost.id === 1 ? 'founder-story-font' : ''
            }`}>
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