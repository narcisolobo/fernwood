import { type DaySchedule } from "@/lib/schedule";
import ClassCard from "./ClassCard";

interface WeekCardListProps {
  day: DaySchedule;
  defaultName: string | null;
  isLast: boolean;
}

function WeekCardList({ day, defaultName, isLast }: WeekCardListProps) {
  return (
    <div>
      <div className="badge badge-soft badge-neutral border-base-200 mb-3 w-full border text-left">
        <span className="font-display font-semibold">{day.weekday}</span>{" "}
        <span className="text-base-content/80">{day.dateLabel}</span>
      </div>
      {day.classes.length === 0 ? (
        <p className="text-base-content/80 py-4 text-center text-sm">
          No classes scheduled this day.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {day.classes.map((cls) => (
            <ClassCard
              key={cls.id}
              date={day.date}
              defaultName={defaultName}
              {...cls}
            />
          ))}
        </div>
      )}
      {!isLast && <div className="divider mx-auto w-1/2"></div>}
    </div>
  );
}

export default WeekCardList;
