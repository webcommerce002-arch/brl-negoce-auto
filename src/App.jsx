import React, { useState, useEffect, useRef } from 'react';
import {
  Plus, Trash2, ArrowRight, ChevronRight, ChevronDown, Star, Fuel, Gauge, Calendar,
  Facebook, MapPin, Phone, Clock, CheckCircle2, X, ShieldCheck, Award, Car, Search,
  Mail, Lock, Upload, Menu, FileText, CreditCard, Handshake, Heart, Eye, ArrowLeft,
  Settings, Palette, Weight, Ruler, Leaf, DoorOpen, User, Cog, Info, MessageSquare,
  Filter, ChevronUp, Zap, Wrench, ClipboardCheck, BadgeCheck, PhoneCall, Globe
} from 'lucide-react';

// --- CONFIG ---
const BRAND = {
  name: "BRL NEGOCE AUTO",
  phone: "06 31 53 10 34",
  phoneLink: "tel:+33631531034",
  email: "brl.negoce@gmail.com",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  address: "6 rue Jules Ferry, Billy-Berclau 62138",
  rating: 4.8,
  totalSales: 750,
  siret: "XXX XXX XXX XXXXX",
};

const GREEN = "#8CB63C";
const GREEN_HOVER = "#6d9330";
const GREEN_DARK = "#5a7a28";

// --- MANUFACTURER SPECS ---
const MANUFACTURER_SPECS = {
  "citroen_c3_2011": {
    carrosserie: "Citadine", portes: 5, dimensions: "3941 x 1728 x 1524 mm",
    poids: "1050 kg", coffre: "300 L", consoMixte: "5.5 L/100km",
    co2: "129 g/km", normeEuro: "Euro 5"
  },
  "renault_twingo_2014": {
    carrosserie: "Citadine", portes: 5, dimensions: "3686 x 1654 x 1470 mm",
    poids: "1025 kg", coffre: "230 L", consoMixte: "5.4 L/100km",
    co2: "119 g/km", normeEuro: "Euro 5"
  }
};

// --- INITIAL DATA ---
const INITIAL_CARS = [
  {
    id: 1, marque: "Citroen", modele: "C3", annee: 2011, prix: 6290, km: 98000,
    carburant: "Essence", transmission: "Manuelle", puissance: "60 ch", couleur: "Gris",
    nbProprietaires: 2,
    description: "Citroen C3 en tres bon etat general. Entretien suivi avec carnet. Climatisation, direction assistee, vitres electriques. Ideale pour la ville comme pour les trajets quotidiens. Controle technique OK. Vehicule non fumeur.",
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop"
    ],
    specsKey: "citroen_c3_2011"
  },
  {
    id: 2, marque: "Renault", modele: "Twingo", annee: 2014, prix: 3490, km: 115000,
    carburant: "Essence", transmission: "Manuelle", puissance: "75 ch", couleur: "Blanc",
    nbProprietaires: 1,
    description: "Renault Twingo 2 phase 2 en excellent etat. Premiere main, entretien rigoureux en concession. Climatisation, Bluetooth, regulateur de vitesse. Tres economique a l'usage. Parfaite premiere voiture ou second vehicule. CT vierge.",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop"
    ],
    specsKey: "renault_twingo_2014"
  }
];

const INITIAL_REVIEWS = [
  { id: 1, name: "Mickael B.", rating: 5, text: "Excellent service ! Vehicule conforme a la description, equipe tres professionnelle et a l'ecoute. Je recommande vivement BRL Negoce Auto.", date: "2025-11-15" },
  { id: 2, name: "Sandrine L.", rating: 5, text: "Tres satisfaite de mon achat. La voiture etait en parfait etat, le prix etait juste. Merci pour la transparence et la gentillesse !", date: "2025-12-02" },
  { id: 3, name: "Kevin D.", rating: 4, text: "Bon rapport qualite-prix, equipe sympa et reactive. La carte grise a ete faite rapidement. Je reviendrai pour mon prochain achat.", date: "2026-01-20" }
];

// --- PERSISTENCE ---
const loadData = (key, fallback) => {
  try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; }
  catch { return fallback; }
};
const saveData = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

// --- HELPERS ---
const formatPrice = (p) => new Intl.NumberFormat('fr-FR').format(p) + " \u20AC";
const formatKm = (k) => new Intl.NumberFormat('fr-FR').format(k) + " km";

const StarRating = ({ rating, size = 16 }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size} className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
    ))}
  </div>
);

