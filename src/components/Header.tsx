import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<{ text: string, id: string }[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Collect all text nodes with ids for search
  const getAllSearchableNodes = () => {
    const results: { text: string, id: string }[] = [];
    // Search all elements with id
    document.querySelectorAll('[id]').forEach(el => {
      const id = el.id;
      // Get visible text content
      let text = '';
      // Try to get heading or section title
      if (el instanceof HTMLElement) {
        text = el.innerText || el.textContent || '';
      }
      if (text.trim().length > 0) {
        results.push({ text: text.trim(), id });
      }
    });
    // Also search all product/activity/article titles
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, article, section, p, span, li').forEach(el => {
      const text = el.textContent || '';
      if (text.trim().length > 0 && el.id) {
        results.push({ text: text.trim(), id: el.id });
      }
    });
    return results;
  };

  // Real-time search effect
  useEffect(() => {
    if (!searchOpen) return;
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      return;
    }
    const allNodes = getAllSearchableNodes();
    // Remove duplicates by id
    const uniqueNodes = Array.from(new Map(allNodes.map(item => [item.id, item])).values());
    const filtered = uniqueNodes.filter(item => item.text.toLowerCase().includes(query));
    setSearchResults(filtered.slice(0, 10)); // limit to 10 results
  }, [searchValue, searchOpen]);

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close search on ESC
  React.useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  // Define the sections menu
  const sectionMap = [
    { id: 'about', label: 'About', emoji: '🏠' },
    { id: 'products', label: 'Shop', emoji: '🧺' },
    { id: 'lodge', label: 'Lodge', emoji: '🛏️' },
    { id: 'contact', label: 'Contact', emoji: '📞' },
    // Add more sections as needed
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" id='logo' className="flex text-primary font-bold items-center">
          <Image
            src="/favicon.ico"
            alt="Balaza.Farm Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span>ground farm</span>
        </Link>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors" aria-label="Open search" onClick={() => setSearchOpen(true)}>
            <Search size={24} />
          </button>
          <Link href="/checkout" className="hover:text-primary transition-colors relative">
            <ShoppingCart size={24} />
            <span className={`absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ${cartCount > 0 ? 'bg-primary' : 'bg-gray-400'
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
        {/* Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={() => setSearchOpen(false)}>
            <div className="bg-white w-full max-w-7xl mx-auto px-4 shadow-lg p-8 flex flex-col gap-4 animate-slide-in" onClick={e => e.stopPropagation()}>
              <button className="self-end mb-2" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <span className="text-2xl">×</span>
              </button>
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                className="w-full border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search anything on the page..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <div className="mt-2 flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {searchResults.length === 0 && (
                    <div className="text-gray-400 text-base">No results found.</div>
                  )}
                  {searchResults.map((item, idx) => (
                    <button
                      key={item.id + idx}
                      className="text-left px-3 py-2 rounded hover:bg-primary/10 transition-colors text-base"
                      onClick={() => {
                        setSearchOpen(false);
                        setTimeout(() => {
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                    >
                      {item.text.length > 80 ? item.text.slice(0, 80) + '…' : item.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white w-full h-full flex flex-col items-center" onClick={() => setMenuOpen(false)}>
            <nav
              className="bg-white w-full max-w-7xl mx-auto px-4 h-fit mt-8 shadow-lg p-8 flex flex-col gap-6 animate-slide-in"
              onClick={e => e.stopPropagation()}
            >
              <button className="self-end mb-4" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <span className="text-2xl">×</span>
              </button>
              {sectionMap.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-lg font-medium hover:text-primary"
                  onClick={e => handleSmoothScroll(e, s.id)}
                >
                  {s.emoji} {s.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
