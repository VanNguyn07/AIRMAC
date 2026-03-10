import { useLanguage } from "../../contexts/LanguageContext";

export const ReportPage = () => {
  const { t } = useLanguage();
  return (
    <main className="w-full min-h-screen p-4 bg-main-gradient">
      <section className="bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
        <div className="flex gap-5">
          <div className="text-lg font-serif">
            {t("availableRoomsLabel")} <span className="font-bold font-sans"></span>
          </div>
          <div className="text-lg font-serif">
            {t("deviceStatusLabel")} <span className="font-bold text-green-500"></span>
          </div>
        </div>
      </section>
    </main>
  );
};
