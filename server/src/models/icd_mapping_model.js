const database = require("../config/database");

const IcdMappingModel = {
  searchByKeyWord: async (keyword) => {
    const query = `SELECT icd_code, disease_name
      FROM icd_mapping
      WHERE icd_code % $1 OR disease_name  % $1
      ORDER BY GREATEST(similarity(icd_code, $1), similarity(disease_name, $1)) DESC
      LIMIT 10`;
      try {
    const result = await database.query(query, [keyword]);
    return result.rows;
  }catch(err){
    console.error("searchByKeyword error:", err)
    return [];
  }
  },
};

// %: toán tử của pg_trgm để tìm chuỗi "giống" với từ khóa (tốt hơn ILIKE).
module.exports = IcdMappingModel;