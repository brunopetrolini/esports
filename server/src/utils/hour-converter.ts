export class HourConverter {
  static hourStringToMinutes(hourString: string): number {
    const [hours, minutes] = hourString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  static minutesToHourString(minutesAmount: number): string {
    const hour = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;
    return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
}
