const updateLevelModel = require("../models/update_level_model");
const updateLevelController = {
  setLevel: async (request, response) => {
    try {
      const { patientId } = request.params;
      const { level, threshold, status, color } = request.body;
      if (!patientId || patientId === null) {
        return response.json([]);
      }
      const result = await updateLevelModel.setLevel(
        patientId,
        level,
        threshold,
        status,
        color
      );
      console.log("Update level successfully");
      return response
        .status(200)
        .json({ message: "Update thành công", data: result.rows[0] });
    } catch (err) {
      console.error("Lỗi Controller update level:", err);
      return response.status(500).json({ message: "Lỗi Server" });
    }
  },
};
module.exports = updateLevelController;
