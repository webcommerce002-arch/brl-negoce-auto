import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Camera,
  ArrowRight,
  ChevronRight,
  Star,
  Fuel,
  Gauge,
  Calendar,
  Facebook,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  X,
  ShieldCheck,
  Award,
  Car,
  Search,
  Mail,
  ChevronLeft,
  Lock,
  Upload,
  Image as ImageIcon,
  Menu,
  FileText,
  CreditCard,
  Handshake,
  Users,
  Heart,
  Eye,
  ArrowLeft,
  Settings,
  Palette,
  Weight,
  Ruler,
  Leaf,
  DoorOpen,
  User,
  Cog,
  Info,
  MessageSquare
} from 'lucide-react';

// --- CONFIGURATION ---
const BRAND = {
  name: "BRL NEGOCE AUTO",
  phone: "06 31 53 10 34",
  phoneLink: "tel:+33631531034",
  email: "brl.negoce@gmail.com",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  address: "6 rue Jules Ferry, Billy-Berclau 62138",
  rating: 4.8,
  totalSales: 750,
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.5!2d2.861!3d50.533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd2!2sBilly-Berclau!5e0!3m2!1sfr!2sfr!4v1"
};

const COLORS = {
  primary: "#bef264",
  accent: "#bef264",
  dark: "#0a0a0a",
  darker: "#111111",
  lightSection: "#111111",
  darkText: "#ffffff",
  grayText: "#94a3b8",
  border: "rgba(255,255,255,0.1)"
};

// --- MANUFACTURER SPECS ---
const MANUFACTURER_SPECS = {
  "citroen_c3_2011": {
    carrosserie: "Citadine",
    portes: 5,
    dimensions: "3941 x 1728 x 1524 mm",
    poids: "1050 kg",
    coffre: "300 L",
    consoMixte: "5.5 L/100km",
    co2: "129 g/km",
    normeEuro: "Euro 5"
  },
  "renault_twingo_2014": {
    carrosserie: "Citadine",
    portes: 5,
    dimensions: "3686 x 1654 x 1470 mm",
    poids: "1025 kg",
    coffre: "230 L",
    consoMixte: "5.4 L/100km",
    co2: "119 g/km",
    normeEuro: "Euro 5"
  }
};

// --- INITIAL DATA ---
const INITIAL_CARS = [
  {
    id: 1,
    marque: "Citroen",
    modele: "C3",
    annee: 2011,
    prix: 6290,
    km: 98000,
    carburant: "Essence",
    transmission: "Manuelle",
    puissance: "60 ch",
    couleur: "Gris",
    nbProprietaires: 2,
    description: "Citroen C3 en tres bon etat general. Entretien suivi avec carnet. Climatisation, direction assistee, vitres electriques. Ideale pour la ville comme pour les trajets quotidiens. Controle technique OK. Vehicule non fumeur.",
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop"
    ],
    specsKey: "citroen_c3_2011"
  },
  {
    id: 2,
    marque: "Renault",
    modele: "Twingo",
    annee: 2014,
    prix: 3490,
    km: 115000,
    carburant: "Essence",
    transmission: "Manuelle",
    puissance: "75 ch",
    couleur: "Blanc",
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
  {
    id: 1,
    name: "Mickael B.",
    rating: 5,
    text: "Excellent service ! Vehicule conforme a la description, equipe tres professionnelle et a l'ecoute. Je recommande vivement BRL Negoce Auto.",
    date: "2025-11-15"
  },
  {
    id: 2,
    name: "Sandrine L.",
    rating: 5,
    text: "Tres satisfaite de mon achat. La voiture etait en parfait etat, le prix etait juste. Merci pour la transparence et la gentillesse !",
    date: "2025-12-02"
  },
  {
    id: 3,
    name: "Kevin D.",
    rating: 4,
    text: "Bon rapport qualite-prix, equipe sympa et reactive. La carte grise a ete faite rapidement. Je reviendrai pour mon prochain achat.",
    date: "2026-01-20"
  }
];

