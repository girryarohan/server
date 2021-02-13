const mongoose = require("mongoose");
const { token } = require("morgan");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
// index used for email to query faster from db to fetch emails in db
// mongodb is schema less but with the help of mongoose we creating a schema
// here we created a User schema which is used for user of our ecom website
// we are exporting this User model
