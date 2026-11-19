export type MotifType =
  | 'kalash'
  | 'haldi'
  | 'mehendi'
  | 'sangeet'
  | 'mandap'
  | 'reception';

export interface WeddingEvent {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  dayLabel: string;
  time: string;
  venue: string;
  attire: string;
  description: string;
  motif: MotifType;
  image?: string;
  featuredInCeremonies?: boolean;
}

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'engagement',
    name: 'Engagement',
    subtitle: 'Sagai & Tilak',
    date: 'February 12, 2027',
    dayLabel: 'Day One',
    time: '11:00 AM',
    venue: 'Darbar Hall, City Palace',
    attire: 'Heritage Ivory & Pastels',
    description: 'Exchange of rings, sacred tilak blessings, and courtyard lunch.',
    motif: 'kalash',
    image: '/src/assets/images/couple_engagement_courtyard_1795071654014.jpg',
    featuredInCeremonies: true,
  },
  {
    id: 'haldi',
    name: 'Haldi',
    subtitle: 'Pithi Dastoor',
    date: 'February 13, 2027',
    dayLabel: 'Day Two',
    time: '10:00 AM',
    venue: 'Mor Chowk Terrace',
    attire: 'Marigold Yellow & Cotton',
    description: 'Turmeric, sandalwood, and rosewater blessings amid marigold showers.',
    motif: 'haldi',
    featuredInCeremonies: false,
  },
  {
    id: 'mehendi',
    name: 'Mehendi',
    subtitle: 'Henna & Folk Afternoon',
    date: 'February 13, 2027',
    dayLabel: 'Day Two',
    time: '2:30 PM',
    venue: 'Lotus Garden Pavilion',
    attire: 'Emerald & Festive Prints',
    description: 'Bridal henna, manganiyar folk melodies, and shaded pavilion tea.',
    motif: 'mehendi',
    image: '/src/assets/images/ceremony_mehendi_details_1795071653524.jpg',
    featuredInCeremonies: true,
  },
  {
    id: 'sangeet',
    name: 'Sangeet',
    subtitle: 'Music & Lanterns',
    date: 'February 13, 2027',
    dayLabel: 'Day Two',
    time: '7:30 PM',
    venue: 'Zenana Mahal Courtyard',
    attire: 'Jewel Tones & Indo-Western',
    description: 'An evening of family music, dance, and candlelit courtyard dining.',
    motif: 'sangeet',
    image: '/src/assets/images/closing_twilight_terrace_1795071654375.jpg',
    featuredInCeremonies: true,
  },
  {
    id: 'wedding',
    name: 'Wedding',
    subtitle: 'Baraat & Sacred Pheras',
    date: 'February 14, 2027',
    dayLabel: 'Day Three',
    time: '4:30 PM',
    venue: 'Jagmandir Island Palace',
    attire: 'Indian Formal · Crimson & Gold',
    description: 'Boat arrival across Lake Pichola, Varmala, and sunset Vedic Pheras.',
    motif: 'mandap',
    image: '/src/assets/images/hero_palace_mandap_1795071653785.jpg',
    featuredInCeremonies: true,
  },
  {
    id: 'reception',
    name: 'Reception',
    subtitle: 'Aashirwad Dinner',
    date: 'February 14, 2027',
    dayLabel: 'Day Three',
    time: '8:45 PM',
    venue: 'Darikhana Courtyard',
    attire: 'Evening Heritage Formals',
    description: 'Royal banquet and blessings beneath the lakefront stars.',
    motif: 'reception',
    image: '/src/assets/images/couple_portrait_royal_1795071653864.jpg',
    featuredInCeremonies: false,
  },
];
