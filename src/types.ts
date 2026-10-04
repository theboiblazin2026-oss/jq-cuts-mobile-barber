export interface ServiceItem {
  id: string;
  name: string;
  category: 'cuts' | 'beard' | 'vip' | 'specials';
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
  tag?: string;
  includes: string[];
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  duration: string;
}

export interface BookingFormData {
  serviceId: string;
  addOnIds: string[];
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  locationType: 'house' | 'office' | 'hotel' | 'event';
  address: string;
  city: string;
  zipCode: string;
  date: string;
  timeSlot: string;
  notes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  service: string;
  avatarBg?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'fades' | 'beards' | 'tapers' | 'designs';
  imageUrl: string;
  caption: string;
}
