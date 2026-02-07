import React from 'react';
import { motion } from 'motion/react';
import { X, Check, Calendar, Clock, AlignLeft } from 'lucide-react';
import { CardContent } from './event-card';

interface EditScreenProps {
  event: {
    id: number;
    type: 'standard' | 'urgent' | 'insight' | 'expense';
    title: string;
    time?: string;
    description?: string;
    image?: string;
    amount?: string;
    category?: 'vet' | 'farrier' | 'feed' | 'training';
    dueDate?: string;
  };
  onClose: () => void;
}

export const EditScreen: React.FC<EditScreenProps> = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.3 } }}
      className="fixed inset-0 z-[500] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-12"
    >
      <div className="w-full max-w-2xl h-full max-h-[85vh] relative" style={{ perspective: 2000 }}>
        <motion.div
          layoutId={`card-surface-${event.id}`}
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
            {/* FRONT SIDE (The Original Card) */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <CardContent {...event} className="h-full shadow-2xl" />
            </div>

            {/* BACK SIDE (The Edit Form) */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-border/20">
                {/* Header */}
                <div className="px-8 py-6 border-b border-border/30 flex justify-between items-center bg-white sticky top-0 z-10">
                  <button onClick={onClose} className="p-2 -ml-2 text-secondary hover:text-primary transition-colors">
                    <X size={24} strokeWidth={1.5} />
                  </button>
                  <h2 className="font-serif text-xl italic text-center flex-1">Record Edit</h2>
                  <button onClick={onClose} className="p-2 -mr-2 text-burgundy hover:scale-110 transition-transform">
                    <Check size={24} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-hide">
                  {/* Title Input */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/60 font-black">Event Title</label>
                    <textarea 
                      defaultValue={event.title}
                      className="w-full text-4xl font-serif bg-transparent border-none focus:ring-0 p-0 resize-none leading-tight placeholder:text-border"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/60 font-black flex items-center gap-2">
                        <Calendar size={12} /> Date
                      </label>
                      <input type="text" defaultValue="Thursday, Feb 5" className="w-full bg-muted/50 border-none rounded-xl px-4 py-4 text-sm font-sans focus:ring-1 focus:ring-burgundy/20" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/60 font-black flex items-center gap-2">
                        <Clock size={12} /> Time
                      </label>
                      <input type="text" defaultValue={event.time || "12:00 PM"} className="w-full bg-muted/50 border-none rounded-xl px-4 py-4 text-sm font-sans focus:ring-1 focus:ring-burgundy/20" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/60 font-black flex items-center gap-2">
                      <AlignLeft size={12} /> Details
                    </label>
                    <textarea 
                      defaultValue={event.description}
                      placeholder="Add more details about this record..."
                      className="w-full bg-muted/50 border-none rounded-2xl px-6 py-6 text-base font-sans focus:ring-1 focus:ring-burgundy/20 min-h-[160px] resize-none leading-relaxed"
                    />
                  </div>

                  {/* Media Section */}
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-secondary/60 font-black">Attached Media</label>
                    {event.image ? (
                      <div className="relative aspect-video rounded-3xl overflow-hidden group">
                        <img src={event.image} alt="Media" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-6 py-3 rounded-full border border-white/40">Replace</button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-border/40 flex items-center justify-center bg-muted/20">
                        <button className="text-[10px] uppercase tracking-widest text-secondary font-bold">Add Photo</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
