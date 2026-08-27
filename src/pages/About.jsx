import { Link } from 'react-router-dom';
import { Camera, Video, Award, Sliders, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

export default function About() {
  const gearCategories = [
    {
      category: 'Cinema & Still Cameras',
      items: [
        { name: 'Sony FX3 Cinema Line', desc: 'Full-frame 4K 120fps Dual Native ISO camera for low-light cinematic films.' },
        { name: 'Sony A7 IV High-Res Body', desc: '33MP full-frame sensor for crisp editorial portraits and fine art stills.' },
        { name: 'RED Komodo 6K Cinema', desc: 'Global shutter 6K cinema camera for high-end commercial campaigns.' },
      ],
    },
    {
      category: 'Master Lenses',
      items: [
        { name: 'Sony FE 24-70mm f/2.8 GM II', desc: 'Versatile master zoom for fast-paced wedding coverage.' },
        { name: 'Sony FE 85mm f/1.4 GM Prime', desc: 'Ultimate portrait lens with creamy background bokeh and sharp contrast.' },
        { name: 'Sony FE 35mm f/1.4 GM Prime', desc: 'Cinematic wide prime for storytelling and documentary shots.' },
        { name: 'Sony FE 70-200mm f/2.8 GM OSS II', desc: 'Telephoto powerhouse for candid ceremony captures from a distance.' },
      ],
    },
    {
      category: 'Aerial Drones & Stabilization',
      items: [
        { name: 'DJI Mavic 3 Pro Cine', desc: 'Triple camera system with Hasselblad 4/3 CMOS sensor for 5.1K Apple ProRes drone footage.' },
        { name: 'DJI Ronin RS3 Pro Gimbal', desc: 'Carbon fiber motorized 3-axis stabilizer with LiDAR autofocus tracking.' },
      ],
    },
    {
      category: 'Lighting & Professional Audio',
      items: [
        { name: 'Aputure 300d II & Amaran Tubes', desc: 'High CRI studio lighting setup for controlled editorial portraiture.' },
        { name: 'Sennheiser AVX Wireless Lavs', desc: 'Broadcast grade digital wireless microphones for crystal clear ceremony audio.' },
      ],
    },
  ];

  const milestones = [
    { year: '2015', title: 'Studio Founded', desc: 'Began as an independent portrait and documentary photography initiative.' },
    { year: '2018', title: 'Expanded into Cinema', desc: 'Integrated 4K video films and aerial drone production capabilities.' },
    { year: '2021', title: 'Best Wedding Film Award', desc: 'Recognized for emotional narrative storytelling in South Asian destination weddings.' },
    { year: '2025', title: 'Over 500 Projects', desc: 'Delivered landmark wedding and commercial projects worldwide.' },
  ];

  return (
    <div className="space-y-24 py-16">
      
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
          Behind The Lens
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif">
          About NS Studio & Equipment
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-400 text-base leading-relaxed">
          Discover the artist behind the camera, our story, creative vision, and world-class gear selection.
        </p>
      </section>

      {/* Bio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80"
              alt="Lead Photographer with Cinema Camera"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-neutral-900/90 border border-neutral-800 rounded-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white font-serif">Kavinda Perera</h3>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-0.5">
                Lead Visual Director & Founder
              </p>
            </div>
          </div>

          {/* Story Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
                Creative Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
                Crafting Moments That Outlast Time
              </h2>
            </div>
            
            <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
              With over 9 years of hands-on experience behind the lens, I believe photography and filmmaking are not merely about capturing scenes—they are about freezing genuine human emotions, light, and atmosphere into timeless works of art.
            </p>
            
            <p className="text-neutral-400 leading-relaxed text-sm">
              Whether documenting the subtle tear during wedding vows, framing architectural light in editorial spreads, or orchestrating a cinematic commercial, every frame is approached with meticulous attention to color harmony, narrative pacing, and technical perfection.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Full Redundancy</h4>
                  <p className="text-xs text-neutral-400">Dual memory slot backup on every shoot.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Award-Winning Color</h4>
                  <p className="text-xs text-neutral-400">Custom film emulation and color grading.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="bg-neutral-900/40 border-y border-neutral-800/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
              Our Journey
            </span>
            <h2 className="text-3xl font-bold text-white font-serif">Studio Milestones</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, index) => (
              <div key={index} className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-3">
                <span className="text-2xl font-black text-amber-400 font-mono">{m.year}</span>
                <h3 className="text-lg font-bold text-white font-serif">{m.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-mono">
            <Cpu className="w-4 h-4" />
            <span>High-End Cinema Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Professional Gear Setup
          </h2>
          <p className="text-neutral-400 text-sm">
            We use industry-leading Sony Cinema, RED, G-Master optics, and DJI aerial technology to guarantee uncompromising image quality.
          </p>
        </div>

        {/* Gear Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gearCategories.map((cat, idx) => (
            <div key={idx} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white font-serif">{cat.category}</h3>
              </div>
              
              <div className="space-y-4">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="space-y-1 bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                    <div className="text-sm font-bold text-amber-300 font-mono">{item.name}</div>
                    <div className="text-xs text-neutral-400 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-neutral-900 border border-neutral-800 p-10 rounded-3xl space-y-6">
          <h3 className="text-2xl font-bold text-white font-serif">Want to collaborate or hire us for an event?</h3>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl transition-all"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
