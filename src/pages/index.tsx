import { useState, useEffect } from 'react';
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

  const triggerCartNotification = () => {
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const slides = [
    {
      image: '/adventure.png',
      title: 'Horticulture & Farm',
      description: 'Fresh farm veggies and family playgrounds.'
    },
    {
      image: '/bed.jpg',
      title: 'Town Lodge',
      description: 'Cozy modern lodge near town stores.'
    },
    {
      image: '/braii.jpg',
      title: 'Farm Adventures',
      description: 'Our organic journey to sustainable permaculture.'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'Leaf Vegetables',
      price: 200.00,
      image: '/mustard.jpg',
      category: 'Vegetables',
      description: 'Freshly picked crisp organic greens from our farm beds.'
    },
    {
      id: '2',
      name: 'Papaya',
      price: 300.00,
      image: '/papaya.jpg',
      category: 'Fruits',
      description: 'Sweet papayas harvested fresh from the farm.'
    },
    {
      id: '3',
      name: 'Banana',
      price: 500.00,
      image: '/bananas.jpg',
      category: 'Fruits',
      description: 'A bunch of sweet, naturally grown yellow bananas.'
    },
    {
      id: '4',
      name: 'Onion',
      image: '/onion.jpg',
      category: 'Vegetables',
      description: 'Flavorful farm onions perfect for your daily cooking.',
      status: 'Off-season' // Simplified to standard text
    },
    {
      id: '5',
      name: 'Tomato',
      image: '/bucket-tomato.jpg',
      category: 'Vegetables',
      description: 'Plump, juicy red tomatoes packed fresh in local buckets.',
      status: 'Off-season' // Simplified to standard text
    },
  ];

  const nextSlide = (currentSlide + 1) % slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={`${spaceGrotesk.variable} font-sans`}>
      <Header />
      <main className="pt-16">
        {/* Hero Section with Enhanced Slider */}
        <section id="hero" className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-8">
              {/* Cart Notification Popup */}
              {showCartNotification && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in w-[90vw] max-w-md sm:max-w-lg text-center break-words">
                  <span className="text-2xl">🛒</span>
                  <span className="flex-1">Item added! <Link href="/checkout" className="underline font-semibold">Visit your cart</Link> to continue checkout.</span>
                </div>
              )}

              {/* Peek Carousel Container */}
              <div className="relative w-full overflow-hidden rounded-2xl">
                <div className="flex lg:gap-8 md:gap-4 gap-3">
                  {/* Current Full Image */}
                  <div className="relative aspect-[4/3] sm:aspect-[1.59/1] flex-shrink-0 flex-grow-[4] sm:flex-grow-[1.5]">
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                  </div>

                  {/* Next Image Preview */}
                  <div
                    className="relative aspect-[4/3] sm:aspect-[1.59/1] flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300 flex-grow-[0.8] sm:flex-grow-[1]"
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

              {/* Text Area with stabilized Heights */}
              <div className="ml-0 text-left space-y-4 md:space-y-6 min-h-[140px] sm:min-h-[auto]">
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                  <Link
                    href="/services/playground"
                    className="text-primary border border-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    #playground
                  </Link>
                  <Link
                    href="/services/garden"
                    className="text-primary border border-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    #garden
                  </Link>
                  <Link
                    href="/services/lodge"
                    className="text-primary border border-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    #lodge
                  </Link>
                </div>
                <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight sm:leading-none transition-all duration-300">
                  {slides[currentSlide].description}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 duration-300">
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
                      {product.status ? (
                        /* Off Season Display with Primary brand theme */
                        <>
                          <span className="text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                            {product.status}
                          </span>
                          <button
                            disabled
                            className="bg-gray-200 text-gray-400 cursor-not-allowed px-6 py-2 font-medium w-full mt-1"
                          >
                            Unavailable
                          </button>
                        </>
                      ) : (
                        /* Normal Active Product Display */
                        <>
                          <span className="text-xl font-bold text-primary">MWK{product.price}</span>
                          <button
                            onClick={() => {
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price!,
                                image: product.image
                              });
                              triggerCartNotification();
                            }}
                            className="bg-primary text-white px-6 py-2 hover:bg-primary-dark transition-colors duration-300 font-medium w-full mt-1"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            Add to Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-16 max-w-7xl mx-auto">
              {[
                {
                  id: '1',
                  title: "Book A Tour",
                  short: "A family-friendly escape to nature. 2km from town.",
                  features: [
                    "Trampoline & sand courts",
                    "Vegetable gardens",
                    "See our farm setup and compost system"
                  ],
                  image: '/play.webp',
                  link: '/activities#playground'
                },
                {
                  id: '2',
                  title: "Event Garden",
                  short: "Our green garden space is ready for your social gatherings.",
                  features: [
                    "Perfect for outdoor braii",
                    "Chill spots for friends and family",
                    "Relaxed country environment",
                    "Space to host functions and meetups"
                  ],
                  image: '/braii.jpg',
                  link: '/reserve/garden'
                }
              ].map((activity, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-8">
                  <div className="flex-1 flex flex-col justify-center space-y-6 order-2 lg:order-1">
                    <h3 className="text-2xl font-bold mb-2">#{activity.title}</h3>
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
                      <Link href={activity.link} className="block w-full h-full">Reserve</Link>
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
            <div className="max-w-3xl text-left mb-16">
              <h2 className="text-3xl font-bold mb-4">Working Partners</h2>
              <p className="text-gray-600 text-lg">Who we work with on the farm.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto">
              <article className="bg-white rounded-lg overflow-hidden border border-gray-200 duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src="/research.png"
                      alt="Research Collaboration"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Research
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Greenhouse & Crops</h3>
                    <p className="text-gray-600 mb-6 text-lg">We are setting up a greenhouse together with Blantyre ADD, while running trials on select crops with Bvumbwe Research.</p>
                    <Link href="/research/partnerships" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      View Projects <span className="text-xl">»</span>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-lg overflow-hidden border border-gray-200 duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src="/nursery.jpeg"
                      alt="Tree Nursery"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Environment
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Tree Seedlings Nursery</h3>
                    <p className="text-gray-600 mb-6 text-lg">We work with a local environmentalist guy who runs a beautiful seedling nursery on our farm. He recycles old milk plastic bags for the trees instead of buying plastic.</p>
                    <Link href="/research/education" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      Get trees <span className="text-xl">»</span>
                    </Link>
                  </div>
                </div>
              </article>

              <article className="bg-white rounded-lg overflow-hidden border border-gray-200 duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-80 h-64 md:h-auto shrink-0 overflow-hidden">
                    <Image
                      src="/permaculture.jpg"
                      alt="Crop Growth"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center items-start">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      Permaculture
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Improving Our Crops</h3>
                    <p className="text-gray-600 mb-6 text-lg">We talk with government agricultural extension workers to help improve our soil health and overall crop quality growth.</p>
                    <Link href="/research/permaculture" className="text-primary font-semibold hover:underline text-lg flex items-center gap-2">
                      Learn More <span className="text-xl">›</span>
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
                      <p className="text-gray-600">Free delivery within town for farm orders over MWK 200,000</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🎟️ Farm Visits</h3>
                      <p className="text-gray-600">Let us know if you are coming ahead of time so we can prepare for your visit.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">🏡 Garden Camping</h3>
                      <p className="text-gray-600">Our green garden area is ready for outdoor functions, family braii meetups, and open-air gatherings.</p>
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