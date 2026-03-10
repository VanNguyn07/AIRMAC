const express = require("express");
const router = express.Router();

const updateProcessStatusController = require("../controllers/update_process_status_controller");
router.put("/:patientId", updateProcessStatusController.setProcessStatus);
module.exports = router;
