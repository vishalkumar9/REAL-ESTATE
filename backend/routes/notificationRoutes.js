const express = require("express");
const notificationController = require("../controllers/notificationController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// router.use(checkAuth);

router.post('/handlePropertyInterestNotification',notificationController.handlePropertyInterestNotification);

module.exports = router;