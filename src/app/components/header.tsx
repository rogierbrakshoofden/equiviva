import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  horseName: string;
  subtitle: string;
  badge?: string;
  rightElement?: React.ReactNode;
  onAccountClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  scrolled, 
  horseName, 
  subtitle, 
  badge = "In Residence",
  rightElement,
  onAccountClick
}) => {
  return (
    <header className={`sticky top-0 z-50 px-6 py-6 transition-all duration-500 ${scrolled ? 'bg-background/80 backdrop-blur-xl py-3' : 'bg-transparent py-8'}`}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-3xl leading-none tracking-tight">Equiviva</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/40 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.1em] uppercase font-bold text-burgundy">{badge}</span>
            </div>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onAccountClick}
              className="w-10 h-10 rounded-full bg-white border border-border/30 flex items-center justify-center shadow-sm text-secondary hover:text-burgundy transition-colors"
            >
              <User size={20} />
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-end justify-between border-b border-border/30 pb-4">
          <div className="space-y-0.5">
            <span className="font-serif italic text-2xl text-foreground block">{horseName}</span>
            <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-secondary font-medium">
              {subtitle}
            </p>
          </div>
          {rightElement}
        </div>
      </div>
    </header>
  );
};
