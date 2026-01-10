import { NavLink } from "react-router-dom";
import { Button } from "../common/Button";
import { Bold, User, Wind } from "lucide-react";

export const Header = () => {
  const getLinkClass = ({ isActive }) => {
    return isActive
      ? "text-xl text-white font-serif px-5 py-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-1 focus:bg-primary-hover bg-primary-gradient shadow-lg border-2"
      : "text-lg text-slate-300 font-serif hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:bg-primary-hover";
  };
  return (
    <header className="flex justify-between bg-primary-gradient items-center px-8 py-6 border-b-4 border-sky-700">
      <div className="filter brightness-125 flex gap-2">
        <Wind size={48} className="text-sky-400" />
        <h1 className="text-4xl font-serif tracking-widest">AIRMAC</h1>
      </div>
      <nav className="flex gap-10">
        <NavLink to="/clinic" className={getLinkClass}>Clinic</NavLink>
        <NavLink to="/operatingRoom" className={getLinkClass}>Operating Room</NavLink>
      </nav>
      <div className="flex">
        <div className="flex justify-center items-cente">
          <Button className="bg-primary-gradient text-xl gap-2 rounded-2xl font-serif">
            <User size={24} fontWeight={Bold} /> Dr. Admin
          </Button>
        </div>
      </div>
    </header>
  );  
};
