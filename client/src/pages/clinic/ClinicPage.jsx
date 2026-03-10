import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";
import { DiseaseSelect } from "../../components/select/DiseaseSelect";
import { useManagerForm } from "../../hooks/useManagerForm";
import { formatAgeString } from "../../utils/formatAgeString";
import { formatGender } from "../../utils/formatGender";
import { usePatientContext } from "../../contexts/PatientContext";
import { useLanguage } from "../../contexts/LanguageContext";
export const ClinicPage = () => {
  const { dataList, refetch } = usePatientContext();
  const { t } = useLanguage();
  const {
    formData,
    selectedDisease,
    handleInputChange,
    handleSubmitForm,
    handleDobChange,
    ageDisplay,
    dob,
    allDevices,
    handleSelectedChange,
    readyDevices,
    selectedDeviceId,
    handleSearchDiseases,
    handleSelectionChange,
  } = useManagerForm(refetch);

  return (
    <main className="w-full min-h-screen p-4 bg-main-gradient">
      <form
        action=""
        className="box-border flex flex-col gap-4 w-full h-full"
        onSubmit={handleSubmitForm}
      >
        {/* 1. STATUS BAR */}
        <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
          <div className="flex gap-5">
            <div className="text-lg font-serif">
              {t("availableRoom")}:{" "}
              <span className="font-bold font-sans">
                {readyDevices.length} / {allDevices.length}
              </span>
            </div>
            <div className="text-lg font-serif">
              {t("deviceStatus")}:{" "}
              <span className="font-bold text-green-500">
                {readyDevices.length > 0 ? t("ready") : "FULL"}
              </span>
            </div>
          </div>
        </section>
        {/* 1. MAIN */}
        {/* a. patient form */}
        <div className="relative flex flex-col lg:flex-row gap-4 w-full">
          <section className="flex flex-col  gap-2 w-full lg:w-[69%] h-[70dvh] lg:h-fit bg-white shadow-lg p-4 rounded-lg overflow-auto">
            <p className="text-2xl font-bold font-serif">
              {t("patientAdmissionForm")}
            </p>
            <Label>{t("fullName")} *</Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter Patient Name"
              onChange={handleInputChange}
              required
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col gap-2 w-full ">
                <Label>{t("dateOfBirth")}*</Label>
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
                  placeholder={t("autoCalculated")}
                  className="cursor-not-allowed bg-gray-200"
                  value={ageDisplay}
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
                    placeholder="59-90 beats / minutes"
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
                    placeholder="12-20 breaths / minutes"
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
                    value={formData.spo2}
                    onChange={handleInputChange}
                    placeholder="≥ 96%"
                    name="spo2"
                    min="0"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full ">
                  <Label>{t("temperature")}</Label>
                  <Input
                    type="number"
                    value={formData.tem}
                    onChange={handleInputChange}
                    placeholder="36 - 38°C"
                    name="tem"
                    min="0"
                    required
                  />
                </div>
              </div>
              {/* Row three */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full ">
                  <Label>{t("bloodPressure")}</Label>
                  <Input
                    type="number"
                    value={formData.bp_sys}
                    onChange={handleInputChange}
                    placeholder="111 - 219 mmHg"
                    name="bp_sys"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Row four */}
              <div className="flex flex-col gap-2 w-full ">
                <Label>{t("diagnosis")}</Label>
                <DiseaseSelect
                  onChange={handleSelectionChange}
                  value={selectedDisease}
                  loadOptions={handleSearchDiseases}
                  name="icdMapping"
                />
              </div>
              {/* Row five */}
              <div className="flex flex-col gap-2 w-full ">
                <Label>{t("selectRoom")}*</Label>
                <select
                  value={selectedDeviceId}
                  onChange={handleSelectedChange}
                  className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover font-sans"
                >
                  <option value="" disabled hidden>
                    {t("selectAvailableRooms")}
                  </option>
                  {readyDevices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {`Room ${device.room_id} - ${device.device_code}`}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                className="mt-4 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                type="submit"
              >
                {t("addToWaitingList")}
              </Button>
            </div>
          </section>

          {/* b. patient queue */}
          <section className="bg-white w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[30%] lg:h-auto h-[50dvh] shadow-xl p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold font-serif mb-4">
                {t("patientWaitingList")}
              </p>
              <div className="rounded-full w-9 h-9 text-lg flex justify-center items-center bg-primary-gradient font-bold">
                {dataList.length}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
              {dataList.length === 0 ? (
                <p className="text-gray-500 text-center italic">
                  {t("noPatients")}
                </p>
              ) : (
                dataList.map((item, index) => {
                  const color = item.color_code;
                  console.log("Check trạng thái:", `"${item.process_status}"`); 
                  let processColor;
                  const statusColor = {
                    PENDING: "#FFC107",
                    IN_PROGRESS: "#2196F3",
                    DONE: "#4CAF50",
                  };
                  processColor = statusColor[item.process_status];
                  console.log(`Item ${index}: `, item);
                  return (
                    <div
                      className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4"
                      key={item.patient_id}
                    >
                      <div className="flex justify-between">
                        <Label className="text-2xl font-serif">
                          {item.full_name}
                        </Label>
                        <div
                          className="text-lg py-1 px-2 border-l-4 font-bold font-serif rounded-xl"
                          style={{
                            backgroundColor: `${processColor}70`,
                            borderColor: processColor,
                            color: processColor,
                          }}
                        >
                          
                          {t(item.process_status)}
                        </div>
                      </div>
                      <Label>
                        {t("age")}:{" "}
                        <span className="font-sans font-medium text-sky-600">
                          {formatAgeString(item.age,t)}
                        </span>{" "}
                        • {formatGender(item.gender, t)}
                      </Label>
                      <Label>
                        {t("atRoomLabel")}{" "}
                        <span className="font-sans font-medium text-sky-600">
                          {item.room_id}
                        </span>
                      </Label>
                      <div className="flex gap-4 justify-self-start items-center">
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
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </form>
    </main>
  );
};
