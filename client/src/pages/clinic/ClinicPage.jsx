export const ClinicPage = () => {
  return (
    <main className="bg-main-gradient w-full  box-border p-4 space-y-4">
      {/* 1. STATUS BAR */}
      <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
        <div className="flex gap-5">
          <div className="text-lg font-serif ">
            Available Rooms: <span className="font-bold">10/10</span>
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
        <section className="flex flex-col w-[70%] min-h-128.5 bg-white rounded-xl shadow-lg overflow-x-auto overflow-y-auto p-4">
          <p className="text-xl font-bold font-serif">Patient Admission Form</p>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            placeholder="Enter patient name"
            className="border"
          />
        </section>

        {/* b. patient queue */}
        <section className="w-[30%] min-h-128.5 bg-white -gradient rounded-xl shadow-xl overflow-y-aut p-4"></section>
      </div>
    </main>
  );
};