// --- SCROLL REVEAL ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- BADGE COMPONENT ---
const Badge = ({ children, variant = "green" }) => {
  const styles = {
    green: "bg-[#8CB63C]/10 text-[#8CB63C] border-[#8CB63C]/20",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]}`}>{children}</span>;
};

// =============================================================================
// NAVBAR — style concessionnaire pro
// =============================================================================
const Navbar = ({ currentPage, setCurrentPage, setShowAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { id: 'home', label: 'Accueil' },
    { id: 'stock', label: 'Vehicules' },
    { id: 'about', label: 'A propos' },
    { id: 'reviews', label: 'Avis clients' }
  ];

  const go = (p) => { setCurrentPage(p); setMobileOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#8CB63C]" /> {BRAND.address}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#8CB63C]" /> Lun-Sam : 9h-19h</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-1.5 hover:text-[#8CB63C] transition-colors"><Mail size={12} /> {BRAND.email}</a>
            <a href={BRAND.phoneLink} className="flex items-center gap-1.5 hover:text-[#8CB63C] transition-colors"><Phone size={12} /> {BRAND.phone}</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-lg shadow-md' : 'bg-white border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button onClick={() => go('home')} className="flex items-center gap-3 group">
              <img src="/logo-brl.png" alt="BRL Negoce Auto" className="h-12 w-12 rounded-full object-cover shadow-sm" />
              <div className="leading-tight hidden sm:block">
                <span className="text-xl font-black text-gray-900 tracking-tight">BRL</span>
                <span className="block text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Negoce Auto</span>
              </div>
            </button>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    currentPage === l.id ? 'text-[#8CB63C] bg-[#8CB63C]/8' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >{l.label}</button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={BRAND.phoneLink} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#8CB63C] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#8CB63C]/10 flex items-center justify-center">
                  <Phone size={16} className="text-[#8CB63C]" />
                </div>
                {BRAND.phone}
              </a>
              <button onClick={() => { go('stock'); }}
                className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#8CB63C]/25"
              >
                Voir les vehicules
              </button>
              <button onClick={() => { setShowAdmin(true); go('admin'); }}
                className="p-2 rounded-lg text-gray-300 hover:text-[#8CB63C] hover:bg-gray-50 transition-colors" title="Admin">
                <Lock size={16} />
              </button>
            </div>

            {/* Mobile */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-50">
              {mobileOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    currentPage === l.id ? 'bg-[#8CB63C]/10 text-[#8CB63C]' : 'text-gray-600 hover:bg-gray-50'
                  }`}>{l.label}</button>
              ))}
              <hr className="my-3 border-gray-100" />
              <a href={BRAND.phoneLink} className="flex items-center gap-2 px-4 py-3 text-[#8CB63C] font-bold text-sm">
                <Phone size={16} /> {BRAND.phone}
              </a>
              <button onClick={() => { setShowAdmin(true); go('admin'); }}
                className="flex items-center gap-2 px-4 py-3 text-gray-400 text-sm"><Lock size={14} /> Admin</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// =============================================================================
