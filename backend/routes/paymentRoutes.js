import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/test", (req, res) => {
  res.send("Payment route working");
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { totalPrice } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment error" });
  }
});

export default router;
