const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//Updated Stripe secret - set girryarohan repo

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body;
  // later apply coupon
  // later calculate price

  // 1. find user
  const user = await User.findOne({ email: req.user.email }).exec();

  // 2. get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  // console.log(
  //   "CART TOTAL CHARGE",
  //   cartTotal,
  //   "AFTER DISCOUNT",
  //   totalAfterDiscount
  // );

  let finalAmount = 0;
  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }
  // create payment intent with order amount and currency

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal: cartTotal,
    totalAfterDiscount: totalAfterDiscount,
    payable: finalAmount,
  });
};
