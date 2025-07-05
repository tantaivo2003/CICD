// pages/TodoCalendarPage.tsx
import { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "../components/todoCalendar/CalendarHeader";
import CalendarGrid from "../components/todoCalendar/CalendarGrid";

const TodoCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNext = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="p-4">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid currentMonth={currentMonth} />
    </div>
  );
};

export default TodoCalendarPage;
