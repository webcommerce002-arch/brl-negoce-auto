import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Camera, 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Fuel, 
  Gauge, 
  Calendar, 
  Handshake, 
  Facebook, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2,
  X,
  LayoutDashboard,
  Smartphone,
  ShieldCheck,
  Award,
  Car,
  Search,
  Mail,
  Instagram,
  ChevronLeft,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

// --- CONFIGURATION ---
const BRAND = {
  name: "BRL NÉGOCE AUTO",
  phone: "06 31 53 10 34",
  email: "brl.negoce@gmail.com",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  address: "6 rue Jules ferry, Billy-Berclau, France, 62138",
  colors: {
    primary: "#bef264", // Lime Green
    dark: "#0a0a0a",
    darker: "#050505",
    textGray: "#94a3b8"
  }
};

// --- COMPOSANT LOGO ---
const BRLLogo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative w-10 h-10 rounded-full border-2 border-[#bef264] flex items-center justify-center bg-black overflow-hidden shadow-[0_0_15px_rgba(190,242,100,0.3)]">
      <div className="relative flex flex-col items-center leading-none">
        <span className="text-white font-black italic text-sm">BRL</span>
        <div className="h-[1px] w-4 bg-[#bef264] my-0.5"></div>
        <span className="text-[4px] text-white font-bold uppercase tracking-widest">NÉGOCE AUTO</span>
      </div>
    </div>
    <span className="text-white font-black text-xl tracking-tighter uppercase italic">
      BRL <span className="text-[#bef264]">NÉGOCE</span>
    </span>
  </div>
);

