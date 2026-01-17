import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";
import { DiseaseSelect } from "../../components/select/DiseaseSelect";
import { useFetchAllData } from "../../hooks/useFetchAllData";
import { useManagerForm } from "../../hooks/useManagerForm";
import { formatAgeString } from "../../utils/formatAgeString";
import { formatGender } from "../../utils/formatGender";
export const ClinicPage = () => {
  const { dataList, refetch } = useFetchAllData();
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
    <main>
      <form
        action=""
        className="bg-main-gradient w-full box-border p-4 space-y-4"
        onSubmit={handleSubmitForm}
      >
        {/* 1. STATUS BAR */}
        <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
          <div className="flex gap-5">
            <div className="text-lg font-serif">
              Available Rooms:{" "}
              <span className="font-bold font-sans">
                {readyDevices.length} / {allDevices.length}
              </span>
            </div>
            <div className="text-lg font-serif">
              Device Status:{" "}
              <span className="font-bold text-green-500">
                {readyDevices.length > 0 ? "READY" : "FULL"}
              </span>
            </div>
          </div>
        </section>
        {/* 1. MAIN */}
        {/* a. patient form */}
        <div className="flex gap-4">
          <section className="flex flex-col gap-2 w-[70%] h-128 bg-white shadow-lg p-4 overflow-auto scrollbar-custom rounded-lg">
            <p className="text-2xl font-bold font-serif">
              Patient Admission Form
            </p>
            <Label>Full Name *</Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter Patient Name"
              onChange={handleInputChange}
              required
            />

            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full ">
                <Label>Date of Birth *</Label>
                <Input
                  type="date"
                  className="cursor-pointer"
                  value={dob}
                  onChange={handleDobChange}
                  required
                />
              </div>

              <div className=" flex flex-col gap-2 ">
                <Label>Age</Label>
                <Input
                  type="text"
                  placeholder="Auto-calculated"
                  className="cursor-not-allowed bg-gray-200"
                  value={ageDisplay}
                  readOnly
                />
              </div>

              <div className=" flex flex-col gap-2">
                <Label>Gender</Label>
                <select
                  className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
                  value={formData.gender}
                  onChange={handleInputChange}
                  name="gender"
                >
                  <option value="" disabled hidden>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <p className="text-2xl font-bold font-serif mt-2">
              Vital Signs (NEWS<span className="font-sans">2</span>)
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                {/* Row one */}
                <div className="flex flex-col gap-2 w-full ">
                  <Label>Heart (bpm)</Label>
                  <Input
                    type="number"
                    value={formData.hr}
                    name="hr"
                    onChange={handleInputChange}
                    placeholder="59-90 beats / minutes"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full ">
                  <Label>Respiration Rate</Label>
                  <Input
                    type="number"
                    name="rr"
                    value={formData.rr}
                    onChange={handleInputChange}
                    placeholder="12-20 breaths / minutes"
                    required
                  />
                </div>
              </div>
              {/* Row 2 */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full ">
                  <Label>SpO2 (%)</Label>
                  <Input
                    type="number"
                    value={formData.spo2}
                    onChange={handleInputChange}
                    placeholder="≥ 96%"
                    name="spo2"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 w-full ">
                  <Label>Temperature (°C)</Label>
                  <Input
                    type="number"
                    value={formData.tem}
                    onChange={handleInputChange}
                    placeholder="36 - 38°C"
                    name="tem"
                    required
                  />
                </div>
              </div>
              {/* Row three */}
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-full ">
                  <Label>Blood Pressure (Systolic)</Label>
                  <Input
                    type="number"
                    value={formData.bp_sys}
                    onChange={handleInputChange}
                    placeholder="111 - 219 mmHg"
                    name="bp_sys"
                    required
                  />
                </div>
              </div>

              {/* Row four */}
              <div className="flex flex-col gap-2 w-full ">
                <Label>
                  Diagnosis (ICD- <span className="font-sans">10</span>) -
                  Multi-select
                </Label>
                <DiseaseSelect
                  onChange={handleSelectionChange}
                  value={selectedDisease}
                  loadOptions={handleSearchDiseases}
                  name="icdMapping"
                />
              </div>
              {/* Row five */}
              <div className="flex flex-col gap-2 w-full ">
                <Label>Select Room *</Label>
                <select
                  value={selectedDeviceId}
                  onChange={handleSelectedChange}
                  className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover font-sans"
                >
                  <option value="" disabled hidden>
                    Select available room
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
                Add to Waiting List
              </Button>
            </div>
          </section>

          {/* b. patient queue */}
          <section className="w-[30%] h-128 bg-white -gradient shadow-xl p-4 overflow-auto scrollbar-custom rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold font-serif mb-4">
                Patient Waiting List
              </p>
              <div className="rounded-full w-9 h-9 text-lg flex justify-center items-center bg-primary-gradient font-bold">
                {dataList.length}
              </div>
            </div>

            {dataList.length === 0 ? (
              <p className="text-gray-500 text-center italic">
                No patients in queue
              </p>
            ) : (
              dataList.map((item) => {
                const color = item.color_code;
                let processColor;
                const statusColor = {
                  PENDING: "#FFC107",
                  IN_PROGRESS: "#2196F3",
                  DONE: "#4CAF50",
                };
                processColor = statusColor[item.process_status];
                return (
                  <div
                    className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4"
                    key={item.patient_id}
                  >
                    <div className="flex justify-between">
                      <Label className="text-xl">{item.full_name}</Label>
                      <div className="text-lg py-1 px-2 border-l-4 font-bold font-serif rounded-xl"
                      style={{
                        backgroundColor: `${processColor}70`,
                        borderColor: processColor,
                        color: processColor
                      }}>
                        {item.process_status}
                      </div>
                    </div>
                    <Label>
                      Age:{" "}
                      <span className="font-sans font-medium text-sky-600">
                        {formatAgeString(item.age)}
                      </span>{" "}
                      • {formatGender(item.gender)}
                    </Label>
                    <Label>
                      At room:{" "}
                      <span className="font-sans font-medium text-sky-600">
                        {item.room_id}
                      </span>
                    </Label>
                    <div className="flex gap-4 justify-self-start items-center">
                      <Label>Status:</Label>
                      <div
                        className="py-1 px-2 border-l-4 font-bold font-serif rounded-lg"
                        style={{
                          backgroundColor: `${color}70`,
                          borderColor: color,
                          color: color,
                        }}
                      >
                        {item.final_status}
                      </div>
                      <div
                        className="py-1 px-2 font-bold font-serif rounded-lg"
                        style={{
                          backgroundColor: `${color}70`,
                          borderColor: color,
                          color: color,
                        }}
                      >
                        Level{" "}
                        <span className="font-sans">{item.risk_level}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </div>
      </form>
    </main>
  );
};
