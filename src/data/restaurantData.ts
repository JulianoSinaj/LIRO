/**
 * ============================================================================
 *  TAVERNA LI-RO — TË DHËNAT E RESTORANTIT / RESTAURANT DATA
 * ============================================================================
 *  Ky është i vetmi skedar që duhet ndryshuar për të përditësuar përmbajtjen e
 *  faqes: tekstet, menunë, çmimet, oraret, kontaktet dhe fotot.
 *
 *  • Çdo tekst ka dy versione: `sq` (Shqip) dhe `en` (English).
 *  • Në tituj, fjalët mes *yjeve* shfaqen me italic në ngjyrë ari,
 *    p.sh. "Një Përvojë *Fine Dining* në Zemër të Natyrës".
 *  • Vlerat e shënuara me  // TODO  janë placeholder dhe duhen zëvendësuar
 *    me të dhënat reale.
 * ============================================================================
 */

export type Lang = "sq" | "en";
export type Localized = Record<Lang, string>;

export const defaultLang: Lang = "sq";

export const languages: { code: Lang; label: string }[] = [
  { code: "sq", label: "SQ" },
  { code: "en", label: "EN" },
];

/* -------------------------------------------------------------------------- */
/*  1. INFORMACIONI BAZË & KONTAKTI                                           */
/* -------------------------------------------------------------------------- */

export const restaurant = {
  name: "Taverna Li-Ro",
  location: "Panaja • Vlorë",
  address: {
    sq: "Panaja, Vlorë, Shqipëri", // TODO: adresa e saktë (rruga, nr.)
    en: "Panaja, Vlorë, Albania",
  } satisfies Localized,
  contact: {
    // TODO: Vendos numrin real të telefonit.
    phoneDisplay: "+355 69 XX XX XXX",
    // TODO: Numri në formatin ndërkombëtar, pa hapësira (p.sh. +355691234567).
    phoneHref: "tel:+35569XXXXXXX",
    // TODO: Numri i WhatsApp vetëm me shifra, pa "+" (p.sh. 355691234567).
    whatsappNumber: "35569XXXXXXX",
  },
  social: {
    instagramHandle: "@taverna_li_ro",
    instagramUrl: "https://www.instagram.com/taverna_li_ro/",
    facebookUrl: "", // TODO (opsionale): lidhja e faqes në Facebook — shfaqet vetëm nëse plotësohet
    tripadvisorUrl: "", // TODO (opsionale)
  },
  map: {
    // Lidhja që hap Google Maps (kërkim sipas emrit dhe vendndodhjes).
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taverna+Li-Ro+Panaja+Vlor%C3%AB",
    // TODO (opsionale): Google Maps → Share → Embed a map → kopjo vetëm vlerën e `src`.
    // Kur plotësohet, harta shfaqet automatikisht në footer.
    embedUrl: "",
  },
};

/* -------------------------------------------------------------------------- */
/*  2. ORARI I PUNËS                                                          */
/* -------------------------------------------------------------------------- */

export const openingHours: { days: Localized; time: string }[] = [
  // TODO: Përditëso oraret reale. Mund të shtosh më shumë rreshta.
  { days: { sq: "E Hënë – E Diel", en: "Monday – Sunday" }, time: "12:00 – 23:30" },
];

/* -------------------------------------------------------------------------- */
/*  3. FOTOT                                                                   */
/* -------------------------------------------------------------------------- */
/*  Fotot janë placeholder nga Unsplash. Për të vendosur fotot reale:
 *    1. Kopjo fotot në dosjen  /public/images/  (p.sh. /public/images/hero.jpg)
 *    2. Ndrysho `src` këtu në  "/images/hero.jpg"
 */

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

type Photo = { src: string; alt: Localized };

export const images = {
  hero: {
    src: unsplash("1594041680534-e8c8cdebd659", 2400),
    alt: {
      sq: "Biftek i pjekur në zgarë me patate me rozmarinë, në tigan gize",
      en: "Grilled steak with rosemary potatoes in a cast-iron pan",
    },
  },
  story: {
    src: unsplash("1578474846511-04ba529f0b88"),
    alt: {
      sq: "Salla e darkës me drita të ngrohta muri",
      en: "The dining room in warm wall-lamp light",
    },
  },
  privateDining: {
    src: unsplash("1543826173-70651703c5a4", 1200),
    alt: {
      sq: "Pjatë fine dining e servirur me salcë të artë",
      en: "A fine-dining plate finished with a golden sauce",
    },
  },
  reservation: {
    src: unsplash("1579027989536-b7b1f875659b", 2000),
    alt: { sq: "", en: "" }, // dekorative
  },
} satisfies Record<string, Photo>;

