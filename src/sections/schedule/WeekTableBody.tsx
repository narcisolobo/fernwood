import { type DaySchedule } from "@/lib/schedule";
import ClassRow from "./ClassRow";

interface WeekTableBodyProps {
  day: DaySchedule;
}

function WeekTableBody({ day }: WeekTableBodyProps) {
  return (
    <tbody>
      <tr className="bg-base-200">
        <td colSpan={6}>
          <span className="font-display font-semibold">{day.weekday}</span>{" "}
          <span className="text-base-content/60">{day.dateLabel}</span>
        </td>
      </tr>
      {day.classes.length === 0 ? (
        <tr>
          <td
            colSpan={6}
            className="text-base-content/60 py-4 text-center text-sm"
          >
            No classes scheduled this day.
          </td>
        </tr>
      ) : (
        day.classes.map((cls) => (
          <ClassRow key={cls.id} date={day.date} {...cls} />
        ))
      )}
    </tbody>
  );
}

export default WeekTableBody;
