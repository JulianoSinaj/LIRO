/**
 * ============================================================================
 *  TAVERNA LI-RO — TË DHËNAT E RESTORANTIT / RESTAURANT DATA
 * ============================================================================
 *  Ky është i vetmi skedar që duhet ndryshuar për të përditësuar përmbajtjen e
 *  faqes: tekstet, menunë, çmimet, oraret, kontaktet dhe fotot.
 *
 *  • Çdo tekst ka dy versione: `sq` (Shqip) dhe `en` (English).
 *  • Në tituj, fjalët mes *yjeve* shfaqen me italic në ngjyrë ari,
 *    p.sh. "Shija e Vërtetë, *E Përpunuar* me Elegancë".
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
    // Harta satelitore (t=k) te seksioni "Vendndodhja" — e njëjta pikë (40.5514392, 19.4691347). Lëre bosh ("") për ta fshehur.
    embedUrl: "https://www.google.com/maps?q=40.5514392,19.4691347&z=18&t=k&hl=sq&output=embed",
    // Hap udhëzimet (navigimin) deri te restoranti.
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=40.5514392,19.4691347",
  },
};

/* -------------------------------------------------------------------------- */
/*  2. ORARI I PUNËS                                                          */
/* -------------------------------------------------------------------------- */

export const openingHours: { days: Localized; time: Localized }[] = [
  // TODO: Përditëso oraret reale. Mund të shtosh më shumë rreshta.
  {
    days: { sq: "E Mërkurë – E Hënë", en: "Wednesday – Monday" },
    time: { sq: "12:00 – 23:30", en: "12:00 – 23:30" },
  },
  // E Marta është ditë pushimi.
  { days: { sq: "E Martë", en: "Tuesday" }, time: { sq: "Pushim", en: "Closed" } },
];

/**
 * Orari në formë të strukturuar — përdoret nga statusi "Hapur tani" në hero.
 * Mbaje në përputhje me `openingHours` më sipër.
 * Ditët: 0 = E Diel, 1 = E Hënë, 2 = E Martë … 6 = E Shtunë.
 */
export const schedule = {
  timeZone: "Europe/Tirane",
  open: "12:00",
  close: "23:30",
  closedDays: [2] as number[],
};

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
  /* Hero: foto e gjerë, e errët, në ekran të plotë. */
  hero: {
    src: unsplash("1558030006-450675393462", 2400),
    alt: {
      sq: "Biftek i prerë mbi dërrasë druri, nën dritë të ngrohtë",
      en: "Sliced steak on a wooden board in warm light",
    },
  },
  /* "Thelbi": arkitektura — tulla, dru natyral, dritë e ngrohtë (foto vertikale). */
  story: {
    src: unsplash("1578474846511-04ba529f0b88", 1600),
    alt: {
      sq: "Salla e darkës me drita të ngrohta muri",
      en: "The dining room in warm wall-lamp light",
    },
  },
} satisfies Record<string, Photo>;

/* Galeria e atmosferës — fotot reale nga /public/images/atmosfera-web (2400px, ~450 KB).
 * Të gjitha janë vertikale (2:3). `featured: true` = shfaqen direkt në seksion
 * (4 të parat me këtë shenjë); të tjerat shihen te "Shiko të gjitha".      */
export type GalleryPhoto = Photo & { caption: Localized; featured?: boolean };

const atm = (n: number) => `/images/atmosfera-web/atm${n}.jpeg`;

