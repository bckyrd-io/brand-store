import { useState } from 'react';
import Image from 'next/image';
import { Space_Grotesk } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images.jpg',
      title: 'Fresh from Our Fields to Your Table',
      description: 'Experience the finest organic produce, harvested daily from our sustainable farms.'
    },
    {
      image: '/images.jpg',
      title: 'Sustainable Farming Practices',
      description: 'We use eco-friendly methods to grow healthier food and protect our environment.'
    },
    {
      image: '/images.jpg',
      title: 'Visit Our Farm',
      description: 'Experience farm life firsthand with our guided tours and activities.'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'Fresh Organic Vegetables',
      price: 24.99,
      image: '/images.jpg',
      category: 'Vegetables',
      description: 'A selection of freshly picked organic vegetables from our farm.'
    },
    {
      id: '2',
      name: 'Farm Fresh Eggs',
      price: 5.99,
      image: '/images.jpg',
      category: 'Dairy',
      description: 'Eggs collected daily from free-range hens for maximum freshness.'
    },
    {
      id: '3',
      name: 'Organic Honey',
      price: 12.99,
      image: '/images.jpg',
      category: 'Natural',
      description: 'Pure, raw honey harvested from our organic beehives.'
    },
    {
      id: '4',
      name: 'Fresh Fruits Basket',
      price: 34.99,
      image: '/images.jpg',
      category: 'Fruits',
      description: 'A basket filled with a variety of seasonal, organic fruits.'
    }
  ];

  const activities = [
    {
      title: 'Farm Tours',
      description: 'Experience life on a working farm with our guided tours.',
      image: '/images.jpg',
    },
    {
      title: 'Greenhouse Visits',
      description: 'Learn about sustainable growing practices in our modern greenhouses.',
      image: '/images.jpg',
    },
    {
      title: 'Harvesting Experience',
      description: 'Join us for seasonal harvesting activities.',
      image: '/images.jpg',
    },
  ];

  const posts = [
    {
      category: 'Greenhouse',
      title: 'Advanced Hydroponic Systems',
      excerpt: 'Exploring new methods of sustainable indoor farming...',
      image: '/images.jpg',
    },
    {
      category: 'Field Crops',
      title: 'Organic Pest Management',
      excerpt: 'Natural solutions for protecting crops...',
      image: '/images.jpg',
    },
    {
      category: 'Technology',
      title: 'Smart Farming Solutions',
      excerpt: 'Implementing IoT devices for better crop monitoring...',
      image: '/images.jpg',
    },
    {
      category: 'Mechanization',
      title: 'Automated Harvesting',
      excerpt: 'Reducing labor costs while improving efficiency...',
      image: '/images.jpg',
    },
  ];

  const faqs = [
    {
      question: '🚚 Convenient Home Delivery',
      answer: 'We bring the freshness right to your doorstep! Enjoy complimentary delivery within 20 miles and flexible delivery options for your convenience.',
    },
    {
      question: '🌱 Farm-Fresh Guarantee',
      answer: 'Experience the difference of truly fresh produce! Every item is harvested at peak freshness and delivered within 24 hours to ensure the highest quality.',
    },
    {
      question: '🤝 Personal Farm Connection',
      answer: 'Connect with your food source! Join our farm tours, workshops, and seasonal events to experience sustainable farming firsthand.',
    },
    {
      question: '🌿 100% Organic Promise',
      answer: 'Rest assured with our certified organic commitment. We maintain strict sustainable practices to deliver clean, healthy produce for your family.',
    },
    {
      question: '� Premium Customer Care',
      answer: 'Your satisfaction is our priority. Our dedicated team is here to assist you with personalized service and expert product recommendations.',
    },
  ];

  return (
    <div className={`${spaceGrotesk.variable} font-sans`}>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="pt-8 pb-24">
          <div className="container mx-auto px-4">
            <div className="w-full space-y-6">
              <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="flex gap-4 px-0 py-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-6 h-6 transition-all ${
                      currentSlide === index 
                        ? 'bg-primary' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="max-w-3xl text-left">
             <p className="text-gray-600 text-lg leading-relaxed mb-8">
              we're committed to nurturing both our land and our community.
              </p>
              <div className="flex gap-4 justify-left">
                <Link href="/products"
                  className="bg-primary text-white px-8 py-3 hover:bg-primary/90 transition-colors inline-block">
                  Shop Now
                </Link>
                <button className="bg-gray-100 text-gray-900 px-8 py-3 hover:bg-gray-200 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600 text-lg">Fresh from our farms to your table</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative h-72">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-6 text-base">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      <button 
                        className="bg-primary text-white px-6 py-2 hover:bg-primary-dark transition-colors duration-300 font-medium"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Activities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Farm Activities</h2>
              <p className="text-gray-600 text-lg">Experience the farm life firsthand through our educational and engaging activities.</p>
            </div>

            <div className="space-y-8 max-w-7xl mx-auto ">
              {activities.map((activity, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-12 pb-8">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{activity.title}</h3>
                    <p className="text-gray-600 text-lg mb-8">{activity.description}</p>
                    <Link 
                      href="/activities"
                      className="inline-block bg-none text-primary px-8 py-3 border-2 border-primary hover:bg-primary hover:text-white transition-colors w-fit"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div className="flex-1 relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Farm Research & Innovation</h2>
              <p className="text-gray-600 text-lg">Discover our latest agricultural innovations and research</p>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
              {posts.map((post, index) => (
                <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-72 h-64 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 p-8">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                        {post.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{post.excerpt}</p>
                      <button className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                        Read More <span className="text-xl">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose GroundFarm</h2>
              <p className="text-gray-600 text-lg">Discover how we're committed to serving you better</p>
            </div>

            <div className="max-w-7xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
