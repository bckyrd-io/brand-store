import Link from 'next/link';
import { ShoppingCart, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          FarmFresh
        </Link>
        
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors">
            <Search size={24} />
          </button>
                    <Link href="/cart" className="hover:text-primary transition-colors">
            <ShoppingCart size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
}