export const gallery: GalleryPhoto[] = [
  {
    src: atm(1),
    featured: true,
    alt: {
      sq: "Tavolinë e shtruar pranë murit me tulla, ndriçuar nga drita e ngrohtë",
      en: "A set table by the brick wall in warm light",
    },
    caption: { sq: "Salla", en: "The dining room" },
  },
  {
    src: atm(9),
    featured: true,
    alt: {
      sq: "Dy gota verë e kuqe ngrihen për dolli mbi tavolinë me mish të pjekur",
      en: "Two glasses of red wine raised for a toast over grilled meat",
    },
    caption: { sq: "Gëzuar", en: "Cheers" },
  },
  {
    src: atm(3),
    featured: true,
    alt: {
      sq: "Biftek me kockë mbi pjatë gize, sallatë dhe verë në mbrëmje",
      en: "Bone-in steak on a cast-iron plate with salad and wine at night",
    },
    caption: { sq: "Nga zgara", en: "From the grill" },
  },
  {
    src: atm(8),
    featured: true,
    alt: {
      sq: "Tavolinë me mish, sallatë dhe verë, mes gjelbërimit",
      en: "A table of meat, salad and wine framed by greenery",
    },
    caption: { sq: "Mes gjelbërimit", en: "Among the greenery" },
  },
  {
    src: atm(2),
    alt: {
      sq: "Mysafirë duke prerë biftekun në tavolinë druri",
      en: "Guests cutting into steak at a wooden table",
    },
    caption: { sq: "Në tavolinë", en: "At the table" },
  },
  {
    src: atm(4),
    alt: {
      sq: "Pamje nga sipër: pjatë gize me biftek, sallatë dhe verë e kuqe",
      en: "From above: cast-iron steak platter, salad and red wine",
    },
    caption: { sq: "Darka e shtruar", en: "Dinner is served" },
  },
  {
    src: atm(6),
    alt: {
      sq: "Tavolinë me verë dhe mish pranë murit me tulla të ndriçuar",
      en: "Wine and meat on a table beside the lit brick wall",
    },
    caption: { sq: "Tulla & dritë", en: "Brick & light" },
  },
  {
    src: atm(7),
    alt: {
      sq: "Salla e qetë me drita qelibari dhe tavolina të shtruara",
      en: "The quiet dining room with amber lights and set tables",
    },
    caption: { sq: "Para darkës", en: "Before dinner" },
  },
];

/* -------------------------------------------------------------------------- */
/*  4. MENUJA                                                                  */
/* -------------------------------------------------------------------------- */
/*  Sipas menusë origjinale ("Taverna LIRO Menu Final.pdf").
 *  Çmimet janë në Lekë (numër i plotë). Faqja i shfaq si "1200 L".
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
    id: "mish",
    label: { sq: "Mish & Zgarë", en: "Meat & Grill" },
    items: [
      {
        name: { sq: "Paidhaqe gici", en: "Piglet ribs" },
        price: 1000,
      },
      {
        name: { sq: "Zog Fshati", en: "Village chicken" },
        price: 1200,
      },
      {
        name: { sq: "Paidhaqe Qengji", en: "Lamb ribs" },
        price: 1300,
      },
      {
        name: { sq: "Fileto viçi", en: "Filet mignon" },
        price: 1500,
      },
      {
        name: { sq: "Zog në tavë saçi", en: "Traditional baked chicken" },
        description: { sq: "Me oriz ose makarona", en: "With rice or pasta" },
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
    id: "peshk",
    label: { sq: "Peshk & Deti", en: "Fish & Sea" },
    // TODO: shtoni pjatat e tjera të detit kur të jenë në menu.
    items: [
      {
        name: { sq: "Peshk", en: "Grilled orata fish" },
        price: 1000,
      },
      {
        name: { sq: "Ngjala", en: "Grilled eels" },
        price: 1300,
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

/* Tab-et e menusë. Çdo tab shfaq një ose më shumë kategori nga lista sipër
 * (sipas `id`). Kur një tab ka disa kategori, secila merr titullin e vet. */
export const menuTabs: { id: string; label: Localized; categories: string[] }[] = [
  { id: "antipasta", label: { sq: "Antipasta", en: "Starters" }, categories: ["antipasta", "sallata"] },
  { id: "mish", label: { sq: "Mish & Zgarë", en: "Meat & Grill" }, categories: ["mish"] },
  { id: "peshk", label: { sq: "Peshk & Deti", en: "Fish & Sea" }, categories: ["peshk"] },
  { id: "vera", label: { sq: "Pije", en: "Drinks" }, categories: ["vera", "birra", "freskuese"] },
  { id: "embelsira", label: { sq: "Embëlsira", en: "Desserts" }, categories: ["embelsira"] },
];

