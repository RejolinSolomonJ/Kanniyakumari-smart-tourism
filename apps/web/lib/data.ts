// ─── Centralized Data Store ─────────────────────────────────────
// Single source of truth for all Kanyakumari Smart Tourism data.
// Each page imports from here. When the backend is live, these
// serve as fallback / seed data.
// ─────────────────────────────────────────────────────────────────

// ─── DESTINATIONS ───────────────────────────────────────────────
export const destinations = [
  {
    id: '1',
    slug: 'vivekananda-rock-memorial',
    nameEn: 'Vivekananda Rock Memorial',
    nameTa: 'விவேகானந்தர் பாறை நினைவகம்',
    category: 'HERITAGE',
    heroImage: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800',
      'https://images.unsplash.com/photo-1598463283737-124b1757835f?w=800',
    ],
    entryFeeAdult: 20,
    entryFeeChild: 10,
    rating: 4.8,
    location: 'Offshore Kanyakumari',
    lat: 8.0776,
    lng: 77.5584,
    openingHours: '8:00 AM - 4:00 PM (Ferry)',
    descriptionEn: 'The Vivekananda Rock Memorial is a monument built on one of two rocks located about 500 metres east of the mainland of Kanyakumari, Tamil Nadu. It was built in 1970 in honour of Swami Vivekananda, who is said to have attained enlightenment on the rock. The memorial consists of two main structures — the Vivekananda Mandapam and the Shripada Mandapam.',
    descriptionTa: 'விவேகானந்தர் பாறை நினைவகம் கன்னியாகுமரி நிலப்பரப்பில் இருந்து சுமார் 500 மீட்டர் கிழக்கே அமைந்துள்ள இரண்டு பாறைகளில் ஒன்றின் மீது கட்டப்பட்ட நினைவுச்சின்னமாகும்.',
    historyEn: 'Swami Vivekananda meditated on this rock in December 1892 before his famous journey to the Parliament of Religions in Chicago. The memorial was inaugurated on September 2, 1970.',
    nearby: ['thiruvalluvar-statue', 'kanyakumari-beach'],
    tips: 'Wear slip-on shoes for quick removal. Ferry queues are shorter before 10 AM.'
  },
  {
    id: '2',
    slug: 'thiruvalluvar-statue',
    nameEn: 'Thiruvalluvar Statue',
    nameTa: 'திருவள்ளுவர் சிலை',
    category: 'HERITAGE',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.7,
    location: 'Offshore Kanyakumari',
    lat: 8.0773,
    lng: 77.5582,
    openingHours: '8:00 AM - 4:00 PM (Ferry)',
    descriptionEn: 'The Thiruvalluvar Statue is a 133-feet (40.6 m) tall stone sculpture of the Tamil poet and saint Thiruvalluvar, standing on a small island adjacent to the Vivekananda Rock. The statue represents the 133 chapters of the Thirukkural.',
    descriptionTa: 'திருவள்ளுவர் சிலை 133 அடி உயரமுள்ள கல் சிற்பமாகும்.',
    nearby: ['vivekananda-rock-memorial', 'kanyakumari-beach'],
    tips: 'Accessible via the same ferry as Vivekananda Rock.'
  },
  {
    id: '3',
    slug: 'kanyakumari-beach',
    nameEn: 'Kanyakumari Beach (Triveni Sangam)',
    nameTa: 'கன்னியாகுமரி கடற்கரை (திரிவேணி சங்கமம்)',
    category: 'BEACH',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.6,
    location: 'Beach Road',
    lat: 8.0817,
    lng: 77.5562,
    openingHours: 'Open 24 hours',
    descriptionEn: 'Kanyakumari Beach is the southernmost beach of the Indian mainland, where the Bay of Bengal, Arabian Sea, and Indian Ocean converge. Famous for its multi-coloured sand and stunning sunrise/sunset views.',
    descriptionTa: 'இந்தியாவின் தென்கோடி கடற்கரை. வங்காள விரிகுடா, அரபிக்கடல், இந்தியப் பெருங்கடல் சந்திக்கும் இடம்.',
    nearby: ['vivekananda-rock-memorial', 'bhagavathi-amman-temple'],
    tips: 'Arrive by 5:30 AM for the best sunrise. Multi-colored sand makes for unique photos.'
  },
  {
    id: '4',
    slug: 'bhagavathi-amman-temple',
    nameEn: 'Bhagavathi Amman Temple',
    nameTa: 'பகவதி அம்மன் கோவில்',
    category: 'TEMPLE',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.8,
    location: 'Temple Road',
    lat: 8.0827,
    lng: 77.5574,
    openingHours: '4:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    descriptionEn: 'An ancient temple dedicated to Goddess Kanyakumari (Bhagavathi Amman), believed to be over 3,000 years old. The temple overlooks the ocean and is known for the diamond nose ring of the deity that shines so brightly it can be seen from ships.',
    descriptionTa: 'கன்னியாகுமரி தேவிக்கு அர்ப்பணிக்கப்பட்ட 3,000 ஆண்டுகள் பழமையான கோயில்.',
    nearby: ['kanyakumari-beach', 'gandhi-memorial-mandapam'],
    tips: 'Men must remove shirts before entry. Photography not allowed inside.'
  },
  {
    id: '5',
    slug: 'gandhi-memorial-mandapam',
    nameEn: 'Gandhi Memorial Mandapam',
    nameTa: 'காந்தி நினைவு மண்டபம்',
    category: 'HERITAGE',
    heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.5,
    location: 'Beach Road',
    lat: 8.0813,
    lng: 77.5527,
    openingHours: '7:00 AM - 7:00 PM',
    descriptionEn: 'Built in memory of Mahatma Gandhi. A portion of his ashes were kept here before immersion. The building is designed such that on October 2nd (Gandhi\'s birthday), the first rays of the sun fall exactly on the spot where his ashes were kept.',
    descriptionTa: 'மகாத்மா காந்தியின் நினைவாக கட்டப்பட்டது. அவரது சாம்பலின் ஒரு பகுதி இங்கு வைக்கப்பட்டிருந்தது.',
    nearby: ['kanyakumari-beach', 'bhagavathi-amman-temple'],
    tips: 'Visit on October 2nd for a unique sunrise event.'
  },
  {
    id: '6',
    slug: 'sunrise-sunset-viewpoint',
    nameEn: 'Sunrise & Sunset View Point',
    nameTa: 'சூரிய உதயம் & சூரிய அஸ்தமன பார்வை புள்ளி',
    category: 'BEACH',
    heroImage: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.7,
    location: 'West of Kanyakumari',
    lat: 8.0815,
    lng: 77.5510,
    openingHours: '5:00 AM - 7:30 PM',
    descriptionEn: 'One of the few places in the world where you can see both sunrise and sunset from the same spot. The sunset over the Arabian Sea is particularly mesmerizing.',
    descriptionTa: 'சூரிய உதயமும் அஸ்தமனமும் ஒரே இடத்தில் பார்க்கக்கூடிய அரிய இடம்.',
    nearby: ['kanyakumari-beach', 'gandhi-memorial-mandapam'],
    tips: 'Sunset is best during October–March. Bring a camera with good zoom.'
  },
  {
    id: '7',
    slug: 'padmanabhapuram-palace',
    nameEn: 'Padmanabhapuram Palace',
    nameTa: 'பத்மநாபபுரம் அரண்மனை',
    category: 'HERITAGE',
    heroImage: 'https://images.unsplash.com/photo-1623547285973-19cb9e28fba1?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1623547285973-19cb9e28fba1?w=800'],
    entryFeeAdult: 50,
    entryFeeChild: 25,
    rating: 4.9,
    location: 'Padmanabhapuram (65 km)',
    lat: 8.2338,
    lng: 77.3262,
    openingHours: '9:00 AM - 5:00 PM (Closed Mondays)',
    descriptionEn: 'One of the finest examples of traditional Kerala architecture, Padmanabhapuram Palace was once the seat of the Travancore rulers. Its intricate wooden carvings, granite sculptures, and murals from the 16th century are remarkable.',
    descriptionTa: 'திருவிதாங்கூர் அரசர்களின் அரண்மனை. 16ஆம் நூற்றாண்டு மரவேலைப்பாடுகளுக்குப் பெயர் பெற்றது.',
    nearby: ['suchindram-temple'],
    tips: 'Allow 2–3 hours. Cameras are not allowed inside; phones are ok for photos.'
  },
  {
    id: '8',
    slug: 'suchindram-temple',
    nameEn: 'Suchindram Thanumalayan Temple',
    nameTa: 'சுசீந்திரம் தாணுமாலயன் கோவில்',
    category: 'TEMPLE',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.8,
    location: 'Suchindram (7 km from Nagercoil)',
    lat: 8.1474,
    lng: 77.4678,
    openingHours: '5:00 AM - 12:30 PM, 4:30 PM - 8:30 PM',
    descriptionEn: 'A unique temple dedicated to the Hindu trinity — Shiva, Vishnu, and Brahma — represented as Sthanumalayan. Famous for its musical pillars, 18-foot Hanuman statue, and the grand chariot festival.',
    descriptionTa: 'சிவன், விஷ்ணு, பிரம்மா மூவரையும் வழிபடும் தனித்துவமான கோவில்.',
    nearby: ['padmanabhapuram-palace'],
    tips: 'Tap the musical pillars gently to hear different musical notes.'
  },
  {
    id: '9',
    slug: 'thirparappu-waterfalls',
    nameEn: 'Thirparappu Waterfalls',
    nameTa: 'திற்பரப்பு அருவி',
    category: 'WATERFALL',
    heroImage: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=800'],
    entryFeeAdult: 20,
    entryFeeChild: 10,
    rating: 4.5,
    location: 'Thirparappu (55 km)',
    lat: 8.3161,
    lng: 77.2992,
    openingHours: '8:00 AM - 5:30 PM',
    descriptionEn: 'A spectacular 50-feet waterfall surrounded by lush greenery. The water cascades over rocky terrain creating a natural pool ideal for bathing. A Shiva temple sits near the falls.',
    descriptionTa: 'பசுமையான சூழலில் 50 அடி உயரத்தில் இருந்து விழும் அழகான அருவி.',
    nearby: [],
    tips: 'Best visited during July–October (monsoon). Changing rooms available.'
  },
  {
    id: '10',
    slug: 'sothavilai-beach',
    nameEn: 'Sothavilai Beach',
    nameTa: 'சோத்தாவிளை கடற்கரை',
    category: 'BEACH',
    heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.6,
    location: 'Sothavilai (8 km)',
    lat: 8.0710,
    lng: 77.4890,
    openingHours: 'Open 24 hours',
    descriptionEn: 'A clean, serene beach with palm-lined shores perfect for relaxation. Less crowded than Kanyakumari Beach, Sothavilai offers golden sand and calm waters ideal for swimming.',
    descriptionTa: 'பனைமரங்கள் நிறைந்த அமைதியான கடற்கரை.',
    nearby: ['muttom-beach'],
    tips: 'Great for families. Food stalls serve fresh seafood on weekends.'
  },
  {
    id: '11',
    slug: 'mathoor-hanging-bridge',
    nameEn: 'Mathoor Hanging Bridge',
    nameTa: 'மத்தூர் தொங்கு பாலம்',
    category: 'ADVENTURE',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
    entryFeeAdult: 20,
    entryFeeChild: 10,
    rating: 4.7,
    location: 'Mathoor (75 km)',
    lat: 8.3833,
    lng: 77.2667,
    openingHours: '8:00 AM - 5:00 PM',
    descriptionEn: 'One of the highest and longest hanging bridges in Asia (1,000 ft long, 100 ft high), built over the Pahruli River. Offers breathtaking views of the surrounding valleys and the Kodayar Dam.',
    descriptionTa: 'ஆசியாவின் உயரமான தொங்கு பாலங்களில் ஒன்று. பஹ்ருலி ஆற்றின் மீது கட்டப்பட்டது.',
    nearby: [],
    tips: 'Not suitable for those with vertigo. The bridge sways slightly in the wind!'
  },
  {
    id: '12',
    slug: 'muttom-beach',
    nameEn: 'Muttom Beach & Lighthouse',
    nameTa: 'முட்டம் கடற்கரை & கலங்கரை விளக்கம்',
    category: 'BEACH',
    heroImage: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800'],
    entryFeeAdult: 10,
    entryFeeChild: 5,
    rating: 4.4,
    location: 'Muttom (20 km)',
    lat: 8.1226,
    lng: 77.3287,
    openingHours: 'Beach: 24 hrs | Lighthouse: 3 PM - 5 PM',
    descriptionEn: 'A fishing village beach known for its scenic lighthouse and dramatic rock formations. The lighthouse offers 360-degree views of the coastline and fishing harbour below.',
    descriptionTa: 'எழில் மிகு கலங்கரை விளக்கம் மற்றும் பாறை அமைப்புகளுக்கு பெயர் பெற்ற மீனவக் கிராம கடற்கரை.',
    nearby: ['sothavilai-beach'],
    tips: 'Climb the lighthouse for the best panoramic photos of the coast.'
  },
  {
    id: '13',
    slug: 'wax-museum',
    nameEn: 'Baywatch Wax Museum',
    nameTa: 'பேவாட்ச் மெழுகு அருங்காட்சியகம்',
    category: 'MUSEUM',
    heroImage: 'https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=800'],
    entryFeeAdult: 150,
    entryFeeChild: 100,
    rating: 4.3,
    location: 'Near Beach, Kanyakumari',
    lat: 8.0820,
    lng: 77.5540,
    openingHours: '9:00 AM - 7:00 PM',
    descriptionEn: 'A popular wax museum featuring life-size wax statues of national leaders, celebrities, and historic figures, along with an aquarium and 3D art gallery.',
    descriptionTa: 'தேசியத் தலைவர்கள், பிரபலங்கள் மற்றும் வரலாற்று நபர்களின் மெழுகு சிலைகள்.',
    nearby: ['kanyakumari-beach'],
    tips: 'Good for families with children. Allow 1-1.5 hours.'
  },
  {
    id: '14',
    slug: 'our-lady-of-ransom-church',
    nameEn: 'Our Lady of Ransom Church',
    nameTa: 'அவர் லேடி ஆஃப் ரான்சம் தேவாலயம்',
    category: 'CULTURE',
    heroImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800'],
    entryFeeAdult: 0,
    entryFeeChild: 0,
    rating: 4.5,
    location: 'Beach Road, Kanyakumari',
    lat: 8.0826,
    lng: 77.5545,
    openingHours: '6:00 AM - 7:30 PM',
    descriptionEn: 'A beautiful Gothic-style Catholic church overlooking the ocean, built in the 16th century. Famous for its golden car procession in December and stunning ocean-view architecture.',
    descriptionTa: 'கடலை நோக்கிய அழகிய கோதிக் பாணி கத்தோலிக்க தேவாலயம்.',
    nearby: ['kanyakumari-beach', 'gandhi-memorial-mandapam'],
    tips: 'Visit during December for the spectacular golden car festival.'
  },
  {
    id: '15',
    slug: 'keeriparai-reserve-forest',
    nameEn: 'Keeriparai Reserve Forest',
    nameTa: 'கீரிப்பாறை காப்புக்காடு',
    category: 'WILDLIFE',
    heroImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800'],
    entryFeeAdult: 30,
    entryFeeChild: 15,
    rating: 4.6,
    location: 'Keeriparai (45 km)',
    lat: 8.3167,
    lng: 77.3500,
    openingHours: '8:00 AM - 5:00 PM',
    descriptionEn: 'A dense tropical forest in the Western Ghats, part of the Kanyakumari Wildlife Sanctuary. Home to elephants, bison, lion-tailed macaques, and hundreds of bird species. Trekking and stream walks available.',
    descriptionTa: 'மேற்குத் தொடர்ச்சி மலையில் அமைந்த அடர்ந்த வெப்பமண்டலக் காடு.',
    nearby: [],
    tips: 'Forest department guide mandatory for treks. Carry water & wear hiking shoes.'
  }
]

