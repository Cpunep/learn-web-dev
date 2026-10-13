// 1. Данные

const NOW = new Date();
const TODAY = {
  year: NOW.getFullYear(),
  month: NOW.getMonth(), // 0 = январь
  day: NOW.getDate(),
};

const MONTH_NAMES = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const MONTH_NAMES_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const WEEKDAY_NAMES = [
  "Воскресенье", "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота",
];

// Слоты времени. Формат: { time: "10:00", available: true }.
const ALL_SLOTS = [
  { time: "10:00", available: true },
  { time: "11:00", available: true },
  { time: "12:00", available: true },
  { time: "13:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];

// 2. Состояние

const state = {
  year: TODAY.year,
  month: TODAY.month,
  selectedDay: null,
  selectedTime: null,
  slots: [],
};

// 3. Функции

/**
 * Строит сетку календаря на месяц.
 * @returns {Array<Array<{day:number, otherMonth:boolean}>>} массив недель
 */
function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({ day: nextDay, otherMonth: true });
    nextDay++;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

function isSelectable(year, month, day) {
  return compareDates({ year, month, day }, TODAY) >= 0;
}

function formatDate(year, month, day) {
  const date = new Date(year, month, day);
  const weekday = WEEKDAY_NAMES[date.getDay()];
  const monthName = MONTH_NAMES_GENITIVE[month];
  return `${weekday}, ${day} ${monthName} ${year}`;
}

function getSlotsForDay() {
  return ALL_SLOTS;
}

// 4. Отрисовка и обработчики

const calendarMonthEl = document.getElementById("calendarMonth");
const calendarDaysEl = document.getElementById("calendarDays");
const slotsGridEl = document.getElementById("slotsGrid");
const summaryTextEl = document.getElementById("summaryText");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

/**
 * Рисует заголовок календаря («Октябрь 2026»).
 */
function renderMonthTitle() {
  calendarMonthEl.textContent = `${MONTH_NAMES[state.month]} ${state.year}`;
}

/**
 * Рисует сетку дней календаря.
 */
function renderCalendar() {
  const weeks = buildCalendarGrid(state.year, state.month);

  let html = "";
  weeks.forEach((week) => {
    week.forEach((cell) => {
      const classes = ["day-cell"];

      if (cell.otherMonth) {
        classes.push("day-cell--muted");
        html += `<span class="${classes.join(" ")}">${cell.day}</span>`;
        return;
      }

      const selectable = isSelectable(state.year, state.month, cell.day);

      if (!selectable) {
        classes.push("disabled");
      }

      if (cell.day === state.selectedDay) {
        classes.push("day-cell--selected");
      }

      const dataAttr = selectable ? ` data-day="${cell.day}"` : "";
      const tag = selectable ? "button" : "span";
      const typeAttr = selectable ? ` type="button"` : "";

      html += `<${tag}${typeAttr} class="${classes.join(" ")}"${dataAttr}>${cell.day}</${tag}>`;
    });
  });

  calendarDaysEl.innerHTML = html;

  // Вешаем обработчики на новые кликабельные ячейки
  const dayButtons = calendarDaysEl.querySelectorAll("button[data-day]");
  dayButtons.forEach((btn) => {
    btn.addEventListener("click", onDayClick);
  });
}

/**
 * Рисует слоты времени.
 */
function renderSlots() {
  if (state.selectedDay === null) {
    slotsGridEl.innerHTML = `<p class="slots__empty">Сначала выберите дату</p>`;
    return;
  }

  let html = "";
  state.slots.forEach((slot) => {
    const classes = ["slot"];

    if (!slot.available) {
      classes.push("slot--busy");
    } else if (slot.time === state.selectedTime) {
      classes.push("slot--selected");
    }

    if (slot.available) {
      html += `<button type="button" class="${classes.join(" ")}" data-time="${slot.time}">${slot.time}</button>`;
    } else {
      html += `<button type="button" class="${classes.join(" ")}" disabled>
        <span class="slot__time">${slot.time}</span>
        <span class="slot__note">Занято</span>
      </button>`;
    }
  });

  slotsGridEl.innerHTML = html;

  const slotButtons = slotsGridEl.querySelectorAll("button[data-time]");
  slotButtons.forEach((btn) => {
    btn.addEventListener("click", onSlotClick);
  });
}

/**
 * Рисует нижнюю панель.
 */
function renderSummary() {
  if (state.selectedDay === null) {
    summaryTextEl.textContent = "Выберите дату";
    return;
  }

  const dateStr = formatDate(state.year, state.month, state.selectedDay);
  if (state.selectedTime) {
    summaryTextEl.textContent = `${dateStr} • ${state.selectedTime}`;
  } else {
    summaryTextEl.textContent = dateStr;
  }
}

/**
 * Полная перерисовка страницы.
 */
function render() {
  renderMonthTitle();
  renderCalendar();
  renderSlots();
  renderSummary();
}

// Обработчики 

function onDayClick(event) {
  const day = parseInt(event.currentTarget.dataset.day, 10);
  if (isNaN(day)) return;

  state.selectedDay = day;
  state.selectedTime = null; // сбрасываем время при смене дня
  state.slots = getSlotsForDay();
  render();
}

function onSlotClick(event) {
  const time = event.currentTarget.dataset.time;
  if (!time) return;

  state.selectedTime = time;
  render();
}

function onPrevMonth() {
  state.month--;
  if (state.month < 0) {
    state.month = 11;
    state.year--;
  }
  // Если выбранный день в новом месяце недоступен — сбрасываем
  resetSelectionIfHidden();
  render();
}

function onNextMonth() {
  state.month++;
  if (state.month > 11) {
    state.month = 0;
    state.year++;
  }
  resetSelectionIfHidden();
  render();
}

/**
 * Если выбранная дата не попадает в отображаемый месяц —
 * сбрасываем выбор дня и времени.
 */
function resetSelectionIfHidden() {
  const now = new Date(state.year, state.month, 1);
  if (
    state.selectedDay === null ||
    now.getFullYear() !== state.year ||
    now.getMonth() !== state.month
  ) {
    // Простая логика: если выбранный день есть в текущем месяце — оставляем,
    // иначе сбрасываем. Здесь проще всего сбросить, если год/месяц не совпадает
    // с датой выбранного дня.
  }
  // Оставим выбранный день, если он есть в текущем месяце и не в прошлом.
  if (state.selectedDay !== null) {
    if (!isSelectable(state.year, state.month, state.selectedDay)) {
      state.selectedDay = null;
      state.selectedTime = null;
      state.slots = [];
    }
  }
}

// 5. Инициализация

function init() {
  // Выбираем день по умолчанию — сегодня
  state.selectedDay = TODAY.day;
  state.selectedTime = null;
  state.slots = getSlotsForDay();

  prevMonthBtn.addEventListener("click", onPrevMonth);
  nextMonthBtn.addEventListener("click", onNextMonth);

  render();
}

document.addEventListener("DOMContentLoaded", init);
