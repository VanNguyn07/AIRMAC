const diseases = [
  // ===============================
  // NHÓM 1: TARGET (SCORE 0–2)
  // ===============================
  { icd_code: "K56.1", disease_name: "Lồng ruột (Intussusception)", points: 0 },
  {
    icd_code: "K56.10",
    disease_name: "Lồng ruột vô căn (Idiopathic)",
    points: 0,
  },
  { icd_code: "K56.11", disease_name: "Lồng ruột hồi-manh tràng", points: 1 },
  { icd_code: "K56.12", disease_name: "Lồng ruột hồi-hồi tràng", points: 2 },

  // ===============================
  // NHÓM 2: ABSOLUTE CONTRAINDICATIONS
  // ===============================
  {
    icd_code: "K63.1",
    disease_name: "Thủng ruột (Perforation of intestine)",
    points: 10,
  },
  {
    icd_code: "K65.0",
    disease_name: "Viêm phúc mạc cấp tính (Acute peritonitis)",
    points: 10,
  },
  { icd_code: "K65.8", disease_name: "Viêm phúc mạc khác", points: 10 },
  {
    icd_code: "K65.9",
    disease_name: "Viêm phúc mạc không xác định",
    points: 10,
  },
  {
    icd_code: "R10.0",
    disease_name: "Bụng ngoại khoa (Acute abdomen)",
    points: 10,
  },
  { icd_code: "K56.2", disease_name: "Xoắn ruột (Volvulus)", points: 10 },
  {
    icd_code: "K55.0",
    disease_name: "Nhồi máu ruột cấp tính (Acute vascular disorders)",
    points: 10,
  },
  { icd_code: "A41.9", disease_name: "Nhiễm khuẩn huyết (Sepsis)", points: 10 },
  {
    icd_code: "R57.1",
    disease_name: "Sốc giảm thể tích (Hypovolaemic shock)",
    points: 10,
  },
  { icd_code: "R57.8", disease_name: "Sốc tim / Sốc nhiễm trùng", points: 10 },
  {
    icd_code: "P77",
    disease_name: "Viêm ruột hoại tử (Necrotizing enterocolitis)",
    points: 10,
  },
  {
    icd_code: "K91.8",
    disease_name: "Biến chứng sau phẫu thuật ổ bụng",
    points: 10,
  },

  // ===============================
  // NHÓM 3: HIGH RISK (7–9)
  // ===============================
  {
    icd_code: "K35.2",
    disease_name: "Viêm ruột thừa cấp có viêm phúc mạc",
    points: 9,
  },
  { icd_code: "K35.8", disease_name: "Viêm ruột thừa cấp khác", points: 8 },
  {
    icd_code: "Q43.1",
    disease_name: "Bệnh Hirschsprung (Megacolon bẩm sinh)",
    points: 9,
  },
  { icd_code: "K92.0", disease_name: "Nôn ra máu (Haematemesis)", points: 8 },
  { icd_code: "K92.1", disease_name: "Đi ngoài phân đen (Melaena)", points: 8 },
  {
    icd_code: "K92.2",
    disease_name: "Xuất huyết tiêu hóa chưa rõ nguyên nhân",
    points: 8,
  },
  { icd_code: "K56.6", disease_name: "Tắc ruột cơ học khác", points: 7 },
  {
    icd_code: "K56.5",
    disease_name: "Dính ruột (Intestinal adhesions)",
    points: 7,
  },
  {
    icd_code: "C18.9",
    disease_name: "Ung thư đại tràng (Khối u dẫn đường)",
    points: 9,
  },
  {
    icd_code: "D66",
    disease_name: "Bệnh máu khó đông (Hemophilia A)",
    points: 8,
  },
  {
    icd_code: "D67",
    disease_name: "Bệnh máu khó đông (Hemophilia B)",
    points: 8,
  },
  {
    icd_code: "D69.3",
    disease_name: "Xuất huyết giảm tiểu cầu vô căn",
    points: 7,
  },

  // ===============================
  // NHÓM 4: MODERATE RISK (4–6)
  // ===============================
  { icd_code: "E86", disease_name: "Mất nước (Dehydration)", points: 6 },
  {
    icd_code: "E46",
    disease_name: "Suy dinh dưỡng protein-năng lượng",
    points: 6,
  },
  {
    icd_code: "A09",
    disease_name: "Tiêu chảy cấp và viêm dạ dày ruột",
    points: 5,
  },
  {
    icd_code: "K59.3",
    disease_name: "Phình đại tràng nhiễm độc (Toxic megacolon)",
    points: 6,
  },
  { icd_code: "D64.9", disease_name: "Thiếu máu (Anemia)", points: 4 },
  { icd_code: "J18.9", disease_name: "Viêm phổi (Pneumonia)", points: 5 },
  { icd_code: "J45.9", disease_name: "Hen phế quản (Asthma)", points: 5 },
  { icd_code: "J96.9", disease_name: "Suy hô hấp", points: 6 },
  { icd_code: "I50.9", disease_name: "Suy tim (Heart failure)", points: 6 },
  {
    icd_code: "E10.9",
    disease_name: "Tiểu đường type 1 (Phụ thuộc Insulin)",
    points: 4,
  },
  { icd_code: "N17.9", disease_name: "Suy thận cấp", points: 5 },
  { icd_code: "K50.9", disease_name: "Bệnh Crohn", points: 5 },
  {
    icd_code: "K51.9",
    disease_name: "Viêm loét đại tràng (Ulcerative colitis)",
    points: 5,
  },
  { icd_code: "R56.0", disease_name: "Co giật do sốt", points: 4 },

  // ===============================
  // NHÓM 5: LOW RISK (1–3)
  // ===============================
  { icd_code: "K59.0", disease_name: "Táo bón (Constipation)", points: 2 },
  { icd_code: "R14", disease_name: "Đầy hơi và chướng bụng", points: 2 },
  {
    icd_code: "K30",
    disease_name: "Chứng khó tiêu chức năng (Dyspepsia)",
    points: 1,
  },
  {
    icd_code: "R10.4",
    disease_name: "Đau bụng khác và không xác định",
    points: 3,
  },
  { icd_code: "R11", disease_name: "Buồn nôn và nôn", points: 2 },
  {
    icd_code: "K21.9",
    disease_name: "Trào ngược dạ dày thực quản (GERD)",
    points: 2,
  },
  { icd_code: "K29.7", disease_name: "Viêm dạ dày (Gastritis)", points: 2 },
  { icd_code: "J00", disease_name: "Viêm mũi họng cấp (Cảm lạnh)", points: 1 },
  { icd_code: "J02.9", disease_name: "Viêm họng cấp", points: 1 },
  { icd_code: "J06.9", disease_name: "Nhiễm trùng hô hấp trên", points: 1 },
  { icd_code: "J20.9", disease_name: "Viêm phế quản cấp", points: 2 },
  { icd_code: "H66.9", disease_name: "Viêm tai giữa", points: 2 },
  { icd_code: "B05.9", disease_name: "Sởi", points: 3 },
  { icd_code: "B01.9", disease_name: "Thủy đậu", points: 2 },
  { icd_code: "B26.9", disease_name: "Quai bị", points: 2 },
  {
    icd_code: "K40.9",
    disease_name: "Thoát vị bẹn (Inguinal hernia)",
    points: 3,
  },
  {
    icd_code: "K42.9",
    disease_name: "Thoát vị rốn (Umbilical hernia)",
    points: 3,
  },
  { icd_code: "L20.9", disease_name: "Viêm da cơ địa", points: 1 },
  { icd_code: "R50.9", disease_name: "Sốt không rõ nguyên nhân", points: 2 },
  { icd_code: "N39.0", disease_name: "Nhiễm trùng đường tiết niệu", points: 3 },
  { icd_code: "K02.9", disease_name: "Sâu răng", points: 1 },
  { icd_code: "R05", disease_name: "Ho", points: 1 },
  { icd_code: "R51", disease_name: "Đau đầu", points: 1 },  
  { icd_code: "R63.0", disease_name: "Chán ăn", points: 1 },
];

