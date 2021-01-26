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
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); // save cart

router.get("/user/cart", authCheck, getUserCart); // get cart

router.delete("/user/cart", authCheck, emptyCart); // delete cart

router.post("/user/address", authCheck, saveAddress); // save address
// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit node USer API endpoint",
//   });
// });

module.exports = router;
