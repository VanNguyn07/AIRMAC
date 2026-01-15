const express = require("express");
const router = express.Router();
const airmacController = require("../controllers/airmac_controller");

router.get("/", airmacController.handleGetDeviceRoom);
module.exports = router;