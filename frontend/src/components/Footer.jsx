import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-600 to-red-500 text-white pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-4">Foodie 🍽️</h2>
          <p className="text-orange-100 leading-relaxed">
            Serving happiness on every plate. Fresh ingredients,
            delicious flavors, and unforgettable taste.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Facebook className="hover:scale-110 transition cursor-pointer" />
            <Instagram className="hover:scale-110 transition cursor-pointer" />
            <Twitter className="hover:scale-110 transition cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-orange-100">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/menu" className="hover:text-white transition">Menu</Link></li>
            <li><Link to="/book-table" className="hover:text-white transition">Book Table</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-orange-100">
            <li><Link to="/" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <p className="text-orange-100 mb-4">
            Get updates about new dishes & offers.
          </p>

         <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-stretch max-w-md mx-auto">
  <input
    type="email"
    placeholder="Enter your email"
    className="flex-1 px-4 py-2 sm:py-2 text-gray-700 outline-none border border-white/30 rounded-full sm:rounded-l-full sm:rounded-r-none bg-white/10 placeholder-gray-200"
  />
  <button className="px-4 sm:px-6 py-2 bg-black text-white rounded-full sm:rounded-r-full sm:rounded-l-none flex items-center justify-center hover:bg-gray-800 transition">
    <Mail size={18} />
  </button>
</div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-orange-400 mt-12 pt-6 text-center text-orange-100 text-sm">
        © 2026 Foodie. All Rights Reserved.
      </div>

    </footer>
  );
}
