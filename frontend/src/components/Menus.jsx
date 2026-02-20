import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";

const Menus = () => {
  const { menus } = useContext(AppContext);

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 py-16 sm:py-20 md:py-24">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Our <span className="text-orange-500">Special Menu</span> 🍽️
          </h1>

          <p className="text-gray-600 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Fresh, tasty and made with love just for you
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4 
                        gap-6 sm:gap-8 md:gap-10">
          
          {menus.map((menu, index) => (
            <div
              key={menu._id}
              className="transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MenuCard menu={menu} />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Menus;
