// components/CalendarGrid.tsx
import dayjs from "dayjs";
import CalendarCell from "./CalendarCell";

interface Props {
  currentMonth: dayjs.Dayjs;
}

const CalendarGrid = ({ currentMonth }: Props) => {
  const startOfMonth = currentMonth.startOf("month");
  const startDate = startOfMonth.startOf("week"); // bắt đầu từ Chủ nhật

  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(startDate.add(i, "day"));
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {dayLabels.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <CalendarCell
            key={day.toString()}
            date={day}
            currentMonth={currentMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
