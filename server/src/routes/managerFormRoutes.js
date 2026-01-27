const express = require("express");
const router = express.Router();
const managerFormController = require("../controllers/manager_form_controller");
router.post("/", managerFormController.handleAddForm);
router.put("/:patientId", managerFormController.handleUpdateForm);
module.exports = router;
