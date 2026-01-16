const express = require("express");
const router = express.Router();
const fetchDataController = require("../controllers/fetch_data_controller");

router.get("/", fetchDataController.handleFetchData);
module.exports = router;