import { useState } from "react";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why I Started Swervy Cares: My Personal Journey",
    excerpt: "Growing up, I struggled with fitting into beauty standards that didn't look like me. Here's how that journey led me to create something beautiful for other young girls.",
    content: `When I was younger, I often felt like I didn't fit the beauty standards I saw everywhere. The magazines, the movies, even the makeup aisles seemed designed for someone who wasn't me. I remember staring at myself in the mirror, wondering if I'd ever feel beautiful or confident.

That feeling of not belonging in traditional beauty spaces is what drove me to create Swervy Cares. I realized that confidence isn't something you find—it's something you build, one small step at a time.

The idea came to me during my junior year of college. I was studying computer science and had just learned about AI and machine learning. I thought: what if we could use technology to help girls discover their unique beauty instead of trying to fit into someone else's mold?

I started small, buying a few lip products and testing different scents with friends. The joy on their faces when they found 'their' color was incredible. That's when I knew this had to be bigger than just a hobby.

Swervy Cares isn't just about makeup—it's about giving every girl the tools and confidence I wish I had when I was younger. Every kit we send is a reminder that you are worthy, you are beautiful, and you belong exactly as you are.`,
    date: "January 5, 2025",
    readTime: "5 min read",
    category: "Personal Journey",
    image: "💝",
    featured: true
  },
  {
    id: 2,
    title: "The Science Behind AI-Powered Beauty Recommendations",
    excerpt: "How we use machine learning to understand personal style preferences and create perfectly matched recommendations for each girl.",
    content: `Building the AI behind Swervy Cares has been one of the most rewarding technical challenges of my life. When people ask how our AI chat works, I love explaining the thoughtful process behind every recommendation.

The system starts by understanding three key things: makeup style preference (natural, bold, or trendy), color preferences based on what makes someone feel confident, and scent preferences that connect to personal memories and feelings.

What makes our AI special isn't just the technology—it's the training. We've taught it to understand that a 12-year-old who says she likes "bold looks" might mean something very different than a 16-year-old. Age-appropriate recommendations are built into every response.

The recommendation engine considers over 30 different color options and 16+ scent varieties. But it's not just about variety—it's about finding the perfect match. When someone mentions they love "warm tones" and "sweet scents," the AI doesn't just pick randomly from those categories. It considers the entire conversation context.

Behind the scenes, the system maintains conversation history to build better recommendations. If someone mentions they feel confident wearing certain colors to school, that information helps personalize not just the lip shade, but also the additional items like confidence journals or motivational stickers.

The most rewarding part? Seeing messages from girls who say the AI "really understood" them. That's not magic—that's thoughtful engineering combined with genuine care for our users.`,
    date: "December 28, 2024",
    readTime: "7 min read",
    category: "Technology",
    image: "🤖",
    featured: false
  },
  {
    id: 3,
    title: "Building Confidence: More Than Just Makeup",
    excerpt: "Reflections on how self-care rituals create lasting confidence and why external beauty can help nurture inner strength.",
    content: `One question I get often is: "Isn't this just about makeup? How does that really build confidence?"

This question always makes me pause because it gets to the heart of what Swervy Cares is really about. Yes, we provide lip products and beauty items. But what we're really delivering is a ritual of self-care and a moment of feeling valued.

Think about it: when someone takes time to personalize a kit just for you, when they consider your favorite colors and scents, when they include a handwritten note saying you're amazing—that's not just about the products. That's about being seen and valued.

The confidence comes from the entire experience. It's the excitement of opening a package that was made just for you. It's looking in the mirror and thinking "I chose this color and it's perfect." It's having a daily self-care routine that reminds you to take care of yourself.

I've learned that external beauty practices can be a gateway to inner confidence. When a girl finds a lip color that makes her smile, she's more likely to speak up in class. When she has a self-care routine, she's practicing the skill of prioritizing her own well-being.

The real magic happens in the everyday moments. A 14-year-old texted us last month saying that applying her lip balm before school had become her "confidence moment"—a few seconds each morning where she reminded herself that she's beautiful and capable.

That's what we're really building: daily practices that reinforce self-worth. The makeup is just the beginning.`,
    date: "December 20, 2024",
    readTime: "6 min read",
    category: "Reflection",
    image: "💭",
    featured: false
  },
  {
    id: 4,
    title: "The Power of Community: How Schools Are Embracing Self-Care",
    excerpt: "Amazing partnerships with educators who understand that confidence and academic success go hand in hand.",
    content: `One of the most beautiful parts of this journey has been working with schools and youth organizations. Initially, I wasn't sure how educators would respond to a program that includes makeup and beauty products.

I was amazed by the response. Teachers and counselors immediately understood what we were really offering: tools for building self-esteem and personal care habits that support overall well-being.

Ms. Rodriguez, a middle school counselor in San Jose, told me something that stuck with me: "We teach kids about nutrition for their bodies and study skills for their minds. Why wouldn't we teach them how to care for their emotional well-being too?"

The school partnerships have taught me so much about the different challenges girls face. In some communities, access to basic personal care items is a real issue. In others, it's about having positive role models or learning that self-care isn't selfish.

What's consistently amazing is watching girls support each other. During our workshop sessions, older students naturally mentor younger ones, sharing not just makeup tips but genuine encouragement. These connections often continue long after our visit.

The feedback from educators has shaped our approach too. They've helped us understand how to make our materials age-appropriate, culturally sensitive, and aligned with school wellness programs.

Seeing Swervy Cares become part of broader wellness initiatives in schools reminds me that we're not just delivering products—we're contributing to environments where girls can thrive.`,
    date: "December 15, 2024",
    readTime: "5 min read",
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