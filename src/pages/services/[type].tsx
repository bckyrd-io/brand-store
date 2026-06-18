import { useRouter } from 'next/router';
import Image from 'next/image';
import { Space_Grotesk } from "next/font/google";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export type Package = {
  id: string;
  title: string;
  short: string;
  price: number;
  features: string[];
  image: string;
  link: string;
};

export type ServiceData = {
  title: string;
  description: string;
  image: string;
  packages: Package[];
};

export const servicesData: Record<string, ServiceData> = {
  "lodge": {
    "title": "Town Lodge",
    "description": "Our modern, family-friendly lodge situated right in town, near convenience stores. Just 2km from our farm, it provides the perfect escape to recharge.",
    "image": "/adventure.png",
    "packages": [
      {
        "id": "executive",
        "title": "Executive",
        "short": "Premium stay with all amenities included.",
        "price": 17000,
        "features": [
          "Luxury rooms",
          "All meals included",
          "Guided farm tours",
          "Exclusive car service"
        ],
        "image": "/bed.jpg",
        "link": "/reserve/executive"
      },
      {
        "id": "standard",
        "title": "Standard",
        "short": "Modern lodge in town near convenience stores.",
        "price": 9000,
        "features": [
          "Comfortable rooms",
          "Urban amenities nearby",
          "Family friendly atmosphere",
          "Short 2km drive to the farm"
        ],
        "image": "/bed.jpg",
        "link": "/reserve/standard"
      },
      {
        "id": "economy",
        "title": "Economy",
        "short": "Budget-friendly stay right in town.",
        "price": 6000,
        "features": [
          "Basic rooms",
          "Urban amenities nearby",
          "Proximity to farm",
          "Easy access to conveniences"
        ],
        "image": "/bed.jpg",
        "link": "/reserve/economy"
      }
    ]
  },
  "playground": {
    "title": "Farm Playground",
    "description": "A wonderful escape to nature for the family right at the farm. Enjoy our sand courts and trampolines to charge up your energy.",
    "image": "/farm_playground.jpg",
    "packages": [
      {
        "id": "teeter-totter",
        "title": "Teeter Totter",
        "short": "A safe, exciting outdoor teeter totter.",
        "price": 2500,
        "features": [
          "Safe equipment",
          "Supervision available"
        ],
        "image": "/trampoline.jpg",
        "link": "/reserve/teeter-totter"
      },
      {
        "id": "trampoline",
        "title": "Trampoline",
        "short": "Jump until your legs give out.",
        "price": 4000,
        "features": [
          "Large trampolines",
          "Safety nets"
        ],
        "image": "/play.webp",
        "link": "/reserve/trampoline"
      },
      {
        "id": "sand-court",
        "title": "Volleyball/Soccer Sand Court",
        "short": "Perfect for beach volleyball and sand soccer.",
        "price": 3000,
        "features": [
          "Quality sand imported",
          "Great for group sports"
        ],
        "image": "/farm_playground.jpg",
        "link": "/reserve/sand-court"
      }
    ]
  },
  "garden": {
    "title": "Farm & Horticulture",
    "description": "Discover our fresh vegetable production powered by our own dam and solar water pumps. See our rabbits, ducks, and our tree nursery utilizing recycled plastics.",
    "image": "/permaculture.jpg",
    "packages": [
      {
        "id": "guided-tour",
        "title": "Guided Tour",
        "short": "Learn about our permaculture and organic practices.",
        "price": 5000,
        "features": [
          "Guided walkthrough",
          "Seed tasting",
          "Farming techniques overview"
        ],
        "image": "/mustard.jpg",
        "link": "/reserve/guided-tour"
      },
      {
        "id": "self-exploration",
        "title": "Self Exploration",
        "short": "Wander through the permaculture gardens and see our compost efforts.",
        "price": 2000,
        "features": [
          "See the ducks & rabbits",
          "Explore the tree nursery"
        ],
        "image": "/onion.jpg",
        "link": "/reserve/self-exploration"
      }
    ]
  }
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function ServicePage() {
  const router = useRouter();
  const { type } = router.query;

  // If the type is not available yet or undefined
  if (!type || typeof type !== 'string') return null;

  const service = servicesData[type.toLowerCase()];

  if (!service) {
    return (
      <div className={`${spaceGrotesk.variable} font-sans`}>
        <Header />
        <main className="pt-32 min-h-screen text-center">
          <h1 className="text-4xl font-bold">Service Not Found</h1>
          <p className="mt-4"><Link href="/" className="text-primary hover:underline">Return to Home</Link></p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`${spaceGrotesk.variable} font-sans`}>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        {/* <section id="hero" className="pb-16 pt-8">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-7xl mx-auto space-y-8">


              <div className="max-w-3xl text-left space-y-4">
                <h1 className="text-5xl font-bold">{service.title}</h1>

              </div>
            </div>
          </div>
        </section> */}

        {/* Packages Section */}
        <section id="activities" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-16 max-w-7xl mx-auto">

              {service.packages.map((pkg, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-8">
                  <div className="flex-1 flex flex-col justify-center space-y-6 order-2 lg:order-1">
                    <h3 className="text-2xl font-bold mb-0">#{pkg.title}</h3>
                    <p className="text-xl font-bold mb-2 text-gray-700">MWK {pkg.price.toLocaleString('en-MW')}</p>
                    <p className="text-gray-700 text-base mb-2">{pkg.short}</p>
                    <ul className="mb-2 space-y-1 text-gray-600 text-base">
                      {pkg.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="inline-block bg-none text-primary px-4 py-2 border-2 border-primary hover:bg-primary hover:text-white transition-colors w-fit text-base font-medium"
                    >
                      <Link href={pkg.link} className="block w-full h-full">Reserve Now</Link>
                    </button>
                  </div>
                  <div className="flex-1 order-1 lg:order-2">
                    <div className="relative w-full h-64 sm:h-80 lg:h-[400px] rounded-lg overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                    </div>
                  </div>
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
