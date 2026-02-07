import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EventCardProps {
  id: number;
  type: 'standard' | 'urgent' | 'insight' | 'expense';
  title: string;
  time?: string;
  description?: string;
  image?: string;
  amount?: string;
  category?: 'vet' | 'farrier' | 'feed' | 'training';
  dueDate?: string;
  className?: string;
  onOpen?: () => void;
}

export const CardContent: React.FC<Omit<EventCardProps, 'onOpen' | 'id'>> = ({
  type,
  title,
  time,
  description,
  image,
  amount,
  category,
  dueDate,
  className,
}) => {
  const categoryColors = {
    vet: 'bg-vet',
    farrier: 'bg-farrier',
    feed: 'bg-feed',
    training: 'bg-training',
  };

  if (type === 'insight') {
    return (
      <div className={cn("relative h-[450px] w-full overflow-hidden flex items-center justify-center text-center p-10 rounded-[2.5rem] shadow-xl", className)}>
        {image && (
          <div className="absolute inset-0 z-0">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover saturate-[90%] contrast-[85%] brightness-[80%]"
            />
            <>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1741808666699-23de7a5a8731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpZGVkJTIwaG9yc2UlMjBtYW5lJTIwZXF1ZXN0cmlhbnxlbnwxfHx8fDE3NzAzMjY1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Braided horse"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </>
          </div>
        )}
        <div className="relative z-10 space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-white font-bold">
              Pattern Insight
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl text-white leading-[1.1] font-serif">
            {title}
          </h2>
          <div className="w-12 h-[1px] bg-white/40 mx-auto mt-6" />
        </div>
      </div>
    );
  }

  if (type === 'urgent') {
    return (
      <div className={cn("relative bg-card/40 backdrop-blur-sm border border-burgundy/20 p-8 rounded-[2rem] shadow-sm", className)}>
        <div className="absolute top-0 right-8 -translate-y-1/2 bg-burgundy text-white text-[8px] font-sans font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full shadow-lg">
          Urgent Action
        </div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] tracking-widest uppercase font-sans text-burgundy font-bold">
            Due in {dueDate}
          </span>
          {time && <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">{time}</span>}
        </div>
        <h2 className="text-3xl mb-3 font-serif leading-tight">{title}</h2>
        {description && <p className="text-sm font-sans text-secondary-foreground/70 leading-relaxed font-light">{description}</p>}
      </div>
    );
  }

  if (type === 'expense') {
    return (
      <div className={cn("bg-card/40 backdrop-blur-sm border border-border/10 p-6 rounded-3xl flex justify-between items-center shadow-sm", className)}>
        <div className="flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center bg-card shadow-inner", category ? categoryColors[category] : 'bg-primary')}>
             <div className="w-2 h-2 rounded-full bg-card" />
          </div>
          <div>
            <h2 className="text-xl leading-none font-serif">{title}</h2>
            {time && <p className="text-[10px] font-sans uppercase tracking-widest text-muted-foreground mt-1.5">{time}</p>}
          </div>
        </div>
        <div className="font-mono text-lg tracking-tighter text-burgundy">
          {amount}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative bg-card/60 backdrop-blur-sm border border-white/60 rounded-[2rem] overflow-hidden flex flex-col shadow-sm", className)}>
      {image && (
        <div className="h-56 w-full overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover saturate-[85%] brightness-[98%]"
          />
        </div>
      )}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-1 rounded-full bg-primary" />
          <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-[0.2em]">{time}</span>
        </div>
        <h2 className="text-3xl mb-4 leading-tight font-serif">{title}</h2>
        {description && <p className="text-sm font-sans text-secondary-foreground/70 leading-relaxed font-light">{description}</p>}
      </div>
    </div>
  );
};

export const EventCard: React.FC<EventCardProps> = ({
  id,
  type,
  title,
  time,
  description,
  image,
  amount,
  category,
  dueDate,
  className,
  onOpen,
}) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 80], [0, 1]);
  const scale = useTransform(x, [0, 80], [0.8, 1]);

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', damping: 28, stiffness: 100 } },
  };

  return (
    <div className={cn("relative mb-6 group w-full", className)}>
      {/* Background Actions */}
      <div className="absolute inset-y-0 left-0 w-32 flex items-center px-8 rounded-[2rem] bg-burgundy/5 overflow-hidden">
        <motion.div style={{ opacity, scale }} className="flex flex-col items-center gap-2 text-burgundy">
          <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm">
            <Check size={20} />
          </div>
          <span className="font-sans text-[8px] uppercase tracking-[0.2em] font-black">Archive</span>
        </motion.div>
      </div>

      {/* Main Card */}
      <motion.div
        layoutId={`card-surface-${id}`}
        variants={cardVariants}
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
        dragElastic={0.15}
        style={{ x }}
        onClick={() => {
          if (x.get() < 10) onOpen?.();
        }}
        className="relative z-10 touch-pan-y cursor-pointer w-full"
      >
        <CardContent 
          type={type}
          title={title}
          time={time}
          description={description}
          image={image}
          amount={amount}
          category={category}
          dueDate={dueDate}
          className="w-full"
        />
      </motion.div>
    </div>
  );
};
