const express = require("express");
const router = express.Router();
const fetchThresholdController = require("../controllers/fetch_threshold_controller");
router.get("/threshold", fetchThresholdController.handleGetValueThreshold);
module.exports = router;