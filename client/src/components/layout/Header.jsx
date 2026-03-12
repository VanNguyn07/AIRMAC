import { NavLink } from "react-router-dom";
import { Button } from "../common/Button";
import { Bold, User, Wind, Menu, X, Languages } from "lucide-react";
import { useCustomHeader } from "../../hooks/useCustomHeader";
import { useLanguage } from "../../contexts/LanguageContext";

export const Header = () => {
  const { handleCustomHeader, isOpen } = useCustomHeader();
  const { language, setLanguage, t } = useLanguage();

  const getLinkClass = ({ isActive }) => {
    return isActive
      ? "text-xl text-white font-serif px-5 py-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-1 focus:bg-primary-hover bg-primary-gradient shadow-lg border-2"
      : "text-lg text-slate-300 font-serif hover:text-white hover:bg-white/10 px-5 py-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:bg-primary-hover";
  };
  return (
    <header className="flex justify-between bg-primary-gradient items-center px-8 py-6 border-b-4 border-sky-700 sticky top-0 z-50">
      <div className="filter brightness-125 flex gap-2">
        <Wind size={48} className="text-sky-400" />
        <h1 className="text-4xl font-serif tracking-widest">AIRMAC</h1>
      </div>
      <nav className="hidden lg:flex gap-10">
        <NavLink to="/clinic" className={getLinkClass}>
          {t("clinic")}
        </NavLink>
        <NavLink to="/operatingRoom" className={getLinkClass}>
          {t("operatingRoom")}
        </NavLink>
        <NavLink to="/chartMonitor" className={getLinkClass}>
          {t("chartMonitor")}
        </NavLink>
        <NavLink to="/report" className={getLinkClass}>
          {t("report")}
        </NavLink>
        <NavLink to="/history" className={getLinkClass}>
          {t("history")}
        </NavLink>
      </nav>
      <div className="hidden lg:flex gap-2">
        <div className="flex justify-center items-center">
          <Button className="bg-primary-gradient text-xl gap-2 rounded-2xl font-serif">
            <User size={24} fontWeight={Bold} /> {t("drAdmin")}
          </Button>
        </div>
        <div className="hidden lg:flex items-center border border-gray-300 px-1 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
          <Languages size={20} className="text-gray-600" />

          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent outline-none cursor-pointer font-semibold text-gray-700"
          >
            <option value="en">EN</option>
            <option value="vi">VI</option>
          </select>
        </div>
      </div>
      <Button
        onClick={handleCustomHeader}
        className="lg:hidden flex justify-end items-center w-11 p-2"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </Button>
      {isOpen && (
        <div className="flex flex-col gap-3 p-2 lg:hidden absolute top-20 right-0 bg-sky-700 rounded-xl shadow-2xl text-slate-800 animate-in fade-in zoom-in duration-200 z-101">
          <div className="absolute -top-2.5 right-11 border-l-10 border-r-10 border-b-10 border-transparent border-b-sky-700"></div>
          <nav className="flex flex-col gap-3">
            <NavLink to="/clinic" className={getLinkClass}>
              {t("clinic")}
            </NavLink>
            <NavLink to="/operatingRoom" className={getLinkClass}>
              {t("operatingRoom")}
            </NavLink>
            <NavLink to="/chartMonitor" className={getLinkClass}>
              {t("chartMonitor")}
            </NavLink>
            <NavLink to="/report" className={getLinkClass}>
              {t("report")}
            </NavLink>
            <NavLink to="/history" className={getLinkClass}>
              {t("history")}
            </NavLink>
          </nav>
          <div className="flex">
            <div className="flex justify-center items-center">
              <Button className="bg-primary-gradient text-xl gap-2 rounded-2xl font-serif">
                <User size={24} fontWeight={Bold} /> {t("drAdmin")}
              </Button>
            </div>
          </div>
          <div className="flex items-center border border-gray-300 px-1 rounded-2xl bg-white shadow-sm hover:shadow-md transition w-20">
              <Languages size={20} className="text-gray-600" />

              <select
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-semibold text-gray-700"
              >
                <option value="en">EN</option>
                <option value="vi">VI</option>
              </select>
            </div>
        </div>
      )}
    </header>
  );
};
