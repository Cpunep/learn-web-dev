function Slots({ slots, selectedTime, hasDate, onSelectTime }) {
  if (!hasDate) {
    return (
      <aside className="slots" aria-label="Доступное время">
        <h2 className="slots__title">Доступное время</h2>
        <div className="slots__grid">
          <p className="slots__empty">Сначала выберите дату</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="slots" aria-label="Доступное время">
      <h2 className="slots__title">Доступное время</h2>
      <div className="slots__grid">
        {slots.map((slot) => {
          const isSelected = slot.time === selectedTime;
          const classes = [
            "slot",
            !slot.available ? "slot--busy" : "",
            isSelected ? "slot--selected" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={slot.time}
              type="button"
              className={classes}
              disabled={!slot.available}
              onClick={() => slot.available && onSelectTime(slot.time)}
            >
              {slot.available ? (
                slot.time
              ) : (
                <>
                  <span className="slot__time">{slot.time}</span>
                  <span className="slot__note">Занято</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Slots;
