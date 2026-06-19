// Boss Life Rentals — fleet data (single source of truth for cards AND detail pages).
// Boat data is REAL, pulled from the Boatsetter MCP 2026-06-18. RV/jet-ski specs from owner + spec sheets.
// House style: no em-dashes, no ampersand in copy, no "marina", no named destinations, capacity written plainly.
//
// IMAGES: filenames listed in `images[]` should be copied into src/assets/units/<id>/ (rename to remove spaces)
// and imported via astro:assets in the gallery component. Units with images:[] render the on-brand placeholder tile.
//
// VENUES: render in array order, equal billing. OMIT any venue whose url is null (no dead links). The moment a
// real url is added here, its button appears automatically.

export const categories = [
  { key: 'boat',   label: 'Boats',    blurb: 'Two boats, both ours, both kept ready for the day on the water.' },
  { key: 'rv',     label: 'RVs',      blurb: 'Two travel trailers, set up and ready so you just unpack and start the trip.' },
  { key: 'jetski', label: 'Jet Skis', blurb: 'Two SeaDoos, ready at the ramp for the part of the day that needs a little speed.' },
];

export const units = [
  {
    id: 'stella',
    name: 'Stella',
    category: 'boat',
    typeLabel: 'Deck boat',
    yearMakeModel: '2023 Starcraft SVX 191 OB',
    tagline: 'Room to spread out for the whole group.',
    day: 'Room for the whole crew to spread out, shade when you want it, a steady ride, and a spot for everyone from the kids to the grandparents.',
    summary:
      'Room for the whole crew to spread out, shade when you want it, a steady ride, and a spot for everyone from the kids to the grandparents. This is our 2023 Starcraft deck boat, kept clean and ready for a Sarasota day that is entirely yours.',
    chips: ['10 guests', '19 ft', '150 hp', 'deck boat'],
    specs: {
      Length: '19 ft',
      Guests: '10 guests',
      Engine: '150 hp Mercury outboard',
      'Top speed': '40 mph',
      Year: '2023',
      'USCG capacity': '12 persons / 1,600 lbs',
    },
    features: [
      'Bluetooth stereo with aft-facing speakers', 'Humminbird Helix 5 GPS and fish finder',
      'Bow and stern anchors', 'Swim ladder and stern platform', 'Bimini top for full shade or full sun',
      'Hydraulic steering', 'Livewell and rod holders', 'Children life jackets',
      'Cooler and ice chest', 'Snorkeling gear, paddleboard, floating mat, and tube available',
    ],
    included:
      'Comes to you clean and with a full tank, because it is ours. We refuel after and pass the pump receipt through with no markup.',
    walkthrough:
      'We meet you at the dock 15 minutes before your start time and walk you through everything: controls, safety gear, and the operating area. Then the day is yours.',
    requirements: [
      '21 or older with 2 plus years of recent boating experience.',
      'Valid photo ID and a matching credit card.',
      'Born after 1/1/1988? Florida requires a Boater Safety Education ID Card. Not sure where to get it? Just ask.',
      'All towable gear is provided by Boss Life Rentals.',
    ],
    pricing: { sixHour: 430, eightHour: 530 },
    operatingArea: 'Home base is Centennial Park in Sarasota, included. Other pickup points available, ask when you book.',
    images: ['stella-01.jpg', 'stella-02.jpg', 'stella-03.jpg', 'stella-04.jpg'],
    venues: [
      { name: 'Boatsetter', url: 'https://www.boatsetter.com/boats/gbxppnq' },
      { name: 'GetMyBoat', url: null },   // TODO Carlos: GetMyBoat listing URL
      { name: 'Direct', url: '#contact' },
    ],
  },
  {
    id: 'marco',
    name: 'Marco',
    category: 'boat',
    typeLabel: 'Dual console',
    yearMakeModel: '2021 Robalo R227 Dual Console',
    tagline: 'Built for the day that turns into anything.',
    day: 'The day that turns into anything: a morning cruise, a swim stop, a fishing run, a sunset to close. The range and the ride for all of it.',
    summary:
      'The day that turns into anything: a morning cruise, a swim stop, a fishing run, a sunset to close. This is our 2021 Robalo R227 dual console, with the range and the ride for all of it, kept clean and ready.',
    chips: ['8 guests', '22 ft', '250 hp', 'dual console'],
    specs: {
      Length: '22 ft',
      Guests: '8 guests',
      Engine: '250 hp Yamaha four stroke',
      'Top speed': '40 mph',
      Year: '2021',
      Fuel: '101 gallon range',
      'USCG capacity': '10 persons / 1,445 lbs',
    },
    features: [
      'Garmin GPSMAP 943xsv chartplotter and sonar', 'Bluetooth stereo', 'Dual swim platforms with boarding ladder',
      'Freshwater deck shower', 'Underwater LED lights', 'Lenco trim tabs', '20 gallon livewell and washdown',
      'Gunwale and transom rod holders', 'Ski and tow pole', 'Bimini top', 'Children life jackets',
      'Snorkeling gear, paddleboard, floating island, and tube available',
    ],
    included:
      'Comes to you clean and with a full tank, because it is ours. We refuel after and pass the pump receipt through with no markup. Captained option available.',
    walkthrough:
      'We meet you at the dock 15 minutes before your start time and walk you through everything: controls, safety gear, and the operating area. Then the day is yours.',
    requirements: [
      '21 or older with 2 plus years of recent boating experience.',
      'Valid photo ID and a matching credit card.',
      'Born after 1/1/1988? Florida requires a Boater Safety Education ID Card. Not sure where to get it? Just ask.',
      'All towable gear is provided by Boss Life Rentals.',
    ],
    pricing: { sixHour: 499, eightHour: 599 },
    operatingArea: 'Home base is Centennial Park in Sarasota, included. Other pickup points available, ask when you book.',
    images: [
      'marco-01.jpg', 'marco-02.jpg', 'marco-03.jpg', 'marco-04.jpg', 'marco-05.jpg', 'marco-06.jpg',
      'marco-07.jpg', 'marco-08.jpg', 'marco-09.jpg', 'marco-10.jpg', 'marco-11.jpg',
    ],
    venues: [
      // NOTE Carlos: Marco is currently INACTIVE on Boatsetter (listing approved but not activated). Activate it,
      // or this booking path will not be live. Direct still works.
      { name: 'Boatsetter', url: 'https://www.boatsetter.com/boats/ztwgdbw' },
      { name: 'GetMyBoat', url: null },   // TODO Carlos: GetMyBoat listing URL
      { name: 'Direct', url: '#contact' },
    ],
  },
  {
    id: 'apex-nano-208bhs',
    name: 'Apex Nano 208BHS',
    category: 'rv',
    typeLabel: 'Travel trailer',
    yearMakeModel: '2021 Coachmen Apex Nano 208BHS',
    tagline: 'Pull up, unpack, and live it.',
    day: 'Pack up and go. A light, easy trailer with a bunkhouse for the kids, set up and ready so you just unpack and start the trip.',
    summary: 'Pack up and go. A light, easy to tow 2021 Coachmen Apex Nano travel trailer with a bunkhouse for the kids, set up and ready so you just unpack and start the trip.',
    chips: ['bunkhouse', 'travel trailer'],
    specs: { Make: 'Coachmen Apex Nano', Model: '208BHS', Year: '2021', Layout: 'Bunkhouse' }, // TODO Carlos: sleeps, length, dry weight
    features: ['Bunkhouse sleeping', 'Kitchen and dinette', 'Set up ready at your site'],
    included: 'We can have it set up and ready so you go in and just unpack.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area.',
    images: [], // TODO Carlos: real Apex Nano photos
    venues: [
      { name: 'RVshare', url: null },   // TODO Carlos: RVshare listing URL
      { name: 'Direct', url: '#contact' },
    ],
  },
  {
    id: 'flagstaff-27bhws',
    name: 'Flagstaff Super Lite 27BHWS',
    category: 'rv',
    typeLabel: 'Travel trailer',
    yearMakeModel: '2023 Forest River Flagstaff Super Lite 27BHWS',
    tagline: 'Room for the whole family, wherever the road goes.',
    day: 'Room for the whole family on the long trip: two slides, a dedicated bunk room, and space to spread out.',
    summary: 'Room for the whole family on the long trip. A roomy 2023 Forest River Flagstaff Super Lite with two slides, a dedicated bunk room, and space to spread out.',
    chips: ['sleeps 7', '32 ft 10 in', '2 slides', 'bunk room'],
    specs: { Make: 'Forest River Flagstaff Super Lite', Model: '27BHWS', Year: '2023', Length: '32 ft 10 in', Sleeps: '7', Slides: '2', 'Dry weight': '7,310 lbs' },
    features: ['Two slide outs', 'Dedicated bunk room', 'Full kitchen and dinette', 'Sleeps 7'],
    included: 'We can have it set up and ready so you go in and just unpack.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area.',
    images: [], // TODO Carlos: real Flagstaff photos
    venues: [
      { name: 'RVshare', url: null },   // TODO Carlos: RVshare listing URL
      { name: 'Direct', url: '#contact' },
    ],
  },
  {
    id: 'seadoo-gti-se-170',
    name: 'SeaDoo GTI SE 170',
    category: 'jetski',
    typeLabel: 'Personal watercraft',
    yearMakeModel: '2022 SeaDoo GTI SE 170',
    tagline: 'On the water in minutes.',
    day: 'On the water in minutes. Stable, easy to ride, and ready at the ramp for the part of the day that needs a little speed.',
    summary: 'On the water in minutes. A 2022 SeaDoo GTI SE 170 in yellow, stable, easy to ride, and ready at the ramp for the part of the day that needs a little speed.',
    chips: ['yellow', '3 seats'],
    specs: { Make: 'SeaDoo', Model: 'GTI SE 170', Year: '2022', Color: 'Yellow' },
    features: ['Three seat', 'Stable and easy to ride', 'Brake and reverse'],
    included: 'Booked direct with us for now.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area.',
    images: [], // TODO Carlos: real jet ski photos
    venues: [{ name: 'Direct', url: '#contact' }],
  },
  {
    id: 'seadoo-gti-se-130',
    name: 'SeaDoo GTI SE 130',
    category: 'jetski',
    typeLabel: 'Personal watercraft',
    yearMakeModel: '2022 SeaDoo GTI SE 130',
    tagline: 'On the water in minutes.',
    day: 'On the water in minutes. Stable, easy to ride, and ready at the ramp for the part of the day that needs a little speed.',
    summary: 'On the water in minutes. A 2022 SeaDoo GTI SE 130 in orange, stable, easy to ride, and ready at the ramp for the part of the day that needs a little speed.',
    chips: ['orange', '3 seats'],
    specs: { Make: 'SeaDoo', Model: 'GTI SE 130', Year: '2022', Color: 'Orange' },
    features: ['Three seat', 'Stable and easy to ride', 'Brake and reverse'],
    included: 'Booked direct with us for now.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area.',
    images: [], // TODO Carlos: real jet ski photos
    venues: [{ name: 'Direct', url: '#contact' }],
  },
];

export const getUnit = (id) => units.find((u) => u.id === id);
export const unitsByCategory = (key) => units.filter((u) => u.category === key);
