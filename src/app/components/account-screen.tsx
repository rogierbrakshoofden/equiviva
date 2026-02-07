import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Camera, 
  ChevronRight, 
  LogOut, 
  Trash2, 
  Bell, 
  Clock, 
  Globe, 
  CheckCircle2,
  Check,
  Palette
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Horse {
  id: string;
  name: string;
  photo: string;
  breed: string;
  age: string;
  gender: 'Mare' | 'Gelding' | 'Stallion';
  location: string;
  discipline: string;
  focus: string;
}

interface AccountScreenProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const THEMES = [
  { id: 'classic-heritage', name: 'Classic Heritage', colors: ['#F9F8F6', '#2D2D2D', '#3A4A3C'] },
  { id: 'dawn-ride', name: 'Dawn Ride', colors: ['#E3E9F0', '#1E293B', '#475569'] },
  { id: 'midnight-gallop', name: 'Midnight Gallop', colors: ['#141210', '#F5F2ED', '#F4A7B0'] },
  { id: 'autumn-paddock', name: 'Autumn Paddock', colors: ['#F2E9E1', '#3E2723', '#8D6E63'] },
  { id: 'clear-view', name: 'Clear View', colors: ['#FFFFFF', '#000000', '#3A4A3C'] },
];

export const AccountScreen: React.FC<AccountScreenProps> = ({ 
  isOpen, 
  onClose,
  currentTheme,
  onThemeChange
}) => {
  const [userName, setUserName] = useState('Alexandra Thorne');
  const [userEmail, setUserEmail] = useState('alexandra@equiviva.com');
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [expandedHorseId, setExpandedHorseId] = useState<string | null>(null);

  const [horses, setHorses] = useState<Horse[]>([
    {
      id: '1',
      name: 'Valegro Royale',
      photo: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a',
      breed: 'KWPN',
      age: '12',
      gender: 'Gelding',
      location: 'Utrecht, NL',
      discipline: 'Dressage',
      focus: 'Competition preparation'
    },
    {
      id: '2',
      name: 'Midnight Star',
      photo: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3',
      breed: 'Frisian',
      age: '8',
      gender: 'Mare',
      location: 'Utrecht, NL',
      discipline: 'Trail riding',
      focus: 'Maintaining wellbeing'
    }
  ]);

  const selectedHorse = horses.find(h => h.id === expandedHorseId);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[300] bg-background overflow-y-auto no-scrollbar"
    >
      {/* Header Area */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl px-6 py-6 flex justify-between items-center border-b border-border/10">
        <button onClick={onClose} className="p-2 -ml-2 text-secondary">
          <X size={24} />
        </button>
        <h1 className="font-serif text-2xl lowercase italic">me & my horses</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="px-6 py-12 max-w-xl mx-auto space-y-16 pb-40">
        {/* User Profile Section */}
        <section className="flex flex-col items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-card shadow-xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-burgundy text-white p-2.5 rounded-full shadow-lg border-2 border-card transform hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>

          <div className="w-full space-y-8">
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40">Your details</p>
            <div className="space-y-6">
              <div className="border-b border-border/20 pb-2 group">
                <label className="block text-[8px] uppercase tracking-widest text-secondary/40 font-bold mb-1">Name</label>
                <input 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-transparent font-serif italic text-2xl focus:outline-none"
                />
              </div>
              <div className="border-b border-border/20 pb-2 group">
                <label className="block text-[8px] uppercase tracking-widest text-secondary/40 font-bold mb-1">Email</label>
                <input 
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-transparent font-sans text-lg focus:outline-none text-secondary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Horses Section - NOW ABOVE SUBSCRIPTION */}
        <section className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40">Your horses</p>
          
          <div className="flex overflow-x-auto no-scrollbar -mx-6 px-6 gap-6 pb-4">
            {horses.map((horse) => (
              <motion.div
                key={horse.id}
                layoutId={`horse-surface-${horse.id}`}
                onClick={() => setExpandedHorseId(horse.id)}
                className="min-w-[280px] bg-card rounded-[2.5rem] overflow-hidden shadow-lg border border-border/5 group cursor-pointer relative"
              >
                <div className="h-48 relative">
                  <ImageWithFallback 
                    src={horse.photo} 
                    alt={horse.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-serif italic text-2xl text-white">{horse.name}</h3>
                    <p className="text-[10px] text-white/80 font-mono tracking-tighter">
                      {horse.breed} • {horse.age} yrs • {horse.gender}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add Horse Card */}
            <div className="min-w-[280px] border-2 border-dashed border-secondary/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-secondary/40 hover:text-burgundy hover:border-burgundy/40 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-black">Add horse</span>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section className="space-y-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40">Subscription</p>
          <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary/10 px-4 py-2 rounded-bl-2xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Active</span>
            </div>
            <div className="space-y-4">
              <h3 className="font-serif italic text-3xl">Premium Family</h3>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm font-sans text-secondary">€12.99 / month</p>
                  <p className="text-[10px] font-mono text-secondary/40">Renews May 12, 2026</p>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  3 horses allowed <CheckCircle2 size={14} />
                </div>
              </div>
              <button className="pt-4 text-[10px] uppercase tracking-widest font-black text-burgundy flex items-center gap-2">
                Manage subscription <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="space-y-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40">Preferences</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-4 border-b border-border/10">
              <div className="flex items-center gap-4">
                <Bell size={18} className="text-secondary/40" />
                <span className="font-sans font-medium">Notifications</span>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-secondary/20'}`}
              >
                <motion.div 
                  animate={{ x: notifications ? 26 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-card rounded-full shadow-sm"
                />
              </button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border/10">
              <div className="flex items-center gap-4">
                <Clock size={18} className="text-secondary/40" />
                <span className="font-sans font-medium">Reminders</span>
              </div>
              <button 
                onClick={() => setReminders(!reminders)}
                className={`w-12 h-6 rounded-full transition-colors relative ${reminders ? 'bg-primary' : 'bg-secondary/20'}`}
              >
                <motion.div 
                  animate={{ x: reminders ? 26 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-card rounded-full shadow-sm"
                />
              </button>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border/10">
              <div className="flex items-center gap-4">
                <Globe size={18} className="text-secondary/40" />
                <span className="font-sans font-medium">Units</span>
              </div>
              <select className="bg-transparent font-mono text-xs uppercase tracking-widest font-bold focus:outline-none">
                <option>Metric (m, kg)</option>
                <option>Imperial (ft, lb)</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border/10">
              <div className="flex items-center gap-4">
                <span className="w-[18px] h-[18px] text-secondary/40 flex items-center justify-center font-bold text-lg leading-none">€</span>
                <span className="font-sans font-medium">Currency</span>
              </div>
              <select className="bg-transparent font-mono text-xs uppercase tracking-widest font-bold focus:outline-none">
                <option>EUR (€)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </section>

        {/* App Feel (Skins) Section */}
        <section className="space-y-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40">App Feel</p>
          <div className="grid grid-cols-2 gap-4">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`p-6 rounded-[2rem] border transition-all text-left space-y-4 relative overflow-hidden group ${
                  currentTheme === t.id 
                    ? 'border-burgundy bg-burgundy/5' 
                    : 'border-border/10 bg-white/40 hover:border-border/40'
                }`}
              >
                <div className="flex gap-2">
                  {t.colors.map((c, i) => (
                    <div 
                      key={i} 
                      className="w-4 h-4 rounded-full border border-black/5" 
                      style={{ backgroundColor: c }} 
                    />
                  ))}
                </div>
                <div>
                  <h4 className={`font-serif italic text-lg leading-tight ${currentTheme === t.id ? 'text-burgundy' : 'text-foreground'}`}>
                    {t.name}
                  </h4>
                  <p className="text-[8px] uppercase tracking-widest font-black text-secondary/40">
                    {t.id === 'midnight-gallop' ? 'Improved contrast' : t.id === 'dawn-ride' ? 'Mist & steel' : t.id === 'autumn-paddock' ? 'Warm leather' : t.id === 'clear-view' ? 'High visibility' : 'Timeless sand'}
                  </p>
                </div>
                {currentTheme === t.id && (
                  <div className="absolute top-4 right-4 text-burgundy">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <section className="pt-20 space-y-12">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-8">
              <button className="text-[10px] uppercase tracking-widest font-black text-secondary/40 hover:text-secondary">Privacy Policy</button>
              <button className="text-[10px] uppercase tracking-widest font-black text-secondary/40 hover:text-secondary">Terms of Service</button>
            </div>
            <button className="w-full bg-foreground text-background py-5 rounded-[1.5rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-foreground/10 hover:bg-foreground/90 transition-colors">
              <LogOut size={20} />
              Log out
            </button>
            <button className="text-[8px] uppercase tracking-[0.3em] font-black text-burgundy opacity-40 hover:opacity-100 transition-opacity">
              Delete account permanently
            </button>
          </div>
        </section>
      </div>

      {/* Expanded Horse Details Overlay - MATCHING EDIT SCREEN UI */}
      <AnimatePresence>
        {expandedHorseId && selectedHorse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3 } }}
            className="fixed inset-0 z-[500] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12"
          >
            <div className="w-full max-w-2xl h-full max-h-[85vh] relative" style={{ perspective: 2000 }}>
              <motion.div
                layoutId={`horse-surface-${selectedHorse.id}`}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  exit={{ rotateY: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 80 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative"
                >
                  {/* FRONT SIDE (The Card) */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                      <ImageWithFallback 
                        src={selectedHorse.photo} 
                        alt={selectedHorse.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-12 left-12 right-12">
                        <h3 className="font-serif italic text-4xl text-white mb-2">{selectedHorse.name}</h3>
                        <p className="text-sm text-white/80 font-mono tracking-tighter">
                          {selectedHorse.breed} • {selectedHorse.age} yrs • {selectedHorse.gender}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (The Edit Form) */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="w-full h-full bg-card rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-border/20">
                      {/* Header */}
                      <div className="px-8 py-6 border-b border-border/30 flex justify-between items-center bg-card sticky top-0 z-10">
                        <button onClick={() => setExpandedHorseId(null)} className="p-2 -ml-2 text-secondary hover:text-primary transition-colors">
                          <X size={24} strokeWidth={1.5} />
                        </button>
                        <h2 className="font-serif text-xl italic text-center flex-1">Horse Identity</h2>
                        <button onClick={() => setExpandedHorseId(null)} className="p-2 -mr-2 text-burgundy hover:scale-110 transition-transform">
                          <Check size={24} strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 scrollbar-hide">
                        <div className="h-48 w-full rounded-[2rem] overflow-hidden relative shadow-lg">
                          <ImageWithFallback src={selectedHorse.photo} alt={selectedHorse.name} className="w-full h-full object-cover" />
                          <button className="absolute bottom-4 right-4 bg-white/40 backdrop-blur-md p-3 rounded-full text-foreground shadow-lg border border-white/40">
                            <Camera size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Name</label>
                            <input defaultValue={selectedHorse.name} className="w-full bg-transparent font-serif italic text-3xl focus:outline-none placeholder:text-border" />
                          </div>
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Gender</label>
                            <select defaultValue={selectedHorse.gender} className="w-full bg-transparent font-sans text-lg focus:outline-none appearance-none">
                              <option>Mare</option>
                              <option>Gelding</option>
                              <option>Stallion</option>
                            </select>
                          </div>
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Breed</label>
                            <input defaultValue={selectedHorse.breed} className="w-full bg-transparent font-sans text-lg focus:outline-none" />
                          </div>
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Age</label>
                            <input defaultValue={selectedHorse.age} className="w-full bg-transparent font-mono text-lg focus:outline-none" />
                          </div>
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Location</label>
                            <input defaultValue={selectedHorse.location} className="w-full bg-transparent font-sans text-lg focus:outline-none" />
                          </div>
                          <div className="space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Discipline</label>
                            <select defaultValue={selectedHorse.discipline} className="w-full bg-transparent font-sans text-lg focus:outline-none appearance-none">
                              <option>Dressage</option>
                              <option>Show jumping</option>
                              <option>Eventing</option>
                              <option>Endurance</option>
                              <option>Western riding</option>
                              <option>Trail riding</option>
                              <option>Recreational riding</option>
                              <option>Retired/companion</option>
                            </select>
                          </div>
                          <div className="md:col-span-2 space-y-2 border-b border-border/10 pb-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/60">Current Focus</label>
                            <select defaultValue={selectedHorse.focus} className="w-full bg-transparent font-sans text-lg focus:outline-none appearance-none">
                              <option>Competition preparation</option>
                              <option>Skill development</option>
                              <option>Fitness building</option>
                              <option>Rehabilitation</option>
                              <option>Maintaining wellbeing</option>
                              <option>Just enjoying time together</option>
                              <option>Retired/light activity</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>

                        <button className="flex items-center gap-3 text-burgundy opacity-40 hover:opacity-100 transition-opacity pt-4">
                          <Trash2 size={16} />
                          <span className="text-[10px] uppercase tracking-widest font-black">Remove horse from stable</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[500] opacity-[0.03] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </motion.div>
  );
};
