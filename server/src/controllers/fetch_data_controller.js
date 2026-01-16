const fetch_data_model = require("../models/fetch_data_model");
const fetchDataController = {
  handleFetchData: async (request, response) => {
    try {
        const data = await fetch_data_model.getAllInfoPatient();
        return response.json(data);
    } catch (err) {
      console.error("Lỗi Controller Search:", err);
      return response.status(500).json({ message: "Lỗi Server" });
    }
  },
};
module.exports = fetchDataController;