// ─── HOTELS ─────────────────────────────────────────────────────
export const hotels = [
  {
    id: '1',
    nameEn: 'Hotel Tamil Nadu (TTDC)',
    nameTa: 'ஹோட்டல் தமிழ்நாடு (TTDC)',
    type: 'GOVERNMENT',
    pricePerNight: 2500,
    address: 'Beach Road, Kanyakumari',
    starRating: 3,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
    amenities: ['AC', 'Restaurant', 'Parking', 'Wi-Fi'],
    phone: '04652-246257',
    website: 'https://www.ttdconline.com'
  },
  {
    id: '2',
    nameEn: 'Sparsa Resort Kanyakumari',
    nameTa: 'ஸ்பர்சா ரிசார்ட்',
    type: 'RESORT',
    pricePerNight: 6000,
    address: 'Kovalam Road, Kanyakumari',
    starRating: 4,
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500'],
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Sea View'],
    phone: '04652-247500',
    website: 'https://www.sparsaresort.com'
  },
  {
    id: '3',
    nameEn: 'The Seashore Hotel',
    nameTa: 'தி சீஷோர் ஹோட்டல்',
    type: 'LUXURY',
    pricePerNight: 4500,
    address: 'East Car Street, Kanyakumari',
    starRating: 4,
    images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500'],
    amenities: ['Sea View', 'Rooftop Restaurant', 'Parking', 'Wi-Fi', 'Laundry'],
    phone: '04652-246105'
  },
  {
    id: '4',
    nameEn: 'Hotel Singaar International',
    nameTa: 'ஹோட்டல் சிங்கார் இன்டர்நேஷனல்',
    type: 'MID_RANGE',
    pricePerNight: 2800,
    address: 'Main Road, Kanyakumari',
    starRating: 3,
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500'],
    amenities: ['AC', 'Restaurant', 'Wi-Fi', 'Room Service', 'Travel Desk'],
    phone: '04652-246281'
  },
  {
    id: '5',
    nameEn: 'Maadam Mahal Heritage Home',
    nameTa: 'மாடம் மஹால் பாரம்பரிய இல்லம்',
    type: 'HOMESTAY',
    pricePerNight: 1800,
    address: 'Near Suchindram Temple',
    starRating: 3,
    images: ['https://images.unsplash.com/photo-1587381420270-cfc3ff1dd01a?w=500'],
    amenities: ['Home-cooked Food', 'Garden', 'Parking', 'Cultural Talks'],
    phone: '9876543210'
  },
  {
    id: '6',
    nameEn: 'Sea View Residency',
    nameTa: 'சீ வியூ ரெசிடென்சி',
    type: 'BUDGET',
    pricePerNight: 1200,
    address: 'Sannadhi Street, Kanyakumari',
    starRating: 2,
    images: ['https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500'],
    amenities: ['AC', 'Wi-Fi', 'Hot Water', 'Parking'],
    phone: '04652-246330'
  },
  {
    id: '7',
    nameEn: 'Gopinivas Grand',
    nameTa: 'கோபிநிவாஸ் கிராண்ட்',
    type: 'MID_RANGE',
    pricePerNight: 3200,
    address: 'Nagercoil Main Road',
    starRating: 3,
    images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500'],
    amenities: ['Multi-Cuisine Restaurant', 'Banquet Hall', 'AC', 'Wi-Fi', 'Parking'],
    phone: '04652-223377'
  },
  {
    id: '8',
    nameEn: 'Cape Comorin Beach Resort',
    nameTa: 'கேப் கொமொரின் பீச் ரிசார்ட்',
    type: 'RESORT',
    pricePerNight: 7500,
    address: 'Beach Road, Near Sunset Point',
    starRating: 4,
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500'],
    amenities: ['Private Beach Access', 'Pool', 'Spa', 'Restaurant', 'Sea View', 'Yoga'],
    phone: '04652-247800'
  }
]

