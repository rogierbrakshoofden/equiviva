import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EventCard } from './components/event-card';
import { EditScreen } from './components/edit-screen';
import { BottomNav } from './components/bottom-nav';
import { RefreshCw, Search } from 'lucide-react';
import { Header } from './components/header';
import { InsightsTab } from './components/insights-tab';
import { SearchTab } from './components/search-tab';
import { AccountScreen } from './components/account-screen';
import { TrainingDetailScreen } from './components/training-detail-screen';
import { AddExpenseScreen } from './components/add-expense-screen';
import { AddHealthScreen } from './components/add-health-screen';
import { AddTrainingScreen } from './components/add-training-screen';

export default function App() {
  const [activeTab, setActiveTab] = useState('Feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedTrainingDay, setSelectedTrainingDay] = useState<{ day: number, month: string } | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddHealth, setShowAddHealth] = useState(false);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [theme, setTheme] = useState('classic-heritage');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [events, setEvents] = useState<any[]>([
    {
      id: 1,
      type: 'urgent',
      title: 'Vet visit - Annual vaccines (flu, tetanus)',
      time: '2 days ago',
      description: 'Dr. Van Der Berg. Standard annual booster administered.',
      amount: '€145',
      category: 'Health',
    },
    {
      id: 2,
      type: 'standard',
      title: 'Training session - Dressage',
      time: 'Yesterday',
      description: 'Working on half-passes, 45min. With Emma.',
    },
    {
      id: 3,
      type: 'standard',
      title: 'Farrier - All four shoes reset',
      time: '4 days ago',
      description: 'Slight crack in LF hoof noted by Jan Bakker.',
      amount: '€95',
      category: 'Maintenance',
    },
    {
      id: 4,
      type: 'expense',
      title: 'Expense - Hay delivery',
      time: '5 days ago',
      description: '60 bales from Hooi & Co.',
      amount: '€780',
      category: 'feed',
    },
    {
      id: 5,
      type: 'insight',
      title: 'Photo added - Lunging in new side reins',
      time: '6 days ago',
      image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3',
    },
    {
      id: 6,
      type: 'urgent',
      title: 'Health note - Small cut on right hock',
      time: '1 week ago',
      description: 'Cleaned and monitored. No heat or swelling.',
      category: 'Health',
    },
    {
      id: 7,
      type: 'standard',
      title: 'Training - Jumped 1.10m course',
      time: '1 week ago',
      description: 'Competition prep. 2 refusals at oxer.',
    },
    {
      id: 8,
      type: 'expense',
      title: 'Expense - Supplement order',
      time: '9 days ago',
      amount: '€67',
      category: 'Health',
      description: 'Equivital: magnesium, joint support.',
    },
    {
      id: 9,
      type: 'urgent',
      title: 'Vet visit - Lameness check',
      time: '10 days ago',
      description: 'Blocked left front - Grade 2/5. Diagnostic workup.',
      amount: '€280',
      category: 'Health',
    },
    {
      id: 10,
      type: 'expense',
      title: 'Expense - New dressage saddle pad',
      time: '11 days ago',
      amount: '€89',
      category: 'Tack',
      description: 'Mattes, navy with silver piping.',
    },
    {
      id: 11,
      type: 'standard',
      title: 'Training - Flatwork only',
      time: '12 days ago',
      description: 'Keeping it light after block. 30min walk/trot.',
    },
    {
      id: 12,
      type: 'standard',
      title: 'Farrier - Front shoes only',
      time: '2 weeks ago',
      description: 'Resting hind legs. Periodic adjustment.',
      amount: '€55',
      category: 'Maintenance',
    },
    {
      id: 13,
      type: 'insight',
      title: 'Photo added - First ride back after lameness',
      time: '2 weeks ago',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a',
    },
    {
      id: 14,
      type: 'expense',
      title: 'Expense - Lesson with Marloes',
      time: '2 weeks ago',
      amount: '€60',
      category: 'Training',
    },
    {
      id: 15,
      type: 'urgent',
      title: 'Health note - Started on bute',
      time: '16 days ago',
      description: 'Course for 5 days, vet approved dosage.',
      category: 'Health',
    },
    {
      id: 16,
      type: 'expense',
      title: 'Expense - Stable rent March',
      time: '3 weeks ago',
      amount: '€450',
      category: 'Stable',
      description: 'Manege Het Paard.',
    },
    {
      id: 17,
      type: 'standard',
      title: 'Training - Trail ride 1.5hrs',
      time: '3 weeks ago',
      description: 'Very forward and happy. Good stamina.',
    },
    {
      id: 18,
      type: 'urgent',
      title: 'Vet visit - Dental check',
      time: '3 weeks ago',
      description: 'Minor hooks filed. Routine maintenance.',
      amount: '€125',
      category: 'Health',
    },
    {
      id: 19,
      type: 'insight',
      title: 'Photo added - Braided for dressage competition',
      time: '24 days ago',
      image: 'https://images.unsplash.com/photo-1566373024505-88574341995a',
    },
    {
      id: 20,
      type: 'standard',
      title: 'Training - Dressage test L1',
      time: '25 days ago',
      description: 'Scored 64%. Judge: positive remarks on suppleness.',
    },
  ]);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Show search bar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setShowSearch(true);
      } else if (currentScrollY > lastScrollY || currentScrollY <= 100) {
        setShowSearch(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const addEvents = (newEvents: any[]) => {
    setEvents(prev => [...newEvents, ...prev]);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-40 relative">
      <AnimatePresence mode="wait">
        {activeTab === 'Feed' ? (
          <motion.div
            key="feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Pull to refresh indicator */}
            <AnimatePresence>
              {isRefreshing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 80, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center justify-center bg-background overflow-hidden"
                >
                  <RefreshCw className="animate-spin text-secondary" size={20} />
                </motion.div>
              )}
            </AnimatePresence>

            <Header 
              scrolled={scrolled}
              horseName="Valegro Royale"
              subtitle="Thursday, February 5, 2026"
              onAccountClick={() => setShowAccount(true)}
            />

            <main 
              className="px-6 relative"
              onTouchEnd={() => {
                if (window.scrollY < -50) setIsRefreshing(true);
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="max-w-xl mx-auto"
              >
                {/* Search Bar */}
                <AnimatePresence>
                  {showSearch && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 32 }}
                      exit={{ opacity: 0, y: -20, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-burgundy transition-colors" size={18} />
                        <input 
                          type="text"
                          placeholder="Search events, insights, or expenses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white/40 backdrop-blur-sm border border-border/30 rounded-2xl py-4 pl-12 pr-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/10 focus:border-burgundy/20 transition-all placeholder:text-secondary/30"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      id={event.id}
                      type={event.type}
                      title={event.title}
                      time={event.time}
                      description={event.description}
                      image={event.image}
                      amount={event.amount}
                      category={event.category}
                      dueDate={event.dueDate}
                      onOpen={() => setSelectedEvent(event)}
                    />
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <p className="font-serif italic text-xl text-secondary/40">No records found for "{searchQuery}"</p>
                  </div>
                )}
                
                {/* Footer Quote */}
                <div className="py-20 text-center opacity-30 select-none">
                  <p className="font-serif italic text-lg text-secondary">"The horse is a mirror to your soul."</p>
                  <div className="h-[1px] w-12 bg-secondary mx-auto mt-4" />
                </div>
              </motion.div>
            </main>
          </motion.div>
        ) : activeTab === 'Search' ? (
          <SearchTab key="search" horseName="Valegro Royale" />
        ) : (
          <InsightsTab 
            key="insights" 
            scrolled={scrolled} 
            onAccountClick={() => setShowAccount(true)} 
            onDayClick={(day, month) => setSelectedTrainingDay({ day, month })}
          />
        )}
      </AnimatePresence>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onSaveEvents={addEvents} 
        onAddExpense={() => setShowAddExpense(true)}
        onAddHealth={() => setShowAddHealth(true)}
        onAddTraining={() => setShowAddTraining(true)}
      />

      <AnimatePresence>
        {showAddExpense && (
          <AddExpenseScreen 
            isOpen={showAddExpense}
            onClose={() => setShowAddExpense(false)}
            onSave={(expense) => addEvents([expense])}
            horseName="Valegro Royale"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddHealth && (
          <AddHealthScreen 
            isOpen={showAddHealth}
            onClose={() => setShowAddHealth(false)}
            onSave={(record) => addEvents([record])}
            horseName="Valegro Royale"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddTraining && (
          <AddTrainingScreen 
            isOpen={showAddTraining}
            onClose={() => setShowAddTraining(false)}
            onSave={(session) => addEvents([session])}
            horseName="Valegro Royale"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTrainingDay && (
          <TrainingDetailScreen 
            day={selectedTrainingDay.day}
            month={selectedTrainingDay.month}
            horseName="Valegro Royale"
            onClose={() => setSelectedTrainingDay(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAccount && (
          <AccountScreen 
            isOpen={showAccount} 
            onClose={() => setShowAccount(false)} 
            currentTheme={theme}
            onThemeChange={setTheme}
          />
        )}
      </AnimatePresence>

      {/* Edit Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <EditScreen 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>

      {/* Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
