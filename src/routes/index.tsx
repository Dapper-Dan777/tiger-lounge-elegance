import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Instagram, MapPin, Menu, Navigation, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CONTACT, getLocalBusinessSchema } from "@/lib/contact";
import { PrivacyModal } from "@/components/privacy-modal";
import logo from "@/assets/logo.png";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import hero6 from "@/assets/hero-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiger Lounge – Premium Shisha Bar in Bürstadt" },
      { name: "description", content: "Tiger Lounge Bürstadt: Premium Shisha, edle Drinks und eine elegante Lounge-Atmosphäre. Reservieren Sie Ihren Tisch." },
      { property: "og:title", content: "Tiger Lounge – Bürstadt" },
      { property: "og:description", content: "Premium Shisha. Clean. Elegant. Unvergesslich." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getLocalBusinessSchema()),
      },
    ],
  }),
  component: Home,
});

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

const shishaSorten = [
  "Falim", "Falim Red", "Doppel Apfel", "Minze", "Zitrone / Limette",
  "Wassermelone", "Traube Minze", "Persischer Apfel", "African Queen",
  "African King", "Bruderherz", "Nightkiller", "Löwenherz", "Kirsche",
  "Black Box", "Strawberry", "Peach", "Ananas", "Orange Minze",
  "Sommer in Beirut", "Rasborn", "Ice Kaktus", "Ice Bonbon",
  "Black Nana", "Blaulicht", "Black Kaktus",
];

const cocktailCategories: { title: string; items: { name: string; price: string }[] }[] = [
  {
    title: "Signature Creations",
    items: [
      { name: "Bloody Ficken", price: "8,50 €" },
      { name: "Swimmingpool", price: "8,50 €" },
    ],
  },
  {
    title: "Classic Vibes",
    items: [
      { name: "Mojito", price: "8,50 €" },
      { name: "Caipirinha", price: "8,50 €" },
      { name: "Salty Dog", price: "8,50 €" },
    ],
  },
  {
    title: "Tropical Jungle",
    items: [
      { name: "Sex on the Beach", price: "8,50 €" },
      { name: "Blue / Pink Lady", price: "8,50 €" },
      { name: "Long Island Icetea", price: "10,00 €" },
    ],
  },
  {
    title: "Fresh & Fruity",
    items: [
      { name: "Strawberry Mojito", price: "8,50 €" },
      { name: "Pink Flamingo", price: "8,50 €" },
      { name: "Cocoskiss", price: "8,50 €" },
    ],
  },
  {
    title: "Spritz",
    items: [
      { name: "Weinschorle (süß / sauer)", price: "8,50 €" },
      { name: "Aperol Spritz", price: "8,50 €" },
      { name: "Wildberry Lillet", price: "8,50 €" },
    ],
  },
];

const longdrinks = [
  { name: "Jack Daniels Cola", price: "7,00 €" },
  { name: "Jack Daniels Sprite", price: "7,00 €" },
  { name: "Vodka Energy", price: "7,00 €" },
  { name: "Gin Tonic", price: "7,00 €" },
  { name: "Jägermeister Energy", price: "7,00 €" },
  { name: "Bacardi Cola", price: "7,00 €" },
  { name: "Havana Cola", price: "7,00 €" },
  { name: "Malibu Maracuja", price: "7,00 €" },
];

const shots = [
  "Jägermeister", "Tequila", "Ficken", "Vodka", "Ouzo", "Baileys", "Pfeffi",
];

const biere = [
  { name: "Corona (0,33l)", price: "4,00 €" },
  { name: "Desperados (0,33l)", price: "4,00 €" },
  { name: "Becks (0,33l)", price: "4,00 €" },
  { name: "Bitburger (0,33l)", price: "4,00 €" },
  { name: "Weißbier (0,5l)", price: "5,00 €" },
];

const heissgetraenke = [
  { name: "Cappuccino", price: "3,00 €" },
  { name: "Latte Macchiato", price: "3,50 €" },
  { name: "Espresso", price: "2,50 €" },
  { name: "Espresso doppelt", price: "2,90 €" },
  { name: "Milchkaffee & Kaffee Crema", price: "3,00 €" },
  { name: "Frischer Minztee", price: "3,00 €" },
  { name: "Verschiedene Sorten Tee", price: "2,50 €" },
];