// ─── FOOD ───────────────────────────────────────────────────────
export const foods = [
  {
    name: 'Meen Kuzhambu',
    nameTa: 'மீன் குழம்பு',
    type: 'Seafood',
    location: 'Kanyakumari Town & Coastal Shacks',
    image: '/images/food/meen_kuzhambu.png',
    description: 'A spicy and tangy fish curry prepared with fresh catch, coconut milk, tamarind, and raw mangoes. Reflects the local coastal heritage.',
    recipeInfo: 'Best paired with boiled red rice or tapioca.'
  },
  {
    name: 'Kothu Parotta',
    nameTa: 'கொத்து பரோட்டா',
    type: 'Street Food',
    location: 'Nagercoil Street Vendors',
    image: '/images/food/kothu_parotta.png',
    description: 'Shredded flatbread cooked on a hot iron griddle with eggs, chicken gravy, onion, and spices, served with fresh salna.',
    recipeInfo: 'Rhythmic preparation sounds are famous in night markets.'
  },
  {
    name: 'Nandu Masala (Crab Masala)',
    nameTa: 'நண்டு மசாலா',
    type: 'Seafood',
    location: 'Colachel Harbour Shacks',
    image: '/images/food/nandu_masala.png',
    description: 'Fresh crabs cooked in a rich, aromatic coconut gravy with black pepper, dry red chillies, and curry leaves.',
    recipeInfo: 'A spicy delicacy cooked by local fishing families.'
  },
  {
    name: 'Tapioca (Kappa) & Kadala Curry',
    nameTa: 'கப்ப & கடலை கறி',
    type: 'Vegetarian',
    location: 'Tea Shops throughout the District',
    image: '/images/food/kappa_kadala.png',
    description: 'Boiled tapioca roots served with a spicy, thick chickpea curry, representing a unique culinary fusion with neighboring Kerala.',
    recipeInfo: 'Standard breakfast item for local farmers and laborers.'
  },
  {
    name: 'Nannari Sarbath',
    nameTa: 'நன்னாரி சர்பத்',
    type: 'Beverage',
    location: 'Beachside Vendors',
    image: '/images/food/nannari_sarbath.png',
    description: 'A cooling beverage made from sarsaparilla root extract, lemon juice, sugar syrup, and iced water.',
    recipeInfo: 'Popular summer drink, also available with tender coconut.'
  },
  {
    name: 'Puttu & Kadala Curry',
    nameTa: 'புட்டு & கடலை கறி',
    type: 'Vegetarian',
    location: 'Morning Eateries across the District',
    image: '/images/food/puttu_kadala.png',
    description: 'Steamed cylindrical rice cake layered with grated coconut, served with a spicy black chickpea curry. A popular Kerala-influenced breakfast.',
    recipeInfo: 'Available in both rice flour and wheat flour variants.'
  },
  {
    name: 'Karupatti Coffee',
    nameTa: 'கருப்பட்டி காபி',
    type: 'Beverage',
    location: 'Traditional Tea Shops',
    image: '/images/food/karupatti_coffee.png',
    description: 'Filter coffee sweetened with palm jaggery instead of sugar, giving it a unique caramel-like flavor. A specialty of the Kanyakumari district.',
    recipeInfo: 'Served in stainless steel tumblers and davara (saucer).'
  },
  {
    name: 'Iraal Varuval (Prawn Fry)',
    nameTa: 'இறால் வறுவல்',
    type: 'Seafood',
    location: 'Beach Road Restaurants',
    image: '/images/food/prawn_fry.png',
    description: 'Crispy fried prawns marinated in a blend of red chilli, turmeric, and ginger-garlic paste. A must-try for seafood lovers.',
    recipeInfo: 'Freshest catch available early morning at the fish market.'
  },
  {
    name: 'Banana Chips',
    nameTa: 'வாழைக்காய் சிப்ஸ்',
    type: 'Snacks',
    location: 'Sweet Shops & Street Stalls',
    image: '/images/food/banana_chips.png',
    description: 'Thinly sliced raw bananas deep-fried in coconut oil with a pinch of salt. The Kerala-Kanyakumari border region specialty.',
    recipeInfo: 'Buy from local shops for the authentic coconut oil flavor.'
  },
  {
    name: 'Halwa',
    nameTa: 'அல்வா',
    type: 'Sweets',
    location: 'Sweet Shops, Nagercoil',
    image: '/images/food/halwa.png',
    description: 'A chewy, translucent sweet made from wheat, ghee, and sugar. The Tirunelveli-Kanyakumari region is famous for its unique halwa preparation.',
    recipeInfo: 'Comes in variations: plain, cashew-topped, and pineapple.'
  }
]

