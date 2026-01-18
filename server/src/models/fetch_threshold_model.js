const database = require("../config/database");
const fetchThresholdModel = {
    getValueThreshhold: async (threshold) => {
        const query = "SELECT threshold_value, color_code, status FROM setup_level_rules WHERE risk_level = $1";
        try {
            const result = await database.query(query, [threshold]);
            return result.rows;
        }catch (err) {
            console.error("get value threshold error: ", err);
            return [];
        }
    }
}
module.exports = fetchThresholdModel;