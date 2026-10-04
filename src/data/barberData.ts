import { ServiceItem, AddOnItem, Testimonial, GalleryItem } from '../types';

export const BARBER_INFO = {
  name: 'Jaquan (JQ)',
  brand: 'JQ Cuts',
  badge: 'PRESSURE MADE',
  tagline: 'Pressure Made — Premium Barber Services',
  phone: '912-286-1805',
  phoneFormatted: '(912) 286-1805',
  instagram: '@JAQUAN3950',
  instagramUrl: 'https://instagram.com/JAQUAN3950',
  established: '2024',
  primaryArea: 'Atlanta Area & Metro Atlanta, GA',
  serviceRadius: '0 – 30+ miles across Metro Atlanta',
  hours: 'Sun: 10AM–7PM | Mon: 10AM–6PM | Tue–Sat: 10PM–11PM (Late Night Exclusive)',
};

export const WEEKLY_SCHEDULE = [
  {
    day: 'SUNDAY',
    title: 'Mobile Barber Day',
    hours: '10:00 AM – 7:00 PM',
    capacity: '5–6 appointments max',
    highlight: 'Best day for mobile / house calls',
    status: 'High Demand • Book Early',
    badgeColor: 'from-amber-400 to-yellow-500',
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'],
  },
  {
    day: 'MONDAY',
    title: 'Premium Barber Day',
    hours: '10:00 AM – 6:00 PM',
    capacity: '4–5 appointments max',
    highlight: 'Private & premium appointments',
    status: 'Exclusive VIP Slots',
    badgeColor: 'from-yellow-500 to-amber-600',
    slots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM', '04:30 PM'],
  },
  {
    day: 'TUESDAY – SATURDAY',
    title: 'Late-Night Exclusive Appointments',
    hours: '10:00 PM – 11:00 PM ONLY',
    capacity: '1 appointment max per night',
    highlight: 'Starting at $75 • Limited to one client per night',
    status: 'Strictly 1 Client Per Night',
    badgeColor: 'from-purple-500 to-amber-500',
    slots: ['10:00 PM', '10:30 PM'],
  },
];

