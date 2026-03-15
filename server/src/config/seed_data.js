const diseases = [
  { icd_code: "K56.1", disease_name: "Bụng chướng rõ", points: 1 },
  { icd_code: "K56.2", disease_name: "Nôn ra mật/xanh", points: 1 },
  { icd_code: "K56.3", disease_name: "Có máu trong phân", points: 1 },
  { icd_code: "K56.4", disease_name: "Sốt hoặc nghi nhiễm trùng", points: 1 },
  { icd_code: "K56.5", disease_name: "Đau dữ dội, vật vã", points: 1 },
  { icd_code: "K56.6", disease_name: "Siêu âm cho thấy phù nề khối lồng	1", points: 1 },

];

const age = [
  { min_age: 0, max_age: 3, points: 2 }, // -- Dưới 3 tháng: Nguy cơ cao (Ruột mỏng)
  // { min_age: 3, max_age: 12, points: 1 }, //-- 3 tháng đến 3 tuổi: An toàn nhất (Target)
  // { min_age: 12, max_age: 780, points: 0 }, //-- -- 3 tuổi - 5 tuổi: Cảnh báo nhẹ
  // { min_age: 780, max_age: 1200, points: 2 }, //; -- Trên 5 tuổi: Nguy cơ nguyên nhân thực thể (U/Polyp)
];

const vitalRules = [
  // === 1. HEART RATE (hr) ===
  { rule_category: "hr", min_value: 80, max_value: 130, points: 0 }, // Bình thường
  { rule_category: "hr", min_value: 130, max_value: 150, points: 1 }, // Hơi nhanh
  { rule_category: "hr", min_value: 150, max_value: 170, points: 2 }, // Nhanh
  { rule_category: "hr", min_value: 170, max_value: 300, points: 3 }, // Rất nhanh
  { rule_category: "hr", min_value: 50, max_value: 80, points: 1 }, // Hơi chậm
  { rule_category: "hr", min_value: 0, max_value: 50, points: 3 }, // Quá chậm

  // === 2. RESPIRATION RATE (rr) ===
  { rule_category: "rr", min_value: 20, max_value: 40, points: 0 }, // Bình thường
  { rule_category: "rr", min_value: 40, max_value: 50, points: 1 }, // Hơi nhanh
  { rule_category: "rr", min_value: 50, max_value: 60, points: 2 }, // Nhanh
  { rule_category: "rr", min_value: 60, max_value: 100, points: 3 }, // Rất nhanh
  { rule_category: "rr", min_value: 10, max_value: 20, points: 1 }, // Thở chậm
  { rule_category: "rr", min_value: 0, max_value: 10, points: 3 }, // Ngưng thở

  // === 3. SpO2 ===
  { rule_category: "spo2", min_value: 96, max_value: 100, points: 0 }, // Tốt
  { rule_category: "spo2", min_value: 94, max_value: 95.9, points: 1 }, // Theo dõi
  { rule_category: "spo2", min_value: 90, max_value: 93.9, points: 2 }, // Thiếu oxy
  { rule_category: "spo2", min_value: 0, max_value: 89.9, points: 3 }, // Suy hô hấp

  // === 4. TEMPERATURE (tem) ===
  { rule_category: "tem", min_value: 36, max_value: 37.5, points: 0 }, // Bình thường
  { rule_category: "tem", min_value: 37.6, max_value: 38.5, points: 1 }, // Sốt nhẹ
  { rule_category: "tem", min_value: 38.6, max_value: 42, points: 2 }, // Sốt cao
  { rule_category: "tem", min_value: 35, max_value: 35.9, points: 1 }, // Hạ nhiệt nhẹ
  { rule_category: "tem", min_value: 0, max_value: 34.9, points: 3 }, // Hạ nhiệt nặng

  // === 5. SYSTOLIC BLOOD PRESSURE (bp_sys) ===
  { rule_category: "bp_sys", min_value: 80, max_value: 140, points: 0 }, // Bình thường
  { rule_category: "bp_sys", min_value: 140, max_value: 200, points: 1 }, // Tăng HA
  { rule_category: "bp_sys", min_value: 70, max_value: 79, points: 1 }, // Thấp nhẹ
  { rule_category: "bp_sys", min_value: 50, max_value: 69, points: 2 }, // Tụt HA
  { rule_category: "bp_sys", min_value: 0, max_value: 49, points: 3 }, // Sốc
];

