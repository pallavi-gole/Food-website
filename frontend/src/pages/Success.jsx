import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Success = () => {
  const { axios } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const paymentIntent = query.get("payment_intent");
  const status = query.get("redirect_status");

  useEffect(() => {
    const saveOrder = async () => {
      if (status === "succeeded") {
        try {
          const { data } = await axios.post("/api/order/place", {
            paymentId: paymentIntent,
            paymentMethod: "Online Payment",
          });

          if (data.success) {
            toast.success("Order placed successfully 🎉");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    saveOrder();
  }, []);

  if (status !== "succeeded") {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl">Payment Failed ❌</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Order Confirmed!
      </h1>

      <p className="mt-4">Your food is being prepared 🍕</p>

      <p className="text-gray-500 mt-2">
        Payment ID: {paymentIntent}
      </p>

      <button
        onClick={() => navigate("/my-orders")}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        View My Orders
      </button>
    </div>
  );
};

export default Success;
