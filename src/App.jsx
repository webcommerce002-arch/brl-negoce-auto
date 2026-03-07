import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Camera, 
  Rotate3d, 
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
  Eye,
  Settings,
  ShieldCheck,
  Award,
  TrendingUp,
  Instagram
} from 'lucide-react';

// --- CONFIGURATION DE MARQUE OFFICIELLE BRL ---
const BRAND = {
  name: "BRL NÉGOCE AUTO",
  tagline: "L'EXCELLENCE AUTOMOBILE À BAPAUME",
  phone: "06 31 53 10 34",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  followers: "921",
  colors: {
    lime: "#bef264",
    carbon: "#020617",
    silver: "#94a3b8"
  }
};

// --- COMPOSANT SPECTATEUR 360° (Simulation Interactive) ---
const Car360Viewer = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX || e.touches[0].pageX;
    const diff = currentX - startX;
    setRotation((prev) => (prev + diff * 0.8) % 360);
    setStartX(currentX);
  };

  const handleEnd = () => setIsDragging(false);

  return (
    <div 
      className="relative w-full h-[350px] md:h-[500px] bg-slate-900/50 rounded-[40px] overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 group"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `perspective(1200px) rotateY(${rotation}deg)` }}
        >
          <img 
            src={imageUrl} 
            alt="Véhicule 360" 
            className="max-w-[110%] h-auto object-contain drop-shadow-[0_35px_60px_rgba(190,242,100,0.25)]"
          />
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between">
        <div className="bg-lime-500 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit flex items-center gap-2 shadow-lg shadow-lime-500/20">
          <Rotate3d size={14} /> Studio 360° Interactif
        </div>
        <div className="w-full flex justify-center">
            <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-[10px] text-white/50 uppercase font-black tracking-widest animate-pulse">
                Faites glisser pour faire pivoter
            </div>
        </div>
      </div>
    </div>
  );
};

