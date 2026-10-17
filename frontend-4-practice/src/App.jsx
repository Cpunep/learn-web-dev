// App — корневой компонент с асинхронной загрузкой данных с сервера.
//
// ЛОГИКА
// ------
// 1. При открытии: fetchToday() → получаем «сегодня» с сервера.
//    Пока идёт запрос — показываем «Загрузка…».
//    После загрузки — инициализируем календарь и запрашиваем слоты.
// 2. При клике на день: fetchSlots(date) → новые слоты.
// 3. При переключении месяца: выбранная дата не меняется.
// 4. Кнопка «Далее» активна только когда выбраны дата и время.

import { useState, useEffect } from "react";
import "./styles/app.css";

import Header from "./components/Header";
import Steps from "./components/Steps";
import Calendar from "./components/Calendar";
import Slots from "./components/Slots";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

import { fetchToday, fetchSlots } from "./api";
import { isDateSelectable } from "./utils/date";

function App() {
  // 1. Состояние «сегодня» (с сервера).
  const [today, setToday] = useState(null);
  const [todayLoading, setTodayLoading] = useState(true);
  const [todayError, setTodayError] = useState(null);

  // 2. Состояние календаря.
  const [visibleYear, setVisibleYear] = useState(null);
  const [visibleMonth, setVisibleMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // 3. Состояние слотов.
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // --- Загрузка «сегодня» при монтировании ---
  useEffect(() => {
    let cancelled = false;

    async function loadToday() {
      try {
        setTodayLoading(true);
        setTodayError(null);

        const data = await fetchToday();
        if (cancelled) return;

        setToday(data);
        setVisibleYear(data.year);
        setVisibleMonth(data.month);
        setSelectedDate(data);
      } catch (err) {
        if (!cancelled) {
          setTodayError(err.message);
        }
      } finally {
        if (!cancelled) {
          setTodayLoading(false);
        }
      }
    }

    loadToday();
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Загрузка слотов при смене выбранной даты ---
  useEffect(() => {
    if (!selectedDate) return;

    let cancelled = false;

    async function loadSlots() {
      try {
        setSlotsLoading(true);
        setSlotsError(null);

        const data = await fetchSlots(selectedDate);
        if (cancelled) return;

        setSlots(data.slots);
      } catch (err) {
        if (!cancelled) {
          setSlotsError(err.message);
        }
      } finally {
        if (!cancelled) {
          setSlotsLoading(false);
        }
      }
    }

    loadSlots();
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  // --- Обработчики ---

  function handleSelectDay(day) {
    setSelectedDate({
      year: visibleYear,
      month: visibleMonth,
      day,
    });
    setSelectedTime(null);
  }

  function handleSelectTime(time) {
    setSelectedTime(time);
  }

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

  function handleNext() {
    if (!selectedDate || !selectedTime) return;
    alert(
      `Вы записаны на ${selectedDate.day}.${
        selectedDate.month + 1
      }.${selectedDate.year} в ${selectedTime}`
    );
  }

  // --- Рендер ---

  // Пока грузится «сегодня» — заглушка.
  if (todayLoading) {
    return (
      <div className="page">
        <div className="main" style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Загрузка...</h1>
        </div>
      </div>
    );
  }

  // Если «сегодня» не загрузилось — ошибка.
  if (todayError || !today) {
    return (
      <div className="page">
        <div className="main" style={{ textAlign: "center", marginTop: "100px" }}>
          <h1 style={{ color: "var(--accent)" }}>Ошибка</h1>
          <p>{todayError || "Не удалось загрузить данные с сервера"}</p>
        </div>
      </div>
    );
  }

  const hasSelectableDate =
    selectedDate !== null &&
    isDateSelectable(
      selectedDate.day,
      selectedDate.month,
      selectedDate.year,
      today
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
            today={today}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDay={handleSelectDay}
          />
          <Slots
            slots={slots}
            selectedTime={selectedTime}
            hasDate={hasSelectableDate}
            loading={slotsLoading}
            error={slotsError}
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
