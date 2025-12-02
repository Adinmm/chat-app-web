export function formatLocalTime(isoString: string): string {
  if (!isoString) return "";

  return new Date(isoString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
