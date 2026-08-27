import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Phone, Mail, MapPin, Instagram, Youtube, Facebook, ArrowUpRight, Heart, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  const whatsappUrl = `https://wa.me/94773053014?text=${encodeURIComponent("Hello NS Studio! I would like to inquire about photography/videography services.")}`;

  return (
    <footer className="relative overflow-hidden bg-neutral-950 border-t border-white/5 text-neutral-400 text-sm">

      {/* Background blobs */}
      <div className="blob blob-amber w-[400px] h-[400px] bottom-[-150px] left-[-100px] opacity-10" />
      <div className="blob blob-purple w-[350px] h-[350px] top-[-100px] right-[-50px] opacity-10" />

      {/* Rainbow top accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-amber-500 via-pink-500 via-violet-500 to-cyan-500 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              {!logoFailed ? (
                <img
                  src="/logo.png"
                  alt="NS Studio Logo"
                  onError={() => setLogoFailed(true)}
                  className="h-10 w-auto max-w-[130px] object-contain"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/30">
                  <Camera className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
              <div>
                <span className="text-lg font-bold tracking-wider text-white uppercase block leading-none font-serif">NS Studio</span>
                <span className="text-[9px] tracking-[0.2em] text-amber-400 font-semibold uppercase block mt-0.5">Photography & Films</span>
              </div>
            </Link>
            <p className="text-neutral-400 leading-relaxed text-xs sm:text-sm">
              Capturing timeless wedding vows, commercial visual stories, fine art portraiture, and aerial films in Gampaha and across Sri Lanka.
            </p>
            {/* Socials & WhatsApp */}
            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-neutral-950 transition-all hover:scale-110"
                title="Direct WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-neutral-300 hover:text-pink-400 hover:border-pink-400/40 transition-all hover:scale-110"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-neutral-300 hover:text-red-400 hover:border-red-400/40 transition-all hover:scale-110"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100064927504958&mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-neutral-300 hover:text-blue-400 hover:border-blue-400/40 transition-all hover:scale-110"
                title="Official Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest font-mono">Quick Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About & Gear' },
                { to: '/portfolio', label: 'Photo & Video Portfolio' },
                { to: '/services', label: 'Packages & Pricing' },
                { to: '/reviews', label: 'Client Testimonials' },
                { to: '/contact', label: 'Book a Session' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-amber-400 transition-colors group flex items-center gap-1.5">
                    <span className="w-0 group-hover:w-2 h-px bg-amber-400 transition-all duration-300 rounded" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest font-mono">Speciality Services</h3>
            <ul className="space-y-2.5 text-neutral-400">
              {[
                { name: 'Cinematic Wedding Films', tag: '4K HDR', tagColor: 'text-amber-400 bg-amber-500/10' },
                { name: 'Fine Art Photography', tag: 'High Res', tagColor: 'text-pink-400 bg-pink-500/10' },
                { name: 'Commercial & Brand Ads', tag: 'Full Production', tagColor: 'text-violet-400 bg-violet-500/10' },
                { name: 'Drone Aerial Videography', tag: 'Licensed', tagColor: 'text-cyan-400 bg-cyan-500/10' },
              ].map(({ name, tag, tagColor }) => (
                <li key={name} className="flex items-center justify-between border-b border-neutral-900 pb-2">
                  <span>{name}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${tagColor}`}>{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest font-mono">Direct Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg glass border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 hover:bg-emerald-500 hover:text-neutral-950 transition-colors"
                  title="Click to Chat on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                </a>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase font-mono">Call / WhatsApp *</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    +94 77 305 3014
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg glass border border-white/10 text-pink-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase font-mono">Email Inquiry</span>
                  <a href="mailto:ntstudiogampaha@gmail.com" className="text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors break-all">
                    ntstudiogampaha@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg glass border border-white/10 text-violet-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase font-mono">Studio Location</span>
                  <span className="text-sm font-medium text-neutral-200">Gampaha, Sri Lanka</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} NS Studio Gampaha.</span>
            <span className="flex items-center gap-1">All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer transition-colors">Terms of Service</span>
            <Link to="/contact" className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              <span>Book Appointment</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
