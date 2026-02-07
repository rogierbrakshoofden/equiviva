import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search as SearchIcon, 
  Mic, 
  X, 
  History, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Calendar,
  CreditCard,
  Activity,
  Heart
} from 'lucide-react';
import { EventCard } from './event-card';

interface SearchTabProps {
  horseName: string;
}

export const SearchTab: React.FC<SearchTabProps> = ({ horseName }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [aiAnswer, setAiAnswer] = useState('');

  const recentQueries = [
    "Last vet visit",
    "Training in December",
    "Feed expenses",
    "Emma's lessons"
  ];

  const suggestions = [
    { text: "What did I spend this month?", icon: <CreditCard size={14} /> },
    { text: "How many rest days this week?", icon: <Calendar size={14} /> },
    { text: "When's the next farrier due?", icon: <Activity size={14} /> },
    { text: "Show me health updates", icon: <Heart size={14} /> }
  ];

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setQuery(searchTerm);
    setIsSearching(true);
    setShowResults(false);

    // Simulate AI processing
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      
      // Mocked response logic
      if (searchTerm.toLowerCase().includes('vet')) {
        setAiAnswer(`${horseName}'s last vet visit was 2 days ago on February 3rd for annual vaccines.`);
        setResults([
          {
            id: 101,
            type: 'urgent',
            title: 'Vet visit - Annual vaccines (flu, tetanus)',
            time: '2 days ago',
            description: 'Dr. Van Der Berg. Standard annual booster administered.',
            amount: '€145',
            category: 'Health',
          }
        ]);
      } else if (searchTerm.toLowerCase().includes('spend') || searchTerm.toLowerCase().includes('expense')) {
        setAiAnswer(`You've spent €1,176 on ${horseName} in the last 30 days, primarily on hay and stable rent.`);
        setResults([
          {
            id: 102,
            type: 'expense',
            title: 'Expense - Hay delivery',
            time: '5 days ago',
            description: '60 bales from Hooi & Co.',
            amount: '€780',
            category: 'feed',
          },
          {
            id: 103,
            type: 'expense',
            title: 'Expense - Stable rent March',
            time: '3 weeks ago',
            amount: '€450',
            category: 'Stable',
            description: 'Manege Het Paard.',
          }
        ]);
      } else {
        setAiAnswer(`I found some related sessions for "${searchTerm}" in ${horseName}'s log.`);
        setResults([
          {
            id: 104,
            type: 'standard',
            title: 'Training session - Dressage',
            time: 'Yesterday',
            description: 'Working on half-passes, 45min. With Emma.',
          }
        ]);
      }
    }, 1500);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice capture
      setTimeout(() => {
        setIsListening(false);
        handleSearch("Last vet visit");
      }, 3000);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    setResults([]);
    setAiAnswer('');
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-6 pb-32">
      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="search-home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto space-y-12"
          >
            {/* Header */}
            <header className="space-y-1">
              <h1 className="text-4xl font-serif italic text-foreground">Search</h1>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-black">
                Ask about {horseName}
              </p>
            </header>

            {/* Main Input Area */}
            <div className="flex flex-col items-center space-y-8 py-8">
              <motion.button
                onClick={toggleVoice}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center relative ${
                  isListening ? 'bg-burgundy text-white shadow-2xl shadow-burgundy/40' : 'bg-white/40 backdrop-blur-md border border-border/20 text-foreground/40'
                }`}
              >
                <Mic size={32} className={isListening ? 'animate-pulse' : ''} />
                
                {/* Waveform Animation */}
                {isListening && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          height: [12, 32, 16, 24, 12][i % 5],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.8, 
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className="w-1 bg-white/40 mx-[2px] rounded-full"
                        style={{ position: 'absolute', transform: `rotate(${i * 30}deg) translateY(-40px)` }}
                      />
                    ))}
                  </div>
                )}
              </motion.button>

              <div className="w-full relative group">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                  placeholder="Ask about your horse..."
                  className="w-full bg-white/40 backdrop-blur-xl border border-border/30 rounded-3xl py-6 px-8 font-serif italic text-xl focus:outline-none focus:ring-4 focus:ring-burgundy/5 focus:border-burgundy/20 transition-all placeholder:text-secondary/20 shadow-sm"
                />
                <button 
                  onClick={() => handleSearch(query)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-burgundy/10 text-burgundy rounded-2xl hover:bg-burgundy hover:text-white transition-all shadow-lg shadow-burgundy/5"
                >
                  {isSearching ? <div className="w-5 h-5 border-2 border-burgundy border-t-transparent animate-spin rounded-full" /> : <ArrowRight size={20} />}
                </button>
              </div>
            </div>

            {/* Content Lists */}
            <div className="space-y-12">
              {/* Recent Queries */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <History size={14} className="text-foreground/40" />
                  <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Recent</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentQueries.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(q)}
                      className="px-4 py-2 bg-white/40 border border-border/20 rounded-full font-sans text-xs text-secondary/60 hover:border-burgundy/30 hover:text-burgundy transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </section>

              {/* Suggestions */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <Sparkles size={14} className="text-burgundy" />
                  <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">You might want to know</h3>
                </div>
                <div className="grid gap-3">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(s.text)}
                      className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border border-border/10 rounded-2xl group hover:bg-white/60 transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-burgundy/5 text-burgundy rounded-lg group-hover:bg-burgundy group-hover:text-white transition-colors">
                          {s.icon}
                        </div>
                        <span className="font-sans text-sm font-medium text-secondary/80">{s.text}</span>
                      </div>
                      <ChevronRight size={16} className="text-foreground/20 group-hover:text-burgundy transition-all" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto space-y-8"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <button 
                onClick={clearSearch}
                className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors group"
              >
                <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="font-sans text-[10px] uppercase tracking-widest font-black">Back</span>
              </button>
              <button 
                onClick={clearSearch}
                className="p-2 bg-foreground/5 text-foreground/40 rounded-full hover:bg-foreground/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* AI Response Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-burgundy text-white p-8 rounded-[2.5rem] shadow-2xl shadow-burgundy/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <Sparkles size={40} />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] font-black opacity-60">AI Assistant</p>
                <p className="font-serif italic text-2xl leading-snug">
                  {aiAnswer}
                </p>
              </div>
            </motion.div>

            {/* Supporting Records */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-foreground/40">Related Records</h3>
                <span className="font-mono text-[10px] text-foreground/20">{results.length} found</span>
              </div>
              
              <div className="space-y-4">
                {results.length > 0 ? (
                  results.map((event) => (
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
                      onOpen={() => {}}
                    />
                  ))
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <p className="font-serif italic text-xl text-secondary/40">I couldn't find anything matching that</p>
                    <button 
                      onClick={clearSearch}
                      className="px-6 py-3 bg-white/60 border border-border/20 rounded-full font-sans text-[10px] uppercase tracking-widest font-black hover:bg-white transition-all"
                    >
                      Try different query
                    </button>
                  </div>
                )}

                {results.length > 2 && (
                  <button className="w-full py-4 border-t border-border/10 flex items-center justify-center gap-2 text-foreground/40 hover:text-burgundy transition-colors group">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-black">Show more like this</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={clearSearch}
              className="w-full py-6 rounded-3xl bg-white/20 border border-border/10 font-sans text-[10px] uppercase tracking-widest font-black text-foreground/40 hover:bg-white/40 transition-all"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
