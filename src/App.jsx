import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Award,
  Car,
  Search
} from 'lucide-react';

// --- CONFIGURATION ---
const BRAND = {
  name: "BRL NÉGOCE AUTO",
  phone: "06 31 53 10 34",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  address: "62450 Bapaume",
  colors: {
    neon: "#bef264", // Vert fluo
    dark: "#050505",
    metal: "#94a3b8"
  }
};

// --- COMPOSANT LOGO ROND ---
const BRLLogo = ({ size = "md" }) => (
  <div className={`relative rounded-full border-2 border-[#bef264] flex items-center justify-center overflow-hidden bg-black neon-glow ${size === "lg" ? 'w-32 h-32' : 'w-12 h-12 md:w-16 md:h-16'}`}>
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#bef264 1px, transparent 1px)', backgroundSize: '4px 4px'}}></div>
    <div className="relative flex flex-col items-center leading-none">
      <span className="text-white font-black italic tracking-tighter text-xl md:text-2xl">BRL</span>
      <div className="h-[1px] w-8 bg-[#bef264] my-1"></div>
      <span className="text-[6px] md:text-[8px] text-white font-bold uppercase tracking-[0.2em]">NÉGOCE AUTO</span>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('showroom'); // 'showroom' ou 'admin'
  const [scrolled, setScrolled] = useState(false);
  const [viewedCar, setViewedCar] = useState(null);

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
    setActiveTab('showroom');
    window.scrollTo(0, 0);
  };

  const deleteCar = (id) => {
    if(window.confirm("Supprimer ce véhicule ?")) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#bef264] selection:text-black">
      
      {/* Navigation Mobile Optimisée */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 px-4 py-3 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-[#bef264]/30' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BRLLogo />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[#bef264] font-black italic text-lg">BRL NÉGOCE</span>
              <span className="text-white text-[10px] font-bold tracking-[0.3em]">PREMIUM STOCK</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab(activeTab === 'admin' ? 'showroom' : 'admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all border ${activeTab === 'admin' ? 'bg-[#bef264] text-black border-[#bef264]' : 'bg-white/5 text-white border-white/10 hover:border-[#bef264]'}`}
            >
              {activeTab === 'admin' ? <Car size={14} /> : <LayoutDashboard size={14} />}
              {activeTab === 'admin' ? 'Stock' : 'Gestion'}
            </button>
            <a href={`tel:${BRAND.phone}`} className="p-2.5 bg-[#bef264] text-black rounded-full shadow-lg shadow-[#bef264]/20 hover:scale-110 transition-transform">
              <Phone size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* --- SECTION SHOWROOM --- */}
      {activeTab === 'showroom' && (
        <>
          {/* Hero Hero Mobile-First */}
          <section className="relative pt-32 pb-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bef264]/10 border border-[#bef264]/20 text-[#bef264] text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                <ShieldCheck size={12} /> Habilitation SIV Officielle
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white italic leading-[0.9] tracking-tighter uppercase mb-6">
                Le Privilège <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bef264] to-white">Automobile.</span>
              </h1>
              <p className="text-slate-400 max-w-lg text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-[#bef264] pl-4 mb-8">
                Achat, vente, dépôt-vente et service carte grise à Bapaume. L'excellence sélectionnée pour vous.
              </p>
              <div className="flex gap-4">
                <button className="flex-1 sm:flex-none bg-[#bef264] text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all italic">
                  Voir le stock
                </button>
                <button className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
                  Nous Contacter
                </button>
              </div>
            </div>
            {/* Décoration Grille en fond */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none skew-y-12 translate-x-1/2">
               <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#bef264 2px, transparent 2px)', backgroundSize: '20px 20px'}}></div>
            </div>
          </section>

          {/* Grid de Véhicules */}
          <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-12 bg-[#bef264]"></div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-widest">Derniers Arrivages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {cars.map((car) => (
                <div key={car.id} className="group bg-[#111] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#bef264]/50 transition-all duration-500">
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 right-4 bg-[#bef264] text-black px-4 py-1.5 rounded-xl font-black text-lg italic shadow-xl">
                      {Number(car.price).toLocaleString()} €
                    </div>
                  </div>
                  <div className="p-6 md:p-8 space-y-4">
                    <div>
                      <span className="text-[#bef264] text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">{car.brand}</span>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase">{car.model}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                        <Gauge size={14} className="text-[#bef264]" /> {Number(car.km).toLocaleString()} KM
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
                        <Calendar size={14} className="text-[#bef264]" /> {car.year}
                      </div>
                    </div>
                    <button className="w-full py-4 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl group-hover:bg-[#bef264] group-hover:text-black transition-all italic flex items-center justify-center gap-2">
                      Fiche Technique <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Sections de réassurance */}
          <section className="bg-black/50 py-20 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: <ShieldCheck />, title: "Garantie 12 Mois", desc: "Tous nos véhicules sont révisés et garantis." },
                { icon: <Award />, title: "Expertise SIV", desc: "Service carte grise immédiat sur place." },
                { icon: <Zap />, title: "Rachat Cash", desc: "Estimation et paiement sous 24h." },
                { icon: <Handshake />, title: "Dépôt-Vente", desc: "Confiez-nous votre véhicule en toute sécurité." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#bef264]/30 transition-colors">
                  <div className="text-[#bef264] mb-4 scale-150">{item.icon}</div>
                  <h4 className="text-white font-black uppercase italic mb-2 tracking-tighter">{item.title}</h4>
                  <p className="text-slate-500 text-xs font-medium italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* --- ONGLET GESTION DU STOCK (ADMIN) --- */}
      {activeTab === 'admin' && (
        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <div className="bg-[#111] border border-[#bef264]/30 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
               <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#bef264 2px, transparent 2px)', backgroundSize: '10px 10px'}}></div>
            </div>

            <div className="flex justify-between items-center mb-10 relative z-10">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Inserer un <span className="text-[#bef264]">Véhicule</span></h2>
              <button onClick={() => setActiveTab('showroom')} className="p-2 text-slate-500 hover:text-white"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddCar} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Marque</label>
                  <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="ex: BMW" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Modèle</label>
                  <input required className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="ex: M4" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Année</label>
                  <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="2024" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Prix (€)</label>
                  <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="45000" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Kilométrage</label>
                  <input required type="number" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="10000" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">URL de l'image</label>
                <div className="flex gap-4">
                  <div className="bg-black border border-white/10 p-4 rounded-2xl text-slate-500"><Camera size={20} /></div>
                  <input className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-[#bef264] outline-none transition-all" placeholder="https://..." value={newCar.image} onChange={e => setNewCar({...newCar, image: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#bef264] text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-[#bef264]/20 italic">
                Mettre en ligne immédiatement
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5">
               <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Véhicules Actuels ({cars.length})</h3>
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

      {/* Footer Pro */}
      <footer className="bg-black pt-20 pb-10 border-t border-white/5 relative z-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <BRLLogo size="lg" />
            <p className="text-slate-500 text-sm italic font-medium">"L'expertise automobile à votre service. Achat, vente et négoce premium."</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-black text-xs uppercase tracking-widest">Horaires</h5>
            <div className="text-slate-400 text-[10px] font-bold space-y-2 uppercase tracking-widest">
              <p>Lundi - Vendredi: 09:00 - 19:00</p>
              <p>Samedi: 09:00 - 18:00</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-white font-black text-xs uppercase tracking-widest">Localisation</h5>
            <div className="flex items-start gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">
              <MapPin size={16} className="text-[#bef264]" />
              <p>62450 Bapaume<br/>France</p>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-[8px] text-slate-700 font-black uppercase tracking-[0.5em]">
          © 2024 {BRAND.name} • TOUS DROITS RÉSERVÉS
        </div>
      </footer>

      {/* Bouton Appel Flottant Mobile */}
      <a href={`tel:${BRAND.phone}`} className="md:hidden fixed bottom-6 right-6 z-50 bg-[#bef264] text-black p-5 rounded-full shadow-2xl animate-bounce">
        <Phone size={24} />
      </a>
    </div>
  );
}
