// components/CalendarCell.tsx
import dayjs from "dayjs";

interface Props {
  date: dayjs.Dayjs;
  currentMonth: dayjs.Dayjs;
}

const CalendarCell = ({ date, currentMonth }: Props) => {
  const isToday = date.isSame(dayjs(), "day");
  const isCurrentMonth = date.month() === currentMonth.month();

  return (
    <div
      className={`
        border p-2 h-24 rounded cursor-pointer relative
        ${!isCurrentMonth ? "bg-gray-100 text-gray-400" : ""}
        ${isToday ? "border-blue-500" : ""}
      `}
    >
      <div className="text-sm font-semibold">{date.date()}</div>

      {/* Sau này hiển thị todos ở đây */}
      {/* <div className="text-xs mt-1 text-green-600">+ 2 todos</div> */}
    </div>
  );
};

export default CalendarCell;
