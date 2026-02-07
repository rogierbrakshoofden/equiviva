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
  Trash2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AddExpenseScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: any) => void;
  horseName: string;
}

const CATEGORIES = [
  "Vet",
  "Farrier",
  "Feed & supplements",
  "Training & lessons",
  "Tack & equipment",
  "Boarding",
  "Transportation",
  "Insurance",
  "Competition fees",
  "Other"
];

const VENDOR_MAP: { [key: string]: string } = {
  "clinic": "Vet",
  "hospital": "Vet",
  "dr.": "Vet",
  "farrier": "Farrier",
  "shoes": "Farrier",
  "grain": "Feed & supplements",
  "hay": "Feed & supplements",
  "lesson": "Training & lessons",
  "coaching": "Training & lessons",
  "saddle": "Tack & equipment",
  "bridle": "Tack & equipment",
  "stable": "Boarding",
  "rent": "Boarding",
};

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  horseName: defaultHorse 
}) => {
  const [amount, setAmount] = useState('');
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('Today');
  const [receipt, setReceipt] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState(defaultHorse);
  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => amountInputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Auto-suggest category based on vendor
  useEffect(() => {
    const v = vendor.toLowerCase();
    for (const [keyword, cat] of Object.entries(VENDOR_MAP)) {
      if (v.includes(keyword)) {
        setCategory(cat);
        break;
      }
    }
  }, [vendor]);

  const handleSave = () => {
    if (!amount) return;
    onSave({
      id: Date.now(),
      type: 'expense',
      title: `Expense - ${vendor || 'General'}`,
      amount: `€${amount}`,
      category: category || 'Other',
      time: date === 'Today' ? 'Just now' : date,
      description: notes || `Expense for ${selectedHorse}`,
      horse: selectedHorse
    });
    onClose();
    // Reset
    setAmount('');
    setVendor('');
    setCategory('');
    setNotes('');
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
          <h1 className="text-xl font-serif italic text-foreground">Add Expense</h1>
          <button 
            onClick={handleSave} 
            disabled={!amount}
            className={`p-2 -mr-2 transition-colors ${amount ? 'text-burgundy' : 'text-foreground/10'}`}
          >
            <Check size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="px-6 py-10 space-y-10">
            {/* Amount Input */}
            <div className="flex flex-col items-center space-y-2">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">Amount</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl font-serif italic text-burgundy opacity-40">€</span>
                <input 
                  ref={amountInputRef}
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-48 bg-transparent text-5xl font-mono font-bold text-foreground focus:outline-none placeholder:text-foreground/5 text-center"
                />
              </div>
            </div>

            {/* Vendor / Description */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">What for?</label>
              </div>
              <div className="relative">
                <input 
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder="Vet clinic, Hay, Farrier..."
                  className="w-full bg-card/20 border border-border/10 rounded-2xl py-4 px-6 font-serif italic text-xl focus:outline-none focus:border-burgundy/30 transition-all placeholder:text-secondary/20"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {["Vet clinic", "Feed store", "Farrier John", "Emma's Lesson"].map(v => (
                  <button 
                    key={v}
                    onClick={() => setVendor(v)}
                    className="flex-shrink-0 px-3 py-1 bg-white/40 border border-border/10 rounded-full text-[10px] text-secondary/40 hover:text-burgundy hover:border-burgundy/20 transition-all"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      category === cat 
                        ? 'bg-burgundy text-white shadow-lg shadow-burgundy/20' 
                        : 'bg-white/40 border border-border/20 text-secondary/40 hover:border-burgundy/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
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

            {/* Receipt */}
            <div className="space-y-4">
              <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">Receipt</label>
              {!receipt ? (
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center gap-2 py-8 bg-card/20 border-2 border-dashed border-border/20 rounded-3xl hover:border-burgundy/30 hover:bg-card/30 transition-all group">
                    <Camera size={24} className="text-foreground/20 group-hover:text-burgundy" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">Take photo</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 py-8 bg-card/20 border-2 border-dashed border-border/20 rounded-3xl hover:border-burgundy/30 hover:bg-card/30 transition-all group">
                    <ImageIcon size={24} className="text-foreground/20 group-hover:text-burgundy" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-secondary/40">From library</span>
                  </button>
                </div>
              ) : (
                <div className="relative w-32 aspect-[3/4] rounded-2xl overflow-hidden border border-border/10">
                  <ImageWithFallback src={receipt} alt="Receipt preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setReceipt(null)}
                    className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md rounded-full text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors"
              >
                <Plus size={16} className={`transition-transform ${isNotesExpanded ? 'rotate-45' : ''}`} />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-black">Add notes</span>
              </button>
              <AnimatePresence>
                {isNotesExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional details about this expense..."
                        className="w-full bg-card/20 border border-border/10 rounded-2xl p-6 font-sans text-sm min-h-[120px] focus:outline-none focus:border-burgundy/30 transition-all"
                      />
                      <button className="absolute right-4 bottom-4 p-2 bg-burgundy/10 text-burgundy rounded-full">
                        <Mic size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            disabled={!amount}
            onClick={handleSave}
            className={`w-full py-5 rounded-[2rem] font-sans text-xs uppercase tracking-[0.3em] font-black shadow-2xl transition-all flex items-center justify-center gap-2 ${
              amount 
                ? 'bg-burgundy text-white shadow-burgundy/20' 
                : 'bg-foreground/5 text-foreground/10 shadow-none grayscale'
            }`}
          >
            <Check size={18} />
            Add Expense
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
