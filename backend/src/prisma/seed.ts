import { PrismaClient, Role, Provider, Category, HotelType, EventType, BlogCategory, MediaType, EmergencyType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.ticket.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.guideBooking.deleteMany()
  await prisma.guide.deleteMany()
  await prisma.user.deleteMany()
  await prisma.otpStore.deleteMany()
  await prisma.destination.deleteMany()
  await prisma.hotel.deleteMany()
  await prisma.event.deleteMany()
  await prisma.blog.deleteMany()
  await prisma.galleryItem.deleteMany()
  await prisma.emergencyContact.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.download.deleteMany()
  await prisma.infraReport.deleteMany()
  await prisma.analyticsSnapshot.deleteMany()

  console.log('🧹 Existing data cleared.')

  // ─────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash('password123', salt)

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@kanyakumaritourism.gov.in',
      phone: '9876543210',
      passwordHash,
      role: Role.SUPER_ADMIN,
      provider: Provider.EMAIL,
      isVerified: true,
    }
  })

  const siteManager = await prisma.user.create({
    data: {
      name: 'Ramesh Kumar (Site Manager)',
      email: 'ramesh@kanyakumaritourism.gov.in',
      phone: '9876543211',
      passwordHash,
      role: Role.SITE_MANAGER,
      provider: Provider.EMAIL,
      isVerified: true,
    }
  })

  const tourist = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543212',
      passwordHash,
      role: Role.TOURIST,
      provider: Provider.EMAIL,
      isVerified: true,
    }
  })

  console.log('👤 Users seeded.')

  // ─────────────────────────────────────────
  // DESTINATIONS (18 entries)
  // ─────────────────────────────────────────
  const d1 = await prisma.destination.create({
    data: {
      slug: 'vivekananda-rock-memorial',
      nameEn: 'Vivekananda Rock Memorial',
      nameTa: 'விவேகானந்தர் பாறை நினைவகம்',
      category: Category.HERITAGE,
      descriptionEn: 'An iconic monument built in 1970 on a rock island where Swami Vivekananda meditated in 1892. Accessible only by ferry, it features the Vivekananda Mandapam and Dhyana Mandapam (meditation hall). One of India\'s most visited monuments.',
      descriptionTa: 'சுவாமி விவேகானந்தர் 1892 இல் தியானம் செய்த பாறை தீவில் 1970 இல் கட்டப்பட்ட ஒரு சின்னமான நினைவுச்சின்னம். படகு மூலம் மட்டுமே அணுக முடியும், இது விவேகானந்தர் மண்டபம் மற்றும் தியான மண்டபம் ஆகியவற்றைக் கொண்டுள்ளது. இந்தியாவின் அதிகம் பார்வையிடப்படும் தலம்.',
      heroImage: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80'
      ],
      latitude: 8.0795,
      longitude: 77.5583,
      entryFeeAdult: 20,
      entryFeeChild: 10,
      isFeatured: true,
      openingHours: { open: '08:00 AM', close: '04:00 PM' }
    }
  })

  const d2 = await prisma.destination.create({
    data: {
      slug: 'thiruvalluvar-statue',
      nameEn: 'Thiruvalluvar Statue',
      nameTa: 'திருவள்ளுவர் சிலை',
      category: Category.HERITAGE,
      descriptionEn: 'A 133-foot tall stone sculpture of the Tamil poet-saint Thiruvalluvar, standing on a 38-foot pedestal on a small island adjacent to Vivekananda Rock. The 133 feet represent the 133 chapters of the Thirukkural.',
      descriptionTa: 'விவேகானந்தர் பாறைக்கு அருகிலுள்ள ஒரு சிறிய தீவில் 38 அடி பீடத்தில் அமைந்துள்ள தமிழ் கவிஞர்-துறவி திருவள்ளுவரின் 133 அடி உயரமுள்ள கல் சிற்பம். 133 அடி என்பது திருக்குறளின் 133 அதிகாரங்களைக் குறிக்கிறது.',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0776,
      longitude: 77.5584,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: true,
      openingHours: { open: '08:00 AM', close: '04:00 PM' }
    }
  })

  const d3 = await prisma.destination.create({
    data: {
      slug: 'kanyakumari-beach',
      nameEn: 'Kanyakumari Beach (Triveni Sangam)',
      nameTa: 'கன்னியாகுமரி கடற்கரை (திரிவேணி சங்கமம்)',
      category: Category.BEACH,
      descriptionEn: 'The southernmost tip of mainland India where the Bay of Bengal, Indian Ocean, and Arabian Sea converge. Famous for both sunrise and sunset views from the same beach. The multi-colored sands are a unique feature.',
      descriptionTa: 'வங்காள விரிகுடா, இந்தியப் பெருங்கடல் மற்றும் அரபிக்கடல் ஆகியவை சங்கமிக்கும் இந்தியாவின் தென்கோடி முனை. ஒரே கடற்கரையிலிருந்து சூரிய உதயம் மற்றும் சூரிய அஸ்தமனக் காட்சிகளுக்குப் பிரபலமானது.',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0817,
      longitude: 77.5562,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: true,
      openingHours: { open: '24 Hours', close: '24 Hours' }
    }
  })

  const d4 = await prisma.destination.create({
    data: {
      slug: 'bhagavathi-amman-temple',
      nameEn: 'Bhagavathi Amman Temple',
      nameTa: 'பகவதி அம்மன் கோவில்',
      category: Category.TEMPLE,
      descriptionEn: 'An ancient 3000-year-old temple dedicated to Goddess Kanyakumari (Devi Kumari), believed to be an incarnation of Parvati. The diamond nose ring of the deity is said to be visible from the sea.',
      descriptionTa: 'பார்வதியின் அவதாரமாக நம்பப்படும் கன்னியாகுமரி அம்மனுக்கு அர்ப்பணிக்கப்பட்ட 3000 ஆண்டுகள் பழமையான பழமையான கோவில். தேவியின் வைர மூக்குத்தி கடலில் இருந்து பிரகாசமாகத் தெரியும் என்று கூறப்படுகிறது.',
      heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0827,
      longitude: 77.5574,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '04:30 AM', close: '08:00 PM' }
    }
  })

  const d5 = await prisma.destination.create({
    data: {
      slug: 'gandhi-memorial-mandapam',
      nameEn: 'Gandhi Memorial Mandapam',
      nameTa: 'காந்தி நினைவு மண்டபம்',
      category: Category.MUSEUM,
      descriptionEn: 'Built in 1956 at the spot where Mahatma Gandhi\'s ashes were kept for public viewing before immersion. Designed so that on Gandhi\'s birthday (Oct 2), sunlight falls exactly on the spot where the urn was kept.',
      descriptionTa: 'மகாத்மா காந்தியின் அஸ்தி கடலில் கரைப்பதற்கு முன்பு பொதுமக்கள் அஞ்சலிக்காக வைக்கப்பட்ட இடத்தில் 1956ல் கட்டப்பட்டது. காந்தியின் பிறந்தநாளன்று (அக்டோபர் 2), சூரிய ஒளி அஸ்தி வைக்கப்பட்ட இடத்தில் விழும் வகையில் வடிவமைக்கப்பட்டுள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0813,
      longitude: 77.5527,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '07:00 AM', close: '07:00 PM' }
    }
  })

  const d6 = await prisma.destination.create({
    data: {
      slug: 'kamarajar-manimandapam',
      nameEn: 'Kamarajar Manimandapam',
      nameTa: 'காமராஜர் மணிமண்டபம்',
      category: Category.HERITAGE,
      descriptionEn: 'A memorial dedicated to K. Kamaraj, the former Chief Minister of Tamil Nadu, known as the "Kingmaker" of Indian politics. Located near the seashore adjacent to the Gandhi Memorial.',
      descriptionTa: 'இந்திய அரசியலின் "கிங்மேக்கர்" என்று அழைக்கப்படும் முன்னாள் தமிழக முதல்வர் கே.காமராஜருக்கு அர்ப்பணிக்கப்பட்ட மணிமண்டபம். காந்தி நினைவு மண்டபத்திற்கு அருகில் அமைந்துள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0810,
      longitude: 77.5530,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '07:00 AM', close: '07:00 PM' }
    }
  })

  const d7 = await prisma.destination.create({
    data: {
      slug: 'padmanabhapuram-palace',
      nameEn: 'Padmanabhapuram Palace',
      nameTa: 'பத்மநாபபுரம் அரண்மனை',
      category: Category.HERITAGE,
      descriptionEn: 'The largest wooden palace complex in Asia, built in the 16th century by the Travancore kings. Features exquisite Kerala-style architecture, intricate woodwork, murals, and a 400-year-old granite courtyard.',
      descriptionTa: 'ஆசியாவிலேயே மிகப்பெரிய மர அரண்மனை வளாகம், 16 ஆம் நூற்றாண்டில் திருவிதாங்கூர் மன்னர்களால் கட்டப்பட்டது. நேர்த்தியான கேரளா பாணி கட்டிடக்கலை, சிக்கலான மர வேலைப்பாடுகள் ஆகியவற்றைக் கொண்டுள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80',
      latitude: 8.2464,
      longitude: 77.3323,
      entryFeeAdult: 50,
      entryFeeChild: 20,
      isFeatured: true,
      openingHours: { open: '09:00 AM', close: '04:30 PM' }
    }
  })

  const d8 = await prisma.destination.create({
    data: {
      slug: 'suchindram-thanumalayan-temple',
      nameEn: 'Suchindram Thanumalayan Temple',
      nameTa: 'சுசீந்திரம் தாணுமாலயன் கோவில்',
      category: Category.TEMPLE,
      descriptionEn: 'A unique temple dedicated to the Hindu trinity — Shiva, Vishnu, and Brahma — worshipped as a single deity (Sthanumalayan). Famous for its 18-foot Hanuman statue and musical pillars.',
      descriptionTa: 'மும்மூர்த்திகளான சிவன், விஷ்ணு, மற்றும் பிரம்மா ஆகியோருக்கு அர்ப்பணிக்கப்பட்ட ஒரு தனித்துவமான கோவில். இதன் 18 அடி அனுமன் சிலை மற்றும் இசை தூண்களுக்கு பிரபலமானது.',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
      latitude: 8.1565,
      longitude: 77.4815,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: true,
      openingHours: { open: '05:00 AM', close: '08:30 PM' }
    }
  })

  const d9 = await prisma.destination.create({
    data: {
      slug: 'thirparappu-waterfalls',
      nameEn: 'Thirparappu Waterfalls',
      nameTa: 'திற்பரப்பு அருவி',
      category: Category.WATERFALL,
      descriptionEn: 'A scenic 50-foot waterfall on the Kodayar River, surrounded by lush forests. A popular picnic spot with bathing ghats. A Shiva temple is located near the falls.',
      descriptionTa: 'கோதையாற்றின் மீது அமைந்துள்ள 50 அடி உயரமுள்ள அழகான அருவி. குளிக்கும் படித்துறைகளுடன் கூடிய பிரபலமான சுற்றுலா தலம். அருவியின் அருகில் ஒரு சிவன் கோவில் உள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=800&auto=format&fit=crop&q=80',
      latitude: 8.4414,
      longitude: 77.3168,
      entryFeeAdult: 20,
      entryFeeChild: 10,
      isFeatured: true,
      openingHours: { open: '08:00 AM', close: '05:30 PM' }
    }
  })

  const d10 = await prisma.destination.create({
    data: {
      slug: 'vattakottai-fort',
      nameEn: 'Vattakottai Fort',
      nameTa: 'வட்டக்கோட்டை',
      category: Category.HERITAGE,
      descriptionEn: 'An 18th-century seaside granite fort built by the Travancore kings as a coastal defense. Uniquely circular in shape and located right on the shore, offering panoramic sea views.',
      descriptionTa: '18 ஆம் நூற்றாண்டில் திருவிதாங்கூர் மன்னர்களால் கடலோரப் பாதுகாப்பாகக் கட்டப்பட்ட கடலோர கிரானைட் கோட்டை. தனித்துவமான வட்ட வடிவம் மற்றும் கடற்கரையில் அமைந்துள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      latitude: 8.1256,
      longitude: 77.5578,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '06:00 AM', close: '06:00 PM' }
    }
  })

  const d11 = await prisma.destination.create({
    data: {
      slug: 'mathoor-hanging-bridge',
      nameEn: 'Mathoor Hanging Bridge (Aqueduct)',
      nameTa: 'மத்தூர் தூக்கு பாலம்',
      category: Category.ADVENTURE,
      descriptionEn: 'India\'s highest and longest aqueduct, built in 1966 across the Pahrali River valley. Stands at 115 feet high and stretches 1,240 feet long, offering breathtaking valley views.',
      descriptionTa: 'பரளியாற்றின் குறுக்கே 1966 இல் கட்டப்பட்ட இந்தியாவின் மிக உயரமான மற்றும் நீளமான தொங்கு பாலம். 115 அடி உயரத்தில் 1,240 அடி நீளத்தில் அமைந்துள்ள இந்த பாலம் பள்ளத்தாக்கின் எழில்மிகு காட்சியை வழங்குகிறது.',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      latitude: 8.3242,
      longitude: 77.3117,
      entryFeeAdult: 20,
      entryFeeChild: 10,
      isFeatured: false,
      openingHours: { open: '08:00 AM', close: '05:30 PM' }
    }
  })

  const d12 = await prisma.destination.create({
    data: {
      slug: 'chitharal-jain-rock-temple',
      nameEn: 'Chitharal Jain Rock-Cut Temple',
      nameTa: 'சிதறால் ஜைன கோவில்',
      category: Category.RELIGIOUS,
      descriptionEn: 'A 1st-century BCE Jain rock-cut cave temple with bas-relief sculptures of Tirthankara Mahavira, the oldest Jain monuments in Tamil Nadu.',
      descriptionTa: 'தீர்த்தங்கரர் மகாவீரரின் புடைப்புச் சிற்பங்களைக் கொண்ட கிமு 1 ஆம் நூற்றாண்டின் சமண குடைவரை கோவில். தமிழ்நாட்டின் பழமையான சமண நினைவுச்சின்னம்.',
      heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80',
      latitude: 8.3258,
      longitude: 77.2349,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '09:00 AM', close: '05:00 PM' }
    }
  })

  const d13 = await prisma.destination.create({
    data: {
      slug: 'udayagiri-fort',
      nameEn: 'Udayagiri Fort',
      nameTa: 'உதயகிரி கோட்டை',
      category: Category.HERITAGE,
      descriptionEn: 'A massive 90-acre historic fort with military significance, containing the tomb of Dutch Admiral Eustachius De Lannoy. Features a biodiversity park and a foundry.',
      descriptionTa: 'டச்சு அட்மிரல் டி லெனாயின் கல்லறையைக் கொண்ட இராணுவ முக்கியத்துவம் வாய்ந்த 90 ஏக்கர் பரப்பளவிலான வரலாற்று சிறப்புமிக்க கோட்டை. பல்லுயிர் பூங்காவைக் கொண்டுள்ளது.',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      latitude: 8.2422,
      longitude: 77.3349,
      entryFeeAdult: 20,
      entryFeeChild: 10,
      isFeatured: false,
      openingHours: { open: '09:00 AM', close: '05:00 PM' }
    }
  })

  const d14 = await prisma.destination.create({
    data: {
      slug: 'sothavilai-beach',
      nameEn: 'Sothavilai Beach',
      nameTa: 'சோத்தாவிளை கடற்கரை',
      category: Category.BEACH,
      descriptionEn: 'A serene, less-crowded natural beach located about 12 km from Kanyakumari town, known for its high sand dunes, shallow waters, and golden sand. Ideal for swimming.',
      descriptionTa: 'கன்னியாகுமரியிலிருந்து 12 கிமீ தொலைவில் அமைந்துள்ள அமைதியான கடற்கரை. மணல் மேடுகள் மற்றும் ஆழமற்ற நீருக்கு பிரபலமானது, நீச்சலுக்கு ஏற்றது.',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0939,
      longitude: 77.4511,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '24 Hours', close: '24 Hours' }
    }
  })

  const d15 = await prisma.destination.create({
    data: {
      slug: 'muttom-beach',
      nameEn: 'Muttom Beach & Lighthouse',
      nameTa: 'முட்டம் கடற்கரை',
      category: Category.BEACH,
      descriptionEn: 'A picturesque rocky beach known for stunning rock formations and wave-carved caves. The 40-meter lighthouse offers panoramic coastal views.',
      descriptionTa: 'அலைகளால் அரிக்கப்பட்ட பாறைகள் மற்றும் பாறை வடிவங்களுக்கு பெயர் பெற்ற முட்டம் கடற்கரை. 40 மீட்டர் உயர கலங்கரை விளக்கம் கடலோரக் காட்சியை வழங்குகிறது.',
      heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      latitude: 8.1300,
      longitude: 77.3200,
      entryFeeAdult: 25,
      entryFeeChild: 10,
      isFeatured: false,
      openingHours: { open: '03:00 PM', close: '05:00 PM' }
    }
  })

  const d16 = await prisma.destination.create({
    data: {
      slug: 'pechiparai-dam',
      nameEn: 'Pechiparai Dam',
      nameTa: 'பேச்சிப்பாறை அணை',
      category: Category.WILDLIFE,
      descriptionEn: 'A picturesque dam built across the Kodayar River in the Western Ghats foothills. Surrounded by dense forests and rubber plantations, offering boating.',
      descriptionTa: 'மேற்கு தொடர்ச்சி மலை அடிவாரத்தில் கோதையாற்றின் குறுக்கே கட்டப்பட்ட அழகான அணை. அடர்ந்த காடுகளால் சூழப்பட்டு படகு சவாரி வசதியை வழங்குகிறது.',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      latitude: 8.4425,
      longitude: 77.3136,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '06:00 AM', close: '06:30 PM' }
    }
  })

  const d17 = await prisma.destination.create({
    data: {
      slug: 'olakaruvi-waterfalls',
      nameEn: 'Olakaruvi Waterfalls',
      nameTa: 'ஒலக்கருவி அருவி',
      category: Category.WATERFALL,
      descriptionEn: 'A hidden waterfall nestled in the Western Ghats, accessible via a scenic 1-hour trek through forested terrain, known for its pristine beauty.',
      descriptionTa: 'மேற்குத் தொடர்ச்சி மலையில் அமைந்துள்ள ஒரு மறைக்கப்பட்ட அருவி, 1 மணி நேர மலையேற்றம் மூலம் மட்டுமே சென்றடைய முடியும். இயற்கை எழில் கொஞ்சும் தலம்.',
      heroImage: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=800&auto=format&fit=crop&q=80',
      latitude: 8.2550,
      longitude: 77.2800,
      entryFeeAdult: 0,
      entryFeeChild: 0,
      isFeatured: false,
      openingHours: { open: '06:00 AM', close: '05:00 PM' }
    }
  })

  const d18 = await prisma.destination.create({
    data: {
      slug: 'wax-museum',
      nameEn: 'Wax Museum (Mayapuri Wonder Wax)',
      nameTa: 'மெழுகு அருங்காட்சியகம்',
      category: Category.MUSEUM,
      descriptionEn: 'Features lifelike wax statues of famous Indian and international personalities. Offers combo experiences including 3D painting and VR cinema.',
      descriptionTa: 'பிரபல இந்திய மற்றும் சர்வதேச நபர்களின் மெழுகு சிலைகளைக் கொண்ட அருங்காட்சியகம். 3D ஓவியங்கள் மற்றும் VR சினிமா வசதிகள் உள்ளன.',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
      latitude: 8.0830,
      longitude: 77.5540,
      entryFeeAdult: 100,
      entryFeeChild: 50,
      isFeatured: false,
      openingHours: { open: '08:00 AM', close: '06:30 PM' }
    }
  })

  console.log('🏛 Destinations seeded.')

  // ─────────────────────────────────────────
  // HOTELS (10 entries)
  // ─────────────────────────────────────────
  await prisma.hotel.createMany({
    data: [
      {
        nameEn: 'Hotel Tamil Nadu (TTDC)',
        nameTa: 'ஹோட்டல் தமிழ்நாடு (TTDC)',
        type: HotelType.GOVERNMENT,
        descriptionEn: 'Official government hotel offering comfortable AC and non-AC rooms, located close to the beach and ferry counter.',
        descriptionTa: 'கடற்கரை மற்றும் படகுத்துறைக்கு அருகில் அமைந்துள்ள அரசுக்கு சொந்தமான தங்கும் விடுதி.',
        address: 'Beach Road, Kanyakumari',
        latitude: 8.0830,
        longitude: 77.5535,
        pricePerNight: 2500,
        starRating: 3,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['AC', 'Restaurant', 'Parking', 'Wi-Fi', 'Room Service']
      },
      {
        nameEn: 'Sparsa Resort Kanyakumari',
        nameTa: 'ஸ்பர்சா ரிசார்ட்',
        type: HotelType.RESORT,
        descriptionEn: 'Eco-friendly luxury resort offering premium amenities, tennis court, and an outdoor swimming pool overlooking the sea.',
        descriptionTa: 'கடல் காட்சியை வழங்கும் சொகுசு ரிசார்ட், நீச்சல் குளம் மற்றும் டென்னிஸ் மைதானம் கொண்டது.',
        address: 'Kovalam Road, Kanyakumari',
        latitude: 8.0850,
        longitude: 77.5500,
        pricePerNight: 6000,
        starRating: 4,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Wi-Fi', 'Bar']
      },
      {
        nameEn: 'The Seashore Hotel',
        nameTa: 'தி சீஷோர் ஹோட்டல்',
        type: HotelType.LUXURY,
        descriptionEn: 'Premium hotel featuring sea-view rooms and a multicuisine rooftop restaurant with breathtaking ocean views.',
        descriptionTa: 'கடல் பக்க அறைகள் மற்றும் சிறந்த உணவகத்துடன் கூடிய சொகுசு ஹோட்டல்.',
        address: 'East Car Street, Kanyakumari',
        latitude: 8.0825,
        longitude: 77.5568,
        pricePerNight: 4500,
        starRating: 4,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Sea View', 'Rooftop Restaurant', 'Valet Parking', 'Wi-Fi', 'Spa']
      },
      {
        nameEn: 'The Gopinivas Grand',
        nameTa: 'தி கோபிநிவாஸ் கிராண்ட்',
        type: HotelType.MID_RANGE,
        descriptionEn: 'Modern comfortable mid-range hotel situated in the heart of Kanyakumari town, close to sightseeing points.',
        descriptionTa: 'நகரத்தின் மையப்பகுதியில் அமைந்துள்ள வசதியான நடுத்தர ஹோட்டல்.',
        address: 'Near Seashore, Kanyakumari',
        latitude: 8.0820,
        longitude: 77.5560,
        pricePerNight: 3000,
        starRating: 3,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['AC', 'Wi-Fi', 'Restaurant', 'Spa', 'Travel Desk']
      },
      {
        nameEn: 'Hotel Tri Sea',
        nameTa: 'ஹோட்டல் ட்ரை சீ',
        type: HotelType.MID_RANGE,
        descriptionEn: 'Well-known hotel featuring a rooftop swimming pool and rooms with balconies facing the ocean.',
        descriptionTa: 'நீச்சல் குளம் மற்றும் கடல் நோக்கிய பால்கனி அறைகள் கொண்ட ஹோட்டல்.',
        address: 'Beach Road, Kanyakumari',
        latitude: 8.0832,
        longitude: 77.5530,
        pricePerNight: 2800,
        starRating: 3,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Pool', 'AC', 'Wi-Fi', 'Restaurant', 'Conference Hall']
      },
      {
        nameEn: 'Hotel Temple Citi',
        nameTa: 'ஹோட்டல் டெம்பிள் சிட்டி',
        type: HotelType.BUDGET,
        descriptionEn: 'Economical and clean hotel offering basic comforts, located near Nagercoil junction.',
        descriptionTa: 'நாகர்கோவில் இரயில் நிலையம் அருகில் அமைந்துள்ள மலிவான சுத்தமான ஹோட்டல்.',
        address: 'Nagercoil Main Road',
        latitude: 8.1800,
        longitude: 77.4200,
        pricePerNight: 1500,
        starRating: 2,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['AC', 'Parking', 'Room Service', 'Veg Restaurant']
      },
      {
        nameEn: 'Cape Comorin Residency',
        nameTa: 'கேப் கொமரின் ரெசிடென்சி',
        type: HotelType.BUDGET,
        descriptionEn: 'Budget-friendly rooms with good views of the sunrise points, suitable for family travelers.',
        descriptionTa: 'குடும்பத்துடன் தங்குவதற்கு ஏற்ற பட்ஜெட் விடுதி.',
        address: 'Near Lighthouse, Kanyakumari',
        latitude: 8.0811,
        longitude: 77.5550,
        pricePerNight: 1200,
        starRating: 2,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['AC Option', 'TV', 'Parking', '24-hour Reception']
      },
      {
        nameEn: 'Sea Queen Homestay',
        nameTa: 'சீ குயின் ஹோம்ஸ்டே',
        type: HotelType.HOMESTAY,
        descriptionEn: 'Quiet homestay experience offering home-cooked fish meals and authentic local hospitality.',
        descriptionTa: 'வீட்டு உணவுடன் கூடிய வசதியான ஹோம்ஸ்டே தங்குமிடம்.',
        address: 'Sothavilai Beach Road',
        latitude: 8.0950,
        longitude: 77.4530,
        pricePerNight: 1800,
        starRating: null,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Kitchen Access', 'Home Food', 'Wi-Fi', 'AC']
      },
      {
        nameEn: 'Sunrise Guest House',
        nameTa: 'சன்ரைஸ் கெஸ்ட் ஹவுஸ்',
        type: HotelType.HOMESTAY,
        descriptionEn: 'Simple rooms managed by a local family, very close to the sunrise viewing tower.',
        descriptionTa: 'சூரிய உதயம் பார்க்கும் இடத்திற்கு மிக அருகில் உள்ள எளிய தங்கும் விடுதி.',
        address: 'Sunrise View Point Street',
        latitude: 8.0805,
        longitude: 77.5560,
        pricePerNight: 1000,
        starRating: null,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Fan Only', 'Attached Bath', 'Wi-Fi']
      },
      {
        nameEn: 'Anantya Resorts',
        nameTa: 'அனந்தியா ரிசார்ட்ஸ்',
        type: HotelType.RESORT,
        descriptionEn: 'Ultra-luxury resort situated on the banks of Chittar Lake, offering private villas with plunge pools.',
        descriptionTa: 'சிற்றாறு ஏரிக்கரையில் அமைந்துள்ள மிக சொகுசான ரிசார்ட் விடுதி.',
        address: 'Chittar Lake, Kanyakumari District',
        latitude: 8.3500,
        longitude: 77.2000,
        pricePerNight: 9000,
        starRating: 5,
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
        amenities: ['Infinity Pool', 'Lake Views', 'Spa', 'Resto-Bar', 'Activity Area']
      }
    ]
  })

  console.log('🏨 Hotels seeded.')

  // ─────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      {
        titleEn: 'Cape Festival 2026',
        titleTa: 'கேப் திருவிழா 2026',
        descriptionEn: 'Organized by the Department of Tourism, Tamil Nadu. Showcases regional culture with music concerts and dance performances.',
        descriptionTa: 'தமிழ்நாடு சுற்றுலாத்துறை நடத்தும் கலாச்சார இசை மற்றும் நடன விழா.',
        type: EventType.CULTURAL,
        venue: 'Kanyakumari Beach Open Air Stage',
        startDate: new Date('2026-10-15T09:00:00Z'),
        endDate: new Date('2026-10-17T22:00:00Z'),
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
        isGovernment: true,
        isFeatured: true
      },
      {
        titleEn: 'Margazhi Temple Car Festival',
        titleTa: 'மார்கழி தேர்த்திருவிழா',
        descriptionEn: 'The grand chariot festival of Suchindram Thanumalayan Temple involving a massive procession of three decorated cars.',
        descriptionTa: 'சுசீந்திரம் கோவிலின் மார்கழி மாத தேர்த்திருவிழா.',
        type: EventType.TEMPLE,
        venue: 'Suchindram Temple Street',
        startDate: new Date('2026-12-20T05:00:00Z'),
        endDate: new Date('2026-12-30T12:00:00Z'),
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500',
        isGovernment: false,
        isFeatured: true
      },
      {
        titleEn: 'Kumari Thiruvizha',
        titleTa: 'குமரி திருவிழா',
        descriptionEn: 'Summer festival showcasing folk arts of Kanyakumari district including Villu Paattu and Karagattam.',
        descriptionTa: 'வில்லுப்பாட்டு, கரகாட்டம் போன்ற பாரம்பரிய நாட்டுப்புற கலை நிகழ்ச்சிகளின் கோடை விழா.',
        type: EventType.FESTIVAL,
        venue: 'Nagercoil Municipal Grounds',
        startDate: new Date('2027-05-10T17:00:00Z'),
        endDate: new Date('2027-05-15T22:00:00Z'),
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
        isGovernment: true,
        isFeatured: false
      }
    ]
  })

  console.log('🎉 Events seeded.')

  // ─────────────────────────────────────────
  // EMERGENCY CONTACTS
  // ─────────────────────────────────────────
  await prisma.emergencyContact.createMany({
    data: [
      {
        nameEn: 'Kanyakumari Police Station',
        nameTa: 'கன்னியாகுமரி காவல் நிலையம்',
        type: EmergencyType.POLICE,
        phone: '04652-246947',
        address: 'Near Beach Road, Kanyakumari',
        latitude: 8.0840,
        longitude: 77.5550
      },
      {
        nameEn: 'Government Medical College Hospital',
        nameTa: 'அரசு மருத்துவக் கல்லூரி மருத்துவமனை',
        type: EmergencyType.HOSPITAL,
        phone: '04652-223201',
        address: 'Asaripallam, Nagercoil',
        latitude: 8.1900,
        longitude: 77.4000
      },
      {
        nameEn: 'Fire Station Kanyakumari',
        nameTa: 'தீயணைப்பு நிலையம் கன்னியாகுமரி',
        type: EmergencyType.FIRE,
        phone: '04652-270309',
        address: 'Main Road, Kanyakumari',
        latitude: 8.0820,
        longitude: 77.5510
      },
      {
        nameEn: 'National Tourist Helpline',
        nameTa: 'தேசிய சுற்றுலா உதவி எண்',
        type: EmergencyType.TOURIST_HELPLINE,
        phone: '1363',
        address: 'Toll Free (24/7 Multi-Lingual Support)'
      }
    ]
  })

  console.log('🚨 Emergency contacts seeded.')

  // ─────────────────────────────────────────
  // ANNOUNCEMENTS
  // ─────────────────────────────────────────
  await prisma.announcement.createMany({
    data: [
      {
        titleEn: 'Online Ticket Booking Now Live!',
        titleTa: 'ஆன்லைன் டிக்கெட் முன்பதிவு இப்போது செயல்பாட்டில் உள்ளது!',
        contentEn: 'You can now book your tickets online for Vivekananda Rock Memorial entry. Avoid long queues and book today!',
        contentTa: 'விவேகானந்தர் பாறை நினைவக நுழைவுக் கட்டணத்தை இப்போது ஆன்லைனில் முன்பதிவு செய்யலாம். வரிசையில் நிற்பதை தவித்து முன்பதிவு செய்யுங்கள்!',
        type: 'General Notification'
      },
      {
        titleEn: 'Cape Festival 2026 Registrations Open',
        titleTa: 'கேப் திருவிழா 2026 பதிவுகள் தொடங்கின',
        contentEn: 'Artists and cultural groups who wish to perform at the festival can register online before Sept 15, 2026.',
        contentTa: 'விழாவில் பங்கேற்று கலைகளை வெளிப்படுத்த விரும்பும் கலைஞர்கள் செப்டம்பர் 15, 2026க்குள் ஆன்லைனில் பதிவு செய்யலாம்.',
        type: 'Event Update'
      }
    ]
  })

  console.log('📢 Announcements seeded.')

  // ─────────────────────────────────────────
  // DOWNLOADS
  // ─────────────────────────────────────────
  await prisma.download.createMany({
    data: [
      {
        titleEn: 'Official Kanyakumari Tourist Map',
        titleTa: 'அதிகாரப்பூர்வ சுற்றுலா வரைபடம்',
        fileUrl: '/downloads/tourist_map.pdf',
        fileType: 'PDF',
        category: 'Maps'
      },
      {
        titleEn: 'Tamil Nadu Tourism Guide - Kanyakumari Edition',
        titleTa: 'தமிழ்நாடு சுற்றுலா வழிகாட்டி - கன்னியாகுமரி பதிப்பு',
        fileUrl: '/downloads/tourist_guide.pdf',
        fileType: 'PDF',
        category: 'Brochures'
      }
    ]
  })

  console.log('💾 Downloads seeded.')

  // ─────────────────────────────────────────
  // BLOGS
  // ─────────────────────────────────────────
  await prisma.blog.create({
    data: {
      slug: 'spiritual-dawn-southern-tip',
      titleEn: 'A Spiritual Dawn at the Southern Tip',
      titleTa: 'தென்கோடி முனையில் ஒரு ஆன்மீக விடியல்',
      contentEn: 'Watching the sunrise from where three oceans converge was a transformative experience. The colors painted across the sky at Kanyakumari Beach made every early morning wake-up call worthwhile.',
      contentTa: 'மூன்று கடல்கள் சங்கமிக்கும் இடத்திலிருந்து சூரிய உதயத்தைப் பார்ப்பது ஒரு புதிய அனுபவமாக இருந்தது. கன்னியாகுமரி கடற்கரையில் வானத்தில் வரையப்பட்ட வண்ணங்கள் அதிகாலையில் எழுந்ததற்கு முற்றிலும் தகுதியானதாக இருந்தது.',
      excerpt: 'Watching the sunrise from Kanyakumari Beach is a lifetime experience.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      category: BlogCategory.TRAVEL_STORY,
      tags: ['sunrise', 'beach', 'experience'],
      authorId: superAdmin.id,
      isPublished: true,
      publishedAt: new Date()
    }
  })

  // ─────────────────────────────────────────
  // GALLERY
  // ─────────────────────────────────────────
  await prisma.galleryItem.createMany({
    data: [
      {
        type: MediaType.PHOTO,
        url: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=300',
        titleEn: 'Vivekananda Rock',
        titleTa: 'விவேகானந்தர் பாறை',
        tags: ['rock', 'heritage', 'monument'],
        isFeatured: true
      },
      {
        type: MediaType.PHOTO,
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300',
        titleEn: 'Thiruvalluvar Statue',
        titleTa: 'திருவள்ளுவர் சிலை',
        tags: ['statue', 'sculpture'],
        isFeatured: true
      }
    ]
  })

  console.log('🖼 Gallery items seeded.')
  console.log('🎉 Seeding successfully completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
