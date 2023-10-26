import { useData } from "./DashboardData";

const DurationStackCard = () => {
  const { duration } = useData();

  return (
    <div className="flex flex-col align-middle justify-between h-full">
      <div className="text-4xl font-semibold text-white text-start p-4 italic">
        Weekly time summary

      </div>
      <div className="text-center w-max-[580px]" id="scroll-container">
        <p
          className="text-8xl font-bold text-white italic"

          style={{ whiteSpace: "wrap" }}

          // id="scroll-text"
        >{}
          {duration.yoga +
            duration.running +
            duration.cycling +
            duration.swimming +
            duration.boxing}
        </p>
      </div>
      <div className="text-4xl font-semibold text-white text-end p-4 italic">
        Minutes
      </div>
    </div>
  );
};

export default DurationStackCard;
