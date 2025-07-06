// pages/TodoCalendarPage.tsx
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import dayjs from "dayjs";
import CalendarHeader from "../components/todoCalendar/CalendarHeader";
import CalendarGrid from "../components/todoCalendar/CalendarGrid";

const TodoCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));

  const userId = Number(localStorage.getItem("userId"));
  console.log("userId", userId);
  const { todos, addTodo } = useTodos(userId);

  return (
    <div className="p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        todos={todos}
        onAddTodo={addTodo}
      />
    </div>
  );
};

export default TodoCalendarPage;