const softdrinks = [
  { name: "Cola", price: "3,50 €" },
  { name: "Cola Zero / Light", price: "3,50 €" },
  { name: "Fanta", price: "3,50 €" },
  { name: "Sprite", price: "3,50 €" },
  { name: "Mezzo", price: "3,50 €" },
  { name: "Bitter Lemon", price: "3,50 €" },
  { name: "Mineralwasser (0,25l)", price: "2,50 €" },
  { name: "Stilles Mineralwasser (0,25l)", price: "2,50 €" },
  { name: "Elephant Bay Ice Tea", price: "3,90 €" },
  { name: "Red Bull, Moloko, 28Black", price: "3,90 €" },
];

const saefte = [
  "Banane", "Kiba", "Kirsche", "Orange", "Mango",
  "Maracuja", "Erdbeer", "Ananas", "Cranberry",
];

const flaschen = [
  { name: "Three Sixty + 4 Dosen", price: "60,00 €" },
  { name: "Absolut Vodka + 4 Dosen", price: "60,00 €" },
  { name: "Belvedere + 4 Dosen", price: "120,00 €" },
  { name: "Jack Daniels + Coca Cola", price: "70,00 €" },
  { name: "Moët", price: "120,00 €" },
];

const food = [
  { name: "Baguette Sucuk", price: "6,50 €" },
  { name: "Baguette Pute", price: "6,50 €" },
  { name: "Baguette Schinken Käse", price: "6,50 €" },
  { name: "Nachos", price: "5,00 €" },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [imprintOpen, setImprintOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 5500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/85 backdrop-blur-md border-b border-[rgba(201,169,97,0.12)]" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button onClick={() => scrollTo("top")} className="flex items-center gap-3">
            <img src={logo} alt="Tiger Lounge" className="h-12 w-auto" />
          </button>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => scrollTo("hours")} className="text-sm tracking-[0.18em] uppercase text-foreground/80 hover:text-gold transition-colors">Öffnungszeiten</button>
            <button onClick={() => scrollTo("menu")} className="text-sm tracking-[0.18em] uppercase text-foreground/80 hover:text-gold transition-colors">Speisekarte</button>
            <button onClick={() => scrollTo("gallery")} className="text-sm tracking-[0.18em] uppercase text-foreground/80 hover:text-gold transition-colors">Galerie</button>
            <button onClick={() => scrollTo("contact")} className="text-sm tracking-[0.18em] uppercase text-foreground/80 hover:text-gold transition-colors">Kontakt</button>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-foreground/80 hover:text-gold transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <button
              onClick={() => setReserveOpen(true)}
              className="border border-gold text-gold px-6 py-2.5 text-xs tracking-[0.22em] uppercase hover:bg-gold hover:text-black transition-all duration-300"
            >
              Reservieren
            </button>
          </div>

          <button className="md:hidden text-gold" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
            {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {navOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-[rgba(201,169,97,0.12)]">
            <div className="px-6 py-8 flex flex-col gap-6 text-center">
              <button onClick={() => scrollTo("hours")} className="text-sm tracking-[0.2em] uppercase">Öffnungszeiten</button>
              <button onClick={() => scrollTo("menu")} className="text-sm tracking-[0.2em] uppercase">Speisekarte</button>
              <button onClick={() => scrollTo("gallery")} className="text-sm tracking-[0.2em] uppercase">Galerie</button>
              <button onClick={() => scrollTo("contact")} className="text-sm tracking-[0.2em] uppercase">Kontakt</button>
              <button onClick={() => { setNavOpen(false); setReserveOpen(true); }} className="border border-gold text-gold py-3 text-xs tracking-[0.22em] uppercase">Reservieren</button>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gold text-sm">
                <Instagram className="h-4 w-4" /> @{CONTACT.instagramHandle}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative h-screen w-full overflow-hidden">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
            style={{ opacity: slide === i ? 1 : 0 }}
          >
            <img
              src={img}
              alt={`Tiger Lounge Atmosphäre ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.08em] leading-none whitespace-nowrap">
            TIGER<span className="text-gold mx-3">·</span>LOUNGE
          </h1>
          <div className="hairline w-32 my-10" />
          <p className="text-sm md:text-base tracking-[0.25em] uppercase text-foreground/70 max-w-xl">
            Premium Shisha. Clean. Elegant. Unvergesslich.
          </p>
          <p className="mt-4 text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
            Eintritt ab 18 Jahren
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <button
              onClick={() => scrollTo("menu")}
              className="border border-[rgba(255,255,255,0.3)] px-10 py-4 text-xs tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
            >
              Speisekarte ansehen
            </button>
            <button
              onClick={() => setReserveOpen(true)}
              className="bg-gold text-black px-10 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-soft)] transition-all duration-300"
            >
              Tisch reservieren
            </button>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-[2px] transition-all duration-500 ${slide === i ? "w-10 bg-gold" : "w-5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Öffnungszeiten */}
      <section id="hours" className="py-32 px-6 lg:px-12 max-w-6xl mx-auto">
        <SectionHeader kicker="Willkommen" title="Öffnungszeiten" />
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(201,169,97,0.15)] mt-16 border border-[rgba(201,169,97,0.15)]">
          {[
            { d: "Montag – Donnerstag", t: "18:00 – 02:00" },
            { d: "Freitag – Samstag", t: "18:00 – 04:00", highlight: true },
            { d: "Sonntag", t: "15:00 – 01:00" },
          ].map((h) => (
            <div
              key={h.d}
              className={`bg-black p-12 text-center ${h.highlight ? "relative" : ""}`}
            >
              {h.highlight && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-gold">Weekend</div>
              )}
              <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">{h.d}</div>
              <div className={`font-display text-4xl ${h.highlight ? "text-gold" : ""}`}>{h.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Speisekarte */}
      <section id="menu" className="py-32 px-6 lg:px-12 max-w-5xl mx-auto">
        <SectionHeader kicker="Auswahl" title="Speisekarte" />
        <Tabs defaultValue="shishas" className="mt-16">
          <TabsList className="bg-transparent border-b border-[rgba(201,169,97,0.18)] w-full justify-center gap-2 rounded-none h-auto p-0 mb-12">
            {[
              { v: "shishas", l: "Shishas" },
              { v: "drinks", l: "Getränke" },
              { v: "food", l: "Essen" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none px-8 py-4 text-xs tracking-[0.25em] uppercase text-muted-foreground"
              >
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="shishas">
            <div className="text-center mb-10 text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Alle Sorten <span className="text-gold">je 15 €</span> · Kopfwechsel 7 €
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10">
              {shishaSorten.map((s) => (
                <MenuRow key={s} name={s} price="15 €" />
              ))}
            </div>
            <p className="text-center text-[11px] tracking-[0.3em] uppercase text-muted-foreground/70 mt-10">
              Weitere Sorten auf Anfrage
            </p>
          </TabsContent>

          <TabsContent value="drinks">
            {cocktailCategories.map((cat) => (
              <div key={cat.title} className="mb-14">
                <SubHeading>{cat.title}</SubHeading>
                <div className="space-y-px">
                  {cat.items.map((c) => (
                    <MenuRow key={c.name} name={c.name} price={c.price ?? "—"} />
                  ))}
                </div>
              </div>
            ))}

            <SubHeading>Longdrinks</SubHeading>
            <div className="space-y-px mb-14">
              {longdrinks.map((d) => <MenuRow key={d.name} name={d.name} price={d.price} />)}
            </div>

            <SubHeading>Shots 2cl</SubHeading>
            <div className="grid sm:grid-cols-2 gap-x-10 mb-14">
              {shots.map((s) => <MenuRow key={s} name={s} price="2,50 €" />)}
            </div>

            <SubHeading>Bier</SubHeading>
            <div className="space-y-px mb-14">
              {biere.map((b) => <MenuRow key={b.name} name={b.name} price={b.price} />)}
            </div>

            <SubHeading>Flaschen 0,7l</SubHeading>
            <div className="space-y-px mb-14">
              {flaschen.map((f) => <MenuRow key={f.name} name={f.name} price={f.price} />)}
            </div>

            <SubHeading>Heißgetränke</SubHeading>
            <div className="space-y-px mb-14">
              {heissgetraenke.map((h) => <MenuRow key={h.name} name={h.name} price={h.price} />)}
            </div>

            <SubHeading>Softdrinks</SubHeading>
            <div className="space-y-px mb-14">
              {softdrinks.map((s) => <MenuRow key={s.name} name={s.name} price={s.price} />)}
            </div>

            <SubHeading>Fruchtige Säfte 0,4l</SubHeading>
            <div className="grid sm:grid-cols-2 gap-x-10">
              {saefte.map((s) => <MenuRow key={s} name={s} price="3,50 €" />)}
            </div>
          </TabsContent>

          <TabsContent value="food" className="space-y-px">
            {food.map((f) => (
              <MenuRow key={f.name} name={f.name} price={f.price} />
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Galerie */}
      <section id="gallery" className="py-32 px-6 lg:px-12 border-t border-[rgba(201,169,97,0.12)]">
        <SectionHeader kicker="Atmosphäre" title="Galerie" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mt-16 max-w-6xl mx-auto">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden border border-[rgba(201,169,97,0.12)] aspect-[4/3] group"
            >
              <img
                src={img}
                alt={`Tiger Lounge Impression ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact / Footer */}
      <section id="contact" className="py-32 px-6 lg:px-12 border-t border-[rgba(201,169,97,0.12)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-6">Besuchen Sie uns</div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide">
            Tiger Lounge<span className="text-gold mx-3">·</span>Bürstadt
          </h2>
          <div className="hairline w-24 mx-auto my-10" />
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Wir freuen uns auf Ihren Besuch. Reservieren Sie vorab Ihren Tisch oder finden Sie uns
            in der Mittelriedstraße 27 in Bürstadt.
          </p>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => setReserveOpen(true)}
              className="bg-gold text-black px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-soft)] transition-all"
            >
              Jetzt reservieren
            </button>
          </div>

          <div className="mt-16 max-w-4xl mx-auto w-full space-y-4 text-left">
            <div className="overflow-hidden border border-[rgba(201,169,97,0.2)]">
              <iframe
                title="Tiger Lounge auf Google Maps"
                src={CONTACT.maps.embed}
                className="w-full h-64 md:h-80 border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="text-center text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
              {CONTACT.address.label}
            </p>
            <a
              href={CONTACT.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gold text-black py-4 text-xs tracking-[0.25em] uppercase hover:bg-[var(--gold-soft)] transition-all"
            >
              <Navigation className="h-4 w-4" />
              Route in Google Maps
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-4 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            <button onClick={() => setImprintOpen(true)} className="hover:text-gold transition-colors">
              Impressum
            </button>
            <span className="text-[rgba(201,169,97,0.3)]">·</span>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-gold transition-colors">
              Datenschutz
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[rgba(201,169,97,0.08)] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Tiger Lounge · Eintritt ab 18 Jahren</span>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold">
            <Instagram className="h-3.5 w-3.5" /> @{CONTACT.instagramHandle}
          </a>
        </div>
      </section>

      <ReserveModal open={reserveOpen} onOpenChange={setReserveOpen} />
      <ImprintModal open={imprintOpen} onOpenChange={setImprintOpen} />
      <PrivacyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </div>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-5">{kicker}</div>
      <h2 className="font-display text-5xl md:text-6xl tracking-wide">{title}</h2>
      <div className="hairline w-16 mx-auto mt-8" />
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px flex-1 bg-[rgba(201,169,97,0.2)]" />
      <span className="text-[10px] tracking-[0.4em] uppercase text-gold">{children}</span>
      <div className="h-px flex-1 bg-[rgba(201,169,97,0.2)]" />
    </div>
  );
}

function MenuRow({ name, desc, price }: { name: string; desc?: string; price: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-5 border-b border-[rgba(201,169,97,0.08)]">
      <div className="flex-1 min-w-0">
        <div className="font-display text-2xl text-foreground">{name}</div>
        {desc && <div className="text-sm text-muted-foreground mt-1">{desc}</div>}
      </div>
      <div className="text-gold tracking-widest text-sm whitespace-nowrap">{price}</div>
    </div>
  );
}

function ReserveModal({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  const [date, setDate] = useState<Date | undefined>();
  const [timeFrom, setTimeFrom] = useState("20:00");
  const [timeTo, setTimeTo] = useState("22:00");
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState("");
  const [reservationMessage, setReservationMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const reset = () => {
    setDate(undefined);
    setTimeFrom("20:00");
    setTimeTo("22:00");
    setGuests(2);
    setError("");
    setReservationMessage("");
    setCopied(false);
  };

  const buildMessage = () => {
    if (!date) return "";
    const dateLabel = format(date, "EEEE, d. MMMM yyyy", { locale: de });
    const guestsPart = guests > 1 ? ` für ${guests} Personen` : "";
    return `Hallo! Kann ich einen Tisch am ${dateLabel} von ${timeFrom} bis ${timeTo} Uhr${guestsPart} reservieren? Vielen Dank!`;
  };

  const handleReserve = async () => {
    setError("");
    if (!date) {
      setError("Bitte wählen Sie ein Datum aus.");
      return;
    }
    if (!timeFrom || !timeTo) {
      setError("Bitte geben Sie eine Uhrzeit von und bis an.");
      return;
    }
    if (timeTo <= timeFrom) {
      setError("Die Endzeit muss nach der Startzeit liegen.");
      return;
    }

    const message = buildMessage();
    setReservationMessage(message);

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }

    window.open(CONTACT.instagramDm, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="bg-black border border-[rgba(201,169,97,0.3)] sm:max-w-lg p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3 text-center">Reservierung</div>
          <DialogTitle className="font-display text-3xl text-center tracking-wide">Tisch reservieren</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            Datum und Uhrzeit wählen — wir leiten Sie mit einer fertigen Nachricht zu Instagram weiter.
          </DialogDescription>
        </DialogHeader>

        {reservationMessage ? (
          <div className="py-4 text-center space-y-4">
            <div className="hairline w-12 mx-auto" />
            <p className="text-foreground text-sm">Instagram wird geöffnet.</p>
            <p className="text-muted-foreground text-sm">
              {copied
                ? "Die Reservierungsnachricht wurde kopiert — einfach in den Chat einfügen und absenden."
                : "Kopieren Sie die Nachricht unten und senden Sie sie im Instagram-Chat."}
            </p>
            <p className="text-left text-sm text-foreground/90 bg-[rgba(201,169,97,0.08)] border border-[rgba(201,169,97,0.15)] p-4 leading-relaxed">
              {reservationMessage}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                onClick={() => void navigator.clipboard.writeText(reservationMessage)}
                className="w-full bg-gold text-black hover:bg-[var(--gold-soft)] rounded-none py-5 text-xs tracking-[0.25em] uppercase"
              >
                Nachricht kopieren
              </Button>
              <a
                href={CONTACT.instagramDm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gold text-gold py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-black transition-all"
              >
                <Instagram className="h-4 w-4" /> Instagram-Chat öffnen
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={de}
                disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-none border border-[rgba(201,169,97,0.15)] bg-black p-2"
                classNames={{
                  today: "bg-[rgba(201,169,97,0.12)] text-gold",
                  selected:
                    "bg-gold text-black hover:bg-gold hover:text-black focus:bg-gold focus:text-black",
                  day: "text-foreground hover:bg-[rgba(201,169,97,0.12)]",
                  day_button: cn(
                    "hover:bg-[rgba(201,169,97,0.12)]",
                    "data-[selected-single=true]:bg-gold data-[selected-single=true]:text-black",
                  ),
                  caption_label: "text-foreground font-display text-lg",
                  weekday: "text-muted-foreground text-[10px] tracking-[0.2em] uppercase",
                  outside: "text-muted-foreground/40",
                  disabled: "text-muted-foreground/30",
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ReserveField id="time-from" label="Von">
                <Input
                  id="time-from"
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  required
                  className="bg-transparent border-0 border-b border-[rgba(201,169,97,0.25)] rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold"
                />
              </ReserveField>
              <ReserveField id="time-to" label="Bis">
                <Input
                  id="time-to"
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  required
                  className="bg-transparent border-0 border-b border-[rgba(201,169,97,0.25)] rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold"
                />
              </ReserveField>
            </div>

            <ReserveField id="guests" label="Personen">
              <Input
                id="guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                required
                className="bg-transparent border-0 border-b border-[rgba(201,169,97,0.25)] rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold"
              />
            </ReserveField>

            {date && (
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                „{buildMessage()}“
              </p>
            )}

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <Button
              type="button"
              onClick={() => void handleReserve()}
              className="w-full bg-gold text-black hover:bg-[var(--gold-soft)] rounded-none py-6 text-xs tracking-[0.25em] uppercase"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Über Instagram reservieren
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ReserveField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={id} className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ImprintModal({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-[rgba(201,169,97,0.3)] sm:max-w-md p-10">
        <DialogHeader>
          <div className="text-gold text-[10px] tracking-[0.5em] uppercase mb-3 text-center">Information</div>
          <DialogTitle className="font-display text-3xl text-center tracking-wide">Impressum</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 mt-6 text-sm text-center">
          <p className="font-display text-2xl text-foreground">{CONTACT.owner}</p>
          <p className="text-foreground/85 leading-relaxed">
            {CONTACT.address.street}
            <br />
            {CONTACT.address.zip} {CONTACT.address.city}
          </p>

          <p className="text-foreground/85 leading-relaxed">
            <a href={CONTACT.phoneTel} className="hover:text-gold transition-colors">
              {CONTACT.phone}
            </a>
            <br />
            <a href={CONTACT.website} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              tiger-lounge.eatbu.com
            </a>
          </p>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-gold text-xs tracking-[0.2em] uppercase hover:text-[var(--gold-soft)] transition-colors"
          >
            <Instagram className="h-4 w-4" /> @{CONTACT.instagramHandle}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}


