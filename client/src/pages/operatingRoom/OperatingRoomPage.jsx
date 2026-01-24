import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";
import { useManagerForm } from "../../hooks/useManagerForm";
import { formatAgeString } from "../../utils/formatAgeString";
import { formatGender } from "../../utils/formatGender";
import { DiseaseSelect } from "../../components/select/DiseaseSelect";
import { useSuggestedLevel } from "../../hooks/useSuggestedLevel";
import { useUpdateLevel } from "../../hooks/useUpdateLevel";
import { usePatientContext } from "../../contexts/PatientContext";
import { useCustomHeader } from "../../hooks/useCustomHeader";

export const OperatingRoomPage = () => {
  const { dataList, refetch, setDataList, handleUpdateListGlobal } =
    usePatientContext();
  const {
    formData,
    setFormData,
    selectedDisease,
    handleInputChange,
    handleSubmitForm,
    handleDobChange,
    ageDisplay,
    dob,
    allDevices,
    selectedDeviceId,
    handleSearchDiseases,
    handleSelectionChange,
    handleFillFormData,
  } = useManagerForm(refetch);

  const { handleOpenSuggestOpen, isOpen, setIsOpen } = useSuggestedLevel();

  const {
    handleInputThresholdChange,
    onSaveClick,
    levelInput,
    warning,
    setWarning,
  } = useUpdateLevel();

  const {setIsOpen:setIsOpenList} = useCustomHeader();
  const closeList = () => setIsOpenList(prev => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSaveClick({
        patientId: formData.patientId,
        setFormData: setFormData,
        setIsOpen: setIsOpen,
        setDataList: setDataList,
        handleUpdateList: handleUpdateListGlobal,
      });
    }
  };

  const handleSaveButton = () => {
    onSaveClick({
      patientId: formData.patientId,
      setFormData: setFormData,
      setIsOpen: setIsOpen,
      handleUpdateList: handleUpdateListGlobal,
    });
  };

  const handleCancel = () => {
    setWarning("");
    setIsOpen(false);
  };

  const currentDeviceData = allDevices.find(
    (device) => device.id == selectedDeviceId,
  );

  return (
    <main className="w-full min-h-screen p-4 bg-main-gradient">
      <form
        action=""
        className="box-border flex flex-col gap-4 w-full h-full"
        onSubmit={handleSubmitForm}
      >
        {/* 1. STATUS BAR */}
        <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
          <div className="flex gap-10">
            <div className="text-lg font-serif">
              At Room:{" "}
              <span className="font-bold font-sans">
                {currentDeviceData ? currentDeviceData.room_id : "---"}
              </span>
            </div>
            <div className="text-lg font-serif">
              AIRMAC in use:{" "}
              <span className="font-bold font-sans">
                {currentDeviceData ? currentDeviceData.device_code : "---"}
              </span>
            </div>
            <div className="text-lg font-serif">
              Device Status:{" "}
              <span className="font-bold text-green-500">READY</span>
            </div>
          </div>
        </section>
        {/* 1. MAIN */}
        <div className="relative flex flex-col lg:flex-row gap-4 w-full" onClick={closeList}>
          {/* a. patient queue */}
          <section className="bg-white w-full lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[28%] lg:h-auto h-[50dvh] shadow-xl p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold font-serif mb-4">Patient List</p>
              <div className="rounded-full w-9 h-9 text-lg flex justify-center items-center bg-primary-gradient font-bold">
                {dataList.length}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
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
                      className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4 cursor-pointer active:scale-98"
                      key={item.patient_id}
                      onClick={() => handleFillFormData(item)}
                    >
                      <div className="flex justify-between">
                        <Label className="text-xl">{item.full_name}</Label>
                        <div
                          className="text-lg py-1 px-2 border-l-4 font-bold font-serif rounded-xl"
                          style={{
                            backgroundColor: `${processColor}70`,
                            borderColor: processColor,
                            color: processColor,
                          }}
                        >
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
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-4 w-full lg:ml-[29%]">
            {/* b. patient form */}
            <section className="flex flex-col  gap-2 w-full h-[70dvh] lg:h-fit bg-white shadow-lg p-4 rounded-lg overflow-y-auto">

              <div className="border-b-2 border-gray-500 bg-gray-200 p-3 rounded-xl">
                <div className=" flex flex-col sm:flex-row justify-between">
                  <Label className="text-2xl mb-2">
                    {formData.fullName ? formData.fullName : "Patient Name"}
                  </Label>
                  <div className="flex gap-4 justify-self-start items-center">
                    <Label className="text-xl">Status:</Label>
                    <div
                      className="py-1 px-2 border-l-4 font-bold font-serif rounded-lg text-sky-700"
                      style={{
                        backgroundColor: `${formData.color}50`,
                        borderColor: formData.color,
                        color: formData.color,
                      }}
                    >
                      {formData.status ? formData.status : "Unknown"}
                    </div>
                    <div
                      className="py-1 px-2 border-l-4 font-bold font-serif rounded-lg text-sky-700"
                      style={{
                        backgroundColor: `${formData.color}70`,
                        borderColor: formData.color,
                        color: formData.color,
                      }}
                    >
                      Level <span className="font-sans">{formData.level}</span>
                    </div>
                  </div>
                </div>
                <Label className="ml-4">
                  <span className="font-sans font-medium text-sky-600">
                    {formatAgeString(formData.age)}
                  </span>{" "}
                  • {formatGender(formData.gender)}
                </Label>
              </div>

              <Label>Full Name *</Label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter Patient Name"
                name="fullName"
                required
              />

              <div className="flex flex-col sm:flex-row gap-3">
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
                    value={ageDisplay}
                    placeholder="Auto-calculated"
                    className="cursor-not-allowed bg-gray-200"
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
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Row one */}
                  <div className="flex flex-col gap-2 w-full ">
                    <Label>Heart (bpm)</Label>
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
                    <Label>Respiration Rate</Label>
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
                    <Label>SpO2 (%)</Label>
                    <Input
                      type="number"
                      placeholder="≥ 96%"
                      value={formData.spo2}
                      onChange={handleInputChange}
                      name="spo2"
                      min="0"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full ">
                    <Label>Temperature (°C)</Label>
                    <Input
                      type="number"
                      placeholder="36 - 38°C"
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
                    <Label>Blood Pressure (Systolic)</Label>
                    <Input
                      type="number"
                      placeholder="111 - 219 mmHg"
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
                <Button
                  className="mt-4 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                  type="submit"
                >
                  Save Patient Changes
                </Button>
              </div>
            </section>
            {/* Operation Level */}
            <section className="h-fit lg:w-[29%] bg-white shadow-xl p-4 overflow-auto scrollbar-custom rounded-lg">
              <div className="flex flex-col">
                <p className="text-2xl font-bold font-serif mb-4">
                  Operation Level
                </p>
                <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
                  <Label>Suggested Level</Label>
                  <Label className="text-4xl font-sans">{formData.level}</Label>
                  {isOpen ? (
                    <>
                      <Input
                        type="number"
                        placeholder="Enter your Level"
                        name="suggestedLevel"
                        value={levelInput.suggestedLevel}
                        onChange={(e) => {
                          handleInputThresholdChange(e);
                          setWarning("");
                        }}
                        min="0"
                        onKeyDown={handleKeyDown}
                        className={`max-w-40 ${warning ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        required
                      />
                      {warning && (
                        <span className="text-red-500 text-sm mt-1 animate-pulse">
                          {warning}
                        </span>
                      )}
                      <div className="flex gap-4">
                        <Button
                          className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                          type="button"
                          onClick={handleSaveButton}
                        >
                          Save
                        </Button>

                        <Button
                          onClick={handleCancel}
                          type="button"
                          className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-transparent active:scale-98 text-gray-500 hover:text-red-500 hover:bg-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button
                      className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98"
                      type="button"
                      onClick={handleOpenSuggestOpen}
                    >
                      Changes
                    </Button>
                  )}
                </div>

                <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
                  <Label>Alarm Threshold (LPM)</Label>
                  <Label className="text-4xl font-sans">
                    {formData.threshold}
                  </Label>
                </div>
                <Button className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98">
                  CONFIRM AND SETUP
                </Button>
              </div>
            </section>
          </div>
        </div>
      </form>
    </main>
  );
};
