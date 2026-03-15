const updateProcessStatusModel = require("../models/update_process_status_model");
const updateProcessStatusController = {
  setProcessStatus: async (request, response) => {
    try {
      const { patientId } = request.params;
      const { process_status, device_id } = request.body;
      
      console.log("Controller - patientId:", patientId, "process_status:", process_status, "device_id:", device_id);
      
      if (!patientId || patientId === null) {
        return response.status(400).json({
          success: false,
          message: "Patient ID is required",
        });
      }
      
      const result = await updateProcessStatusModel.setProcessStatus(
        patientId,
        process_status,
        device_id 
      );
      
      console.log("Controller - Update result:", result);
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
