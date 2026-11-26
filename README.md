# Taverna Li-Ro — Website

Website one-page për **Taverna Li-Ro** (Panaja, Vlorë) në stilin _Fine Dining & Contemporary
Steakhouse_: e zezë obsidian, ar shampanje dhe drita qelibari. Ndërtuar me Next.js (App Router),
TypeScript, Tailwind CSS v4, Framer Motion dhe Lucide React. Dygjuhëshe (SQ / EN).

## Nisja në localhost

Kërkon Node.js 20.9 ose më të ri.

```bash
npm install      # vetëm herën e parë
npm run dev      # nis serverin e zhvillimit
```

Hap **<http://localhost:3000>** në shfletues. Ndryshimet në kod shfaqen menjëherë.

Komanda të tjera:

```bash
npm run build    # ndërton versionin për prodhim
npm run start    # nis versionin e ndërtuar (pas build)
npm run lint     # kontrollon kodin me ESLint
```

## Struktura e projektit

```text
src/
├── app/
│   ├── layout.tsx              # fontet (Cormorant Garamond, Jost), metadata
│   ├── page.tsx                # faqja kryesore: bashkon të gjitha seksionet
│   ├── globals.css             # paleta (#0B0908 · #DFBE82 · #F7F3EB) dhe stilet e intros
│   └── icon.svg                # favicon (logoja)
├── components/
│   ├── sections/               # seksionet e faqes, sipas radhës
│   │   ├── Navbar.tsx          # logo · 4 lidhje · SQ / EN · "Rezervo →"
│   │   ├── Hero.tsx            # foto në ekran të plotë, LI-RO në qendër, një buton
│   │   ├── Essence.tsx         # "Thelbi": foto 7 kolona + filozofia & 3 vlerat
│   │   ├── SignatureDishes.tsx # 3 pjatat kryesore si galeri arti (3:4)
│   │   ├── Menu.tsx            # menuja në 2 kolona me tab-e (emri · vijë · çmimi)
│   │   ├── Gallery.tsx         # atmosfera: 3 foto asimetrike me zoom të ngadaltë
│   │   ├── Reservation.tsx     # forma (data, ora, personat, ambienti) → WhatsApp
│   │   └── Footer.tsx          # logoja, adresa, orari, telefoni, Instagram
│   ├── motion/                 # Framer Motion
│   │   ├── FadeUp.tsx          # zbulim i butë: y 20 → 0, opacity 0 → 1, 0.9s
│   │   ├── ParallaxImage.tsx   # foto me parallax të lehtë
│   │   └── MotionProvider.tsx  # respekton "Reduce motion" të pajisjes
│   ├── ui/                     # Logo, butonat, tipografia (mbititujt, titujt)
│   └── LanguageProvider.tsx    # gjuha aktive (ruhet në shfletues)
├── data/
│   └── restaurantData.ts       # ★ TË GJITHA tekstet, menuja, çmimet, oraret, kontaktet, fotot
└── lib/                        # ndihmës të vegjël (klasat, kurbat e lëvizjes)
public/
└── images/                     # vendosni këtu fotot reale
```

## Si të vendosni të dhënat reale

Gjithçka ndryshohet te **`src/data/restaurantData.ts`**. Vlerat placeholder janë të shënuara me `TODO`.
Në tituj, fjalët mes `*yjeve*` shfaqen me italic në ngjyrë ari, p.sh. `"Shija e Vërtetë, *E Përpunuar* me Elegancë"`.

| Çfarë | Ku |
| --- | --- |
| Telefoni, WhatsApp, adresa | `restaurant.contact`, `restaurant.address` |
| Instagram, Facebook | `restaurant.social` (Facebook shfaqet vetëm nëse plotësohet) |
| Harta e Google (opsionale) | `restaurant.map.embedUrl` (Google Maps → Share → Embed a map → kopjo `src`) |
| Orari | `openingHours` |
| Treguesit në hero (100%, 4.9★…) | `content.hero.stats` — vendosni vetëm shifra të vërteta |
| Kartat "Signature Menu" | `signatureDishes` |
| Menuja dhe çmimet | `menu` (çmimet në Lekë, p.sh. `1200` → shfaqet `1200L`) |
| Video / turi virtual | `content.story.video.url` (lidhje "embed", p.sh. YouTube) |
| Firma e shefit | `content.story.signature` |
| Oraret e rezervimit | `reservationSettings` |
| Tekstet e faqes (SQ/EN) | `content` |
| Fotot | `images`, `gallery`, `signatureDishes` |

**Fotot:** tani përdoren foto placeholder nga Unsplash. Për fotot reale, kopjojini te
`public/images/` dhe ndryshoni `src`, p.sh. `src: "/images/hero.jpg"`.

**Rezervimet:** forma nuk ruan të dhëna në server. Pas plotësimit, klienti e dërgon kërkesën
në WhatsApp (mesazh i parapërgatitur) ose telefonon direkt. Prandaj vendosni numrin real te
`whatsappNumber` (vetëm shifra, p.sh. `355691234567`).

**Video:** derisa `content.story.video.url` të plotësohet, butoni Play hap një dritare
"Turi virtual vjen së shpejti" me lidhje për në Instagram.
