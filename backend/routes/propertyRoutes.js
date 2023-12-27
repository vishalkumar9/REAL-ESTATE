const express = require("express");
const propertyController = require("../controllers/propertyController");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.get("/getAvailableLocations",propertyController.getAvailableLocations);
router.get("/searchProperty",propertyController.searchProperty);
router.get("/getPropertyById",propertyController.getPropertyById);

router.use(checkAuth);

router.post("/uploadProperty",propertyController.uploadProperty);

router.get("/getPropertyByUserId",propertyController.getPropertyByUserId);


module.exports = router;