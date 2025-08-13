import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, removeFromCart, updateQuantity } = useCart();
  const cartItems = items;
  const subtotal = cartItems.reduce((total: number, item: { price: number; quantity: number }) => total + (item.price * item.quantity), 0);
  // Free shipping for products, no shipping for reservations
  const hasProduct = cartItems.some((item: any) => item.type !== 'reservation');
  const hasReservation = cartItems.some((item: any) => item.type === 'reservation');
  const shipping = hasProduct ? 0 : 0;
  const total = subtotal + shipping;

  // WhatsApp checkout handler
  const handleWhatsAppCheckout = () => {
    const message = `Order from GroundFarm:%0A` +
      cartItems.map((item: any) => {
        let details = '';
        if (item.type === 'reservation' && item.details) {
          details = ` [Date: ${item.details.date}, Guests: ${item.details.people}]`;
        }
        return `- ${item.name}${details} x${item.quantity} (MWK ${item.price.toLocaleString('en-MW')})`;
      }).join('%0A') +
      `%0A--------------------%0A` +
      `Subtotal: MWK ${subtotal.toLocaleString('en-MW')}%0A` +
      (hasProduct ? `Shipping: FREE%0A` : '') +
      `Total: MWK ${total.toLocaleString('en-MW')}`;
    window.open(`https://wa.me/265885040528?text=${message}`, '_blank');
  };

  return (
    <div>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="text-gray-500 text-lg">Your cart is empty.</div>
              ) : cartItems.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center p-4 bg-white rounded-lg shadow-md mb-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-primary font-bold mt-1">
                      MWK {item.price.toLocaleString('en-MW')}
                    </p>
                    {item.type === 'reservation' && item.details && (
                      <div className="text-sm text-gray-600 mt-2 space-y-1">
                        <div>Check-in: <span className="font-medium">{item.details.checkIn}</span></div>
                        <div>Check-out: <span className="font-medium">{item.details.checkOut}</span></div>
                        <div>Guests: <span className="font-medium">{item.details.guests}</span></div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {item.type !== 'reservation' && (
                      <select
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                        className="border rounded-lg px-3 py-2"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    )}
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>MWK {subtotal.toLocaleString('en-MW')}</span>
                </div>
                {hasProduct && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>MWK {total.toLocaleString('en-MW')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
                disabled={cartItems.length === 0}
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
