import { formatDate } from "../utils/date";

function Summary({ selectedDate, selectedTime, onNext }) {
  let label = "Выберите дату";
  if (selectedDate) {
    const dateStr = formatDate(selectedDate);
    label = selectedTime ? `${dateStr} • ${selectedTime}` : dateStr;
  }

  const canProceed = Boolean(selectedDate && selectedTime);

  return (
    <div className="summary">
      <span className="summary__chosen">{label}</span>
      <button
        type="button"
        className="next-btn"
        disabled={!canProceed}
        onClick={onNext}
      >
        Далее
      </button>
    </div>
  );
}

export default Summary;
