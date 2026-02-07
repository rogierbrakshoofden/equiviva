import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Pause, Check, RotateCcw, Loader2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VoiceRecordingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (events: any[]) => void;
}

type RecordingState = 'recording' | 'processing' | 'result';

export const VoiceRecording: React.FC<VoiceRecordingProps> = ({ isOpen, onClose, onConfirm }) => {
  const [state, setState] = useState<RecordingState>('recording');
  const [timer, setTimer] = useState(0);
  const [waveform, setWaveform] = useState<number[]>(new Array(40).fill(5));
  
  // Mock extracted events
  const [extractedEvents, setExtractedEvents] = useState([
    { 
      id: Date.now() + 1, 
      type: 'standard', 
      title: 'Training session - Dressage', 
      time: 'Just now', 
      category: 'Training',
      detail: 'Working on half-passes, 45min. Focus on collected trot and sharp transitions. Intense session at Indoor Arena.',
      amount: null,
      cost: '45 min'
    },
    { 
      id: Date.now() + 2, 
      type: 'expense', 
      title: 'Expense - Private Lesson', 
      time: 'Just now', 
      category: 'Training',
      detail: 'Dressage coaching session with Emma.',
      amount: '€60', 
      cost: '€60'
    },
  ]);

  // Reset UI when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setState('recording');
        setTimer(0);
      }, 500);
    }
  }, [isOpen]);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (state === 'recording' && isOpen) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        // Randomize waveform
        setWaveform(prev => prev.map(() => Math.random() * 40 + 5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [state, isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 600);
    const secs = Math.floor((seconds % 600) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDone = () => {
    setState('processing');
    setTimeout(() => {
      setState('result');
    }, 2500);
  };

  const handleReRecord = () => {
    setTimer(0);
    setState('recording');
  };

  const handleConfirm = () => {
    onConfirm?.(extractedEvents);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-background/95 backdrop-blur-3xl overflow-hidden flex flex-col font-sans"
      >
        {/* Immersive Background Image - Full Bleed, Less Visibility, Subtle Blur */}
        <div className="absolute inset-0 -z-10 opacity-[0.08] grayscale blur-[2px]">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=1200" 
            alt="Horse silhouette" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Chrome */}
        <div className="p-8 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="text-secondary/60 hover:text-primary transition-colors flex items-center gap-2"
          >
            <X size={20} />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cancel</span>
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-secondary/40 font-bold">
              {state === 'recording' ? 'Recording...' : state === 'processing' ? 'Awaiting AI' : 'Extracted Details'}
            </span>
            <span className="font-mono text-xl tracking-tighter text-burgundy">
              {state === 'result' ? '--:--' : formatTime(timer)}
            </span>
          </div>

          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
          <AnimatePresence mode="wait">
            {state === 'recording' && (
              <motion.div 
                key="recording-ui"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full flex flex-col items-center gap-16"
              >
                <p className="font-serif italic text-2xl text-center max-w-[280px] leading-relaxed">
                  "Just talk naturally — I'll figure out the details."
                </p>
                
                {/* Waveform */}
                <div className="flex items-center justify-center gap-[3px] h-32 w-full max-w-sm">
                  {waveform.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: h }}
                      className="w-[1.5px] bg-gradient-to-t from-waveform/10 via-waveform to-waveform/10 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {state === 'processing' && (
              <motion.div 
                key="processing-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <div className="flex items-center justify-center gap-[3px] h-12 w-48 opacity-20">
                    {waveform.map((h, i) => (
                      <div key={i} style={{ height: 20 }} className="w-[1.5px] bg-secondary rounded-full" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin text-burgundy" size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <p className="font-serif italic text-xl">Understanding...</p>
              </motion.div>
            )}

            {state === 'result' && (
              <motion.div 
                key="result-ui"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-6 overflow-y-auto max-h-[60vh] pb-8 no-scrollbar"
              >
                <div className="space-y-4">
                  {extractedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-white/40 shadow-sm group hover:border-burgundy/30 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-burgundy">
                          {event.category}
                        </span>
                        <span className="font-mono text-sm font-bold text-secondary">{event.cost}</span>
                      </div>
                      <h3 className="font-serif text-lg leading-tight">{event.title}</h3>
                      <p className="font-sans text-xs text-secondary/60 mt-1">{event.detail}</p>
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-secondary/40 font-medium px-4">
                  Tap any card to adjust extracted details before saving
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <div className="p-12 flex flex-col items-center gap-8">
          <AnimatePresence mode="wait">
            {state === 'recording' ? (
              <motion.div 
                key="rec-btn"
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.button
                  onClick={handleDone}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-fab-bg rounded-full flex items-center justify-center text-fab-text shadow-2xl shadow-burgundy/40 relative"
                >
                  <div className="absolute inset-0 rounded-full border-4 border-fab-bg animate-ping opacity-20" />
                  <Pause size={28} fill="currentColor" />
                </motion.button>
                <button 
                  onClick={handleDone}
                  className="text-xs uppercase tracking-[0.3em] font-black text-secondary/60 hover:text-burgundy transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : state === 'result' ? (
              <motion.div 
                key="result-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm flex flex-col gap-4"
              >
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="w-full bg-fab-bg text-fab-text py-5 rounded-[2rem] font-sans text-xs uppercase tracking-[0.3em] font-black shadow-xl shadow-burgundy/20 flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  Confirm & Save Events
                </motion.button>
                <button 
                  onClick={handleReRecord}
                  className="flex items-center justify-center gap-2 py-3 text-secondary/60 hover:text-primary transition-colors"
                >
                  <RotateCcw size={16} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Re-record</span>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};