// --- APPLICATION PRINCIPALE ---
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewedCar, setViewedCar] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      specs: "421 ch | 4Matic+ | Toit Panoramique | Pack Performance"
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
      specs: "320 ch | 4Motion | Akrapovic | Jantes 19\""
    }
  ]);

  const [newCar, setNewCar] = useState({
    brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", image: "", specs: ""
  });

  const handleAddCar = (e) => {
    e.preventDefault();
    setCars([{ ...newCar, id: Date.now() }, ...cars]);
    setNewCar({ brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", image: "", specs: "" });
    setShowAddForm(false);
  };

  const deleteCar = (id) => {
    setCars(cars.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-lime-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      
      {/* Texture de fond Grille Métallique */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{
        backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px), radial-gradient(#ffffff 0.5px, #020617 0.5px)`,
        backgroundSize: '15px 15px',
        backgroundPosition: '0 0, 7.5px 7.5px'
      }}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-lime-500/20 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col leading-none group cursor-pointer">
            <div className="flex items-baseline">
              <span className="text-3xl font-black text-white italic group-hover:text-lime-500 transition-colors tracking-tighter">BRL</span>
              <span className="ml-2 text-xl font-bold text-slate-400 uppercase tracking-tighter">NÉGOCE</span>
            </div>
            <div className="flex items-center">
              <div className="h-[3px] w-full bg-lime-500 mr-2 shadow-[0_0_15px_#bef264]"></div>
              <span className="text-xl font-black text-white italic tracking-[0.2em]">AUTO</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-3 rounded-2xl transition-all border ${isAdmin ? 'bg-lime-500 border-lime-500 text-slate-950 shadow-lg shadow-lime-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            <a href={`tel:${BRAND.phone}`} className="hidden md:flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl text-sm font-black italic tracking-widest text-white hover:border-lime-500 transition-all">
               <Phone size={18} className="text-lime-500" /> {BRAND.phone}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Banner / Identity */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="BRL Premium Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-lime-500"></div>
                <span className="text-lime-500 text-[10px] font-black uppercase tracking-[0.5em]">Habilitation SIV Officielle</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter italic">
              LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-200">PRIVILÈGE</span> <br/>
              AUTOMOBILE.
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium italic border-l-4 border-lime-500 pl-8">
              Achat, vente, dépôt-vente et service carte grise. {BRAND.name} redéfinit l'expérience du négoce auto premium.
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <button className="group flex items-center gap-5 bg-lime-500 text-slate-950 px-10 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-2xl shadow-lime-500/20 italic">
                EXPLORER LE STOCK <ArrowRight className="group-hover:translate-x-3 transition-transform" />
              </button>
              <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 backdrop-blur-xl">
                <Facebook size={24} /> {BRAND.followers} FOLLOWERS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-slate-950/50 border-y border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
                { label: "Véhicules Vendus", val: "450+", icon: <Zap size={20}/> },
                { label: "Avis Clients", val: "5.0/5", icon: <Star size={20} fill="currentColor"/> },
                { label: "Estimation Cash", val: "24H", icon: <TrendingUp size={20}/> },
                { label: "Garantie Pro", val: "12 Mois", icon: <ShieldCheck size={20}/> }
            ].map((s, i) => (
                <div key={i} className="flex items-center gap-4 group">
                    <div className="p-3 bg-lime-500/10 rounded-2xl text-lime-500 group-hover:bg-lime-500 group-hover:text-slate-950 transition-all">
                        {s.icon}
                    </div>
                    <div>
                        <div className="text-2xl font-black text-white italic">{s.val}</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{s.label}</div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Main Stock Interface */}
      <main className="max-w-7xl mx-auto px-6 py-32 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div className="space-y-4">
             <div className="h-1.5 w-24 bg-lime-500 rounded-full shadow-[0_0_20px_#bef264]"></div>
             <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
               {isAdmin ? "PANEL" : "NOTRE"} <span className="text-lime-500">SHOWROOM.</span>
             </h2>
             <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Expertise Quanta • Design Xénon • Communauté Nova</p>
          </div>

          {isAdmin && (
            <button 
                onClick={() => setShowAddForm(true)}
                className="group flex items-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-lime-500 transition-all shadow-2xl"
            >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" /> AJOUTER UNE PÉPITE
            </button>
          )}
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {cars.map((car) => (
            <div key={car.id} className="group relative bg-slate-900/20 border border-white/5 rounded-[60px] p-2 hover:border-lime-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-lime-500/5">
              
              <div className="relative h-80 md:h-[500px] rounded-[52px] overflow-hidden">
                <img src={car.image || "https://images.unsplash.com/photo-1542362567-b05261b60f44?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-8 right-8 flex gap-3">
                    <button onClick={() => deleteCar(car.id)} className="p-4 bg-red-500 text-white rounded-2xl hover:scale-110 transition-all shadow-xl"><Trash2 size={20} /></button>
                    <button className="p-4 bg-white text-slate-950 rounded-2xl hover:scale-110 transition-all shadow-xl"><Settings size={20} /></button>
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="space-y-2">
                        <div className="bg-lime-500 text-slate-950 px-5 py-2 rounded-2xl font-black text-2xl italic shadow-2xl inline-block">
                        {Number(car.price).toLocaleString()} €
                        </div>
                        <div className="text-[10px] text-lime-400 font-black uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-lime-500/20 w-fit">
                            Dès 459€ / mois
                        </div>
                    </div>
                    <button 
                        onClick={() => setViewedCar(car)}
                        className="p-6 bg-white/10 backdrop-blur-xl text-white rounded-[28px] hover:bg-lime-500 hover:text-slate-950 transition-all border border-white/10 group-hover:scale-110"
                    >
                        <Rotate3d size={28} />
                    </button>
                </div>
              </div>

              <div className="p-10 md:p-14 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-lime-500 text-xs font-black uppercase tracking-[0.4em] mb-3 block">{car.brand}</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{car.model}</h3>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                    <span className="text-white font-black text-2xl italic block">{car.year}</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Millésime</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/5">
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lime-500"><Gauge size={20} /></div>
                    <span>{Number(car.km).toLocaleString()} KM</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lime-500"><Fuel size={20} /></div>
                    <span>{car.fuel}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 group-hover:border-lime-500/20 transition-colors">
                  <p className="text-sm text-slate-400 font-medium italic leading-relaxed">"{car.specs}"</p>
                </div>
                
                <button className="w-full py-6 bg-slate-800 text-white font-black text-xs uppercase tracking-[0.3em] rounded-3xl group-hover:bg-lime-500 group-hover:text-slate-950 transition-all duration-500 italic flex items-center justify-center gap-4">
                  DÉTAILS COMPLETS & RÉSERVATION <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Trust Section / Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-slate-900 to-black border border-lime-500/30 rounded-[80px] p-12 md:p-24 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-500/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-lime-500/10 transition-all duration-1000"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left">
                    <div className="space-y-10 max-w-2xl">
                        <div className="w-20 h-2 bg-lime-500 rounded-full mx-auto lg:mx-0"></div>
                        <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
                            ESTIMEZ <br/>VOTRE <span className="text-lime-500 italic">AUTO.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-lg">
                            Rachat cash sous 24h ou dépôt-vente premium. Quanta analyse le marché pour vous offrir la meilleure cotation.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                           <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 italic font-black text-xs text-white uppercase tracking-widest">
                             <Award className="text-lime-500" size={18} /> Satisfaction 100%
                           </div>
                           <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 italic font-black text-xs text-white uppercase tracking-widest">
                             <Smartphone className="text-lime-500" size={18} /> Gestion Mobile
                           </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-6 w-full lg:w-auto">
                        <button className="bg-white text-slate-950 px-12 py-8 rounded-[36px] font-black text-xl uppercase tracking-widest hover:bg-lime-500 transition-all shadow-2xl hover:scale-105 active:scale-95 italic flex items-center justify-center gap-4">
                            DÉBUTER L'EXPERTISE <Zap size={28} fill="currentColor" />
                        </button>
                        <a href={BRAND.facebookUrl} className="bg-blue-600 text-white px-12 py-8 rounded-[36px] font-black text-xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl hover:scale-105 active:scale-95 italic flex items-center justify-center gap-4">
                            NOUS REJOINDRE <Facebook size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#010413] pt-40 pb-16 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-24 mb-32">
                <div className="space-y-12">
                    <div className="flex flex-col leading-none">
                        <div className="flex items-baseline">
                            <span className="text-5xl font-black text-white italic tracking-tighter">BRL</span>
                            <span className="ml-3 text-3xl font-bold text-slate-400 uppercase tracking-tighter">NÉGOCE</span>
                        </div>
                        <div className="flex items-center max-w-[300px]">
                            <div className="h-[4px] flex-grow bg-lime-500 mr-3 shadow-[0_0_15px_#bef264]"></div>
                            <span className="text-3xl font-black text-white italic tracking-[0.25em]">AUTO</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-xl italic font-medium leading-relaxed max-w-md">
                        "L'excellence automobile d'occasion sélectionnée par des passionnés, pour des passionnés."
                    </p>
                    <div className="flex gap-6">
                        {[Facebook, Instagram, Phone].map((Icon, i) => (
                            <div key={i} className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-lime-500 hover:bg-lime-500 hover:text-slate-950 transition-all cursor-pointer shadow-xl">
                                <Icon size={28}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <h5 className="text-white font-black text-xs uppercase tracking-[0.5em] italic">DÉPARTEMENTS</h5>
                        <ul className="space-y-6 text-slate-500 text-sm font-black uppercase tracking-widest italic">
                            <li className="hover:text-lime-400 cursor-pointer transition-colors">Showroom Occasion</li>
                            <li className="hover:text-lime-400 cursor-pointer transition-colors">Dépôt-Vente Pro</li>
                            <li className="hover:text-lime-400 cursor-pointer transition-colors">Rachat Immédiat</li>
                            <li className="hover:text-lime-400 cursor-pointer transition-colors">Service SIV</li>
                        </ul>
                    </div>
                    <div className="space-y-10">
                        <h5 className="text-white font-black text-xs uppercase tracking-[0.5em] italic">CONTACT</h5>
                        <div className="space-y-8 text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-widest">
                            <div className="flex items-start gap-5">
                                <MapPin size={24} className="text-lime-500 shrink-0" />
                                <span>62450 Bapaume • France</span>
                            </div>
                            <div className="flex items-start gap-5">
                                <Clock size={24} className="text-lime-500 shrink-0" />
                                <span>Lundi - Samedi <br/> 09:00 - 19:00</span>
                            </div>
                            <div className="flex items-start gap-5 text-white">
                                <Phone size={24} className="text-lime-500 shrink-0" />
                                <span className="text-xl font-black italic tracking-tighter leading-none">{BRAND.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-10 items-center text-[10px] text-slate-700 font-black uppercase tracking-[0.6em]">
                <p>© 2024 {BRAND.name} • TOUS DROITS RÉSERVÉS</p>
                <div className="flex gap-12">
                    <span className="hover:text-lime-500 cursor-pointer transition-colors">LÉGAL</span>
                    <span className="hover:text-lime-500 cursor-pointer transition-colors">PRIVACY</span>
                    <span className="hover:text-lime-500 cursor-pointer transition-colors">COOKIES</span>
                </div>
            </div>
        </div>
      </footer>

      {/* --- MODAL AJOUT (ADMIN) --- */}
      {showAddForm && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center px-4 py-6">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl" onClick={() => setShowAddForm(false)}></div>
          <div className="relative w-full max-w-3xl bg-slate-900 border border-lime-500/30 rounded-[50px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className="p-10 md:p-16 overflow-y-auto max-h-[85vh]">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">NOUVELLE <span className="text-lime-500">PÉPITE</span></h2>
                <button onClick={() => setShowAddForm(false)} className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-colors"><X size={28}/></button>
              </div>
              
              <form onSubmit={handleAddCar} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">Marque</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-bold" placeholder="ex: PORSCHE" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">Modèle</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-bold" placeholder="ex: 911 GT3" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value.toUpperCase()})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">Année</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-bold" placeholder="2024" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">Prix (€)</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-bold" placeholder="125000" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                  </div>
                  <div className="space-y-3 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">KM</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-bold" placeholder="1500" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">URL Photo (Haute Définition)</label>
                  <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-lime-500 flex items-center"><Camera size={24} /></div>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all font-medium" placeholder="https://unsplash.com/..." value={newCar.image} onChange={e => setNewCar({...newCar, image: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-3">Fiche Technique / Options</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-lime-500 outline-none transition-all h-32 font-medium" placeholder="Détaillez les équipements..." value={newCar.specs} onChange={e => setNewCar({...newCar, specs: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-lime-500 text-slate-950 py-7 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-lime-500/20 italic">
                  PUBLIER L'ANNONCE IMMÉDIATEMENT
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL VUE 360° --- */}
      {viewedCar && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/98 backdrop-blur-3xl" onClick={() => setViewedCar(null)}></div>
          <div className="relative w-full max-w-6xl animate-in zoom-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 px-4">
              <div className="space-y-2">
                <span className="text-lime-500 text-sm font-black uppercase tracking-[0.4em]">{viewedCar.brand}</span>
                <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">{viewedCar.model}</h2>
              </div>
              <button onClick={() => setViewedCar(null)} className="p-6 bg-white/5 rounded-full text-white hover:bg-lime-500 hover:text-slate-950 transition-all border border-white/10 shadow-2xl">
                <X size={32} />
              </button>
            </div>
            
            <Car360Viewer imageUrl={viewedCar.image} />
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { icon: <Zap size={24}/>, label: "MOTEUR", value: "CERTIFIÉ" },
                 { icon: <ShieldCheck size={24}/>, label: "CONTRÔLE", value: "110 POINTS" },
                 { icon: <Smartphone size={24}/>, label: "HISTORIQUE", value: "COMPLET" },
                 { icon: <Handshake size={24}/>, label: "LIVRAISON", value: "OFFERTE*" }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white/5 p-8 rounded-[32px] border border-white/5 text-center group hover:border-lime-500/30 transition-all">
                    <div className="text-lime-500 flex justify-center mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em] mb-2">{item.label}</div>
                    <div className="text-white font-black text-lg uppercase italic">{item.value}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Effets de Glow Ambient */}
      <div className="fixed top-0 -left-1/4 w-[70%] h-[70%] bg-lime-500/5 blur-[250px] -z-10 rounded-full"></div>
      <div className="fixed bottom-0 -right-1/4 w-[70%] h-[70%] bg-blue-600/5 blur-[250px] -z-10 rounded-full"></div>
    </div>
  );
}
