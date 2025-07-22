import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

// This would typically come from an API or database
const products = [
  {
    id: '1',
    name: 'Fresh Organic Vegetables',
    price: 24.99,
    image: '/products/vegetables.jpg',
    category: 'Vegetables',
    description: 'A fresh selection of organic vegetables harvested from our sustainable farm. Perfect for healthy meals and nutritious cooking.',
    details: [
      'Locally grown',
      'Pesticide-free',
      'Non-GMO',
      'Harvested daily',
    ]
  },
  // Add other products here
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-primary font-semibold">{product.category}</span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Product Details:</h2>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-4 mb-4">
                  <label htmlFor="quantity" className="font-medium">Quantity:</label>
                  <select
                    id="quantity"
                    className="border rounded-lg px-3 py-2"
                    defaultValue="1"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => router.push('/cart')}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