// --- HELPER ---
const formatPrice = (p) => new Intl.NumberFormat('fr-FR').format(p) + " \u20AC";
const formatKm = (k) => new Intl.NumberFormat('fr-FR').format(k) + " km";

const StarRating = ({ rating, size = 16 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={size}
        className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ))}
  </div>
);

// --- SCROLL ANIMATION HOOK ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const RevealSection = ({ children, className = "", delay = 0 }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// =============================================================================
// NAVBAR
// =============================================================================
const Navbar = ({ currentPage, setCurrentPage, setShowAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'stock', label: 'Stock' },
    { id: 'about', label: 'A Propos' },
    { id: 'reviews', label: 'Avis' }
  ];

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-[#0a0a0a]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#bef264] flex items-center justify-center">
              <Car size={22} className="text-black" />
            </div>
            <div className="leading-tight">
              <span className="text-xl font-extrabold text-[#bef264] tracking-tight">BRL</span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-widest uppercase">Negoce Auto</span>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? 'bg-[#bef264]/10 text-[#bef264]'
                    : 'text-gray-300 hover:text-[#bef264] hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#bef264] transition-colors">
              <Phone size={16} />
              <span className="font-medium">{BRAND.phone}</span>
            </a>
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#bef264]/20">
              Nous appeler
            </a>
            <button
              onClick={() => { setShowAdmin(true); setCurrentPage('admin'); setMobileOpen(false); }}
              className="p-2 rounded-lg text-slate-500 hover:text-[#bef264] hover:bg-white/10 transition-colors"
              title="Admin"
            >
              <Lock size={16} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/10">
            {mobileOpen ? <X size={24} className="text-slate-200" /> : <Menu size={24} className="text-slate-200" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === link.id ? 'bg-[#bef264]/10 text-[#bef264]' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <hr className="my-2" />
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 px-4 py-3 text-[#bef264] font-semibold text-sm">
              <Phone size={16} /> {BRAND.phone}
            </a>
            <button
              onClick={() => { setShowAdmin(true); setCurrentPage('admin'); setMobileOpen(false); }}
              className="flex items-center gap-2 px-4 py-3 text-slate-500 text-sm"
            >
              <Lock size={14} /> Administration
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// =============================================================================
// HERO
// =============================================================================
const HeroSection = ({ setCurrentPage }) => (
  <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <RevealSection>
          <div>
            <div className="inline-flex items-center gap-2 bg-[#bef264]/10 text-[#bef264] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShieldCheck size={16} />
              Garage de confiance depuis des annees
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Votre partenaire <span className="text-[#bef264]">auto</span> de confiance a{' '}
              <span className="text-[#bef264]">Billy-Berclau</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg">
              Des vehicules d'occasion selectionnes, revises et garantis. Transparence, qualite et prix justes.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#bef264]/20 flex items-center gap-2"
              >
                Voir nos vehicules <ArrowRight size={18} />
              </button>
              <a
                href={BRAND.phoneLink}
                className="border-2 border-white/20 text-[#bef264] hover:bg-[#bef264] hover:text-black px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center gap-2"
              >
                <Phone size={18} /> Nous appeler
              </a>
            </div>
          </div>
        </RevealSection>
        <RevealSection delay={200}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#bef264]/20 to-[#bef264]/10 rounded-3xl blur-2xl"></div>
            <img
              src="https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"
              alt="Voiture d'occasion BRL Negoce Auto"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">A partir de</p>
                <p className="text-2xl font-extrabold text-[#bef264]">3 490 EUR</p>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} className="fill-yellow-400" />
                <span className="font-bold text-white">{BRAND.rating}/5</span>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </div>
  </section>
);

// =============================================================================
// STATS BAND
// =============================================================================
const StatsBand = () => {
  const stats = [
    { icon: <Car size={24} />, value: "+750", label: "Ventes realisees" },
    { icon: <Star size={24} />, value: "4.8/5", label: "Avis clients" },
    { icon: <ShieldCheck size={24} />, value: "3 mois", label: "Garantie incluse" },
    { icon: <FileText size={24} />, value: "Offerte", label: "Carte grise" }
  ];

  return (
    <section className="bg-[#bef264] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="flex items-center gap-4 text-black">
                <div className="p-3 bg-black/10 rounded-xl">{s.icon}</div>
                <div>
                  <p className="text-2xl font-extrabold">{s.value}</p>
                  <p className="text-sm text-black/60">{s.label}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// CAR CARD
// =============================================================================
const CarCard = ({ car, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden shadow-none hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
  >
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={car.images?.[0] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=450&fit=crop"}
        alt={`${car.marque} ${car.modele}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 bg-[#bef264] text-black px-3 py-1 rounded-lg text-sm font-bold">
        {formatPrice(car.prix)}
      </div>
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-slate-200 px-3 py-1 rounded-lg text-xs font-medium">
        {car.annee}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-white mb-2">
        {car.marque} {car.modele}
      </h3>
      <div className="flex flex-wrap gap-3 text-sm text-slate-400">
        <span className="flex items-center gap-1"><Gauge size={14} /> {formatKm(car.km)}</span>
        <span className="flex items-center gap-1"><Fuel size={14} /> {car.carburant}</span>
        <span className="flex items-center gap-1"><Cog size={14} /> {car.transmission}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">{car.puissance}</span>
        <span className="text-[#bef264] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          Voir details <ChevronRight size={14} />
        </span>
      </div>
    </div>
  </div>
);

// =============================================================================
// LATEST CARS SECTION
// =============================================================================
const LatestCarsSection = ({ cars, setCurrentPage, setSelectedCar }) => (
  <section className="py-16 lg:py-24 bg-[#111]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Derniers arrivages</h2>
          <p className="text-slate-400 max-w-md mx-auto">Decouvrez nos vehicules d'occasion selectionnes et revises avec soin.</p>
        </div>
      </RevealSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.slice(0, 6).map((car, i) => (
          <RevealSection key={car.id} delay={i * 100}>
            <CarCard
              car={car}
              onClick={() => { setSelectedCar(car); setCurrentPage('carDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </RevealSection>
        ))}
      </div>
      {cars.length > 6 && (
        <div className="text-center mt-10">
          <button
            onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Voir tout le stock
          </button>
        </div>
      )}
    </div>
  </section>
);

// =============================================================================
// SERVICES SECTION
// =============================================================================
const ServicesSection = () => {
  const services = [
    { icon: <ShieldCheck size={28} />, title: "Garantie 3 mois", desc: "Tous nos vehicules sont couverts par une garantie de 3 mois minimum, pour votre tranquillite." },
    { icon: <FileText size={28} />, title: "Carte grise offerte", desc: "Nous nous occupons de toutes les demarches administratives. Carte grise incluse dans le prix." },
    { icon: <Handshake size={28} />, title: "Depot-vente", desc: "Vous souhaitez vendre votre vehicule ? Confiez-le-nous, on s'occupe de tout." },
    { icon: <CreditCard size={28} />, title: "Financement", desc: "Solutions de financement adaptees a votre budget. Simulation gratuite sur place." }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Nos services</h2>
            <p className="text-slate-400 max-w-md mx-auto">Un accompagnement complet, de l'achat a la mise en route.</p>
          </div>
        </RevealSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div className="bg-[#111] rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/10">
                <div className="inline-flex p-4 bg-[#bef264]/10 rounded-2xl text-[#bef264] mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// REVIEWS PREVIEW
// =============================================================================
const ReviewsPreview = ({ reviews, setCurrentPage }) => (
  <section className="py-16 lg:py-24 bg-[#111]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <StarRating rating={5} size={20} />
            <span className="text-lg font-bold text-white">{BRAND.rating}/5</span>
          </div>
          <p className="text-slate-400">Avis verifies de nos clients satisfaits</p>
        </div>
      </RevealSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((r, i) => (
          <RevealSection key={r.id} delay={i * 100}>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-none border border-white/10 hover:shadow-md transition-all">
              <StarRating rating={r.rating} />
              <p className="text-slate-300 mt-4 mb-4 text-sm leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#bef264] rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{r.name}</p>
                  <p className="text-xs text-slate-500">{new Date(r.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={() => { setCurrentPage('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="border-2 border-white/20 text-[#bef264] hover:bg-[#bef264] hover:text-black px-8 py-3 rounded-xl font-semibold transition-all duration-200"
        >
          Voir tous les avis
        </button>
      </div>
    </div>
  </section>
);

// =============================================================================
// CTA SECTION
// =============================================================================
const CTASection = () => (
  <section className="py-16 lg:py-24 bg-[#0a0a0a]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <RevealSection>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
          Interesse par un vehicule ?
        </h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto text-lg">
          Contactez-nous pour plus d'informations ou pour planifier un essai. Nous sommes a votre disposition.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={BRAND.phoneLink}
            className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:shadow-[#bef264]/20 flex items-center gap-2"
          >
            <Phone size={20} /> {BRAND.phone}
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2"
          >
            <Mail size={20} /> Envoyer un email
          </a>
        </div>
      </RevealSection>
    </div>
  </section>
);

// =============================================================================
// MAP SECTION
// =============================================================================
const MapSection = () => (
  <section className="py-16 lg:py-24 bg-[#111]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Ou nous trouver</h2>
          <p className="text-slate-400 flex items-center justify-center gap-2">
            <MapPin size={16} /> {BRAND.address}
          </p>
        </div>
      </RevealSection>
      <RevealSection>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10142.0!2d2.86!3d50.533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd3091e1fbe64d%3A0x40af13e8163c4e0!2s62138%20Billy-Berclau!5e0!3m2!1sfr!2sfr!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BRL Negoce Auto - Billy-Berclau"
          ></iframe>
        </div>
      </RevealSection>
    </div>
  </section>
);

// =============================================================================
// FOOTER
// =============================================================================
const Footer = ({ setCurrentPage }) => {
  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#bef264] flex items-center justify-center">
                <Car size={22} className="text-black" />
              </div>
              <div className="leading-tight">
                <span className="text-xl font-extrabold">BRL</span>
                <span className="block text-[10px] font-medium text-slate-500 tracking-widest uppercase">Negoce Auto</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre specialiste en vehicules d'occasion a Billy-Berclau. Qualite, transparence et prix justes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-slate-400">Navigation</h4>
            <ul className="space-y-2">
              {[['Accueil', 'home'], ['Stock', 'stock'], ['A Propos', 'about'], ['Avis', 'reviews']].map(([label, page]) => (
                <li key={page}>
                  <button onClick={() => navigate(page)} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-slate-400">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Phone size={14} /> {BRAND.phone}</li>
              <li className="flex items-center gap-2"><Mail size={14} /> {BRAND.email}</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {BRAND.address}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-slate-400">Suivez-nous</h4>
            <a
              href={BRAND.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-sm transition-colors"
            >
              <Facebook size={18} /> Facebook
            </a>
            <div className="mt-4">
              <div className="flex items-center gap-1 mb-1">
                <StarRating rating={5} size={14} />
                <span className="text-sm font-bold">{BRAND.rating}/5</span>
              </div>
              <p className="text-xs text-slate-500">Note moyenne clients</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} BRL Negoce Auto - Tous droits reserves - Billy-Berclau 62138
        </div>
      </div>
    </footer>
  );
};

// =============================================================================
// HOME PAGE
// =============================================================================
const HomePage = ({ cars, reviews, setCurrentPage, setSelectedCar }) => (
  <>
    <HeroSection setCurrentPage={setCurrentPage} />
    <StatsBand />
    <LatestCarsSection cars={cars} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />
    <ServicesSection />
    <ReviewsPreview reviews={reviews} setCurrentPage={setCurrentPage} />
    <CTASection />
    <MapSection />
  </>
);

// =============================================================================
// STOCK PAGE
// =============================================================================
const StockPage = ({ cars, setCurrentPage, setSelectedCar }) => {
  const [search, setSearch] = useState('');
  const filtered = cars.filter(c =>
    `${c.marque} ${c.modele} ${c.annee}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-[#111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Notre stock</h1>
            <p className="text-slate-400 mb-6">Tous nos vehicules disponibles a la vente</p>
            <div className="max-w-md mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher un vehicule..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all"
              />
            </div>
          </div>
        </RevealSection>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Car size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Aucun vehicule trouve.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((car, i) => (
              <RevealSection key={car.id} delay={i * 80}>
                <CarCard
                  car={car}
                  onClick={() => { setSelectedCar(car); setCurrentPage('carDetail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                />
              </RevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// =============================================================================
// CAR DETAIL PAGE
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
      { label: "Dimensions (L x l x h)", value: specs.dimensions, icon: <Ruler size={16} /> },
      { label: "Poids a vide", value: specs.poids, icon: <Weight size={16} /> },
      { label: "Volume coffre", value: specs.coffre, icon: <FileText size={16} /> },
      { label: "Consommation mixte", value: specs.consoMixte, icon: <Fuel size={16} /> },
      { label: "Emissions CO2", value: specs.co2, icon: <Leaf size={16} /> },
      { label: "Norme Euro", value: specs.normeEuro, icon: <ShieldCheck size={16} /> }
    );
  }

  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-[#111] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => { setCurrentPage('stock'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-[#bef264] hover:text-[#a8d84e] font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Retour au stock
        </button>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Gallery */}
          <RevealSection>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[4/3] bg-[#1a1a1a]">
                <img
                  src={car.images?.[activeImg] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"}
                  alt={`${car.marque} ${car.modele}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {car.images && car.images.length > 1 && (
                <div className="flex gap-3">
                  {car.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? 'border-[#bef264] shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </RevealSection>

          {/* Info */}
          <RevealSection delay={200}>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                {car.marque} {car.modele}
              </h1>
              <p className="text-slate-400 mb-4 flex items-center gap-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {car.annee}</span>
                <span className="flex items-center gap-1"><Gauge size={14} /> {formatKm(car.km)}</span>
                <span className="flex items-center gap-1"><Fuel size={14} /> {car.carburant}</span>
              </p>
              <div className="text-4xl font-extrabold text-[#bef264] mb-6">{formatPrice(car.prix)}</div>

              <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/10 shadow-none mb-6">
                <h3 className="font-bold text-white mb-2">Description</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{car.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={BRAND.phoneLink}
                  className="flex-1 min-w-[200px] bg-[#bef264] hover:bg-[#a8d84e] text-black px-6 py-4 rounded-2xl font-bold text-center transition-all hover:shadow-xl hover:shadow-[#bef264]/20 flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Nous contacter
                </a>
                <a
                  href={`mailto:${BRAND.email}?subject=Interet pour ${car.marque} ${car.modele} ${car.annee}`}
                  className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-6 py-4 rounded-2xl font-bold text-center transition-all flex items-center justify-center gap-2"
                >
                  <Mail size={18} /> Email
                </a>
              </div>
            </div>
          </RevealSection>
        </div>

        {/* FICHE D'IDENTITE */}
        <RevealSection>
          <div className="bg-[#1a1a1a] rounded-2xl border-2 border-white/10 shadow-lg overflow-hidden">
            <div className="bg-[#bef264] px-6 py-4 flex items-center gap-3">
              <div className="p-2 bg-black/20 rounded-lg">
                <FileText size={20} className="text-black" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-black tracking-wide">FICHE D'IDENTITE DU VEHICULE</h2>
                <p className="text-xs text-black/60">Carte technique - {car.marque} {car.modele} {car.annee}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {identityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#111] rounded-xl border border-white/10">
                    <div className="p-2 bg-[#bef264]/10 rounded-lg text-[#bef264] shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm font-semibold text-white truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111] px-6 py-3 text-xs text-slate-500 text-center border-t border-white/10">
              Donnees constructeur indicatives - BRL Negoce Auto - {BRAND.phone}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};

// =============================================================================
// ABOUT PAGE
// =============================================================================
const AboutPage = () => (
  <section className="pt-24 lg:pt-32 pb-16 bg-[#0a0a0a] min-h-screen">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealSection>
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">A propos de BRL Negoce Auto</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Votre garage de confiance pour l'achat de vehicules d'occasion a Billy-Berclau et ses environs.
          </p>
        </div>
      </RevealSection>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <RevealSection>
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-[#1a1a1a]">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=600&fit=crop"
              alt="Garage BRL Negoce Auto"
              className="w-full h-full object-cover"
            />
          </div>
        </RevealSection>
        <RevealSection delay={200}>
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-4">Notre histoire</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              BRL Negoce Auto est un garage specialise dans la vente de vehicules d'occasion selectionnes avec soin. Implante a Billy-Berclau, nous mettons un point d'honneur a proposer des vehicules de qualite a des prix justes.
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              Avec plus de 750 ventes realisees et une note de 4.8/5 sur les avis clients, notre reputation est notre meilleure carte de visite. Chaque vehicule est minutieusement inspecte et revise avant mise en vente.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Nous accompagnons chaque client dans son projet, de la selection du vehicule a la remise des cles, en passant par les demarches administratives.
            </p>
          </div>
        </RevealSection>
      </div>

      {/* Values */}
      <RevealSection>
        <h2 className="text-2xl font-extrabold text-white text-center mb-8">Nos valeurs</h2>
      </RevealSection>
      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <Heart size={28} />, title: "Confiance", desc: "Des relations basees sur l'honnetete et la transparence totale." },
          { icon: <Eye size={28} />, title: "Transparence", desc: "Historique complet, controle technique, aucune mauvaise surprise." },
          { icon: <Award size={28} />, title: "Qualite", desc: "Vehicules soigneusement selectionnes et revises par nos soins." }
        ].map((v, i) => (
          <RevealSection key={i} delay={i * 100}>
            <div className="text-center p-6 bg-[#111] rounded-2xl border border-white/10">
              <div className="inline-flex p-4 bg-[#bef264]/10 rounded-2xl text-[#bef264] mb-4">{v.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-slate-400">{v.desc}</p>
            </div>
          </RevealSection>
        ))}
      </div>

      {/* Contact info */}
      <RevealSection>
        <div className="bg-[#bef264] rounded-2xl p-8 text-black text-center">
          <h2 className="text-2xl font-extrabold mb-6">Nos coordonnees</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-black/10 rounded-xl"><Phone size={22} /></div>
              <p className="font-semibold">{BRAND.phone}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-black/10 rounded-xl"><Mail size={22} /></div>
              <p className="font-semibold text-sm">{BRAND.email}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-black/10 rounded-xl"><MapPin size={22} /></div>
              <p className="font-semibold text-sm">{BRAND.address}</p>
            </div>
          </div>
        </div>
      </RevealSection>
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
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    setName('');
    setText('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-[#111] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Avis clients</h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <StarRating rating={5} size={22} />
              <span className="text-xl font-bold text-white">{BRAND.rating}/5</span>
            </div>
            <p className="text-slate-400">{reviews.length} avis</p>
          </div>
        </RevealSection>

        {/* Form */}
        <RevealSection>
          <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-none border border-white/10 mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageSquare size={20} /> Laisser un avis
            </h2>
            {submitted && (
              <div className="bg-green-900/30 text-green-400 px-4 py-3 rounded-xl mb-4 flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} /> Merci pour votre avis !
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Votre nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jean D."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Note</label>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Votre avis</label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Partagez votre experience..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-3 rounded-xl font-semibold transition-all"
              >
                Publier mon avis
              </button>
            </form>
          </div>
        </RevealSection>

        {/* Reviews list */}
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <RevealSection key={r.id} delay={i * 80}>
              <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-none border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#bef264] rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{r.name}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================================================
// ADMIN PAGE
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
    if (password === 'Brlnegoce62138!') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.marque || !form.modele || !form.annee || !form.prix) return;

    const specsKey = `${form.marque.toLowerCase()}_${form.modele.toLowerCase()}_${form.annee}`;

    // Add manufacturer specs if provided
    if (form.dimensions || form.poids || form.coffre || form.consoMixte || form.co2) {
      MANUFACTURER_SPECS[specsKey] = {
        carrosserie: form.carrosserie,
        portes: parseInt(form.portes) || 5,
        dimensions: form.dimensions,
        poids: form.poids,
        coffre: form.coffre,
        consoMixte: form.consoMixte,
        co2: form.co2,
        normeEuro: form.normeEuro
      };
    }

    const newCar = {
      id: Date.now(),
      marque: form.marque,
      modele: form.modele,
      annee: parseInt(form.annee),
      prix: parseInt(form.prix),
      km: parseInt(form.km) || 0,
      carburant: form.carburant,
      transmission: form.transmission,
      puissance: form.puissance,
      couleur: form.couleur,
      nbProprietaires: parseInt(form.nbProprietaires) || 1,
      description: form.description,
      images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"],
      specsKey: (form.dimensions || form.poids) ? specsKey : null
    };

    setCars(prev => [newCar, ...prev]);
    setForm({
      marque: '', modele: '', annee: '', prix: '', km: '',
      carburant: 'Essence', transmission: 'Manuelle', puissance: '',
      couleur: '', nbProprietaires: 1, description: '',
      portes: 5, carrosserie: 'Citadine',
      dimensions: '', poids: '', coffre: '', consoMixte: '',
      co2: '', normeEuro: 'Euro 5'
    });
    setImages([]);
    setShowForm(false);
  };

  const deleteCar = (id) => {
    if (window.confirm('Supprimer ce vehicule ?')) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  // Login screen
  if (!loggedIn) {
    return (
      <section className="pt-24 lg:pt-32 pb-16 bg-[#111] min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-lg border border-white/10">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-[#bef264]/10 rounded-2xl mb-4">
                <Lock size={28} className="text-[#bef264]" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">Administration</h1>
              <p className="text-sm text-slate-400 mt-1">Acces reserve au gerant</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-900/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <X size={16} /> {error}
                </div>
              )}
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all"
              />
              <button type="submit" className="w-full bg-[#bef264] hover:bg-[#a8d84e] text-black py-3 rounded-xl font-semibold transition-all">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Admin dashboard
  return (
    <section className="pt-24 lg:pt-32 pb-16 bg-[#111] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Tableau de bord</h1>
            <p className="text-slate-400 text-sm">{cars.length} vehicule(s) en stock</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              {showForm ? <X size={18} /> : <Plus size={18} />}
              {showForm ? 'Annuler' : 'Ajouter un vehicule'}
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/10 transition-all text-sm font-medium"
            >
              Deconnexion
            </button>
          </div>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-none border border-white/10 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Nouveau vehicule</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Main info */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Informations generales</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'marque', label: 'Marque *', placeholder: 'Renault', type: 'text' },
                    { key: 'modele', label: 'Modele *', placeholder: 'Clio', type: 'text' },
                    { key: 'annee', label: 'Annee *', placeholder: '2020', type: 'number' },
                    { key: 'prix', label: 'Prix (EUR) *', placeholder: '5990', type: 'number' },
                    { key: 'km', label: 'Kilometres', placeholder: '80000', type: 'number' },
                    { key: 'puissance', label: 'Puissance', placeholder: '75 ch', type: 'text' },
                    { key: 'couleur', label: 'Couleur', placeholder: 'Gris', type: 'text' },
                    { key: 'nbProprietaires', label: 'Nb proprietaires', placeholder: '1', type: 'number' }
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                        required={field.label.includes('*')}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Carburant</label>
                    <select
                      value={form.carburant}
                      onChange={e => setForm(prev => ({ ...prev, carburant: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                    >
                      <option>Essence</option>
                      <option>Diesel</option>
                      <option>Hybride</option>
                      <option>Electrique</option>
                      <option>GPL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Transmission</label>
                    <select
                      value={form.transmission}
                      onChange={e => setForm(prev => ({ ...prev, transmission: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                    >
                      <option>Manuelle</option>
                      <option>Automatique</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Specs constructeur */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Donnees constructeur (optionnel)</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Type carrosserie</label>
                    <select
                      value={form.carrosserie}
                      onChange={e => setForm(prev => ({ ...prev, carrosserie: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                    >
                      <option>Citadine</option>
                      <option>Berline</option>
                      <option>SUV</option>
                      <option>Break</option>
                      <option>Monospace</option>
                      <option>Coupe</option>
                      <option>Cabriolet</option>
                      <option>Utilitaire</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Nb portes</label>
                    <select
                      value={form.portes}
                      onChange={e => setForm(prev => ({ ...prev, portes: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                    >
                      <option>3</option>
                      <option>5</option>
                    </select>
                  </div>
                  {[
                    { key: 'dimensions', label: 'Dimensions (L x l x h)', placeholder: '4200 x 1800 x 1500 mm' },
                    { key: 'poids', label: 'Poids a vide', placeholder: '1100 kg' },
                    { key: 'coffre', label: 'Volume coffre', placeholder: '350 L' },
                    { key: 'consoMixte', label: 'Conso mixte', placeholder: '5.5 L/100km' },
                    { key: 'co2', label: 'Emissions CO2', placeholder: '129 g/km' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-slate-300 mb-1">{field.label}</label>
                      <input
                        type="text"
                        value={form[field.key]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Norme Euro</label>
                    <select
                      value={form.normeEuro}
                      onChange={e => setForm(prev => ({ ...prev, normeEuro: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all text-sm"
                    >
                      <option>Euro 3</option>
                      <option>Euro 4</option>
                      <option>Euro 5</option>
                      <option>Euro 6</option>
                      <option>Euro 6d</option>
                      <option>Euro 7</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Photos</h3>
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    dragOver ? 'border-[#bef264] bg-[#bef264]/5' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Upload size={32} className="mx-auto text-slate-500 mb-3" />
                  <p className="text-sm text-slate-400 mb-2">Glissez-deposez vos photos ici</p>
                  <label className="inline-block bg-white/10 hover:bg-white/20 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors">
                    Parcourir
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-20 h-16 object-cover rounded-xl border border-white/10" />
                        <button
                          type="button"
                          onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Decrivez le vehicule..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#1a1a1a] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#bef264]/30 focus:border-[#bef264] transition-all resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-[#bef264] hover:bg-[#a8d84e] text-black px-8 py-3 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-[#bef264]/20"
              >
                Ajouter le vehicule
              </button>
            </form>
          </div>
        )}

        {/* Cars list */}
        <div className="space-y-4">
          {cars.map(car => (
            <div key={car.id} className="bg-[#1a1a1a] rounded-2xl p-4 shadow-none border border-white/10 flex items-center gap-4">
              <img
                src={car.images?.[0] || "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=150&fit=crop"}
                alt={`${car.marque} ${car.modele}`}
                className="w-24 h-18 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white">{car.marque} {car.modele}</h3>
                <p className="text-sm text-slate-400">{car.annee} - {formatKm(car.km)} - {car.carburant}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-extrabold text-[#bef264]">{formatPrice(car.prix)}</p>
                <button
                  onClick={() => deleteCar(car.id)}
                  className="text-slate-500 hover:text-red-500 transition-colors mt-1"
                  title="Supprimer"
                >
                  <Trash2 size={18} />
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
// MAIN APP
// =============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState(INITIAL_CARS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage cars={cars} reviews={reviews} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
      case 'stock':
        return <StockPage cars={cars} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
      case 'carDetail':
        return <CarDetailPage car={selectedCar} setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'reviews':
        return <ReviewsPage reviews={reviews} setReviews={setReviews} />;
      case 'admin':
        return <AdminPage cars={cars} setCars={setCars} />;
      default:
        return <HomePage cars={cars} reviews={reviews} setCurrentPage={setCurrentPage} setSelectedCar={setSelectedCar} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} setShowAdmin={setShowAdmin} />
      <main>{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