/* Tre pjatat "signature" — çmimet sipas menusë. Fotot janë vertikale (3:4). */
export const signatureDishes: {
  id: string;
  image: Photo;
  name: Localized;
  description: Localized;
  price: number;
}[] = [
  {
    id: "fiorentina",
    image: {
      /* Foto reale, versioni për web (1600px, ~350 KB). */
      src: "/images/fiorentina1-web.jpeg",
      alt: {
        sq: "Fiorentina e prerë në feta me rozmarinë, në pjatë gize me kripë deti",
        en: "Sliced Fiorentina with rosemary on a cast-iron platter with sea salt",
      },
    },
    name: { sq: "Fiorentina", en: "Fiorentina" },
    description: {
      sq: "Një kilogram viçi në zgarë, me kripë deti dhe barishte.",
      en: "A kilogram of beef from the grill, sea salt and herbs.",
    },
    price: 4500,
  },
  {
    id: "peshk",
    image: {
      /* Foto reale, versioni për web (1600px, ~280 KB). */
      src: "/images/peshku-web.jpeg",
      alt: {
        sq: "Koçë e plotë në zgarë me limon, në pjatë në formë peshku",
        en: "Whole grilled sea bream with lemon on a fish-shaped platter",
      },
    },
    name: { sq: "Koçë në Zgarë", en: "Grilled Sea Bream" },
    description: {
      sq: "Peshku i ditës nga bregu i Vlorës, me vaj ulliri dhe limon.",
      en: "The day's catch from the Vlorë coast, olive oil and lemon.",
    },
    price: 1000,
  },
  {
    id: "vera-liro",
    image: {
      /* Foto reale, versioni për web (1600px, ~230 KB). */
      src: "/images/vererat-web.jpeg",
      alt: {
        sq: "Kamarieri mban një shishe verë të kuqe Taverna Li-Ro pranë tryezës",
        en: "A waiter holds a bottle of Taverna Li-Ro red wine beside the table",
      },
    },
    name: { sq: "Verë Liro", en: "Liro Wine" },
    description: {
      sq: "Vera që mban emrin e shtëpisë, e zgjedhur për tryezën tonë.",
      en: "The wine that carries the house name, chosen for our table.",
    },
    price: 1500,
  },
];

/* -------------------------------------------------------------------------- */
/*  5. TEKSTET E FAQES                                                         */
/* -------------------------------------------------------------------------- */

/* Navigimi — maksimumi 5 lidhje. `id` = id e seksionit në faqe. */
export const navLinks: { id: string; label: Localized }[] = [
  { id: "top", label: { sq: "Kreu", en: "Home" } },
  { id: "menu", label: { sq: "Menuja", en: "Menu" } },
  { id: "location", label: { sq: "Vendndodhja", en: "Location" } },
  { id: "gallery", label: { sq: "Atmosfera", en: "Atmosphere" } },
  { id: "contact", label: { sq: "Kontakti", en: "Contact" } },
];

