import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, ArrowRight } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function CalendarView() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch booked dates from backend API
  const fetchBookingsCalendar = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/bookings'));
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Extract confirmed and pending dates
        const datesMap = json.data.map((b) => ({
          date: b.eventDate, // format YYYY-MM-DD
          status: b.status,
          eventType: b.eventType,
          clientName: b.name,
        }));
        setBookedDates(datesMap);
      }
    } catch (err) {
      console.warn('Failed to fetch calendar bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsCalendar();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Calculate days for current month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Get starting day index (0 = Mon, 6 = Sun)
  let startingDay = firstDayOfMonth.getDay() - 1;
  if (startingDay < 0) startingDay = 6;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Helper to format date string YYYY-MM-DD
  const formatDateString = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = formatDateString(new Date());

  // Function to get booking status for a given date
  const getDateBookingInfo = (dayNum) => {
    const checkDate = new Date(year, month, dayNum);
    const dateStr = formatDateString(checkDate);

    const booking = bookedDates.find((b) => b.date === dateStr);
    return { dateStr, checkDate, booking };
  };

  const handleSelectDate = (dateStr, isBooked) => {
    if (isBooked) return;
    navigate('/contact', { state: { prefilledDate: dateStr } });
  };

  return (
    <div className="space-y-16 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono bg-amber-500/10 border border-amber-500/25">
          Live Availability Schedule
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif">
          Booking Availability Calendar
        </h1>
        <p className="text-neutral-400 text-base leading-relaxed">
          Check reserved dates and open slots for NS Studio wedding ceremonies, portrait sessions, and video productions.
        </p>

        {/* Legend */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-neutral-300">Available Date (Click to Reserve)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center">
              <XCircle className="w-3.5 h-3.5" />
            </span>
            <span className="text-neutral-300">Booked / Reserved</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-500"></span>
            <span className="text-neutral-400">Past Date</span>
          </div>
        </div>
      </section>

      {/* Calendar Card */}
      <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Month Selector Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
              {monthNames[month]} <span className="text-amber-400 font-mono">{year}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-400 transition-all"
              title="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-amber-400 hover:text-amber-300 font-bold transition-all"
            >
              Today
            </button>

            <button
              onClick={nextMonth}
              className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-amber-400 transition-all"
              title="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 font-bold pb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-1 sm:py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-3">
          {/* Empty padding slots for month offset */}
          {Array.from({ length: startingDay }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-16 sm:h-28 rounded-xl sm:rounded-2xl bg-neutral-950/40 border border-transparent"></div>
          ))}

          {/* Days in Month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const { dateStr, checkDate, booking } = getDateBookingInfo(dayNum);

            const isPast = checkDate < new Date(todayStr);
            const isToday = dateStr === todayStr;
            const isBooked = !!booking && (booking.status === 'Confirmed' || booking.status === 'Pending');

            return (
              <div
                key={dayNum}
                onClick={() => !isPast && handleSelectDate(dateStr, isBooked)}
                className={`relative h-16 sm:h-28 p-1 sm:p-3 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                  isPast
                    ? 'bg-neutral-950/50 border-neutral-900 text-neutral-600 opacity-60 cursor-not-allowed'
                    : isBooked
                    ? 'bg-red-950/40 border-red-500/40 text-red-200 cursor-not-allowed shadow-inner'
                    : 'bg-neutral-950 border-neutral-800 hover:border-amber-400 hover:bg-neutral-900 cursor-pointer group shadow-sm'
                } ${isToday ? 'ring-1 sm:ring-2 ring-amber-400' : ''}`}
              >
                {/* Day Number Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs sm:text-base font-bold ${
                      isToday
                        ? 'text-amber-400'
                        : isBooked
                        ? 'text-red-400'
                        : 'text-neutral-200 group-hover:text-amber-300'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {isToday && (
                    <span className="hidden sm:inline-block text-[8px] sm:text-[9px] font-mono px-1 py-0.5 rounded bg-amber-400 text-neutral-950 font-bold uppercase">
                      Today
                    </span>
                  )}
                </div>

                {/* Status Indicator Badge */}
                <div className="mt-auto">
                  {isPast ? (
                    <span className="text-[8px] sm:text-[10px] font-mono text-neutral-600 block">Passed</span>
                  ) : isBooked ? (
                    <div className="space-y-0.5">
                      <span className="inline-flex items-center gap-0.5 px-1 sm:px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[8px] sm:text-[10px] font-mono font-bold">
                        <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 shrink-0" />
                        <span className="truncate">Booked</span>
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <span className="inline-flex items-center gap-0.5 px-1 sm:px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[8px] sm:text-[10px] font-mono font-bold group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 group-hover:text-neutral-950 shrink-0" />
                        <span className="truncate">Open</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-8 sm:p-12 rounded-3xl text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
          Found an Open Date for Your Event?
        </h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto">
          Reserve your wedding ceremony or photoshoot date before another client books it. Fast confirmation via WhatsApp.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-colors active:scale-95"
          >
            <span>Proceed to Reservation Form</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
