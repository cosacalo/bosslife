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
  { key: 'jetski', label: 'Jet Skis', blurb: 'Two Sea-Doos, ready at the ramp for the part of the day that needs a little speed.' },
];

export const units = [
  {
    id: 'stella',
    name: 'Stella',
    category: 'boat',
    typeLabel: 'Deck boat',
    yearMakeModel: '2023 Starcraft SVX 191 OB',
    tagline: 'Room to spread out for the whole group.',
    // Optional rotating-boat hero accent (AI studio clip) behind the detail hero.
    heroVideo: 'stella-rotate.mp4',
    heroPoster: 'stella-rotate-poster.jpg',
    day: 'Room for the whole crew to spread out, shade when you want it, a steady ride, and a spot for everyone from the kids to the grandparents.',
    summary:
      'Room for the whole crew to spread out, shade when you want it, a steady ride, and a spot for everyone from the kids to the grandparents. This is our 2023 Starcraft deck boat, kept clean and ready for a Sarasota day that is entirely yours.',
    chips: ['10 guests', '19 ft', '150 hp', 'deck boat'],
    specs: {
      Length: '19 ft',
      Guests: '10 guests',
      Engine: '150 hp Mercury outboard',
      'Top speed': '46 mph',
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
    // 01-04 are real Stella shots. 05-06 are SVX cockpit/deck detail shots
    // (note: SVX 211 sibling, 768x576, used as supplementary detail views).
    images: ['stella-01.jpg', 'stella-02.jpg', 'stella-03.jpg', 'stella-04.jpg', 'stella-05.jpg', 'stella-06.jpg'],
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
    // Optional rotating-boat hero accent (AI studio clip) behind the detail hero.
    heroVideo: 'marco-rotate.mp4',
    heroPoster: 'marco-rotate-poster.jpg',
    day: 'The day that turns into anything: a morning cruise, a swim stop, a fishing run, a sunset to close. The range and the ride for all of it.',
    summary:
      'The day that turns into anything: a morning cruise, a swim stop, a fishing run, a sunset to close. This is our 2021 Robalo R227 dual console, with the range and the ride for all of it, kept clean and ready.',
    chips: ['8 guests', '22 ft', '250 hp', 'dual console'],
    specs: {
      Length: '22 ft',
      Guests: '8 guests',
      Engine: '250 hp Yamaha four stroke',
      'Top speed': '52 mph',
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
    // Optional rotating-trailer hero accent (AI studio clip) behind the detail hero.
    heroVideo: 'apex-rotate.mp4',
    heroPoster: 'apex-rotate-poster.jpg',
    day: 'Pack up and go. A light, easy trailer with a bunkhouse for the kids, set up and ready so you just unpack and start the trip.',
    summary:
      'Pack up and go. This is our 2021 Coachmen Apex Nano 208BHS, a light, easy to tow travel trailer with a queen up front, bunks in back for the kids, and the Off-Grid Package so you can set up somewhere quiet and stay a while. We can have it ready at your site so you just unpack and start the trip.',
    chips: ['off-grid solar', 'bunkhouse', '25 ft', 'outside kitchen'],
    // Specs verified from the 2021 Apex Nano brochure (208 BHS column + callouts).
    specs: {
      Make: 'Coachmen Apex Nano',
      Model: '208BHS',
      Year: '2021',
      Beds: 'Queen up front, double bunks in back',
      Length: '25 ft',
      'Interior height': '6 ft 5 in',
      'Dry weight': '4,260 lbs',
      GVWR: '6,000 lbs',
      'Fresh water': '50 gal',
      Awning: '14 ft',
    },
    // The Off-Grid Package is the standout, so it gets the highlight block on the
    // detail page rather than being buried in the features list.
    highlight: {
      title: 'Made to camp off the grid',
      body: 'This one came with the Apex Off-Grid Package, so you can pull off somewhere quiet and stay a while without needing a hookup.',
      points: [
        '100 watt solar panel with a 10 amp charge controller, keeping the battery topped up',
        'Two 20 lb LP tanks with a cover, for longer trips between fills',
        'High velocity 10 inch power roof vent, three speeds and quiet',
        '12 volt outlets at the pass-through storage and the outside kitchen',
      ],
    },
    features: [
      'Front 60 by 80 queen bed',
      'Rear double bunks, with the lower bunk flipping up for storage',
      'Large booth dinette for meals and card games',
      'Outside camp kitchen with a cooktop and refrigerator',
      '6 cubic foot gas and electric refrigerator',
      'Microwave and a two-burner cooktop',
      'Full bathroom with tub surround and a skylight',
      '13,500 BTU air conditioning and a direct-vent furnace',
      'Power awning with LED lighting',
      'Heated and enclosed underbelly for cooler nights',
      'Hot and cold outside shower',
      'Bluetooth stereo with outside speakers',
    ],
    included:
      'We can have it set up and ready at your site so you just unpack and start the trip. It comes clean, with the systems checked and the battery charged.',
    walkthrough:
      'We meet you to hand it over, walk you through the trailer, the hookups, and how everything works, and we are a call away for the rest of the trip.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area. Ask us about delivery and setup at your campsite.',
    floorplan: 'apex-floorplan.jpg', // 208 BHS floor plan (from the Coachmen brochure)
    images: [
      'apex-nano-01.jpg', 'apex-nano-02.jpg', 'apex-nano-03.jpg', 'apex-nano-04.jpg',
      'apex-nano-05.jpg', 'apex-nano-06.jpg', 'apex-nano-07.jpg', 'apex-nano-08.jpg',
    ],
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
    // Optional rotating-trailer hero accent (AI studio clip) behind the detail hero.
    heroVideo: 'flagstaff-rotate.mp4',
    heroPoster: 'flagstaff-rotate-poster.jpg',
    day: 'Room for the whole family on the long trip: two slides, a dedicated bunk room, and space to spread out.',
    summary:
      'Room for the whole family on the long trip. This is our 2023 Forest River Flagstaff Super Lite 27BHWS, with two slides that open it right up, a dedicated bunk room for the kids, a private front bedroom, and space for everyone to spread out. We can have it set up and ready so you just unpack and start the trip.',
    chips: ['sleeps 7', '2 slides', 'bunk room', '32 ft'],
    specs: { Make: 'Forest River Flagstaff Super Lite', Model: '27BHWS', Year: '2023', Length: '32 ft 10 in', Sleeps: '7', Slides: '2', 'Dry weight': '7,310 lbs' },
    features: [
      'Two slide-outs that open up the living space',
      'Dedicated rear bunk room for the kids',
      'Private front bedroom with a queen bed',
      'Theater-style reclining sofa',
      'U-shaped dinette for meals and games',
      'Full kitchen with a stainless refrigerator, gas range, and microwave',
      'Electric fireplace and TV entertainment center',
      'Two entry doors',
      'Power awning',
    ],
    included:
      'We can have it set up and ready at your site so you just unpack and start the trip. It comes clean, with the systems checked.',
    walkthrough:
      'We meet you to hand it over, walk you through the trailer, the hookups, and how everything works, and we are a call away for the rest of the trip.',
    requirements: [],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area. Ask us about delivery and setup at your campsite.',
    floorplan: 'flagstaff-floorplan.jpg', // 27BHWS floor plan
    images: [
      'flagstaff-01.jpg', 'flagstaff-02.jpg', 'flagstaff-03.jpg', 'flagstaff-04.jpg',
      'flagstaff-05.jpg', 'flagstaff-06.jpg', 'flagstaff-07.jpg',
    ],
    venues: [
      { name: 'RVshare', url: null },   // TODO Carlos: RVshare listing URL
      { name: 'Direct', url: '#contact' },
    ],
  },
  {
    // The two jet skis share one page. They are the same Sea-Doo GTI SE hull, so
    // the specs are shared; only power and top speed differ, carried per model.
    id: 'jet-skis',
    name: 'Jet Skis',
    category: 'jetski',
    typeLabel: 'Personal watercraft',
    yearMakeModel: '2022 Sea-Doo GTI SE',
    tagline: 'On the water in minutes.',
    day: 'On the water in minutes. Two easy-riding Sea-Doos, ready at the ramp for the part of the day that needs a little speed.',
    summary:
      'Two 2022 Sea-Doo GTI SE personal watercraft, a yellow 170 and an orange 130. Stable, easy to ride, and ready at the ramp for the part of the day that needs a little speed.',
    chips: ['Two to ride', '3 seats each', 'Brake and reverse'],
    heroVideo: '/jetski-rotate.mp4',
    heroPoster: '/jetski-rotate-poster.jpg',
    // Real ride clip (user-played, not the abstract rotating hero).
    clipVideo: '/jetski-ride.mp4',
    clipPoster: '/jetski-ride-poster.jpg',
    clipTitle: 'Out on the bay',
    // Per-model cards (the "two to choose from" block + the fleet pictures).
    models: [
      {
        name: 'GTI SE 170',
        color: 'Yellow',
        image: '170.jpg',
        power: '170 hp',
        topSpeed: '55 mph',
        blurb: 'The quicker of the two, with a Bluetooth sound system and the debris-free pump. The same easy, stable ride with a little more pull when you want it.',
      },
      {
        name: 'GTI SE 130',
        color: 'Orange',
        image: '130.jpg',
        power: '130 hp',
        topSpeed: '52 mph',
        blurb: 'Smooth and friendly, a great first ride, with a Bluetooth sound system and plenty of go for cruising the bay.',
      },
    ],
    specs: {
      Make: 'Sea-Doo',
      Model: 'GTI SE 170 and GTI SE 130',
      Year: '2022',
      Engine: 'Rotax 1630 ACE, 1630 cc',
      'Top speed': '52 to 55 mph',
      Seating: '3 riders each',
      'Sound system': 'Bluetooth audio',
      Length: '10 ft 11 in',
      Width: '49 in',
      Fuel: '15.9 gallon tank',
      Storage: '40.3 gallon',
      'Dry weight': '739 lb',
    },
    features: [
      'Brake and reverse for easy docking',
      'Bluetooth sound system',
      'Variable trim and a speed limiter mode',
      'Stable, beginner-friendly hull',
      'Seats three',
      'Boarding step and reboarding ladder',
      'Watertight storage for phone and keys',
      'Tow hook for tubing',
    ],
    included: 'Booked direct with us. Life jackets included, and we get you set up at the ramp.',
    requirements: [
      'A valid government photo ID.',
      'A Florida boater safety education card if you were born on or after January 1, 1988.',
      'The right age to operate. Tell us your group and we will confirm what you need.',
    ],
    pricing: null,
    operatingArea: 'Sarasota, Florida and the surrounding area.',
    images: [
      'seadoo-02.jpg',
      'seadoo-03.jpg',
      'seadoo-04.jpg',
      'seadoo-05.jpg',
      'seadoo-06.jpg',
      'seadoo-07.jpg',
    ],
    venues: [{ name: 'Direct', url: '#contact' }],
  },
];

export const getUnit = (id) => units.find((u) => u.id === id);
export const unitsByCategory = (key) => units.filter((u) => u.category === key);
