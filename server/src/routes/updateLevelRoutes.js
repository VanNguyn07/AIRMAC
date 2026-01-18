const express = require("express");
const router = express.Router();
const updateLevelController = require("../controllers/update_level_controller");
router.put("/:patientId", updateLevelController.setLevel);
module.exports = router;    