export const gallery: (Photo & { caption: Localized })[] = [
  {
    src: unsplash("1572116469696-31de0f17cc34"),
    alt: { sq: "Banaku i barit nën drita të ngrohta", en: "The bar under warm Edison lights" },
    caption: { sq: "Mbrëmjet në Li-Ro", en: "Evenings at Li-Ro" },
  },
  {
    src: unsplash("1553361371-9b22f78e8b1d", 1000),
    alt: { sq: "Verë e kuqe duke u hedhur në gotë", en: "Red wine being poured into a glass" },
    caption: { sq: "Kantina jonë", en: "Our cellar" },
  },
  {
    src: unsplash("1600565193348-f74bd3c7ccdf", 1000),
    alt: { sq: "Shefi duke gatuar me flakë në kuzhinë", en: "The chef cooking over open flame" },
    caption: { sq: "Pas skenës", en: "Behind the pass" },
  },
  {
    src: unsplash("1558030006-450675393462", 1000),
    alt: { sq: "Biftek i prerë mbi dërrasë druri", en: "Sliced steak on a wooden board" },
    caption: { sq: "Nga zgara", en: "From the grill" },
  },
  {
    src: unsplash("1568213816046-0ee1c42bd559"),
    alt: { sq: "Katër gota vere mbi një fuçi druri", en: "Four wine glasses on an oak barrel" },
    caption: { sq: "Degustim verërash", en: "Wine tasting" },
  },
  {
    src: unsplash("1560053608-13721e0d69e8"),
    alt: {
      sq: "Salla elegante e restorantit me tavolina të shtruara",
      en: "The elegant dining room with set tables",
    },
    caption: { sq: "Salla e darkës", en: "The dining room" },
  },
];

/* -------------------------------------------------------------------------- */
/*  4. MENUJA                                                                  */
/* -------------------------------------------------------------------------- */
/*  Çmimet janë në Lekë (numër i plotë). Faqja i shfaq si "1200L".
 *  `tag` është opsional — përdoret për të theksuar një pjatë.                 */

export type MenuItem = {
  name: Localized;
  description?: Localized;
  price: number;
  tag?: Localized;
};

export type MenuCategory = {
  id: string;
  label: Localized;
  items: MenuItem[];
};

const houseSpecial: Localized = { sq: "Specialitet", en: "House special" };
const forTwo: Localized = { sq: "Për dy", en: "For two" };

export const currencySuffix = "L";

