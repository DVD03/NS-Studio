import { useState, useEffect } from 'react';
import { Search, Phone, Mail, Calendar, FileText, X, CheckCircle2, Clock, DollarSign, User } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function ClientLookupModal({ isOpen, onClose, initialPhone = '', onSelectInvoice }) {
  const [searchPhone, setSearchPhone] = useState(initialPhone);
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialPhone) {
      setSearchPhone(initialPhone);
      handleSearch(initialPhone);
    }
  }, [initialPhone]);

  const handleSearch = async (phoneToSearch) => {
    const query = phoneToSearch || searchPhone;
    if (!query) return;

    setLoading(true);
    setHasSearched(true);

    try {
      // Fetch bookings and invoices matching phone number
      const [bookingsRes, invoicesRes] = await Promise.all([
        fetch(getApiUrl('/api/bookings')),
        fetch(getApiUrl('/api/invoices')),
      ]);

      const bookingsJson = await bookingsRes.json();
      const invoicesJson = await invoicesRes.json();

      const cleanQuery = query.replace(/[^0-9]/g, '');

      const allBookings = bookingsJson.data || [];
      const allInvoices = invoicesJson.data || [];

      const matchedBookings = allBookings.filter((b) =>
        (b.phone || '').replace(/[^0-9]/g, '').includes(cleanQuery)
      );

      const matchedInvoices = allInvoices.filter((i) =>
        (i.clientPhone || '').replace(/[^0-9]/g, '').includes(cleanQuery)
      );

      if (matchedBookings.length > 0 || matchedInvoices.length > 0) {
        const primary = matchedBookings[0] || matchedInvoices[0];
        const totalSpent = matchedInvoices.reduce((acc, inv) => acc + (inv.paidAmount || 0), 0);
        const totalDue = matchedInvoices.reduce((acc, inv) => acc + (inv.balanceDue || 0), 0);

        setClientData({
          name: primary.name || primary.clientName || 'Client Profile',
          phone: primary.phone || primary.clientPhone || query,
          email: primary.email || primary.clientEmail || 'N/A',
          bookings: matchedBookings,
          invoices: matchedInvoices,
          totalSpent,
          totalDue,
        });
      } else {
        setClientData(null);
      }
    } catch (err) {
      console.warn('Client lookup error', err);
      setClientData(null);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-3xl shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Client Lookup & History</h2>
              <p className="text-xs text-neutral-400 font-mono">Instant phone search for bookings & invoices</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex gap-3"
        >
          <div className="relative flex-grow">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Enter client phone number (e.g. 0773053014)..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono text-sm transition-colors flex items-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'Searching...' : 'Lookup'}</span>
          </button>
        </form>

        {/* Results Body */}
        {clientData ? (
          <div className="space-y-6 pt-2">

            {/* Profile Overview Card */}
            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-serif">{clientData.name}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{clientData.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{clientData.email}</span>
                  </span>
                </div>
              </div>

              {/* Spend Badges */}
              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-emerald-400">
                  <span className="text-[10px] text-neutral-400 block uppercase">Total Paid</span>
                  <span className="font-bold text-sm">LKR {clientData.totalSpent.toLocaleString()}</span>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-amber-400">
                  <span className="text-[10px] text-neutral-400 block uppercase">Balance Due</span>
                  <span className="font-bold text-sm">LKR {clientData.totalDue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Booking History Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Booking History ({clientData.bookings.length})</span>
              </h4>

              {clientData.bookings.length > 0 ? (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {clientData.bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-neutral-950 border border-neutral-800 p-4 rounded-xl flex items-center justify-between text-xs font-mono"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm font-serif">{booking.servicePackage}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">
                            {booking.eventType}
                          </span>
                        </div>
                        <p className="text-neutral-400">Date: {booking.eventDate} ({booking.timeSlot || '09:00 - 17:00'})</p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${
                          booking.status === 'Confirmed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 font-mono py-2">No bookings found for this client.</p>
              )}
            </div>

            {/* Invoices List Section */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Invoices & Quotations ({clientData.invoices.length})</span>
              </h4>

              {clientData.invoices.length > 0 ? (
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {clientData.invoices.map((inv) => (
                    <div
                      key={inv._id}
                      onClick={() => onSelectInvoice && onSelectInvoice(inv)}
                      className="bg-neutral-950 border border-neutral-800 hover:border-amber-400 p-4 rounded-xl flex items-center justify-between text-xs font-mono cursor-pointer transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-amber-400 group-hover:underline">#{inv.invoiceNumber}</span>
                        <p className="text-neutral-400 text-[11px]">Total: LKR {(inv.total || 0).toLocaleString()} | Balance Due: LKR {(inv.balanceDue || 0).toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                            inv.paymentStatus === 'Paid'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : inv.paymentStatus === 'Partially Paid'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {inv.paymentStatus || 'Unpaid'}
                        </span>
                        <span className="text-[11px] text-neutral-400 group-hover:text-amber-300">View Invoice &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 font-mono py-2">No invoices recorded for this client.</p>
              )}
            </div>

          </div>
        ) : hasSearched && !loading ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm font-mono text-neutral-400">No client record found matching "{searchPhone}".</p>
          </div>
        ) : null}

      </div>
    </div>
  );
}
