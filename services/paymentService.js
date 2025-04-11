import stripe from "stripe";
process.env.STRIPE_SECRET_KEY;

export const createPaymentIntent = async (amount, currency = "usd") => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
  });
  return paymentIntent;
};
