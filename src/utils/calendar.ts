import {weddingConfig} from '../data/weddingConfig';

function formatUtcForCalendar(isoDate: string): string {
  const d = new Date(isoDate);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function getGoogleCalendarUrl(): string {
  const start = formatUtcForCalendar(weddingConfig.weddingDate);
  const end = formatUtcForCalendar(weddingConfig.weddingEndDate);
  const title = encodeURIComponent(
    `Wedding Celebration: ${weddingConfig.brideName} & ${weddingConfig.groomName}`,
  );
  const details = encodeURIComponent(
    `${weddingConfig.introduction}, ${weddingConfig.brideName} and ${weddingConfig.groomName} joyfully invite you to celebrate their wedding.\n\nVenue: ${weddingConfig.venueName}, ${weddingConfig.venueAddress}`,
  );
  const location = encodeURIComponent(`${weddingConfig.venueName}, ${weddingConfig.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function downloadIcsCalendar(): void {
  const start = formatUtcForCalendar(weddingConfig.weddingDate);
  const end = formatUtcForCalendar(weddingConfig.weddingEndDate);
  const now = formatUtcForCalendar(new Date().toISOString());
  const uid = `wedding-${weddingConfig.brideName.toLowerCase()}-${weddingConfig.groomName.toLowerCase()}@invitation`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Royal Stationery//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${weddingConfig.brideName} & ${weddingConfig.groomName} — Wedding Celebration`,
    `DESCRIPTION:${weddingConfig.introduction}\\, ${weddingConfig.brideName} & ${weddingConfig.groomName} invite you to celebrate their wedding at ${weddingConfig.venueName}.`,
    `LOCATION:${weddingConfig.venueName}\\, ${weddingConfig.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${weddingConfig.brideName}-${weddingConfig.groomName}-Wedding.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
