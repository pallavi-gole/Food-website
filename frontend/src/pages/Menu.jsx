import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-16">

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Discover Our <span className="text-orange-500">Delicious Menu</span> 🍽️
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our handcrafted dishes made with fresh ingredients and love.
          </p>

        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-10">

          <div className="relative">

            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search your favorite dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none shadow-lg transition"
            />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}

          </div>

        </div>

        {/* Results Count */}
        <div className="text-center mb-10">
          <p className="text-gray-600 text-lg">
            {searchQuery ? (
              <>
                Found{" "}
                <span className="font-bold text-orange-600">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-gray-800">
                  "{searchQuery}"
                </span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-orange-600">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "dish" : "dishes"}
              </>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
            ))}
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              😔 No Results Found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find anything matching your search.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
