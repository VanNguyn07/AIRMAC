const fetchThresholdModel = require("../models/fetch_threshold_model");
const fetchThresholdController = {
    handleGetValueThreshold: async(request, response) => {
        try {
            const {threshold} = request.query;
            if(!threshold || threshold === null) {
                return response.json([]);
            }
            const result = await fetchThresholdModel.getValueThreshhold(threshold);
            return response.json(result);
        }catch(err) {
            console.error("Lỗi Controller get value threshold:", err);
            return response.status(500);
        }
    }
}
module.exports = fetchThresholdController;