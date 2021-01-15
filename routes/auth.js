const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//  controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth"); //importing from controllers

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

router.post("/current-user", authCheck, currentUser);

router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;

// middlewares run before controllers function
// we can add multiple middlewares to a request see /current-admin
