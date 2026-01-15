const airmac_model = require("../models/airmac_model");

const airmacController = {
  handleGetDeviceRoom: async (repuest, response) => {
    try {
      const data = await airmac_model.getDeviceRoom();
      return response.json(data);
    } catch (err) {
      console.error("Lỗi Controller Search:", err);
      return res.status(500).json({ message: "Lỗi Server" });
    }
  },
};

module.exports = airmacController;