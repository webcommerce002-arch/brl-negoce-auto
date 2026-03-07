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
  Eye
} from 'lucide-react';

// --- CONFIGURATION DE MARQUE ---
const BRAND = {
  name: "BRL Negoce Auto",
  phone: "06 31 53 10 34",
  facebookUrl: "https://www.facebook.com/p/BRL-Negoce-Auto-100067446651682/",
  followers: "921",
};

// --- COMPOSANT SPECTATEUR 360° (Simulation Interactive) ---
const Car360Viewer = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);
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
    setRotation((prev) => (prev + diff * 0.5) % 360);
    setStartX(currentX);
  };

  const handleEnd = () => setIsDragging(false);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[450px] bg-slate-900 rounded-[32px] overflow-hidden cursor-grab active:cursor-grabbing group"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Simulation de rotation via CSS pour le prototype */}
        <div 
          className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
          style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
        >
          <img 
            src={imageUrl} 
            alt="Vue 360" 
            className="max-w-[120%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(190,242,100,0.2)]"
          />
        </div>
      </div>
      
      {/* UI Overlay du 360 */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="bg-lime-500 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Rotate3d size={12} /> Vue 360° Interactive
          </div>
        </div>
        <div className="text-center">
          <p className="text-white/30 text-[10px] uppercase font-bold tracking-[0.3em] group-hover:text-lime-500/50 transition-colors">
            Faites glisser pour tourner le véhicule
          </p>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-lime-500/20 blur-3xl rounded-full"></div>
    </div>
  );
};

