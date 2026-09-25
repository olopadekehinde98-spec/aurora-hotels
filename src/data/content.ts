export type Photo = { id: string; alt: string }

export const brand = {
  name: 'AURORA',
  sub: 'HOTELS & RESORTS',
  tagline: 'A World of Exceptional Hospitality.',
  sign: 'Stay Extraordinary.',
}

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Stays', href: '#stays' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Dining', href: '#experiences' },
  { label: 'About', href: '#footer' },
]

/** The vertical index down the right of the hero. */
export const heroChapters = [
  { n: '01', label: 'Stay', href: '#stays' },
  { n: '02', label: 'Dine', href: '#experiences' },
  { n: '03', label: 'Unwind', href: '#experiences' },
  { n: '04', label: 'Explore', href: '#destinations' },
]

export const heroSlides: { photo: Photo; resort: string; place: string }[] = [
  {
    photo: { id: '1561501900-3701fa6a0864', alt: 'Cliffside resort terrace and infinity pool above the sea at sunset' },
    resort: 'Aurora Cliff Resort',
    place: 'Santorini, Greece',
  },
  {
    photo: { id: '1571003123894-1f0594d2b5d9', alt: 'Infinity pool lined with curtained cabanas glowing at dusk' },
    resort: 'Aurora Beach Club',
    place: 'Seminyak, Bali',
  },
  {
    photo: { id: '1542314831-068cd1dbfeeb', alt: 'Lit pool pavilion at blue hour with loungers and palms' },
    resort: 'Aurora Palm Retreat',
    place: 'Palm Jumeirah, Dubai',
  },
]

export type Room = { name: string; note: string; blurb: string; size: string; guests: string; photo: Photo }

export const rooms: Room[] = [
  {
    name: 'Ocean View Suite',
    note: 'Wake up to endless blue',
    blurb: 'A corner suite with floor-to-ceiling glass, a deep soaking tub and a terrace that faces the sunrise.',
    size: '68 m²',
    guests: '2 guests',
    photo: { id: '1578683010236-d716f9a3f461', alt: 'Suite bedroom with floor-to-ceiling windows over the sea' },
  },
  {
    name: 'Private Pool Villa',
    note: 'Your own private paradise',
    blurb: 'Walled garden, private pool and an outdoor shower — the villa you never quite want to leave.',
    size: '140 m²',
    guests: '4 guests',
    photo: { id: '1582610116397-edb318620f90', alt: 'Private villa courtyard with its own pool framed by palms' },
  },
  {
    name: 'Deluxe Room',
    note: 'Modern comfort',
    blurb: 'Warm timber, a generous king bed and a quiet balcony above the gardens.',
    size: '42 m²',
    guests: '2 guests',
    photo: { id: '1611892440504-42a792e24d32', alt: 'Warmly lit deluxe hotel room with timber ceiling' },
  },
  {
    name: 'Family Suite',
    note: 'Space for everyone',
    blurb: 'Two bedrooms, a lounge and a terrace built for long breakfasts and late card games.',
    size: '96 m²',
    guests: '5 guests',
    photo: { id: '1590490360182-c33d57733427', alt: 'Elegant family suite with seating area and soft lamps' },
  },
]

export type Destination = { city: string; country: string; note: string; hotels: number; photo: Photo }

export const destinations: Destination[] = [
  {
    city: 'Maldives',
    country: 'Tropical Paradise',
    note: 'Overwater villas on a private lagoon.',
    hotels: 3,
    photo: { id: '1573843981267-be1999ff37cd', alt: 'Overwater villas on a turquoise Maldivian lagoon' },
  },
  {
    city: 'Santorini',
    country: 'Greece',
    note: 'Caldera views and whitewashed terraces.',
    hotels: 2,
    photo: { id: '1613395877344-13d4a8e0d49e', alt: 'Blue domed churches above the Aegean in Santorini' },
  },
  {
    city: 'Dubai',
    country: 'UAE',
    note: 'Skyline suites and desert escapes.',
    hotels: 4,
    photo: { id: '1518684079-3c830dcef090', alt: 'Burj Al Arab hotel on its island in the Gulf' },
  },
  {
    city: 'Amalfi Coast',
    country: 'Italy',
    note: 'Cliffside villages above the Tyrrhenian.',
    hotels: 2,
    photo: { id: '1533105079780-92b9be482077', alt: 'Whitewashed cliffside village above deep blue sea' },
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    note: 'Jungle pools and long golden evenings.',
    hotels: 3,
    photo: { id: '1596178065887-1198b6148b2b', alt: 'Palm-lined resort pool in Bali at golden hour' },
  },
]

export const experiences = [
  {
    title: 'Dining',
    note: 'Culinary Excellence',
    blurb: 'Tasting menus, chef’s tables and long lunches that run into the evening.',
    photo: { id: '1414235077428-338989a2e8c0', alt: 'Candlelit fine dining course with wine glasses' },
  },
  {
    title: 'Wellness & Spa',
    note: 'Relax and Rejuvenate',
    blurb: 'Hot stone therapy, hammams and treatments built around your stay.',
    photo: { id: '1600334129128-685c5582fd35', alt: 'Hot stone massage treatment with white orchids' },
  },
  {
    title: 'Private Excursions',
    note: 'Explore Beyond',
    blurb: 'Yacht charters, island picnics and guided routes with a private host.',
    photo: { id: '1567899378494-47b22a2ae96a', alt: 'Superyacht cruising turquoise water near a green coast' },
  },
  {
    title: 'Events & Celebrations',
    note: 'Make it Unforgettable',
    blurb: 'Weddings, anniversaries and gatherings styled down to the last candle.',
    photo: { id: '1519225421980-715cb0215aed', alt: 'Long celebration table set with flowers and candles' },
  },
]

export const offer = {
  title: 'Santorini Getaway',
  detail: '4 Nights • Ocean View Suite',
  price: '$1,299',
  from: 'From',
  includes: ['Daily breakfast for two', 'Sunset dinner at the cliff', 'Private airport transfer'],
  photo: { id: '1571003123894-1f0594d2b5d9', alt: 'Resort infinity pool and cabanas glowing at sunset' },
}

export const footerColumns = [
  { title: 'Explore', links: ['Stays', 'Destinations', 'Experiences', 'Dining'] },
  { title: 'Company', links: ['About', 'Our Story', 'Sustainability', 'Careers'] },
  { title: 'Support', links: ['FAQs', 'Contact', 'Privacy Policy', 'Terms of Service'] },
]