export const MOBILE_PRICING_TIERS = [
  { distance: '0 – 10 miles', fee: 15, label: 'Local Atlanta Travel', note: 'Standard metro mobile radius' },
  { distance: '11 – 20 miles', fee: 25, label: 'Extended Metro Travel', note: 'Perimeter & surrounding suburbs' },
  { distance: '21 – 30 miles', fee: 40, label: 'Greater Atlanta Travel', note: 'Outer perimeter & regional visits' },
  { distance: 'After-Hours Mobile', fee: 20, label: 'Night / Early Service Surcharge', note: 'Added to appointments outside standard hours' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'late-night-vip-cut',
    name: '🌙 Late-Night VIP Master Cut (Tue–Sat)',
    category: 'vip',
    duration: '45–60 min',
    price: 75,
    popular: true,
    tag: 'LIMITED 1/NIGHT',
    description: 'Exclusive late-night appointment (10:00 PM – 11:00 PM). Full premium haircut, razor edge finish, and custom styling. Only 1 private client taken per evening.',
    includes: [
      'Strictly 1 Client Per Night Guarantee',
      'Full Custom Skin Fade / Taper / Natural Cut',
      'Precision Straight Razor Hairline Detailing',
      'Invigorating Scalp Cleanse & Styling Finish',
      'Available Tue – Sat (10 PM – 11 PM)'
    ]
  },
  {
    id: 'vip-executive-cut',
    name: 'The VIP Executive Experience',
    category: 'vip',
    duration: '60 min',
    price: 85,
    popular: true,
    tag: 'MOST POPULAR',
    description: 'The ultimate luxury doorstep treatment. Full signature haircut, surgical razor edge-up, organic beard oil hydration treatment, and executive styling.',
    includes: [
      'Custom Tailored Haircut of Choice',
      'Straight Razor Edge & Neck Detailing',
      'Beard Sculpt & Hydration Oil Blend',
      'Luxury Aftershave & Hair Enhancement',
      'Mobile Setup with Vacuum Cleanliness'
    ]
  },
  {
    id: 'signature-fade-cut',
    name: 'Signature Master Haircut',
    category: 'cuts',
    duration: '40 min',
    price: 55,
    popular: false,
    tag: 'PRECISION',
    description: 'Crisp skin fade, drop fade, burst fade, low taper or afro taper with razor-sharp hairline detailing.',
    includes: [
      'Custom Skin Fade / Low Taper / C-Cup Lineup',
      'Razor-Sharp Hairline Detailing',
      'Sheen & Sponge Twist / Wave / Matte Finish',
      'Sanitized Mobile Suite Experience'
    ]
  },
  {
    id: 'master-beard-sculpt',
    name: 'Master Beard Sculpt & Straight Razor Detailing',
    category: 'beard',
    duration: '35 min',
    price: 45,
    popular: false,
    tag: 'BEARD SCULPT',
    description: 'Sculpting, length reduction, cheek line symmetry, and foil shaver or straight razor edge lineup with conditioning treatment.',
    includes: [
      'Precision Beard Trimming & Shaping',
      'Straight Razor Clean Edge Lineup',
      'Beard Hydration & Balm Conditioning',
      'Argan & Jojoba Beard Oil Infusion'
    ]
  },
  {
    id: 'father-son-duo',
    name: 'Father & Son VIP Duo',
    category: 'vip',
    duration: '75 min',
    price: 110,
    popular: false,
    tag: 'FAMILY VALUE',
    description: 'Back-to-back premium cuts at your Atlanta home for Dad and Son. Maximum convenience with zero travel hassle.',
    includes: [
      '2 Complete Custom Haircuts',
      'Razor Finish for Dad / Gentle Styling for Son',
      'Complimentary Grooming Enhancements',
      'Zero Travel Stress for the Family'
    ]
  },
  {
    id: 'kids-cut-special',
    name: 'Young King / Youth Cut (Under 13)',
    category: 'cuts',
    duration: '30 min',
    price: 40,
    popular: false,
    tag: 'YOUTH',
    description: 'Patient, gentle, and stylish haircuts for kids and teens in the comfort of your own living room.',
    includes: [
      'Kid-Friendly Patient Consultation',
      'Modern Fade / Taper / Natural Cut',
      'Clean Edges & Styling'
    ]
  },
  {
    id: 'groomsmen-vip-group',
    name: 'Wedding & Event Pop-Up (Group 4+)',
    category: 'specials',
    duration: '3+ hours',
    price: 350,
    popular: false,
    tag: 'EVENT SPECIAL',
    description: 'On-location VIP grooming for weddings, music video shoots, photo sessions, or corporate executive suites in Atlanta.',
    includes: [
      'Up to 4 Full Executive Cuts & Beard Lineups',
      'Dedicated On-Site Station & Chair',
      'VIP Grooming Touch-Ups Before Photos',
      'Custom Event Time Coordination'
    ]
  }
];

