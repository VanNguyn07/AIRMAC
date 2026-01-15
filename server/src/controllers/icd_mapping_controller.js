const IcdMappingModel = require("../models/icd_mapping_model");

const IcdMappingController = {
  handleSearchByKeyWord: async (repuest, response) => {
    try {
      const { keyword } = repuest.query; // Lấy từ khóa từ URL (?keyword=...)
      //const keywordFromURL = repuest.query.keywordFromURL; cách viết trên tương đương với cách viết này
      if (!keyword || keyword.length < 2) {
        return response.json([]);
      }
      // Gọi Model để lấy dữ liệu
      const diseases = await IcdMappingModel.searchByKeyWord(keyword);
      // Trả về JSON cho Frontend
      return response.json(diseases);
    } catch (err) {
      console.error("Lỗi Controller Search:", err);
      return res.status(500).json({ message: "Lỗi Server" });
    }
  },
};

module.exports = IcdMappingController;