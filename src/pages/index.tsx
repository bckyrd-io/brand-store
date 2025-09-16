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
  const [showCartNotification, setShowCartNotification] = useState(false);
  // Hide notification after 3 seconds
  const triggerCartNotification = () => {
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const slides = [
    {
      image: '/tour.png',
      title: 'Farm to Town',
      description: 'Shop fresh produce at our town depot or stay at our comfortable lodge. Experience farm connection while enjoying urban conveniences.'
    },
    {
      image: '/irrigation.jpeg',
      title: 'Farm Adventures',
      description: 'Create lasting memories with camping, playground fun, and guided farm tours. Perfect for families and nature enthusiasts.'
    },
    {
      image: '/education.png',
      title: 'Town Lodge',
      description: 'Create lasting memories with camping, playground fun, and guided farm tours. Perfect for families and nature enthusiasts.'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'Mustard',
      price: 300.99,
      image: '/mustard.jpg',
      category: 'Vegetables',
      description: 'A selection of freshly picked organic vegetables from our farm.'
    },
    {
      id: '2',
      name: 'Green pepper',
      price: 4000.99,
      image: '/pepper.jpg',
      category: 'Dairy',
      description: 'Eggs collected daily from free-range hens for maximum freshness.'
    },
    {
      id: '6',
      name: 'Tomato',
      price: 4000.99,
      image: '/bucket-tomato.jpg',
      category: 'Dairy',
      description: 'Eggs collected daily from free-range hens for maximum freshness.'
    },
    {
      id: '3',
      name: 'Papaya',
      price: 4900.99,
      image: '/papaya.jpg',
      category: 'Natural',
      description: 'Pure, raw honey harvested from our organic beehives.'
    },
    {
      id: '4',
      name: 'Banana',
      price: 200.99,
      image: '/bananas.jpg',
      category: 'Fruits',
      description: 'A basket filled with a variety of seasonal, organic fruits.'
    },
    {
      id: '5',
      name: 'Beans',
      price: 4000.99,
      image: '/Beans.jpg',
      category: 'Vegetable',
      description: 'Eggs collected daily from free-range hens for maximum freshness.'
    },
    {
      id: '7',
      name: 'Onion',
      price: 4000.99,
      image: '/onion.jpg',
      category: 'Vegetable',
      description: 'Eggs collected daily from free-range hens for maximum freshness.'
    },
  ];

  const nextSlide = (currentSlide + 1) % slides.length;

  return (
    <div className={`${spaceGrotesk.variable} font-sans`}>
      <Header />
      <main className="pt-16">
        {/* Hero Section with Enhanced Slider */}
        <section id="hero" className="pb-24">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-7xl  mx-auto space-y-8">
              {/* Cart Notification Popup */}
              {showCartNotification && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in w-[90vw] max-w-md sm:max-w-lg text-center break-words">
                  <span className="text-2xl">🛒</span>
                  <span className="flex-1">Item added! <Link href="/checkout" className="underline font-semibold">Visit your cart</Link> to continue checkout.</span>
                </div>
              )}
              {/* Peek Carousel Container */}
              <div className="relative w-full overflow-hidden rounded-2xl">
                <div className="flex lg:gap-8 md:gap-2 gap-2">
                  {/* Current Full Image */}
                  <div className="relative aspect-[1.59/1] flex-shrink-0 flex-grow-[3]">
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                  </div>

                  {/* Next Image Preview (Quarter visible) */}
                  <div
                    className="relative aspect-[1.59/1] flex-shrink-0 cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 flex-grow-[1]"
                    onClick={() => setCurrentSlide(nextSlide)}
                  >
                    <Image
                      src={slides[nextSlide].image}
                      alt={slides[nextSlide].title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </div>
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
              <div className="max-w-2xl ml-0 text-left space-y-6">
                <p className="text-gray-600 text-xl leading-relaxed max-w-xl">
                  {slides[currentSlide].description}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    className="bg-primary text-white px-4 py-2 hover:bg-primary/90 transition-colors inline-block "
                    onClick={() => {
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >Farm Shop</button>
                  <button
                    className="inline-block bg-none text-primary px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors"
                    onClick={() => {
                      const el = document.getElementById('activities');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >Take a Tour</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-gray-50">
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
                    <div className="flex flex-col items-start gap-3">
                      <span className="text-xl font-bold text-primary">MWK{product.price}</span>
                      <button
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image
                          });
                          triggerCartNotification();
                        }}
                        className="bg-primary text-white px-6 py-2 hover:bg-primary-dark transition-colors duration-300 font-medium w-full mt-1"
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

        {/* Activities Section - Fixed for Mobile Responsiveness */}
        <section id="activities" className="py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16 max-w-7xl mx-auto">
              {[
                {
                  id: '0',
                  title: "Farm Adventures",
                  short: "Experience authentic farm life with fun and learning for all ages.",
                  features: [
                    "Outdoor Camping",
                    "Guided farm tours",
                    "Seasonal fruit picking",
                    "Gardening",
                    "Animal feeding sessions"
                  ],
                  image: '/tomato.png',
                  link: '/activities#farm'
                },
                {
                  id: '1',
                  title: "Adventure Playground",
                  short: "A safe, exciting outdoor playground for kids and families.",
                  features: [
                    "Obstacle courses",
                    "Trampolines",
                    "Soccer fields"
                  ],
                  image: '/adventure.png',
                  link: '/activities#playground'
                },
                {
                  id: '2',
                  title: "Town Lodge",
                  short: "Modern lodge in town with easy access to farm and city.",
                  features: [
                    "Comfortable rooms",
                    "Urban amenities nearby",
                    "Farm shop on site",
                    "Car service to farm"
                  ],
                  image: '/lodge.jpg',
                  link: '/accommodation'
                }
              ].map((activity, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-8">
                  <div className="flex-1 flex flex-col justify-center space-y-6 order-2 lg:order-1">
                    <h3 className="text-2xl font-bold">{activity.title}</h3>
                    <p className="text-gray-700 text-base mb-2">{activity.short}</p>
                    <ul className="mb-2 space-y-1 text-gray-600 text-base">
                      {activity.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="inline-block bg-none text-primary px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors w-fit"
                    >
                      <Link href={`/reserve/${activity.id}`} className="block w-full h-full">Reserve</Link>
                    </button>
                  </div>
                  <div className="flex-1 order-1 lg:order-2">
                    <div className="relative w-full h-64 sm:h-80 lg:h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vm, 50vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-24 bg-gray-50">
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
                      src="/adventure.png"
                      alt="Permaculture Transition"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Permaculture
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Journey to Permaculture</h3>
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
                      src="/research.png"
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
                      src="/education.png"
                      alt="Educational Programs"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Tourism
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Educational Visit</h3>
                    <p className="text-gray-600 mb-6 text-lg">Training sessions for farmers, students, and researchers interested in sustainable agriculture and permaculture...</p>
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
        <section id="visit" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="flex-1">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">🚚 Delivery Service</h3>
                      <p className="text-gray-600">Free delivery within 20 miles of our town shop for orders over MWK 30,000</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🎟️ Farm Visits</h3>
                      <p className="text-gray-600">Book your farm experience in advance. Special rates for groups</p>

                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🏕️ Camping/ Events</h3>
                      <p className="text-gray-600">Seasonal camping available from August to November. Equipment rental available</p>

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