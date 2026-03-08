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
  HelpCircle,
  Settings,
  Lock,
  ArrowUpRight,
  Info
} from 'lucide-react';

// --- CONFIGURATION ---
const BRAND = {
  name: "BRL NÉGOCE AUTO",
  phone: "06 31 53 10 34",
  email: "brl.negoce@gmail.com",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  address: "6 rue Jules ferry, Billy-Berclau, 62138",
  colors: {
    primary: "#bef264", // Lime Green
    dark: "#0a0a0a",
    darker: "#050505",
    textGray: "#94a3b8"
  }
};

const INITIAL_CARS = [
  {
    id: 1,
    brand: "MERCEDES-BENZ",
    model: "CLASSE A 45 S AMG",
    year: "2023",
    price: "68900",
    km: "12500",
    fuel: "Essence",
    images: [
      "https://images.unsplash.com/photo-1617650728468-807eb271b467?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1554744512-d6c603f27c54?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Une performance exceptionnelle rencontrant un luxe inégalé. Ce modèle AMG est équipé de toutes les dernières technologies Mercedes, incluant le MBUX et une transmission 4Matic+ ultra-réactive. État clinique, première main.",
    specs: {
      transmission: "Automatique",
      power: "421 ch",
      color: "Noir Cosmos",
      owners: "1"
    }
  },
  {
    id: 2,
    brand: "VOLKSWAGEN",
    model: "GOLF 8 R",
    year: "2022",
    price: "52500",
    km: "21000",
    fuel: "Essence",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "La Golf R est l'aboutissement de la polyvalence. Sportive le week-end, confortable la semaine. Équipée de l'échappement Akrapovic optionnel et du pack Performance.",
    specs: {
      transmission: "DSG7",
      power: "320 ch",
      color: "Bleu Lapiz",
      owners: "1"
    }
  }
];

export default function App() {
  const [view, setView] = useState('home'); // home, inventory, admin, detail
  const [scrolled, setScrolled] = useState(false);
  const [cars, setCars] = useState(INITIAL_CARS);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Admin Auth Mock
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const [newCar, setNewCar] = useState({
    brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", 
    images: "", description: "", transmission: "Automatique", power: "", color: ""
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddCar = (e) => {
    e.preventDefault();
    const carImages = newCar.images.split(',').map(url => url.trim()).filter(url => url !== "");
    const carToAdd = {
      ...newCar,
      id: Date.now(),
      images: carImages.length > 0 ? carImages : ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200"],
      specs: {
        transmission: newCar.transmission,
        power: newCar.power,
        color: newCar.color,
        owners: "1"
      }
    };
    setCars([carToAdd, ...cars]);
    setNewCar({ brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", images: "", description: "", transmission: "Automatique", power: "", color: "" });
    setView('inventory');
    window.scrollTo(0, 0);
  };

  const openDetail = (car) => {
    setSelectedCar(car);
    setActiveImageIndex(0);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if(adminPass === "1234") { // Mock password
      setIsAdmin(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#bef264] selection:text-black font-sans pb-20">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 ${scrolled || view !== 'home' ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => setView('home')} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-full border-2 border-[#bef264] flex items-center justify-center bg-black overflow-hidden shadow-[0_0_15px_rgba(190,242,100,0.3)]">
              <span className="text-white font-black italic text-sm group-hover:scale-110 transition-transform">BRL</span>
            </div>
            <span className="text-white font-black text-xl tracking-tighter uppercase italic">
              BRL <span className="text-[#bef264]">NÉGOCE</span>
            </span>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => setView('home')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'home' ? 'text-[#bef264]' : 'text-white'}`}>Accueil</button>
            <button onClick={() => setView('inventory')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'inventory' ? 'text-[#bef264]' : 'text-white'}`}>Inventaire</button>
            <button onClick={() => setView('admin')} className={`text-white/30 hover:text-white transition-colors ${view === 'admin' ? 'text-[#bef264]' : ''}`}><Lock size={18} /></button>
          </div>

          <a href={`tel:${BRAND.phone}`} className="hidden md:flex bg-[#bef264] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
            Nous Appeler
          </a>
        </div>
      </nav>

      {/* --- VIEW: HOME --- */}
      {view === 'home' && (
        <>
          <section className="relative h-screen flex items-center pt-20 px-6 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto w-full relative z-10">
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                L'Excellence <br/>
                <span className="text-[#bef264]">Automobile.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-xl italic border-l-4 border-[#bef264] pl-6">
                Votre partenaire de confiance à Billy-Berclau pour l'achat et la vente de véhicules premium sélectionnés.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setView('inventory')} className="bg-[#bef264] text-black px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-white transition-all">
                  Découvrir le Stock
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full bg-[#bef264] py-8 overflow-hidden hidden md:block">
              <div className="flex justify-center items-center gap-12 animate-infinite-scroll whitespace-nowrap text-black font-black text-xl uppercase italic">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center gap-12">
                    <span>Transparence Totale</span> <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Prix Justes</span> <div className="w-2 h-2 bg-black rounded-full"></div>
                    <span>Garantie 3 Mois</span> <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Grid */}
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-12 uppercase italic">Derniers <span className="text-[#bef264]">Arrivages</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cars.slice(0, 2).map(car => (
                <div key={car.id} onClick={() => openDetail(car)} className="group cursor-pointer bg-[#111] rounded-[40px] overflow-hidden border border-white/5 hover:border-[#bef264]/50 transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <img src={car.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-6 right-6 bg-[#bef264] text-black px-6 py-2 rounded-xl font-black text-xl italic">{Number(car.price).toLocaleString()} €</div>
                  </div>
                  <div className="p-8">
                    <p className="text-[#bef264] text-xs font-black uppercase tracking-widest mb-2">{car.brand}</p>
                    <h3 className="text-3xl font-black uppercase italic">{car.model}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="py-24 px-6 bg-black/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <ShieldCheck size={32} />, title: "Garantie 3 Mois", desc: "Révisés et garantis, extension possible." },
                { icon: <Award size={32} />, title: "Gestion ANTS", desc: "Accompagnement pour votre carte grise." },
                { icon: <Zap size={32} />, title: "750+ Ventes", desc: "Une expertise prouvée par nos clients." },
                { icon: <Handshake size={32} />, title: "Dépôt-Vente", desc: "Confiez-nous votre véhicule en toute sécurité." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-10 rounded-[40px] bg-[#111] border border-white/5 hover:border-[#bef264]/30 transition-all group">
                  <div className="text-[#bef264] mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-white font-black uppercase italic mb-3 tracking-tighter text-lg">{item.title}</h4>
                  <p className="text-slate-500 text-sm font-medium italic leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* --- VIEW: INVENTORY --- */}
      {view === 'inventory' && (
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase italic mb-4">Notre <span className="text-[#bef264]">Stock</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest">Tous nos véhicules sont révisés et garantis.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map(car => (
              <div key={car.id} onClick={() => openDetail(car)} className="group cursor-pointer bg-[#111] border border-white/5 rounded-[40px] overflow-hidden hover:border-[#bef264]/50 transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={car.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-black italic">{car.year}</div>
                </div>
                <div className="p-8">
                  <span className="text-[#bef264] text-[10px] font-black uppercase tracking-widest mb-2 block">{car.brand}</span>
                  <h3 className="text-2xl font-black uppercase italic mb-6">{car.model}</h3>
                  <div className="flex justify-between items-center border-t border-white/5 pt-6">
                    <span className="text-2xl font-black italic">{Number(car.price).toLocaleString()} €</span>
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#bef264] group-hover:text-black transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- VIEW: DETAIL --- */}
      {view === 'detail' && selectedCar && (
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <button onClick={() => setView('inventory')} className="flex items-center gap-2 text-[#bef264] font-black uppercase text-xs mb-12 hover:translate-x-[-4px] transition-transform">
            <ChevronLeft size={16} /> Retour au stock
          </button>

          <div className="bg-[#111] rounded-[60px] border border-white/5 overflow-hidden">
            {/* Header Detail */}
            <div className="bg-white p-12 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-black text-4xl md:text-6xl font-black uppercase italic leading-none">
                  {selectedCar.brand} <br/>
                  <span className="text-slate-400">{selectedCar.model}</span>
                </h2>
              </div>
              <div className="text-black text-4xl md:text-6xl font-black italic">
                {Number(selectedCar.price).toLocaleString()} €
              </div>
            </div>

            <div className="p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Gallery */}
              <div className="space-y-6">
                <div className="aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-black">
                  <img src={selectedCar.images[activeImageIndex]} className="w-full h-full object-cover animate-in fade-in duration-500" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {selectedCar.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === i ? 'border-[#bef264] scale-105' : 'border-transparent opacity-50'}`}>
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-12">
                <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                  <h4 className="text-[#bef264] font-black uppercase text-xs tracking-widest mb-6">Description</h4>
                  <p className="text-slate-300 font-medium leading-relaxed italic">
                    {selectedCar.description || "Aucune description disponible pour ce véhicule."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Kilométrage", value: `${Number(selectedCar.km).toLocaleString()} KM`, icon: <Gauge size={16}/> },
                    { label: "Année", value: selectedCar.year, icon: <Calendar size={16}/> },
                    { label: "Carburant", value: selectedCar.fuel, icon: <Fuel size={16}/> },
                    { label: "Boite", value: selectedCar.specs?.transmission || "Automatique", icon: <Settings size={16}/> },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                      <div className="text-[#bef264]">{item.icon}</div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase">{item.label}</p>
                        <p className="text-sm font-bold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a href={`tel:${BRAND.phone}`} className="w-full bg-[#bef264] text-black py-6 rounded-[30px] font-black uppercase italic text-center block hover:scale-[1.02] transition-transform shadow-2xl shadow-[#bef264]/20">
                  Réserver un essai
                </a>
              </div>
            </div>

            {/* Table Detail Bottom */}
            <div className="bg-black/40 border-t border-white/10 p-12 md:px-20">
               <h3 className="text-white font-black uppercase italic mb-8 flex items-center gap-3">
                 <Info size={20} className="text-[#bef264]" /> Caractéristiques Techniques
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4">
                  {[
                    { label: "Type de véhicule", value: "Occasion" },
                    { label: "État", value: "Excellent" },
                    { label: "Puissance", value: selectedCar.specs?.power || "N/C" },
                    { label: "Couleur", value: selectedCar.specs?.color || "N/C" },
                    { label: "Propriétaires", value: selectedCar.specs?.owners || "1" },
                    { label: "Garantie", value: "3 Mois incluse" }
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between py-4 border-b border-white/5 text-sm uppercase font-bold tracking-widest">
                      <span className="text-slate-500">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>
      )}

      {/* --- VIEW: ADMIN --- */}
      {view === 'admin' && (
        <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
          {!isAdmin ? (
            <div className="bg-[#111] p-12 rounded-[40px] border border-[#bef264]/30 text-center">
              <Lock size={48} className="text-[#bef264] mx-auto mb-6" />
              <h2 className="text-3xl font-black uppercase italic mb-8">Accès <span className="text-[#bef264]">Admin</span></h2>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <input 
                  type="password" 
                  className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white text-center focus:border-[#bef264] outline-none" 
                  placeholder="Mot de passe" 
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                />
                <button type="submit" className="w-full bg-[#bef264] text-black py-4 rounded-2xl font-black uppercase italic">Se connecter</button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-[#111] p-12 rounded-[40px] border border-[#bef264]/30">
                <h2 className="text-3xl font-black uppercase italic mb-10">Ajouter un <span className="text-[#bef264]">Véhicule</span></h2>
                <form onSubmit={handleAddCar} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <input required className="bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="Marque" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                    <input required className="bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="Modèle" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                    <input required type="number" className="bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="Prix (€)" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                    <input required type="number" className="bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="Kilométrage" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
                    <input required className="bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="Année" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                    <select className="bg-black border border-white/10 rounded-2xl p-4 text-white" value={newCar.fuel} onChange={e => setNewCar({...newCar, fuel: e.target.value})}>
                      <option>Essence</option>
                      <option>Diesel</option>
                      <option>Hybride</option>
                      <option>Électrique</option>
                    </select>
                  </div>
                  <input className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white" placeholder="URLs des photos (séparées par des virgules)" value={newCar.images} onChange={e => setNewCar({...newCar, images: e.target.value})} />
                  <textarea className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white h-32" placeholder="Description du véhicule..." value={newCar.description} onChange={e => setNewCar({...newCar, description: e.target.value})}></textarea>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs" placeholder="Boite (ex: Auto)" value={newCar.transmission} onChange={e => setNewCar({...newCar, transmission: e.target.value})} />
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs" placeholder="Puissance (ex: 400ch)" value={newCar.power} onChange={e => setNewCar({...newCar, power: e.target.value})} />
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs" placeholder="Couleur" value={newCar.color} onChange={e => setNewCar({...newCar, color: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full bg-[#bef264] text-black py-5 rounded-2xl font-black uppercase italic shadow-lg shadow-[#bef264]/20">Mettre en ligne</button>
                </form>
              </div>

              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                <h3 className="font-black uppercase mb-6 italic">Gérer le stock ({cars.length})</h3>
                <div className="space-y-4">
                  {cars.map(car => (
                    <div key={car.id} className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <img src={car.images[0]} className="w-16 h-12 object-cover rounded-xl" />
                        <div>
                          <p className="font-black italic text-sm">{car.brand} {car.model}</p>
                          <p className="text-[#bef264] font-bold text-xs">{Number(car.price).toLocaleString()} €</p>
                        </div>
                      </div>
                      <button onClick={() => { if(window.confirm("Supprimer ?")) setCars(cars.filter(c => c.id !== car.id)) }} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* --- MAP SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-[#111] rounded-[60px] border border-white/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20">
              <h2 className="text-5xl font-black uppercase italic mb-8">Nous <span className="text-[#bef264]">Trouver</span></h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="bg-[#bef264] text-black p-4 rounded-2xl"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-black uppercase italic text-lg mb-2">Notre Garage</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                      {BRAND.address} <br/> Billy-Berclau, France
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="bg-[#bef264] text-black p-4 rounded-2xl"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-black uppercase italic text-lg mb-2">Contact Direct</h4>
                    <p className="text-slate-500 font-bold uppercase tracking-widest">{BRAND.phone}</p>
                    <p className="text-slate-500 font-bold uppercase tracking-widest">{BRAND.email}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Google Maps Embed */}
            <div className="h-[400px] lg:h-auto border-l border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2537.915124673641!2d2.856980577030807!3d50.49853997159781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dd395493064e43%3A0x6b1f2e96d9365611!2s6%20Rue%20Jules%20Ferry%2C%2062138%20Billy-Berclau!5e0!3m2!1sfr!2sfr!4v1710123456789!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#bef264] flex items-center justify-center bg-black">
                <span className="text-white font-black italic text-xl">BRL</span>
              </div>
              <h3 className="text-white font-black text-4xl italic uppercase">BRL <span className="text-[#bef264]">NÉGOCE</span></h3>
            </div>
            
            <div className="flex gap-8 text-[#bef264]">
              <a href={BRAND.facebookUrl} className="hover:scale-125 transition-transform"><Facebook size={24} /></a>
              <a href="#" className="hover:scale-125 transition-transform"><Instagram size={24} /></a>
              <a href={`mailto:${BRAND.email}`} className="hover:scale-125 transition-transform"><Mail size={24} /></a>
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
              <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">
                © 2026 {BRAND.name} • TOUS DROITS RÉSERVÉS
              </p>
              <div className="flex gap-8 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em]">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a href={`tel:${BRAND.phone}`} className="fixed bottom-8 right-8 z-[110] bg-[#bef264] text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-[#bef264]/40 hover:scale-110 transition-transform">
        <Phone size={28} />
      </a>
    </div>
  );
}
