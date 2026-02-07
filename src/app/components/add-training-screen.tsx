import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Clock, 
  Activity, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Edit3, 
  Play, 
  Mic, 
  Plus, 
  Camera, 
  Smile, 
  Zap, 
  Meh, 
  Frown, 
  Coffee,
  Type,
  Keyboard
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddTrainingScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: any) => void;
  horseName: string;
}

export const AddTrainingScreen: React.FC<AddTrainingScreenProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  horseName 
}) => {
  const [sessionType, setSessionType] = useState('Dressage');
  const [duration, setDuration] = useState('45');
  const [intensity, setIntensity] = useState('Moderate');
  const [location, setLocation] = useState('Indoor Arena');
  const [energyLevel, setEnergyLevel] = useState(70);
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [notes, setNotes] = useState('');
  const [observations, setObservations] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isEditingObservations, setIsEditingObservations] = useState(false);

  const tags = [
    { label: "Lateral work", type: "Dressage" },
    { label: "Transitions", type: "Dressage" },
    { label: "Collection", type: "Dressage" },
    { label: "Grid work", type: "Jumping" },
    { label: "Course", type: "Jumping" },
    { label: "Walk", type: "General" },
    { label: "Trot", type: "General" },
    { label: "Canter", type: "General" },
    { label: "Ground work", type: "General" },
  ];

  const moods = [
    { id: 'Enthusiastic', icon: <Zap size={18} />, label: 'Enthusiastic' },
    { id: 'Happy', icon: <Smile size={18} />, label: 'Happy' },
    { id: 'Distracted', icon: <Meh size={18} />, label: 'Distracted' },
    { id: 'Tense', icon: <Frown size={18} />, label: 'Tense' },
    { id: 'Reluctant', icon: <Coffee size={18} />, label: 'Reluctant' },
  ];

  const toggleTag = (label: string) => {
    setActiveTags(prev => 
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  };

  const handleSave = () => {
    onSave({
      id: Date.now(),
      type: 'standard',
      title: `Training - ${sessionType}`,
      category: 'Training',
      time: 'Just now',
      detail: notes || `Training session with ${horseName}`,
      horse: horseName,
      duration: `${duration} min`,
      location: location,
      intensity: intensity,
      mood: selectedMood,
      energy: energyLevel,
      tags: activeTags
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[600] bg-background flex flex-col font-sans overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 pt-12 flex items-center justify-between border-b border-border/10">
          <button onClick={onClose} className="p-2 -ml-2 text-foreground/40 hover:text-foreground">
            <X size={24} />
          </button>
          <h1 className="text-xl font-serif italic text-foreground">Log Training</h1>
          <button 
            onClick={handleSave} 
            className="p-2 -mr-2 text-burgundy"
          >
            <Check size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Hero Preview */}
          <div className="relative h-48 bg-muted/20 overflow-hidden">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&q=80&w=1000" 
              alt="Training Preview" 
              className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <button className="absolute bottom-4 right-6 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white">
              <Camera size={20} />
            </button>
          </div>

          <div className="px-6 py-10 space-y-12 pb-32">
            {/* Session Type */}
            <section className="space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">Discipline</p>
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
                  <option value="Ground work">Ground work</option>
                </select>
                <h2 className="text-foreground font-serif italic text-4xl flex items-center gap-2">
                  {sessionType}
                  <ChevronRight size={18} className="text-foreground/20 rotate-90" />
                </h2>
              </div>
            </section>

            {/* Core Metrics */}
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Clock size={16} />
                </div>
                <div className="flex-1 relative">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Duration</p>
                  <input 
                    type="number" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent font-mono text-sm font-bold focus:outline-none"
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
                    className="w-full bg-transparent font-mono text-sm font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div className="bg-card/40 border border-border/10 rounded-2xl p-4 flex items-center gap-3">
                <div className="p-2 bg-foreground/5 text-foreground/60 rounded-lg">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-secondary/60">Date</p>
                  <p className="font-mono text-sm font-bold">Today</p>
                </div>
              </div>
            </section>

            {/* Notes Section */}
            <section className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Training Notes</h2>
                <button 
                  onClick={() => setIsEditingNotes(true)}
                  className="p-2 bg-primary/10 text-primary rounded-full"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <div 
                onClick={() => setIsEditingNotes(true)}
                className="bg-card/20 border border-border/10 rounded-2xl p-6 min-h-[120px] cursor-text"
              >
                <p className={`font-serif text-lg italic leading-relaxed ${notes ? 'text-foreground' : 'text-secondary/20'}`}>
                  {notes || "How was the ride today? Record details about focus, responsiveness, and exercises..."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => toggleTag(tag.label)}
                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      activeTags.includes(tag.label)
                        ? 'bg-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-white/40 border border-border/20 text-secondary/60'
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Horse Performance */}
            <section className="space-y-8">
              <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Performance & Feel</h2>
              
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
                  <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Observations</h3>
                  <button 
                    onClick={() => setIsEditingObservations(true)}
                    className="p-2 bg-primary/10 text-primary rounded-full"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
                <div 
                  onClick={() => setIsEditingObservations(true)}
                  className="bg-card/20 border border-border/10 rounded-2xl p-6 min-h-[100px] cursor-text"
                >
                  <p className={`font-sans text-sm italic leading-relaxed ${observations ? 'text-foreground' : 'text-secondary/30'}`}>
                    {observations || "Tap to record any stiffness, lameness, or health observations during the session..."}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pb-12 bg-gradient-to-t from-background via-background to-transparent">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full py-5 bg-burgundy text-white rounded-[2rem] font-sans text-xs uppercase tracking-[0.3em] font-black shadow-2xl shadow-burgundy/20 flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Save Session
          </motion.button>
        </div>

        {/* Zoomed Editors */}
        <AnimatePresence>
          {(isEditingNotes || isEditingObservations) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[700] bg-background/95 backdrop-blur-xl flex flex-col"
            >
              <div className="p-6 pt-12 flex items-center justify-between border-b border-border/10">
                <button onClick={() => { setIsEditingNotes(false); setIsEditingObservations(false); }} className="p-2 -ml-2 text-foreground/60">
                  <X size={20} />
                </button>
                <h2 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em]">
                  {isEditingNotes ? "Training Notes" : "Observations"}
                </h2>
                <button 
                  onClick={() => { setIsEditingNotes(false); setIsEditingObservations(false); }}
                  className="px-4 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest"
                >
                  Done
                </button>
              </div>
              
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <textarea 
                  autoFocus
                  value={isEditingNotes ? notes : observations}
                  onChange={(e) => isEditingNotes ? setNotes(e.target.value) : setObservations(e.target.value)}
                  className={`w-full bg-transparent leading-relaxed focus:outline-none resize-none flex-1 ${isEditingNotes ? 'font-serif text-3xl italic' : 'font-sans text-2xl'}`}
                  placeholder={isEditingNotes ? "How was the ride today?" : "Any physical observations?"}
                />
                
                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-2 text-secondary/40">
                    <Mic size={16} />
                    <span className="text-[10px] uppercase font-black tracking-widest">Voice Memo</span>
                  </div>
                  <button className="w-full h-24 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 flex flex-col items-center justify-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <Mic size={20} />
                    </div>
                    <span className="text-[8px] uppercase font-black tracking-widest text-primary/60">Tap to record</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-muted/20 border-t border-border/10 flex items-center justify-center text-secondary/40 gap-2">
                <Keyboard size={14} />
                <span className="text-[10px] uppercase font-black tracking-widest text-center">Standard Keyboard Active</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