// ─── EVENTS ─────────────────────────────────────────────────────
export const events = [
  {
    id: '1',
    titleEn: 'Cape Festival 2026',
    titleTa: 'கேப் திருவிழா 2026',
    type: 'CULTURAL',
    venue: 'Kanyakumari Beach Open Air Stage',
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
    descriptionEn: 'Organized by the Department of Tourism, Tamil Nadu. Showcases regional culture with music concerts, classical dance performances, and a craft bazaar.',
    isGovernment: true
  },
  {
    id: '2',
    titleEn: 'Margazhi Temple Car Festival',
    titleTa: 'மார்கழி தேர்த்திருவிழா',
    type: 'TEMPLE',
    venue: 'Suchindram Temple Street',
    startDate: '2026-12-20',
    endDate: '2026-12-30',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500',
    descriptionEn: 'The grand chariot festival of Suchindram Thanumalayan Temple involving a massive procession of three decorated temple cars through the streets.',
    isGovernment: false
  },
  {
    id: '3',
    titleEn: 'Pongal Celebrations',
    titleTa: 'பொங்கல் திருநாள்',
    type: 'CULTURAL',
    venue: 'Across Kanyakumari District',
    startDate: '2027-01-14',
    endDate: '2027-01-17',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    descriptionEn: 'Tamil harvest festival celebrated with traditional Pongal cooking, bull taming (Jallikattu), kolam art competitions, and cultural programs.',
    isGovernment: true
  },
  {
    id: '4',
    titleEn: 'Chithra Pournami Festival',
    titleTa: 'சித்ரா பௌர்ணமி திருவிழா',
    type: 'TEMPLE',
    venue: 'Bhagavathi Amman Temple, Kanyakumari',
    startDate: '2027-04-12',
    endDate: '2027-04-12',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500',
    descriptionEn: 'Full moon festival at the Bhagavathi Amman Temple. The temple flag is hoisted and devotees take a holy dip in the ocean on this auspicious occasion.',
    isGovernment: false
  },
  {
    id: '5',
    titleEn: 'Kanyakumari Marathon 2026',
    titleTa: 'கன்னியாகுமரி மாரத்தான் 2026',
    type: 'SPORTS',
    venue: 'Beach Road → Sunset Point Circuit',
    startDate: '2026-11-20',
    endDate: '2026-11-20',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500',
    descriptionEn: 'Annual marathon event along the scenic coastline. Categories: Full Marathon (42 km), Half Marathon (21 km), and 10K Fun Run. Open to all.',
    isGovernment: true
  },
  {
    id: '6',
    titleEn: 'Golden Car Festival (Church)',
    titleTa: 'தங்க ரத திருவிழா',
    type: 'CULTURAL',
    venue: 'Our Lady of Ransom Church, Kanyakumari',
    startDate: '2026-12-24',
    endDate: '2026-12-26',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=500',
    descriptionEn: 'The famous golden chariot procession of Our Lady of Ransom Church along Beach Road. Thousands gather to witness this grand Christmas celebration.',
    isGovernment: false
  }
]

