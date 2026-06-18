import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

import { servicesData, Package } from '../services/[type]';

export default function ReservePage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  // Find the exact package by looping through all service categories in servicesData
  let pkg: Package | null = null;
  if (id) {
    for (const serviceKey in servicesData) {
      const found = servicesData[serviceKey].packages.find(p => p.id === id);
      if (found) {
        pkg = found;
        break;
      }
    }
  }

  // Fallback to the first package of the first service if not found
  if (!pkg) {
    pkg = servicesData['lodge'].packages[0];
  }

  const activity = {
    id: pkg.id,
    name: pkg.title,
    images: [pkg.image],
    basePrice: pkg.price || 0,
    description: pkg.short || ''
  };
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState('');

  // Calculate nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (Number(outDate) - Number(inDate)) / (1000 * 60 * 60 * 24);
    // Allow same-day check-in/check-out (minimum 1 for price purposes)
    return diff >= 0 ? diff + 1 : 0;
  };
  const nights = getNights();
  // Calculate reservation cost for checkout
  const price = activity.basePrice * (nights > 0 ? nights : 1) * guests;

  const handleContinue = () => {
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    if (nights < 1) {
      setError('Check-out must be after check-in.');
      return;
    }
    addToCart({
      id: `reservation-${activity.id}-${checkIn}-${checkOut}-${guests}`,
      name: `${activity.name} Reservation`,
      price,
      image: activity.images[0],
      details: { checkIn, checkOut, guests },
      type: 'reservation',
    });
    router.push('/checkout');
  };

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 pb-16 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 mt-8 p-0 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Gallery on the left, scrollable on mobile, larger on desktop, square images */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-gray-100 order-1 lg:order-1">
              <div className="w-full flex flex-col items-center gap-4">
                {activity.images.map((img, idx) => (
                  <div key={idx} className="w-full max-w-xs aspect-square relative rounded-2xl overflow-hidden" style={{minWidth:'220px',minHeight:'220px',width:'100%',height:'auto'}}>
                    <Image src={img} alt={activity.name + ' photo ' + (idx + 1)} fill className="object-cover object-center" priority={idx === 0} />
                  </div>
                ))}
              </div>
            </div>
            {/* Form on the right */}
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center order-2 lg:order-2">
              <form onSubmit={e => { e.preventDefault(); handleContinue(); }} className="space-y-6">
                <h1 className="text-2xl font-bold mb-2 text-center lg:text-left">{activity.name}</h1>
                {/* Show base price, with promo/strike-through logic if needed */}
                <div className="mb-2">
                  <span className="text-xl font-bold text-primary">MWK{activity.basePrice.toLocaleString('en-MW')}</span>
                  {/* Example for promo: <span className=\"text-base text-gray-400 line-through ml-2\">MWK{oldPrice}</span> */}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Check-in</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-lg mb-4" required />
                  <label className="block font-semibold mb-1">Check-out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="w-full border rounded-lg px-4 py-3 text-lg" required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Guests</label>
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-3 py-1 rounded bg-gray-200 text-lg" onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                    <input type="number" min={1} value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-16 border rounded-lg px-3 py-2 text-center text-lg" required />
                    <button type="button" className="px-3 py-1 rounded bg-gray-200 text-lg" onClick={() => setGuests(guests + 1)}>+</button>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold shadow-sm">Continue</button>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
