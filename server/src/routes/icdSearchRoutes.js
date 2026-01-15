const express = require("express");
const router = express.Router();
const IcdMappingController = require("../controllers/icd_mapping_controller");
// Định nghĩa các hành động cho nhóm "Patients"
router.get("/search", IcdMappingController.handleSearchByKeyWord);

module.exports = router;