const age = [
  { min_age: 0, max_age: 3, points: 3 }, // -- Dưới 3 tháng: Nguy cơ cao (Ruột mỏng)
  { min_age: 3, max_age: 12, points: 1 }, //-- 3 tháng đến 3 tuổi: An toàn nhất (Target)
  { min_age: 12, max_age: 780, points: 0 }, //-- -- 3 tuổi - 5 tuổi: Cảnh báo nhẹ
  { min_age: 780, max_age: 1200, points: 2 }, //; -- Trên 5 tuổi: Nguy cơ nguyên nhân thực thể (U/Polyp)
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
    device_code: "AIRMAC 01",
    room_id: "101",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "AIRMAC 02",
    room_id: "102",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "AIRMAC 03",
    room_id: "103",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "AIRMAC 04",
    room_id: "104",
    device_status: "READY",
    current_level: 0,
  },
  {
    device_code: "AIRMAC 05",
    room_id: "105",
    device_status: "READY",
    current_level: 0,
  },
];

const setupLevelRules = [
  {
    min_value: 0,
    max_value: 5,
    risk_level: 1,
    status: "Stable",
    color_code: "#28a745",
    threshold_value: 0.2,
  },
  {
    min_value: 6,
    max_value: 15,
    risk_level: 2,
    status: "Moderate",
    color_code: "#ffc107",
    threshold_value: 0.3,
  },
  {
    min_value: 16,
    max_value: 25,
    risk_level: 3,
    status: "Serious",
    color_code: "#fd7e14",
    threshold_value: 0.4,
  },
  {
    min_value: 26,
    max_value: 100,
    risk_level: 4,
    status: "Critical",
    color_code: "#dc3545",
    threshold_value: 0.5,
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
        [icd.icd_code, icd.disease_name, icd.points]
      );
    }
    const resultDiseases = await database.query(
      "SELECT count(*) FROM icd_mapping"
    );
    const countDiseases = parseInt(resultDiseases.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countDiseases} bản ghi) ICD - 10. Bỏ qua bước nạp.`
    );

    // =======================
    // SEED AGE_RULES
    // =======================
    console.log("🔄 Đang xử lý bảng Age Rules...");

    for (let item of age) {
      await database.query(
        "INSERT INTO age_rules (min_age, max_age, points) VALUES ($1, $2, $3) ON CONFLICT (min_age, max_age) DO NOTHING",
        [item.min_age, item.max_age, item.points]
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
        "INSERT INTO airmacs (device_code, room_id, device_status, current_level) VALUES ($1, $2, $3, $4) ON CONFLICT (device_code, room_id) DO NOTHING",
        [item.device_code, item.room_id, item.device_status, item.current_level]
      );
    }
    const resultDevice = await database.query("SELECT count(*) FROM airmacs");
    const countDevice = parseInt(resultDevice.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countDevice} bản ghi) devices. Bỏ qua bước nạp.`
    );

    // =======================
    // SEED SCORING_RULES
    // =======================
    for (let item of vitalRules) {
      await database.query(
        "INSERT INTO scoring_rules (rule_category, min_value, max_value, points) VALUES ($1, $2, $3, $4) ON CONFLICT (min_value, max_value) DO NOTHING",
        [item.rule_category, item.min_value, item.max_value, item.points]
      );
    }
    const resultScoring = await database.query(
      "SELECT count(*) FROM scoring_rules"
    );
    const countScoring = parseInt(resultScoring.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countScoring} bản ghi) Scoring. Bỏ qua bước nạp.`
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
        ]
      );
    }
    const resultSetupLv = await database.query(
      "SELECT count(*) FROM setup_level_rules"
    );
    const countSetupLv = parseInt(resultSetupLv.rows[0].count);
    console.log(
      `✅ Dữ liệu đã có (${countSetupLv} bản ghi) setup_level. Bỏ qua bước nạp.`
    );
  } catch (err) {
    console.error("❌ Lỗi khi nạp dữ liệu mẫu:", err);
  }
};

module.exports = seedDatabase;
