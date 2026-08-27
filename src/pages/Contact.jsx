import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

export default function Contact() {
  const location = useLocation();
  const passedState = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    servicePackage: passedState.selectedPackage || 'Wedding Film & Photo Classic',
    budget: passedState.totalEstimatedPrice || 'LKR 375,000',
    message: passedState.selectedAddOns?.length
      ? `Selected Add-Ons: ${passedState.selectedAddOns.join(', ')}. Estimated Total: ${passedState.totalEstimatedPrice}.`
      : '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (location.state) {
      setFormData((prev) => ({
        ...prev,
        eventDate: location.state.prefilledDate || prev.eventDate,
        servicePackage: location.state.selectedPackage || prev.servicePackage,
        budget: location.state.totalEstimatedPrice || prev.budget,
        message: location.state.selectedAddOns?.length
          ? `Selected Add-Ons: ${location.state.selectedAddOns.join(', ')}. Estimated Total: ${location.state.totalEstimatedPrice}.`
          : prev.message,
      }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          eventType: 'Wedding',
          eventDate: '',
          servicePackage: 'Wedding Film & Photo Classic',
          budget: 'LKR 375,000',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrorMsg(result.message || 'Failed to record booking request.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello NS Studio! My name is ${formData.name || 'a client'}. I would like to inquire about booking ${formData.eventType} services (${formData.servicePackage}) for ${formData.eventDate || 'an upcoming date'}. ${formData.message}`
  );

  const directWhatsappUrl = `https://wa.me/94773053014?text=${whatsappMessage}`;

  return (
    <div className="space-y-16 py-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif">
          Contact & Event Booking
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-400 text-base leading-relaxed">
          Fill out the inquiry form below to check availability for your event date or click to chat automatically on WhatsApp.
        </p>

        {passedState.selectedPackage && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Pre-loaded from Services: {passedState.selectedPackage} ({passedState.totalEstimatedPrice})</span>
          </div>
        )}
      </section>

      {/* Main Form & Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Automatic WhatsApp CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* WhatsApp Launcher Box */}
            <div className="bg-gradient-to-br from-emerald-950/80 to-neutral-900 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">Automatic WhatsApp Chat</h3>
                  <p className="text-xs text-neutral-400">Instant response from NS Studio team</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Click below to automatically open WhatsApp chat with +94 77 305 3014 and send your inquiry instantly.
              </p>

              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-neutral-950" />
                <span>Chat on WhatsApp (+94 77 305 3014)</span>
              </a>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white font-serif border-b border-neutral-800 pb-4">
                NS Studio Contact Details
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <a
                    href={directWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 hover:bg-emerald-500 hover:text-neutral-950 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </a>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Telephone / WhatsApp *</span>
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      +94 77 305 3014
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Email Address *</span>
                    <a
                      href="mailto:ntstudiogampaha@gmail.com"
                      className="text-sm font-semibold text-white hover:text-amber-400 transition-colors break-all"
                    >
                      ntstudiogampaha@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Studio Location</span>
                    <p className="text-sm font-medium text-neutral-300">
                      NS Studio, Gampaha, Sri Lanka
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Business Hours</span>
                    <p className="text-sm font-medium text-neutral-300">
                      Monday - Saturday: 9:00 AM - 7:00 PM <br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800/80 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white font-serif">Inquiry & Reservation Form</h3>
              <p className="text-xs text-neutral-400">Fill out your event details to receive a custom quote from NS Studio.</p>
            </div>

            {submitted && (
              <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs sm:text-sm">
                  Thank you! Your booking request has been saved into MongoDB. View it in the Admin Dashboard!
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-950/90 border border-red-500/50 text-red-200 p-4 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <div className="text-xs sm:text-sm">{errorMsg}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 305 3014"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ntstudiogampaha@gmail.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Selected Package
                  </label>
                  <input
                    type="text"
                    name="servicePackage"
                    value={formData.servicePackage}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                    Estimated Budget / Total
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  Additional Details & Selected Add-Ons
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your venue location, estimated duration, or special requests..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-4 rounded-xl text-base transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Submitting to Database...' : 'Submit Reservation Request'}</span>
              </button>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
