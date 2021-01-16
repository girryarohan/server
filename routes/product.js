const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//  controllers
const { create } = require("../controllers/product"); //importing from controllers

// routes - admin operations
router.post("/product", authCheck, adminCheck, create);

module.exports = router;

// middlewares run before controllers function
// we can add multiple middlewares to a request see /current-admin
