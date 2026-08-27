import { Link } from 'react-router-dom';
import { Camera, Video, ArrowRight, Play, CheckCircle2, Film } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Weddings & Events Covered', value: '450+' },
    { label: 'Cinematic Films Created', value: '280+' },
    { label: 'Years of Experience', value: '9+' },
    { label: 'Client Satisfaction Rate', value: '99.8%' },
  ];

  const highlights = [
    {
      id: 1,
      title: 'Eternal Vows at Sunset',
      category: 'Wedding Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      type: 'photo',
      color: 'from-amber-500/30 to-rose-500/30',
    },
    {
      id: 2,
      title: 'High-Octane Cinematic Reel',
      category: 'Cinematic Video Film',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
      type: 'video',
      color: 'from-violet-500/30 to-cyan-500/30',
    },
    {
      id: 3,
      title: 'Luxury Brand Campaign',
      category: 'Commercial Production',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      type: 'photo',
      color: 'from-pink-500/30 to-amber-500/30',
    },
    {
      id: 4,
      title: 'Coastline Drone Perspective',
      category: 'Aerial Videography',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      type: 'video',
      color: 'from-cyan-500/30 to-violet-500/30',
    },
  ];

  const serviceTeasers = [
    {
      icon: Camera,
      title: 'Wedding & Fine Art Photography',
      desc: 'Authentic emotion, candid moments, and luxury editorial styling captured with high-resolution clarity.',
      accent: 'from-amber-500 to-orange-500',
      glow: 'shadow-amber-500/20',
    },
    {
      icon: Video,
      title: 'Cinematic Videography & Trailers',
      desc: '4K narrative films with custom color grading, sound design, and emotional storytelling techniques.',
      accent: 'from-violet-500 to-pink-500',
      glow: 'shadow-violet-500/20',
    },
    {
      icon: Film,
      title: 'Aerial Drone Videography',
      desc: 'Licensed 4K aerial footage providing breathtaking perspective for outdoor ceremonies and commercials.',
      accent: 'from-cyan-500 to-blue-500',
      glow: 'shadow-cyan-500/20',
    },
  ];

  return (
    <div className="space-y-28 pb-20 overflow-x-hidden">

      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-neutral-950">

        {/* Animated background blobs */}
        <div className="blob blob-amber w-[600px] h-[600px] top-[-200px] left-[-150px] animate-float" />
        <div className="blob blob-purple w-[500px] h-[500px] bottom-[-100px] right-[-100px]" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />
        <div className="blob blob-pink w-[300px] h-[300px] top-[30%] right-[15%]" style={{ animation: 'float 5s ease-in-out infinite 0.5s' }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=85"
            alt="Photographer at work"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20">

          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold font-mono">
              Professional Photography & Videography Studio
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="animate-slide-up animate-delay-100 text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] font-serif">
            <span className="text-white">Capturing Timeless</span><br />
            <span className="gradient-text">Stories Through</span><br />
            <span className="text-white">Lens & Motion</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up animate-delay-200 max-w-2xl mx-auto text-neutral-300 text-base sm:text-lg leading-relaxed">
            Specializing in high-end wedding films, editorial portraiture, commercial campaigns, and breathtaking drone cinematography across Sri Lanka and worldwide.
          </p>

          {/* Action Buttons */}
          <div className="animate-slide-up animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-xl text-base transition-colors active:scale-95"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold border border-neutral-700 hover:border-neutral-600 px-8 py-4 rounded-xl text-base transition-colors active:scale-95"
            >
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="animate-slide-up animate-delay-400 pt-10 flex flex-wrap justify-center gap-4 sm:gap-8 text-neutral-400 text-xs sm:text-sm font-medium">
            {['4K Cinema Videography', 'High Resolution Stills', 'Worldwide Travel Ready'].map(feat => (
              <div key={feat} className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-amber-500/20">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span className="text-neutral-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-amber-400/60 to-transparent" />
        </div>
      </section>

      {/* ====== STATS COUNTER BAR ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rainbow-border">
          <div className="bg-neutral-900 grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-[calc(1.5rem-1px)] overflow-hidden">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`relative text-center p-8 space-y-2 hover-lift group ${idx < 3 ? 'border-r border-neutral-800 last:border-r-0' : ''}`}
              >
                <div className="text-4xl sm:text-5xl font-extrabold stat-number font-serif group-hover:neon-amber transition-all">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
                {/* Bottom accent bar */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GRADIENT DIVIDER ====== */}
      <div className="gradient-divider max-w-7xl mx-auto" />

      {/* ====== FEATURED WORKS ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest text-amber-300 font-semibold font-mono bg-amber-500/10 border border-amber-500/20">
              Selected Showcase
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif">
              Featured <span className="gradient-text-warm">Photo & Film</span> Highlights
            </h2>
          </div>
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm group">
            <span>View All Works</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl hover-lift cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Play button for video */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300 animate-pulse-glow">
                      <Play className="w-7 h-7 fill-white text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
                <span className={`inline-block px-3 py-1 rounded-md bg-gradient-to-r ${item.color} border border-white/10 text-[11px] font-semibold text-white uppercase tracking-wider backdrop-blur-sm`}>
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors font-serif">
                  {item.title}
                </h3>
              </div>

              {/* Shine sweep on hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* ====== SERVICES TEASER ====== */}
      <section className="relative py-24 overflow-hidden">
        {/* Background blobs */}
        <div className="blob blob-purple w-[500px] h-[500px] top-0 left-[10%]" />
        <div className="blob blob-cyan w-[400px] h-[400px] bottom-0 right-[5%]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-widest text-violet-300 font-semibold font-mono bg-violet-500/10 border border-violet-500/20">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif">
              <span className="text-white">Crafted</span> <span className="gradient-text">Visual Solutions</span>
            </h2>
            <p className="text-neutral-400">
              From intimate emotional vows to high-production commercial advertisements, we deliver cinematic perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTeasers.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group glass p-8 rounded-3xl border border-white/5 hover:border-white/15 transition-all space-y-5 hover-lift card-glow">
                  {/* Icon with gradient bg */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-white shadow-xl ${service.glow} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif group-hover:gradient-text-warm transition-all">{service.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{service.desc}</p>
                  {/* Bottom gradient line */}
                  <div className={`h-0.5 rounded-full bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-7 py-3.5 rounded-2xl text-sm border border-neutral-700 hover:border-amber-500/40 transition-all"
            >
              <span>View Packages & Pricing</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rainbow-border">
          <div className="relative bg-neutral-950 rounded-[calc(1.5rem-1px)] p-10 sm:p-16 text-center space-y-7 overflow-hidden">
            {/* Blobs inside */}
            <div className="blob blob-amber w-80 h-80 top-[-80px] left-[-80px]" />
            <div className="blob blob-pink w-80 h-80 bottom-[-80px] right-[-80px]" />

            <h2 className="relative text-3xl sm:text-5xl font-extrabold font-serif">
              <span className="text-white">Ready to Capture</span><br />
              <span className="gradient-text">Your Story?</span>
            </h2>
            <p className="relative max-w-xl mx-auto text-neutral-300 text-sm sm:text-base leading-relaxed">
              Reserve your wedding date or schedule a creative strategy session for your next video production.
            </p>
            <div className="relative flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-xl text-base transition-colors active:scale-95"
              >
                <span>Schedule Booking</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold border border-neutral-700 hover:border-neutral-600 px-8 py-4 rounded-xl text-base transition-colors active:scale-95"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