// ─── BLOGS ──────────────────────────────────────────────────────
export const blogs = [
  {
    id: '1',
    slug: 'spiritual-dawn-southern-tip',
    titleEn: 'A Spiritual Dawn at the Southern Tip',
    titleTa: 'தென்கோடி முனையில் ஒரு ஆன்மீக விடியல்',
    excerpt: 'Watching the sunrise from Kanyakumari Beach is a lifetime experience. The first rays illuminate the Thiruvalluvar Statue as three seas shimmer in gold.',
    contentEn: 'The alarm rang at 4:30 AM. I reluctantly left the warm bed at Hotel Tamil Nadu and walked towards the beach. The pre-dawn sky was a canvas of deep purple and orange. As I reached the shore, hundreds of visitors had already gathered...\n\nThe sunrise at Kanyakumari is unlike any other in India. You stand at the very tip of the subcontinent, where the Bay of Bengal, the Arabian Sea, and the Indian Ocean meet in a mystical confluence called Triveni Sangam.\n\nAs the golden orb rises from the eastern horizon, it paints the Thiruvalluvar Statue in amber light while the Vivekananda Rock Memorial stands silhouetted against the sky. The multi-colored sand beneath your feet sparkles — a geological wonder unique to this beach.\n\nAfter the sunrise, I walked to the ferry terminal for a visit to the Rock Memorial. The ferry ride itself is an adventure — cutting through waves with the sea breeze in your hair. On the rock, inside the meditation hall, there is an absolute silence that is profoundly moving.\n\nKanyakumari taught me that some experiences cannot be captured in photographs. They can only be felt.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    category: 'TRAVEL_STORY',
    author: 'Ananya Krishnan',
    publishedAt: '2026-07-16',
    viewCount: 1540
  },
  {
    id: '2',
    slug: 'padmanabhapuram-wooden-wonder',
    titleEn: 'Padmanabhapuram Palace: A Wooden Wonder of the South',
    titleTa: 'பத்மநாபபுரம் அரண்மனை: தெற்கின் மர அதிசயம்',
    excerpt: 'Exploring the 16th-century wooden palace that was once the seat of the mighty Travancore kingdom. Its intricate carvings leave you speechless.',
    contentEn: 'Padmanabhapuram Palace is one of the finest examples of traditional Kerala architecture. Located about 65 km from Kanyakumari, this sprawling complex was the seat of the Travancore rulers.\n\nThe palace is a masterclass in woodwork — from the central hall with its polished granite floor to the intricate carvings on every door and window frame. The Thai Kottaram (Queen\'s Palace) features murals depicting scenes from the Ramayana that are over 400 years old.\n\nThe most stunning feature is the central hall, where the entire floor is made from a mysterious mixture of burnt coconut shells, egg whites, and plant juices that gives it a mirror-like black sheen. This floor has maintained its lustre for over four centuries without any modern polish.',
    coverImage: 'https://images.unsplash.com/photo-1623547285973-19cb9e28fba1?w=800',
    category: 'HISTORY',
    author: 'Dr. Rajesh Menon',
    publishedAt: '2026-07-10',
    viewCount: 890
  },
  {
    id: '3',
    slug: 'kanyakumari-food-guide',
    titleEn: 'The Ultimate Kanyakumari Food Trail Guide',
    titleTa: 'கன்னியாகுமரி உணவு வழிகாட்டி',
    excerpt: 'From spicy Meen Kuzhambu to refreshing Nannari Sarbath — discover the flavors that make Kanyakumari a foodie paradise at India\'s southern tip.',
    contentEn: 'Kanyakumari sits at the crossroads of Tamil Nadu and Kerala cuisines, creating a food culture that is unique in all of India.\n\nStart your morning with Puttu & Kadala Curry at any local tea shop. The steamed rice cake with black chickpea curry is a breakfast that fuels fishermen for their early morning catches.\n\nFor lunch, head to one of the beachside shacks for Meen Kuzhambu — a tangy fish curry that is the soul of Kanyakumari cuisine. Pair it with boiled red rice and you have the quintessential coastal meal.\n\nIn the evening, the night markets of Nagercoil come alive with the rhythmic sounds of Kothu Parotta being prepared. Watch the cook shred the flatbread with dramatic flair on a hot griddle.\n\nDon\'t leave without trying Karupatti Coffee — filter coffee sweetened with palm jaggery. This unique drink is a specialty you won\'t find anywhere else in India.',
    coverImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    category: 'FOOD',
    author: 'Priya Lakshmi',
    publishedAt: '2026-06-28',
    viewCount: 2100
  },
  {
    id: '4',
    slug: 'western-ghats-trekking-guide',
    titleEn: 'Trekking the Western Ghats: Kanyakumari Wildlife Sanctuary',
    titleTa: 'மேற்குத் தொடர்ச்சி மலை நடைபயணம்',
    excerpt: 'A guide to trekking through Keeriparai and Maramalai — the lush forests where tigers, elephants, and endemic birds call home.',
    contentEn: 'The Kanyakumari Wildlife Sanctuary is one of India\'s most biodiverse regions, located in the Western Ghats — a UNESCO World Heritage Site.\n\nKeeriparai Reserve Forest is the most accessible trekking destination. The trek follows a forest stream through dense tropical vegetation. You might spot Indian Bison (Gaur), Nilgiri Tahr, and if you\'re very lucky, the elusive Lion-tailed Macaque.\n\nMaramalai requires a special permit from the Forest Department in Nagercoil. The hill trek takes you through shola grasslands with panoramic views of the Arabian Sea coastline far below.\n\nBird watchers will love Kalikesam, where over 200 species have been documented. The Malabar Trogon, Great Indian Hornbill, and Sri Lanka Frogmouth are all seen here.\n\nImportant: Always trek with a forest department guide. Carry water, wear proper shoes, and avoid bright colors. The forest is a no-plastic zone.',
    coverImage: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
    category: 'GUIDE',
    author: 'Arjun Nadar',
    publishedAt: '2026-06-15',
    viewCount: 670
  }
]

