import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Download,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Home,
  Building,
  Hotel,
  Car,
  Moon,
  Info,
  Smartphone
} from 'lucide-react';
import { SERVICES, ADD_ONS, BARBER_INFO, MOBILE_PRICING_TIERS } from '../data/barberData';
import { BookingFormData } from '../types';
import {
  generateClientICS,
  generateBarberICS,
  downloadUniversalICS,
  getClientGoogleCalendarUrl,
  getBarberGoogleCalendarUrl
} from '../utils/calendar';
import { generateSMSNotifications, sendAutomatedSMS, SMSPayload } from '../utils/sms';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [smsPayload, setSmsPayload] = useState<SMSPayload | null>(null);
  const [clientDownloaded, setClientDownloaded] = useState<boolean>(false);
  const [barberDownloaded, setBarberDownloaded] = useState<boolean>(false);

  // Selected Mileage Distance Tier Index (0 = 0-10mi (+$15), 1 = 11-20mi (+$25), 2 = 21-30mi (+$40))
  const [distanceTierIndex, setDistanceTierIndex] = useState<number>(0);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: preselectedServiceId || SERVICES[0].id,
    addOnIds: [],
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    locationType: 'house',
    address: '',
    city: 'Atlanta',
    zipCode: '30309',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Default tomorrow
    timeSlot: '10:00 AM',
    notes: '',
  });

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];
  const selectedAddOns = ADD_ONS.filter((a) => formData.addOnIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  
  // Calculate day of the week for date
  const dateObj = new Date(formData.date + 'T12:00:00');
  const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, 2 = Tuesday, ... 6 = Saturday
  const isSunday = dayOfWeek === 0;
  const isMonday = dayOfWeek === 1;
  const isLateNightExclusive = dayOfWeek >= 2 && dayOfWeek <= 6; // Tue–Sat

  // Time Slots depending on day rules:
  const getTimeSlotsForDay = () => {
    if (isSunday) {
      return ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];
    }
    if (isMonday) {
      return ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'];
    }
    return ['10:00 PM', '10:30 PM'];
  };

  const availableSlots = getTimeSlotsForDay();

  // Selected distance fee & total calculation
  const travelFee = MOBILE_PRICING_TIERS[distanceTierIndex]?.fee || 15;
  const isAfterHours = formData.timeSlot.includes('10:00 PM') || formData.timeSlot.includes('10:30 PM');
  const afterHoursFee = isAfterHours ? 20 : 0;
  const totalPrice = currentService.price + addOnsTotal + travelFee + afterHoursFee;

  // Quick Date Selectors (Next 7 Days)
  const getUpcomingDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ iso, dayName, dayNum });
    }
    return dates;
  };

  const handleToggleAddOn = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      addOnIds: prev.addOnIds.includes(id)
        ? prev.addOnIds.filter((item) => item !== id)
        : [...prev.addOnIds, id],
    }));
  };

  const handleNextStep = () => {
    if (step === 2 && !formData.address.trim()) {
      alert('Please enter your house or office address in Atlanta.');
      return;
    }
    if (step === 4) {
      if (!formData.clientName.trim() || !formData.clientPhone.trim()) {
        alert('Please provide your full name and phone number for SMS confirmation.');
        return;
      }
      handleSubmitBooking();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    
    // Generate SMS text payloads
    const smsData = generateSMSNotifications(formData, currentService, distanceTierIndex, isAfterHours);
    setSmsPayload(smsData);

    // Trigger automated SMS webhook
    await sendAutomatedSMS(smsData);

    // Auto-prompt download client calendar (.ics)
    try {
      const clientIcs = generateClientICS(formData, currentService, totalPrice);
      downloadUniversalICS(clientIcs, `JQ-Cuts-Appointment-${formData.date}.ics`);
      setClientDownloaded(true);
    } catch (e) {
      console.warn('Calendar auto-prompt:', e);
    }

    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  // Client Calendar Actions
  const handleDownloadClientAppleCalendar = () => {
    const clientIcs = generateClientICS(formData, currentService, totalPrice);
    downloadUniversalICS(clientIcs, `JQ-Cuts-My-Appointment-${formData.date}.ics`);
    setClientDownloaded(true);
  };

  // Barber Calendar Actions
  const handleDownloadBarberAppleCalendar = () => {
    const barberIcs = generateBarberICS(formData, currentService, totalPrice);
    downloadUniversalICS(barberIcs, `Barber-Booking-${formData.clientName}-${formData.date}.ics`);
    setBarberDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#111111] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-[#181818] to-neutral-900 px-6 py-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-700">
              <img src="/logo.png" alt="JQ Cuts Logo" className="w-full h-full object-cover rounded-full bg-black" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>VIP Mobile Appointment</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  {isConfirmed ? 'CONFIRMED' : `Step ${step} of 4`}
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Master Barber Jaquan • Atlanta Doorstep Service
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isConfirmed && (
          <div className="w-full bg-neutral-900 h-1.5 flex">
            <div
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: SERVICE & ADD-ONS */}
          {step === 1 && !isConfirmed && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-1">
                  1. Choose Your Signature Service
                </h4>
                <p className="text-xs text-neutral-400">
                  Select the grooming experience for your Atlanta mobile house call.
                </p>
              </div>

              {/* Services Radio List */}
              <div className="space-y-3">
                {SERVICES.map((s) => (
                  <label
                    key={s.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                      formData.serviceId === s.id
                        ? 'bg-neutral-900 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="serviceSelect"
                        checked={formData.serviceId === s.id}
                        onChange={() => setFormData((prev) => ({ ...prev, serviceId: s.id }))}
                        className="mt-1 accent-amber-500"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{s.name}</span>
                          {s.popular && (
                            <span className="text-[10px] bg-amber-500 text-black font-extrabold px-1.5 py-0.5 rounded">
                              {s.tag || 'POPULAR'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-1">{s.description}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 font-medium mt-2">
                          <Clock className="w-3 h-3" /> {s.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-black font-heading gold-gradient-text">
                        ${s.price}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Optional Add-ons */}
              <div className="pt-4 border-t border-neutral-800">
                <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                  Optional Grooming Add-Ons:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ONS.map((addon) => {
                    const isSelected = formData.addOnIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => handleToggleAddOn(addon.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/80 text-white'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="accent-amber-500"
                          />
                          <span className="text-xs font-medium text-neutral-200">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400">+${addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION & MILEAGE TIER */}
          {step === 2 && !isConfirmed && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-1">
                  2. Atlanta Location & Travel Distance
                </h4>
                <p className="text-xs text-neutral-400">
                  Enter your address in Metro Atlanta to calculate mileage and arrival time.
                </p>
              </div>

              {/* Distance Tier Selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-400" />
                  Select Travel Distance Radius:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {MOBILE_PRICING_TIERS.slice(0, 3).map((tier, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setDistanceTierIndex(idx)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        distanceTierIndex === idx
                          ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-xs font-bold block text-white">{tier.distance}</span>
                      <span className="text-xs font-extrabold text-amber-400 block mt-1">+${tier.fee}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Type Selector */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'house', label: 'Home / Residence', icon: Home },
                  { id: 'office', label: 'Office / Corporate', icon: Building },
                  { id: 'hotel', label: 'Hotel / Suite', icon: Hotel },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, locationType: type.id as any }))}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer ${
                        formData.locationType === type.id
                          ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${formData.locationType === type.id ? 'text-amber-400' : 'text-neutral-400'}`} />
                      <span className="text-xs">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Address Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Street Address / Apt / Suite / Unit *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3344 Peachtree Rd NE, Suite 1200"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none transition-all placeholder:text-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Metro Atlanta City / Zone
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none cursor-pointer"
                    >
                      <option value="Atlanta (Downtown/Midtown)">Atlanta (Downtown/Midtown)</option>
                      <option value="Buckhead">Buckhead, GA</option>
                      <option value="Sandy Springs">Sandy Springs, GA</option>
                      <option value="Alpharetta">Alpharetta, GA</option>
                      <option value="Roswell">Roswell, GA</option>
                      <option value="Marietta">Marietta, GA</option>
                      <option value="Smyrna">Smyrna, GA</option>
                      <option value="Decatur">Decatur, GA</option>
                      <option value="College Park">College Park, GA</option>
                      <option value="Other Metro Atlanta">Other Metro Atlanta Zone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 30326"
                      value={formData.zipCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none transition-all placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>The master barber brings a full mobile chair, sanitization kit, and floor drop cloth. Zero mess left behind.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE RULES & DATE PICKER */}
          {step === 3 && !isConfirmed && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-1">
                  3. Select Date & Availability Slot
                </h4>
                <p className="text-xs text-neutral-400">
                  Follows our official Atlanta booking schedule.
                </p>
              </div>

              {/* Schedule Info Box */}
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                  <Info className="w-4 h-4 text-amber-400" />
                  Schedule Availability Guide:
                </div>
                <div className="text-xs text-neutral-300 space-y-1">
                  <p>• <strong>Sunday:</strong> Mobile Barber Day (10 AM – 7 PM, 5–6 max)</p>
                  <p>• <strong>Monday:</strong> Premium Barber Day (10 AM – 6 PM, 4–5 max)</p>
                  <p>• <strong>Tue–Sat:</strong> Late-Night VIP Only (10 PM – 11 PM, strictly 1 client/night)</p>
                </div>
              </div>

              {/* Quick Date Tabs */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Select Date:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {getUpcomingDates().map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          date: d.iso,
                          timeSlot: (new Date(d.iso + 'T12:00:00').getDay() >= 2 && new Date(d.iso + 'T12:00:00').getDay() <= 6)
                            ? '10:00 PM'
                            : '10:00 AM'
                        }));
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        formData.date === d.iso
                          ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-black font-extrabold shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-[11px] block font-bold">{d.dayName}</span>
                      <span className="text-xs block">{d.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Available Time Slots ({isSunday ? 'Sunday Mobile Day' : isMonday ? 'Monday Premium Day' : 'Tue–Sat Late-Night VIP'}):</span>
                  {isLateNightExclusive && (
                    <span className="text-[10px] text-purple-400 font-bold flex items-center gap-1">
                      <Moon className="w-3 h-3" /> Late Night Limit: 1/Night
                    </span>
                  )}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot }))}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        formData.timeSlot === slot
                          ? isLateNightExclusive
                            ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-black border-transparent shadow-md'
                            : 'bg-amber-400 text-black border-amber-400 shadow-md'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-neutral-300">Selected Appointment:</span>
                <span className="font-bold text-amber-400">
                  {formData.date} @ {formData.timeSlot}
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT CONTACT DETAILS & SMS PREVIEW */}
          {step === 4 && !isConfirmed && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold font-heading text-white mb-1">
                  4. Client Details & SMS Confirmation
                </h4>
                <p className="text-xs text-neutral-400">
                  We will send your booking confirmation and dual calendar sync invite directly to your phone.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Taylor"
                      value={formData.clientName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Mobile Phone Number (iPhone or Android) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (404) 555-0199"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, clientPhone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Email Address (For Google / Apple Calendar Sync)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      placeholder="e.g. marcus@gmail.com"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Special Cut Notes / Building Gate Code
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Low drop fade with beard lineup. High-rise visitor parking call box #49."
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 focus:border-amber-400 text-white text-xs outline-none"
                  />
                </div>
              </div>

              {/* Order Breakdown Summary Box */}
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>{currentService.name} ({currentService.duration})</span>
                  <span className="font-bold">${currentService.price}</span>
                </div>
                {selectedAddOns.map((a) => (
                  <div key={a.id} className="flex justify-between text-xs text-neutral-400">
                    <span>+ {a.name}</span>
                    <span>${a.price}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>+ Mobile Travel Fee ({MOBILE_PRICING_TIERS[distanceTierIndex]?.distance})</span>
                  <span className="text-amber-400">+${travelFee}</span>
                </div>
                {isAfterHours && (
                  <div className="flex justify-between text-xs text-purple-400 font-semibold">
                    <span>+ Late-Night / After-Hours Mobile Surcharge</span>
                    <span>+${afterHoursFee}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-white uppercase">Total Due Upon Service:</span>
                  <span className="text-xl font-black font-heading gold-gradient-text">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION & DUAL CLIENT / BARBER CALENDAR SYNC SCREEN */}
          {isConfirmed && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  VIP Booking Confirmed!
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  Master Barber Jaquan has received your booking details and will arrive at your scheduled Atlanta location.
                </p>
              </div>

              {/* Booking Receipt Card */}
              <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 text-left space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Service</span>
                  <span className="text-sm font-bold text-white">{currentService.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Date & Time</span>
                  <span className="text-sm font-bold text-amber-400">{formData.date} @ {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Location</span>
                  <span className="text-xs font-medium text-white">{formData.address}, {formData.city}, GA</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Travel Distance</span>
                  <span className="text-xs font-medium text-amber-400">{MOBILE_PRICING_TIERS[distanceTierIndex]?.distance} (+${travelFee})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-400 uppercase font-semibold">Total Price</span>
                  <span className="text-base font-black gold-gradient-text">${totalPrice}</span>
                </div>
              </div>

              {/* SECTION A: CLIENT CALENDAR SYNC (IPHONE & ANDROID) */}
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 max-w-lg mx-auto text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Smartphone className="w-4 h-4" />
                  <span>1. Client Calendar Sync (iPhone & Android):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Apple Calendar Download */}
                  <button
                    onClick={handleDownloadClientAppleCalendar}
                    className="py-3 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>{clientDownloaded ? '✓ Apple (.ics) Saved' : '🍏 iPhone / Apple (.ics)'}</span>
                  </button>

                  {/* Android / Google Calendar */}
                  <a
                    href={getClientGoogleCalendarUrl(formData, currentService, totalPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>🤖 Android / Google Cal</span>
                  </a>
                </div>
              </div>

              {/* SECTION B: BARBER CALENDAR SYNC (FOR JAQUAN'S IPHONE/ANDROID) */}
              <div className="p-4 rounded-2xl bg-neutral-900/90 border border-amber-500/30 max-w-lg mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold gold-gradient-text uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>2. Barber Calendar Sync (For Jaquan):</span>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded">
                    Master Barber
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Barber Apple Calendar */}
                  <button
                    onClick={handleDownloadBarberAppleCalendar}
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{barberDownloaded ? '✓ Barber Schedule Saved' : '🍏 Barber Apple (.ics)'}</span>
                  </button>

                  {/* Barber Google Calendar */}
                  <a
                    href={getBarberGoogleCalendarUrl(formData, currentService, totalPrice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>🤖 Barber Google Cal</span>
                  </a>
                </div>
              </div>

              {/* SECTION C: 1-TAP SMS TO BARBER */}
              {smsPayload && (
                <div className="max-w-lg mx-auto space-y-2">
                  <a
                    href={smsPayload.smsDeepLink}
                    className="w-full py-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/60 hover:bg-emerald-900/50 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>📲 Open 1-Tap SMS on Phone to Barber ({BARBER_INFO.phoneFormatted})</span>
                  </a>
                  <p className="text-[11px] text-neutral-400">
                    Pre-filled with appointment time, Atlanta address, and total price ready to send.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Nav Buttons */}
        {!isConfirmed && (
          <div className="bg-neutral-900 px-6 py-4 border-t border-neutral-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-400">
                Total: <span className="gold-gradient-text text-sm font-black">${totalPrice}</span>
              </span>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Confirming...</span>
                ) : step === 4 ? (
                  <>
                    <span>Confirm & Sync Calendar</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
