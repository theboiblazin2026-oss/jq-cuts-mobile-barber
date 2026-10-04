import { BookingFormData, ServiceItem } from '../types';
import { ADD_ONS, BARBER_INFO, MOBILE_PRICING_TIERS } from '../data/barberData';

export interface SMSPayload {
  barberMessage: string;
  clientMessage: string;
  recipientBarberPhone: string;
  recipientClientPhone: string;
  smsDeepLink: string;
}

export function generateSMSNotifications(
  booking: BookingFormData,
  service: ServiceItem,
  distanceIndex: number = 0,
  afterHours: boolean = false
): SMSPayload {
  const selectedAddOns = ADD_ONS.filter((a) => booking.addOnIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const travelFee = MOBILE_PRICING_TIERS[distanceIndex]?.fee || 15;
  const afterHoursFee = afterHours ? 20 : 0;
  const totalPrice = service.price + addOnsTotal + travelFee + afterHoursFee;
  
  const addOnsText = selectedAddOns.length > 0 ? `\nAdd-Ons: ${selectedAddOns.map((a) => a.name).join(', ')}` : '';
  const fullAddress = `${booking.address}, ${booking.city}, GA ${booking.zipCode}`.trim();

  // 1. Text message for Master Barber Jaquan
  const barberMessage = 
`💈 NEW BOOKING ALERT — PRESSURE MADE
Client: ${booking.clientName}
Phone: ${booking.clientPhone}
Email: ${booking.clientEmail || 'N/A'}
Service: ${service.name}${addOnsText}
Total to Collect: $${totalPrice} (Incl. $${travelFee} travel fee${afterHours ? ' + $20 late-night' : ''})
Date: ${booking.date} @ ${booking.timeSlot}
Location: ${booking.locationType.toUpperCase()} — ${fullAddress}
Special Notes/Gate: ${booking.notes || 'None'}

📲 Reply 'C' to confirm or tap to call client.`;

  // 2. Text message for Client confirmation
  const clientMessage = 
`💈 JQ CUTS — BOOKING CONFIRMATION
Hey ${booking.clientName}, your appointment with Master Barber Jaquan is booked!

📅 Date: ${booking.date}
⏰ Time: ${booking.timeSlot}
✂️ Service: ${service.name}${addOnsText}
💵 Total: $${totalPrice}
📍 Location: ${fullAddress}

🗓️ Add this event to your Apple or Android Google Calendar directly from our confirmation screen.
Need to adjust? Call or text ${BARBER_INFO.phoneFormatted}. See you soon!`;

  // 3. Native iOS / Android SMS Deep Link to barber's number
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? '&' : '?';
  const encodedBody = encodeURIComponent(barberMessage);
  const smsDeepLink = `sms:${BARBER_INFO.phone.replace(/[^0-9]/g, '')}${separator}body=${encodedBody}`;

  return {
    barberMessage,
    clientMessage,
    recipientBarberPhone: BARBER_INFO.phone,
    recipientClientPhone: booking.clientPhone,
    smsDeepLink,
  };
}

// Simulated automated SMS dispatch pipeline (can connect to Twilio / Cloudflare Worker webhook)
export async function sendAutomatedSMS(payload: SMSPayload): Promise<{ success: boolean; message: string }> {
  try {
    console.log('Dispatching dual SMS notification to Client and Barber:', payload.recipientClientPhone);
    await new Promise((res) => setTimeout(res, 600));
    return {
      success: true,
      message: 'Dual SMS confirmation dispatched to Client and Barber.',
    };
  } catch (error) {
    console.error('SMS dispatch error:', error);
    return {
      success: false,
      message: 'Failed to send automated SMS, fallback to 1-tap SMS link enabled.',
    };
  }
}