// HERO — banniere Facebook pleine largeur + accroche pro
// =============================================================================
const HeroSection = ({ setCurrentPage }) => (
  <section className="bg-white">
    {/* Banniere Facebook — fond noir pour compléter si l'image ne couvre pas tout */}
    <div className="w-full bg-[#2a2a2a] flex items-center justify-center">
      <div className="w-full max-w-[1400px]">
        <img
          src="/banner-brl.png"
          alt="BRL Negoce Auto"
          className="w-full h-auto max-h-[400px] object-contain"
        />
      </div>
    </div>

    {/* Contenu hero */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <div>
            <Badge variant="green"><ShieldCheck size={14} /> Professionnel de l'automobile</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] mt-6 mb-6">
              Vehicules d'occasion <span className="text-[#8CB63C]">selectionnes</span> et{' '}
              <span className="text-[#8CB63C]">garantis</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
              Votre garage de confiance a Billy-Berclau. Chaque vehicule est rigoureusement inspecte, revise et livre avec garantie.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#8CB63C]/25 flex items-center gap-2">
                Decouvrir nos vehicules <ArrowRight size={18} />
              </button>
              <a href={BRAND.phoneLink}
                className="border-2 border-gray-200 text-gray-700 hover:border-[#8CB63C] hover:text-[#8CB63C] px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 flex items-center gap-2">
                <Phone size={18} /> Nous appeler
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#8CB63C]/10 flex items-center justify-center"><ShieldCheck size={18} className="text-[#8CB63C]" /></div>
                <div><p className="text-sm font-bold text-gray-900">Garantie</p><p className="text-xs text-gray-400">3 mois inclus</p></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#8CB63C]/10 flex items-center justify-center"><ClipboardCheck size={18} className="text-[#8CB63C]" /></div>
                <div><p className="text-sm font-bold text-gray-900">CT a jour</p><p className="text-xs text-gray-400">Sur chaque vehicule</p></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#8CB63C]/10 flex items-center justify-center"><Star size={18} className="text-[#8CB63C]" /></div>
                <div><p className="text-sm font-bold text-gray-900">{BRAND.rating}/5</p><p className="text-xs text-gray-400">Avis clients</p></div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-[#8CB63C]/15 to-transparent rounded-3xl blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"
              alt="Vehicule d'occasion BRL Negoce Auto"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-lg border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">A partir de</p>
                <p className="text-2xl font-black text-[#8CB63C]">3 490 EUR</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1"><StarRating rating={5} size={14} /></div>
                <p className="text-xs text-gray-400 mt-0.5">+750 ventes</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// =============================================================================
// STATS BAND
// =============================================================================
const StatsBand = () => {
  const stats = [
    { icon: <Car size={22} />, value: "+750", label: "Vehicules vendus" },
    { icon: <Star size={22} />, value: "4.8/5", label: "Note clients" },
    { icon: <ShieldCheck size={22} />, value: "3 mois", label: "Garantie incluse" },
    { icon: <Wrench size={22} />, value: "100%", label: "Revises et controles" }
  ];
  return (
    <section className="bg-[#8CB63C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-white">
              <div className="p-2.5 bg-white/15 rounded-xl shrink-0">{s.icon}</div>
              <div>
                <p className="text-xl font-black leading-tight">{s.value}</p>
                <p className="text-xs text-white/70 font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// CAR CARD — style concessionnaire
// =============================================================================
const CarCard = ({ car, onClick }) => (
  <div onClick={onClick}
    className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
    <div className="relative overflow-hidden aspect-[16/10]">
      <img src={car.images?.[0] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=450&fit=crop"}
        alt={`${car.marque} ${car.modele}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      <div className="absolute top-3 left-3">
        <span className="bg-[#8CB63C] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md">
          {formatPrice(car.prix)}
        </span>
      </div>
      {car.images && car.images.length > 1 && (
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
          {car.images.length} photos
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-bold text-gray-900">{car.marque} {car.modele}</h3>
        <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded">{car.annee}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
        <span className="flex items-center gap-1"><Gauge size={12} /> {formatKm(car.km)}</span>
        <span className="flex items-center gap-1"><Fuel size={12} /> {car.carburant}</span>
        <span className="flex items-center gap-1"><Cog size={12} /> {car.transmission}</span>
        <span className="flex items-center gap-1"><Zap size={12} /> {car.puissance}</span>
      </div>
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-[#8CB63C]" />
          <span className="text-xs text-[#8CB63C] font-semibold">Garanti 3 mois</span>
        </div>
        <span className="text-[#8CB63C] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
          Details <ChevronRight size={12} />
        </span>
      </div>
    </div>
  </div>
);

// =============================================================================
// LATEST CARS
// =============================================================================
const LatestCarsSection = ({ cars, setCurrentPage, setSelectedCar }) => (
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold text-[#8CB63C] uppercase tracking-wider mb-2">Notre selection</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">Derniers arrivages</h2>
          </div>
          <button onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#8CB63C] hover:text-[#6d9330] transition-colors">
            Tout voir <ArrowRight size={16} />
          </button>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 6).map((car, i) => (
          <Reveal key={car.id} delay={i * 80}>
            <CarCard car={car} onClick={() => { setSelectedCar(car); setCurrentPage('carDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
          </Reveal>
        ))}
      </div>
      {cars.length > 6 && (
        <div className="text-center mt-10 sm:hidden">
          <button onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-8 py-3 rounded-xl font-bold transition-all">
            Voir tout le stock
          </button>
        </div>
      )}
    </div>
  </section>
);

// =============================================================================
// SERVICES
// =============================================================================
const ServicesSection = () => {
  const services = [
    { icon: <ShieldCheck size={24} />, title: "Garantie 3 mois", desc: "Chaque vehicule est couvert par une garantie mecanique de 3 mois minimum pour rouler en toute serenite." },
    { icon: <FileText size={24} />, title: "Demarches carte grise", desc: "Nous realisons l'ensemble des demarches administratives pour votre carte grise. Simple et rapide." },
    { icon: <Handshake size={24} />, title: "Depot-vente", desc: "Vous souhaitez vendre votre vehicule ? Confiez-le-nous, on s'occupe de tout pour vous." },
    { icon: <CreditCard size={24} />, title: "Facilites de paiement", desc: "Solutions de financement adaptees a votre budget. Simulation gratuite et sans engagement." },
    { icon: <Wrench size={24} />, title: "Revision complete", desc: "Tous nos vehicules sont revises en atelier avant la mise en vente. Vidange, freins, pneumatiques." },
    { icon: <ClipboardCheck size={24} />, title: "Controle technique", desc: "CT a jour sur chaque vehicule. Transparence totale sur l'etat mecanique et l'historique." }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[#8CB63C] uppercase tracking-wider mb-2">Nos engagements</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">Un service complet et professionnel</h2>
            <p className="text-gray-500 max-w-lg mx-auto">De la selection du vehicule a la remise des cles, nous vous accompagnons a chaque etape.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group p-6 rounded-xl border border-gray-100 hover:border-[#8CB63C]/30 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="w-12 h-12 rounded-xl bg-[#8CB63C]/10 flex items-center justify-center text-[#8CB63C] mb-4 group-hover:bg-[#8CB63C] group-hover:text-white transition-all duration-300">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// WHY CHOOSE US
// =============================================================================
const WhySection = () => (
  <section className="py-16 lg:py-24 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <p className="text-sm font-bold text-[#8CB63C] uppercase tracking-wider mb-2">Pourquoi nous choisir</p>
            <h2 className="text-3xl lg:text-4xl font-black mb-6">Un garage a taille humaine, des standards professionnels</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Chez BRL Negoce Auto, chaque vehicule est selectionne, inspecte et prepare avec le meme soin que les plus grandes concessions. La difference ? Un service personnalise et des prix justes.
            </p>
            <div className="space-y-4">
              {[
                { icon: <BadgeCheck size={20} />, title: "Vehicules certifies", desc: "Inspection multi-points sur chaque vehicule" },
                { icon: <Eye size={20} />, title: "Transparence totale", desc: "Historique complet, CT, carnet d'entretien" },
                { icon: <Heart size={20} />, title: "+750 clients satisfaits", desc: "Note de 4.8/5 basee sur les avis verifies" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#8CB63C]/20 flex items-center justify-center text-[#8CB63C] shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&h=500&fit=crop" alt="" className="rounded-xl object-cover w-full h-60 lg:h-72" />
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=500&fit=crop" alt="" className="rounded-xl object-cover w-full h-60 lg:h-72 mt-8" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// =============================================================================
// REVIEWS PREVIEW
// =============================================================================
const ReviewsPreview = ({ reviews, setCurrentPage }) => (
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#8CB63C] uppercase tracking-wider mb-2">Temoignages</p>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={5} size={20} />
            <span className="text-lg font-bold text-gray-900">{BRAND.rating}/5</span>
            <span className="text-sm text-gray-400">— Avis verifies</span>
          </div>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r, i) => (
          <Reveal key={r.id} delay={i * 100}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col">
              <StarRating rating={r.rating} />
              <p className="text-gray-600 mt-4 mb-4 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-10 h-10 bg-[#8CB63C] rounded-full flex items-center justify-center text-white font-bold text-sm">{r.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="text-center mt-10">
        <button onClick={() => { setCurrentPage('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="border-2 border-gray-200 text-gray-700 hover:border-[#8CB63C] hover:text-[#8CB63C] px-8 py-3 rounded-xl font-semibold transition-all duration-200">
          Tous les avis clients
        </button>
      </div>
    </div>
  </section>
);

// =============================================================================
// CTA SECTION
// =============================================================================
const CTASection = () => (
  <section className="py-16 lg:py-20 bg-[#8CB63C]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Reveal>
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Interesse par un vehicule ?</h2>
        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
          Contactez-nous pour obtenir plus d'informations ou planifier un essai sur place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={BRAND.phoneLink}
            className="bg-white text-[#8CB63C] hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl flex items-center gap-2">
            <Phone size={20} /> {BRAND.phone}
          </a>
          <a href={`mailto:${BRAND.email}`}
            className="bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2">
            <Mail size={20} /> Envoyer un email
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

// =============================================================================
// MAP
// =============================================================================
const MapSection = () => (
  <section className="py-16 lg:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-bold text-[#8CB63C] uppercase tracking-wider mb-2">Nous rendre visite</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">Ou nous trouver</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8CB63C]/10 flex items-center justify-center text-[#8CB63C] shrink-0"><MapPin size={18} /></div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Adresse</p>
                  <p className="text-gray-500 text-sm">{BRAND.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8CB63C]/10 flex items-center justify-center text-[#8CB63C] shrink-0"><Clock size={18} /></div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Horaires d'ouverture</p>
                  <p className="text-gray-500 text-sm">Lundi - Samedi : 9h00 - 19h00</p>
                  <p className="text-gray-400 text-xs">Dimanche : Ferme</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#8CB63C]/10 flex items-center justify-center text-[#8CB63C] shrink-0"><Phone size={18} /></div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Telephone</p>
                  <p className="text-gray-500 text-sm">{BRAND.phone}</p>
                </div>
              </div>
            </div>
            <a href={BRAND.phoneLink}
              className="inline-flex items-center gap-2 bg-[#8CB63C] hover:bg-[#6d9330] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all">
              <PhoneCall size={16} /> Prendre rendez-vous
            </a>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 h-[350px] lg:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10142.0!2d2.86!3d50.533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd3091e1fbe64d%3A0x40af13e8163c4e0!2s62138%20Billy-Berclau!5e0!3m2!1sfr!2sfr!4v1"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="BRL Negoce Auto - Billy-Berclau"
            ></iframe>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// =============================================================================
// FOOTER
// =============================================================================
const Footer = ({ setCurrentPage }) => {
  const go = (p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-brl.png" alt="BRL" className="h-11 w-11 rounded-full object-cover" />
              <div className="leading-tight">
                <span className="text-lg font-black">BRL</span>
                <span className="block text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">Negoce Auto</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Vehicules d'occasion selectionnes, revises et garantis. Votre garage de confiance a Billy-Berclau.
            </p>
            <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-lg text-sm transition-colors">
              <Facebook size={16} /> Suivez-nous
            </a>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-gray-500">Navigation</h4>
            <ul className="space-y-2.5">
              {[['Accueil','home'],['Vehicules','stock'],['A propos','about'],['Avis clients','reviews']].map(([l,p]) => (
                <li key={p}><button onClick={() => go(p)} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-gray-500">Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone size={13} /> {BRAND.phone}</li>
              <li className="flex items-center gap-2"><Mail size={13} /> {BRAND.email}</li>
              <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0" /> {BRAND.address}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-gray-500">Horaires</h4>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li className="flex justify-between"><span>Lun - Ven</span><span className="text-white font-medium">9h - 19h</span></li>
              <li className="flex justify-between"><span>Samedi</span><span className="text-white font-medium">9h - 19h</span></li>
              <li className="flex justify-between"><span>Dimanche</span><span className="text-gray-500">Ferme</span></li>
            </ul>
            <div className="mt-4 flex items-center gap-1.5">
              <StarRating rating={5} size={13} />
              <span className="text-sm font-bold text-white">{BRAND.rating}/5</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} BRL Negoce Auto — Tous droits reserves — Billy-Berclau 62138</span>
          <div className="flex items-center gap-4">
            <span>Mentions legales</span>
            <span>Politique de confidentialite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// =============================================================================
// HOME
// =============================================================================
const HomePage = ({ cars, reviews, setCurrentPage, setSelectedCar }) => (
  <>
    <HeroSection setCurrentPage={setCurrentPage} />
    <StatsBand />
    <LatestCarsSection cars={cars} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />
    <ServicesSection />
    <WhySection />
    <ReviewsPreview reviews={reviews} setCurrentPage={setCurrentPage} />
    <CTASection />
    <MapSection />
  </>
);

// =============================================================================
// STOCK PAGE — avec filtres pro
// =============================================================================
const StockPage = ({ cars, setCurrentPage, setSelectedCar }) => {
  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  let filtered = cars.filter(c => {
    const matchSearch = `${c.marque} ${c.modele} ${c.annee}`.toLowerCase().includes(search.toLowerCase());
    const matchFuel = !fuelFilter || c.carburant === fuelFilter;
    return matchSearch && matchFuel;
  });

  if (sortBy === 'prix-asc') filtered.sort((a,b) => a.prix - b.prix);
  else if (sortBy === 'prix-desc') filtered.sort((a,b) => b.prix - a.prix);
  else if (sortBy === 'km') filtered.sort((a,b) => a.km - b.km);
  else if (sortBy === 'annee') filtered.sort((a,b) => b.annee - a.annee);

  const fuels = [...new Set(cars.map(c => c.carburant))];

  return (
    <section className="pt-28 lg:pt-36 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">Nos vehicules</h1>
            <p className="text-gray-500">{filtered.length} vehicule{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
          </div>

          {/* Barre de recherche + filtres */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rechercher marque, modele, annee..."
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 focus:border-[#8CB63C] transition-all text-sm" />
              </div>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 bg-white">
                <option value="recent">Plus recents</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix decroissant</option>
                <option value="km">Kilometrage</option>
                <option value="annee">Annee</option>
              </select>
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                <Filter size={16} /> Filtres {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
            {showFilters && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                <button onClick={() => setFuelFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${!fuelFilter ? 'bg-[#8CB63C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  Tous
                </button>
                {fuels.map(f => (
                  <button key={f} onClick={() => setFuelFilter(f === fuelFilter ? '' : f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${fuelFilter === f ? 'bg-[#8CB63C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Car size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Aucun vehicule ne correspond a votre recherche.</p>
            <button onClick={() => { setSearch(''); setFuelFilter(''); }}
              className="mt-4 text-[#8CB63C] font-semibold text-sm hover:underline">Reinitialiser les filtres</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car, i) => (
              <Reveal key={car.id} delay={i * 60}>
                <CarCard car={car} onClick={() => { setSelectedCar(car); setCurrentPage('carDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// =============================================================================
// CAR DETAIL
// =============================================================================
const CarDetailPage = ({ car, setCurrentPage }) => {
  const [activeImg, setActiveImg] = useState(0);
  if (!car) return null;

  const specs = car.specsKey ? MANUFACTURER_SPECS[car.specsKey] : null;
  const identityItems = [
    { label: "Marque", value: car.marque, icon: <Car size={16} /> },
    { label: "Modele", value: car.modele, icon: <Info size={16} /> },
    { label: "Annee", value: car.annee, icon: <Calendar size={16} /> },
    { label: "Kilometrage", value: formatKm(car.km), icon: <Gauge size={16} /> },
    { label: "Energie", value: car.carburant, icon: <Fuel size={16} /> },
    { label: "Puissance", value: car.puissance, icon: <Cog size={16} /> },
    { label: "Transmission", value: car.transmission, icon: <Settings size={16} /> },
    { label: "Couleur", value: car.couleur, icon: <Palette size={16} /> },
    { label: "Proprietaires", value: car.nbProprietaires, icon: <User size={16} /> },
  ];
  if (specs) {
    identityItems.push(
      { label: "Carrosserie", value: specs.carrosserie, icon: <Car size={16} /> },
      { label: "Portes", value: specs.portes, icon: <DoorOpen size={16} /> },
      { label: "Dimensions", value: specs.dimensions, icon: <Ruler size={16} /> },
      { label: "Poids", value: specs.poids, icon: <Weight size={16} /> },
      { label: "Coffre", value: specs.coffre, icon: <FileText size={16} /> },
      { label: "Conso mixte", value: specs.consoMixte, icon: <Fuel size={16} /> },
      { label: "CO2", value: specs.co2, icon: <Leaf size={16} /> },
      { label: "Norme Euro", value: specs.normeEuro, icon: <ShieldCheck size={16} /> }
    );
  }

  return (
    <section className="pt-28 lg:pt-36 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-gray-500 hover:text-[#8CB63C] font-medium mb-6 transition-colors text-sm">
          <ArrowLeft size={16} /> Retour aux vehicules
        </button>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Gallery */}
          <Reveal>
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg mb-3 aspect-[4/3] bg-gray-100 relative">
                <img src={car.images?.[activeImg] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"}
                  alt={`${car.marque} ${car.modele}`} className="w-full h-full object-cover" />
                {car.images && car.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">{activeImg + 1}/{car.images.length}</div>
                )}
              </div>
              {car.images && car.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {car.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${i === activeImg ? 'border-[#8CB63C] shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={150}>
            <div>
              <div className="flex items-start justify-between mb-1">
                <h1 className="text-2xl lg:text-3xl font-black text-gray-900">{car.marque} {car.modele}</h1>
                <Badge variant="green"><ShieldCheck size={12} /> Garanti</Badge>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={13} /> {car.annee}</span>
                <span className="flex items-center gap-1"><Gauge size={13} /> {formatKm(car.km)}</span>
                <span className="flex items-center gap-1"><Fuel size={13} /> {car.carburant}</span>
                <span className="flex items-center gap-1"><Cog size={13} /> {car.transmission}</span>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
                <p className="text-3xl font-black text-[#8CB63C]">{formatPrice(car.prix)}</p>
                <p className="text-xs text-gray-400 mt-1">Garantie 3 mois incluse — Demarches carte grise disponibles</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{car.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={BRAND.phoneLink}
                  className="flex-1 min-w-[180px] bg-[#8CB63C] hover:bg-[#6d9330] text-white px-5 py-3.5 rounded-xl font-bold text-center transition-all hover:shadow-lg hover:shadow-[#8CB63C]/25 flex items-center justify-center gap-2 text-sm">
                  <Phone size={16} /> Appeler
                </a>
                <a href={`mailto:${BRAND.email}?subject=Interet pour ${car.marque} ${car.modele} ${car.annee}`}
                  className="flex-1 min-w-[180px] border-2 border-gray-200 hover:border-[#8CB63C] text-gray-700 hover:text-[#8CB63C] px-5 py-3.5 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 text-sm">
                  <Mail size={16} /> Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Fiche d'identite */}
        <Reveal>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#8CB63C] px-6 py-4 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg"><FileText size={18} className="text-white" /></div>
              <div>
                <h2 className="text-base font-black text-white tracking-wide uppercase">Fiche technique</h2>
                <p className="text-xs text-white/70">{car.marque} {car.modele} — {car.annee}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {identityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-1.5 bg-[#8CB63C]/10 rounded-md text-[#8CB63C] shrink-0">{item.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// =============================================================================
// ABOUT
// =============================================================================
const AboutPage = () => (
  <section className="pt-28 lg:pt-36 pb-16 bg-white min-h-screen">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div className="text-center mb-14">
          <Badge variant="green"><Award size={14} /> Professionnel de l'automobile</Badge>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mt-4 mb-4">A propos de BRL Negoce Auto</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Garage de confiance pour l'achat de vehicules d'occasion a Billy-Berclau et dans tout le Pas-de-Calais.
          </p>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <Reveal>
          <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=600&fit=crop"
            alt="Garage BRL Negoce Auto" className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover" />
        </Reveal>
        <Reveal delay={200}>
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Notre histoire</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BRL Negoce Auto est un garage specialise dans la vente de vehicules d'occasion selectionnes avec soin. Implante a Billy-Berclau, nous mettons un point d'honneur a proposer des vehicules de qualite a des prix justes.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Avec plus de 750 ventes realisees et une note de 4.8/5 sur les avis clients, notre reputation est notre meilleure carte de visite.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nous accompagnons chaque client dans son projet, de la selection du vehicule a la remise des cles, en passant par les demarches administratives.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Nos valeurs</h2>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <Heart size={24} />, title: "Confiance", desc: "Des relations basees sur l'honnetete et la transparence totale." },
          { icon: <Eye size={24} />, title: "Transparence", desc: "Historique complet, controle technique, aucune mauvaise surprise." },
          { icon: <Award size={24} />, title: "Qualite", desc: "Vehicules soigneusement selectionnes et revises par nos soins." }
        ].map((v, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="inline-flex p-3 bg-[#8CB63C]/10 rounded-xl text-[#8CB63C] mb-4">{v.icon}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="bg-[#8CB63C] rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-6">Nos coordonnees</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Phone size={20} />, text: BRAND.phone },
              { icon: <Mail size={20} />, text: BRAND.email },
              { icon: <MapPin size={20} />, text: BRAND.address },
            ].map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-xl">{c.icon}</div>
                <p className="font-semibold text-sm">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// =============================================================================
// REVIEWS PAGE
// =============================================================================
const ReviewsPage = ({ reviews, setReviews }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setReviews(prev => [{ id: Date.now(), name: name.trim(), rating, text: text.trim(), date: new Date().toISOString().split('T')[0] }, ...prev]);
    setName(''); setText(''); setRating(5); setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="pt-28 lg:pt-36 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">Avis clients</h1>
            <div className="flex items-center justify-center gap-2 mb-1">
              <StarRating rating={5} size={22} />
              <span className="text-xl font-bold text-gray-900">{BRAND.rating}/5</span>
            </div>
            <p className="text-gray-500 text-sm">{reviews.length} avis verifies</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><MessageSquare size={18} /> Laisser un avis</h2>
            {submitted && (
              <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2 text-sm border border-green-200">
                <CheckCircle2 size={16} /> Merci pour votre avis !
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jean D." required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 focus:border-[#8CB63C] transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => (
                      <button key={i} type="button" onClick={() => setRating(i)} className="transition-transform hover:scale-110">
                        <Star size={28} className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre avis</label>
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Partagez votre experience..." required rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 focus:border-[#8CB63C] transition-all resize-none text-sm" />
              </div>
              <button type="submit" className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-8 py-3 rounded-xl font-bold transition-all text-sm">
                Publier mon avis
              </button>
            </form>
          </div>
        </Reveal>

        <div className="space-y-4">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8CB63C] rounded-full flex items-center justify-center text-white font-bold text-sm">{r.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// ADMIN
// =============================================================================
const AdminPage = ({ cars, setCars }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    marque: '', modele: '', annee: '', prix: '', km: '',
    carburant: 'Essence', transmission: 'Manuelle', puissance: '',
    couleur: '', nbProprietaires: 1, description: '',
    portes: 5, carrosserie: 'Citadine',
    dimensions: '', poids: '', coffre: '', consoMixte: '',
    co2: '', normeEuro: 'Euro 5'
  });
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'brlnegoce62138!') {
      setLoggedIn(true); setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleImageUpload = (files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleImageUpload(e.dataTransfer.files); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.marque || !form.modele || !form.annee || !form.prix) return;
    const specsKey = `${form.marque.toLowerCase()}_${form.modele.toLowerCase()}_${form.annee}`;
    if (form.dimensions || form.poids || form.coffre || form.consoMixte || form.co2) {
      MANUFACTURER_SPECS[specsKey] = {
        carrosserie: form.carrosserie, portes: parseInt(form.portes) || 5,
        dimensions: form.dimensions, poids: form.poids, coffre: form.coffre,
        consoMixte: form.consoMixte, co2: form.co2, normeEuro: form.normeEuro
      };
    }
    const newCar = {
      id: Date.now(), marque: form.marque, modele: form.modele,
      annee: parseInt(form.annee), prix: parseInt(form.prix), km: parseInt(form.km) || 0,
      carburant: form.carburant, transmission: form.transmission, puissance: form.puissance,
      couleur: form.couleur, nbProprietaires: parseInt(form.nbProprietaires) || 1,
      description: form.description,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"],
      specsKey: (form.dimensions || form.poids) ? specsKey : null
    };
    setCars(prev => [newCar, ...prev]);
    setForm({ marque: '', modele: '', annee: '', prix: '', km: '', carburant: 'Essence', transmission: 'Manuelle', puissance: '', couleur: '', nbProprietaires: 1, description: '', portes: 5, carrosserie: 'Citadine', dimensions: '', poids: '', coffre: '', consoMixte: '', co2: '', normeEuro: 'Euro 5' });
    setImages([]); setShowForm(false);
  };

  const deleteCar = (id) => { if (window.confirm('Supprimer ce vehicule ?')) setCars(prev => prev.filter(c => c.id !== id)); };

  if (!loggedIn) {
    return (
      <section className="pt-28 lg:pt-36 pb-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-[#8CB63C]/10 rounded-xl mb-4"><Lock size={24} className="text-[#8CB63C]" /></div>
              <h1 className="text-2xl font-black text-gray-900">Administration</h1>
              <p className="text-sm text-gray-500 mt-1">Acces reserve</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2 border border-red-200"><X size={16} /> {error}</div>}
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 focus:border-[#8CB63C] transition-all" />
              <button type="submit" className="w-full bg-[#8CB63C] hover:bg-[#6d9330] text-white py-3 rounded-xl font-bold transition-all">Se connecter</button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 lg:pt-36 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900">Gestion du stock</h1>
            <p className="text-gray-500 text-sm">{cars.length} vehicule(s) en stock</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowForm(!showForm)}
              className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm">
              {showForm ? <X size={16} /> : <Plus size={16} />}
              {showForm ? 'Annuler' : 'Ajouter'}
            </button>
            <button onClick={() => setLoggedIn(false)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all text-sm font-medium">Deconnexion</button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Nouveau vehicule</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Informations generales</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'marque', label: 'Marque *', ph: 'Renault', type: 'text' },
                    { key: 'modele', label: 'Modele *', ph: 'Clio', type: 'text' },
                    { key: 'annee', label: 'Annee *', ph: '2020', type: 'number' },
                    { key: 'prix', label: 'Prix (EUR) *', ph: '5990', type: 'number' },
                    { key: 'km', label: 'Kilometres', ph: '80000', type: 'number' },
                    { key: 'puissance', label: 'Puissance', ph: '75 ch', type: 'text' },
                    { key: 'couleur', label: 'Couleur', ph: 'Gris', type: 'text' },
                    { key: 'nbProprietaires', label: 'Proprietaires', ph: '1', type: 'number' }
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.ph} required={f.label.includes('*')}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 focus:border-[#8CB63C] text-sm" />
                    </div>
                  ))}
                  {[['Carburant','carburant',['Essence','Diesel','Hybride','Electrique','GPL']],['Transmission','transmission',['Manuelle','Automatique']]].map(([label,key,opts]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                      <select value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 text-sm">
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Specs constructeur (optionnel)</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[['Carrosserie','carrosserie',['Citadine','Berline','SUV','Break','Monospace','Coupe','Cabriolet','Utilitaire']],['Portes','portes',['3','5']],['Norme Euro','normeEuro',['Euro 3','Euro 4','Euro 5','Euro 6','Euro 6d','Euro 7']]].map(([label,key,opts]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                      <select value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 text-sm">
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  {[['Dimensions','dimensions','4200 x 1800 x 1500 mm'],['Poids','poids','1100 kg'],['Coffre','coffre','350 L'],['Conso mixte','consoMixte','5.5 L/100km'],['CO2','co2','129 g/km']].map(([label,key,ph]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                      <input type="text" value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={ph} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos — illimite */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Photos <span className="text-gray-300 font-normal">(ajoutez autant de photos que vous voulez)</span></h3>
                <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragOver ? 'border-[#8CB63C] bg-[#8CB63C]/5' : 'border-gray-300 hover:border-gray-400'}`}>
                  <Upload size={28} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Glissez vos photos ici ou</p>
                  <label className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                    Choisir des fichiers
                    <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e.target.files)} className="hidden" />
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 mb-2">{images.length} photo(s) ajoutee(s)</p>
                    <div className="flex flex-wrap gap-2">
                      {images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} alt="" className="w-20 h-16 object-cover rounded-lg border border-gray-200" />
                          <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Decrivez le vehicule en detail..." rows={4}
                  className="w-full px-3 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8CB63C]/30 resize-none text-sm" />
              </div>

              <button type="submit"
                className="bg-[#8CB63C] hover:bg-[#6d9330] text-white px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg text-sm">
                Ajouter le vehicule
              </button>
            </form>
          </div>
        )}

        <div className="space-y-3">
          {cars.map(car => (
            <div key={car.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <img src={car.images?.[0] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=150&fit=crop"}
                alt={`${car.marque} ${car.modele}`} className="w-24 h-18 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm">{car.marque} {car.modele}</h3>
                <p className="text-xs text-gray-500">{car.annee} — {formatKm(car.km)} — {car.carburant}</p>
                {car.images && <p className="text-xs text-gray-400 mt-0.5">{car.images.length} photo(s)</p>}
              </div>
              <div className="text-right shrink-0">
                <p className="text-base font-black text-[#8CB63C]">{formatPrice(car.prix)}</p>
                <button onClick={() => deleteCar(car.id)} className="text-gray-300 hover:text-red-500 transition-colors mt-1" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// APP
// =============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState(() => loadData('brl_cars', INITIAL_CARS));
  const [reviews, setReviews] = useState(() => loadData('brl_reviews', INITIAL_REVIEWS));
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => { saveData('brl_cars', cars); }, [cars]);
  useEffect(() => { saveData('brl_reviews', reviews); }, [reviews]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage cars={cars} reviews={reviews} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
      case 'stock': return <StockPage cars={cars} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
      case 'carDetail': return <CarDetailPage car={selectedCar} setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'reviews': return <ReviewsPage reviews={reviews} setReviews={setReviews} />;
      case 'admin': return <AdminPage cars={cars} setCars={setCars} />;
      default: return <HomePage cars={cars} reviews={reviews} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} setShowAdmin={setShowAdmin} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