// --- APPLICATION PRINCIPALE ---
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewedCar, setViewedCar] = useState(null); // Pour le modal 360

  const [cars, setCars] = useState([
    {
      id: 1,
      brand: "Mercedes-Benz",
      model: "Classe A 45 S AMG",
      year: "2023",
      price: "68900",
      km: "12500",
      fuel: "Essence",
      image: "https://images.unsplash.com/photo-1617650728468-807eb271b467?auto=format&fit=crop&q=80&w=1200",
      specs: "421 ch | 4Matic+ | Toit Panoramique"
    },
    {
      id: 2,
      brand: "Volkswagen",
      model: "Golf 8 R",
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
      
      {/* Navigation Flottante Mobile & Desktop */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-lime-500/10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-2xl md:text-3xl font-black text-slate-100 italic">BRL <span className="text-white uppercase not-italic text-lg md:text-xl">NÉGOCE</span></span>
            <div className="flex items-center">
              <div className="h-[2px] w-8 bg-lime-500 mr-2"></div>
              <span className="text-lg font-black text-white italic tracking-widest">AUTO</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-3 rounded-xl transition-all ${isAdmin ? 'bg-lime-500 text-slate-950' : 'bg-white/5 text-slate-400 hover:text-white'}`}
              title="Mode Gestion"
            >
              <LayoutDashboard size={20} />
            </button>
            <a href={`tel:${BRAND.phone}`} className="hidden md:flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold">
              <Phone size={16} className="text-lime-500" /> {BRAND.phone}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 text-[10px] font-black uppercase tracking-[0.4em]">
            <CheckCircle2 size={16} /> Dashboard de Gestion {isAdmin && "Actif"}
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none">
            {isAdmin ? "GÉRER VOTRE" : "NOTRE"} <span className="text-lime-500">STOCK.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed italic">
            {isAdmin ? "Ajoutez, modifiez ou supprimez vos annonces en temps réel." : "Découvrez nos derniers arrivages sélectionnés par nos experts."}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-32">
        
        {/* Barre d'actions Admin */}
        {isAdmin && (
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-slate-900/50 rounded-[32px] border border-lime-500/20">
            <div className="text-center md:text-left">
              <p className="text-white font-black text-xl italic uppercase">Gestionnaire d'annonces</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{cars.length} Véhicules en ligne</p>
            </div>
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-lime-500 text-slate-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-lime-500/10"
            >
              <Plus size={20} /> Ajouter un véhicule
            </button>
          </div>
        )}

        {/* Grille de véhicules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {cars.map((car) => (
            <div key={car.id} className="group bg-slate-900/30 border border-white/5 rounded-[48px] overflow-hidden hover:border-lime-500/40 transition-all duration-700">
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img src={car.image || "https://images.unsplash.com/photo-1542362567-b05261b60f44?auto=format&fit=crop&q=80&w=1200"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                
                {/* Badge de prix flottant */}
                <div className="absolute bottom-6 right-6 bg-lime-500 text-slate-950 px-6 py-2 rounded-2xl font-black text-2xl italic shadow-2xl">
                  {Number(car.price).toLocaleString()} €
                </div>

                {/* Bouton Admin Delete */}
                {isAdmin && (
                  <button 
                    onClick={() => deleteCar(car.id)}
                    className="absolute top-6 right-6 bg-red-500 text-white p-3 rounded-xl hover:scale-110 transition-all shadow-xl"
                  >
                    <Trash2 size={20} />
                  </button>
                )}

                {/* Bouton Vue 360 */}
                <button 
                  onClick={() => setViewedCar(car)}
                  className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl hover:bg-lime-500 hover:text-slate-950 transition-all border border-white/10"
                >
                  <Rotate3d size={24} />
                </button>
              </div>

              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <span className="text-lime-500 text-xs font-black uppercase tracking-[0.3em] mb-2 block">{car.brand}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{car.model}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    <Gauge size={16} className="text-lime-500" /> {Number(car.km).toLocaleString()} KM
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    <Calendar size={16} className="text-lime-500" /> {car.year}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-sm text-slate-300 font-medium italic">{car.specs || "Aucune spécification ajoutée"}</p>
                </div>
                
                <button className="w-full py-5 bg-slate-800 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl group-hover:bg-lime-500 group-hover:text-slate-950 transition-all duration-500 italic flex items-center justify-center gap-2">
                  DÉTAILS COMPLETS <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- MODAL AJOUT (ADMIN) --- */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-4 py-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setShowAddForm(false)}></div>
          <div className="relative w-full max-w-2xl bg-slate-900 border border-lime-500/30 rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-white italic uppercase italic">Nouvelle <span className="text-lime-500">Annonce</span></h2>
                <button onClick={() => setShowAddForm(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24}/></button>
              </div>
              
              <form onSubmit={handleAddCar} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Marque</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="ex: BMW" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Modèle</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="ex: M4 Competition" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Année</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="2024" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Prix (€)</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="95000" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">KM</label>
                    <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="5000" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">URL de l'image (Principale)</label>
                  <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-slate-500"><Camera size={20} /></div>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all" placeholder="https://..." value={newCar.image} onChange={e => setNewCar({...newCar, image: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2">Détails / Options</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-lime-500 outline-none transition-all h-24" placeholder="ex: Pack Carbone, Toit ouvrant, Échappement Sport..." value={newCar.specs} onChange={e => setNewCar({...newCar, specs: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-lime-500 text-slate-950 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-lime-500/20 italic">
                  Publier l'annonce maintenant
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL VUE 360° --- */}
      {viewedCar && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setViewedCar(null)}></div>
          <div className="relative w-full max-w-5xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-lime-500 text-xs font-black uppercase tracking-widest">{viewedCar.brand}</span>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">{viewedCar.model}</h2>
              </div>
              <button onClick={() => setViewedCar(null)} className="p-4 bg-white/5 rounded-full text-white hover:bg-lime-500 hover:text-slate-950 transition-all border border-white/10">
                <X size={24} />
              </button>
            </div>
            <Car360Viewer imageUrl={viewedCar.image} />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { icon: <Zap size={16}/>, label: "Performance", value: "Expert" },
                 { icon: <Smartphone size={16}/>, label: "Digital", value: "Showroom" },
                 { icon: <Handshake size={16}/>, label: "Garantie", value: "Nexus+" },
                 { icon: <Eye size={16}/>, label: "Inspection", value: "OK" }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                    <div className="text-lime-500 flex justify-center mb-2">{item.icon}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.label}</div>
                    <div className="text-white font-bold text-sm uppercase">{item.value}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* --- DECORATIVE ELEMENTS --- */}
      <div className="fixed top-0 -left-1/4 w-[60%] h-[60%] bg-lime-500/5 blur-[200px] -z-10 rounded-full"></div>
      <div className="fixed bottom-0 -right-1/4 w-[60%] h-[60%] bg-blue-600/5 blur-[200px] -z-10 rounded-full"></div>
    </div>
  );
}
