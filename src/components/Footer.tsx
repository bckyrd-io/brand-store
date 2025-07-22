import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p>FarmFresh</p>
              <p>123 Farm Road</p>
              <p>Agricultural District</p>
              <p>Email: contact@farmfresh.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-white/80 transition-colors">Products</Link></li>
              <li><Link href="/activities" className="hover:text-white/80 transition-colors">Activities</Link></li>
              <li><Link href="/research" className="hover:text-white/80 transition-colors">Research</Link></li>
              <li><Link href="/faq" className="hover:text-white/80 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and special offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 flex-1 bg-white/10 border border-white/20 focus:outline-none focus:border-white/40 placeholder:text-white/60 text-white"
              />
              <button
                type="submit"
                className="bg-white text-primary font-semibold px-6 py-2 hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
       
      </div>
    </footer>
  );
}
