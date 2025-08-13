
# GroundFarm Ecommerce & Booking Platform

This is a modern ecommerce and activity booking website built with [Next.js](https://nextjs.org). It allows users to shop for farm products, book farm experiences, and reserve accommodation, all in a seamless, mobile-friendly interface.

## Features

- **Farm Shop:** Browse and add fresh farm products to your cart. Products include vegetables, eggs, honey, and fruit baskets.
- **Activity Booking:** Reserve unique farm experiences like guided tours, adventure playground, and lodge stays. Each activity has a photo gallery and a simple reservation form.
- **Cart & Checkout:** View your cart, adjust quantities, and checkout via WhatsApp for both products and reservations. Reservation details (dates, guests) are included in the checkout.
- **Responsive Design:** Fully responsive for mobile and desktop, with a clean, modern UI.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bckyrd-io/next-ecommerce.git
   cd next-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Usage

- **Shop for Products:**
  - Scroll to the "From Our Farm" section.
  - Click "Add to Cart" to add products. A notification will prompt you to visit the cart.

- **Book Activities or Lodge:**
  - Scroll to "Activities" and click "Reserve" on any experience.
  - Fill in your check-in, check-out, and guest details, then click "Continue" to add the reservation to your cart.

- **Checkout:**
  - Click the cart icon or "Visit your cart" link in the notification.
  - Review your order and click "Checkout via WhatsApp" to send your order details directly to GroundFarm.

## Customization

- Product and activity data are currently hardcoded for demo purposes. To connect to a backend or CMS, update the data sources in `src/pages/index.tsx` and `src/pages/reserve/[id].tsx`.
- Images are stored in the `public/` directory. Replace or add images as needed.

## License

MIT. See [LICENSE](LICENSE) for details.