const devices = [
  {
    device_code: "BSP 01",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "BSP 02",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "BSP 03",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "BSP 04",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "BSP 05",
    device_status: "READY",
    current_level: 0,
  },

];

const setupLevelRules = [
  {
    min_value: 0,
    max_value: 2,
    risk_level: 4,
    status: "Stable",
    color_code: "#28a745",
    threshold_value: 0.5,
  },
  {
    min_value: 3,
    max_value: 4,
    risk_level: 3,
    status: "Moderate",
    color_code: "#ffc107",
    threshold_value: 0.4,
  },
  {
    min_value: 5,
    max_value: 6,
    risk_level: 2,
    status: "Serious",
    color_code: "#fd7e14",
    threshold_value: 0.3,
  },
  {
    min_value: 7,
    max_value: 100,
    risk_level: 1,
    status: "Critical",
    color_code: "#dc3545",
    threshold_value: 0.2,
  },
];

const database = require("./database");

const seedDatabase = async () => {
  try {
    // =======================
    // SEED ICD_MAPPING
    // =======================
    //pg trả về kết quả dạng { rows: [{ count: '0' }] }
    console.log("🔄 Đang xử lý bảng icd mapping...");
    for (let icd of diseases) {
      await database.query(
        "INSERT INTO icd_mapping (icd_code, disease_name, points) VALUES ($1, $2, $3) ON CONFLICT (icd_code) DO NOTHING",
        [icd.icd_code, icd.disease_name, icd.points],
      );
    }
    const resultDiseases = await database.query(
      "SELECT count(*) FROM icd_mapping",
    );
    const countDiseases = parseInt(resultDiseases.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countDiseases} bản ghi) ICD - 10. Bỏ qua bước nạp.`,
    );

    // =======================
    // SEED AGE_RULES
    // =======================
    console.log("🔄 Đang xử lý bảng Age Rules...");

    for (let item of age) {
      await database.query(
        "INSERT INTO age_rules (min_age, max_age, points) VALUES ($1, $2, $3) ON CONFLICT (min_age, max_age) DO NOTHING",
        [item.min_age, item.max_age, item.points],
      );
    }
    const resultAge = await database.query("SELECT count(*) FROM age_rules");
    const countAge = parseInt(resultAge.rows[0].count);
    console.log(`✅ Dữ liệu đã có (${countAge} bản ghi) Age. Bỏ qua bước nạp.`);

    // =======================
    // SEED DEVICES
    // =======================
    console.log("🔄 Đang xử lý bảng devices...");
    for (let item of devices) {
      await database.query(
        "INSERT INTO airmacs (device_code, device_status, current_level) VALUES ($1, $2, $3) ON CONFLICT (device_code) DO NOTHING",
        [
          item.device_code,
          item.device_status,
          item.current_level,
        ],
      );
    }
    const resultDevice = await database.query("SELECT count(*) FROM airmacs");
    const countDevice = parseInt(resultDevice.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countDevice} bản ghi) devices. Bỏ qua bước nạp.`,
    );

    // =======================
    // SEED SCORING_RULES
    // =======================
    for (let item of vitalRules) {
      await database.query(
        "INSERT INTO scoring_rules (rule_category, min_value, max_value, points) VALUES ($1, $2, $3, $4) ON CONFLICT (min_value, max_value) DO NOTHING",
        [item.rule_category, item.min_value, item.max_value, item.points],
      );
    }
    const resultScoring = await database.query(
      "SELECT count(*) FROM scoring_rules",
    );
    const countScoring = parseInt(resultScoring.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countScoring} bản ghi) Scoring. Bỏ qua bước nạp.`,
    );

    // =======================
    // SEED SETUP_LEVEL_RULES
    // =======================
    for (let item of setupLevelRules) {
      await database.query(
        "INSERT INTO setup_level_rules (min_value, max_value, risk_level, status, color_code, threshold_value) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (min_value, max_value) DO NOTHING",
        [
          item.min_value,
          item.max_value,
          item.risk_level,
          item.status,
          item.color_code,
          item.threshold_value,
        ],
      );
    }
    const resultSetupLv = await database.query(
      "SELECT count(*) FROM setup_level_rules",
    );
    const countSetupLv = parseInt(resultSetupLv.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countSetupLv} bản ghi) setup_level. Bỏ qua bước nạp.`,
    );
  } catch (err) {
    console.error("❌ Lỗi khi nạp dữ liệu mẫu:", err);
  }
};

module.exports = seedDatabase;
