const database = require("../config/database");

const airmacModel = {
  getDeviceRoom: async () => {
    const query =
      "SELECT * FROM airmacs WHERE airmacs.device_status = 'READY'";
    try {
      const result = await database.query(query);
      return result.rows;
    } catch (err) {
      console.error("getDeviceRoom error:", err);
      return [];
    }
  },
};
module.exports = airmacModel;