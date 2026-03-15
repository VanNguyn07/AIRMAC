import { useState } from "react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";
import { motion } from "framer-motion";
import { useManagerForm } from "../../hooks/useManagerForm";
import { formatAgeString } from "../../utils/formatAgeString";
import { formatGender } from "../../utils/formatGender";
import { DiseaseSelect } from "../../components/select/DiseaseSelect";
import { usePatientContext } from "../../contexts/PatientContext";
import { useCustomHeader } from "../../hooks/useCustomHeader";
import { useLanguage } from "../../contexts/LanguageContext";
import { StatusIcon } from "../../components/common/StatusIcon";
import { StatusFilter } from "../../components/common/StatusFilter";

export const OperatingRoomPage = () => {
  const { t } = useLanguage();
  const { dataList, refetch, } =
    usePatientContext();
  const {
    formData,
    selectedDisease,
    handleInputChange,
    handleDobChange,
    ageDisplay,
    dob,
    handleSearchDiseases,
    handleSelectionChange,
    handleFillFormData,
    handleUpdateForm,
    handleTabChange,
  } = useManagerForm(refetch);

  const { setIsOpen: setIsOpenList } = useCustomHeader();
  const closeList = () => setIsOpenList((prev) => !prev);

  const statusColor = {
    PENDING: "#FFC107",
    IN_PROGRESS: "#2196F3",
    DONE: "#4CAF50",
  };
  const currentProcessStatus = formData?.process_status || "";
  const currentProcessColor = statusColor[currentProcessStatus];
  const [filterStatus, setFilterStatus] = useState("ALL");

  const filteredDataList = dataList.filter((item) => {
    // Nếu chọn ALL, giữ nguyên tất cả
    if (filterStatus === "ALL") return true;
    // Nếu chọn cái khác, chỉ giữ lại những ông có process_status giống với cái đang chọn
    return item.process_status === filterStatus;
  });

  return (
    <main className="w-full min-h-screen p-4 bg-main-gradient mt-25">
      <form
        action=""
        className="box-border flex flex-col gap-4 w-full h-full"
        onSubmit={handleUpdateForm}
      >
        {/* 1. STATUS BAR */}
        <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg flex justify-between items-center ">
          <div className="flex gap-10 ">
            <div className="text-lg font-serif">
              {t("airmacInUse")}:{" "}
              <span className="font-bold font-sans">
                {formData.device_code}
              </span>
            </div>
            <div className="text-lg font-serif">
              {t("deviceStatus")}:{" "}
              <span className="font-bold text-green-500">{t("ready")}</span>
            </div>
          </div>
          {/*  */}
          <div
            className={`font-serif font-bold text-xl flex  gap-1 justify-center items-center`}
          >
            <div
              className="flex gap-1 items-center"
              style={{
                color: currentProcessColor,
                boxShadow: `0px 4px 12px ${currentProcessColor}`,
                // textShadow: `8px 4px 4px ${currentProcessColor}`,
                borderRadius: 10,
                padding: 5,
              }}
            >
              {t(currentProcessStatus)}
              <StatusIcon
                status={currentProcessStatus}
                color={currentProcessColor}
              />
            </div>
          </div>
          {/*  */}
        </section>
        {/* 1. MAIN */}
        <div
          className="relative flex flex-col lg:flex-row gap-4 w-full"
          onClick={closeList}
        >
          {/* a. patient queue */}
          <section className="bg-white w-full lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[28%] lg:h-auto h-[50dvh] shadow-xl p-4 rounded-lg flex flex-col ">
            <div className="flex justify-between items-center ">
              <p className="text-3xl font-bold font-serif mb-4">
                {t("patientList")}
              </p>
              <div className="flex gap-1.5 items-center ml-auto">
                <StatusFilter
                  value={filterStatus}
                  onChange={(newStatus) => setFilterStatus(newStatus)}
                />
                <div className="rounded-full w-9 h-9 text-lg flex justify-center items-center bg-primary-gradient font-bold">
                  {dataList.length}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto pr-1 scrollbar-thin">
              {filteredDataList.length === 0 ? (
                <p className="text-gray-500 text-center italic">
                  {t("noPatients")}
                </p>
              ) : (
                filteredDataList.map((item) => {
                  const color = item.color_code;
                  let processColor;

                  processColor = statusColor[item.process_status];
                  const isRunning = item.process_status === "IN_PROGRESS";
                  const isDone = item.process_status === "DONE";
                  return (
                    <motion.div
                      // Thêm animate khi hover: Nổi lên (y: -4) và làm tối màu lại (brightness)
                      whileHover={{ y: -4, filter: "brightness(0.97)" }}
                      transition={{ duration: 0.1 }}
                      className={`relative overflow-hidden flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4 cursor-pointer active:scale-95 transition-all duration-200 ease-in-out hover:shadow-lg ${
                        isRunning
                          ? "border bg-blue-50/20 shadow-[0_0_15px_rgba(33,150,243,0.3)]"
                          : isDone
                            ? "border-3 border-green-300 bg-green-50 "
                            : "border-3 border-yellow-300 bg-yellow-50"
                      }`}
                      key={item.patient_id}
                      onClick={() => handleFillFormData(item)}
                    >
                      {/* HIỆU ỨNG 1: Viền chạy liên tục (4 tia sáng chạy vòng quanh) - Không làm vỡ layout */}
                      {isRunning && (
                        <>
                          <motion.div
                            className="absolute top-0 left-0 h-0.75 bg-blue-500 shadow-[0_0_8px_blue]"
                            initial={{ width: "0%", opacity: 1 }}
                            animate={{ width: "100%", opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <motion.div
                            className="absolute top-0 right-0 w-0.75 bg-blue-500 shadow-[0_0_8px_blue]"
                            initial={{ height: "0%", opacity: 1 }}
                            animate={{ height: "100%", opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 0.5,
                            }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 h-0.75 bg-blue-500 shadow-[0_0_8px_blue]"
                            initial={{ width: "0%", opacity: 1 }}
                            animate={{ width: "100%", opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 1,
                            }}
                          />
                          <motion.div
                            className="absolute bottom-0 left-0 w-0.75 bg-blue-500 shadow-[0_0_8px_blue]"
                            initial={{ height: "0%", opacity: 1 }}
                            animate={{ height: "100%", opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 1.5,
                            }}
                          />
                        </>
                      )}

                      <div className="flex justify-between relative z-10">
                        <div className="flex items-center gap-2">
                          {/* HIỆU ỨNG 2: Radar ping nhấp nháy đỏ */}
                          {isRunning && (
                            <span className="relative flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80"></span>
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
                            </span>
                          )}
                          <Label className="text-2xl font-serif">
                            {item.full_name}
                          </Label>
                        </div>

                        {/* HIỆU ỨNG 3: Chữ IN_PROGRESS sáng, đổ bóng và lơ lửng */}
                        {isRunning ? (
                          <motion.div
                            animate={{ y: [-3, 3, -3] }} // Di chuyển lên xuống
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <StatusIcon
                              status={item.process_status}
                              color={processColor}
                            />
                          </motion.div>
                        ) : isDone ? (
                          <StatusIcon
                            status={item.process_status}
                            color={processColor}
                          />
                        ) : (
                          <StatusIcon
                            status={item.process_status}
                            color={processColor}
                          />
                        )}
                      </div>

                      <Label className="relative z-10">
                        {t("age")}:{" "}
                        <span className="font-sans font-medium text-sky-600">
                          {formatAgeString(item.age, t)}
                        </span>{" "}
                        • {formatGender(item.gender, t)}
                      </Label>

                      <Label className="relative z-10">
                        {t("totalScore")}
                        {": "}
                        <span className="font-sans font-medium text-sky-600">
                          {item.total_score}
                        </span>
                      </Label>

                      <div className="flex gap-4 justify-self-start items-center relative z-10">
                        <Label>{t("status")}:</Label>
                        <div
                          className="py-1 px-2 border-l-4 font-bold font-serif rounded-lg"
                          style={{
                            backgroundColor: `${color}70`,
                            borderColor: color,
                            color: color,
                          }}
                        >
                          {t(item.final_status)}
                        </div>
                        <div
                          className="py-1 px-2 font-bold font-serif rounded-lg"
                          style={{
                            backgroundColor: `${color}70`,
                            borderColor: color,
                            color: color,
                          }}
                        >
                          {t("level")}{" "}
                          <span className="font-sans">{item.risk_level}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-4 w-full lg:ml-[29%]">
            {/* b. patient form */}
            <section className="flex flex-col  gap-2 w-full h-[70dvh] lg:h-fit bg-white shadow-lg p-4 rounded-lg overflow-y-auto">
              <div className="border-b-2 border-gray-500 bg-gray-200 p-3 rounded-xl">
                <div className=" flex flex-col sm:flex-row justify-between">
                  <Label className="text-3xl mb-2 font-serif">
                    {formData.fullName ? formData.fullName : t("patientName")}
                  </Label>
                  <div className="flex gap-4 justify-self-start items-center">
                    <Label className="text-2xl font-serif">
                      {t("status")}:
                    </Label>
                    <div
                      className="py-1 px-2 border-l-4 font-bold font-sans rounded-lg text-sky-700"
                      style={{
                        backgroundColor: `${formData.color}50`,
                        borderColor: formData.color,
                        color: formData.color,
                      }}
                    >
                      {t(formData.status) ? t(formData.status) : t("unknown")}
                    </div>
                    <div
                      className="py-1 px-2 border-l-4 font-bold font-sans rounded-lg text-sky-700"
                      style={{
                        backgroundColor: `${formData.color}70`,
                        borderColor: formData.color,
                        color: formData.color,
                      }}
                    >
                      {t("level")}{" "}
                      <span className="font-sans">{formData.level}</span>
                    </div>
                  </div>
                </div>
                <Label className="ml-4">
                  <span className="font-sans font-medium text-sky-600">
                    {formatAgeString(formData.age, t)}
                  </span>{" "}
                  • {formatGender(formData.gender, t)}
                </Label>
              </div>

              <Label>{t("fullName")} *</Label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={t("enterPatientName")}
                name="fullName"
                required
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-col gap-2 w-full ">
                  <Label>{t("dateOfBirth")} *</Label>
                  <Input
                    type="date"
                    className="cursor-pointer"
                    value={dob}
                    onChange={handleDobChange}
                    required
                  />
                </div>

                <div className=" flex flex-col gap-2 ">
                  <Label>{t("age")}</Label>
                  <Input
                    type="text"
                    value={t(ageDisplay)}
                    placeholder={t("autoCalculated")}
                    className="cursor-not-allowed bg-gray-200"
                    readOnly
                  />
                </div>

                <div className=" flex flex-col gap-2">
                  <Label>{t("gender")}</Label>
                  <select
                    className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
                    value={formData.gender}
                    onChange={handleInputChange}
                    name="gender"
                  >
                    <option value="" disabled hidden>
                      {t("genderPlaceholder")}
                    </option>
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                  </select>
                </div>
              </div>

              <p className="text-2xl font-bold font-serif mt-2">
                {t("vitalSigns")}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Row one */}
                  <div className="flex flex-col gap-2 w-full ">
                    <Label>{t("heart")}</Label>
                    <Input
                      type="number"
                      value={formData.hr}
                      name="hr"
                      onChange={handleInputChange}
                      placeholder={t("heartBeatsPerMinute")}
                      min="0"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full ">
                    <Label>{t("respirationRate")}</Label>
                    <Input
                      type="number"
                      name="rr"
                      value={formData.rr}
                      onChange={handleInputChange}
                      placeholder={t("respirationPerMinute")}
                      min="0"
                      required
                    />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full ">
                    <Label>{t("spo2")}</Label>
                    <Input
                      type="number"
                      placeholder={t("spO2Placeholder")}
                      value={formData.spo2}
                      onChange={handleInputChange}
                      name="spo2"
                      min="0"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full ">
                    <Label>{t("temperature")}</Label>
                    <Input
                      type="number"
                      placeholder={t("temperaturePlaceholder")}
                      value={formData.tem}
                      onChange={handleInputChange}
                      name="tem"
                      min="0"
                      required
                    />
                  </div>
                </div>
                {/* Rouw three */}
                <div className="flex gap-3">
                  <div className="flex flex-col gap-2 w-full ">
                    <Label>{t("bloodPressure")}</Label>
                    <Input
                      type="number"
                      placeholder={t("bloodPressurePlaceholder")}
                      value={formData.bp_sys}
                      onChange={handleInputChange}
                      name="bp_sys"
                      min="0"
                      required
                    />
                  </div>
                </div>
                {/* Rouw four */}
                <div className="flex flex-col gap-2 w-full ">
                  <Label>{t("diagnosis")}</Label>
                  <DiseaseSelect
                    onChange={handleSelectionChange}
                    value={selectedDisease}
                    loadOptions={handleSearchDiseases}
                    name="icdMapping"
                  />
                </div>
                <Button
                  className=" mt-4 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                  type="submit"
                >
                  {t("savePatientChanges")}
                </Button>
              </div>
            </section>
            {/* Operation Level */}
            <section className="h-fit lg:w-[29%] bg-white shadow-xl p-4 overflow-auto scrollbar-custom rounded-lg">
              <div className="flex flex-col">
                <p className="text-2xl font-bold font-serif mb-4">
                  {t("operationLevel")}
                </p>
                <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
                  <Label>{t("suggestedLevel")}</Label>
                  <Label className="text-4xl font-sans">{formData.level}</Label>
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
                  <Label>{t("flowRate")}</Label>
                  <Label className="text-4xl font-sans">
                    {formData.threshold}
                  </Label>
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
                  <Label>{t("pressureMax")}</Label>
                  <Label className="text-4xl font-sans">
                    {formData.pressure_max}
                  </Label>
                </div>
                <Button
                  className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                  type="button"
                  onClick={() => {
                    handleTabChange(formData);
                  }}
                >
                  {t("confirmAndSetup")}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </form>
    </main>
  );
};
