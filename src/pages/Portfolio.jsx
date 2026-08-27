import { useState, useEffect } from 'react';
import { Camera, Video, Play, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Selected photo album object
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Active image index inside selected album
  const [selectedVideo, setSelectedVideo] = useState(null); // Selected video object

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterTabs = [
    { label: 'All', color: 'from-amber-500 to-orange-500' },
    { label: 'Weddings', color: 'from-rose-500 to-pink-500' },
    { label: 'Portraits', color: 'from-violet-500 to-purple-500' },
    { label: 'Cinematic Films', color: 'from-cyan-500 to-blue-500' },
    { label: 'Drone Aerial', color: 'from-teal-500 to-green-500' },
    { label: 'Commercials', color: 'from-amber-500 to-yellow-500' },
  ];

  const defaultItems = [
    {
      _id: '1', type: 'photo', title: 'Royal Beachfront Vows', category: 'Weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=85',
      ],
      details: 'Captured during sunset at Bentota Beach. 4-photo collection with high-resolution details.',
    },
    {
      _id: '2', type: 'video', title: 'Cinematic Highlights - Amaya & Rohan', category: 'Cinematic Films',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85',
      images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85'],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      details: '4K 120fps slow-motion film with custom color grading and sound design.',
    },
    {
      _id: '3', type: 'photo', title: 'High Fashion Studio Collection', category: 'Portraits',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=85',
      ],
      details: 'Studio lighting setup using key light and reflector for high-contrast portraiture.',
    },
    {
      _id: '4', type: 'video', title: 'Southern Coast Aerial Reel', category: 'Drone Aerial',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
      images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85'],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      details: 'DJI Mavic 3 Pro 5.1K aerial video capturing coastal topography.',
    },
  ];

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/portfolio'));
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setPortfolioItems(json.data);
      } else {
        setPortfolioItems(defaultItems);
      }
    } catch (err) {
      console.warn('Using default portfolio items', err);
      setPortfolioItems(defaultItems);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const openAlbumModal = (album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedAlbum) return;
    const albumImages = selectedAlbum.images?.length > 0 ? selectedAlbum.images : [selectedAlbum.image];
    setCurrentImageIndex((prev) => (prev + 1) % albumImages.length);
  };

  const prevImage = () => {
    if (!selectedAlbum) return;
    const albumImages = selectedAlbum.images?.length > 0 ? selectedAlbum.images : [selectedAlbum.image];
    setCurrentImageIndex((prev) => (prev - 1 + albumImages.length) % albumImages.length);
  };

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className="space-y-16 py-16 overflow-x-hidden">

      {/* ====== HEADER ====== */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="blob blob-purple w-[400px] h-[400px] top-[-100px] left-[10%] opacity-15" />
        <div className="blob blob-cyan w-[300px] h-[300px] top-[-50px] right-[5%] opacity-15" />
        <div className="relative">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-violet-300 font-semibold font-mono bg-violet-500/10 border border-violet-500/25 animate-slide-up">
            Visual Archives
          </span>
          <h1 className="animate-slide-up animate-delay-100 text-4xl sm:text-6xl font-extrabold font-serif mt-4">
            <span className="text-white">Photo Albums & Video</span><br />
            <span className="gradient-text">Portfolio Gallery</span>
          </h1>
          <p className="animate-slide-up animate-delay-200 max-w-2xl mx-auto text-neutral-400 text-base leading-relaxed mt-4">
            Browse through full multi-photo albums, cinematic wedding films, commercial adverts, and aerial drone reels by NS Studio.
          </p>
        </div>
      </section>

      {/* ====== FILTER TABS ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveFilter(tab.label)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
                activeFilter === tab.label
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ====== PORTFOLIO ALBUMS GRID ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-16 text-neutral-500 font-mono text-sm">Loading portfolio items...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const imageCount = item.images?.length || 1;

              return (
                <div
                  key={item._id || item.id}
                  onClick={() => {
                    if (item.type === 'photo') openAlbumModal(item);
                    if (item.type === 'video') setSelectedVideo(item);
                  }}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 hover-lift transition-all duration-300"
                >
                  {/* Image Card Container */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-neutral-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent" />

                    {/* Category badge Top Left */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-white text-xs font-semibold">
                      {item.type === 'video' ? <Video className="w-3.5 h-3.5 text-cyan-400" /> : <Camera className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{item.category}</span>
                    </div>

                    {/* Multi-Photo Count Badge Top Right */}
                    {item.type === 'photo' && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-950/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold shadow-lg">
                        <Images className="w-3.5 h-3.5 text-amber-400" />
                        <span>{imageCount} {imageCount === 1 ? 'Photo' : 'Photos'}</span>
                      </div>
                    )}

                    {/* Action Icon Center */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.type === 'video' ? (
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                          <Play className="w-7 h-7 fill-white text-white ml-1" />
                        </div>
                      ) : (
                        <div className="px-4 py-2 rounded-xl bg-neutral-950/90 border border-amber-400 text-amber-300 text-xs font-bold font-mono flex items-center gap-2 shadow-xl">
                          <Images className="w-4 h-4 text-amber-400" />
                          <span>View Full Album</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="p-5 space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-serif">{item.title}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ====== MULTI-PHOTO ALBUM SLIDESHOW LIGHTBOX MODAL ====== */}
      {selectedAlbum && (() => {
        const albumImages = selectedAlbum.images?.length > 0 ? selectedAlbum.images : [selectedAlbum.image];
        const activeImageUrl = albumImages[currentImageIndex] || selectedAlbum.image;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-xl animate-fade-in">
            <div className="relative max-w-5xl w-full glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 animate-scale-in">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass border border-white/10 text-neutral-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
                title="Close Album"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Photo Container with Nav Arrows */}
              <div className="relative max-h-[65vh] h-[60vh] rounded-2xl overflow-hidden flex items-center justify-center bg-black border border-white/5">
                <img
                  src={activeImageUrl}
                  alt={`${selectedAlbum.title} photo ${currentImageIndex + 1}`}
                  className="max-h-full w-auto object-contain transition-all duration-300"
                />

                {/* Left Arrow */}
                {albumImages.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-950/80 border border-neutral-700 text-white hover:text-amber-400 hover:border-amber-400 transition-all shadow-xl"
                    title="Previous Photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right Arrow */}
                {albumImages.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-950/80 border border-neutral-700 text-white hover:text-amber-400 hover:border-amber-400 transition-all shadow-xl"
                    title="Next Photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Photo Index Counter Badge */}
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-neutral-950/80 border border-neutral-800 text-amber-400 text-xs font-mono font-bold shadow-lg">
                  Photo {currentImageIndex + 1} of {albumImages.length}
                </div>
              </div>

              {/* Multi-Photo Thumbnail Strip */}
              {albumImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto py-2 px-1 scrollbar-none">
                  {albumImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        currentImageIndex === idx
                          ? 'border-amber-400 scale-105 shadow-md'
                          : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Album Info */}
              <div className="space-y-1 px-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest font-mono">{selectedAlbum.category} Album</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">{selectedAlbum.title}</h3>
                <p className="text-sm text-neutral-400">{selectedAlbum.details}</p>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ====== VIDEO MODAL ====== */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/95 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-4xl w-full glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4 animate-scale-in">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass border border-white/10 text-neutral-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/5">
              <video src={selectedVideo.videoUrl} controls autoPlay className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1 px-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">{selectedVideo.category} Film Reel</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">{selectedVideo.title}</h3>
              <p className="text-sm text-neutral-400">{selectedVideo.details}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
