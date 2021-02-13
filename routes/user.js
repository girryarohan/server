const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart

router.get("/user/cart", authCheck, getUserCart); // get cart

router.delete("/user/cart", authCheck, emptyCart); // delete cart

router.post("/user/address", authCheck, saveAddress); // save address

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart); // coupon

router.post("/user/order", authCheck, createOrder); // create order stripe

router.post("/user/cash-order", authCheck, createCashOrder); // COD order

router.get("/user/orders", authCheck, orders); // get all orders of user

router.post("/user/wishlist", authCheck, addToWishlist); // add wishlist

router.get("/user/wishlist", authCheck, wishlist); // get wishlist

router.put("/user/wishlist/:productId", authCheck, removeFromWishlist); // remove wishlist

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit node USer API endpoint",
//   });
// });

module.exports = router;
