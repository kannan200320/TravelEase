// Mock data for TravelEase (Indian Rupee ₹)

export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  label: 'INR (₹)',
  locale: 'en-IN',
};

export const PROMO_CODES = [
  { code: 'EASE10', discountType: 'percentage', value: 10, description: '10% OFF on all bookings' },
  { code: 'EXPLORE3000', discountType: 'fixed', value: 3000, description: '₹3,000 OFF on orders above ₹40,000' },
  { code: 'VIP5000', discountType: 'fixed', value: 5000, description: '₹5,000 OFF luxury packages' },
  { code: 'SUMMER2026', discountType: 'percentage', value: 15, description: '15% Summer Special discount' },
];

export const TRAVEL_CATEGORIES = [
  {
    id: 'beach',
    name: 'Beaches & Islands',
    icon: 'Palmtree',
    count: '24 Packages',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine turquoise waters, white sand beaches, and tropical luxury resorts.'
  },
  {
    id: 'mountain',
    name: 'Mountain & Alpine',
    icon: 'Mountain',
    count: '18 Packages',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    description: 'Majestic peaks, scenic alpine trains, trekking, and cozy chalets.'
  },
  {
    id: 'cultural',
    name: 'Culture & Heritage',
    icon: 'Landmark',
    count: '32 Packages',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Ancient temples, historic castles, culinary traditions, and UNESCO heritage sites.'
  },
  {
    id: 'wildlife',
    name: 'Wildlife & Safari',
    icon: 'Compass',
    count: '14 Packages',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Big Five safari games, untouched savannahs, and authentic nature lodges.'
  },
  {
    id: 'city',
    name: 'Metropolitan & City',
    icon: 'Building2',
    count: '21 Packages',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    description: 'Skyline towers, Michelin dining, world-class nightlife, and shopping.'
  },
  {
    id: 'romantic',
    name: 'Honeymoon & Romance',
    icon: 'Heart',
    count: '16 Packages',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Intimate sunset cruises, overwater villas, and bespoke candlelit dinners.'
  }
];

export const DESTINATIONS = [
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Island of the Gods, Sacred Temples & Tropical Cascades',
    packagesCount: 4,
    startingPrice: 69999,
    weather: '29°C Tropical',
    rating: 4.9,
    reviews: 1240,
    featured: true,
    description: 'Bali seduces with dramatic volcanic hills, lush terraced rice paddies, enchanting traditional dances, and legendary surf breaks surrounded by warm spiritual hospitality.'
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Cobalt Domes, Caldera Sunsets & Aegean Bliss',
    packagesCount: 3,
    startingPrice: 119999,
    weather: '24°C Sunny',
    rating: 4.95,
    reviews: 980,
    featured: true,
    description: 'Carved high into the cliffs overlooking a sunken volcano, Santorini boasts world-renowned whitewashed villages, cobalt-blue church domes, and jaw-dropping sunset panoramas.'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Snow-Capped Peaks, Glacier Trains & Pure Serenity',
    packagesCount: 4,
    startingPrice: 155000,
    weather: '16°C Crisp Alpine',
    rating: 4.88,
    reviews: 840,
    featured: true,
    description: 'Experience fairy-tale mountain valleys, world-famous scenic train journeys like the Glacier Express, crystal-clear glacial lakes, and traditional Swiss chocolate tastings.'
  },
  {
    id: 'kyoto-tokyo',
    name: 'Tokyo & Kyoto',
    country: 'Japan',
    region: 'Asia',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Futuristic Metropolises & Timeless Zen Sanctuaries',
    packagesCount: 3,
    startingPrice: 135000,
    weather: '20°C Mild',
    rating: 4.92,
    reviews: 1120,
    featured: true,
    description: 'A mesmerizing balance of ultra-modern neon-lit skyscrapers, robot cafes, centuries-old Shinto shrines, tranquil bamboo groves, and unforgettable culinary journeys.'
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    category: 'romantic',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Pastel Cliffside Towns, Limoncello & Mediterranean Glamour',
    packagesCount: 3,
    startingPrice: 125000,
    weather: '26°C Mediterranean',
    rating: 4.86,
    reviews: 740,
    featured: false,
    description: 'Perched vertically above sapphire waters, Positano and Amalfi offer pastel villas, fragrant lemon groves, legendary seaside trattorias, and private vintage yacht excursions.'
  },
  {
    id: 'serengeti-zanzibar',
    name: 'Serengeti & Zanzibar',
    country: 'Tanzania',
    region: 'Africa',
    category: 'wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The Great Migration & Spice Island White Sands',
    packagesCount: 2,
    startingPrice: 195000,
    weather: '28°C Warm Savannah',
    rating: 4.94,
    reviews: 620,
    featured: false,
    description: 'Witness millions of wildebeest in the legendary Serengeti plains followed by pristine relaxation in Zanzibar’s turquoise spice waters and historic Stone Town.'
  },
  {
    id: 'banff-rockies',
    name: 'Banff National Park',
    country: 'Canada',
    region: 'Americas',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Glacial Turquoise Waters & Canadian Wilderness',
    packagesCount: 3,
    startingPrice: 95000,
    weather: '18°C Fresh Breeze',
    rating: 4.89,
    reviews: 890,
    featured: false,
    description: 'Famous for Lake Louise’s surreal turquoise water, majestic pine forests, grizzly bear reserves, and world-class hiking amidst the towering Canadian Rocky Mountains.'
  },
  {
    id: 'dubai-abu-dhabi',
    name: 'Dubai & Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Middle East',
    category: 'city',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Futuristic Luxury, Golden Dunes & Architectural Marvels',
    packagesCount: 4,
    startingPrice: 79999,
    weather: '31°C Sunny Desert',
    rating: 4.84,
    reviews: 1350,
    featured: true,
    description: 'Towering skylines featuring the Burj Khalifa, ultra-luxurious private desert dune safaris, indoor ski slopes, and the majestic Sheikh Zayed Grand Mosque.'
  }
];

