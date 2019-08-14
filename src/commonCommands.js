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