// ─── GUIDES ─────────────────────────────────────────────────────
export const guides = [
  {
    id: '1',
    nameEn: 'Muthu Swamy',
    nameTa: 'முத்துசாமி',
    bio: 'Specialist in Vivekananda Rock & Gandhi Mandapam history. Over 8 years of guiding experience across all major Kanyakumari landmarks.',
    languages: ['English', 'Tamil', 'Malayalam'],
    experience: 8,
    ratePerDay: 1500,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true,
    rating: 4.8
  },
  {
    id: '2',
    nameEn: 'Selvan Pillai',
    nameTa: 'செல்வன் பிள்ளை',
    bio: 'Expert in Padmanabhapuram wooden architecture and Suchindram Thanumalayan temple mythology. Passionate about preserving local heritage stories.',
    languages: ['English', 'Tamil'],
    experience: 5,
    ratePerDay: 1200,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true,
    rating: 4.6
  },
  {
    id: '3',
    nameEn: 'Kavitha Devi',
    nameTa: 'கவிதா தேவி',
    bio: 'Female guide specializing in religious heritage sites, temple rituals, and Kanyakumari cultural history. Fluent in 4 languages.',
    languages: ['English', 'Tamil', 'Hindi', 'Malayalam'],
    experience: 6,
    ratePerDay: 1300,
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150',
    isVerified: true,
    rating: 4.9
  },
  {
    id: '4',
    nameEn: 'Rajan Kumar',
    nameTa: 'ராஜன் குமார்',
    bio: 'Adventure & wildlife guide for Western Ghats treks, waterfall expeditions, and Mathoor Hanging Bridge tours. Trained in first aid.',
    languages: ['English', 'Tamil'],
    experience: 10,
    ratePerDay: 1800,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    isVerified: true,
    rating: 4.7
  }
]

// ─── EMERGENCY CONTACTS ─────────────────────────────────────────
export const emergencyContacts = [
  { id: '1', nameEn: 'Police Control Room', nameTa: 'காவல் கட்டுப்பாட்டு அறை', type: 'POLICE', phone: '100' },
  { id: '2', nameEn: 'Ambulance Service', nameTa: 'ஆம்புலன்ஸ் சேவை', type: 'AMBULANCE', phone: '108' },
  { id: '3', nameEn: 'Govt. Medical College Hospital', nameTa: 'அரசு மருத்துவக் கல்லூரி மருத்துவமனை', type: 'HOSPITAL', phone: '04652-223201', address: 'Asaripallam, Nagercoil' },
  { id: '4', nameEn: 'National Tourist Helpline', nameTa: 'தேசிய சுற்றுலா உதவி எண்', type: 'TOURIST_HELPLINE', phone: '1363', address: 'Toll Free (24/7 Multi-Lingual)' },
  { id: '5', nameEn: 'District Disaster Control Room', nameTa: 'மாவட்ட பேரிடர் கட்டுப்பாட்டு அறை', type: 'TOURIST_HELPLINE', phone: '1077' },
  { id: '6', nameEn: 'Women Helpline', nameTa: 'பெண்கள் உதவி எண்', type: 'POLICE', phone: '181', address: '24/7 Women Safety Helpline' },
  { id: '7', nameEn: 'Kanyakumari Police Station', nameTa: 'கன்னியாகுமரி காவல் நிலையம்', type: 'POLICE', phone: '04652-246947', address: 'Beach Road, Kanyakumari' },
  { id: '8', nameEn: 'Coast Guard (Maritime Rescue)', nameTa: 'கடலோர காவல் படை', type: 'AMBULANCE', phone: '1554', address: 'Indian Coast Guard, Colachel' },
  { id: '9', nameEn: 'Fire & Rescue Services', nameTa: 'தீ & மீட்பு சேவைகள்', type: 'FIRE', phone: '101', address: 'Nagercoil Fire Station' },
]

