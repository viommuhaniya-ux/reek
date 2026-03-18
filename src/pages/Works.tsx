import { useState, useEffect } from 'react';
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

  // ✅ FIXED PROGRESS CONTROL
  useEffect(() => {
    let interval: any;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <div className="min-h-screen pt-24 bg-background">

      {/* GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => {
                  setSelectedWork(work);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className="cursor-pointer"
              >
                <img src={work.image} className="w-full rounded-xl" />
                <h3 className="mt-2">{work.title}</h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-card p-4"
            >

              <button onClick={() => setSelectedWork(null)} className="mb-2">
                <X />
              </button>

              {/* IMAGE (VIDEO SIMULATION) */}
              <img src={selectedWork.image} className="w-full rounded-lg" />

              {/* PROGRESS */}
              <div className="mt-4 h-1 bg-gray-700">
                <div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* CONTROLS */}
              <div className="flex gap-4 mt-4">
                <button onClick={handlePlay}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>

                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
