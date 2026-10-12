const BUSINESS_TIME_ZONE = "Asia/Kolkata";

function weekdayInBusinessZone(date: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    weekday: "short",
  }).format(date);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
}

/** Move forward by business days. Saturday and Sunday in Asia/Kolkata are not counted. */
export function addBusinessDays(start: Date, days: number) {
  if (!Number.isInteger(days) || days < 0) {
    throw new Error("Business day count must be a non-negative integer.");
  }
  const cursor = new Date(start.getTime());
  let remaining = days;
  while (remaining > 0) {
    cursor.setTime(cursor.getTime() + 24 * 60 * 60 * 1000);
    const weekday = weekdayInBusinessZone(cursor);
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }
  return cursor;
}

export function reportDueAt(submittedAt: Date) {
  return addBusinessDays(submittedAt, 2);
}
