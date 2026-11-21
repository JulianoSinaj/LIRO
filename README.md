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
│   ├── layout.tsx              # fontet (Cormorant Garamond, Plus Jakarta Sans, firma), metadata
│   ├── page.tsx                # faqja kryesore: bashkon të gjitha seksionet
│   ├── globals.css             # paleta, xhami, gradienti i artë, tekstura (tulla, kokrrizë)
│   └── icon.svg                # favicon (logoja)
├── components/
│   ├── sections/               # seksionet e faqes, sipas radhës
│   │   ├── Navbar.tsx          # transparent → xhami, vija e artë nën lidhjen aktive, SQ | EN
│   │   ├── Hero.tsx            # foto me Ken Burns + parallax, titulli animohet fjalë pas fjale
│   │   ├── FeatureBar.tsx      # shiriti i xhamit me 4 veçoritë
│   │   ├── Story.tsx           # Historia Jonë: foto + butoni Play (video) + firma e shefit
│   │   ├── SignatureMenu.tsx   # 4 kartat e pjatave kryesore
│   │   ├── MenuSection.tsx     # menuja e plotë me kategori (tabs)
│   │   ├── PrivateDining.tsx   # banneri "Darka Ekskluzive e Shefit"
│   │   ├── Gallery.tsx         # galeria "bento" me hover zoom
│   │   ├── Reservation.tsx     # forma e rezervimit + konfirmimi (WhatsApp / telefon)
│   │   └── Footer.tsx          # adresa, orari, kontakti, rrjetet sociale
│   ├── motion/                 # komponentët e animacionit (Framer Motion)
│   │   ├── FadeUp.tsx          # shfaqje e butë: y 30 → 0, opacity 0 → 1, 0.8s
│   │   ├── StaggerContainer.tsx  # fëmijët shfaqen njëri pas tjetrit
│   │   ├── ShimmerBorder.tsx   # kufi ari me shkëlqim drite që lëviz
│   │   └── MotionProvider.tsx  # respekton "Reduce motion" të pajisjes
│   ├── ui/                     # Logo, butonat, titujt, ikonat, dritat & muri me tulla
│   └── LanguageProvider.tsx    # gjuha aktive (ruhet në shfletues)
├── data/
│   └── restaurantData.ts       # ★ TË GJITHA tekstet, menuja, çmimet, oraret, kontaktet, fotot
└── lib/                        # ndihmës të vegjël (klasat, kurbat e lëvizjes, kategoria e menusë)
public/
└── images/                     # vendosni këtu fotot reale
```

## Si të vendosni të dhënat reale

Gjithçka ndryshohet te **`src/data/restaurantData.ts`**. Vlerat placeholder janë të shënuara me `TODO`.
Në tituj, fjalët mes `*yjeve*` shfaqen me italic në ngjyrë ari, p.sh. `"Darka *Ekskluzive* e Shefit"`.

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