// ─── RELIGIOUS SITES ────────────────────────────────────────────
// ─── RELIGIOUS SITES ────────────────────────────────────────────
export const religiousSites = [
  { 
    name: 'Bhagavathi Amman Temple', 
    location: 'Beach Road, Kanyakumari', 
    hours: '04:30 AM - 12:00 PM, 04:00 PM - 08:30 PM', 
    description: 'An ancient 3,000-year-old temple dedicated to Goddess Kanyakumari, located at the very confluence of the three oceans. Famous for the deity\'s sparkling diamond nose ring.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: '/images/bhagavathi-amman-temple.jpg'
  },
  { 
    name: 'Suchindram Thanumalayan Temple', 
    location: 'Suchindram (12 km from Kanyakumari)', 
    hours: '05:00 AM - 12:30 PM, 04:30 PM - 08:30 PM', 
    description: 'An architectural marvel dedicated to the Hindu trinity: Shiva (Sthanu), Vishnu (Mal), and Brahma (Ayan). Famous for its musical pillars and an 18-foot Hanuman statue.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Suchindram_Thanumalayan_Temple.jpg'
  },
  { 
    name: 'Nagaraja Temple', 
    location: 'Nagercoil Town (18 km from Kanyakumari)', 
    hours: '05:30 AM - 12:00 PM, 05:00 PM - 08:00 PM', 
    description: 'A unique temple dedicated to the King of Serpents, Nagaraja. The town of Nagercoil is named after this ancient shrine, which has a traditional thatched roof.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Nagaraja_temple.JPG'
  },
  { 
    name: 'Thiruvattar Adikesava Perumal Temple', 
    location: 'Thiruvattar (46 km from Kanyakumari)', 
    hours: '05:00 AM - 12:00 PM, 05:00 PM - 08:00 PM', 
    description: 'One of the 108 Divya Desams, dedicated to Lord Vishnu reclining on Adisesha. It predates and has similar architectural style to the Padmanabhaswamy temple in Trivandrum.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Thiruvattar_Adhi_Kesava_Temple.JPG'
  },
  { 
    name: 'Mandaikadu Bhagavathi Amman Temple', 
    location: 'Mandaikadu, near Colachel (32 km from Kanyakumari)', 
    hours: '05:00 AM - 12:30 PM, 05:00 PM - 08:30 PM', 
    description: 'Known as the "Sabarimala of Women", this temple features a natural, growing 15-foot high ant-hill (Valmiki) representing the Goddess.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mondaikkadu_temple._tamil_nadu_-_panoramio.jpg'
  },
  { 
    name: 'Lord Subramanya Temple (Kumara Koil)', 
    location: 'Velimalai, near Thuckalay (34 km from Kanyakumari)', 
    hours: '06:00 AM - 12:00 PM, 05:00 PM - 08:00 PM', 
    description: 'Set on a beautiful green hillock in the Western Ghats, this temple is dedicated to Lord Murugan. Celebrated for its unique architecture and serene mountain views.', 
    type: 'Temple', 
    religion: 'Hinduism',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'
  },
  { 
    name: 'Our Lady of Ransom Church', 
    location: 'Beach Road, Kanyakumari', 
    hours: '06:00 AM - 07:30 PM', 
    description: 'A magnificent Gothic-style Roman Catholic church overlooking the sea. Its 153-foot tall white spires and stunning stained-glass windows are iconic.', 
    type: 'Church', 
    religion: 'Christianity',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Our_Lady_of_Ransom_Church_in_Kanyakumari.jpg'
  },
  { 
    name: 'St. Francis Xavier Cathedral', 
    location: 'Kottar, Nagercoil (18 km from Kanyakumari)', 
    hours: '05:30 AM - 08:00 PM', 
    description: 'A highly historic church built in the 1540s. St. Francis Xavier lived, preached, and performed several miracles here, making it a major pilgrimage center.', 
    type: 'Church', 
    religion: 'Christianity',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/St._Xavier%27s_Church%2C_Kottar.JPG'
  },
  { 
    name: 'Thiruvithancode Arappally (St. Mary\'s Church)', 
    location: 'Thiruvithancode (32 km from Kanyakumari)', 
    hours: '07:00 AM - 06:00 PM', 
    description: 'Recognized as one of the oldest standing churches in the world, founded in 57 AD by St. Thomas the Apostle. Features traditional granite architecture.', 
    type: 'Church', 
    religion: 'Christianity',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Thiruvithamkode_Arappaly.jpg'
  },
  { 
    name: 'CSI Home Church', 
    location: 'Nagercoil Town (18 km from Kanyakumari)', 
    hours: '08:00 AM - 06:00 PM', 
    description: 'One of the oldest and largest Protestant churches in South Asia, constructed in 1819 with grand colonial style pillars and a massive prayer hall.', 
    type: 'Church', 
    religion: 'Christianity',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/CSI_Home_Church_Nagercoil.jpg'
  },
  { 
    name: 'Malik Deenar Jumma Mosque (Valiyapalli)', 
    location: 'Thengapattinam (50 km from Kanyakumari)', 
    hours: '04:00 AM - 10:00 PM', 
    description: 'A historical 7th-century mosque established by Malik Deenar. Built in early Islamic style, it is one of the earliest centers of Islam in South India.', 
    type: 'Mosque', 
    religion: 'Islam',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=800'
  },
  { 
    name: 'Peer Mohammed Oliyullah Dargah', 
    location: 'Thuckalay (33 km from Kanyakumari)', 
    hours: '05:00 AM - 09:00 PM', 
    description: 'The shrine of Sufi saint-philosopher Peer Mohammed Oliyullah, famous for his spiritual writings. Celebrated by people of all faiths during the annual festival.', 
    type: 'Dargah', 
    religion: 'Islam',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800'
  },
  { 
    name: 'Malik Mohammad Oliyullah Dargah', 
    location: 'Thiruvithancode (32 km from Kanyakumari)', 
    hours: '06:00 AM - 08:30 PM', 
    description: 'A historically significant Dargah drawing devotees from all over the district for prayer, reflection, and spiritual healing.', 
    type: 'Dargah', 
    religion: 'Islam',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800'
  },
  { 
    name: 'Thittuvilai Jumma Mosque', 
    location: 'Thittuvilai (28 km from Kanyakumari)', 
    hours: '04:30 AM - 09:00 PM', 
    description: 'A prominent and beautiful community mosque located in the serene village of Thittuvilai, serving as a center of religious life.', 
    type: 'Mosque', 
    religion: 'Islam',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'
  }
]

// ─── DOWNLOADS ──────────────────────────────────────────────────
export const downloads = [
  { id: '1', titleEn: 'Official Kanyakumari Tourist Map', titleTa: 'அதிகாரப்பூர்வ சுற்றுலா வரைபடம்', fileUrl: '#', fileType: 'PDF', category: 'Maps', downloadCount: 420 },
  { id: '2', titleEn: 'Tamil Nadu Tourism Guide – Kanyakumari Edition', titleTa: 'தமிழ்நாடு சுற்றுலா வழிகாட்டி - கன்னியாகுமரி பதிப்பு', fileUrl: '#', fileType: 'PDF', category: 'Brochures', downloadCount: 185 },
  { id: '3', titleEn: 'Ferry Schedule & Ticket Rates', titleTa: 'படகு நேர அட்டவணை & கட்டண விகிதங்கள்', fileUrl: '#', fileType: 'PDF', category: 'Schedules', downloadCount: 312 },
  { id: '4', titleEn: 'Emergency Services Directory', titleTa: 'அவசர சேவைகள் கையேடு', fileUrl: '#', fileType: 'PDF', category: 'Safety', downloadCount: 89 },
]

