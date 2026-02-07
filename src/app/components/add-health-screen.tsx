import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Camera, 
  Image as ImageIcon, 
  ChevronDown, 
  Mic, 
  Calendar,
  Plus,
  Activity,
  User,
  Thermometer,
  Heart,
  Wind
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddHealthScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: any) => void;
  horseName: string;
}

const HEALTH_TYPES = [
  "Vet Visit",
  "Farrier",
  "Dental",
  "Vaccination",
  "Deworming",
  "Physio/Massage",
  "Supplement Change",
  "Injury",
  "Check-up",
  "Other"
];

export const AddHealthScreen: React.FC<AddHealthScreenProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  horseName: defaultHorse 
}) => {
  const [recordType, setRecordType] = useState('');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');
  const [date, setDate] = useState('Today');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isVitalsExpanded, setIsVitalsExpanded] = useState(false);
  const [isDescriptionZoomed, setIsDescriptionZoomed] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState(defaultHorse);
  
  // Vitals
  const [temp, setTemp] = useState('');
  const [hr, setHr] = useState('');
  const [rr, setRr] = useState('');

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure transitions are smooth before focus
      // (Though now we use the zoomed view for focus, we keep the guard)
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!description && !recordType) return;
    onSave({
      id: Date.now(),
      type: 'standard',
      title: recordType || 'Health Observation',
      time: date === 'Today' ? 'Just now' : date,
      category: 'Health',
      detail: description || `Health record for ${selectedHorse}`,
      horse: selectedHorse,
      meta: isVitalsExpanded ? { temp, hr, rr } : null,
      provider: provider
    });
    onClose();
    // Reset
    setRecordType('');
    setDescription('');
    setProvider('');
    setTemp('');
    setHr('');
    setRr('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[600] bg-background flex flex-col font-sans"
      >
        {/* Header */}
        <div className="p-6 pt-12 flex items-center justify-between border-b border-border/10">
          <button onClick={onClose} className="p-2 -ml-2 text-foreground/40 hover:text-foreground">
            <X size={24} />
          </button>
          <h1 className="text-xl font-serif italic text-foreground">Health Record</h1>
          <button 
            onClick={handleSave} 
            disabled={!description && !recordType}
            className={`p-2 -mr-2 transition-colors ${ (description || recordType) ? 'text-burgundy' : 'text-foreground/10'}`}
          >
            <Check size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-6 py-10 space-y-10">
            
            {/* Record Type Selector */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Type of record</label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_TYPES.map(type => (
                  <button 
                    key={type}
                    onClick={() => setRecordType(type)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      recordType === type 
                        ? 'bg-burgundy text-white shadow-lg shadow-burgundy/20' 
                        : 'bg-white/40 border border-border/20 text-secondary/40 hover:border-burgundy/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Input */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">What happened?</label>
              <div 
                onClick={() => setIsDescriptionZoomed(true)}
                className="relative cursor-pointer"
              >
                <div className="w-full bg-card/20 border border-border/10 rounded-2xl p-6 font-serif italic text-xl min-h-[140px] transition-all placeholder:text-secondary/20 leading-relaxed overflow-hidden">
                  {description || <span className="opacity-40 italic">Describe symptoms, treatment, or observations...</span>}
                </div>
                <div className="absolute right-4 bottom-4 p-2 bg-burgundy/10 text-burgundy rounded-full">
                  <Mic size={18} />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isDescriptionZoomed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="fixed inset-0 z-[700] bg-background p-6 pt-16 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">What happened?</span>
                    <button 
                      onClick={() => setIsDescriptionZoomed(false)}
                      className="text-xs uppercase tracking-[0.2em] font-bold text-burgundy"
                    >
                      Done
                    </button>
                  </div>
                  
                  <textarea
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe symptoms, treatment, or observations..."
                    className="flex-1 bg-transparent text-3xl font-serif italic focus:outline-none resize-none leading-relaxed placeholder:text-foreground/5"
                  />
                  
                  <div className="py-8 flex justify-between items-center border-t border-border/10">
                    <button className="flex items-center gap-2 text-foreground/40">
                      <Mic size={20} />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Voice Entry</span>
                    </button>
                    <span className="font-mono text-[10px] text-foreground/20">
                      {description.length} characters
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Provider */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Provider / Clinic</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="Dr. James, Equine Hospital..."
                  className="w-full bg-card/20 border border-border/10 rounded-2xl py-4 pl-12 pr-6 font-sans text-sm focus:outline-none focus:border-burgundy/30 transition-all placeholder:text-secondary/20"
                />
              </div>
            </div>

            {/* Vitals (Expandable) */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsVitalsExpanded(!isVitalsExpanded)}
                className="flex items-center justify-between w-full py-2 group"
              >
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-burgundy" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-black text-foreground/40 group-hover:text-foreground transition-colors">Vital Signs</span>
                </div>
                <Plus size={16} className={`text-foreground/20 transition-transform ${isVitalsExpanded ? 'rotate-45' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isVitalsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden grid grid-cols-3 gap-3"
                  >
                    <div className="bg-card/20 border border-border/10 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-foreground/40">
                        <Thermometer size={14} />
                        <span className="text-[8px] uppercase font-black tracking-widest">Temp</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <input 
                          type="number" 
                          value={temp} 
                          onChange={e => setTemp(e.target.value)}
                          placeholder="38" 
                          className="bg-transparent w-full font-mono font-bold text-lg focus:outline-none"
                        />
                        <span className="text-[10px] font-medium text-foreground/40">°C</span>
                      </div>
                    </div>
                    <div className="bg-card/20 border border-border/10 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-foreground/40">
                        <Heart size={14} />
                        <span className="text-[8px] uppercase font-black tracking-widest">HR</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <input 
                          type="number" 
                          value={hr} 
                          onChange={e => setHr(e.target.value)}
                          placeholder="36" 
                          className="bg-transparent w-full font-mono font-bold text-lg focus:outline-none"
                        />
                        <span className="text-[10px] font-medium text-foreground/40">BPM</span>
                      </div>
                    </div>
                    <div className="bg-card/20 border border-border/10 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-foreground/40">
                        <Wind size={14} />
                        <span className="text-[8px] uppercase font-black tracking-widest">RR</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <input 
                          type="number" 
                          value={rr} 
                          onChange={e => setRr(e.target.value)}
                          placeholder="12" 
                          className="bg-transparent w-full font-mono font-bold text-lg focus:outline-none"
                        />
                        <span className="text-[10px] font-medium text-foreground/40">BRM</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Photos & Files</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center gap-2 py-8 bg-card/20 border-2 border-dashed border-border/20 rounded-3xl hover:border-burgundy/30 hover:bg-card/30 transition-all group">
                  <Camera size={24} className="text-foreground/20 group-hover:text-burgundy" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">Scan Document</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 py-8 bg-card/20 border-2 border-dashed border-border/20 rounded-3xl hover:border-burgundy/30 hover:bg-card/30 transition-all group">
                  <ImageIcon size={24} className="text-foreground/20 group-hover:text-burgundy" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">Add Photo</span>
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Date</label>
              <button className="w-full bg-card/20 border border-border/10 rounded-2xl p-4 flex items-center justify-between hover:bg-card/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-burgundy/5 text-burgundy rounded-lg">
                    <Calendar size={18} />
                  </div>
                  <span className="font-sans text-sm font-bold text-foreground">{date}</span>
                </div>
                <ChevronDown size={18} className="text-foreground/20" />
              </button>
            </div>

            {/* Horse Assignment */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">For which horse?</label>
              <div className="flex gap-2">
                {[defaultHorse, "Luna", "Galileo"].map(horse => (
                  <button 
                    key={horse}
                    onClick={() => setSelectedHorse(horse)}
                    className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all ${
                      selectedHorse === horse 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'bg-white/40 border border-border/10 text-secondary/40 hover:border-primary/30'
                    }`}
                  >
                    {horse}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Save Button */}
        <div className="p-6 pb-12 bg-gradient-to-t from-background via-background to-transparent">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            disabled={!description && !recordType}
            onClick={handleSave}
            className={`w-full py-5 rounded-[2rem] font-sans text-xs uppercase tracking-[0.3em] font-black shadow-2xl transition-all flex items-center justify-center gap-2 ${
              (description || recordType) 
                ? 'bg-burgundy text-white shadow-burgundy/20' 
                : 'bg-foreground/5 text-foreground/10 shadow-none grayscale'
            }`}
          >
            <Check size={18} />
            Save Health Record
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