export const ADD_ONS: AddOnItem[] = [
  { id: 'black-mask', name: 'Charcoal Blackhead Purifying Mask', price: 15, duration: '+10 min' },
  { id: 'hair-enhancement', name: 'Semi-Permanent Hair & Beard Color Enhancement', price: 20, duration: '+10 min' },
  { id: 'eyebrow-razor', name: 'Eyebrow Shaping & Straight Razor Arch', price: 10, duration: '+5 min' },
  { id: 'scalp-massage', name: 'Invigorating Tea Tree Scalp Massage & Treatment', price: 15, duration: '+10 min' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Marcus T.',
    location: 'Buckhead, Atlanta GA',
    role: 'Music Producer & Exec',
    rating: 5,
    text: 'Booked the Tuesday late-night appointment at 10 PM after my studio session. JQ arrived right to my high-rise, set up in 5 minutes, and gave me the cleanest taper fade. Pressure Made is the real deal.',
    date: '1 week ago',
    service: '🌙 Late-Night VIP Master Cut',
    avatarBg: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'rev-2',
    name: 'Darius K.',
    location: 'Midtown Atlanta, GA',
    role: 'Tech Consultant',
    rating: 5,
    text: 'Sunday mobile day is the best thing ever. No sitting in Atlanta traffic or waiting 2 hours in a barbershop. He was at my apartment at 11 AM sharp, line was crisp, and left the place spotless.',
    date: '2 weeks ago',
    service: 'The VIP Executive Experience',
    avatarBg: 'from-zinc-700 to-neutral-900'
  },
  {
    id: 'rev-3',
    name: 'Reggie B.',
    location: 'Sandy Springs, GA',
    role: 'Real Estate Developer',
    rating: 5,
    text: 'JQ is a true Master Barber. His straight razor precision on my beard and the organic beard oil treatment is top tier luxury. Plus the Apple Calendar invite syncs straight to my phone.',
    date: '3 weeks ago',
    service: 'Master Beard Sculpt & Detailing',
    avatarBg: 'from-amber-700 to-amber-950'
  },
  {
    id: 'rev-4',
    name: 'Anthony M.',
    location: 'Alpharetta, GA',
    role: 'Corporate Executive',
    rating: 5,
    text: 'Monday Premium Barber slot was ultra private and professional. Perfect skin fade and surgical hairline lineup. Highly recommended for busy executives in Metro Atlanta.',
    date: 'Just recently',
    service: 'Signature Master Haircut',
    avatarBg: 'from-yellow-600 to-amber-700'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Mid-Skin Drop Fade & C-Cup Lineup',
    category: 'fades',
    imageUrl: '/portfolio/cut1_drop_fade.jpg',
    caption: 'Clean skin drop fade with crisp C-cup temple arch, smooth gradient transition, and defined dark curls.'
  },
  {
    id: 'gal-2',
    title: 'Sculpted Full Beard & Razor Cheek Line',
    category: 'beards',
    imageUrl: '/portfolio/cut2_beard_sculpt.jpg',
    caption: 'Full symmetrical beard contouring with surgical straight razor cheek and jawline detailing.'
  },
  {
    id: 'gal-3',
    title: '360 Deep Waves & Low Taper Fade',
    category: 'tapers',
    imageUrl: '/portfolio/cut3_360_waves.jpg',
    caption: 'Deep 360 wave definition paired with razor-sharp forehead box lineup and clean low temple taper.'
  },
  {
    id: 'gal-4',
    title: 'Burst Fade & Geometric Razor Part',
    category: 'designs',
    imageUrl: '/portfolio/cut4_burst_fade.jpg',
    caption: 'High-contrast burst fade curve featuring custom geometric razor slash art and sponge curl texture.'
  },
  {
    id: 'gal-5',
    title: 'Master Clipper Detailing & Shape-Up',
    category: 'fades',
    imageUrl: '/portfolio/cut5_clippers_lineup.jpg',
    caption: 'Master barber action shot delivering a laser-precise hairline edge-up using professional gold clippers.'
  },
  {
    id: 'gal-6',
    title: 'Afro Taper Fade & Beard Blend',
    category: 'beards',
    imageUrl: '/portfolio/cut6_low_taper.jpg',
    caption: 'Clean low temple and neck taper fade seamlessly connecting into a well-conditioned, full sculpted beard.'
  }
];

export const SERVICE_CITIES = [
  { name: 'Downtown & Midtown Atlanta', area: 'Central Metro', tier: '0 – 10 miles (+$15)' },
  { name: 'Buckhead & Brookhaven', area: 'North Metro', tier: '0 – 10 miles (+$15)' },
  { name: 'Sandy Springs & Dunwoody', area: 'Perimeter North', tier: '11 – 20 miles (+$25)' },
  { name: 'Marietta & Smyrna', area: 'Cobb County', tier: '11 – 20 miles (+$25)' },
  { name: 'Alpharetta & Roswell', area: 'North Fulton', tier: '21 – 30 miles (+$40)' },
  { name: 'Decatur & Stone Mountain', area: 'DeKalb County', tier: '11 – 20 miles (+$25)' },
  { name: 'College Park & East Point', area: 'South Fulton / Airport', tier: '11 – 20 miles (+$25)' },
  { name: 'Custom Metro Atlanta Area', area: 'Georgia', tier: 'Custom Distance Fee' },
];