export const TRAVEL_PACKAGES = [
  {
    id: 'pkg-bali-paradise',
    slug: 'magical-bali-retreat-island-escape',
    title: 'Magical Bali Island & Ubud Culture Escape',
    destinationId: 'bali-indonesia',
    destinationName: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    category: 'beach',
    durationDays: 7,
    durationNights: 6,
    price: 69999,
    originalPrice: 84999,
    badge: 'Best Seller',
    featured: true,
    rating: 4.9,
    reviewCount: 384,
    groupSize: 'Max 12 People',
    transport: 'Private AC Van & Fast Boats',
    languages: 'English, Hindi, Indonesian',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Immerse yourself in the spiritual heartbeat and tropical splendor of Bali. Spend 3 enchanting nights in the jungle sanctuary of Ubud surrounded by emerald rice terraces and artisan craft markets, followed by 3 rejuvenating nights at a 5-star beachfront resort in Seminyak with sunset beach clubs and marine adventures.',
    highlights: [
      'Sunrise hike to Mount Batur summit with volcanic breakfast',
      'Private blessing ceremony with a Balinese high priest',
      'Traditional floating breakfast in a private Ubud jungle pool villa',
      'Snorkeling excursion with majestic manta rays at Nusa Penida',
      'Sunset seafood barbecue on the sands of Jimbaran Bay',
      'Visit to Sacred Monkey Forest and Tirta Empul water temple'
    ],
    inclusions: [
      '6 nights in luxury 5-star boutique resorts & pool villas',
      'Daily gourmet buffet breakfast and 4 curated dinners (Veg/Non-veg options)',
      'All airport and private transfer vehicles with dedicated chauffeur',
      'Speedboat transfer to Nusa Penida island',
      'All temple entry fees, national park permits, and local taxes',
      '24/7 TravelEase dedicated personal concierge support'
    ],
    exclusions: [
      'International roundtrip flights',
      'Personal travel insurance (available as an optional add-on)',
      'Alcoholic beverages outside of curated dinners',
      'Personal shopping and optional spa treatments'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Denpasar & Welcome to Ubud Jungle Sanctuary',
        description: 'Arrive at Ngurah Rai International Airport where your private driver warmly greets you with cold towels and fresh coconuts. Check into your luxury Ubud forest villa. In the evening, enjoy a candlelit Balinese royal banquet with traditional Gamelan music.',
        meals: 'Dinner included',
        stay: 'Kamandalu Ubud Resort & Spa'
      },
      {
        day: 2,
        title: 'Tegallalang Rice Terraces, Coffee Tasting & Sacred Temples',
        description: 'Start early to watch the mist rise over the iconic Tegallalang Terraces. Sip organic Luwak coffee at a hillside plantation, visit the holy spring waters of Tirta Empul for an optional purification ritual, and explore Ubud Palace.',
        meals: 'Breakfast & Lunch included',
        stay: 'Kamandalu Ubud Resort & Spa'
      },
      {
        day: 3,
        title: 'Mount Batur Sunrise Trek or Gentle Wellness Spa Day',
        description: 'Choose your adventure: embark on a guided sunrise trek up Mount Batur caldera for breathtaking panoramas above the clouds, or indulge in a relaxing morning 3-hour Balinese flower bath and herbal body scrub.',
        meals: 'Breakfast included',
        stay: 'Kamandalu Ubud Resort & Spa'
      },
      {
        day: 4,
        title: 'Journey to Seminyak Coast & Uluwatu Sunset Kecak Dance',
        description: 'Transfer south toward the golden coast of Seminyak. Check into your beachfront oceanfront suite. In the late afternoon, head to Uluwatu Temple perched 70 meters above the roaring Indian Ocean to witness the mesmerizing fire Kecak dance at sunset.',
        meals: 'Breakfast & Seafood Dinner',
        stay: 'The Seminyak Beach Resort'
      },
      {
        day: 5,
        title: 'Fast Boat to Nusa Penida & Kelingking T-Rex Beach',
        description: 'Board a high-speed catamaran to Nusa Penida. Marvel at the dramatic dinosaur-shaped cliffs of Kelingking Beach, snorkel the crystal-clear waters of Crystal Bay, and witness giant manta rays gliding gracefully beneath you.',
        meals: 'Breakfast & Beach Lunch',
        stay: 'The Seminyak Beach Resort'
      },
      {
        day: 6,
        title: 'Leisure Day, Beach Clubs & Farewell Sunset Yacht Cruise',
        description: 'Enjoy a leisurely morning relaxing by the infinity pool or browsing chic boutiques. In the evening, board a luxury catamaran for a sunset cruise along the coastline.',
        meals: 'Breakfast & Farewell Cocktail Dinner',
        stay: 'The Seminyak Beach Resort'
      },
      {
        day: 7,
        title: 'Souvenir Shopping & Airport Departure',
        description: 'Enjoy your final tropical breakfast, pick up handmade artisan crafts, and transfer comfortably to the airport for your onward journey with unforgettable memories.',
        meals: 'Breakfast included',
        stay: 'Departure'
      }
    ],
    hotelDetails: {
      name: 'Kamandalu Ubud & The Seminyak Resort',
      rating: 5,
      amenities: ['Infinity Jungle Pools', 'Private Beach Access', 'Holistic Ayurvedic Spa', 'High-Speed Wi-Fi', 'Free Shuttle']
    }
  },
  {
    id: 'pkg-santorini-dream',
    slug: 'santorini-luxury-caldera-sunset-cruise',
    title: 'Santorini Caldera Elegance & Private Catamaran',
    destinationId: 'santorini-greece',
    destinationName: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'romantic',
    durationDays: 6,
    durationNights: 5,
    price: 119999,
    originalPrice: 145000,
    badge: 'Romantic Choice',
    featured: true,
    rating: 4.95,
    reviewCount: 295,
    groupSize: 'Max 8 People',
    transport: 'Mercedes Sprinter & Private Luxury Yacht',
    languages: 'English, Greek',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Experience the crown jewel of the Cyclades. Stay in a cliffside cave suite in Oia featuring a heated infinity plunge pool overlooking the Aegean Sea. Indulge in private volcanic vineyard wine tastings, private catamaran sailing, and romantic gourmet dining.',
    highlights: [
      'Private 5-star cliffside cave suite with caldera views',
      '5-hour private sunset catamaran cruise with unlimited Greek refreshments',
      'Volcanic terroir vineyard tasting tour across 3 award-winning wineries',
      'Guided photography walk through hidden alleys of Oia and Imerovigli',
      'Private helicopter tour option over the caldera crater'
    ],
    inclusions: [
      '5 nights in an authentic caldera-view luxury suite in Oia',
      'Champagne breakfast served daily on your private terrace',
      'Private semi-private yacht cruise with grilled lunch',
      'VIP Mercedes executive airport and port transfers',
      'All museum and wine tasting flight tickets'
    ],
    exclusions: [
      'Airfare to and from Santorini',
      'Personal gratuities for crew and drivers'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Santorini & Welcome Drinks', description: 'Arrive at Santorini airport, private transfer to Oia. Savor chilled Greek wine on your terrace as the sun dips below the caldera.', meals: 'Welcome drinks & Dinner', stay: 'Canaves Oia Suites' },
      { day: 2, title: 'Caldera Rim Cliff Walk from Fira to Imerovigli', description: 'Leisurely morning hike along the ancient stone path. Olive oil tasting along the way.', meals: 'Breakfast included', stay: 'Canaves Oia Suites' },
      { day: 3, title: 'Private Catamaran Cruise: Red Beach & Hot Springs', description: 'Board luxury catamaran. Swim in thermal sulfur springs, snorkel Red Beach, enjoy fresh grilled lunch on deck.', meals: 'Breakfast & Seafood BBQ', stay: 'Canaves Oia Suites' },
      { day: 4, title: 'Akrotiri Bronze Age Ruins & Lost Atlantis', description: 'Discover the ancient Minoan city preserved in volcanic ash 3,600 years ago.', meals: 'Breakfast & Lunch', stay: 'Canaves Oia Suites' },
      { day: 5, title: 'Sunset Wine Tasting & Romantic Dinner', description: 'Visit cliffside cellars and dine at an exclusive restaurant with reserved front-row sunset seating.', meals: 'Breakfast & 4-Course Dinner', stay: 'Canaves Oia Suites' },
      { day: 6, title: 'Farewell Greece & Airport Transfer', description: 'Final breakfast overlooking the Aegean before your chauffeured ride to the airport.', meals: 'Breakfast included', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Canaves Oia Luxury Suites',
      rating: 5,
      amenities: ['Caldera View Plunge Pool', 'Gourmet Restaurant', 'Concierge Service', 'Luxury Spa']
    }
  },
  {
    id: 'pkg-swiss-glacier',
    slug: 'swiss-alps-panoramic-glacier-express',
    title: 'Swiss Alps Panoramic Express & Zermatt Matterhorn',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    category: 'mountain',
    durationDays: 8,
    durationNights: 7,
    price: 155000,
    originalPrice: 185000,
    badge: 'Popular Tour',
    featured: true,
    rating: 4.89,
    reviewCount: 218,
    groupSize: 'Max 16 People',
    transport: '1st Class Glacier Express & Alpine Cableways',
    languages: 'English, German, French',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Witness nature at its most dramatic aboard Switzerland’s legendary panoramic trains. Journey past soaring 4,000-meter peaks, cascading waterfalls, and tranquil turquoise lakes, with stays in car-free Zermatt beneath the iconic Matterhorn and glamorous St. Moritz.',
    highlights: [
      'First Class seats on the world-famous Glacier Express panoramic train',
      'Cable car ride to Matterhorn Glacier Paradise at 3,883 meters',
      'Boat cruise on Lake Lucerne with Swiss fondue tasting',
      'Visit to the Lindt Home of Chocolate museum with tasting fountain',
      'Stay in traditional 5-star Swiss alpine chalets with heated spas'
    ],
    inclusions: [
      '7 nights in 4-star and 5-star alpine luxury hotels',
      'Swiss Travel Pass 1st Class with unlimited train and bus journeys',
      'Daily Swiss breakfast buffet and 3 traditional Swiss cheese dinners',
      'All cable car and mountain cogwheel railway tickets',
      'English-speaking certified mountain expedition leader'
    ],
    exclusions: ['International flights to Zurich/Geneva', 'Lunches and personal ski gear'],
    itinerary: [
      { day: 1, title: 'Arrival in Zurich & Scenic Train to Lucerne', description: 'Meet guide in Zurich, scenic rail to Lucerne. Walk historic Chapel Bridge.', meals: 'Dinner included', stay: 'Hotel Schweizerhof Luzern' },
      { day: 2, title: 'Mount Pilatus Dragon Ride & Lake Steamer', description: 'Ride world’s steepest cogwheel railway up Mount Pilatus.', meals: 'Breakfast included', stay: 'Hotel Schweizerhof Luzern' },
      { day: 3, title: 'Jungfraujoch Top of Europe', description: 'Ascend by Eiger Express cable car to Jungfraujoch at 3,454m.', meals: 'Breakfast & Lunch', stay: 'Victoria-Jungfrau Grand Hotel' },
      { day: 4, title: 'Glacier Express to Zermatt', description: 'Glide across 291 bridges over Oberalp Pass with 3-course rail lunch.', meals: 'Breakfast & Rail Lunch', stay: 'Mont Cervin Palace Zermatt' },
      { day: 5, title: 'Gornergrat & Matterhorn Reflections', description: 'Take cogwheel train up to 3,089m. See Matterhorn reflecting in Lake Riffelsee.', meals: 'Breakfast & Fondue Dinner', stay: 'Mont Cervin Palace Zermatt' },
      { day: 6, title: 'Alpine Relaxation & Village Stroll', description: 'Explore car-free Zermatt, visit the Matterhorn Museum, heated spa pool.', meals: 'Breakfast', stay: 'Mont Cervin Palace Zermatt' },
      { day: 7, title: 'Scenic Return to Zurich', description: 'Scenic train back to Zurich with evening farewell dinner.', meals: 'Breakfast & Farewell Dinner', stay: 'Baur au Lac Zurich' },
      { day: 8, title: 'Departure from Zurich Airport', description: 'Private airport rail transfer for flight home.', meals: 'Breakfast', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Mont Cervin Palace & Grand Hotel Victoria',
      rating: 5,
      amenities: ['Heated Alpine Pool', 'Matterhorn Views', 'Michelin Star Dining', 'Spa & Wellness Center']
    }
  },
  {
    id: 'pkg-japan-cherry-blossom',
    slug: 'tokyo-kyoto-zen-gardens-bullet-train',
    title: 'Japan Golden Route: Tokyo Neon to Kyoto Zen',
    destinationId: 'kyoto-tokyo',
    destinationName: 'Tokyo & Kyoto',
    country: 'Japan',
    region: 'Asia',
    category: 'cultural',
    durationDays: 9,
    durationNights: 8,
    price: 135000,
    originalPrice: 165000,
    badge: 'Trending 2026',
    featured: true,
    rating: 4.93,
    reviewCount: 412,
    groupSize: 'Max 14 People',
    transport: 'Shinkansen Bullet Train & Private Coach',
    languages: 'English, Japanese',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Experience the harmonious contrast between Tokyo’s bustling electronic districts and Kyoto’s tranquil cedar forests and thousand-gate shrines. Includes bullet train tickets, an authentic tea ceremony, and an overnight stay in a traditional hot spring ryokan with multi-course dinner.',
    highlights: [
      'Ride the 320 km/h Shinkansen bullet train past Mount Fuji',
      'Walk through the 10,000 vermilion Torii gates of Fushimi Inari',
      'Private traditional Japanese tea ceremony in an ancient Kyoto machiya',
      'Night foodie tour through the vibrant alleys of Shinjuku',
      'Overnight stay in a luxury Hakone onsen hot spring ryokan'
    ],
    inclusions: [
      '8 nights in premium hotels and luxury onsen ryokan',
      'Japan Rail Pass 7-Day ordinary or green car',
      'Daily breakfast, 2 authentic banquets, 1 ramen workshop',
      'All shrine entry fees and tea ceremony master charges',
      'Pocket Wi-Fi device with unlimited data for each room'
    ],
    exclusions: ['International flights', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Tokyo', description: 'Touch down in Tokyo. Private transfer to luxury Shinjuku hotel.', meals: 'Dinner', stay: 'Keio Plaza Hotel Tokyo' },
      { day: 2, title: 'Senso-ji, Akihabara & Shibuya Sky', description: 'Oldest temple Senso-ji, Akihabara anime hub, glass floor Shibuya Sky.', meals: 'Breakfast & Lunch', stay: 'Keio Plaza Hotel Tokyo' },
      { day: 3, title: 'Tsukiji Market & Meiji Jingu', description: 'Taste fresh street treats and stroll the tranquil evergreen forest of Meiji shrine.', meals: 'Breakfast', stay: 'Keio Plaza Hotel Tokyo' },
      { day: 4, title: 'Hakone Hot Springs & Mt Fuji Views', description: 'Cruise Lake Ashi and soak in natural mineral onsen baths.', meals: 'Breakfast & Kaiseki Dinner', stay: 'Hakone Kowakien Ten-yu Ryokan' },
      { day: 5, title: 'Bullet Train to Kyoto', description: 'Speed to Kyoto. Visit Kinkaku-ji Golden Pavilion gleaming over water.', meals: 'Breakfast', stay: 'Kyoto Brighton Hotel' },
      { day: 6, title: 'Fushimi Inari & Gion Geisha District', description: 'Hike through 10,000 torii gates and walk atmospheric lantern streets.', meals: 'Breakfast & Lunch', stay: 'Kyoto Brighton Hotel' },
      { day: 7, title: 'Arashiyama Bamboo Forest', description: 'Walk through green bamboo canopy and visit Tenryu-ji Zen garden.', meals: 'Breakfast', stay: 'Kyoto Brighton Hotel' },
      { day: 8, title: 'Day Trip to Nara Sacred Deer', description: 'Feed gentle bowing deer and stand before the colossal bronze Buddha.', meals: 'Breakfast & Farewell Dinner', stay: 'Kyoto Brighton Hotel' },
      { day: 9, title: 'Departure from Osaka (KIX)', description: 'Transfer to Osaka airport for your flight home.', meals: 'Breakfast', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Keio Plaza Tokyo & Hakone Kowakien Ten-yu',
      rating: 5,
      amenities: ['Private Open-Air Onsen Baths', 'Shinkansen Access', 'Traditional Tatami Suites']
    }
  },
  {
    id: 'pkg-dubai-desert-glamour',
    slug: 'dubai-luxury-safari-burj-khalifa',
    title: 'Dubai Glamour, Burj Khalifa & Luxury Desert Safari',
    destinationId: 'dubai-abu-dhabi',
    destinationName: 'Dubai & Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'Middle East',
    category: 'city',
    durationDays: 5,
    durationNights: 4,
    price: 79999,
    originalPrice: 99999,
    badge: 'Luxury Deal',
    featured: true,
    rating: 4.87,
    reviewCount: 310,
    groupSize: 'Max 10 People',
    transport: 'Private Lexus Sedan & 4x4 Land Cruisers',
    languages: 'English, Hindi, Arabic',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Experience the heights of modern luxury in the glittering emirates. From the clouds at the 148th floor of the Burj Khalifa to camel trekking and stargazing at a private heritage Bedouin camp in the rolling red dunes of the Arabian Desert.',
    highlights: [
      'Burj Khalifa Level 148 "At The Top SKY" VIP admission',
      'Private 4x4 desert dune bashing with sunset falconry show',
      'Barbecue banquet with belly dancing under the stars',
      'Day excursion to Abu Dhabi Sheikh Zayed Grand Mosque and Louvre Museum',
      'Private yacht cruise through Dubai Marina'
    ],
    inclusions: [
      '4 nights in 5-star hotel in Downtown Dubai or Marina',
      'Private airport VIP meet and greet with luxury transfer',
      'All excursions, desert safari, and monument tickets',
      'Daily 5-star buffet breakfast'
    ],
    exclusions: ['International flights', 'Personal shopping'],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Marina Night Lights Walk', description: 'Chauffeured pickup from Dubai airport. Check into downtown suite.', meals: 'Dinner', stay: 'Address Downtown Dubai' },
      { day: 2, title: 'Old Souks & Burj Khalifa At The Top SKY', description: 'Traditional abra boat across Dubai Creek, souk shopping, and Burj Khalifa SKY deck.', meals: 'Breakfast & High Tea', stay: 'Address Downtown Dubai' },
      { day: 3, title: 'Red Dune Safari, Camel Riding & Bedouin Feast', description: 'Thrilling 4x4 dune bashing, sandboarding, falcons, and Arabic BBQ feast.', meals: 'Breakfast & BBQ Dinner', stay: 'Address Downtown Dubai' },
      { day: 4, title: 'Abu Dhabi Grand Mosque & Louvre Museum', description: 'Marvel at 82 pure white marble domes and Louvre floating dome.', meals: 'Breakfast & Lunch', stay: 'Address Downtown Dubai' },
      { day: 5, title: 'Marina Yacht Cruise & Departure', description: 'Morning 2-hour private yacht cruise past Atlantis Palm before airport transfer.', meals: 'Breakfast', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Address Downtown Dubai',
      rating: 5,
      amenities: ['Direct Dubai Mall Access', 'Infinity Pool overlooking Burj Khalifa', 'Luxury Spa']
    }
  },
  {
    id: 'pkg-thailand-islands',
    slug: 'thailand-phuket-krabi-island-hopping',
    title: 'Thailand Tropical Splendor: Phuket & Krabi',
    destinationId: 'phuket-krabi',
    destinationName: 'Phuket & Krabi',
    country: 'Thailand',
    region: 'Asia',
    category: 'beach',
    durationDays: 7,
    durationNights: 6,
    price: 59999,
    originalPrice: 75000,
    badge: 'Super Value',
    featured: true,
    rating: 4.84,
    reviewCount: 340,
    groupSize: 'Max 15 People',
    transport: 'Speedboat & AC Minivan',
    languages: 'English, Thai',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'Escape to Thailand’s Andaman paradise. Hop between limestone towers in Phang Nga Bay, snorkel pristine coral reefs in the Phi Phi Islands, feed rescued gentle elephants at an ethical sanctuary, and unwind on powdery beaches.',
    highlights: [
      'Ethical Elephant sanctuary visit — feed, bathe and walk with rescued elephants',
      'Speedboat tour to Maya Bay & Phi Phi Don',
      'Sea canoeing through hidden limestone sea caves in James Bond Island',
      'Authentic Thai street food night market crawl with guide'
    ],
    inclusions: [
      '6 nights in 4-star and 5-star beachfront resorts',
      'Daily breakfast and 3 island excursion lunches',
      'All national marine park entrance fees',
      'Roundtrip airport transfers'
    ],
    exclusions: ['International flights', 'Personal drinks'],
    itinerary: [
      { day: 1, title: 'Arrival in Phuket', description: 'Arrive in Phuket and unwind by the beachfront resort pool.', meals: 'Dinner', stay: 'Amari Phuket Resort' },
      { day: 2, title: 'Phi Phi Islands & Maya Bay', description: 'Speedboat across Andaman Sea to snorkel turquoise lagoons.', meals: 'Breakfast & Lunch', stay: 'Amari Phuket Resort' },
      { day: 3, title: 'Ethical Elephant Sanctuary', description: 'Learn about rescued Asian elephants in their natural forest habitat.', meals: 'Breakfast & Lunch', stay: 'Amari Phuket Resort' },
      { day: 4, title: 'Scenic Transfer to Krabi', description: 'Cruise through emerald sea caves on a longtail canoe to Krabi.', meals: 'Breakfast', stay: 'Centara Grand Beach Krabi' },
      { day: 5, title: 'Railay Beach & 4-Island Tour', description: 'Snorkel at Chicken Island and explore limestone cliffs.', meals: 'Breakfast & Picnic Lunch', stay: 'Centara Grand Beach Krabi' },
      { day: 6, title: 'Thai Cooking Masterclass', description: 'Cook classic Pad Thai and Tom Yum with local ingredients.', meals: 'Breakfast & Cooking Dinner', stay: 'Centara Grand Beach Krabi' },
      { day: 7, title: 'Krabi Airport Departure', description: 'Chauffeured transfer to Krabi airport for return flight.', meals: 'Breakfast', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Amari Phuket & Centara Grand Krabi',
      rating: 5,
      amenities: ['Direct Beachfront Access', 'Multiple Lagoon Pools', 'Thai Wellness Spa']
    }
  },
  {
    id: 'pkg-serengeti-safari',
    slug: 'tanzania-serengeti-safari-zanzibar-beaches',
    title: 'Serengeti Big Five Safari & Zanzibar Beach Resort',
    destinationId: 'serengeti-zanzibar',
    destinationName: 'Serengeti & Zanzibar',
    country: 'Tanzania',
    region: 'Africa',
    category: 'wildlife',
    durationDays: 10,
    durationNights: 9,
    price: 195000,
    originalPrice: 235000,
    badge: 'Bucket List',
    featured: true,
    rating: 4.96,
    reviewCount: 182,
    groupSize: 'Max 8 People',
    transport: '4x4 Open Safari Land Cruisers & Bush Flights',
    languages: 'English, Swahili',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
    ],
    overview: 'The ultimate African dream expedition: 5 days of thrilling game drives tracking lions, leopards, elephants, and rhinos across Serengeti and Ngorongoro Crater, followed by 4 days in an overwater villa on the spice island of Zanzibar.',
    highlights: [
      'Ngorongoro Crater descent — world’s largest intact volcanic caldera',
      'Witness the Great Wildebeest Migration',
      'Sunrise hot air balloon safari option over Serengeti',
      'Relaxation at a private beachfront resort in Zanzibar'
    ],
    inclusions: [
      '5 nights luxury tented safari camps & 4 nights 5-star Zanzibar resort',
      'Internal bush flight from Serengeti airstrip to Zanzibar',
      'All national park conservation fees and safari vehicle costs',
      'All meals on safari (Full Board)',
      'Professional certified Tanzanian safari naturalist'
    ],
    exclusions: ['International flights', 'Tourist visa'],
    itinerary: [
      { day: 1, title: 'Arrival in Kilimanjaro / Arusha', description: 'Welcome to East Africa. Transfer to Arusha Coffee Lodge.', meals: 'Dinner', stay: 'Arusha Coffee Lodge' },
      { day: 2, title: 'Tarangire National Park', description: 'Ancient baobab trees and giant elephant herds wading through riverbanks.', meals: 'Full Board', stay: 'Tarangire Safari Tented Camp' },
      { day: 3, title: 'Ngorongoro Crater Game Drive', description: 'Descend 600m into the crater floor. Search for black rhinos and lions.', meals: 'Full Board', stay: 'Ngorongoro Serena Lodge' },
      { day: 4, title: 'Endless Plains of Serengeti', description: 'Sunset game drives following cheetah coalitions.', meals: 'Full Board', stay: 'Four Seasons Serengeti' },
      { day: 5, title: 'Full Day Serengeti Safari', description: 'Spend entire day traversing riverine forests and granite kopjes.', meals: 'Full Board', stay: 'Four Seasons Serengeti' },
      { day: 6, title: 'Flight to Zanzibar & Stone Town', description: 'Fly direct to Zanzibar. Explore carved wooden doors and spice markets.', meals: 'Breakfast & Dinner', stay: 'Park Hyatt Zanzibar' },
      { day: 7, title: 'Transfer to Nungwi Beachfront Villa', description: 'Sink your toes into powder-soft white sand and gaze out at turquoise water.', meals: 'Breakfast & Dinner', stay: 'Zuri Zanzibar Resort' },
      { day: 8, title: 'Dhow Sailing & Mnemba Atoll Snorkeling', description: 'Sail on authentic wooden dhow to snorkel with wild green turtles.', meals: 'Breakfast & Lunch', stay: 'Zuri Zanzibar Resort' },
      { day: 9, title: 'Leisure Day & Beach Fire Banquet', description: 'Relax before a candlelit bonfire farewell seafood dinner.', meals: 'Breakfast & Dinner', stay: 'Zuri Zanzibar Resort' },
      { day: 10, title: 'Departure from Zanzibar', description: 'Chauffeured ride to Zanzibar airport for return flight.', meals: 'Breakfast', stay: 'Departure' }
    ],
    hotelDetails: {
      name: 'Four Seasons Serengeti & Zuri Zanzibar',
      rating: 5,
      amenities: ['Watering Hole View Infinity Pool', 'Private Beach Bungalows', 'Full Safari Guides']
    }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh & Priya Sharma',
    role: 'Anniversary Travelers',
    location: 'Mumbai, India',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    packageBooked: 'Santorini Caldera Elegance & Private Catamaran',
    rating: 5,
    title: 'Pure perfection in Greece',
    review: 'The private catamaran cruise around Santorini hot springs was the absolute highlight of our decade. Everything was calculated and organized down to the minute. Cleanest booking experience we ever had.'
  },
  {
    id: 2,
    name: 'Ananya Deshmukh',
    role: 'Solo Explorer & Photographer',
    location: 'Bengaluru, India',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    packageBooked: 'Japan Golden Route: Tokyo Neon to Kyoto Zen',
    rating: 5,
    title: 'Incredible detail and seamless logistics',
    review: 'As a solo woman traveler, safety and timing were my top priorities. The itinerary curated by TravelEase was spotless. Bullet train tickets and private ryokan onsen were pure heaven.'
  },
  {
    id: 3,
    name: 'Vikram & Sneha Patel',
    role: 'Family Vacationers',
    location: 'Ahmedabad, India',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    packageBooked: 'Swiss Alps Panoramic Express & Zermatt Matterhorn',
    rating: 5,
    title: 'Breathtaking train views and five-star care',
    review: 'Our kids were mesmerized by the Glacier Express panoramic train. The hotel choices were outstanding and having our 24/7 TravelEase concierge on call gave us total peace of mind.'
  },
  {
    id: 4,
    name: 'Karthik Ramanathan',
    role: 'Honeymoon Trip',
    location: 'Chennai, India',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    packageBooked: 'Magical Bali Island & Ubud Culture Escape',
    rating: 5,
    title: 'An unforgettable dream honeymoon!',
    review: 'TravelEase made our honeymoon flawless from the airport greeting to the final sunset cruise. The private pool villa in Ubud was sheer magic! Will book all future trips with TravelEase.'
  }
];

export const TRAVEL_BLOGS = [
  {
    id: 'blog-1',
    title: '10 Hidden Gems in Switzerland Most Tourists Never See',
    category: 'Travel Guide',
    date: 'October 24, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Beyond the famous summits of the Matterhorn and Jungfrau lie tucked-away glacial lakes, medieval cheese cellars, and silent car-free hamlets.'
  },
  {
    id: 'blog-2',
    title: 'The Ultimate Packing Checklist for a 7-Day Bali Vacation',
    category: 'Travel Tips',
    date: 'October 20, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    excerpt: 'What to bring (and what to leave behind) for tropical heat, jungle temple walks, sacred water ceremonies, and beach sunset clubs.'
  },
  {
    id: 'blog-3',
    title: 'Japan Rail Pass vs Point-to-Point: The 2026 Comprehensive Breakdown',
    category: 'Smart Savings',
    date: 'October 15, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Calculate exact costs, understand regional pass options, and learn how to reserve green cars on bullet trains smoothly.'
  }
];

export const FAQS = [
  {
    question: 'How do I book a travel package on TravelEase?',
    answer: 'Booking is quick and straightforward! Simply browse our curated packages, click on any package to view the full itinerary, choose your preferred travel date and number of travelers, add any optional extras, and complete checkout. Your booking voucher is instantly saved to My Bookings and stored on your device.'
  },
  {
    question: 'Can I cancel or modify my booking after completing it?',
    answer: 'Yes! You can view and manage all your bookings under the "My Bookings" page. You can easily cancel a booking with one click, view your printable ticket voucher, or download your itinerary receipt at any time.'
  },
  {
    question: 'What is included in the package price?',
    answer: 'All our curated packages include luxury accommodations (4-5 star hotels or boutique resorts), daily breakfast, all internal transfers and scheduled train/boat trips, certified local guides, and all monument entry fees mentioned in the itinerary. All prices are in Indian Rupees (₹) with clear breakdown.'
  },
  {
    question: 'How does the child discount work?',
    answer: 'Children aged 2 to 12 travel at a 50% discount off the adult base price on all packages. Infants under 2 travel completely free of charge. The discount is calculated live in the pricing summary when you select the number of guests.'
  },
  {
    question: 'Do you offer promotional discount coupons?',
    answer: 'Yes! We frequently run promotions. You can test active codes like "EASE10" for 10% off your entire booking, "VIP5000" for ₹5,000 off, or "EXPLORE3000" for ₹3,000 off. Enter the code in the promo input during booking to see your instant discount applied.'
  },
  {
    question: 'Is my personal data and booking secure?',
    answer: 'Yes, TravelEase utilizes industry-standard encryption for client data. All your bookings are stored safely in your browser’s localStorage, meaning your data stays private and persists across page reloads without any external tracking.'
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: 'ShieldCheck',
    title: '100% Verified Quality',
    description: 'Every resort, guide, and experience is rigorously vetted in person to guarantee exceptional comfort and safety.'
  },
  {
    icon: 'Sparkles',
    title: 'Curated Boutique Itineraries',
    description: 'Handcrafted travel blueprints tailored with unique hidden gems rather than cookie-cutter mass tourist spots.'
  },
  {
    icon: 'Headphones',
    title: '24/7 Dedicated Concierge',
    description: 'Round-the-clock WhatsApp & phone assistance from trip planning to returning home safe and relaxed.'
  },
  {
    icon: 'BadgePercent',
    title: 'Best Price Guarantee',
    description: 'Direct relationships with local operators allow us to offer luxury experiences at the most competitive rates.'
  }
];

// Sample default bookings in Indian Rupee (₹)
export const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'TE-2026-84912',
    packageId: 'pkg-bali-paradise',
    packageTitle: 'Magical Bali Island & Ubud Culture Escape',
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    travelDate: '2026-11-15',
    returnDate: '2026-11-22',
    duration: '7 Days / 6 Nights',
    adults: 2,
    children: 1,
    travelers: [
      { name: 'Kannan R.', email: 'kannan.travel@example.com', phone: '+91 98765 43210' }
    ],
    addOns: ['Airport VIP Private Transfer (₹4,500)', 'Travel Shield Insurance (₹3,000/person)'],
    subtotal: 188497,
    discount: 5000,
    promoCode: 'VIP5000',
    taxes: 22019,
    totalPrice: 205516,
    status: 'Confirmed',
    bookedAt: '2026-10-24T10:30:00Z',
    paymentMethod: 'UPI / Google Pay (Ref: 984210)'
  },
  {
    id: 'TE-2026-39184',
    packageId: 'pkg-santorini-dream',
    packageTitle: 'Santorini Caldera Elegance & Private Catamaran',
    destination: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    travelDate: '2026-12-05',
    returnDate: '2026-12-11',
    duration: '6 Days / 5 Nights',
    adults: 2,
    children: 0,
    travelers: [
      { name: 'Kannan R.', email: 'kannan.travel@example.com', phone: '+91 98765 43210' }
    ],
    addOns: ['Michelin Tasting Experience (₹5,500/person)'],
    subtotal: 250998,
    discount: 25100,
    promoCode: 'EASE10',
    taxes: 27107,
    totalPrice: 253005,
    status: 'Upcoming',
    bookedAt: '2026-10-25T14:15:00Z',
    paymentMethod: 'HDFC NetBanking'
  }
];