export const menu: MenuCategory[] = [
  {
    id: "antipasta",
    label: { sq: "Antipasta", en: "Starters" },
    items: [
      {
        name: { sq: "Bukë shtëpie me vaj ulliri", en: "Homemade bread with olive oil" },
        description: {
          sq: "E pjekur çdo ditë, me ullinj vendas",
          en: "Baked daily, served with local olives",
        },
        price: 300,
      },
      {
        name: { sq: "Djathë i bardhë me ullinj", en: "White cheese with olives" },
        description: {
          sq: "Djathë dele, ullinj dhe vaj ulliri ekstra i virgjër",
          en: "Sheep's cheese, olives and extra virgin olive oil",
        },
        price: 500,
      },
      {
        name: { sq: "Fërgesë", en: "Fërgesë" },
        description: {
          sq: "Speca, domate dhe gjizë, në tavë balte",
          en: "Peppers, tomatoes and curd cheese in a clay pot",
        },
        price: 600,
        tag: houseSpecial,
      },
      {
        name: { sq: "Speca të mbushur me gjizë", en: "Peppers stuffed with curd cheese" },
        description: {
          sq: "Speca të pjekur, gjizë e freskët dhe barishte",
          en: "Roasted peppers, fresh curd cheese and herbs",
        },
        price: 450,
      },
      {
        name: { sq: "Kungulleshka me salcë kosi", en: "Fried courgettes with yoghurt dip" },
        description: {
          sq: "Të skuqura, krokante, me hudhër",
          en: "Crispy fried, with garlic yoghurt",
        },
        price: 400,
      },
      {
        name: { sq: "Pjatë tradicionale", en: "Traditional platter" },
        description: {
          sq: "Proshutë, djathëra vendase, fiq, arra dhe bukë e pjekur",
          en: "Cured ham, local cheeses, figs, walnuts and toasted bread",
        },
        price: 1200,
        tag: forTwo,
      },
    ],
  },
  {
    id: "sallata",
    label: { sq: "Sallata", en: "Salads" },
    items: [
      {
        name: { sq: "Sallatë fshati", en: "Village salad" },
        description: {
          sq: "Domate, kastravec, qepë, ullinj dhe djathë i bardhë",
          en: "Tomato, cucumber, onion, olives and white cheese",
        },
        price: 450,
      },
      {
        name: { sq: "Sallatë jeshile", en: "Green salad" },
        description: {
          sq: "Marule, rukola, qepë e njomë dhe salcë limoni",
          en: "Lettuce, rocket, spring onion and lemon dressing",
        },
        price: 350,
      },
      {
        name: { sq: "Sallatë Li-Ro", en: "Li-Ro salad" },
        description: {
          sq: "Rukola, domate qershi, parmixhano, arra dhe balsamik",
          en: "Rocket, cherry tomatoes, parmesan, walnuts and balsamic",
        },
        price: 600,
        tag: houseSpecial,
      },
      {
        name: { sq: "Sallatë me ton", en: "Tuna salad" },
        description: {
          sq: "Ton, misër, ullinj, vezë dhe perime të freskëta",
          en: "Tuna, sweetcorn, olives, egg and fresh vegetables",
        },
        price: 550,
      },
      {
        name: { sq: "Sallatë Cezar me pulë", en: "Chicken Caesar salad" },
        description: {
          sq: "Pulë në zgarë, krutona, parmixhano dhe salcë Cezar",
          en: "Grilled chicken, croutons, parmesan and Caesar dressing",
        },
        price: 700,
      },
    ],
  },
  {
    id: "mish",
    label: { sq: "Mish & Zgarë", en: "Meat & Grill" },
    items: [
      {
        name: { sq: "Biftek viçi", en: "Beef steak" },
        description: {
          sq: "300g, me patate të pjekura dhe perime në zgarë",
          en: "300g, with roast potatoes and grilled vegetables",
        },
        price: 1800,
        tag: houseSpecial,
      },
      {
        name: { sq: "Brinjë qengji në zgarë", en: "Grilled lamb chops" },
        description: {
          sq: "Me barishte mesdhetare dhe hudhër",
          en: "With Mediterranean herbs and garlic",
        },
        price: 1500,
      },
      {
        name: { sq: "Tavë kosi", en: "Tavë kosi" },
        description: {
          sq: "Mish qengji i pjekur në furrë me kos dhe vezë",
          en: "Oven-baked lamb with yoghurt and egg",
        },
        price: 1000,
      },
      {
        name: { sq: "Qofte në zgarë", en: "Grilled qofte" },
        description: {
          sq: "Qofte shtëpie me salcë kosi dhe sallatë",
          en: "House meatballs with yoghurt sauce and salad",
        },
        price: 700,
      },
      {
        name: { sq: "Fileto pule në zgarë", en: "Grilled chicken fillet" },
        description: {
          sq: "Me pure patatesh dhe salcë kërpudhash",
          en: "With mashed potatoes and mushroom sauce",
        },
        price: 800,
      },
      {
        name: { sq: "Mish i përzier në zgarë", en: "Mixed grill" },
        description: {
          sq: "Biftek, qofte, salsiçe, krahë pule dhe garniturë",
          en: "Steak, qofte, sausage, chicken wings and sides",
        },
        price: 3200,
        tag: forTwo,
      },
    ],
  },
  {
    id: "peshk",
    label: { sq: "Peshk & Deti", en: "Fish & Seafood" },
    items: [
      {
        name: { sq: "Levrek në zgarë", en: "Grilled sea bass" },
        description: {
          sq: "Me vaj ulliri, limon dhe perime të ziera",
          en: "With olive oil, lemon and steamed greens",
        },
        price: 1600,
      },
      {
        name: { sq: "Koc në zgarë", en: "Grilled sea bream" },
        description: {
          sq: "Peshk i ditës, i përgatitur thjesht",
          en: "Catch of the day, simply prepared",
        },
        price: 1600,
      },
      {
        name: { sq: "Karkaleca me hudhër", en: "Garlic prawns" },
        description: {
          sq: "Në tigan, me hudhër, djegës dhe verë të bardhë",
          en: "Pan-fried with garlic, chilli and white wine",
        },
        price: 1400,
        tag: houseSpecial,
      },
      {
        name: { sq: "Kallamar i skuqur", en: "Fried calamari" },
        description: { sq: "Me salcë tartare dhe limon", en: "With tartare sauce and lemon" },
        price: 1100,
      },
      {
        name: { sq: "Midhje me verë të bardhë", en: "Mussels in white wine" },
        description: {
          sq: "Me hudhër, majdanoz dhe bukë të pjekur",
          en: "With garlic, parsley and toasted bread",
        },
        price: 900,
      },
      {
        name: { sq: "Rizoto me fruta deti", en: "Seafood risotto" },
        description: { sq: "Karkaleca, midhje dhe kallamar", en: "Prawns, mussels and calamari" },
        price: 1300,
      },
    ],
  },
  {
    id: "embelsira",
    label: { sq: "Ëmbëlsira", en: "Desserts" },
    items: [
      {
        name: { sq: "Ëmbëlsira e shefit", en: "Chef's dessert" },
        description: {
          sq: "Akullore vanilje, krokante e artë dhe karamel i ngrohtë",
          en: "Vanilla ice cream, golden crisp and warm caramel",
        },
        price: 600,
        tag: houseSpecial,
      },
      {
        name: { sq: "Trileçe shtëpie", en: "Homemade trileçe" },
        description: {
          sq: "Pandispanjë me tre lloje qumështi dhe karamel",
          en: "Sponge soaked in three milks, topped with caramel",
        },
        price: 450,
      },
      {
        name: { sq: "Bakllava", en: "Baklava" },
        description: { sq: "Me arra dhe shurup mjalti", en: "With walnuts and honey syrup" },
        price: 400,
      },
      {
        name: { sq: "Tiramisu", en: "Tiramisu" },
        description: {
          sq: "Mascarpone, kafe ekspres dhe kakao",
          en: "Mascarpone, espresso and cocoa",
        },
        price: 500,
      },
      {
        name: { sq: "Panna cotta me fruta pylli", en: "Panna cotta with forest berries" },
        description: {
          sq: "Krem vanilje me salcë frutash",
          en: "Vanilla cream with a berry coulis",
        },
        price: 450,
      },
    ],
  },
  {
    id: "vera",
    label: { sq: "Verëra", en: "Wines" },
    items: [
      {
        name: { sq: "Verë shtëpie — 1 litër", en: "House wine — 1 litre" },
        description: {
          sq: "E kuqe ose e bardhë, prodhim vendas",
          en: "Red or white, locally produced",
        },
        price: 1200,
        tag: houseSpecial,
      },
      {
        name: { sq: "Shesh i Zi — gotë", en: "Shesh i Zi — glass" },
        description: { sq: "E kuqe e thatë shqiptare", en: "Dry Albanian red" },
        price: 400,
      },
      {
        name: { sq: "Shesh i Bardhë — gotë", en: "Shesh i Bardhë — glass" },
        description: { sq: "E bardhë e freskët shqiptare", en: "Crisp Albanian white" },
        price: 400,
      },
      {
        name: { sq: "Kallmet — shishe", en: "Kallmet — bottle" },
        description: { sq: "E kuqe e plotë, 750ml", en: "Full-bodied red, 750ml" },
        price: 2800,
      },
      {
        name: { sq: "Pulës — shishe", en: "Pulës — bottle" },
        description: { sq: "E bardhë aromatike, 750ml", en: "Aromatic white, 750ml" },
        price: 2500,
      },
      {
        name: { sq: "Prosecco — gotë", en: "Prosecco — glass" },
        description: { sq: "Verë e gazuar italiane", en: "Italian sparkling wine" },
        price: 500,
      },
    ],
  },
];

