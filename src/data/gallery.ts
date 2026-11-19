export type GalleryCategory = 'All' | 'Couple' | 'Celebrations' | 'Heritage';

export interface GalleryItem {
  id: string;
  figureNumber: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'All'>;
  location: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'tall';
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    figureNumber: 'Fig. 01',
    title: 'Beneath the Sandstone Arch',
    caption: 'Ananya and Vikramaditya in embroidered maroon zardozi and raw silk ivory.',
    category: 'Couple',
    location: 'City Palace Colonnade',
    image: '/src/assets/images/couple_portrait_royal_1795071653864.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-2',
    figureNumber: 'Fig. 02',
    title: 'Lanterns at Dusk',
    caption: 'An unhurried walk through the carved colonnades as the evening lamps awake.',
    category: 'Couple',
    location: 'Zenana Veranda, Udaipur',
    image: '/src/assets/images/couple_engagement_courtyard_1795071654014.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    figureNumber: 'Fig. 03',
    title: 'Henna, Kundan & Mogra',
    caption: 'Traditional Rajasthani bridal motifs framed by heirloom gold and fresh jasmine.',
    category: 'Celebrations',
    location: 'Lotus Garden Pavilion',
    image: '/src/assets/images/ceremony_mehendi_details_1795071653524.jpg',
    aspect: 'portrait',
  },
  {
    id: 'gal-4',
    figureNumber: 'Fig. 04',
    title: 'The Courtyard of Reflections',
    caption: 'Floating pink lotuses and sunlit sandstone arches awaiting the Baraat.',
    category: 'Heritage',
    location: 'Jagmandir Island Palace',
    image: '/src/assets/images/venue_royal_palace_1795071653753.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-5',
    figureNumber: 'Fig. 05',
    title: 'The Sacred Mandap',
    caption: 'Marigold garlands and ivory silk draped before the golden-hour waters of Pichola.',
    category: 'Celebrations',
    location: 'Mandap Courtyard',
    image: '/src/assets/images/hero_palace_mandap_1795071653785.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    figureNumber: 'Fig. 06',
    title: 'Twilight Over Pichola',
    caption: 'Brass diyas and crimson rose petals along the marble terrace at nightfall.',
    category: 'Heritage',
    location: 'Lakeside Terrace',
    image: '/src/assets/images/closing_twilight_terrace_1795071654375.jpg',
    aspect: 'landscape',
  },
];
