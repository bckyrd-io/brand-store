import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          groundfarm
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
          {/* Hamburger Menu Icon */}
          <button
            className="hover:text-primary transition-colors"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={28} />
          </button>
        </div>
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white w-full h-full flex flex-col items-center" onClick={() => setMenuOpen(false)}>
            <nav
              className="bg-white w-full max-w-7xl mx-auto px-4 h-fit mt-8 rounded-2xl shadow-lg p-8 flex flex-col gap-6 animate-slide-in"
              onClick={e => e.stopPropagation()}
            >
              <button className="self-end mb-4" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <span className="text-2xl">×</span>
              </button>
              <a href="#hero" className="text-lg font-medium hover:text-primary" onClick={e => handleSmoothScroll(e, 'hero')}>🏡 Home</a>
              <a href="#products" className="text-lg font-medium hover:text-primary" onClick={e => handleSmoothScroll(e, 'products')}>🛒 From Our Farm</a>
              <a href="#activities" className="text-lg font-medium hover:text-primary" onClick={e => handleSmoothScroll(e, 'activities')}>🎉 Activities</a>
              <a href="#research" className="text-lg font-medium hover:text-primary" onClick={e => handleSmoothScroll(e, 'research')}>🔬 Research</a>
              <a href="#visit" className="text-lg font-medium hover:text-primary" onClick={e => handleSmoothScroll(e, 'visit')}>📍 Visit Us</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
