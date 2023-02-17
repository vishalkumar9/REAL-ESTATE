const express = require("express");
const propertyController = require("../controllers/propertyController");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.use(checkAuth);


router.post("/uploadProperty",propertyController.uploadProperty);

router.post("/getProperty",propertyController.getProperty);

module.exports = router;