import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Cart is Empty
        </h2>
      </div>
    );
  }

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(
        `/api/cart/remove/${menuId}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 sm:mt-16 px-4">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 text-orange-600">
        🍽️ Order Summary
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-2xl rounded-3xl overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-orange-100 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-left">Item</th>
              <th className="py-4 px-6 text-center">Qty</th>
              <th className="py-4 px-6 text-center">Price</th>
              <th className="py-4 px-6 text-center">Total</th>
              <th className="py-4 px-6 text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cart.items.map((item) => (
              <tr key={item._id} className="border-t hover:bg-orange-50 transition">
                <td className="py-4 px-6 flex items-center gap-4">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <span className="font-semibold">
                    {item.menuItem.name}
                  </span>
                </td>

                <td className="py-4 px-6 text-center">
                  {item.quantity}
                </td>

                <td className="py-4 px-6 text-center">
                  ₹{item.menuItem.price}
                </td>

                <td className="py-4 px-6 text-center font-bold text-green-600">
                  ₹{item.menuItem.price * item.quantity}
                </td>

                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => removeFromCart(item.menuItem._id)}
                    className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-6">
        {cart.items.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-lg p-4">

            <div className="flex items-center gap-4">
              <img
                src={item.menuItem.image}
                alt={item.menuItem.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {item.menuItem.name}
                </h3>
                <p className="text-sm text-gray-500">
                  ₹{item.menuItem.price}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span>Qty: {item.quantity}</span>
              <span className="font-bold text-green-600">
                ₹{item.menuItem.price * item.quantity}
              </span>
            </div>

            <button
              onClick={() => removeFromCart(item.menuItem._id)}
              className="mt-4 w-full bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-200 transition"
            >
              Remove Item
            </button>

          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 bg-orange-50 p-6 rounded-2xl shadow-lg">

        <h3 className="text-xl sm:text-2xl font-bold">
          Grand Total: <span className="text-green-600">₹{totalPrice}</span>
        </h3>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 sm:mt-0 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition shadow-md"
        >
          Proceed to Checkout →
        </button>

      </div>

    </div>
  );
};

export default Cart;
