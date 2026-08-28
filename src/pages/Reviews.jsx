import { Star, Quote, Award, CheckCircle2, Play, Users } from 'lucide-react';

export default function Reviews() {
  const reviewsList = [
    {
      id: 1,
      names: 'Dinusha & Kasun Perera',
      event: 'Destination Wedding at Bentota',
      date: 'January 2026',
      rating: 5,
      service: 'Wedding Film & Photo Classic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'Kavinda and the Lumina team captured our wedding day beyond anything we dreamed of! The cinematic highlight film had our entire family in tears of joy. Their professionalism, patience, and attention to lightning was unbelievable.',
    },
    {
      id: 2,
      names: 'Shehan & Sanuki De Silva',
      event: 'Poruwa Ceremony & Reception at Colombo',
      date: 'November 2025',
      rating: 5,
      service: 'Ultimate Cinema & Drone Combo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'From the pre-wedding shoot to the final drone shots over the ballroom, everything was seamless. The photo album quality is world class. Best decision we made for our wedding day!',
    },
    {
      id: 3,
      names: 'Amaya Visuals Studio',
      event: 'Commercial Brand Campaign',
      date: 'February 2026',
      rating: 5,
      service: 'Commercial Videography',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'We hired Lumina for a high-end luxury brand video ad. Their mastery of lighting, camera motion, and color grading elevated our brand imagery immediately. Exceptional work.',
    },
    {
      id: 4,
      names: 'Rohan & Nimanthi Alwis',
      event: 'Homecoming Reception - Kandy',
      date: 'October 2025',
      rating: 5,
      service: 'Fine Art Photography Package',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      comment: 'The candid moments captured during the reception were so raw and beautiful. They blended into the crowd without feeling intrusive while catching every laugh and emotion.',
    },
    {
      id: 5,
      names: 'Tariq & Fatima Mansoor',
      event: 'Outdoor Beach Celebration',
      date: 'August 2025',
      rating: 5,
      service: 'Drone & Video Package',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      comment: 'The 4K drone footage along the coast was breathtaking! Delivery was fast and the team communicated clearly throughout the entire process.',
    },
  ];

  const venuePartners = [
    'Shangri-La Colombo',
    'Cinnamon Grand Colombo',
    'Jetwing Lighthouse Galle',
    'Anantara Peace Haven Tangalle',
    'Heritance Kandalama',
  ];

  return (
    <div className="space-y-20 py-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-brand-primary font-semibold font-mono">
          Client Feedback
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif">
          Testimonials & Reviews
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-400 text-base leading-relaxed">
          Read genuine reviews from couples, families, and commercial clients who trusted us with their most valuable memories.
        </p>
      </section>

      {/* Trust Rating Summary */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center space-y-4">
          <div className="flex justify-center gap-1.5 text-brand-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 fill-brand-primary" />
            ))}
          </div>
          <div className="text-3xl font-extrabold text-white font-serif">
            5.0 out of 5.0 Rating
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Based on 150+ verified wedding & commercial client reviews across Google, Facebook, and direct feedback.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl flex flex-col justify-between space-y-6 hover:border-brand-primary/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-brand-primary">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-primary" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-brand-primary/40" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="border-t border-neutral-800 pt-4 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.names}
                  className="w-11 h-11 rounded-full object-cover border border-brand-primary/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-serif">{rev.names}</h4>
                  <p className="text-[11px] text-brand-primary font-semibold">{rev.event}</p>
                  <p className="text-[10px] text-neutral-500 font-mono">{rev.service} • {rev.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Venues Section */}
      <section className="bg-neutral-900/30 border-y border-neutral-800/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold font-mono">
            Featured at Top Destination Venues
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {venuePartners.map((venue, idx) => (
              <div key={idx} className="px-5 py-3 rounded-xl bg-neutral-950 border border-neutral-900 text-neutral-300 text-xs sm:text-sm font-semibold tracking-wide">
                {venue}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
