import {
  MONTHS_NOMINATIVE,
  buildCalendarGrid,
  isDateSelectable,
} from "../utils/date";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar({
  year,
  month,
  selectedDate,
  today,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
}) {
  const weeks = buildCalendarGrid(year, month);

  const isSelected = (cell) =>
    !cell.otherMonth &&
    selectedDate !== null &&
    selectedDate.year === year &&
    selectedDate.month === month &&
    selectedDate.day === cell.day;

  return (
    <section className="calendar" aria-label="Календарь">
      <div className="calendar__head">
        <h2 className="calendar__month">
          {MONTHS_NOMINATIVE[month]} {year}
        </h2>
        <div className="calendar__arrows">
          <button
            type="button"
            className="arrow-btn"
            onClick={onPrevMonth}
            aria-label="Предыдущий месяц"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5L8 12L15 19"
                stroke="#0d0d0d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="arrow-btn"
            onClick={onNextMonth}
            aria-label="Следующий месяц"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 5L16 12L9 19"
                stroke="#0d0d0d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className="calendar__weekday">{wd}</span>
        ))}
      </div>

      <div className="calendar__days">
        {weeks.map((week, wi) =>
          week.map((cell, ci) => {
            const key = `${wi}-${ci}`;

            if (cell.otherMonth) {
              return (
                <span key={key} className="day-cell day-cell--muted">
                  {cell.day}
                </span>
              );
            }

            const selectable = isDateSelectable(cell.day, month, year, today);
            const selected = isSelected(cell);

            const classes = [
              "day-cell",
              selected ? "day-cell--selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={key}
                type="button"
                className={classes}
                disabled={!selectable}
                onClick={() => onSelectDay(cell.day)}
              >
                {cell.day}
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Calendar;
