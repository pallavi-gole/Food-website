import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-orange-50 to-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6"
        >
          Discover Our <span className="text-orange-500">Delicious Categories</span> 🍽️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-16 text-sm sm:text-base md:text-lg"
        >
          Explore different flavors crafted with passion and love.
        </motion.p>

        {/* Grid */}
        <div className="grid 
                        grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:grid-cols-5 
                        gap-6 sm:gap-8 md:gap-10">

          {categories.map((cat, index) => (
            <motion.div
              key={cat._id}
              onClick={() => navigate(`/menu?category=${cat.name}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="cursor-pointer group"
            >
              <div className="relative p-4 sm:p-6 rounded-3xl bg-white shadow-md hover:shadow-xl transition duration-300">

                {/* Image */}
                <div className="relative 
                                w-20 h-20 
                                sm:w-24 sm:h-24 
                                md:w-28 md:h-28 
                                mx-auto rounded-full overflow-hidden 
                                border-4 border-white shadow">

                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition">
                  {cat.name}
                </h3>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;
