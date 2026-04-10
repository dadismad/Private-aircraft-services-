/**
 * NovansJets – Aircraft Data
 * Complete specifications for all aircraft in the fleet
 */

const AIRCRAFT_DATA = {

  /* ─── Ultra Long Range ─── */
  gulfstream_g650er: {
    id: 'gulfstream_g650er',
    name: 'Gulfstream G650ER',
    category: 'Ultra Long Range',
    categorySlug: 'ultra-long-range',
    tagline: 'The pinnacle of long-range business aviation',
    heroImage: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '7,500 nm', label: 'Range' },
      capacity: { value: 'Up to 19', label: 'Passengers' },
      speed:    { value: 'Mach 0.925', label: 'Cruise Speed' },
      cabin:    { value: "46'11\" × 8'6\"", label: 'Cabin L × W' },
      height:   { value: "6'3\"", label: 'Cabin Height' },
      baggage:  { value: '195 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'Ultra Long-Range Business Travel',
      'Head-of-State Missions',
      'Intercontinental Charters',
      'VIP Leisure Travel',
      'Executive Corporate Programs',
      'Media & Entertainment'
    ],
    description: 'The Gulfstream G650ER represents the very apex of ultra-long-range business aviation. With a range of 7,500 nautical miles, it effortlessly connects London to Singapore or New York to Dubai nonstop. Its cabin — the widest, tallest, and longest of any purpose-built business jet in Gulfstream\'s fleet — offers unrivalled comfort, featuring up to four living areas, 16 signature seats and multiple divan configurations. Powered by twin Rolls-Royce BR725 engines, the G650ER cruises at Mach 0.90 while maintaining the quietest cabin environment at altitude.',
    hotspot: { x: 30, y: 52 }
  },

  /* ─── Long Range ─── */
  bombardier_global7500: {
    id: 'bombardier_global7500',
    name: 'Bombardier Global 7500',
    category: 'Long Range',
    categorySlug: 'long-range',
    tagline: 'Redefining long-range luxury',
    heroImage: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1568797629192-789acf8e4df3?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '7,700 nm', label: 'Range' },
      capacity: { value: 'Up to 19', label: 'Passengers' },
      speed:    { value: 'Mach 0.925', label: 'Cruise Speed' },
      cabin:    { value: "54'4\" × 8'2\"", label: 'Cabin L × W' },
      height:   { value: "6'3\"", label: 'Cabin Height' },
      baggage:  { value: '195 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'Transatlantic Business Travel',
      'Transpacific Charters',
      'Ultra Long-Haul Leisure',
      'Corporate Shuttle Programs',
      'Government & Diplomatic Travel',
      'Cargo & Time-Sensitive Freight'
    ],
    description: 'The Bombardier Global 7500 sets a new world record for range — the longest-range business jet ever built. With four distinct living spaces including a dedicated master suite and full galley, it transforms the concept of long-range flight into a seamless hospitality experience. Powered by GE Passport engines producing exceptional fuel efficiency, the Global 7500 connects New York directly to Hong Kong, or London to Sydney with a single stop.',
    hotspot: { x: 55, y: 50 }
  },

  /* ─── Super Midsize ─── */
  dassault_falcon8x: {
    id: 'dassault_falcon8x',
    name: 'Dassault Falcon 8X',
    category: 'Super Midsize',
    categorySlug: 'super-midsize',
    tagline: 'European excellence in long-range efficiency',
    heroImage: 'https://images.unsplash.com/photo-1602468432860-39b1c1bc76db?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601751987911-3c0e23b74d33?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '6,450 nm', label: 'Range' },
      capacity: { value: 'Up to 16', label: 'Passengers' },
      speed:    { value: 'Mach 0.90', label: 'Cruise Speed' },
      cabin:    { value: "39'2\" × 8'6\"", label: 'Cabin L × W' },
      height:   { value: "6'2\"", label: 'Cabin Height' },
      baggage:  { value: '140 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'Transatlantic Business Charters',
      'European Hub Connectivity',
      'VIP Leisure Journeys',
      'Time-Critical Executive Travel',
      'Mid-Distance Cargo',
      'Private Medical Transport'
    ],
    description: "Dassault's Falcon 8X epitomises the refinement and engineering precision for which French aviation is renowned. Its tri-engine configuration offers exceptional hot-and-high performance, accessing runways unavailable to twin-engine competitors. The whisper-quiet, wide cabin features hand-stitched Italian leather, custom burl wood veneers, and an advanced EASy III flight deck. With 6,450 nm of range, the Falcon 8X connects Europe to the Americas or the Middle East to Southeast Asia in uninterrupted comfort.",
    hotspot: { x: 48, y: 58 }
  },

  /* ─── Midsize ─── */
  cessna_longitude: {
    id: 'cessna_longitude',
    name: 'Cessna Citation Longitude',
    category: 'Midsize Jet',
    categorySlug: 'midsize',
    tagline: 'Super-midsize performance at exceptional value',
    heroImage: 'https://images.unsplash.com/photo-1575912151746-67e3c7e2a7e4?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544016768-982d1554f7de?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '3,500 nm', label: 'Range' },
      capacity: { value: 'Up to 12', label: 'Passengers' },
      speed:    { value: 'Mach 0.84', label: 'Cruise Speed' },
      cabin:    { value: "25'0\" × 6'2\"", label: 'Cabin L × W' },
      height:   { value: "6'0\"", label: 'Cabin Height' },
      baggage:  { value: '100 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'Domestic Business Travel',
      'Regional Charter Hops',
      'Small Group Leisure Trips',
      'Corporate Shuttle',
      'Short-Notice Bookings',
      'Fractional Ownership Programs'
    ],
    description: 'The Cessna Citation Longitude bridges the gap between midsize and super-midsize categories with a stand-up, flat-floor cabin that accommodates up to 12 passengers in exceptional comfort. Powered by Honeywell HTF7700L turbofan engines, it achieves transcontinental range with best-in-class fuel efficiency. The fully enclosed lavatory, 25-foot cabin with eight individual club seats, and cutting-edge Garmin G5000 avionics suite make every journey effortless.',
    hotspot: { x: 68, y: 62 }
  },

  /* ─── Light Jet ─── */
  embraer_phenom300e: {
    id: 'embraer_phenom300e',
    name: 'Embraer Phenom 300E',
    category: 'Light Jet',
    categorySlug: 'light-jet',
    tagline: 'The world\'s best-selling light jet, refined',
    heroImage: 'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1602468432860-39b1c1bc76db?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590415629667-4c7d5c8fb49f?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '2,010 nm', label: 'Range' },
      capacity: { value: 'Up to 9', label: 'Passengers' },
      speed:    { value: 'Mach 0.82', label: 'Cruise Speed' },
      cabin:    { value: "17'2\" × 5'1\"", label: 'Cabin L × W' },
      height:   { value: "4'11\"", label: 'Cabin Height' },
      baggage:  { value: '84 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'Regional Executive Hops',
      'Day-Trip Business Travel',
      'Leisure Weekend Getaways',
      'City-Pair Charter',
      'Short-Distance Cargo',
      'Cost-Efficient Fractional Ownership'
    ],
    description: 'The Embraer Phenom 300E is the most delivered light jet in aviation history — a distinction it has earned for over a decade running. Its oval cross-section cabin, larger than any competitor in its class, accommodates up to nine passengers with four individual recliners and a separate lavatory. The Phenom 300E offers unmatched range, speed, and cabin ambiance in the light jet segment, making it the intelligent choice for agile, cost-conscious travel.',
    hotspot: { x: 78, y: 55 }
  },

  /* ─── Helicopter ─── */
  aw139_helicopter: {
    id: 'aw139_helicopter',
    name: 'AgustaWestland AW139',
    category: 'VIP Helicopter',
    categorySlug: 'helicopter',
    tagline: 'Unmatched versatility — sea, mountain and city',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=960&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595014069456-400e2e4cf4db?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549436369-f6699cfc2e33?w=600&auto=format&fit=crop'
    ],
    specs: {
      range:    { value: '570 nm', label: 'Range' },
      capacity: { value: 'Up to 15', label: 'Passengers' },
      speed:    { value: '306 km/h', label: 'Cruise Speed' },
      cabin:    { value: "19'3\" × 6'5\"", label: 'Cabin L × W' },
      height:   { value: "4'8\"", label: 'Cabin Height' },
      baggage:  { value: '40 cu ft', label: 'Baggage Volume' }
    },
    usages: [
      'VIP Heli-Charter',
      'Airport Transfer & Last-Mile',
      'Offshore Platform Operations',
      'Medevac & Search-and-Rescue',
      'Mountain Resort Access',
      'Superyacht Transfer & Support'
    ],
    description: 'The AgustaWestland AW139 is the world-leading multi-purpose helicopter, renowned for combining exceptional performance with VIP comfort. Its spacious cabin accommodates up to 15 passengers in an airline-style layout or can be configured in an ultra-luxurious 4-6 seat VIP arrangement with leather seating, panoramic windows, and bespoke interior fittings. Powered by twin Pratt & Whitney PT6C-67C turboshaft engines, the AW139 can access remote mountain runways, superyacht helipads, and urban landing zones with unmatched versatility.',
    hotspot: { x: 85, y: 46 }
  }
};

// Ordered list for display
const FLEET_ORDER = [
  'gulfstream_g650er',
  'bombardier_global7500',
  'dassault_falcon8x',
  'cessna_longitude',
  'embraer_phenom300e',
  'aw139_helicopter'
];

// Category filter groups
const FLEET_CATEGORIES = [
  { slug: 'all',              label: 'All Aircraft' },
  { slug: 'ultra-long-range', label: 'Ultra Long Range' },
  { slug: 'long-range',       label: 'Long Range' },
  { slug: 'super-midsize',    label: 'Super Midsize' },
  { slug: 'midsize',          label: 'Midsize' },
  { slug: 'light-jet',        label: 'Light Jet' },
  { slug: 'helicopter',       label: 'Helicopter' }
];
