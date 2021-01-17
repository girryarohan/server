const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//  controllers
const {
  create,
  read,
  update,
  remove,
  list,
  getAssoSubcategories,
} = require("../controllers/category"); //importing from controllers

// routes - admin operations
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
// below get all subcategories  associated with selected (parent) category 81
router.get("/category/subcategories/:_id", getAssoSubcategories);
module.exports = router;

// middlewares run before controllers function
// we can add multiple middlewares to a request see /current-admin