export const content = {
  nav: {
    cta: { sq: "Rezervo", en: "Reserve" },
    openMenu: { sq: "Hap menunë", en: "Open menu" },
    closeMenu: { sq: "Mbyll menunë", en: "Close menu" },
    language: { sq: "Gjuha", en: "Language" },
    home: { sq: "Kreu", en: "Home" },
  },

  hero: {
    eyebrow: { sq: "Panaja • Vlorë", en: "Panaja • Vlorë" },
    title: {
      sq: "Shija e Vërtetë, *E Përpunuar* me Elegancë",
      en: "True Flavour, *Crafted* with Elegance",
    },
    // Maksimumi 12 fjalë.
    subtitle: {
      sq: "Mish i zgjedhur, peshk i Jonit dhe verë, mes ullinjve të Panajës.",
      en: "Selected meats, Ionian fish and fine wine, among Panaja's olive trees.",
    },
    cta: { sq: "Rezervo një Tavolinë", en: "Reserve a Table" },
    // Statusi "Hapur tani" (shfaqet në footer, poshtë orarit) ({time} dhe {day} zëvendësohen automatikisht).
    status: {
      openNow: { sq: "Hapur tani · deri {time}", en: "Open now · until {time}" },
      opensToday: { sq: "Hapet sot në {time}", en: "Opens today at {time}" },
      opensTomorrow: { sq: "Mbyllur · hapet nesër në {time}", en: "Closed · opens tomorrow at {time}" },
      opensOn: { sq: "Mbyllur · hapet {day} në {time}", en: "Closed · opens {day} at {time}" },
    },
  },

  weekdays: {
    sq: ["të Dielën", "të Hënën", "të Martën", "të Mërkurën", "të Enjten", "të Premten", "të Shtunën"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },

  essence: {
    eyebrow: { sq: "Thelbi", en: "The Essence" },
    title: { sq: "Tullë, dru *dhe zjarr*", en: "Brick, wood *and fire*" },
    text: {
      sq: "Në Li-Ro gjithçka nis nga zgjedhja e lëndës. Mish i përzgjedhur me kujdes, peshku i freskët i detit Jon dhe produktet e stinës gatuhen thjesht, që shija të flasë vetë — mes mureve me tulla, drurit natyral dhe qetësisë së kopshtit me ullinj.",
      en: "At Li-Ro, everything begins with the choice of ingredients. Carefully selected meat, fresh fish from the Ionian Sea and seasonal produce are cooked simply, so the flavour speaks for itself — among brick walls, natural wood and the calm of the olive garden.",
    },
    values: [
      { sq: "Zgarë & Mish Premium", en: "Grill & Premium Meat" },
      { sq: "Prodhime Deti të Freskëta", en: "Fresh Seafood" },
      { sq: "Kantinë Verërash", en: "Wine Cellar" },
    ],
  },

  signature: {
    eyebrow: { sq: "Pjatat e Shtëpisë", en: "Signature" },
    title: { sq: "Nga zgara, deti *dhe kantina*", en: "From the grill, the sea *and the cellar*" },
  },

  menu: {
    eyebrow: { sq: "Menuja", en: "The Menu" },
    title: { sq: "Karta e *Li-Ro*", en: "The *Li-Ro* Card" },
    categoriesLabel: { sq: "Kategoritë e menusë", en: "Menu categories" },
    note: {
      sq: "Çmimet janë në Lekë. Për alergjenë, pyesni stafin tonë.",
      en: "Prices in Albanian Lek. Please ask our staff about allergens.",
    },
  },

  gallery: {
    eyebrow: { sq: "Atmosfera", en: "Atmosphere" },
    title: { sq: "Mbrëmjet në *Li-Ro*", en: "Evenings at *Li-Ro*" },
    instagramCta: { sq: "Na ndiqni në Instagram", en: "Follow us on Instagram" },
    viewAll: { sq: "Shiko të gjitha", en: "View all" },
    photos: { sq: "foto", en: "photos" },
    more: { sq: "Më shumë", en: "More" },
    open: { sq: "Hap foton", en: "Open photo" },
    close: { sq: "Mbyll", en: "Close" },
    back: { sq: "Kthehu te galeria", en: "Back to gallery" },
    prev: { sq: "Fotoja e mëparshme", en: "Previous photo" },
    next: { sq: "Fotoja tjetër", en: "Next photo" },
  },

  location: {
    eyebrow: { sq: "Vendndodhja", en: "Location" },
    title: { sq: "Na gjeni në *Panajë*", en: "Find us in *Panaja*" },
    text: {
      sq: "Pak minuta nga qendra e Vlorës, mes ullinjve dhe qetësisë së Panajës.",
      en: "A few minutes from the centre of Vlorë, among the olive trees and quiet of Panaja.",
    },
    addressLabel: { sq: "Adresa", en: "Address" },
    hoursLabel: { sq: "Orari", en: "Opening hours" },
    directions: { sq: "Merr udhëzimet", en: "Get directions" },
    openInMaps: { sq: "Hap në Google Maps", en: "Open in Google Maps" },
    mapTitle: { sq: "Harta e vendndodhjes", en: "Location map" },
  },

  reservation: {
    eyebrow: { sq: "Rezervimi", en: "Reservations" },
    title: { sq: "Rezervoni *tavolinën* tuaj", en: "Reserve your *table*" },
    text: {
      sq: "Rezervimet bëhen vetëm me telefon. Na telefononi ose na shkruani — ju konfirmojmë tavolinën menjëherë.",
      en: "Reservations are by phone only. Call or message us — we'll confirm your table right away.",
    },
    phoneLabel: { sq: "Numri i rezervimeve", en: "Reservations line" },
    copy: { sq: "Kopjo numrin", en: "Copy number" },
    copied: { sq: "U kopjua", en: "Copied" },
    // Mënyrat e kontaktit. Fshi një rresht për ta hequr nga faqja.
    channels: [
      { id: "call", label: { sq: "Telefono", en: "Call" } },
      { id: "whatsapp", label: { sq: "WhatsApp", en: "WhatsApp" } },
      { id: "viber", label: { sq: "Viber", en: "Viber" } },
      { id: "sms", label: { sq: "Dërgo SMS", en: "Send SMS" } },
    ] as { id: "call" | "whatsapp" | "viber" | "sms"; label: Localized }[],
    // Mesazhi i parashkruar për WhatsApp dhe SMS.
    message: {
      sq: "Përshëndetje Taverna Li-Ro! Dëshiroj të rezervoj një tavolinë.",
      en: "Hello Taverna Li-Ro! I'd like to reserve a table.",
    },
  },

  footer: {
    addressLabel: { sq: "Adresa", en: "Address" },
    hoursLabel: { sq: "Orari", en: "Hours" },
    contactLabel: { sq: "Kontakt", en: "Contact" },
    rights: { sq: "Të gjitha të drejtat e rezervuara.", en: "All rights reserved." },
    directions: { sq: "Udhëzimet", en: "Directions" },
    whatsapp: { sq: "WhatsApp", en: "WhatsApp" },
    backToTop: { sq: "Kthehu lart", en: "Back to top" },
  },
};
