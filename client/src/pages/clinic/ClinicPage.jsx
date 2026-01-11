import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Label } from "../../components/common/Label";

export const ClinicPage = () => {
  return (
    <main className="bg-main-gradient w-full box-border p-4 space-y-4">
      {/* 1. STATUS BAR */}
      <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
        <div className="flex gap-5">
          <div className="text-lg font-serif">
            Available Rooms: <span className="font-bold font-sans">3/3</span>
          </div>
          <div className="text-lg font-serif">
            Device Status:{" "}
            <span className="font-bold text-green-500">Ready</span>
          </div>
        </div>
      </section>
      {/* 1. MAIN */}
      {/* a. patient form */}
      <div className="flex gap-4">
        <section className="flex flex-col gap-2 w-[70%] h-128.5 bg-white rounded-xl shadow-lg overflow-x-auto overflow-y-auto p-4">
          <p className="text-2xl font-bold font-serif">
            Patient Admission Form
          </p>
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
            Vital Signs (NEWS2)
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
            {/* Rouw five */}
            <div className="flex flex-col gap-2 w-full ">
              <Label>Select Room *</Label>
              <select
                defaultValue=""
                className="cursor-pointer p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
              >
                <option value="" disabled hidden>
                  Select available room
                </option>
                <option value="room-101">Room 101 - AIRMAC 01</option>
                <option value="room-102">Room 102 - AIRMAC 02</option>
                <option value="room-103">Room 103 - AIRMAC 03</option>
              </select>
            </div>
            <Button className="mt-4 hover:-translate-y-1 transition-all duration-300 bg-primary-gradient active:scale-95">
              Add to Waiting List
            </Button>
          </div>
        </section>

        {/* b. patient queue */}
        <section className="w-[30%] h-128.5 bg-white -gradient rounded-xl shadow-xl overflow-y-aut p-4"></section>
      </div>
    </main>
  );
};
