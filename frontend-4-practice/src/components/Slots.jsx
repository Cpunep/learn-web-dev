// Слоты времени. Теперь данные приходят с сервера,
// у загрузки — три состояния: loading, error, data.

function Slots({ slots, selectedTime, hasDate, loading, error, onSelectTime }) {
  let content;

  if (!hasDate) {
    content = <p className="slots__empty">Сначала выберите дату</p>;
  } else if (loading) {
    content = <p className="slots__loading">Загрузка…</p>;
  } else if (error) {
    content = <p className="slots__error">Ошибка: {error}</p>;
  } else {
    content = slots.map((slot) => {
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
    });
  }

  return (
    <aside className="slots" aria-label="Доступное время">
      <h2 className="slots__title">Доступное время</h2>
      <div className="slots__grid">{content}</div>
    </aside>
  );
}

export default Slots;
