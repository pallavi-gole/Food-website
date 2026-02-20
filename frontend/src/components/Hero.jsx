import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
];

const Hero = () => {
  const { navigate } = useContext(AppContext);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] sm:h-[85vh] md:h-[95vh] overflow-hidden">

      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 scale-110"
              : "opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-5">

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-5">
          Taste the <span className="text-orange-400">Best Food</span>
          <br className="hidden sm:block" />
          in Town 🍽️
        </h1>

        <p className="text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mb-8 text-gray-200">
          Fresh ingredients, authentic recipes, and unforgettable flavors.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Explore Menu
          </button>

          <button
            onClick={() => navigate("/book-table")}
            className="border-2 border-white hover:bg-white hover:text-black px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold transition transform hover:scale-105"
          >
            Reserve Table
          </button>

        </div>

        {/* Dots */}
        <div className="flex gap-3 mt-8 md:mt-12">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
                current === index
                  ? "bg-orange-400 scale-125"
                  : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
