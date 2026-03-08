import React, { useState, useEffect, useRef } from 'react';
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
  Info,
  User,
  Quote,
  Upload,
  Image as ImageIcon
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

// --- COMPOSANT LOGO IDENTIQUE ---
const BRLLogo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-32 h-32",
    xl: "w-48 h-48"
  };
  
  return (
    <div className={`relative rounded-full border-[3px] border-[#bef264] flex items-center justify-center bg-black overflow-hidden shadow-[0_0_20px_rgba(190,242,100,0.4)] ${sizes[size]} ${className}`}>
      {/* Texture de fond perforée */}
      <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '4px 4px'}}></div>
      
      <div className="relative flex flex-col items-center leading-none text-center">
        <span className="text-white font-black italic tracking-tighter text-metal" style={{ fontSize: size === 'lg' ? '2.5rem' : size === 'md' ? '1.2rem' : '0.8rem' }}>BRL</span>
        <div className="h-[1.5px] w-full bg-[#bef264] my-1 opacity-50"></div>
        <span className="text-white font-bold uppercase tracking-[0.1em]" style={{ fontSize: size === 'lg' ? '0.6rem' : '0.4rem' }}>
          NÉGOCE <span className="text-[#bef264]">AUTO</span>
        </span>
        {size === 'lg' && (
          <span className="text-white/60 font-bold mt-2 text-[0.5rem] tracking-widest">06 31 53 10 34</span>
        )}
      </div>
    </div>
  );
};

const INITIAL_REVIEWS = [
  { id: 1, author: "Mickael B.", rating: 5, text: "Garage très sérieux, je recommande les yeux fermés. Achat d'un véhicule, tout s'est très bien passé.", date: "Il y a 2 mois" },
  { id: 2, author: "Sandrine L.", rating: 5, text: "Très bon accueil et conseils. Ravie de mon achat, véhicule propre et révisé.", date: "Il y a 5 mois" },
  { id: 3, author: "Kevin D.", rating: 5, text: "Sérieux et professionnel. Le service carte grise est un vrai plus !", date: "Il y a 1 mois" }
];

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
    specs: { transmission: "Automatique", power: "421 ch", color: "Noir Cosmos", owners: "1" }
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
    specs: { transmission: "DSG7", power: "320 ch", color: "Bleu Lapiz", owners: "1" }
  }
];

