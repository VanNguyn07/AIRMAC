import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";

export const OperatingRoomPage = () => {
  return (
    <main className="bg-main-gradient w-full box-border p-4 space-y-4">
      {/* 1. STATUS BAR */}
      <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
        <div className="flex gap-10">
          <div className="text-lg font-serif">
            At Room: <span className="font-bold font-sans">101</span>
          </div>
          <div className="text-lg font-serif">
            AIRMAC in use:{" "}
            <span className="font-bold font-sans">AIRMAC 01</span>
          </div>
          <div className="text-lg font-serif">
            Device Status:{" "}
            <span className="font-bold text-green-500">Ready</span>
          </div>
        </div>
      </section>
      {/* 1. MAIN */}
      <div className="flex gap-4">
        {/* a. patient queue */}
        <section className="w-[25%] h-128 bg-white -gradient shadow-xl p-4 overflow-auto scrollbar-custom rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold font-serif mb-4">Patient List</p>
            <div className="rounded-full w-9 h-9 text-lg flex justify-center items-center bg-primary-gradient font-bold">
              4
            </div>
          </div>
          <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4 cursor-pointer active:scale-98">
            <Label>Shiron</Label>
            <Label>
              <span className="font-sans"> 19</span> Years • Male
            </Label>
            <Label>
              <span className="font-sans"> K56.1</span>
            </Label>
            <div className="flex gap-3 justify-self-start items-center">
              <Label>Status:</Label>
              <div className="py-1 px-2 border-l-4 border-green-500 rounded-lg bg-green-300 text-green-700 font-bold font-serif">
                Stable
              </div>
              <div className="py-1 px-2 border-green-500 rounded-lg bg-green-300 text-green-700 font-bold font-serif">
                Level <span className="font-sans">1</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4  cursor-pointer active:scale-98">
            <Label>Kelvin</Label>
            <Label>
              <span className="font-sans"> 19</span> Years • Male
            </Label>
            <Label>
              <span className="font-sans"> K56.1</span>
            </Label>
            <div className="flex gap-1 justify-self-start items-center">
              <Label>Status:</Label>
              <div className="py-1 px-2 border-l-4 border-yellow-500 rounded-lg bg-yellow-300 text-yellow-500 font-bold font-serif">
                Moderate
              </div>
              <div className="py-1 px-2 border-yellow-500 rounded-lg bg-yellow-300 text-yellow-500 font-bold font-serif">
                Level <span className="font-sans">2</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4  cursor-pointer active:scale-98">
            <Label>Sofia</Label>
            <Label>
              <span className="font-sans">20</span> Years • Female
            </Label>
            <Label>
              <span className="font-sans"> K56.2 - K56.3</span>
            </Label>
            <div className="flex gap-3 justify-self-start items-center">
              <Label>Status:</Label>
              <div className="py-1 px-2 border-l-4 border-orange-500 rounded-lg bg-orange-300 text-orange-500 font-bold font-serif">
                Serious
              </div>
              <div className="py-1 px-2 border-orange-500 rounded-lg bg-orange-300 text-orange-500 font-bold font-serif">
                Level <span className="font-sans">3</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4  cursor-pointer active:scale-98">
            <Label>Mon</Label>
            <Label>
              <span className="font-sans">10</span> Years • Female
            </Label>
            <Label>
              <span className="font-sans"> K55.2 - K55.3</span>
            </Label>
            <div className="flex gap-3 justify-self-start items-center">
              <Label>Status:</Label>
              <div className="py-1 px-2 border-l-4 border-red-500 rounded-lg bg-red-300 text-red-700 font-bold font-serif">
                Ctitical
              </div>
              <div className="py-1 px-2 border-red-500 rounded-lg bg-red-300 text-red-700 font-bold font-serif">
                Level <span className="font-sans">4</span>
              </div>
            </div>
          </div>
        </section>

        {/* b. patient form */}
        <section className="flex flex-col gap-2 w-[75%] h-128 bg-white shadow-lg p-4 overflow-auto scrollbar-custom rounded-lg">
          <div className="border-b-2 border-gray-500 bg-gray-300 p-2 rounded-xl">
            <div className=" flex justify-between">
              <p className="text-3xl font-bold font-serif">Shiron</p>
              <div className="flex gap-4 justify-self-start items-center">
                <Label className="text-xl">Status:</Label>
                <div className="py-1 px-2 border-l-4 border-green-500 rounded-lg bg-green-300 text-green-700 font-bold font-serif">
                  Stable
                </div>
                <div className="py-1 px-2 border-green-500 rounded-lg bg-green-300 text-green-700 font-bold font-serif">
                  Level <span className="font-sans">1</span>
                </div>
              </div>
            </div>
            <Label className="ml-4">
              <span className="font-sans"> 19</span> Years • Male
            </Label>
          </div>

          <Label>Full Name *</Label>
          <Input
            type="text"
            placeholder="Enter Patient Name"
            name="fullName"
            required
          />

          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-full ">
              <Label>Date of Birth *</Label>
              <Input type="date" className="cursor-pointer" required />
            </div>

            <div className=" flex flex-col gap-2 ">
              <Label>Age</Label>
              <Input
                type="text"
                placeholder="Auto-calculated"
                className="cursor-not-allowed bg-gray-200"
                readOnly
              />
            </div>

            <div className=" flex flex-col gap-2">
              <Label>Gender</Label>
              <select className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
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
                  placeholder="59-90 beats / minutes"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 w-full ">
                <Label>Respiration Rate</Label>
                <Input
                  type="number"
                  placeholder="12-20 breaths / minutes"
                  required
                />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full ">
                <Label>SpO2 (%)</Label>
                <Input type="number" placeholder="≥ 96%" required />
              </div>

              <div className="flex flex-col gap-2 w-full ">
                <Label>Temperature (°C)</Label>
                <Input type="number" placeholder="36 - 38°C" required />
              </div>
            </div>
            {/* Rouw three */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-2 w-full ">
                <Label>Blood Pressure (Systolic)</Label>
                <Input type="number" placeholder="111 - 219 mmHg" required />
              </div>
            </div>
            {/* Rouw four */}
            <div className="flex flex-col gap-2 w-full ">
              <Label>Diagnosis (ICD-10) - Multi-select</Label>
              <Input
                type="text"
                autoComplete="off"
                placeholder="Type diagnosis code or name (e.g., K56, Intussusception)"
                required
              />
            </div>
            <Button className="mt-4 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98">
              Save Patient Changes
            </Button>
          </div>
        </section>
        {/* Operation Level */}
        <section className="w-[20%] h-128 bg-white -gradient shadow-xl p-4 overflow-auto scrollbar-custom rounded-lg">
          <div className="flex flex-col">
            <p className="text-2xl font-bold font-serif mb-4">
              Operation Level
            </p>
            <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
              <Label>Suggested Level</Label>
              <Label className="text-4xl font-sans">1</Label>
              <Button className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98">
                Changes
              </Button>
            </div>

            <div className="flex flex-col gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-200 mb-4">
              <Label>Alarm Threshold (LPM)</Label>
              <Label className="text-4xl font-sans">0.2</Label>
            </div>
            <Button className="mt-2 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-98">
              CONFIRM AND SETUP
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};
