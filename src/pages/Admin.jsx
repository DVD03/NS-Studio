import { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Search, Filter, Phone, Mail, Calendar, MessageSquare, Trash2, RefreshCw, Plus, Images, Video, CheckCircle2, AlertCircle } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'portfolio'

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Portfolio state
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [albumSuccess, setAlbumSuccess] = useState('');
  const [albumError, setAlbumError] = useState('');

  // Multi-photo Album Form State
  const [albumForm, setAlbumForm] = useState({
    title: '',
    category: 'Weddings',
    type: 'photo',
    image: '',
    images: [],
    videoUrl: '',
    details: '',
  });

  const [rawImagesInput, setRawImagesInput] = useState('');

  const initialDemoBookings = [
    {
      _id: 'demo-b1',
      name: 'Kasun & Dinusha Perera',
      phone: '+94 77 123 4567',
      email: 'kasun.p@example.com',
      eventType: 'Wedding',
      eventDate: '2026-11-20',
      servicePackage: 'Wedding Film & Photo Classic',
      budget: 'LKR 375,000',
      message: 'Looking for full day coverage in Gampaha. Ceremony starts at 9 AM.',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'demo-b2',
      name: 'Shehan De Silva',
      phone: '+94 77 305 3014',
      email: 'shehan.ds@example.com',
      eventType: 'Commercial',
      eventDate: '2026-10-05',
      servicePackage: 'Ultimate Cinema & Drone Combo',
      budget: 'Above LKR 750,000',
      message: 'Need dynamic tracking shots for luxury promotional video.',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    },
  ];

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch(getApiUrl('/api/bookings'));
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBookings(json.data);
      } else {
        setBookings(initialDemoBookings);
      }
    } catch (err) {
      console.warn('Failed to fetch bookings', err);
      setBookings(initialDemoBookings);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchPortfolio = async () => {
    setLoadingPortfolio(true);
    try {
      const res = await fetch(getApiUrl('/api/portfolio'));
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPortfolioItems(json.data);
      }
    } catch (err) {
      console.warn('Failed to fetch portfolio', err);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchPortfolio();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Security PIN. (Default PIN: 1234)');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(getApiUrl(`/api/bookings/${id}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      setBookings(prev => prev.map(b => (b._id === id ? { ...b, status: newStatus } : b)));
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking inquiry?')) return;
    try {
      await fetch(getApiUrl(`/api/bookings/${id}`), { method: 'DELETE' });
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      setBookings(prev => prev.filter(b => b._id !== id));
    }
  };

  // Multiple File Upload Handler
  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((base64Array) => {
        setAlbumForm((prev) => {
          const updatedImages = [...prev.images, ...base64Array];
          return {
            ...prev,
            image: prev.image || updatedImages[0],
            images: updatedImages,
          };
        });
      });
    }
  };

  // Add Portfolio Item / Multi-Photo Album Handler
  const handleAddAlbum = async (e) => {
    e.preventDefault();
    setAlbumSuccess('');
    setAlbumError('');

    // Parse additional text URLs if provided
    const parsedUrls = rawImagesInput
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const finalImages = Array.from(new Set([...albumForm.images, ...parsedUrls]));
    const coverImg = albumForm.image || finalImages[0];

    if (!albumForm.title || !coverImg) {
      setAlbumError('Album title and at least one image/cover URL are required.');
      return;
    }

    const payload = {
      ...albumForm,
      image: coverImg,
      images: finalImages.length > 0 ? finalImages : [coverImg],
    };

    try {
      const res = await fetch(getApiUrl('/api/portfolio'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAlbumSuccess(`Multi-photo Album (${payload.images.length} photos) added successfully!`);
        setAlbumForm({
          title: '',
          category: 'Weddings',
          type: 'photo',
          image: '',
          images: [],
          videoUrl: '',
          details: '',
        });
        setRawImagesInput('');
        fetchPortfolio();
        setTimeout(() => setAlbumSuccess(''), 4000);
      } else {
        setAlbumError(json.message || 'Failed to add portfolio album.');
      }
    } catch (err) {
      setAlbumError('Server communication error.');
    }
  };

  // Delete Portfolio Item / Album Handler
  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album item?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/${id}`), { method: 'DELETE' });
      setPortfolioItems(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setPortfolioItems(prev => prev.filter(p => p._id !== id));
    }
  };

  // Filter Bookings Logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white font-serif">NS Studio Admin Portal</h2>
            <p className="text-xs text-neutral-400">Enter Security PIN to manage bookings and add portfolio albums (Demo PIN: 1234)</p>
          </div>

          {authError && (
            <div className="bg-red-950/80 border border-red-500/40 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm transition-all"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>NS Studio Admin Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Dashboard & Portfolio Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchBookings();
              fetchPortfolio();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold hover:bg-neutral-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingBookings || loadingPortfolio ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold hover:text-red-400 hover:border-red-500/40"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex border-b border-neutral-800 gap-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'bookings'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Booking Inquiries ({totalBookings})
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'portfolio'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Manage Multi-Photo Albums ({portfolioItems.length})
        </button>
      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="space-y-8">
          {/* Stats Widgets */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-neutral-400 uppercase font-mono">Total Received</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-serif">{totalBookings}</div>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-amber-400 uppercase font-mono">Pending Review</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">{pendingCount}</div>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-xs text-emerald-400 uppercase font-mono">Confirmed Events</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">{confirmedCount}</div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900/40 border border-neutral-800/80 p-4 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, email, phone..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Filter className="w-4 h-4 text-neutral-400" />
              <span className="text-xs text-neutral-400 uppercase font-mono">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Inquiries</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono tracking-wider text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="py-4 px-6">Client Details</th>
                    <th className="py-4 px-6">Event & Date</th>
                    <th className="py-4 px-6">Package & Budget</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-neutral-500 text-sm">
                        No booking inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b._id} className="hover:bg-neutral-950/50 transition-colors">
                        
                        {/* Client Info */}
                        <td className="py-4 px-6 space-y-1">
                          <div className="font-bold text-white text-sm font-serif">{b.name}</div>
                          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                            <a href={`tel:${b.phone}`} className="hover:text-amber-400 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-amber-500" />
                              <span>{b.phone}</span>
                            </a>
                            <a href={`mailto:${b.email}`} className="hover:text-amber-400 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-amber-500" />
                              <span>{b.email}</span>
                            </a>
                          </div>
                          {b.message && (
                            <div className="text-[11px] text-neutral-400 bg-neutral-950/80 p-2 rounded-lg border border-neutral-800/60 mt-2 max-w-sm italic">
                              "{b.message}"
                            </div>
                          )}
                        </td>

                        {/* Event & Date */}
                        <td className="py-4 px-6 space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-950 border border-neutral-800 text-amber-400 font-semibold text-[10px]">
                            {b.eventType}
                          </span>
                          <div className="text-xs text-white font-mono font-medium flex items-center gap-1.5 pt-1">
                            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{b.eventDate}</span>
                          </div>
                        </td>

                        {/* Package & Budget */}
                        <td className="py-4 px-6 space-y-1">
                          <div className="text-xs font-semibold text-neutral-200">{b.servicePackage}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">Budget: {b.budget}</div>
                        </td>

                        {/* Status Selection Dropdown */}
                        <td className="py-4 px-6">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none transition-colors ${
                              b.status === 'Confirmed'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                : b.status === 'Completed'
                                ? 'bg-neutral-800 text-neutral-300 border-neutral-700'
                                : b.status === 'Cancelled'
                                ? 'bg-red-950/80 text-red-300 border-red-500/40'
                                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Quick Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${b.name}, regarding your ${b.eventType} booking request on ${b.eventDate}...`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-neutral-950 transition-colors"
                              title="Open WhatsApp Chat"
                            >
                              <MessageSquare className="w-4 h-4 fill-current" />
                            </a>
                            <button
                              onClick={() => handleDeleteBooking(b._id)}
                              className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-500/40 transition-colors"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO ALBUM MANAGER WITH MULTI-PHOTO SUPPORT */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Add New Multi-Image Album Form (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 p-8 rounded-3xl space-y-6 shadow-xl h-fit">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                <Plus className="w-4 h-4" />
                <span>Create Multi-Photo Album</span>
              </div>
              <h3 className="text-xl font-bold text-white font-serif">Add Portfolio Album</h3>
              <p className="text-xs text-neutral-400">Add unlimited photos to a single album. Customers can slide through all photos in a full-screen gallery viewer.</p>
            </div>

            {albumSuccess && (
              <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{albumSuccess}</span>
              </div>
            )}

            {albumError && (
              <div className="bg-red-950/90 border border-red-500/50 text-red-200 p-4 rounded-2xl flex items-center gap-3 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{albumError}</span>
              </div>
            )}

            <form onSubmit={handleAddAlbum} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-300 uppercase font-mono">Album Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sunset Wedding at Bentota"
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-300 uppercase font-mono">Category *</label>
                  <select
                    value={albumForm.category}
                    onChange={(e) => setAlbumForm({ ...albumForm, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Cinematic Films">Cinematic Films</option>
                    <option value="Drone Aerial">Drone Aerial</option>
                    <option value="Commercials">Commercials</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-neutral-300 uppercase font-mono">Media Type</label>
                  <select
                    value={albumForm.type}
                    onChange={(e) => setAlbumForm({ ...albumForm, type: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="photo">Photo Album</option>
                    <option value="video">Video Reel</option>
                  </select>
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-300 uppercase font-mono">Cover Image URL *</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (Cover image for album card)"
                  value={albumForm.image}
                  onChange={(e) => setAlbumForm({ ...albumForm, image: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Multi-Photo Uploader & Multiple URLs Input */}
              <div className="space-y-2 bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-amber-400 uppercase font-mono flex items-center gap-1">
                    <Images className="w-3.5 h-3.5" />
                    <span>Album Photos ({albumForm.images.length})</span>
                  </label>
                  {albumForm.images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setAlbumForm(prev => ({ ...prev, images: [] }))}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Clear Photos
                    </button>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Select & upload multiple image files:</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleFilesChange}
                    className="w-full text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-800 file:text-amber-400 hover:file:bg-neutral-700"
                  />
                </div>

                <div>
                  <span className="text-[11px] text-neutral-400 block mb-1">Or paste additional image URLs (one per line):</span>
                  <textarea
                    rows="3"
                    placeholder="https://image1.jpg&#10;https://image2.jpg&#10;https://image3.jpg"
                    value={rawImagesInput}
                    onChange={(e) => setRawImagesInput(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  ></textarea>
                </div>
              </div>

              {albumForm.type === 'video' && (
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-300 uppercase font-mono">Video Reel URL (MP4 / Stream)</label>
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={albumForm.videoUrl}
                    onChange={(e) => setAlbumForm({ ...albumForm, videoUrl: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-neutral-300 uppercase font-mono">Album Description</label>
                <textarea
                  rows="2"
                  placeholder="Details about ceremony, location, or shooting notes..."
                  value={albumForm.details}
                  onChange={(e) => setAlbumForm({ ...albumForm, details: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Save Album to Portfolio Database</span>
              </button>
            </form>
          </div>

          {/* Portfolio Live Items Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-xl font-bold text-white font-serif">Existing Portfolio Albums</h3>
              <span className="text-xs text-neutral-400 font-mono">Total: {portfolioItems.length} Albums</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioItems.map((item) => {
                const photoCount = item.images?.length || 1;

                return (
                  <div
                    key={item._id || item.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden space-y-3 p-4 relative group"
                  >
                    <div className="aspect-video relative rounded-xl overflow-hidden bg-neutral-950">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-neutral-950/80 border border-neutral-700 text-amber-400 font-mono text-[10px]">
                        {item.category}
                      </div>

                      {item.type === 'photo' && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold flex items-center gap-1">
                          <Images className="w-3 h-3 text-amber-400" />
                          <span>{photoCount} Photos</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-white text-sm font-serif">{item.title}</h4>
                      <p className="text-[11px] text-neutral-400 line-clamp-2">{item.details}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3">
                      <span className="text-[10px] text-neutral-500 uppercase font-mono">{item.type} • {photoCount} items</span>
                      <button
                        onClick={() => handleDeleteAlbum(item._id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Album</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
