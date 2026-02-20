import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                    group transition-all duration-300 
                    hover:-translate-y-2 hover:shadow-2xl">

      {/* Image Section */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-44 sm:h-52 md:h-56 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Availability badge */}
        {!menu.isAvailable && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Unavailable
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {menu.name}
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
          {menu.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between">

          <span className="text-xl sm:text-2xl font-extrabold text-orange-500">
            ₹{menu.price}
          </span>

          <button
            onClick={() => addToCart(menu._id)}
            disabled={!menu.isAvailable}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full 
                        text-xs sm:text-sm font-semibold 
                        transition-all duration-300
              ${
                menu.isAvailable
                  ? "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            <ShoppingCart size={16} />
            Add
          </button>

        </div>
      </div>
    </div>
  );
};

export default MenuCard;
