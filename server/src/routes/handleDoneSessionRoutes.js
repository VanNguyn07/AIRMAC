const express = require("express");
const router = express.Router();

const handleDoneSessionController = require("../controllers/handle_done_session_controller");
router.put("/:patientId", handleDoneSessionController.setDoneStatus);
module.exports = router;