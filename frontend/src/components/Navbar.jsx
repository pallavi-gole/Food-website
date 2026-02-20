import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/food.jpg"
import { Link } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } =
    useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
   
  <nav
    className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-orange-500/80 backdrop-blur-md shadow-xl"
        : "bg-gradient-to-r from-orange-500 to-red-500"
    }`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 sm:h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition"
          />

          <h1 className="text-white text-lg sm:text-2xl font-extrabold tracking-wide">
            Foodie
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-white font-medium">
          {["Home", "Menu", "Book Table", "Contact"].map((item) => (
            <Link
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="relative group text-sm lg:text-base"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative hover:scale-110 transition"
          >
            <ShoppingCart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-600 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shadow">
              {cartCount}
            </span>
          </button>

          {/* Profile */}
          {user ? (
            <div className="relative">
              <UserCircle
                onClick={() => setProfileOpen(!profileOpen)}
                className="text-white cursor-pointer hover:scale-110 transition w-7 h-7 sm:w-8 sm:h-8"
              />

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-44 sm:w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Calendar size={16} /> Bookings
                  </Link>

                  <Link
                    to="/my-orders"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Package size={16} /> Orders
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 w-full text-sm"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-black px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-full font-semibold hover:scale-105 hover:bg-yellow-300 transition"
            >
              Login
            </button>
          )}

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white rounded-xl mt-3 p-5 space-y-4 shadow-lg">
          <Link to="/" className="block text-gray-700 font-medium">Home</Link>
          <Link to="/menu" className="block text-gray-700 font-medium">Menu</Link>
          <Link to="/book-table" className="block text-gray-700 font-medium">Book Table</Link>
          <Link to="/contact" className="block text-gray-700 font-medium">Contact</Link>
        </div>
      )}
    </div>
  </nav>
);

  
};

export default Navbar;
