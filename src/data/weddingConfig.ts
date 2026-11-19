export interface FamilyMemberGroup {
  heading: string;
  names: string[];
}

export interface FamilyProfile {
  title: string;
  familySurname: string;
  city: string;
  groups: FamilyMemberGroup[];
  blessingQuote: string;
}

export interface WeddingConfig {
  brandName: string;
  monogram: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingEndDate: string;
  displayDate: string;
  displayDay: string;
  displayMonth: string;
  displayMonthShort: string;
  displayYear: string;
  displayDateNumber: string;
  weddingLocation: string;
  venueName: string;
  venueSubtitle: string;
  venueAddress: string;
  mapsUrl: string;
  invitationTitle: string;
  ganeshayNamahDevanagari: string;
  sanskritBlessing: string;
  sanskritTranslation: string;
  introduction: string;
  heroMessage: string;
  hangingGalleryQuote: string;
  closingHeadline: string;
  heroImage: string;
  venueImage: string;
  closingImage: string;
  brideFamily: FamilyProfile;
  groomFamily: FamilyProfile;
  theme: {
    primary: string;
    deep: string;
    secondary: string;
    mutedGold: string;
    background: string;
    cream: string;
    beige: string;
    text: string;
  };
  socialLinks: {
    instagram?: string;
    hashtag?: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  musicUrl: string;
  rsvpEnabled: boolean;
  rsvpDeadline: string;
  credits: string;
}

export const weddingConfig: WeddingConfig = {
  brandName: 'Ananya & Vikramaditya',
  monogram: 'A & V',
  brideName: 'Ananya',
  groomName: 'Vikramaditya',
  weddingDate: '2027-02-14T16:30:00+05:30',
  weddingEndDate: '2027-02-14T23:30:00+05:30',
  displayDate: 'February 14, 2027',
  displayDay: 'Sunday',
  displayMonth: 'February',
  displayMonthShort: 'FEB',
  displayYear: '2027',
  displayDateNumber: '14',
  weddingLocation: 'Udaipur, Rajasthan',
  venueName: 'Jagmandir Island Palace',
  venueSubtitle: 'Lake Pichola',
  venueAddress: 'Pichola Lake, City Palace Complex, Udaipur, Rajasthan 313001',
  mapsUrl: 'https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur+Rajasthan',
  invitationTitle: 'Shubh Vivah',
  ganeshayNamahDevanagari: '॥ श्री गणेशाय नमः ॥',
  sanskritBlessing: 'ॐ श्री गणेशाय नमः',
  sanskritTranslation:
    'With the blessings of our elders, two families unite in enduring grace and joy.',
  introduction: 'Together with their families',
  heroMessage: 'Joyfully invite you to celebrate their wedding.',
  hangingGalleryQuote: 'Two hearts, one timeless celebration.',
  closingHeadline: 'We would be delighted to have you with us.',
  heroImage: '/src/assets/images/hero_couple_invitation_1795089873573.jpg',
  venueImage: '/src/assets/images/venue_royal_palace_1795071653753.jpg',
  closingImage: '/src/assets/images/closing_twilight_terrace_1795071654375.jpg',
  brideFamily: {
    title: "Bride's Family",
    familySurname: 'The Sharma Family',
    city: 'New Delhi & Jaipur',
    groups: [
      {
        heading: 'Grandparents',
        names: ['Late Smt. Kamla Devi & Late Shri Raghunath Sharma'],
      },
      {
        heading: 'Parents',
        names: ['Smt. Meenakshi & Shri Arvind Sharma'],
      },
      {
        heading: 'Siblings',
        names: ['Devika & Siddharth Malhotra', 'Aarav Sharma'],
      },
    ],
    blessingQuote: 'Welcoming you with love to share in our daughter’s sacred union.',
  },
  groomFamily: {
    title: "Groom's Family",
    familySurname: 'The Rathore Family',
    city: 'Udaipur & Jodhpur',
    groups: [
      {
        heading: 'Grandparents',
        names: ['Rajmata Gayatri Devi & Late Thakur Pratap Singh Rathore'],
      },
      {
        heading: 'Parents',
        names: ['Smt. Vasundhara & Shri Mahendra Singh Rathore'],
      },
      {
        heading: 'Siblings',
        names: ['Raghavendra & Nandini Rathore', 'Tara Rathore'],
      },
    ],
    blessingQuote: 'Honoured to welcome Ananya and celebrate beside our cherished kin.',
  },
  theme: {
    primary: '#651E2B',
    deep: '#43131F',
    secondary: '#C59A52',
    mutedGold: '#D8B77C',
    background: '#F8F5EC',
    cream: '#F2EBDD',
    beige: '#EAE0CF',
    text: '#352720',
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    hashtag: '#AnanyaVikram2027',
  },
  contact: {
    phone: '+91 98290 41208',
    email: 'celebrations@ananyavikram2027.com',
  },
  musicUrl: '',
  rsvpEnabled: true,
  rsvpDeadline: 'January 10, 2027',
  credits: 'Ananya & Vikramaditya · Udaipur',
};
