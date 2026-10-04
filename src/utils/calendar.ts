import { BookingFormData, ServiceItem } from '../types';
import { BARBER_INFO } from '../data/barberData';

export function formatICSDate(dateStr: string, timeStr: string, durationMinutes: number = 60): { start: string; end: string } {
  const [year, month, day] = dateStr.split('-').map(Number);
  
  const timeRegex = /(\d+):(\d+)\s*(AM|PM)/i;
  const match = timeStr.match(timeRegex);
  
  let hours = 10;
  let minutes = 0;
  
  if (match) {
    hours = parseInt(match[1], 10);
    minutes = parseInt(match[2], 10);
    const meridiem = match[3].toUpperCase();
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
  }

  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const toICS = (d: Date) => {
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };

  return {
    start: toICS(startDate),
    end: toICS(endDate),
  };
}

// 1. Client Calendar ICS (For iPhone, Android, Samsung Calendar, Outlook)
export function generateClientICS(booking: BookingFormData, service: ServiceItem, totalPrice: number): string {
  const durationMatch = service.duration.match(/(\d+)/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[1], 10) : 60;
  
  const { start, end } = formatICSDate(booking.date, booking.timeSlot, durationMinutes);
  const fullAddress = `${booking.address}, ${booking.city}, GA ${booking.zipCode}`.trim();
  const summary = `💈 JQ Cuts Appointment: ${service.name}`;
  const description = `Your appointment with Master Barber Jaquan (JQ Cuts - Pressure Made)\\n\\nService: ${service.name} ($${totalPrice})\\nBarber: Jaquan (JQ)\\nBarber Direct: ${BARBER_INFO.phoneFormatted}\\nLocation: ${fullAddress}\\nInstagram: ${BARBER_INFO.instagram}\\n\\nNotes: ${booking.notes || 'None'}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JQ Cuts//Client Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:client-${Date.now()}@jqcuts.com`,
    `DTSTAMP:${start}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${fullAddress}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'DESCRIPTION:Reminder: Master Barber Jaquan arrives in 1 hour',
    'ACTION:DISPLAY',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'DESCRIPTION:Reminder: JQ Cuts Mobile Haircut tomorrow',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// 2. Barber Calendar ICS (For Jaquan's iPhone / Android Calendar)
export function generateBarberICS(booking: BookingFormData, service: ServiceItem, totalPrice: number): string {
  const durationMatch = service.duration.match(/(\d+)/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[1], 10) : 60;
  
  const { start, end } = formatICSDate(booking.date, booking.timeSlot, durationMinutes);
  const fullAddress = `${booking.address}, ${booking.city}, GA ${booking.zipCode}`.trim();
  const summary = `🚨 JQ CUTS: ${booking.clientName} (${service.name})`;
  const description = `CLIENT BOOKING DETAILS\\n\\nClient Name: ${booking.clientName}\\nClient Phone: ${booking.clientPhone}\\nClient Email: ${booking.clientEmail || 'N/A'}\\nService: ${service.name}\\nTotal to Collect: $${totalPrice}\\nLocation: ${fullAddress}\\nNotes/Gate Code: ${booking.notes || 'None'}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//JQ Cuts//Master Barber Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:barber-${Date.now()}@jqcuts.com`,
    `DTSTAMP:${start}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${fullAddress}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT45M',
    'DESCRIPTION:Travel Reminder: Drive to client appointment in 45 min',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// Download .ics file universally on iOS / Android / Desktop
export function downloadUniversalICS(icsContent: string, fileName: string) {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Google Calendar Universal Web Intent (Opens Google Calendar app directly on Android)
export function getClientGoogleCalendarUrl(booking: BookingFormData, service: ServiceItem, totalPrice: number): string {
  const durationMatch = service.duration.match(/(\d+)/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[1], 10) : 60;
  const { start, end } = formatICSDate(booking.date, booking.timeSlot, durationMinutes);
  const fullAddress = `${booking.address}, ${booking.city}, GA ${booking.zipCode}`.trim();
  const summary = `💈 JQ Cuts Appointment: ${service.name}`;
  const details = `Appointment with Master Barber Jaquan (JQ Cuts)\n\nService: ${service.name} ($${totalPrice})\nBarber Phone: ${BARBER_INFO.phoneFormatted}\nLocation: ${fullAddress}\nInstagram: ${BARBER_INFO.instagram}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(fullAddress)}`;
}

// Barber's Google Calendar URL
export function getBarberGoogleCalendarUrl(booking: BookingFormData, service: ServiceItem, totalPrice: number): string {
  const durationMatch = service.duration.match(/(\d+)/);
  const durationMinutes = durationMatch ? parseInt(durationMatch[1], 10) : 60;
  const { start, end } = formatICSDate(booking.date, booking.timeSlot, durationMinutes);
  const fullAddress = `${booking.address}, ${booking.city}, GA ${booking.zipCode}`.trim();
  const summary = `🚨 Client Cut: ${booking.clientName} - ${service.name}`;
  const details = `NEW BOOKING\n\nClient: ${booking.clientName}\nPhone: ${booking.clientPhone}\nService: ${service.name} ($${totalPrice})\nLocation: ${fullAddress}\nGate / Notes: ${booking.notes || 'None'}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(summary)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(fullAddress)}`;
}
