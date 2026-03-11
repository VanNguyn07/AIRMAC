const handleDoneSession = require("../models/handle_done_session_model");

const handleDoneSessionController = {
  setDoneStatus: async (request, response) => {
    try {
      const { patientId } = request.params;
      const { process_status } = request.body;
      if (!patientId || patientId === null) {
        return response.json([]);
      }
      const result = handleDoneSession.setStatusDone(patientId, process_status);
      console.log("Set status Done at Controller successfully!");
      return response
        .status(200)
        .json({
          success: true,
          message: "Set status Done at controller success",
          data: result,
        });
    } catch (err) {
      console.error("Error when set status done at controller: ", err);
      return response
        .status(500)
        .json({ message: "Error Server at controller handle done session" });
    }
  },
};
module.exports = handleDoneSessionController;