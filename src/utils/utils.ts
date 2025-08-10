/**
 * Formats a duration given in **seconds** (as a string) into a human-readable label.
 * - If the input is numeric (e.g. "5400"), returns "Hh Mm" (e.g. "1h 30m").
 * - If less than 60 seconds, minutes floor to 0 → "0m".
 * - If the input isn’t numeric, returns it unchanged.
 *
 * Examples:
 *   formatDuration("5400") → "1h 30m"
 *   formatDuration("420")  → "7m"
 *   formatDuration("abc")  → "abc"
 */
export const formatDuration = (duration: string) => {
  const seconds = Number(duration);
  // const seconds = parseInt(duration, 10);
  if (Number.isNaN(seconds)) return duration;
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};