const FAQS = [
  {
    question: "Comment puis-je prendre rendez-vous ?",
    answer: "Vous pouvez nous appeler directement au 06 31 53 10 34 ou nous envoyer un message via notre page Facebook."
  },
  {
    question: "Quels sont les documents nécessaires pour l'achat ?",
    answer: "Une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois et votre permis de conduire."
  },
  {
    question: "Proposez-vous des garanties ?",
    answer: "Tous nos véhicules sont révisés et bénéficient d'une garantie minimale de 3 mois, avec possibilité d'extension."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, cars, why-us, faq, contact, admin
  const [scrolled, setScrolled] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const [cars, setCars] = useState([
    {
      id: 1,
      brand: "MERCEDES-BENZ",
      model: "CLASSE A 45 S AMG",
      year: "2023",
      price: "68900",
      km: "12500",
      fuel: "Essence",
      image: "https://images.unsplash.com/photo-1617650728468-807eb271b467?auto=format&fit=crop&q=80&w=1200",
      specs: "421 ch | 4Matic+ | Toit Panoramique"
    },
    {
      id: 2,
      brand: "VOLKSWAGEN",
      model: "GOLF 8 R",
      year: "2022",
      price: "52500",
      km: "21000",
      fuel: "Essence",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
      specs: "320 ch | 4Motion | Akrapovic"
    },
    {
      id: 3,
      brand: "BMW",
      model: "M4 COMPETITION",
      year: "2023",
      price: "92000",
      km: "8500",
      fuel: "Essence",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
      specs: "510 ch | M xDrive | Carbone"
    }
  ]);

  const [newCar, setNewCar] = useState({
    brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", image: "", specs: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddCar = (e) => {
    e.preventDefault();
    setCars([{ ...newCar, id: Date.now() }, ...cars]);
    setNewCar({ brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", image: "", specs: "" });
    setActiveTab('cars');
    window.scrollTo(0, 0);
  };

  const deleteCar = (id) => {
    if(window.confirm("Supprimer ce véhicule ?")) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const nextCar = () => setCurrentCarIndex((prev) => (prev + 1) % cars.length);
  const prevCar = () => setCurrentCarIndex((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#bef264] selection:text-black font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <BRLLogo />
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => setActiveTab('home')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${activeTab === 'home' ? 'text-[#bef264]' : 'text-white'}`}>Accueil</button>
            <button onClick={() => setActiveTab('cars')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${activeTab === 'cars' ? 'text-[#bef264]' : 'text-white'}`}>Véhicules</button>
            <button onClick={() => setActiveTab('why-us')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${activeTab === 'why-us' ? 'text-[#bef264]' : 'text-white'}`}>Pourquoi nous ?</button>
            <button onClick={() => setActiveTab('faq')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${activeTab === 'faq' ? 'text-[#bef264]' : 'text-white'}`}>FAQ</button>
            <button onClick={() => setActiveTab('admin')} className="text-white/30 hover:text-white transition-colors"><LayoutDashboard size={18} /></button>
          </div>

          <div className="flex items-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="hidden md:flex bg-[#bef264] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
              Contactez-nous
            </a>
            <button className="lg:hidden p-2 text-white">
              <Plus size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      {activeTab === 'home' && (
        <>
          <section className="relative h-screen flex items-center pt-20 px-6 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                  Roulez avec <br/>
                  <span className="text-[#bef264]">Confiance.</span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                  Découvrez nos véhicules d'occasion de qualité, rigoureusement inspectés et sélectionnés pour votre style de vie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setActiveTab('cars')} className="bg-[#bef264] text-black px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(190,242,100,0.3)]">
                    Voir le stock
                  </button>
                  <a href={`tel:${BRAND.phone}`} className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md text-white px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                    Contact Now
                  </a>
                </div>
              </div>
            </div>
            
            {/* Floating Banner */}
            <div className="absolute bottom-0 left-0 w-full bg-[#bef264] py-8 overflow-hidden hidden md:block">
              <div className="flex justify-center items-center gap-12 animate-infinite-scroll whitespace-nowrap">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-12">
                    <span className="text-black font-black text-xl uppercase italic">Simple Search</span>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-black font-black text-xl uppercase italic">Honest Prices</span>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span className="text-black font-black text-xl uppercase italic">Trusted Service</span>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FEATURED VEHICLES (Carousel Style) --- */}
          <section className="py-24 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Véhicules <span className="text-[#bef264]">Sélectionnés</span>
                </h2>
                <p className="text-slate-400 font-medium">Des véhicules certifiés auxquels vous pouvez faire confiance.</p>
              </div>

              <div className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cars.map((car, index) => (
                    <div key={car.id} className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-[#bef264]/50 transition-all duration-500 group/card">
                      <div className="relative h-64 overflow-hidden">
                        <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" />
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white">
                          <ArrowRight className="-rotate-45" size={20} />
                        </div>
                      </div>
                      <div className="p-8 text-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{car.brand}</p>
                        <h3 className="text-2xl font-black uppercase italic mb-4">{car.model}</h3>
                        <div className="flex justify-center items-center gap-4 text-xs font-bold text-[#bef264] uppercase tracking-widest border-t border-white/5 pt-6">
                           <span>{Number(car.price).toLocaleString()} €</span>
                           <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                           <span>{car.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <button onClick={() => setActiveTab('cars')} className="bg-[#bef264] text-black px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
                  Voir tout l'inventaire
                </button>
              </div>
            </div>
          </section>

          {/* --- WHY CHOOSE US --- */}
          <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.9]">
                  Pourquoi <br/>
                  <span className="text-[#bef264]">Nous Choisir ?</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-12">
                  Service de confiance, transactions transparentes et véhicules sur lesquels vous pouvez compter.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Expertise Reconnue", desc: "Plus de 750 ventes réussies à notre actif." },
                    { title: "Garantie Totale", desc: "Tous nos véhicules sont révisés et garantis 3 mois." },
                    { title: "Service Carte Grise", desc: "Nous gérons toutes les démarches administratives ANTS." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-12 h-12 bg-[#bef264] rounded-full flex items-center justify-center text-black shrink-0">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase italic mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[40px] overflow-hidden border border-[#bef264]/20 shadow-2xl shadow-[#bef264]/10">
                  <img src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=1200" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-[#bef264] p-10 rounded-[40px] hidden md:block">
                  <span className="text-black font-black text-6xl italic leading-none block">10+</span>
                  <span className="text-black font-bold text-xs uppercase tracking-widest">Ans d'expérience</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* --- INVENTORY SECTION --- */}
      {activeTab === 'cars' && (
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Notre <span className="text-[#bef264]">Inventaire</span></h2>
                <p className="text-slate-400 font-medium italic">Explorez notre sélection de véhicules premium à Billy-Berclau.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="Rechercher..." />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <div key={car.id} className="group bg-[#111] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#bef264]/50 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-[#bef264] text-black px-4 py-1.5 rounded-xl font-black text-xs italic">
                      {car.year}
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-[#bef264] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{car.brand}</span>
                    <h3 className="text-2xl font-black text-white italic uppercase mb-6">{car.model}</h3>
                    
                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5 mb-6">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                        <Gauge size={14} className="text-[#bef264]" /> {Number(car.km).toLocaleString()} KM
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                        <Fuel size={14} className="text-[#bef264]" /> {car.fuel}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black italic">{Number(car.price).toLocaleString()} €</span>
                      <a href={`tel:${BRAND.phone}`} className="p-3 bg-white/5 text-white rounded-2xl hover:bg-[#bef264] hover:text-black transition-all">
                        <Phone size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- FAQ SECTION --- */}
      {(activeTab === 'faq' || activeTab === 'home') && (
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Questions <span className="text-[#bef264]">Fréquentes</span>
              </h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-white font-black uppercase italic mb-3 flex items-center gap-3">
                    <HelpCircle size={20} className="text-[#bef264]" />
                    {faq.question}
                  </h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed pl-8 border-l border-[#bef264]/30">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- ADMIN SECTION --- */}
      {activeTab === 'admin' && (
        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <div className="bg-[#111] border border-[#bef264]/30 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Gestion du <span className="text-[#bef264]">Stock</span></h2>
              <button onClick={() => setActiveTab('home')} className="p-2 text-slate-500 hover:text-white"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddCar} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="Marque (ex: BMW)" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="Modèle (ex: M4)" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="Année" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="Prix (€)" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="KM" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
              </div>

              <input className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="URL de l'image" value={newCar.image} onChange={e => setNewCar({...newCar, image: e.target.value})} />

              <button type="submit" className="w-full bg-[#bef264] text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#bef264]/20 italic">
                Ajouter au catalogue
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5">
               <div className="space-y-3">
                  {cars.map(car => (
                    <div key={car.id} className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-white/5">
                       <div className="flex items-center gap-4">
                          <img src={car.image} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                             <p className="text-white font-black text-xs italic">{car.brand} {car.model}</p>
                             <p className="text-[#bef264] text-[10px] font-bold">{Number(car.price).toLocaleString()} €</p>
                          </div>
                       </div>
                       <button onClick={() => deleteCar(car.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </main>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-1">
              <BRLLogo className="mb-8" />
              <p className="text-slate-500 text-sm font-medium leading-relaxed italic mb-8">
                Votre spécialiste en vente de véhicules d'occasion à Billy-Berclau. Qualité, transparence et service premium.
              </p>
              <div className="flex gap-4">
                <a href={BRAND.facebookUrl} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#bef264] hover:text-black transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#bef264] hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h5>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-[#bef264] transition-colors">Accueil</button></li>
                <li><button onClick={() => setActiveTab('cars')} className="hover:text-[#bef264] transition-colors">Inventaire</button></li>
                <li><button onClick={() => setActiveTab('why-us')} className="hover:text-[#bef264] transition-colors">À Propos</button></li>
                <li><button onClick={() => setActiveTab('faq')} className="hover:text-[#bef264] transition-colors">FAQ</button></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact</h5>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Phone size={18} className="text-[#bef264] shrink-0" />
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{BRAND.phone}</span>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={18} className="text-[#bef264] shrink-0" />
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{BRAND.email}</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-[#bef264] shrink-0" />
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                    {BRAND.address}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Horaires</h5>
              <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <li className="flex justify-between"><span>Lun - Ven</span> <span>09:00 - 19:00</span></li>
                <li className="flex justify-between"><span>Samedi</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Dimanche</span> <span className="text-[#bef264]">Fermé</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 {BRAND.name} • TOUS DROITS RÉSERVÉS
            </p>
            <div className="flex gap-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call Button for Mobile */}
      <a href={`tel:${BRAND.phone}`} className="md:hidden fixed bottom-8 right-8 z-[110] bg-[#bef264] text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-[#bef264]/40 animate-bounce">
        <Phone size={24} />
      </a>
    </div>
  );
}
