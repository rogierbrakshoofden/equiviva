import React, { useState, useEffect, useRef } from 'react';
import { Home, BarChart2, Search, Plus, Mic, CreditCard, Activity, Trophy, Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VoiceRecording } from './voice-recording';

const menuItems = [
  { icon: Camera, label: 'Photo/Memory', id: 'memory' },
  { icon: Trophy, label: 'Training Session', id: 'training' },
  { icon: Activity, label: 'Health Record', id: 'health' },
  { icon: CreditCard, label: 'Expense', id: 'expense' },
  { divider: true },
  { icon: Mic, label: 'Voice note', primary: true, id: 'voice' },
];

interface BottomNavProps {
  onSaveEvents?: (events: any[]) => void;
  onAddExpense?: () => void;
  onAddHealth?: () => void;
  onAddTraining?: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  onSaveEvents, 
  onAddExpense, 
  onAddHealth,
  onAddTraining,
  activeTab, 
  onTabChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: 'Feed' },
    { icon: Search, label: 'Search' },
    { icon: BarChart2, label: 'Insights' },
  ];

  // Handle slide-to-select interaction
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!menuRef.current) return;
      
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const menuItem = elements.find(el => el.hasAttribute('data-menu-id'));
      
      if (menuItem) {
        setHoveredId(menuItem.getAttribute('data-menu-id'));
      } else {
        setHoveredId(null);
      }
    };

    const handlePointerUp = () => {
      if (hoveredId === 'voice') {
        setShowVoice(true);
      } else if (hoveredId === 'expense') {
        onAddExpense?.();
      } else if (hoveredId === 'health') {
        onAddHealth?.();
      } else if (hoveredId === 'training') {
        onAddTraining?.();
      }
      setIsOpen(false);
      setHoveredId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isOpen, hoveredId]);

  return (
    <>
      <VoiceRecording 
        isOpen={showVoice} 
        onClose={() => setShowVoice(false)} 
        onConfirm={(events) => {
          onSaveEvents?.(events);
          setShowVoice(false);
        }}
      />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-background/20 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-lg">
        {/* Vertical Context Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-[calc(100%+1rem)] right-0 w-64 bg-glass backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-nav-border overflow-hidden p-2"
            >
              <div className="flex flex-col gap-1">
                {menuItems.map((item, index) => (
                  item.divider ? (
                    <div key={`divider-${index}`} className="h-[1px] bg-border/40 mx-4 my-1" />
                  ) : (
                    <motion.div
                      key={item.id}
                      data-menu-id={item.id}
                      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
                      animate={{ 
                        backgroundColor: hoveredId === item.id ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0)',
                        color: item.primary ? '#8B4049' : '#2D2D2D',
                        x: hoveredId === item.id ? 4 : 0
                      }}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-none select-none ${
                        item.primary ? 'font-black' : 'font-medium'
                      }`}
                    >
                      {item.icon && <item.icon size={20} strokeWidth={item.primary ? 3 : 2} className="pointer-events-none" />}
                      <span className="font-sans text-[10px] uppercase tracking-widest pointer-events-none">{item.label}</span>
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.nav 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-nav-bg backdrop-blur-3xl border border-nav-border shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-2 py-2 flex justify-between items-center"
        >
          <div className="flex flex-1 justify-around items-center px-4">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => onTabChange(item.label)}
                whileTap={{ scale: 0.9 }}
                className={`relative flex flex-col items-center p-3 transition-opacity duration-300 ${isOpen ? 'opacity-20' : 'opacity-100'}`}
              >
                <div className={`transition-colors duration-300 ${activeTab === item.label ? 'text-burgundy' : 'text-secondary/60 hover:text-primary'}`}>
                  <item.icon size={22} strokeWidth={activeTab === item.label ? 2.5 : 2} />
                </div>
                {activeTab === item.label && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-burgundy"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          <motion.button
            onPointerDown={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              rotate: isOpen ? 45 : 0,
              backgroundColor: isOpen ? 'var(--fab-active-bg)' : 'var(--fab-bg)',
              color: 'var(--fab-text)'
            }}
            className="ml-2 w-14 h-14 rounded-[1.75rem] flex items-center justify-center shadow-lg shadow-burgundy/20 z-50 relative touch-none"
          >
            {isOpen ? <X size={28} strokeWidth={2.5} /> : <Plus size={28} strokeWidth={2.5} />}
          </motion.button>
        </motion.nav>
      </div>
    </>
  );
};
