/**
 * ============================================================================
 *  TAVERNA LI-RO — TË DHËNAT E RESTORANTIT / RESTAURANT DATA
 * ============================================================================
 *  Ky është i vetmi skedar që duhet ndryshuar për të përditësuar përmbajtjen e
 *  faqes: tekstet, menunë, çmimet, oraret, kontaktet dhe fotot.
 *
 *  • Çdo tekst ka dy versione: `sq` (Shqip) dhe `en` (English).
 *  • Në tituj, fjalët mes *yjeve* shfaqen me italic dhe gradient ari,
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
    // Numri siç shfaqet në faqe.
    phoneDisplay: "+355 69 330 4188",
    // Numri në formatin ndërkombëtar, pa hapësira.
    phoneHref: "tel:+355693304188",
    // Numri i WhatsApp vetëm me shifra, pa "+".
    whatsappNumber: "355693304188",
  },
  social: {
    instagramHandle: "@taverna_li_ro",
    instagramUrl: "https://www.instagram.com/taverna_li_ro/",
    facebookUrl: "", // TODO (opsionale): lidhja e faqes në Facebook — shfaqet vetëm nëse plotësohet
    tripadvisorUrl: "", // TODO (opsionale)
  },
  map: {
    // Lidhja që hap vendndodhjen e Taverna Li-Ro në Google Maps.
    mapsUrl: "https://maps.app.goo.gl/dzVHXaA6e8D6cKor9",
    // Harta te seksioni "Vendndodhja" — e njëjta pikë (40.5514392, 19.4691347). Lëre bosh ("") për ta fshehur.
    embedUrl: "https://www.google.com/maps?q=40.5514392,19.4691347&z=17&hl=sq&output=embed",
    // Hap udhëzimet (navigimin) deri te restoranti.
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=40.5514392,19.4691347",
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
/*  Sipas menusë origjinale ("Taverna LIRO Menu Final.pdf").
 *  Çmimet janë në Lekë (numër i plotë). Faqja i shfaq si "1200L".
 *  Për dy çmime (p.sh. porcion i vogël / i madh) përdor `price: [300, 500]`.
 *  `description` dhe `tag` janë opsionale.                                    */

export type MenuItem = {
  name: Localized;
  description?: Localized;
  price: number | readonly number[];
  tag?: Localized;
};

export type MenuCategory = {
  id: string;
  label: Localized;
  items: MenuItem[];
};

export const currencySuffix = "L";