/* Kartat "Signature Menu". `categoryId` lidh kartën me kategorinë e menusë që
 * hapet kur klikohet shigjeta. */
export const signatureDishes: {
  id: string;
  categoryId: string;
  image: Photo;
  label: Localized;
  name: Localized;
  description: Localized;
}[] = [
  {
    id: "mish-premium",
    categoryId: "mish",
    image: {
      src: unsplash("1529692236671-f1f6cf9683ba", 900),
      alt: { sq: "Biftek viçi i prerë me pirun", en: "Sliced beef steak with a fork" },
    },
    label: { sq: "Nga zgara", en: "From the grill" },
    name: { sq: "Mish Premium", en: "Premium Meat" },
    description: {
      sq: "Prerje të zgjedhura viçi, të pjekura në zgarë në pikën e duhur, me kripë deti dhe barishte.",
      en: "Hand-selected beef cuts, grilled to just the right point, finished with sea salt and herbs.",
    },
  },
  {
    id: "peshk-i-eger",
    categoryId: "peshk",
    image: {
      src: unsplash("1611171711912-e3f6b536f532", 900),
      alt: { sq: "Peshk i plotë në zgarë me limon", en: "Whole grilled fish with lemon" },
    },
    label: { sq: "Nga deti", en: "From the sea" },
    name: { sq: "Peshk i Egër", en: "Wild Fish" },
    description: {
      sq: "Peshku i ditës nga bregu i Vlorës, i pjekur thjesht me vaj ulliri dhe limon.",
      en: "The day's catch from the Vlorë coast, simply grilled with olive oil and lemon.",
    },
  },
  {
    id: "antipaste",
    categoryId: "antipasta",
    image: {
      src: unsplash("1452195100486-9cc805987862", 900),
      alt: { sq: "Djathë, fiq dhe arra mbi dërrasë", en: "Cheese, figs and walnuts on a board" },
    },
    label: { sq: "Për të ndarë", en: "To share" },
    name: { sq: "Antipastë Tradicionale", en: "Traditional Antipasti" },
    description: {
      sq: "Djathëra vendase, fiq, arra dhe ullinj — fillimi i përsosur i darkës.",
      en: "Local cheeses, figs, walnuts and olives — the perfect start to dinner.",
    },
  },
  {
    id: "embelsire",
    categoryId: "embelsira",
    image: {
      src: unsplash("1551024506-0bccd828d307", 900),
      alt: {
        sq: "Karamel i ngrohtë mbi akullore vanilje",
        en: "Warm caramel poured over vanilla ice cream",
      },
    },
    label: { sq: "Fundi i ëmbël", en: "The sweet finale" },
    name: { sq: "Ëmbëlsirë Artizanale", en: "Artisanal Dessert" },
    description: {
      sq: "Akullore vanilje e bërë në shtëpi, krokante e artë dhe karamel i ngrohtë.",
      en: "House-made vanilla ice cream, a golden crisp and warm caramel.",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  5. REZERVIMET                                                              */
/* -------------------------------------------------------------------------- */

export const reservationSettings = {
  firstSlot: "12:00", // ora e parë që mund të rezervohet
  lastSlot: "22:30", // ora e fundit që mund të rezervohet
  intervalMinutes: 30,
  maxGuests: 20,
};

/* Emrat e ditëve/muajve për datën në konfirmim (shfletuesit nuk e formatojnë
 * gjithmonë saktë datën në shqip, prandaj i mbajmë këtu). */
export const dateNames: Record<Lang, { weekdays: string[]; months: string[] }> = {
  sq: {
    weekdays: ["E diel", "E hënë", "E martë", "E mërkurë", "E enjte", "E premte", "E shtunë"],
    months: [
      "janar",
      "shkurt",
      "mars",
      "prill",
      "maj",
      "qershor",
      "korrik",
      "gusht",
      "shtator",
      "tetor",
      "nëntor",
      "dhjetor",
    ],
  },
  en: {
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

export const seatingOptions: { id: "indoor" | "garden"; label: Localized; hint: Localized }[] = [
  {
    id: "indoor",
    label: { sq: "Ambient i Brendshëm", en: "Indoor Dining Room" },
    hint: { sq: "Tulla, dru & dritë e ngrohtë", en: "Brick, wood & warm light" },
  },
  {
    id: "garden",
    label: { sq: "Kopshti me Ullinj", en: "Olive Garden" },
    hint: { sq: "Nën qiell të hapur", en: "Under the open sky" },
  },
];

/* -------------------------------------------------------------------------- */
/*  6. TEKSTET E FAQES                                                         */
/* -------------------------------------------------------------------------- */

export const navLinks: { id: string; label: Localized }[] = [
  { id: "top", label: { sq: "Kreu", en: "Home" } },
  { id: "menu", label: { sq: "Menuja", en: "Menu" } },
  { id: "story", label: { sq: "Historia Jonë", en: "Our Story" } },
  { id: "gallery", label: { sq: "Galeria", en: "Gallery" } },
  { id: "contact", label: { sq: "Kontakti", en: "Contact" } },
];

export type FeatureIcon = "chef" | "wine" | "leaf" | "flame";

export const content = {
  nav: {
    cta: { sq: "Rezervo Tavolinë", en: "Book a Table" },
    openMenu: { sq: "Hap menunë", en: "Open menu" },
    closeMenu: { sq: "Mbyll menunë", en: "Close menu" },
    language: { sq: "Gjuha", en: "Language" },
    home: { sq: "Kreu", en: "Home" },
  },

  hero: {
    eyebrow: { sq: "Kuzhinë Bashkëkohore & Traditë", en: "Contemporary Cuisine & Tradition" },
    title: {
      sq: "Një Përvojë *Fine Dining* në Zemër të Natyrës",
      en: "A *Fine Dining* Experience in the Heart of Nature",
    },
    subtitle: {
      sq: "Mish premium në zgarë, peshku i freskët i ditës dhe verëra të përzgjedhura — mes mureve me tulla, drurit natyral dhe kopshtit me ullinj në Panaja.",
      en: "Premium grilled meats, the day's fresh catch and hand-picked wines — among red-brick walls, natural wood and an olive garden in Panaja.",
    },
    primaryCta: { sq: "Rezervo Tavolinë", en: "Book a Table" },
    secondaryCta: { sq: "Zbulo Historinë", en: "Discover Our Story" },
    scroll: { sq: "Zbulo", en: "Scroll" },
    // TODO: Përdorni vetëm shifra të vërteta (p.sh. vlerësimi real nga Google).
    stats: [
      { value: "100%", label: { sq: "Produkte të Freskëta", en: "Fresh Produce" } },
      { value: "Premium", label: { sq: "Mish & Zgarë", en: "Meat & Grill" } },
      { value: "4.9", star: true, label: { sq: "Vlerësim nga Miqtë", en: "Guest Rating" } },
    ] as { value: string; star?: boolean; label: Localized }[],
  },

  features: [
    {
      icon: "chef",
      title: { sq: "Kuzhinë Artizanale", en: "Chef-Crafted Cuisine" },
      text: { sq: "Çdo pjatë përgatitet me dorë", en: "Every plate made by hand" },
    },
    {
      icon: "wine",
      title: { sq: "Koleksion Verërash", en: "Curated Wine Collection" },
      text: { sq: "Etiketa vendase & të huaja", en: "Local & international labels" },
    },
    {
      icon: "leaf",
      title: { sq: "Përbërës të Përzgjedhur", en: "Premium Local Ingredients" },
      text: { sq: "Produkte të freskëta të stinës", en: "Fresh, seasonal produce" },
    },
    {
      icon: "flame",
      title: { sq: "Ambient i Ngrohtë", en: "Intimate Ambiance" },
      text: { sq: "Tulla, dru & dritë e butë", en: "Brick, wood & soft light" },
    },
  ] as { icon: FeatureIcon; title: Localized; text: Localized }[],

  story: {
    eyebrow: { sq: "Historia Jonë", en: "Our Story" },
    title: {
      sq: "Tradita e Tullës dhe Drurit në Harmoni me *Elegancën*",
      en: "The Tradition of Brick and Wood in Harmony with *Elegance*",
    },
    paragraphs: [
      {
        sq: "Taverna Li-Ro lindi nga dëshira për t'i dhënë Panajës një vend ku tradita shqiptare e tryezës takon elegancën e kuzhinës bashkëkohore. Muret me tulla të kuqe, ndriçimi i ngrohtë dhe detajet prej druri natyral krijojnë një atmosferë intime, ku çdo darkë ndihet si një festë.",
        en: "Taverna Li-Ro was born from a wish to give Panaja a place where the Albanian tradition of the table meets the refinement of contemporary cuisine. Red-brick walls, warm lighting and natural wood create an intimate atmosphere where every dinner feels like a celebration.",
      },
      {
        sq: "Jashtë, kopshti me ullinj ju fton për darka nën qiell të hapur gjatë netëve të ngrohta të Vlorës. Brenda apo jashtë, mikpritja jonë mbetet e njëjtë: e sinqertë, e vëmendshme dhe gjithmonë me buzëqeshje.",
        en: "Outside, our olive garden invites you to dine under the open sky on warm Vlorë evenings. Indoors or out, our hospitality stays the same: sincere, attentive and always with a smile.",
      },
    ],
    cta: { sq: "Zbulo Më Shumë", en: "Discover More" },
    // TODO: Emri i shefit / themeluesit (shfaqet si firmë kaligrafike).
    signature: "Li-Ro",
    signatureRole: { sq: "Themeluesit · Taverna Li-Ro", en: "The Founders · Taverna Li-Ro" },
    imageBadge: { sq: "Tulla · Dru · Ullinj", en: "Brick · Wood · Olives" },
    video: {
      // TODO: Lidhja "embed" e videos (p.sh. https://www.youtube.com/embed/XXXXXXXX).
      // Kur plotësohet, butoni Play e luan videon në faqe.
      url: "",
      play: { sq: "Shiko turin virtual", en: "Watch the virtual tour" },
      title: { sq: "Turi virtual i Taverna Li-Ro", en: "Taverna Li-Ro virtual tour" },
      comingSoonTitle: { sq: "Turi virtual vjen *së shpejti*", en: "Virtual tour *coming soon*" },
      comingSoonText: {
        sq: "Po përgatisim një video të ambientit tonë. Ndërkohë, shihni momentet e fundit në Instagram.",
        en: "We're preparing a film of our space. In the meantime, see our latest moments on Instagram.",
      },
      instagramCta: { sq: "Shiko në Instagram", en: "See on Instagram" },
      close: { sq: "Mbyll", en: "Close" },
    },
  },

  signatureMenu: {
    eyebrow: { sq: "Signature Menu", en: "Signature Menu" },
    title: {
      sq: "Një Përvojë *Kulinare* Përtej të Zakonshmes",
      en: "A *Culinary* Experience Beyond the Ordinary",
    },
    subtitle: {
      sq: "Katër pjata që tregojnë kush jemi — nga zgara, nga deti dhe nga tradita.",
      en: "Four dishes that tell you who we are — from the grill, the sea and tradition.",
    },
    viewInMenu: { sq: "Shiko në menu", en: "View in menu" },
  },

  menu: {
    eyebrow: { sq: "Menuja e Plotë", en: "The Full Menu" },
    title: { sq: "Nga Zgara te *Kantina*", en: "From the Grill to the *Cellar*" },
    subtitle: {
      sq: "Pjata të gatuara me produkte të freskëta të stinës.",
      en: "Dishes prepared with fresh, seasonal produce.",
    },
    categoriesLabel: { sq: "Kategoritë e menusë", en: "Menu categories" },
    note: {
      sq: "Çmimet janë në Lekë (ALL). Për alergjenë, ju lutemi pyesni stafin tonë.",
      en: "Prices are in Albanian Lek (ALL). Please ask our staff about allergens.",
    },
  },

  privateDining: {
    eyebrow: { sq: "Darka Private", en: "Private Dining" },
    title: { sq: "Darka *Ekskluzive* e Shefit", en: "The Chef's *Exclusive* Dinner" },
    text: {
      sq: "Një menu degustimi e krijuar posaçërisht për tavolinën tuaj — për përvjetorë, festime familjare apo darka biznesi. Shefi ju shoqëron pjatë pas pjate, me verëra të çiftuara me kujdes.",
      en: "A tasting menu created just for your table — for anniversaries, family celebrations or business dinners. The chef guides you course by course, with carefully paired wines.",
    },
    highlights: [
      { sq: "Menu degustimi sipas stinës", en: "Seasonal tasting menu" },
      { sq: "Çiftim me verëra", en: "Wine pairing" },
      { sq: "Evente private & festime", en: "Private events & celebrations" },
    ],
    cta: { sq: "Rezervo Tani", en: "Reserve Now" },
  },

  gallery: {
    eyebrow: { sq: "Galeria", en: "Gallery" },
    title: { sq: "Atmosfera e *Li-Ro*", en: "The *Li-Ro* Atmosphere" },
    subtitle: {
      sq: "Një vështrim te pjatat, ambienti dhe mbrëmjet tona.",
      en: "A glimpse of our dishes, our space and our evenings.",
    },
    instagramCta: { sq: "Na ndiqni në Instagram", en: "Follow us on Instagram" },
  },

  reservation: {
    eyebrow: { sq: "Rezervimi", en: "Reservations" },
    title: { sq: "Rezervoni *Tavolinën* Tuaj", en: "Reserve Your *Table*" },
    subtitle: {
      sq: "Plotësoni formularin dhe dërgojani kërkesën me një mesazh në WhatsApp ose me një telefonatë. Ne ju konfirmojmë sa më shpejt.",
      en: "Fill in the form, then send us your request via WhatsApp or a quick call. We'll confirm as soon as possible.",
    },
    groupsNote: {
      sq: "Për grupe mbi 10 persona, darka private ose evente, na telefononi direkt.",
      en: "For groups of more than 10, private dinners or events, please call us directly.",
    },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    phoneLabel: { sq: "Telefon", en: "Phone" },
    whatsappLabel: { sq: "WhatsApp", en: "WhatsApp" },
    whatsappText: { sq: "Shkruani në WhatsApp", en: "Message us on WhatsApp" },
    fields: {
      name: { sq: "Emri i plotë", en: "Full name" },
      namePlaceholder: { sq: "p.sh. Arben Hoxha", en: "e.g. Jane Smith" },
      phone: { sq: "Telefoni", en: "Phone" },
      phonePlaceholder: { sq: "+355 6X XXX XXXX", en: "+355 6X XXX XXXX" },
      date: { sq: "Data", en: "Date" },
      time: { sq: "Ora", en: "Time" },
      timePlaceholder: { sq: "Zgjidh orën", en: "Select a time" },
      guests: { sq: "Persona", en: "Guests" },
      seating: { sq: "Preferenca", en: "Seating preference" },
      seatingSummary: { sq: "Preferenca", en: "Seating" },
      noPreference: { sq: "Pa preferencë", en: "No preference" },
      notes: { sq: "Shënime", en: "Notes" },
      notesPlaceholder: {
        sq: "p.sh. ditëlindje, karrige për fëmijë, alergji…",
        en: "e.g. birthday, high chair, allergies…",
      },
      optional: { sq: "opsionale", en: "optional" },
    },
    guestUnit: {
      one: { sq: "person", en: "guest" },
      many: { sq: "persona", en: "guests" },
    },
    decreaseGuests: { sq: "Pakëso numrin e personave", en: "Decrease number of guests" },
    increaseGuests: { sq: "Shto numrin e personave", en: "Increase number of guests" },
    submit: { sq: "Konfirmo Rezervimin", en: "Confirm Reservation" },
    submitHint: {
      sq: "Në hapin tjetër mund ta dërgoni kërkesën direkt në WhatsApp ose të na telefononi.",
      en: "In the next step you can send the request straight to WhatsApp or give us a call.",
    },
    errors: {
      required: { sq: "Kjo fushë është e detyrueshme", en: "This field is required" },
      phone: {
        sq: "Vendosni një numër telefoni të vlefshëm",
        en: "Please enter a valid phone number",
      },
      pastDate: {
        sq: "Zgjidhni datën e sotme ose një datë më vonë",
        en: "Please choose today or a later date",
      },
    },
    success: {
      title: { sq: "Faleminderit, *{name}*!", en: "Thank you, *{name}*!" },
      text: {
        sq: "Kërkesa juaj për rezervim është gati. Dërgojani në WhatsApp ose na telefononi që ta konfirmojmë tavolinën tuaj.",
        en: "Your reservation request is ready. Send it to us on WhatsApp or give us a call so we can confirm your table.",
      },
      summaryTitle: { sq: "Detajet e rezervimit", en: "Reservation details" },
      whatsapp: { sq: "Dërgo në WhatsApp", en: "Send via WhatsApp" },
      call: { sq: "Telefono tani", en: "Call now" },
      edit: { sq: "Ndrysho detajet", en: "Edit details" },
    },
    whatsappMessage: {
      greeting: {
        sq: "Përshëndetje Taverna Li-Ro! Dëshiroj të rezervoj një tavolinë:",
        en: "Hello Taverna Li-Ro! I would like to book a table:",
      },
      thanks: { sq: "Faleminderit!", en: "Thank you!" },
    },
  },

  footer: {
    tagline: {
      sq: "Fine dining & zgarë bashkëkohore, mes tullës, drurit dhe ullinjve të Panajës.",
      en: "Fine dining & contemporary grill among the brick, wood and olive trees of Panaja.",
    },
    addressLabel: { sq: "Adresa", en: "Address" },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    contactLabel: { sq: "Kontakt", en: "Contact" },
    openInMaps: { sq: "Hap në Google Maps", en: "Open in Google Maps" },
    mapTitle: { sq: "Harta e vendndodhjes", en: "Location map" },
    rights: { sq: "Të gjitha të drejtat e rezervuara.", en: "All rights reserved." },
    backToTop: { sq: "Kthehu lart", en: "Back to top" },
  },
};
