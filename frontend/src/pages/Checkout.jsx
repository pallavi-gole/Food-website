import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { totalPrice, axios, navigate } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    try {
      setLoading(true);

      if (paymentMethod === "Online Payment") {
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: { return_url: window.location.origin + "/success" },
        });

        if (error) {
          toast.error(error.message);
          setLoading(false);
        }
      } else {
        const { data } = await axios.post(
          "/api/order/place",
          { address, paymentMethod },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/my-orders");
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Delivery Details */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">
            📍 Delivery Details
          </h2>

          <textarea
            rows={5}
            value={address}
            placeholder="Enter your full delivery address"
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
          />
        </div>

        {/* Order Summary */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-600">
            🧾 Order Summary
          </h2>

          <div className="flex justify-between items-center text-lg font-medium mb-6">
            <span>Total Amount</span>
            <span className="text-green-600 font-bold text-xl md:text-2xl">
              $ {totalPrice}
            </span>
          </div>

          {/* Payment Options */}
          <div className="space-y-3 mb-6">
            {["Pay at hotel", "Online Payment"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl cursor-pointer hover:bg-orange-50 transition"
              >
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="font-medium">
                  {method === "Pay at hotel" ? "💵 Pay at Hotel" : "💳 Online Payment"}
                </span>
              </label>
            ))}
          </div>

          {/* Stripe Payment Element */}
          {paymentMethod === "Online Payment" && (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50">
              <PaymentElement />
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 md:py-4 rounded-xl text-lg md:text-xl font-semibold shadow-lg transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm & Place Order 🚀"}
          </button>
        </div>

      </div>
    </div>
  );
};

const Checkout = () => {
  const { totalPrice, axios } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post(
        "/api/payment/create-payment-intent",
        { totalPrice: Number(totalPrice) },
        { withCredentials: true }
      )
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch(() => toast.error("Payment initialization failed"));
  }, [totalPrice]);

  return (
    clientSecret && <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
