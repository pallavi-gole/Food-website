import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  ArrowLeft,
  CheckCircle,
  ShoppingCart,
  XCircle,
  Plus,
  Minus,
  Star,
} from "lucide-react";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  const menu = menus.find((item) => item._id === id);

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold">Menu not found</h2>
      </div>
    );
  }

  const totalPrice = menu.price * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          <span className="font-semibold">Back to Menu</span>
        </button>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-16 items-start">

        {/* Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-[450px] object-cover"
            />
          </div>

          {/* Availability */}
          <div className="absolute top-6 right-6">
            {menu.isAvailable ? (
              <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <CheckCircle size={18} /> Available
              </div>
            ) : (
              <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <XCircle size={18} /> Unavailable
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">

          {/* Title */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              {menu.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} className="text-gray-300" />
              <span className="text-gray-600 ml-2">(4.0 Rating)</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {menu.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-orange-500">
              ₹{menu.price}
            </span>
            <span className="text-gray-500 text-lg">per item</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-6">
            <span className="font-semibold text-lg">Quantity:</span>

            <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
                className="px-4 py-2 hover:bg-orange-100 transition"
              >
                <Minus size={18} />
              </button>

              <span className="px-6 font-bold text-lg">{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 hover:bg-orange-100 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Total + Button */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border">

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-700">
                Total Amount
              </span>
              <span className="text-3xl font-bold text-orange-500">
                ₹{totalPrice}
              </span>
            </div>

            <button
              disabled={!menu.isAvailable}
              onClick={() => addToCart(menu._id, quantity)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                menu.isAvailable
                  ? "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={22} />
              {menu.isAvailable ? "Add to Cart" : "Unavailable"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
