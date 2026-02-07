import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  X, 
  ChevronDown, 
  Stethoscope, 
  Syringe, 
  Hammer,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Header } from './header';

interface InsightsTabProps {
  scrolled: boolean;
  onAccountClick: () => void;
  onDayClick: (day: number, month: string) => void;
}

const MONTHS = [
  { name: 'February 2026', days: 28, startDay: 0 }, // Feb 2026 starts on Sunday (if we look at the grid i=0)
  { name: 'March 2026', days: 31, startDay: 0 },
  { name: 'April 2026', days: 30, startDay: 3 },
  { name: 'May 2026', days: 31, startDay: 5 }
];

export const InsightsTab: React.FC<InsightsTabProps> = ({ scrolled, onAccountClick, onDayClick }) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const paginate = (newDirection: number) => {
    if (currentMonthIdx + newDirection >= 0 && currentMonthIdx + newDirection < MONTHS.length) {
      setDirection(newDirection);
      setCurrentMonthIdx(currentMonthIdx + newDirection);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background text-foreground font-sans pb-32"
    >
      <Header 
        scrolled={scrolled}
        horseName="Valegro Royale"
        subtitle={`Insights • ${MONTHS[currentMonthIdx].name}`}
        onAccountClick={onAccountClick}
      />

      <main className="px-6 space-y-10 mt-4">
        {/* Expense Breakdown */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="font-sans font-medium text-lg uppercase tracking-[0.2em] text-foreground/40">Costs</h2>
            <button className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-full border border-white/60 text-[10px] uppercase font-black tracking-widest shadow-sm">
              Last 3 months <ChevronDown size={12} />
            </button>
          </div>
          
          <div className="bg-card/60 backdrop-blur-sm border border-white/60 rounded-[2rem] p-6 space-y-6 shadow-sm">
            {/* Stacked Bar */}
            <div className="h-4 w-full flex rounded-full overflow-hidden shadow-inner bg-white/20">
              <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} className="h-full bg-vet" title="Vet" />
              <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} className="h-full bg-feed" title="Feed" />
              <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} className="h-full bg-training" title="Training" />
              <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-farrier" title="Farrier" />
              <motion.div initial={{ width: 0 }} animate={{ width: '5%' }} className="h-full bg-secondary" title="Other" />
            </div>

            {/* Top 3 Pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Vet', amount: '€487', color: 'bg-vet' },
                { label: 'Feed', amount: '€320', color: 'bg-feed' },
                { label: 'Training', amount: '€280', color: 'bg-training' },
              ].map((pill, i) => (
                <motion.div 
                  key={pill.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/40 backdrop-blur-sm border border-white/60 pl-2 pr-4 py-2 rounded-full flex items-center gap-3 shadow-sm group cursor-pointer"
                >
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: `var(--${pill.label.toLowerCase()})` }} />
                  <span className="text-[10px] uppercase font-black tracking-widest text-foreground/60">{pill.label}</span>
                  <span className="font-mono text-sm font-bold">{pill.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Load Calendar */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-sans font-medium text-lg uppercase tracking-[0.2em] text-foreground/40">Training intensity</h2>
            <div className="flex items-center bg-white/40 px-3 py-1.5 rounded-full border border-white/60 shadow-sm">
               <button 
                onClick={() => paginate(-1)} 
                disabled={currentMonthIdx === 0}
                className="p-1 text-secondary hover:text-foreground disabled:opacity-20 transition-opacity"
               >
                 <ChevronLeft size={16} />
               </button>
               <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-secondary/60 min-w-[100px] text-center px-1">
                 {MONTHS[currentMonthIdx].name}
               </span>
               <button 
                onClick={() => paginate(1)} 
                disabled={currentMonthIdx === MONTHS.length - 1}
                className="p-1 text-secondary hover:text-foreground disabled:opacity-20 transition-opacity"
               >
                 <ChevronRight size={16} />
               </button>
            </div>
          </div>

          <div className="bg-card/60 backdrop-blur-sm border border-white/60 rounded-[2rem] p-6 shadow-sm overflow-hidden relative min-h-[380px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentMonthIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50;
                  if (swipe && offset.x > 0) paginate(-1);
                  else if (swipe && offset.x < 0) paginate(1);
                }}
                className="absolute inset-x-6"
              >
                <div className="grid grid-cols-7 gap-3">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={`${day}-${i}`} className="text-[10px] font-black text-center text-foreground/30 mb-2">{day}</div>
                  ))}
                  
                  {/* Leading empty squares for month alignment */}
                  {Array.from({ length: MONTHS[currentMonthIdx].startDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square opacity-0" />
                  ))}

                  {Array.from({ length: MONTHS[currentMonthIdx].days }).map((_, i) => {
                    // Seeded random based on index and month to keep patterns consistent on swipe
                    const seed = (i + 1) * (currentMonthIdx + 1);
                    const intensity = [0, 1, 2, 3][Math.floor((Math.sin(seed) * 10000) % 4 + 4) % 4];
                    const colors = ['transparent', 'rgba(122, 139, 108, 0.3)', 'rgba(122, 139, 108, 0.6)', 'rgba(58, 74, 60, 1)'];
                    return (
                      <motion.div
                        key={i}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDayClick(i + 1, MONTHS[currentMonthIdx].name)}
                        className="aspect-square rounded-xl flex items-center justify-center text-[10px] font-mono font-bold border border-white/20 cursor-pointer"
                        style={{ backgroundColor: colors[intensity], color: intensity > 2 ? '#F9F8F6' : '#2D2D2D' }}
                      >
                        {i + 1}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full border border-black/5" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Rest</span>
              </div>
              <div className="h-[1px] w-8 bg-foreground/10" />
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Intense</span>
              </div>
            </div>
          </div>
        </section>

        {/* Health Timeline */}
        <section className="space-y-4 overflow-hidden -mx-6">
          <h2 className="font-sans font-medium text-lg uppercase tracking-[0.2em] text-foreground/40 px-6">Health events</h2>
          
          <div className="flex overflow-x-auto no-scrollbar gap-8 px-6 pb-2">
            {[
              { date: '12.01', icon: <Syringe size={16} />, label: 'Booster', color: 'bg-vet' },
              { date: '28.01', icon: <Hammer size={16} />, label: 'Reshoeing', color: 'bg-farrier' },
              { date: '04.02', icon: <Stethoscope size={16} />, label: 'Dental', color: 'bg-vet' },
              { date: '15.02', icon: <Syringe size={16} />, label: 'Flu shot', color: 'bg-vet' },
              { date: '22.02', icon: <Hammer size={16} />, label: 'Checkup', color: 'bg-farrier' },
            ].map((event, i) => (
              <div key={i} className="flex flex-col items-center gap-3 min-w-[80px]">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center bg-white border border-white/60 shadow-sm text-foreground/60 relative overflow-hidden`}
                >
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${event.color}`} />
                  {event.icon}
                </motion.div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold tracking-tighter text-foreground/80">{event.date}</span>
                  <span className="text-[8px] uppercase tracking-widest font-black text-foreground/30">{event.label}</span>
                </div>
              </div>
            ))}
            <div className="min-w-[40px] flex items-center justify-center">
              <ArrowRight className="text-foreground/20" size={20} />
            </div>
          </div>
        </section>

        {/* Benchmark Comparison */}
        <section className="space-y-8 pb-16">
          <h2 className="font-sans font-medium text-lg uppercase tracking-[0.2em] text-foreground/40">Compared to similar horses</h2>
          
          <div className="bg-card/60 backdrop-blur-sm border border-white/60 rounded-[2rem] p-6 space-y-10 shadow-sm">
            {[
              { label: 'Monthly cost', value: '€680', avg: '€520', unit: '' },
              { label: 'Vet visits', value: '2.5', avg: '1.8', unit: '/year' },
              { label: 'Training days', value: '4.2', avg: '3.5', unit: '/week' },
            ].map((metric, i) => (
              <div key={metric.label} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="font-serif italic text-xl">{metric.label}</span>
                  <div className="flex gap-4">
                    <span className="text-[10px] font-mono font-bold text-foreground">{metric.value}{metric.unit}</span>
                    <span className="text-[10px] font-mono font-bold text-secondary opacity-60">{metric.avg}{metric.unit}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(parseFloat(metric.value)/8) * 100}%` }} 
                      className="h-full bg-foreground" 
                    />
                  </div>
                  <div className="h-1.5 w-full bg-white/40 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${(parseFloat(metric.avg)/8) * 100}%` }} 
                      className="h-full bg-secondary" 
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center gap-6 justify-center opacity-40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <span className="text-[8px] uppercase font-black tracking-widest">Valegro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-[8px] uppercase font-black tracking-widest">Average</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};
