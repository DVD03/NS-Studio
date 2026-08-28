import { useState, useEffect } from 'react';
import {
  ShieldCheck, Lock, Search, Filter, Phone, Mail, Calendar, MessageSquare,
  Trash2, RefreshCw, Plus, Images, Video, CheckCircle2, AlertCircle,
  FileText, DollarSign, Palette, Type, UserCheck, AlertTriangle, Printer, Share2
} from 'lucide-react';
import { getApiUrl } from '../config/api';
import { useTheme, colorThemes, fontStyles } from '../context/ThemeContext';
import InvoiceModal from '../components/InvoiceModal';
import ClientLookupModal from '../components/ClientLookupModal';

export default function Admin() {
  const { currentThemeKey, currentFontKey, setTheme, setFont } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // 5 Active Tabs: 'bookings', 'lookup', 'invoices', 'portfolio', 'theme'
  const [activeTab, setActiveTab] = useState('bookings');

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Invoices state
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Client Lookup Modal state
  const [lookupPhone, setLookupPhone] = useState('');
  const [isLookupOpen, setIsLookupOpen] = useState(false);

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

  // Custom Invoice Generator Form State
  const [invoiceForm, setInvoiceForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: 'Gampaha, Sri Lanka',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0],
    terms: 'Due on Receipt',
    paidAmount: 0,
    notes: 'Thanks for your business.',
    items: [
      { description: 'Full Wedding Coverage Package', qty: 1, rate: 243000, amount: 243000 },
      { description: '16*24 page 30 Album', qty: 1, rate: 0, amount: 0 },
      { description: '20*30 Enlargement 02', qty: 2, rate: 0, amount: 0 },
    ],
  });

  const initialDemoBookings = [
    {
      _id: 'demo-b1',
      name: 'Kasun & Dinusha Perera',
      phone: '+94 77 123 4567',
      email: 'kasun.p@example.com',
      eventType: 'Wedding',
      eventDate: '2026-11-20',
      timeSlot: '08:00 - 16:00',
      servicePackage: 'Wedding Film & Photo Classic',
      budget: 'LKR 375,000',
      advancePaid: 100000,
      balanceDue: 275000,
      paymentStatus: 'Partially Paid',
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
      timeSlot: '13:00 - 18:00',
      servicePackage: 'Ultimate Cinema & Drone Combo',
      budget: 'Above LKR 750,000',
      advancePaid: 0,
      balanceDue: 750000,
      paymentStatus: 'Unpaid',
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
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setBookings(json.data);
      } else {
        setBookings(initialDemoBookings);
      }
    } catch (err) {
      setBookings(initialDemoBookings);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchInvoices = async () => {
    setLoadingInvoices(true);
    try {
      const res = await fetch(getApiUrl('/api/invoices'));
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInvoices(json.data);
      }
    } catch (err) {
      console.warn('Failed to fetch invoices', err);
    } finally {
      setLoadingInvoices(false);
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
      fetchInvoices();
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

  // Add Item line to Invoice Generator Form
  const handleAddInvoiceItem = () => {
    setInvoiceForm(prev => ({
      ...prev,
      items: [...prev.items, { description: '', qty: 1, rate: 0, amount: 0 }],
    }));
  };

  const handleUpdateInvoiceItem = (index, field, value) => {
    setInvoiceForm(prev => {
      const updatedItems = [...prev.items];
      const item = { ...updatedItems[index], [field]: value };
      if (field === 'qty' || field === 'rate') {
        item.amount = (Number(item.qty) || 0) * (Number(item.rate) || 0);
      }
      updatedItems[index] = item;
      return { ...prev, items: updatedItems };
    });
  };

  const handleRemoveInvoiceItem = (index) => {
    setInvoiceForm(prev => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index),
    }));
  };

  // Create Invoice / Quotation Handler
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!invoiceForm.clientName || !invoiceForm.clientPhone) {
      alert('Client Name and Phone Number are required.');
      return;
    }

    try {
      const res = await fetch(getApiUrl('/api/invoices'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceForm),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setInvoices(prev => [json.data, ...prev]);
        setSelectedInvoice(json.data);
      } else {
        alert(json.message || 'Failed to create invoice.');
      }
    } catch (err) {
      alert('Failed to connect to backend server.');
    }
  };

  // Multiple File Upload Handler for Portfolio
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

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm('Are you sure you want to delete this album item?')) return;
    try {
      await fetch(getApiUrl(`/api/portfolio/${id}`), { method: 'DELETE' });
      setPortfolioItems(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setPortfolioItems(prev => prev.filter(p => p._id !== id));
    }
  };

  // Check Schedule Clashes in Bookings List
  const getScheduleClashes = () => {
    const clashes = [];
    for (let i = 0; i < bookings.length; i++) {
      for (let j = i + 1; j < bookings.length; j++) {
        if (
          bookings[i].eventDate === bookings[j].eventDate &&
          bookings[i].status !== 'Cancelled' &&
          bookings[j].status !== 'Cancelled'
        ) {
          clashes.push({ b1: bookings[i], b2: bookings[j] });
        }
      }
    }
    return clashes;
  };

  const scheduleClashes = getScheduleClashes();

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      (b.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.phone || '').includes(searchQuery) ||
      (b.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white font-serif">NS Studio Admin Portal</h1>
            <p className="text-xs text-neutral-400 font-mono">Enter security PIN to manage bookings & quotations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                placeholder="Security PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-mono text-center tracking-widest"
              />
            </div>

            {authError && <p className="text-xs text-red-400 font-mono">{authError}</p>}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-colors font-mono"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
            <h1 className="text-3xl font-extrabold text-white font-serif">NS Studio Admin Portal</h1>
          </div>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Client Search • Invoices (# INV-xxx) • Schedule Clash Detection • UI Theme Customizer
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-red-500/50 transition-colors self-start md:self-auto"
        >
          Sign Out
        </button>
      </div>

      {/* Schedule Clash Global Alert Bar */}
      {scheduleClashes.length > 0 && (
        <div className="bg-red-950/80 border-2 border-red-500/80 p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-xl">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1 font-mono text-xs text-red-200">
            <h3 className="font-bold text-red-400 text-sm uppercase">
              Schedule Clash Detected ({scheduleClashes.length})
            </h3>
            {scheduleClashes.map((c, i) => (
              <p key={i}>
                Date <strong>{c.b1.eventDate}</strong> has multiple bookings: <strong>{c.b1.name}</strong> ({c.b1.servicePackage}) and <strong>{c.b2.name}</strong> ({c.b2.servicePackage}).
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 5 Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>1. Bookings & Clashes ({bookings.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('lookup');
            setIsLookupOpen(true);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 ${
            activeTab === 'lookup'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>2. Client Phone Search</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 ${
            activeTab === 'invoices'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>3. Quotations & Invoices ({invoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 ${
            activeTab === 'portfolio'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Images className="w-4 h-4" />
          <span>4. Portfolio Albums ({portfolioItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-2 ${
            activeTab === 'theme'
              ? 'bg-amber-500 text-neutral-950'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>5. UI Theme Customizer</span>
        </button>
      </div>

      {/* TAB 1: BOOKINGS & SCHEDULE CLASH DETECTOR */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search client name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-neutral-500 hidden sm:block" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 font-mono w-full sm:w-auto"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={fetchBookings}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                title="Refresh Bookings"
              >
                <RefreshCw className={`w-4 h-4 ${loadingBookings ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-neutral-950 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
                    <th className="py-4 px-5">Client Info</th>
                    <th className="py-4 px-5">Event & Time</th>
                    <th className="py-4 px-5">Package & Budget</th>
                    <th className="py-4 px-5">Payment Status</th>
                    <th className="py-4 px-5">Booking Status</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {filteredBookings.map((b) => {
                    const isClashing = bookings.some(other => other._id !== b._id && other.eventDate === b.eventDate && other.status !== 'Cancelled');

                    return (
                      <tr key={b._id} className={`hover:bg-neutral-950/50 ${isClashing ? 'bg-red-950/10' : ''}`}>
                        <td className="py-4 px-5 space-y-1">
                          <div className="font-bold text-white text-sm font-serif">{b.name}</div>
                          <div className="flex items-center gap-2 text-neutral-400">
                            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{b.phone}</span>
                          </div>
                          <div className="text-[10px] text-neutral-500">{b.email}</div>
                        </td>

                        <td className="py-4 px-5 space-y-1">
                          <div className="font-bold text-amber-400 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{b.eventDate}</span>
                          </div>
                          <div className="text-[11px] text-neutral-300 font-bold">{b.timeSlot || '09:00 - 17:00'}</div>
                          <span className="inline-block px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 text-[10px]">
                            {b.eventType}
                          </span>
                          {isClashing && (
                            <span className="block text-[9px] text-red-400 font-bold uppercase">Clash Warning</span>
                          )}
                        </td>

                        <td className="py-4 px-5 space-y-1">
                          <div className="font-semibold text-white">{b.servicePackage}</div>
                          <div className="text-amber-400 font-bold">{b.budget}</div>
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                              b.paymentStatus === 'Paid'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : b.paymentStatus === 'Partially Paid'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-red-500/20 text-red-300 border border-red-500/40'
                            }`}
                          >
                            {b.paymentStatus || 'Unpaid'}
                          </span>
                          {b.balanceDue > 0 && (
                            <span className="block text-[10px] text-neutral-400 mt-1">Due: LKR {b.balanceDue.toLocaleString()}</span>
                          )}
                        </td>

                        <td className="py-4 px-5">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-4 px-5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setLookupPhone(b.phone);
                              setIsLookupOpen(true);
                            }}
                            className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 hover:text-amber-300"
                            title="Lookup Client History"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteBooking(b._id)}
                            className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-500/40"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT PHONE LOOKUP MODAL LINK */}
      {activeTab === 'lookup' && (
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
          <Phone className="w-12 h-12 text-amber-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white font-serif">Instant Phone Number Lookup</h2>
          <p className="text-xs text-neutral-400 font-mono">
            Click below to open the instant phone search modal for looking up client booking history & invoices.
          </p>
          <button
            onClick={() => setIsLookupOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider"
          >
            Launch Phone Search Modal
          </button>
        </div>
      )}

      {/* TAB 3: QUOTATIONS & INVOICES (# INV-xxx Generator matching sample image) */}
      {activeTab === 'invoices' && (
        <div className="space-y-10">
          
          {/* Invoice Builder Form */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white font-serif">Generate Custom Invoice / Quotation</h2>
                <p className="text-xs text-neutral-400 font-mono">Replicates sample invoice format (# INV-026)</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                Official Format
              </span>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun Malaka"
                    value={invoiceForm.clientName}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, clientName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +94 77 123 4567"
                    value={invoiceForm.clientPhone}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, clientPhone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. client@example.com"
                    value={invoiceForm.clientEmail}
                    onChange={(e) => setInvoiceForm({ ...invoiceForm, clientEmail: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Items List Builder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300 font-bold uppercase">Invoice Line Items</span>
                  <button
                    type="button"
                    onClick={handleAddInvoiceItem}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {invoiceForm.items.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      <input
                        type="text"
                        placeholder="Description (e.g. 16*24 page 30 Album)"
                        value={item.description}
                        onChange={(e) => handleUpdateInvoiceItem(idx, 'description', e.target.value)}
                        className="flex-grow bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) => handleUpdateInvoiceItem(idx, 'qty', e.target.value)}
                        className="w-20 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-center"
                      />
                      <input
                        type="number"
                        placeholder="Rate (LKR)"
                        value={item.rate}
                        onChange={(e) => handleUpdateInvoiceItem(idx, 'rate', e.target.value)}
                        className="w-32 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-right"
                      />
                      <div className="w-32 text-right font-bold text-amber-400 px-2">
                        LKR {(item.amount || 0).toLocaleString()}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveInvoiceItem(idx)}
                        className="p-2 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-mono flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Invoice & Open Printable View</span>
                </button>
              </div>
            </form>
          </div>

          {/* Existing Invoices List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white font-serif">Recent Generated Invoices ({invoices.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {invoices.map((inv) => (
                <div
                  key={inv._id}
                  className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3 hover:border-amber-400/60 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="font-bold text-amber-400">#{inv.invoiceNumber}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inv.paymentStatus === 'Paid'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inv.paymentStatus || 'Unpaid'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm font-serif">{inv.clientName}</h4>
                    <p className="text-neutral-400">{inv.clientPhone}</p>
                    <p className="text-neutral-500 text-[11px]">Date: {inv.invoiceDate}</p>
                  </div>

                  <div className="border-t border-neutral-800 pt-2 flex justify-between font-bold">
                    <span className="text-neutral-400">Balance Due:</span>
                    <span className="text-white">LKR {(inv.balanceDue || 0).toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="w-full py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View & Print Official Invoice</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: MANAGE PORTFOLIO ALBUMS */}
      {activeTab === 'portfolio' && (
        <div className="space-y-8">
          <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-white font-serif">Add Multi-Photo Album to Portfolio</h2>
            
            {albumSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{albumSuccess}</span>
              </div>
            )}

            {albumError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{albumError}</span>
              </div>
            )}

            <form onSubmit={handleAddAlbum} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Album Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kasun & Dinusha Royal Wedding"
                    value={albumForm.title}
                    onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={albumForm.category}
                    onChange={(e) => setAlbumForm({ ...albumForm, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Cinematic Films">Cinematic Films</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Drone Aerial">Drone Aerial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Upload Multiple Images (Select 5, 10, 20+ photos)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleFilesChange}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2 text-neutral-300"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Or Paste Image URLs (One URL per line)</label>
                <textarea
                  rows={3}
                  placeholder="https://images.unsplash.com/photo-1..."
                  value={rawImagesInput}
                  onChange={(e) => setRawImagesInput(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-mono"
              >
                Save Multi-Photo Album
              </button>
            </form>
          </div>

          {/* Delete Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioItems.map((item) => (
              <div key={item._id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl space-y-3 font-mono text-xs">
                <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                <h4 className="font-bold text-white font-serif text-sm">{item.title}</h4>
                <div className="flex justify-between items-center text-neutral-400 text-[10px]">
                  <span>{item.category}</span>
                  <button
                    onClick={() => handleDeleteAlbum(item._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete Album
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: UI THEME & FONT CUSTOMIZER */}
      {activeTab === 'theme' && (
        <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl space-y-8 font-mono text-xs">
          <div className="border-b border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-white font-serif">System UI Theme & Font Customizer</h2>
            <p className="text-neutral-400">Customize accent colors and typography across all pages live</p>
          </div>

          {/* Color Themes */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Select Primary Accent Color</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(colorThemes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    currentThemeKey === key
                      ? 'border-amber-400 bg-neutral-950 ring-2 ring-amber-400/50'
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full shrink-0 shadow-md"
                    style={{ backgroundColor: t.primary }}
                  />
                  <div>
                    <span className="font-bold text-white block text-xs">{t.name}</span>
                    <span className="text-[10px] text-neutral-500">{t.primary}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Styles */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-amber-400" />
              <span>Select System Typography / Font Style</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(fontStyles).map(([key, f]) => (
                <button
                  key={key}
                  onClick={() => setFont(key)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    currentFontKey === key
                      ? 'border-amber-400 bg-neutral-950 ring-2 ring-amber-400/50'
                      : 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
                  }`}
                >
                  <span className="font-bold text-white block text-sm" style={{ fontFamily: f.family }}>
                    {f.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 block mt-1">Sample Typography Text</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render Modals */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}

      <ClientLookupModal
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        initialPhone={lookupPhone}
        onSelectInvoice={(inv) => {
          setIsLookupOpen(false);
          setSelectedInvoice(inv);
        }}
      />

    </div>
  );
}