// ─── GALLERY PHOTOS ─────────────────────────────────────────────
export const galleryPhotos = [
  { src: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800', title: 'Vivekananda Rock Memorial', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', title: 'Thiruvalluvar Statue', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', title: 'Kanyakumari Beach Sunset', category: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', title: 'Padmanabhapuram Palace Murals', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=800', title: 'Thirparappu Waterfalls', category: 'Waterfall' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Western Ghats Scenic View', category: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800', title: 'Golden Sunset over Arabian Sea', category: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', title: 'Sothavilai Beach Palm Shore', category: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', title: 'Gandhi Memorial at Dusk', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', title: 'Keeriparai Forest Trail', category: 'Nature' },
  { src: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800', title: 'Our Lady of Ransom Church', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=800', title: 'Muttom Lighthouse View', category: 'Beach' },
]

// ─── GALLERY VIDEOS ─────────────────────────────────────────────
export const galleryVideos = [
  {
    title: 'Kanyakumari Drone View 🌊✨',
    desc: 'Breathtaking 4K aerial shots of Thiruvalluvar Statue & Vivekananda Rock Memorial.',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    duration: '2:15',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    title: 'Sunrise over Triveni Sangam 🌅',
    desc: 'Time-lapse video of the unique sunrise where three oceans converge.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    duration: '1:45',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    title: 'Suchindram Temple Musical Pillars 🎶',
    desc: 'Watch and listen to the ancient stone pillars that produce musical notes when tapped.',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    duration: '3:20',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    title: 'Western Ghats Trek — Keeriparai 🌿',
    desc: 'Follow a guided trek through the lush tropical forests of the Kanyakumari Wildlife Sanctuary.',
    thumbnail: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
    duration: '5:10',
    youtubeId: 'dQw4w9WgXcQ'
  }
]

// ─── WILDLIFE ZONES ─────────────────────────────────────────────
export const wildlifeZones = [
  {
    name: 'Keeriparai Reserve Forest',
    type: 'Trekking & Streams',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074',
    status: 'Open',
    description: 'Dense tropical forest with guided stream walks. Home to Indian Bison, Nilgiri Tahr, and over 200 bird species.',
    species: ['Indian Bison (Gaur)', 'Nilgiri Tahr', 'Lion-tailed Macaque', 'Malabar Giant Squirrel']
  },
  {
    name: 'Maramalai',
    type: 'Hill Safari',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070',
    status: 'Pass Required',
    description: 'Hill trek through shola grasslands with panoramic Arabian Sea views. Special forest department permit required.',
    species: ['Asian Elephant', 'Sambar Deer', 'Great Indian Hornbill', 'King Cobra']
  },
  {
    name: 'Kalikesam',
    type: 'Waterfalls & Dense Forest',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1887',
    status: 'Restricted',
    description: 'Pristine waterfall region in the deepest part of the sanctuary. Restricted access for conservation.',
    species: ['Bengal Tiger (Rare)', 'Indian Leopard', 'Malabar Trogon', 'Sri Lanka Frogmouth']
  }
]

// ─── AR/VR TOURS ────────────────────────────────────────────────
export const arvrTours = [
  {
    id: 'vivekananda-rock',
    title: 'Vivekananda Rock Memorial',
    description: 'Immersive 360° view from the iconic rock memorial. Experience the meditation hall and panoramic ocean views.',
    image: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=1200',
    tag: 'VR Ready'
  },
  {
    id: 'thiruvalluvar-statue',
    title: 'Thiruvalluvar Statue',
    description: 'Explore the 133-feet tall stone sculpture up close. View the intricate carvings and base reliefs.',
    image: 'https://images.unsplash.com/photo-1598463283737-124b1757835f?w=1200',
    tag: 'AR Enhanced'
  },
  {
    id: 'padmanabhapuram',
    title: 'Padmanabhapuram Palace',
    description: 'Walk through the ancient wooden architecture. Explore the Queen\'s Palace, Council Chamber, and Murals.',
    image: 'https://images.unsplash.com/photo-1623547285973-19cb9e28fba1?w=1200',
    tag: '360° Tour'
  },
  {
    id: 'suchindram-temple',
    title: 'Suchindram Temple Interior',
    description: 'Experience the musical pillars, 18-ft Hanuman statue, and the grand corridor from inside.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200',
    tag: 'VR Ready'
  }
]

// ─── MAP MARKERS ────────────────────────────────────────────────
export const mapMarkers = [
  { name: 'Vivekananda Rock Memorial', lat: 8.0776, lng: 77.5584, type: 'attraction', slug: 'vivekananda-rock-memorial' },
  { name: 'Thiruvalluvar Statue', lat: 8.0773, lng: 77.5582, type: 'attraction', slug: 'thiruvalluvar-statue' },
  { name: 'Kanyakumari Beach', lat: 8.0817, lng: 77.5562, type: 'attraction', slug: 'kanyakumari-beach' },
  { name: 'Bhagavathi Amman Temple', lat: 8.0827, lng: 77.5574, type: 'attraction', slug: 'bhagavathi-amman-temple' },
  { name: 'Gandhi Memorial', lat: 8.0813, lng: 77.5527, type: 'attraction', slug: 'gandhi-memorial-mandapam' },
  { name: 'Sunset View Point', lat: 8.0815, lng: 77.5510, type: 'attraction', slug: 'sunrise-sunset-viewpoint' },
  { name: 'Our Lady of Ransom Church', lat: 8.0826, lng: 77.5545, type: 'attraction', slug: 'our-lady-of-ransom-church' },
  { name: 'Hotel Tamil Nadu', lat: 8.0830, lng: 77.5535, type: 'hotel' },
  { name: 'Sparsa Resort', lat: 8.0850, lng: 77.5500, type: 'hotel' },
  { name: 'The Seashore Hotel', lat: 8.0825, lng: 77.5555, type: 'hotel' },
  { name: 'Sea View Residency', lat: 8.0822, lng: 77.5560, type: 'hotel' },
  { name: 'Beach Road Restaurants', lat: 8.0820, lng: 77.5548, type: 'restaurant' },
  { name: 'Nagercoil Bus Stand', lat: 8.1740, lng: 77.4320, type: 'transport' },
  { name: 'Kanyakumari Railway Station', lat: 8.0850, lng: 77.5540, type: 'transport' },
]