export const menu: MenuCategory[] = [
  {
    id: "antipasta",
    label: { sq: "Antipasta", en: "Starters" },
    items: [
      {
        name: { sq: "Byrek Saçi", en: "Spinach Pie" },
        price: 100,
      },
      {
        name: { sq: "Salcë Kosi", en: "Sour Cream" },
        price: 250,
      },
      {
        name: { sq: "Patate", en: "Fries" },
        price: 250,
      },
      {
        name: { sq: "Turshi", en: "Pickled Vegetables" },
        price: 300,
      },
      {
        name: { sq: "Lakra të egra", en: "Wild Cabbage" },
        price: 300,
      },
      {
        name: { sq: "Djathë i bardhë", en: "White Cheese" },
        price: 300,
      },
      {
        name: { sq: "Djathë kaçkavall", en: "Yellow Cheese" },
        price: 300,
      },
      {
        name: { sq: "Kërpudha", en: "Sautéed Mushrooms" },
        price: 400,
      },
    ],
  },
  {
    id: "sallata",
    label: { sq: "Sallata", en: "Salads" },
    items: [
      {
        name: { sq: "Sallatë Ulliri", en: "Olive Salad" },
        price: 250,
      },
      {
        name: { sq: "Sallatë Fshati", en: "Greek Salad" },
        price: 350,
      },
      {
        name: { sq: "Sallatë Jeshile", en: "Lettuce Salad" },
        description: { sq: "E vogël / e madhe", en: "Small / large" },
        price: [300, 500],
      },
      {
        name: { sq: "Sallatë Mikse", en: "Mixed Salad" },
        description: { sq: "E vogël / e madhe", en: "Small / large" },
        price: [300, 500],
      },
      {
        name: { sq: "Sallatë Taverne", en: "Tavern Salad" },
        description: { sq: "E vogël / e madhe", en: "Small / large" },
        price: [300, 500],
      },
      {
        name: { sq: "Sallatë Rukola", en: "Arugula Salad" },
        price: 500,
      },
    ],
  },
  {
    id: "kryesore",
    label: { sq: "Pjata Kryesore", en: "Main Courses" },
    items: [
      {
        name: { sq: "Paidhaqe gici", en: "Piglet ribs" },
        price: 1000,
      },
      {
        name: { sq: "Peshk", en: "Grilled orata fish" },
        price: 1000,
      },
      {
        name: { sq: "Ngjala", en: "Grilled eels" },
        price: 1300,
      },
      {
        name: { sq: "Paidhaqe Qengji", en: "Lamb ribs" },
        price: 1300,
      },
      {
        name: { sq: "Zog Fshati", en: "Village chicken" },
        price: 1200,
      },
      {
        name: { sq: "Fileto viçi", en: "Filet mignon" },
        price: 1500,
      },
      {
        name: {
          sq: "Zog në tavë saçi",
          en: "Chicken with rice or pasta (cooked in a traditional way)",
        },
        price: 1700,
      },
      {
        name: { sq: "Brinjë viçi në furrë", en: "Beef ribs" },
        price: 2500,
      },
      {
        name: { sq: "Fiorentina (1kg)", en: "Fiorentina (1kg)" },
        price: 4500,
      },
    ],
  },
  {
    id: "embelsira",
    label: { sq: "Embëlsira", en: "Desserts" },
    items: [
      {
        name: { sq: "Bakllava", en: "Bakllava" },
        price: 200,
      },
      {
        name: { sq: "Kadaif", en: "Kadaif" },
        price: 200,
      },
      {
        name: { sq: "Cheesecake", en: "Cheesecake" },
        price: 350,
      },
      {
        name: { sq: "Tiramisu", en: "Tiramisu" },
        price: 350,
      },
    ],
  },
  {
    id: "vera",
    label: { sq: "Verë", en: "Wine" },
    items: [
      {
        name: { sq: "Verë shtëpie – 1 gotë", en: "One glass of local wine" },
        price: 150,
      },
      {
        name: { sq: "Verë shtëpie – 250ml", en: "Local wine 250ml" },
        price: 250,
      },
      {
        name: { sq: "Verë shtëpie – 500ml", en: "Local wine 500ml" },
        price: 400,
      },
      {
        name: { sq: "Chianti 300ml", en: "Chianti 300ml" },
        price: 1500,
      },
      {
        name: { sq: "Chianti 750ml", en: "Chianti 750ml" },
        price: 2500,
      },
      {
        name: { sq: "Liro", en: "Liro" },
        price: 1500,
      },
      {
        name: { sq: "Persli", en: "Persli" },
        price: 1700,
      },
      {
        name: { sq: "Montepulciano", en: "Montepulciano" },
        price: 2000,
      },
      {
        name: { sq: "Pinot Grigio", en: "Pinot Grigio" },
        price: 2000,
      },
      {
        name: { sq: "Primitivo", en: "Primitivo" },
        price: 4500,
      },
      {
        name: { sq: "Amarone", en: "Amarone" },
        price: 6500,
      },
    ],
  },
  {
    id: "birra",
    label: { sq: "Birra", en: "Beer" },
    items: [
      {
        name: { sq: "Elbar", en: "Elbar" },
        price: 150,
      },
      {
        name: { sq: "Peroni", en: "Peroni" },
        price: 200,
      },
      {
        name: { sq: "Korca", en: "Korca" },
        price: 200,
      },
      {
        name: { sq: "Bavaria 0% Alkool", en: "Bavaria 0% Alcohol" },
        price: 200,
      },
      {
        name: { sq: "Heineken", en: "Heineken" },
        price: 250,
      },
      {
        name: { sq: "Paulaner", en: "Paulaner" },
        price: 300,
      },
    ],
  },
  {
    id: "freskuese",
    label: { sq: "Freskuese", en: "Drinks" },
    items: [
      {
        name: { sq: "Ujë", en: "Water" },
        description: { sq: "500ml / 750ml", en: "500ml / 750ml" },
        price: [100, 200],
      },
      {
        name: { sq: "Çaj i Ftohtë", en: "Cold tea" },
        price: 150,
      },
      {
        name: { sq: "Fanta", en: "Fanta" },
        price: 150,
      },
      {
        name: { sq: "Sprite", en: "Sprite" },
        price: 150,
      },
      {
        name: { sq: "Coca-Cola", en: "Coca-Cola" },
        price: 150,
      },
      {
        name: { sq: "Lemon Soda", en: "Lemon Soda" },
        price: 150,
      },
      {
        name: { sq: "Ivi", en: "Ivi" },
        price: 150,
      },
      {
        name: { sq: "Schweppes", en: "Schweppes" },
        price: 150,
      },
      {
        name: { sq: "Bravo", en: "Bravo" },
        price: 200,
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
    categoryId: "kryesore",
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
    categoryId: "kryesore",
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
/*  5. TEKSTET E FAQES                                                         */
/* -------------------------------------------------------------------------- */

export const navLinks: { id: string; label: Localized }[] = [
  { id: "top", label: { sq: "Kreu", en: "Home" } },
  { id: "story", label: { sq: "Historia Jonë", en: "Our Story" } },
  { id: "menu", label: { sq: "Menuja", en: "Menu" } },
  { id: "location", label: { sq: "Vendndodhja", en: "Location" } },
  { id: "gallery", label: { sq: "Galeria", en: "Gallery" } },
  { id: "contact", label: { sq: "Kontakti", en: "Contact" } },
];

export type FeatureIcon = "leaf" | "flame" | "star";

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
  },

  /* Shiriti poshtë Hero-s: tre treguesit kryesorë.
   * TODO: Përdorni vetëm shifra të vërteta (p.sh. vlerësimi real nga Google). */
  features: [
    {
      icon: "leaf",
      value: "100%",
      label: { sq: "Produkte Origjinale", en: "Original Produce" },
    },
    {
      icon: "flame",
      value: "Premium",
      label: { sq: "Mish & Zgarë", en: "Meat & Grill" },
    },
    {
      icon: "star",
      value: "4.9",
      label: { sq: "Vlerësim nga Miqtë", en: "Guest Rating" },
    },
  ] as { icon: FeatureIcon; value: string; label: Localized }[],

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

  gallery: {
    eyebrow: { sq: "Galeria", en: "Gallery" },
    title: { sq: "Atmosfera e *Li-Ro*", en: "The *Li-Ro* Atmosphere" },
    subtitle: {
      sq: "Një vështrim te pjatat, ambienti dhe mbrëmjet tona.",
      en: "A glimpse of our dishes, our space and our evenings.",
    },
    instagramCta: { sq: "Na ndiqni në Instagram", en: "Follow us on Instagram" },
  },

  location: {
    eyebrow: { sq: "Vendndodhja", en: "Location" },
    title: { sq: "Na Gjeni në *Panajë*", en: "Find Us in *Panaja*" },
    subtitle: {
      sq: "Pak minuta nga qendra e Vlorës, mes ullinjve dhe qetësisë së Panajës.",
      en: "A few minutes from the centre of Vlorë, among the olive trees and quiet of Panaja.",
    },
    addressLabel: { sq: "Adresa", en: "Address" },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    phoneLabel: { sq: "Telefon", en: "Phone" },
    directions: { sq: "Merr Udhëzimet", en: "Get Directions" },
    openInMaps: { sq: "Hap në Google Maps", en: "Open in Google Maps" },
    mapTitle: { sq: "Harta e vendndodhjes", en: "Location map" },
  },

  reservation: {
    eyebrow: { sq: "Rezervimi", en: "Reservations" },
    title: { sq: "Rezervoni *Tavolinën* Tuaj", en: "Reserve Your *Table*" },
    subtitle: {
      sq: "Rezervimet bëhen vetëm me telefon. Na telefononi dhe ne ju gjejmë tavolinën e duhur për mbrëmjen tuaj.",
      en: "Reservations are taken by phone only. Give us a call and we'll find the right table for your evening.",
    },
    groupsNote: {
      sq: "Për grupe mbi 10 persona, darka private ose evente, na njoftoni gjatë telefonatës.",
      en: "For groups of more than 10, private dinners or events, just let us know when you call.",
    },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    callEyebrow: { sq: "Rezervime me telefon", en: "Book by phone" },
    callTitle: { sq: "Na *telefononi*", en: "Give us a *call*" },
    callText: {
      sq: "Stafi ynë ju konfirmon rezervimin menjëherë gjatë telefonatës.",
      en: "Our team will confirm your reservation right away, during the call.",
    },
    call: { sq: "Telefono tani", en: "Call now" },
    prepareTitle: {
      sq: "Që telefonata të jetë e shpejtë, mbani gati:",
      en: "To keep the call quick, have ready:",
    },
    prepare: [
      { sq: "Datën dhe orën e dëshiruar", en: "Your preferred date and time" },
      { sq: "Numrin e personave", en: "The number of guests" },
      {
        sq: "Preferencën: ambient i brendshëm ose kopshti me ullinj",
        en: "Seating: indoor dining room or the olive garden",
      },
      {
        sq: "Raste të veçanta: ditëlindje, alergji, karrige për fëmijë",
        en: "Special requests: birthdays, allergies, high chairs",
      },
    ],
    callHint: { sq: "Telefononi brenda orarit të punës.", en: "Please call during opening hours." },
  },

  footer: {
    tagline: {
      sq: "Fine dining & zgarë bashkëkohore, mes tullës, drurit dhe ullinjve të Panajës.",
      en: "Fine dining & contemporary grill among the brick, wood and olive trees of Panaja.",
    },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    contactLabel: { sq: "Kontakt", en: "Contact" },
    rights: { sq: "Të gjitha të drejtat e rezervuara.", en: "All rights reserved." },
    backToTop: { sq: "Kthehu lart", en: "Back to top" },
  },
};
