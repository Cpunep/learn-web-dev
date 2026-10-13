// Утилиты для работы с датами. Чистые функции,
// не зависят ни от DOM, ни от React.

import { SLOTS_EVEN_DAY, SLOTS_ODD_DAY } from "../data/slots";

export const MONTHS_NOMINATIVE = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

export const MONTHS_GENITIVE = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export const DAYS_OF_WEEK = [
  "Воскресенье", "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота",
];

/**
 * Сравнивает две даты без времени.
 * @returns -1 если a < b, 0 если равны, 1 если a > b
 */
export function compareDates(a, b) {
  const d1 = new Date(a.year, a.month, a.day);
  const d2 = new Date(b.year, b.month, b.day);
  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

/**
 * Можно ли выбрать указанную дату (не раньше today).
 */
export function isDateSelectable(day, month, year, today) {
  return compareDates({ day, month, year }, today) >= 0;
}

/**
 * Сколько дней в месяце.
 */
export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Существует ли указанная дата (например, 31 ноября — нет).
 */
export function isValidDate(year, month, day) {
  if (day < 1) return false;
  return day <= daysInMonth(year, month);
}

/**
 * Строит сетку календаря. Возвращает массив недель,
 * каждая — массив из 7 ячеек { day, otherMonth }.
 */
export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const totalDays = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();
  const offset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = offset - 1; i >= 0; i--) {
    cells.push({ day: prevMonthLastDay - i, otherMonth: true });
  }
  for (let d = 1; d <= totalDays; d++) {
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

/**
 * Слоты для конкретного дня. Чётный день → SLOTS_EVEN_DAY,
 * нечётный → SLOTS_ODD_DAY.
 */
export function getSlotsForDay(day) {
  return day % 2 === 0 ? SLOTS_EVEN_DAY : SLOTS_ODD_DAY;
}

/**
 * «Пятница, 17 октября 2026».
 */
export function formatDate(date) {
  const d = new Date(date.year, date.month, date.day);
  const weekday = DAYS_OF_WEEK[d.getDay()];
  const monthName = MONTHS_GENITIVE[date.month];
  return `${weekday}, ${date.day} ${monthName} ${date.year}`;
}
