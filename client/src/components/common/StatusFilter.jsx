import { Listbox } from "@headlessui/react";
import { Filter, ChevronDown, Check } from "lucide-react";

const options = [
  { id: "ALL", name: "All" },
  { id: "PENDING", name: "Pending" },
  { id: "IN_PROGRESS", name: "In Progress" },
  { id: "DONE", name: "Done" },
];

export const StatusFilter = ({ value, onChange }) => {
 const currentStatus = options.find((opt) => opt.id === value) || options[0];

  return (
    <div className="relative">
      <Listbox value={currentStatus} onChange={(selectedStatus) => onChange(selectedStatus.id)}>
        <Listbox.Button className="inline-flex items-center gap-1 px-1 py-1.5 rounded-lg bg-white hover:bg-gray-200 hover:cursor-pointer">
          <Filter size={18} className="text-gray-500" />
          <span className="text-gray-700 whitespace-nowrap">
            {currentStatus.name}
          </span>
          <ChevronDown size={18} className="text-gray-500" />
        </Listbox.Button>

        <Listbox.Options className="absolute right-0 mt-2 w-30 bg-white border rounded-lg shadow-lg z-50 ">
          {options.map((item) => (
            <Listbox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                `flex justify-between items-center px-3 py-2 text-sm cursor-pointer 
                ${active ? "bg-gray-100" : ""}`
              }
            >
              {({ selected }) => (
                <>
                  <span>{item.name}</span>
                  {selected && <Check size={18} className="text-gray-500" />}
                </>
              )}
              {item.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
