// Массивы слотов времени. Имитация данных с сервера.
// Для чётных и нечётных дней — разные наборы, чтобы при выборе
// другого дня расписание визуально менялось.

export const SLOTS_EVEN_DAY = [
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "12:00", available: true },
  { time: "13:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: false },
  { time: "17:00", available: true },
];

export const SLOTS_ODD_DAY = [
  { time: "10:00", available: false },
  { time: "11:00", available: true },
  { time: "12:00", available: false },
  { time: "13:00", available: true },
  { time: "14:00", available: true },
  { time: "15:00", available: false },
  { time: "16:00", available: true },
  { time: "17:00", available: true },
];
