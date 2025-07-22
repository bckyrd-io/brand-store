import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          GroundFarm
        </Link>
        
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Search size={24} />
          </button>
          <Link href="/cart" className="hover:text-primary transition-colors relative">
            <ShoppingCart size={24} />
            <span className={`absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${
              cartCount > 0 ? 'bg-primary' : 'bg-gray-400'
            }`}>
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
