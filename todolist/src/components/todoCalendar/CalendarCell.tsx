// components/CalendarCell.tsx
import dayjs from "dayjs";
import type { Todo } from "../../types/todo";
interface Props {
  date: dayjs.Dayjs;
  currentMonth: dayjs.Dayjs;
  todos: Todo[];
  onAddTodo: (title: string, desc: string, date: string) => void;
}

const CalendarCell = ({ date, currentMonth, todos, onAddTodo }: Props) => {
  const isToday = date.isSame(dayjs(), "day");
  const isCurrentMonth = date.month() === currentMonth.month();

  const handleClick = () => {
    const title = prompt("Tiêu đề:");
    const desc = prompt("Mô tả:");
    if (title) {
      onAddTodo(title, desc || "", date.toISOString());
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        border p-2 h-24 rounded cursor-pointer relative
        ${!isCurrentMonth ? "bg-gray-100 text-gray-400" : ""}
        ${isToday ? "border-blue-500" : ""}
      `}
    >
      <div className="text-sm font-semibold">{date.date()}</div>

      {todos.length > 0 && (
        <div className="text-xs mt-1 text-green-600">+ {todos.length} todo</div>
      )}
    </div>
  );
};
export default CalendarCell;
