import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Pause, Volume2, VolumeX, Maximize, Clock, Calendar } from 'lucide-react';

const categories = ['All', 'Film', 'Commercial', 'Music', 'Documentary'];

const works = [
  { id: 1, title: 'CINEMATIC REEL 2024', category: 'Film', image: '/images/work-1.jpg', description: 'A showcase of cinematic techniques and storytelling', duration: '04:32', year: '2024' },
  { id: 2, title: 'BRAND STORY - LUXE', category: 'Commercial', image: '/images/work-2.jpg', description: 'Premium brand film for luxury fashion label', duration: '01:45', year: '2024' },
  { id: 3, title: 'NEON DREAMS', category: 'Music', image: '/images/work-3.jpg', description: 'Music video with vibrant visual effects', duration: '03:28', year: '2023' },
  { id: 4, title: 'URBAN STORIES', category: 'Documentary', image: '/images/work-4.jpg', description: 'Documentary about city life and culture', duration: '12:15', year: '2024' },
  { id: 5, title: 'TECH FORWARD', category: 'Commercial', image: '/images/work-5.jpg', description: 'Product launch video for tech startup', duration: '02:30', year: '2023' },
  { id: 6, title: 'ECHOES', category: 'Film', image: '/images/hero-bg.jpg', description: 'Short film exploring memory and time', duration: '08:45', year: '2024' },
  { id: 7, title: 'PULSE', category: 'Music', image: '/images/about-bg.jpg', description: 'High-energy music video with dynamic editing', duration: '03:52', year: '2023' },
  { id: 8, title: 'THE JOURNEY', category: 'Documentary', image: '/images/work-1.jpg', description: 'Travel documentary series', duration: '18:20', year: '2024' },
];

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredWorks = activeCategory === 'All'
    ? works
    : works.filter(w => w.category === activeCategory);

  // Simulate video progress
  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-background">
      {/* Header */}
      <section className="py-16 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-foreground/30" 
              />
              <span className="text-muted text-sm tracking-[0.3em] uppercase">Portfolio</span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-foreground/30" 
              />
            </div>
            
            <h1 className="font-display text-5xl md:text-8xl tracking-wider mb-6">
              WORKS
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              A curated collection of video editing projects showcasing storytelling, visual effects, and cinematic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-background'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-foreground"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => {
                    setSelectedWork(work);
                    setProgress(0);
                    setIsPlaying(false);
                  }}
                  onMouseEnter={() => setHoveredId(work.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group cursor-pointer"
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video overflow-hidden bg-card">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Scan lines effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)'
                      }}
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <motion.span 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs tracking-[0.2em] uppercase bg-background/70 backdrop-blur-sm px-3 py-1.5 border border-border/50"
                      >
                        {work.category}
                      </motion.span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-3 py-1.5 text-xs tracking-wider">
                      <Clock size={12} className="text-muted" />
                      {work.duration}
                    </div>

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: hoveredId === work.id ? 1 : 0.8, 
                          opacity: hoveredId === work.id ? 1 : 0.5 
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        {/* Pulse ring */}
                        {hoveredId === work.id && (
                          <motion.div
                            className="absolute inset-0 rounded-full border border-foreground/50"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                        
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-foreground/40 group-hover:border-foreground flex items-center justify-center backdrop-blur-sm bg-background/30 group-hover:bg-background/50 transition-all duration-300">
                          <Play size={20} className="ml-0.5" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner frames */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-foreground/0 group-hover:border-foreground/40 transition-all duration-500" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-foreground/0 group-hover:border-foreground/40 transition-all duration-500" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-foreground/0 group-hover:border-foreground/40 transition-all duration-500" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-foreground/0 group-hover:border-foreground/40 transition-all duration-500" />

                    {/* Progress bar preview on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/30">
                      <motion.div 
                        className="h-full bg-foreground/50"
                        initial={{ width: '0%' }}
                        animate={{ width: hoveredId === work.id ? '30%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg md:text-xl tracking-wider group-hover:text-accent transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-muted text-sm mt-1 line-clamp-1">{work.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted text-xs">
                      <Calendar size={12} />
                      {work.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedWork(null)}
                className="absolute -top-12 right-0 p-2 text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm tracking-wider"
              >
                <span className="hidden md:inline">CLOSE</span>
                <X size={20} />
              </button>

              {/* Video Player Container */}
              <div className="relative bg-card border border-border overflow-hidden">
                {/* Video Area */}
                <div className="relative aspect-video">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${isPlaying ? 'opacity-100' : 'opacity-90'}`}
                  />
                  
                  {/* Scan lines */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
                    }}
                  />

                  {/* Center play/pause */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlay}
                  >
                    <AnimatePresence mode="wait">
                      {!isPlaying && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="relative"
                        >
                          <motion.div
                            className="absolute inset-0 rounded-full border border-foreground/30"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-foreground flex items-center justify-center bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all">
                            <Play size={32} className="ml-1" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Video info overlay - top */}
                  <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-background/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs tracking-[0.2em] uppercase text-muted">{selectedWork.category}</span>
                        <span className="w-1 h-1 bg-muted rounded-full" />
                        <span className="text-xs text-muted">{selectedWork.year}</span>
                      </div>
                      {isPlaying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-xs tracking-wider">PLAYING</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-card border-t border-border p-4">
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="h-1 bg-border rounded-full overflow-hidden cursor-pointer group">
                      <motion.div 
                        className="h-full bg-foreground relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted">
                      <span>{Math.floor(progress * 0.045)}:{String(Math.floor((progress * 0.045 % 1) * 60)).padStart(2, '0')}</span>
                      <span>{selectedWork.duration}</span>
                    </div>
                  </div>

                  {/* Control buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Play/Pause */}
                      <button 
                        onClick={handlePlay}
                        className="w-10 h-10 border border-border hover:border-foreground hover:bg-foreground hover:text-background flex items-center justify-center transition-all"
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                      </button>

                      {/* Mute */}
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 border border-border hover:border-foreground flex items-center justify-center transition-all text-muted hover:text-foreground"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>

                      {/* Volume slider visual */}
                      <div className="hidden md:flex items-center gap-2">
                        <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
                          <div className={`h-full bg-foreground/50 transition-all ${isMuted ? 'w-0' : 'w-3/4'}`} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Fullscreen */}
                      <button className="w-10 h-10 border border-border hover:border-foreground flex items-center justify-center transition-all text-muted hover:text-foreground">
                        <Maximize size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-6 border-t border-border">
                  <h2 className="font-display text-2xl md:text-3xl tracking-wider mb-3">{selectedWork.title}</h2>
                  <p className="text-muted leading-relaxed">{selectedWork.description}</p>
                  
                  <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <span className="text-muted text-xs tracking-widest uppercase block mb-1">Role</span>
                      <p className="font-medium">Editor & Colorist</p>
                    </div>
                    <div>
                      <span className="text-muted text-xs tracking-widest uppercase block mb-1">Software</span>
                      <p className="font-medium">Premiere Pro, DaVinci</p>
                    </div>
                    <div>
                      <span className="text-muted text-xs tracking-widest uppercase block mb-1">Duration</span>
                      <p className="font-medium">{selectedWork.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted text-xs tracking-widest uppercase block mb-1">Year</span>
                      <p className="font-medium">{selectedWork.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
