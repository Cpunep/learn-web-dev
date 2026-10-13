import { useState } from "react";
import "./styles/app.css";

import Header from "./components/Header";
import Steps from "./components/Steps";
import Calendar from "./components/Calendar";
import Slots from "./components/Slots";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

import {
  isValidDate,
  isDateSelectable,
  getSlotsForDay,
} from "./utils/date";

// «Сегодня» берём один раз при загрузке модуля.
const NOW = new Date();
const TODAY = {
  year: NOW.getFullYear(),
  month: NOW.getMonth(),
  day: NOW.getDate(),
};

function App() {
  // Какой месяц показан в календаре.
  const [visibleYear, setVisibleYear] = useState(TODAY.year);
  const [visibleMonth, setVisibleMonth] = useState(TODAY.month);

  // Полная выбранная дата и выбранное время.
  const [selectedDate, setSelectedDate] = useState({
    year: TODAY.year,
    month: TODAY.month,
    day: TODAY.day,
  });
  const [selectedTime, setSelectedTime] = useState(null);

  // Слоты для выбранной даты.
  const [slots, setSlots] = useState(() => getSlotsForDay(TODAY.day));

  // Клик по дню календаря.
  function handleSelectDay(day) {
    // Страховка: не даём выбрать несуществующую дату.
    if (!isValidDate(visibleYear, visibleMonth, day)) return;

    setSelectedDate({
      year: visibleYear,
      month: visibleMonth,
      day: day,
    });
    setSelectedTime(null);
    setSlots(getSlotsForDay(day));
  }

  // Клик по слоту времени.
  function handleSelectTime(time) {
    setSelectedTime(time);
  }

  // Листание месяцев. ВАЖНО: выбранная дата НЕ меняется.
  // Если пользователь выбрал 15 октября и перелистнул
  // на ноябрь — выбранная дата остаётся 15 октября.
  function handlePrevMonth() {
    if (visibleMonth === 0) {
      setVisibleYear(visibleYear - 1);
      setVisibleMonth(11);
    } else {
      setVisibleMonth(visibleMonth - 1);
    }
  }

  function handleNextMonth() {
    if (visibleMonth === 11) {
      setVisibleYear(visibleYear + 1);
      setVisibleMonth(0);
    } else {
      setVisibleMonth(visibleMonth + 1);
    }
  }

  // Кнопка «Далее».
  function handleNext() {
    if (!selectedDate || !selectedTime) return;
    alert(
      `Вы записаны на ${selectedDate.day}.${
        selectedDate.month + 1
      }.${selectedDate.year} в ${selectedTime}`
    );
  }

  // Есть ли доступная выбранная дата.
  const hasSelectableDate =
    selectedDate !== null &&
    isDateSelectable(
      selectedDate.day,
      selectedDate.month,
      selectedDate.year,
      TODAY
    );

  return (
    <div className="page">
      <Header />
      <Steps />

      <main className="main">
        <div className="main__title-row">
          <button type="button" className="back-btn" aria-label="Назад">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5L8 12L15 19"
                stroke="#0d0d0d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="main__title">Выберите дату и время</h1>
        </div>

        <div className="content">
          <Calendar
            year={visibleYear}
            month={visibleMonth}
            selectedDate={selectedDate}
            today={TODAY}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDay={handleSelectDay}
          />
          <Slots
            slots={slots}
            selectedTime={selectedTime}
            hasDate={hasSelectableDate}
            onSelectTime={handleSelectTime}
          />
        </div>

        <Summary
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onNext={handleNext}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
