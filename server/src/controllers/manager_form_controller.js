const manager_form_model = require("../models/manager_form_model");

const managerFormController = {
  handleAddForm: async (request, response) => {
    try {
      const data = request.body;
      console.log("Dữ liệu nhận được:", data);
      const result = await manager_form_model.addForm(data);
      if (result.success) {
        console.log("add form into database success");
      }
      return response.status(200).json({
        success: true,
        message: "Lưu hồ sơ thành công!",
        data: result,
      });
    } catch (err) {
      console.error("Lỗi Controller addForm:", err);
      return response.status(500).json({ message: "Lỗi Server" });
    }
  },
};
module.exports = managerFormController;
