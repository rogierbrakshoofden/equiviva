import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowLeft, 
  Clock, 
  Activity, 
  MapPin, 
  Mic, 
  Play, 
  Plus, 
  Cloud, 
  Thermometer, 
  Calendar, 
  Repeat, 
  Share2, 
  Trash2,
  Check,
  Smile,
  Frown,
  Zap,
  Coffee,
  Meh,
  ChevronLeft,
  ChevronRight,
  Camera,
  Save,
  X,
  Keyboard,
  Type,
  Edit3
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TrainingDetailScreenProps {
  day: number;
  month: string;
  horseName: string;
  onClose: () => void;
}

export const TrainingDetailScreen: React.FC<TrainingDetailScreenProps> = ({ 
  day: initialDay, 
  month, 
  horseName, 
  onClose 
}) => {
  const [day, setDay] = useState(initialDay);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isEditingObservations, setIsEditingObservations] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(70);
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [activeTags, setActiveTags] = useState(['Lateral work', 'Transitions']);
  const [notes, setNotes] = useState('Working on half-passes, 45min. Valegro was very attentive today, especially in the collected trot. Transitions were sharp.');
  const [observations, setObservations] = useState('');
  const [sessionType, setSessionType] = useState('Dressage');
  const [duration, setDuration] = useState('45');
  const [intensity, setIntensity] = useState('Intense');
  const [location, setLocation] = useState('Indoor Arena');

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  
  const heroHeight = useTransform(scrollY, [0, 200], [320, 100]);
  const heroOpacity = useTransform(scrollY, [0, 150], [1, 0.4]);

  const tags = [
    { label: "Lateral work", type: "Dressage" },
    { label: "Transitions", type: "Dressage" },
    { label: "Collection", type: "Dressage" },
    { label: "Test sections", type: "Dressage" },
    { label: "Grid work", type: "Jumping" },
    { label: "Course", type: "Jumping" },
    { label: "Walk", type: "General" },
    { label: "Trot", type: "General" },
    { label: "Canter", type: "General" },
    { label: "Ground work", type: "General" },
  ];

  const toggleTag = (label: string) => {
    setActiveTags(prev => 
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  };

  const moods = [
    { id: 'Enthusiastic', icon: <Zap size={18} />, label: 'Enthusiastic' },
    { id: 'Happy', icon: <Smile size={18} />, label: 'Happy' },
    { id: 'Distracted', icon: <Meh size={18} />, label: 'Distracted' },
    { id: 'Tense', icon: <Frown size={18} />, label: 'Tense' },
    { id: 'Reluctant', icon: <Coffee size={18} />, label: 'Reluctant' },
  ];

  const contextCards = [
    { icon: <Cloud size={14} />, text: "12°C, Partly Cloudy", subtext: "Weather" },
    { icon: <Calendar size={14} />, text: "5 days since farrier", subtext: "Maintenance" },
    { icon: <Activity size={14} />, text: "2 rest days before", subtext: "Recovery" },
    { icon: <Repeat size={14} />, text: "4th session this week", subtext: "Load" },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      drag={!(isEditingNotes || isEditingObservations) ? "y" : false}
      dragConstraints={{ top: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.offset.y > 150) {
          onClose();
        }
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[500] bg-background flex flex-col overflow-hidden"
    >
      {/* Top Fixed Navigation - Pinned for Dynamic Island */}
      <div className="absolute top-0 left-0 right-0 z-[100] p-6 pt-12 flex items-center justify-between pointer-events-none">
        <button 
          onClick={onClose} 
          className="w-10 h-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/40 transition-colors pointer-events-auto shadow-lg"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Day Switching UI - Sticky Location */}
        <div className="flex items-center bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-2xl pointer-events-auto">
          <button 
            onClick={() => setDay(prev => Math.max(1, prev - 1))}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white min-w-[120px] text-center px-2">
            {month.split(' ')[0]} {day}
          </span>
          <button 
            onClick={() => setDay(prev => prev + 1)}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <button 
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-all pointer-events-auto shadow-lg"
        >
          <Camera size={18} />
        </button>
      </div>

      {/* Session Hero - Collapsing on scroll */}
      <motion.section 
        style={{ height: heroHeight, opacity: heroOpacity }}
        className="relative overflow-hidden shrink-0 z-0"
      >
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=1000" 
          alt="Training Session" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </motion.section>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar bg-background relative z-10"
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40 }}
      >
        <div className="px-6 py-10 space-y-12 pb-32">
          {/* Session Header & Overview */}
          <section className="space-y-8">
            <div className="space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">Session Log</p>
              <div className="relative inline-block">
                <select 
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  <option value="Dressage">Dressage</option>
                  <option value="Jumping">Jumping</option>
                  <option value="Trail ride">Trail ride</option>
                  <option value="Lunging">Lunging</option>
                </select>
                <h2 className="text-foreground font-serif italic text-4xl flex items-center gap-2">
                  {sessionType}
                  <ChevronRight size={18} className="text-foreground/20 rotate-90" />
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Session overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Clock size={16} />
                  </div>
                  <div className="flex-1 relative">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Duration</p>
                    <input 
                      type="text" 
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-transparent font-mono text-sm font-bold focus:outline-none border-b border-transparent focus:border-primary/20 transition-all"
                    />
                    <span className="absolute right-0 bottom-0 text-[10px] font-mono text-secondary/40">min</span>
                  </div>
                </div>
                <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 bg-burgundy/10 text-burgundy rounded-lg">
                    <Activity size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Intensity</p>
                    <select 
                      value={intensity} 
                      onChange={(e) => setIntensity(e.target.value)}
                      className="w-full bg-transparent font-mono text-sm font-bold focus:outline-none appearance-none"
                    >
                      <option value="Rest">Rest</option>
                      <option value="Light">Light</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Intense">Intense</option>
                    </select>
                  </div>
                </div>
                <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <MapPin size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Location</p>
                    <input 
                      type="text" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent font-mono text-sm font-bold focus:outline-none border-b border-transparent focus:border-secondary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3 opacity-60">
                  <div className="p-2 bg-foreground/5 text-foreground/60 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Time</p>
                    <p className="font-mono text-sm font-bold">10:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Training Notes */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Training Notes</h2>
              <button 
                onClick={() => setIsEditingNotes(true)}
                className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p 
                onClick={() => setIsEditingNotes(true)}
                className="font-serif text-lg italic leading-relaxed text-foreground cursor-text"
              >
                {notes}
              </p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => toggleTag(tag.label)}
                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      activeTags.includes(tag.label)
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10'
                        : 'bg-white/40 border border-border/20 text-secondary/60 hover:border-primary/40'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Voice Note Playback */}
              <div className="bg-card/60 backdrop-blur-sm border border-border/10 rounded-2xl p-4 flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform active:scale-90"
                >
                  {isPlaying ? <div className="w-3 h-3 bg-white rounded-sm" /> : <Play size={18} className="ml-1" />}
                </button>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-black text-secondary/40">
                    <span>Voice Memo • 0:42</span>
                    <span>10 Feb 2026</span>
                  </div>
                  <div className="h-6 flex items-center gap-[2px]">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: isPlaying ? [10, 24, 12, 20][i % 4] : [12, 16, 8, 14][i % 4],
                          opacity: isPlaying && i > 15 ? 0.4 : 1
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.8, 
                          delay: i * 0.05,
                          ease: "easeInOut"
                        }}
                        className={`w-[2px] rounded-full ${isPlaying ? 'bg-primary' : 'bg-secondary/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Horse Felt */}
          <section className="space-y-6">
            <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">How {horseName} felt</h2>
            
            <div className="space-y-8">
              {/* Energy Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">Energy Level</span>
                  <span className="font-mono text-sm font-bold text-primary">{energyLevel}%</span>
                </div>
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${energyLevel}%` }}
                    className="absolute inset-y-0 left-0 bg-primary"
                  />
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Mood Quick Select */}
              <div className="grid grid-cols-5 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                      selectedMood === mood.id
                        ? 'bg-primary/5 border-primary text-primary shadow-sm'
                        : 'bg-card/20 border-border/10 text-secondary/40'
                    }`}
                  >
                    {mood.icon}
                    <span className="text-[8px] uppercase font-black tracking-widest text-center">{mood.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Specific Observations</h3>
                  <button 
                    onClick={() => setIsEditingObservations(true)}
                    className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
                <p 
                  onClick={() => setIsEditingObservations(true)}
                  className={`font-sans text-sm italic leading-relaxed cursor-text ${observations ? 'text-foreground' : 'text-secondary/30'}`}
                >
                  {observations || "Tap to add specific observations (lameness, stiffness, etc.)..."}
                </p>
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="space-y-4 -mx-6">
            <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40 px-6">Media</h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-6">
              <button className="flex-shrink-0 w-32 aspect-square rounded-2xl border-2 border-dashed border-border/20 flex flex-col items-center justify-center gap-2 text-secondary/40 hover:text-primary hover:border-primary/40 transition-colors">
                <Plus size={24} />
                <span className="text-[8px] uppercase font-black tracking-widest">Add media</span>
              </button>
              {[
                "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a",
                "https://images.unsplash.com/photo-1566373024505-88574341995a",
                "https://images.unsplash.com/photo-1598974357801-cbca100e65d3"
              ].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-32 aspect-square rounded-2xl overflow-hidden relative group">
                  <ImageWithFallback src={img} alt={`Training photo ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>

          {/* Context */}
          <section className="grid grid-cols-2 gap-4">
            {contextCards.map((card, i) => (
              <div key={i} className="bg-card/30 border border-border/10 rounded-2xl p-4 space-y-1">
                <div className="flex items-center gap-2 text-secondary/40">
                  {card.icon}
                  <span className="text-[8px] uppercase font-black tracking-widest">{card.subtext}</span>
                </div>
                <p className="font-sans text-xs font-bold">{card.text}</p>
              </div>
            ))}
          </section>

          {/* Actions */}
          <section className="pt-8 space-y-3 pb-12">
            <button className="w-full bg-foreground text-background py-4 rounded-full font-sans text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-foreground/10 active:scale-[0.98] transition-all">
              <Repeat size={18} />
              Duplicate session
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-muted/30 text-foreground py-4 rounded-full font-sans text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <Share2 size={18} />
                Share
              </button>
              <button className="bg-burgundy/10 text-burgundy py-4 rounded-full font-sans text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {(isEditingNotes || isEditingObservations) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-6 pt-12 flex items-center justify-between border-b border-border/10">
              <button 
                onClick={() => {
                  setIsEditingNotes(false);
                  setIsEditingObservations(false);
                }}
                className="p-2 -ml-2 text-foreground/60"
              >
                <X size={20} />
              </button>
              <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em]">
                {isEditingNotes ? "Edit Training Notes" : "Edit Observations"}
              </h2>
              <button 
                onClick={() => {
                  setIsEditingNotes(false);
                  setIsEditingObservations(false);
                }}
                className="px-4 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                Done
              </button>
            </div>
            
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <div className="flex items-center gap-2 text-primary">
                {isEditingNotes ? <Type size={16} /> : <Activity size={16} />}
                <span className="text-[10px] uppercase font-black tracking-widest">
                  {isEditingNotes ? "Keyboard Input" : "Condition Tracking"}
                </span>
              </div>
              <textarea 
                autoFocus
                value={isEditingNotes ? notes : observations}
                onChange={(e) => isEditingNotes ? setNotes(e.target.value) : setObservations(e.target.value)}
                className={`w-full bg-transparent leading-relaxed focus:outline-none resize-none flex-1 ${isEditingNotes ? 'font-serif text-3xl italic' : 'font-sans text-2xl'}`}
                placeholder={isEditingNotes ? "How was the ride today?" : "Any stiffness, heat in legs, or other observations?"}
              />
              
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-2 text-secondary/40">
                  <Mic size={16} />
                  <span className="text-[10px] uppercase font-black tracking-widest">Add with Voice Memo</span>
                </div>
                <button className="w-full h-24 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2 group hover:bg-primary/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                    <Mic size={20} />
                  </div>
                  <span className="text-[8px] uppercase font-black tracking-widest text-primary/60">Tap to record</span>
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-muted/20 border-t border-border/10 flex items-center justify-center text-secondary/40 gap-2">
              <Keyboard size={14} />
              <span className="text-[10px] uppercase font-black tracking-widest">Native keyboard active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
