export function getToday() {
  const dateObj = new Date();
  return (`${dateObj.getFullYear().toString()}/${(dateObj.getMonth() + 1).toString()}/${dateObj.getDate().toString()} 00:00`);
}
export function getYeseterday() {
  const dateObj = new Date();
  return (`${dateObj.getFullYear().toString()}/${(dateObj.getMonth() + 1).toString()}/${(dateObj.getDate() - 1).toString()} 00:00`);
}

export function isCompleted(endDate) {
  return (getToday() > endDate);
}

export function getWeekDay(offset) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  return weekdays[new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset).getDay()];
}

export function getMonthDay(offset) {
  let today = new Date();
  today = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
  return today.getDate();
}
