const updateProcessStatusModel = require("../models/update_process_status_model");
const updateProcessStatusController = {
  setProcessStatus: async (request, response) => {
    try {
      const { patientId } = request.params;
      const { process_status } = request.body;
      if (!patientId || patientId === null) {
        return response.json([]);
      }
      const result = await updateProcessStatusModel.setProcessStatus(
        patientId,
        process_status,
      );
      console.log("Update process status successfully");
      return response
        .status(200)
        .json({
          success: true,
          message: "Update process status at controller success",
          data: result,
        });
    } catch (err) {
      console.error("Error Controller update process status: ", err);
      return response
        .status(500)
        .json({ message: "Error server at controller update process status" });
    }
  },
};

module.exports = updateProcessStatusController;