export default function App() {
  const [view, setView] = useState('home'); 
  const [scrolled, setScrolled] = useState(false);
  const [cars, setCars] = useState(INITIAL_CARS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedCar, setSelectedCar] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Admin Auth
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const ADMIN_SECRET = "Brlnegoce62138!"; 

  const [newCar, setNewCar] = useState({
    brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", 
    images: [], description: "", transmission: "Automatique", power: "", color: ""
  });

  const [newReview, setNewReview] = useState({ author: "", text: "", rating: 5 });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- GESTION DES PHOTOS (GLISSER-DÉPOSER) ---
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCar(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setNewCar(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    const carToAdd = {
      ...newCar,
      id: Date.now(),
      images: newCar.images.length > 0 ? newCar.images : ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200"],
      specs: { transmission: newCar.transmission, power: newCar.power, color: newCar.color, owners: "1" }
    };
    setCars([carToAdd, ...cars]);
    setNewCar({ brand: "", model: "", year: "", price: "", km: "", fuel: "Essence", images: [], description: "", transmission: "Automatique", power: "", color: "" });
    setView('inventory');
    window.scrollTo(0, 0);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const reviewToAdd = { ...newReview, id: Date.now(), date: "À l'instant" };
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ author: "", text: "", rating: 5 });
  };

  const openDetail = (car) => {
    setSelectedCar(car);
    setActiveImageIndex(0);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if(adminPass === ADMIN_SECRET) {
      setIsAdmin(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#bef264] selection:text-black font-sans pb-20 custom-scrollbar">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4 ${scrolled || view !== 'home' ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => setView('home')} className="flex items-center gap-4 group">
            <BRLLogo size="md" />
            <div className="flex flex-col leading-none text-left">
              <span className="text-white font-black italic text-xl tracking-tighter uppercase">
                BRL <span className="text-[#bef264]">NÉGOCE</span>
              </span>
              <span className="text-[10px] text-white/50 font-bold tracking-[0.3em] uppercase">PREMIUM AUTO</span>
            </div>
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => setView('home')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'home' ? 'text-[#bef264]' : 'text-white'}`}>Accueil</button>
            <button onClick={() => setView('inventory')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'inventory' ? 'text-[#bef264]' : 'text-white'}`}>Inventaire</button>
            <button onClick={() => setView('about')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'about' ? 'text-[#bef264]' : 'text-white'}`}>À Propos</button>
            <button onClick={() => setView('reviews')} className={`text-sm font-bold uppercase tracking-widest hover:text-[#bef264] transition-colors ${view === 'reviews' ? 'text-[#bef264]' : 'text-white'}`}>Avis</button>
            <button onClick={() => setView('admin')} className={`text-white/30 hover:text-white transition-colors ${view === 'admin' ? 'text-[#bef264]' : ''}`}><Lock size={18} /></button>
          </div>

          <div className="flex items-center gap-4">
            <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-white/50 hover:text-[#bef264] transition-colors">
              <Facebook size={20} />
            </a>
            <a href={`tel:${BRAND.phone}`} className="hidden md:flex bg-[#bef264] text-black px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(190,242,100,0.2)]">
              NOUS APPELER
            </a>
          </div>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bef264]/10 border border-[#bef264]/20 text-[#bef264] text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                <CheckCircle2 size={12} /> Service Carte Grise Disponible
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter italic">
                L'Excellence <br/>
                <span className="text-[#bef264]">Automobile.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-medium mb-10 max-w-xl italic border-l-4 border-[#bef264] pl-6">
                Votre partenaire de confiance à Billy-Berclau pour l'achat et la vente de véhicules premium sélectionnés.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setView('inventory')} className="bg-[#bef264] text-black px-10 py-5 rounded-lg font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(190,242,100,0.3)]">
                  DÉCOUVRIR LE STOCK
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
                    <div className="absolute bottom-6 right-6 bg-[#bef264] text-black px-6 py-2 rounded-xl font-black text-xl italic shadow-xl">{Number(car.price).toLocaleString()} €</div>
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
            <p className="text-slate-500 font-bold uppercase tracking-widest italic">Tous nos véhicules sont révisés et garantis.</p>
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
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#bef264] group-hover:text-black transition-all shadow-[0_0_15px_rgba(190,242,100,0.1)]">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- VIEW: ABOUT --- */}
      {view === 'about' && (
        <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
          <div className="bg-[#111] rounded-[60px] border border-white/5 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Quote size={200} className="text-[#bef264]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-12 leading-none relative z-10">
              Notre <span className="text-[#bef264]">Histoire</span>
            </h2>
            <div className="space-y-8 text-slate-300 text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
              <p>
                Depuis l'ouverture de <span className="text-white font-black">BRL NÉGOCE AUTO</span>, notre mission première n'a jamais changé : satisfaire nos clients en leur proposant une expérience d'achat transparente et sereine.
              </p>
              <p>
                Passionnés par l'automobile, nous sélectionnons chaque véhicule de notre parc avec la plus grande rigueur. Chaque voiture est minutieusement inspectée, révisée et préparée pour garantir votre sécurité et votre plaisir de conduire.
              </p>
              <p>
                Nous croyons qu'un achat automobile est avant tout une relation de confiance. C'est pourquoi nous vous accompagnons à chaque étape, du choix de votre véhicule aux démarches administratives de carte grise, pour que vous n'ayez qu'une chose à faire : profiter de votre nouvelle route.
              </p>
              <div className="pt-8 flex items-center gap-4 text-[#bef264]">
                <div className="h-[2px] w-20 bg-[#bef264]"></div>
                <span className="uppercase font-black tracking-widest text-sm italic">L'Équipe BRL NÉGOCE AUTO</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- VIEW: REVIEWS --- */}
      {view === 'reviews' && (
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase italic mb-4">L'Avis de nos <span className="text-[#bef264]">Clients</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest italic">Retrouvez les témoignages de ceux qui nous ont fait confiance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {reviews.map(review => (
              <div key={review.id} className="bg-[#111] p-10 rounded-[40px] border border-white/5 relative group hover:border-[#bef264]/30 transition-all">
                <div className="flex gap-1 text-[#bef264] mb-6">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-white font-medium italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#bef264]">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic text-sm">{review.author}</h4>
                    <p className="text-slate-500 text-[10px] font-bold uppercase">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-12 md:p-20 rounded-[60px]">
            <h3 className="text-black text-3xl font-black uppercase italic mb-10 text-center">Laissez-nous <span className="text-slate-400">votre avis</span></h3>
            <form onSubmit={handleAddReview} className="max-w-2xl mx-auto space-y-6">
              <input required className="w-full bg-slate-100 border-none rounded-2xl p-4 text-black placeholder-slate-400 focus:ring-2 focus:ring-[#bef264] outline-none transition-all" placeholder="Votre Nom" value={newReview.author} onChange={e => setNewReview({...newReview, author: e.target.value})} />
              <textarea required className="w-full bg-slate-100 border-none rounded-2xl p-4 text-black h-32 placeholder-slate-400 focus:ring-2 focus:ring-[#bef264] outline-none transition-all" placeholder="Votre message..." value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})}></textarea>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-bold uppercase text-xs">Note :</span>
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button" onClick={() => setNewReview({...newReview, rating: star})} className={`transition-transform hover:scale-125 ${newReview.rating >= star ? 'text-[#bef264]' : 'text-slate-300'}`}>
                      <Star size={24} fill={newReview.rating >= star ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
                <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase italic hover:bg-[#bef264] hover:text-black transition-all">Envoyer</button>
              </div>
            </form>
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
                <button type="submit" className="w-full bg-[#bef264] text-black py-4 rounded-2xl font-black uppercase italic shadow-lg shadow-[#bef264]/20">Se connecter</button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-[#111] p-12 rounded-[40px] border border-[#bef264]/30">
                <h2 className="text-3xl font-black uppercase italic mb-10">Ajouter un <span className="text-[#bef264]">Véhicule</span></h2>
                <form onSubmit={handleAddCar} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <input required className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors" placeholder="Marque" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                    <input required className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors" placeholder="Modèle" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} />
                    <input required type="number" className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors" placeholder="Prix (€)" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} />
                    <input required type="number" className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors" placeholder="Kilométrage" value={newCar.km} onChange={e => setNewCar({...newCar, km: e.target.value})} />
                    <input required className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors" placeholder="Année" value={newCar.year} onChange={e => setNewCar({...newCar, year: e.target.value})} />
                    <select className="bg-black border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-[#bef264] transition-colors appearance-none" value={newCar.fuel} onChange={e => setNewCar({...newCar, fuel: e.target.value})}>
                      <option>Essence</option>
                      <option>Diesel</option>
                      <option>Hybride</option>
                      <option>Électrique</option>
                    </select>
                  </div>
                  
                  {/* --- DROPZONE PHOTO --- */}
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => { e.preventDefault(); e.stopPropagation(); processFiles(Array.from(e.dataTransfer.files)); }}
                    className="relative border-2 border-dashed border-white/10 rounded-[40px] p-12 flex flex-col items-center justify-center gap-4 hover:border-[#bef264]/50 cursor-pointer transition-all bg-black/30 group"
                  >
                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
                    <div className="w-20 h-20 rounded-full bg-[#bef264]/10 flex items-center justify-center text-[#bef264] group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-black uppercase italic tracking-widest mb-1">Glissez vos photos ici</p>
                      <p className="text-slate-500 text-xs font-bold uppercase italic tracking-widest">Ou cliquez pour parcourir (Tous formats)</p>
                    </div>
                  </div>

                  {/* Prévisualisation des images */}
                  {newCar.images.length > 0 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
                      {newCar.images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                          <img src={img} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeImage(i); }} 
                            className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <textarea className="w-full bg-black border border-white/10 rounded-[30px] p-6 text-white h-40 outline-none focus:border-[#bef264] transition-colors italic font-medium" placeholder="Description détaillée du véhicule..." value={newCar.description} onChange={e => setNewCar({...newCar, description: e.target.value})}></textarea>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs text-center outline-none focus:border-[#bef264] transition-colors" placeholder="Boite (ex: Automatique)" value={newCar.transmission} onChange={e => setNewCar({...newCar, transmission: e.target.value})} />
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs text-center outline-none focus:border-[#bef264] transition-colors" placeholder="Puissance (ex: 421 ch)" value={newCar.power} onChange={e => setNewCar({...newCar, power: e.target.value})} />
                    <input className="bg-black border border-white/10 rounded-2xl p-4 text-white text-xs text-center outline-none focus:border-[#bef264] transition-colors" placeholder="Couleur" value={newCar.color} onChange={e => setNewCar({...newCar, color: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full bg-[#bef264] text-black py-6 rounded-[30px] font-black uppercase italic text-xl shadow-xl shadow-[#bef264]/20 hover:scale-[1.01] transition-transform">
                    METTRE EN LIGNE LE VÉHICULE
                  </button>
                </form>
              </div>

              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
                <h3 className="font-black uppercase mb-6 italic text-[#bef264]">Stock Actuel ({cars.length})</h3>
                <div className="space-y-4">
                  {cars.map(car => (
                    <div key={car.id} className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={car.images[0]} className="w-20 h-14 object-cover rounded-xl border border-white/10" />
                        <div>
                          <p className="font-black italic text-sm uppercase">{car.brand} {car.model}</p>
                          <p className="text-[#bef264] font-bold text-[10px] tracking-widest">{Number(car.price).toLocaleString()} €</p>
                        </div>
                      </div>
                      <button onClick={() => { if(window.confirm("Supprimer ce véhicule ?")) setCars(cars.filter(c => c.id !== car.id)) }} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
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

      {/* --- VIEW: DETAIL --- */}
      {view === 'detail' && selectedCar && (
        <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
          <button onClick={() => setView('inventory')} className="flex items-center gap-2 text-[#bef264] font-black uppercase text-xs mb-12 hover:translate-x-[-4px] transition-transform group">
            <ChevronLeft size={16} className="group-hover:scale-110 transition-transform" /> RETOUR AU STOCK
          </button>

          <div className="bg-[#111] rounded-[60px] border border-white/5 overflow-hidden shadow-2xl">
            <div className="bg-white p-12 md:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 className="text-black text-4xl md:text-6xl font-black uppercase italic leading-none tracking-tighter">
                  {selectedCar.brand} <br/>
                  <span className="text-slate-400">{selectedCar.model}</span>
                </h2>
              </div>
              <div className="text-black text-4xl md:text-6xl font-black italic tracking-tighter">
                {Number(selectedCar.price).toLocaleString()} €
              </div>
            </div>

            <div className="p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <div className="aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-black shadow-inner">
                  <img src={selectedCar.images[activeImageIndex]} className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {selectedCar.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === i ? 'border-[#bef264] scale-105 shadow-lg shadow-[#bef264]/20' : 'border-transparent opacity-50'}`}>
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5"><Info size={80} /></div>
                  <h4 className="text-[#bef264] font-black uppercase text-xs tracking-[0.3em] mb-6 italic">Description détaillée</h4>
                  <p className="text-slate-300 font-medium leading-relaxed italic text-lg">
                    {selectedCar.description || "Aucune description disponible pour ce véhicule."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Kilométrage", value: `${Number(selectedCar.km).toLocaleString()} KM`, icon: <Gauge size={20}/> },
                    { label: "Année", value: selectedCar.year, icon: <Calendar size={20}/> },
                    { label: "Carburant", value: selectedCar.fuel, icon: <Fuel size={20}/> },
                    { label: "Boite", value: selectedCar.specs?.transmission || "Automatique", icon: <Settings size={20}/> },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-[35px] border border-white/10 flex items-center gap-5 hover:border-[#bef264]/30 transition-colors group">
                      <div className="text-[#bef264] group-hover:scale-110 transition-transform">{item.icon}</div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.label}</p>
                        <p className="text-lg font-black italic">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a href={`tel:${BRAND.phone}`} className="w-full bg-[#bef264] text-black py-8 rounded-[40px] font-black uppercase italic text-xl text-center block hover:scale-[1.02] transition-all shadow-2xl shadow-[#bef264]/30">
                  RÉSERVER UN ESSAI IMMÉDIATEMENT
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- FOOTER FINAL --- */}
      <footer className="relative bg-[#050505] pt-32 pb-12 px-6 border-t border-white/5 overflow-hidden">
        {/* Image de fond footer intégrée intelligemment */}
        <div className="absolute inset-0 z-0 opacity-10 grayscale hover:opacity-20 transition-opacity duration-1000">
           <img 
            src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2000" 
            alt="Footer Background" 
            className="w-full h-full object-cover"
           />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-12">
            
            <div className="flex flex-col items-center gap-6">
              <BRLLogo size="lg" />
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-white font-black text-5xl italic uppercase tracking-tighter leading-none">
                  BRL <span className="text-[#bef264]">NÉGOCE AUTO</span>
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">L'excellence à votre service depuis l'ouverture</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[#bef264]">
              <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full border border-[#bef264]/20 group-hover:bg-[#bef264] group-hover:text-black transition-all">
                  <Facebook size={24} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/50 group-hover:text-white">Facebook</span>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full border border-[#bef264]/20 group-hover:bg-[#bef264] group-hover:text-black transition-all">
                  <Mail size={24} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/50 group-hover:text-white">Email</span>
              </a>
              <a href={`tel:${BRAND.phone}`} className="flex flex-col items-center gap-2 group">
                <div className="p-4 rounded-full border border-[#bef264]/20 group-hover:bg-[#bef264] group-hover:text-black transition-all">
                  <Phone size={24} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/50 group-hover:text-white">Téléphone</span>
              </a>
            </div>

            <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
              <div className="text-left space-y-2">
                <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">
                  © 2026 {BRAND.name} • TOUS DROITS RÉSERVÉS
                </p>
                <div className="flex gap-8 text-slate-800 text-[9px] font-bold uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                  <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-700">
                <MapPin size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">{BRAND.address}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a href={`tel:${BRAND.phone}`} className="fixed bottom-8 right-8 z-[110] bg-[#bef264] text-black w-20 h-20 rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(190,242,100,0.4)] hover:scale-110 transition-transform active:scale-95 group overflow-hidden">
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <Phone size={32} className="relative z-10" />
      </a>
    </div>
  );
}
