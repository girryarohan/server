const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//  controllers
const { upload, remove } = require("../controllers/cloudinary"); //importing from controllers

// routes - admin operations
router.post("/uploadimages", authCheck, adminCheck, upload);
router.delete("/removeimage", authCheck, adminCheck, remove);

module.exports = router;
