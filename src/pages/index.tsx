import { useState } from 'react';
import Image from 'next/image';
import { Space_Grotesk } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useCart } from '../context/CartContext';


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();

  const slides = [
    {
      image: '/images.jpg',
      title: 'Welcome to Our Farm',
      description: 'A working farm that combines sustainable agriculture with family-friendly experiences. Visit our farm shop in town or join us for farm activities.'
    },
    {
      image: '/images.jpg',
      title: 'Farm Adventures',
      description: 'Create lasting memories with camping, playground fun, and guided farm tours. Perfect for families and nature enthusiasts.'
    },
    {
      image: '/images.jpg',
      title: 'Farm to Town',
      description: 'Shop fresh produce at our town depot or stay at our comfortable lodge. Experience farm connection while enjoying urban conveniences.'
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
      title: 'Town Lodge Experience',
      description: 'Stay in our modern, comfortable lodge in town with full amenities. Perfect for those who want to experience farm life while enjoying urban conveniences. Features Airbnb-style accommodations with easy access to both city attractions and farm activities.',
      image: '/images.jpg',
    },
    {
      title: 'Wild Farm Camping',
      description: 'Immerse yourself in nature with our unique farm camping experience. Sleep under the stars in the midst of our organic farm, with luxury glamping tents and eco-friendly facilities. Perfect for adventure seekers and nature lovers.',
      image: '/images.jpg',
    },
    {
      title: 'Family Adventure Playground',
      description: 'A perfect blend of fun and adventure for all ages. Featuring obstacle courses, trampolines, sand soccer fields, and extensive boardgame collection. Host your family events in our spacious, activity-filled environment.',
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
            <div className="w-full max-w-7xl mx-auto space-y-8">
              <div className="relative w-full aspect-[1.59/1] rounded-2xl overflow-hidden">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex gap-4 justify-left">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                        ? 'bg-primary w-8'
                        : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                  />
                ))}
              </div>
              <div className="max-w-2xl ml-0  text-left space-y-6">
                <p className="text-gray-600 text-xl leading-relaxed max-w-xl">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/products"
                    className="bg-primary text-white px-4 py-2 hover:bg-primary/90 transition-colors inline-block ">
                    Farm Shop
                  </Link>
                  <Link href="/reservations"
                    className="inline-block bg-none text-primary px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors">
                    Book a Visit
                  </Link>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-left mb-16">
              <h2 className="text-3xl font-bold mb-4">From Our Farm</h2>
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
                        onClick={() => addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        })}
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
            <div className="space-y-16 max-w-7xl mx-auto">
              {[
                {
                  title: "Farm Adventures",
                  description: "Experience authentic farm life with our guided tours, seasonal fruit picking, and animal feeding sessions. Perfect for families looking to connect with nature and learn about sustainable farming.",
                  image: '/images.jpg',
                  link: '/activities#farm'
                },
                {
                  title: "Adventure Playground",
                  description: "A perfect outdoor playground featuring obstacle courses, trampolines, and sand soccer fields. Host memorable family events in our spacious, activity-filled environment.",
                  image: '/images.jpg',
                  link: '/activities#playground'
                },
                {
                  title: "Town Lodge",
                  description: "Stay in our modern lodge in town with easy access to both urban amenities and farm experiences. Features comfortable rooms, farm shop, and regular shuttle service to the farm.",
                  image: '/images.jpg',
                  link: '/accommodation'
                }
              ].map((activity, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-12 pb-8">
                  <div className="flex-1 flex flex-col justify-center space-y-6">
                    <h3 className="text-2xl font-bold">{activity.title}</h3>
                    <p className="text-gray-600 text-lg">{activity.description}</p>
                    <Link
                      href={activity.link}
                      className="inline-block bg-none text-primary px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors w-fit"
                    >
                      Reserve
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
            <div className="max-w-2xl text-left mb-16">
              <h2 className="text-3xl font-bold mb-4">Research & Innovation</h2>
              <p className="text-gray-600 text-lg">Collaborating with agricultural institutions on sustainable farming practices</p>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-64 overflow-hidden">
                    <Image
                      src="/images.jpg"
                      alt="Permaculture Transition"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Permaculture
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Our Journey to Permaculture</h3>
                    <p className="text-gray-600 mb-6 text-lg">Transforming conventional farming into a sustainable ecosystem. Working with local agricultural experts to implement permaculture principles...</p>
                    <Link href="/research/permaculture" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      Learn More <span className="text-xl">→</span>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-64 overflow-hidden">
                    <Image
                      src="/images.jpg"
                      alt="Research Collaboration"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Collaboration
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Research Partnerships</h3>
                    <p className="text-gray-600 mb-6 text-lg">Partnering with government agricultural departments and research institutions to study and implement sustainable farming practices...</p>
                    <Link href="/research/partnerships" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      View Projects <span className="text-xl">→</span>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-72 h-64 overflow-hidden">
                    <Image
                      src="/images.jpg"
                      alt="Educational Programs"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Education
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Learning Center</h3>
                    <p className="text-gray-600 mb-6 text-lg">Hosting workshops and training sessions for farmers, students, and researchers interested in sustainable agriculture and permaculture...</p>
                    <Link href="/research/education" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      Join Programs <span className="text-xl">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="flex-1">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">🚚 Delivery Service</h3>
                      <p className="text-gray-600">Free delivery within 20 miles of our town shop for orders over $30</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🎟️ Farm Visits</h3>
                      <p className="text-gray-600">Book your farm experience in advance. Special rates for groups</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🏕️ Camping</h3>
                      <p className="text-gray-600">Seasonal camping available from March to October. Equipment rental available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
